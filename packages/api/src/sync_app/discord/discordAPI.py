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


def fetch_api_response(url: str, headers: dict) -> dict:
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        return response.json()
    except HTTPError as e:
        logger.error(f"failed to fetch data from {e}")
        raise


def create_message_response(
    guild: dict, channel: dict, message: dict, server_id: str, channel_id: str, message_id: str
) -> MessageResponse:
    channel_name = channel["name"]
    sender = message["author"]
    return {
        "id": message_id,
        "app": "discord",
        "sender_image": f"https://cdn.discordapp.com/avatars/{sender['id']}/{sender['avatar']}",
        "sender_name": sender["global_name"] if sender["global_name"] else sender["username"],
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

    headers = get_headers(token)
    guild_url = f"{discord_api_url}/guilds/{server_id}"
    channel_url = f"{discord_api_url}/channels/{channel_id}"
    message_url = f"{discord_api_url}/channels/{channel_id}/messages/{message_id}"

    guild = fetch_api_response(guild_url, headers)
    channel = fetch_api_response(channel_url, headers)
    message = fetch_api_response(message_url, headers)

    return create_message_response(guild, channel, message, server_id, channel_id, message_id)
