from src.logger import newLogger
from src.sync_app.discord.discord_api import discord_api_url
from src.const.message import MessageResponse
from dotenv import load_dotenv
import os

import requests
from requests.exceptions import HTTPError

load_dotenv()

logger = newLogger('discord')

def get_headers() -> dict:
    return {
        'Authorization': f'Bot {os.getenv("DISCORD_BOT_TOKEN")}',
    }

def fetch_message(url: str, headers: dict) -> dict:
    try:
        response = requests.get(url, headers=headers)
        # raise exception when response code in 4XX, 5XX
        response.raise_for_status()
    except HTTPError as e:
        logger.error(f"failed to fetch message: {e}")
        raise e

    return response.json()

def create_message_response(message: dict, server_id: str, channel_id: str) -> MessageResponse:
    return {
        "id": message["id"],
        "app": "discord",
        "sender_image": f"https://cdn.discordapp.com/avatars/{message['author']['id']}/{message['author']['avatar']}",
        "sender_name": message["author"]["global_name"],
        "server_image": "",  # 後で実装. 別のAPIで取得する
        "server_name": "",  # 後で実装. 別のAPIで取得する
        "channel_name": "",  # 後で実装. 別のAPIで取得する
        "content": message["content"],
        "message_link": f"https://discord.com/channels/{server_id}/{channel_id}/{message['id']}",
        "send_at": message["timestamp"],
    }

def get_discord_message(
    server_id: str, channel_id: str, message_id: str
) -> MessageResponse:
    url = f"{discord_api_url}/channels/{channel_id}/messages/{message_id}"
    headers = get_headers()

    message = fetch_message(url, headers)

    return create_message_response(message, server_id, channel_id)
