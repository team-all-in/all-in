from .app import app
import discord
from discord import app_commands
from dotenv import load_dotenv
import os

load_dotenv()

@app.get("/discord")
async def read_root():
    print("うぇーい")

# データベース設定
ACCESTOKEN = os.getenv("ACCESTOKEN")

intents = discord.Intents.default()
client = discord.Client(intents=intents)

@client.event
async def on_ready():
    print('Bot is ready')

client.run(ACCESTOKEN)
