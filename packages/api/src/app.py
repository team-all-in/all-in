from src.app_setting import app, supabase_client, get_current_user
from fastapi import Depends, HTTPException
from src.emotion.emotion import analyze_emotion
from src.priority.priority import prioritize_message

# ルートエンドポイント
@app.get("/")
async def read_root(
):
    return {"message": "hello_world!!"}

# サンプル:ログインユーザーの取得
@app.get("/auth-check")
async def read_root(
    user: str = Depends(get_current_user),
):
    print(user)
    return {"user": user}

# サンプル:subapaseのデータ取得
@app.get("/items")
async def read_items():
    response = supabase_client.table("your_table_name").select("*").execute()
    return response.data

@app.get("/predict")
async def predict(
    text: str,
):
    emoji = analyze_emotion(text)["emoji"]
    priority = prioritize_message(text)

    return {
        'sentiment': emoji,
        'priority': priority
    }