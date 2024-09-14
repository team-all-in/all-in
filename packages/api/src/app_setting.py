from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from supabase import create_client, Client

from dotenv import load_dotenv
import os

load_dotenv()

# データベース設定
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_ANON_KEY = os.getenv("SUPABASE_ANON_KEY")

# FastAPI アプリケーション
app = FastAPI()
security = HTTPBearer()

origins = [
    "*",
]

# CORSミドルウェアを追加
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"], 
)

supabase_client:Client = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
) -> str:
    token = credentials.credentials
    user = supabase_client.auth.api.get_user(token.access_token)
    if 'error' in user:
        raise Exception('Token verification failed.')
    return user