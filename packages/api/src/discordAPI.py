from src.app_setting import app, supabase_client, get_current_user
import discord
# from discord import app_commands
from dotenv import load_dotenv
import os

load_dotenv()


@app.get("/discord")
async def read_root():
    return {"discord: ": "hoge"}


@app.get("/redirect")
async def listen_code(code: str = ""):
    return {"code: ": code}

# curl でこれならいけた
#   redirect uriは最初のステップで指定したものと同じである必要がある
#     https://discord.com/channels/1242480639165464657/1283763986613145662/1284497180115337226

# curl -i -X POST \
#    -H "Content-Type:application/x-www-form-urlencoded" \
#    -d "client_id=${CLIENT_ID}" \
#    -d "client_secret=${CLIENT_SECRET}" \
#    -d "grant_type=authorization_code" \
#    -d "code=${CODE}" \
#    -d "redirect_uri=${REDIRECT_URL}" \
#    'https://discordapp.com/api/oauth2/token'


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
