import os

import discord
import requests
from dotenv import find_dotenv, load_dotenv
from fastapi.responses import JSONResponse
from supabase import Client, create_client

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


def get_discord_message(
    server_id: str, channel_id: str, message_id: str
) -> dict:
    message = requests.get(
        f'https://discord.com/api/v10/channels/{channel_id}/messages/{message_id}', headers=headers).json()
    guild = requests.get(
        f"https://discord.com/api/v10/guilds/{server_id}", headers=headers).json()
    channel_name = requests.get(
        f"https://discord.com/api/v10/channels/{channel_id}", headers=headers).json()["name"]

    response = {
        "id": message_id,
        "app": "discord",
        "sender_image": f"https://cdn.discordapp.com/avatars/{message['author']['id']}/{message['author']['avatar']}",
        "sender_name": message["author"]["global_name"],
        "server_image": f"https://cdn.discordapp.com/icons/{guild['id']}/{guild['icon']}.png",
        "server_name": guild['name'],
        "channel_name": channel_name,
        "content": message["content"],
        "message_link": f"https://discord.com/channels/{server_id}/{channel_id}/{message_id}",
        "send_at": message["timestamp"],
    }
    return response
