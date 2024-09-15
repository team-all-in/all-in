from fastapi import FastAPI
from fastapi.responses import JSONResponse
from app_setting import app
import discord
# from discord import app_commands
from dotenv import load_dotenv, find_dotenv
import os
from supabase import create_client, Client
import requests

load_dotenv(find_dotenv())

url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_ANON_KEY")

supabase: Client = create_client(url, key)

client = discord.Client(intents=discord.Intents.all())

headers = {
    'Authorization': f'Bot {os.getenv("DISCORD_BOT_TOKEN")}',
}

priority_rule = {
    "low": 30,
    "medium": 10,
    "high": 5,
    "urgent": 1,
    "critical": 0
}

# 自分がメンションされたメッセージを取得してDBに格納する関数
# @client.event
# async def on_message(message):
#     # supabaseに入っているユーザの一覧を取得
#     supabase_users_name = (
#         supabase.table("user")
#         .select("name")
#         .execute()
#     )
#     # 取得したメッセージのmentionsがsupabaseに入っていればDBに格納する
#     for mention in message.mentions:
#         if mention in supabase_users_name:
#             message = {
#                 "app": "discord",
#                 "server_id": message.guild.id,
#                 "message_id": message.id,
#                 "channel_id": message.channel.id,
#                 "sentiment": "neutral",
#                 "priority": "low",
#             }
#             supabase.table("message").insert(message).execute()

# @app.post("/get_messages")
def get_messages() -> dict:
    # app = requests["app"]
    app = "discord"
    if app != "discord":
        return JSONResponse(status_code=400, content={"error": "app is not discord"})
    # guild_id = requests["server_id"]
    # message_id = requests["message_id"]
    # channel_id = requests["channel_id"]
    channel_id = 1275808876750700640
    message_id = 1284766126621982781
    url = f'https://discord.com/api/v10/channels/{channel_id}/messages/{message_id}'
    message = requests.get(url, headers=headers).json()
    response = {
        "id": message["id"],
        "app": "discord",
        "sender_image": message["author"]["avatar"],
        "sender_name": message["author"].get("username"),
        # "server_name": message["guild_id"],
        "content": message["content"],
        "message_link": message["attachments"],
        "send_at": message["edited_timestamp"],
    }
    response["send_at"] = message["edited_timestamp"] if message["edited_timestamp"] else message["timestamp"]
    print(response)
    return JSONResponse(status_code=200, content=response)

response = get_messages()
print(response)

# if __name__ == "__main__":
#     client.run(os.getenv("DISCORD_ACCESSTOKEN"))