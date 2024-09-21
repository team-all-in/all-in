import discord
from src.logger import newLogger
from src.sync_app.discord.discord_api import discord_api_url
from src.const.message import MessageResponse
from dotenv import load_dotenv, find_dotenv
import os

import requests
from supabase import Client, create_client
from requests.exceptions import HTTPError

load_dotenv(find_dotenv())
logger = newLogger('discord')

url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_ANON_KEY")

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


def get_discord_message(
    server_id: str, channel_id: str, message_id: str
) -> MessageResponse:
    url = f"{discord_api_url}/channels/{channel_id}/messages/{message_id}"
    try:
        message = requests.get(url, headers=headers).json()
        # raise exception when response code in 4XX, 5XX
        message.raise_for_status()
    except HTTPError as e:
        logger.error(f"failed to get message: {e}")
        raise e

    return {
        "id": message["id"],
        "app": "discord",
        "sender_image": f"https://cdn.discordapp.com/avatars/{message['author']['id']}/{message['author']['avatar']}",
        "sender_name": message["author"]["global_name"],
        "server_image": "",  # 後で実装. 別のAPIで取得する
        "server_name": "",  # 後で実装. 別のAPIで取得する
        "channel_name": "",  # 後で実装. 別のAPIで取得する
        "content": message["content"],
        "message_link": f"https://discord.com/channels/{server_id}/{channel_id}/{message_id}",
        "send_at": message["timestamp"],
    }
