import os

from dotenv import load_dotenv
import requests
from requests.exceptions import HTTPError
from src.const.message import MessageResponse
from src.logger import newLogger
from src.sync_app.discord.discord_api import discord_api_url

load_dotenv()

logger = newLogger("discord")


def get_headers(token: str) -> dict:
    return {
        "Authorization": f"Bot {token}",
    }


def fetch_message(url: str, headers: dict) -> dict:
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        return response.json()
    except HTTPError as e:
        logger.error(f"failed to fetch message: {e}")
        raise


def create_message_response(
    message: dict, server_id: str, channel_id: str, message_id: str
) -> MessageResponse:
    token = os.getenv("DISCORD_BOT_TOKEN")
    headers = get_headers(token)
    message = requests.get(
        f"https://discord.com/api/v10/channels/{channel_id}/messages/{message_id}",
        headers=headers,
    ).json()
    guild = requests.get(
        f"https://discord.com/api/v10/guilds/{server_id}", headers=headers
    ).json()
    channel_name = requests.get(
        f"https://discord.com/api/v10/channels/{channel_id}", headers=headers
    ).json()["name"]
    return {
        "id": message_id,
        "app": "discord",
        "sender_image": f"https://cdn.discordapp.com/avatars/{message['author']['id']}/{message['author']['avatar']}",
        "sender_name": message["author"]["global_name"],
        "server_image": f"https://cdn.discordapp.com/icons/{guild['id']}/{guild['icon']}.png",
        "server_name": guild["name"],
        "channel_name": channel_name,
        "content": message["content"],
        "message_link": f"https://discord.com/channels/{server_id}/{channel_id}/{message_id}",
        "send_at": message["timestamp"],
    }


def get_discord_message(
    server_id: str, channel_id: str, message_id: str
) -> MessageResponse:
    token = os.getenv("DISCORD_BOT_TOKEN")
    if token is None:
        logger.error("DISCORD_BOT_TOKEN is not set")
        raise EnvironmentError("DISCORD_BOT_TOKEN is not set")

    url = f"{discord_api_url}/channels/{channel_id}/messages/{message_id}"
    headers = get_headers(token)

    message = fetch_message(url, headers)

    return create_message_response(message, server_id, channel_id, message_id)
