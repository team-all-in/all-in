from fastapi.responses import JSONResponse
from app_setting import app, supabase_client, get_current_user
import discord
# from discord import app_commands
from dotenv import load_dotenv
import os
from supabase import create_client, Client
import datetime

url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_ANON_KEY")

supabase: Client = create_client(url, key)

client = discord.Client(intents=discord.Intents.default())
load_dotenv()

priority_rule = {
    "low": 30,
    "medium": 10,
    "high": 5,
    "urgent": 1,
    "critical": 0
}

@client.event
async def on_ready():
    print('Bot is ready')

@app.get("/redirect")
async def listen_code(code: str = ""):
    return {"code: ": code}

# メッセージを取得する関数
@app.get("/fetch_messages")
async def fetch_messages(userId: int, code: str) -> dict:
    discord_settings = supabase.table("discord_settings").select("*").eq("user_id", userId).execute()
    user = supabase.table("users").select("*").eq("id", userId).execute()
    messages = []
    for message in discord.message.Message:
        if message.mentions.find(user.name) or discord.message.mention_everyone:
            # 優先度の基準によって変化する
            if datetime.datetime.today() - message.created_at < priority_rule["critical"]:
                priority = "critical"
            elif datetime.datetime.today() - message.created_at < priority_rule["urgent"]:
                priority = "urgent"
            elif datetime.datetime.today() - message.created_at < priority_rule["high"]:
                priority = "high"
            elif datetime.datetime.today() - message.created_at < priority_rule["medium"]:
                priority = "medium"
            elif datetime.datetime.today() - message.created_at < priority_rule["low"]:
                priority = "low"
            messages.append({
                "channel": message.channel,
                "sender_name": message.author,
                "content": message.content,
                "message_link": message.jump_url,
                "sentiment": message.emoji,
                "priority": priority,
                "send_at": message.edited_at | message.created_at
            })
    messages.sort(key=lambda x: x["send_at"], reverse=True)
    # 上位20件を返す
    return JSONResponse(content={"messages": messages[0:20]})
