from fastapi.responses import JSONResponse
from app_setting import app, supabase_client, get_current_user
import discord
# from discord import app_commands
from dotenv import load_dotenv
import os
from models import messages, User, discord_settings
import datetime

client = discord.Client()
load_dotenv()

priority_rule = {
    "low": 30,
    "medium": 10,
    "high": 5,
    "urgent": 1,
    "critical": 0
}

@app.get("/redirect")
async def listen_code(code: str = ""):
    return {"code: ": code}

# メッセージを取得する関数
@app.get("/fetch_messages")
async def fetch_messages(userId: int, code: str) -> dict:
    discord_settings = discord_settings.get(userId == userId)
    user = User.get(userId == userId)
    messages = []
    for message in discord.message.Message:
        if message.mentions.find(user.name) or discord.message.mention_everyone:
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
                "channel": discord.message.channel,
                "sender_name": messages.author,
                "content": messages.content,
                "message_link": messages.jump_url,
                "sentiment": messages.emoji,
                "priority": priority,
                "send_at": messages.created_at
            })
    return JSONResponse(content={"messages": messages})


# codeを取得
# codeを使ってアクセストークンを取得

# データベース設定
# ACCESTOKEN = os.getenv("ACCESTOKEN")
#
# intents = discord.Intents.default()
# client = discord.Client(intents=intents)
#
#
# @client.event
# async def on_ready():
#     print('Bot is ready')
#
# client.run(ACCESTOKEN)
