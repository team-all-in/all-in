from fastapi.responses import JSONResponse
import discord
from src.logger import newLogger
from src.sync_app.discord.discord_api import discord_api_url
from dotenv import load_dotenv, find_dotenv
import os

import requests
from supabase import Client, create_client
from requests.exceptions import HTTPError

load_dotenv(find_dotenv())
logger = newLogger('discord')

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


def get_discord_message(
    server_id: str, channel_id: str, message_id: str
) -> dict:
    url = f"{discord_api_url}/channels/{channel_id}/messages/{message_id}"
    try:
        message = requests.get(url, headers=headers).json()
        # raise exception when response code in 4XX, 5XX
        message.raise_for_status()
    except HTTPError as e:
        logger.error(f"failed to get message: {e}")
        raise e

    response = new_response(message)
    response["send_at"] = message["edited_timestamp"] if message["edited_timestamp"] else message["timestamp"]

    return JSONResponse(status_code=200, content=response)


def new_response(message: dict) -> dict:
    return {
        "id": message["id"],
        "app": "discord",
        "sender_image": message["author"]["avatar"],
        "sender_name": message["author"].get("username"),
        "content": message["content"],
        "message_link": message["attachments"],
        "send_at": message["edited_timestamp"],
    }
