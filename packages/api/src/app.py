from src.app_setting import app, supabase_client, get_current_user
from fastapi import Depends, HTTPException
from src.emotion.emotion import analyze_emotion
from src.emotion.message import generate_message


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

# 感情分析エンドポイント
@app.post("/analyze_emotion")
async def analyze_emotion_endpoint(input: TextInput):
    emotion_data = await analyze_emotion(input.text)
    if not emotion_data:
        raise HTTPException(status_code=500, detail="感情分析中にエラーが発生しました")
    return emotion_data

# メッセージ生成エンドポイント
@app.post("/generate_message")
async def generate_message_endpoint(input: TextInput):
    emotion_data = await analyze_emotion(input.text)
    if not emotion_data:
        raise HTTPException(status_code=500, detail="感情分析中にエラーが発生しました")
    
    generated_message = await generate_message(input.text, emotion_data["emotion"], emotion_data["emoji"])
    return {"generated_message": generated_message}