from src.app_setting import app, supabase_client, get_current_user
from fastapi import Depends, HTTPException


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