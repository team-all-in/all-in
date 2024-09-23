from app_setting import supabase_client
import discord
import os
import uvicorn
import logging
import requests
from fastapi import FastAPI
from threading import Thread

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

api = FastAPI()

@api.get("/")
def health():
    return {"health": "ok"}

def run():
    uvicorn.run(api, host='0.0.0.0', port=8000)

def keep_alive():
    t = Thread(target=run)
    t.daemon = True
    t.start()

client = discord.Client(intents=discord.Intents.all())

headers = {
    'Authorization': f'Bot {os.getenv("DISCORD_BOT_TOKEN")}',
}


def get_priority_and_sentient(message_text):
    response = requests.get(
        f"https://kctebirgsq.ap-northeast-1.awsapprunner.com/predict?text={message_text}"
    ).json()
    return response["sentiment"], response["priority"]

# 自分がメンションされたメッセージを取得してDBに格納する関数
@client.event
async def on_message(message):
    # supabaseに入っているユーザの一覧を取得
    supabase_users = (
        supabase_client.table("all-in-relation")
        .select("discord_member_id", "user_id")
        .execute()
    ).data
    supabase_user_name_list = [user["discord_member_id"] for user in supabase_users]
    # logger.info(f"{message.mentions}")
    # 取得したメッセージのmentionsがsupabaseに入っていればDBに格納する
    messages = []
    for mention in message.mentions:
        if mention.name in supabase_user_name_list:
            url = f'''https://discord.com/api/v10/channels/{message.channel.id}/messages/{message.id}'''
            content = requests.get(url, headers=headers).json()["content"]
            sentiment, priority = get_priority_and_sentient(content)
            supabase_user = [user for user in supabase_users if user["discord_member_id"] == mention.name][0]
            messages.append({
                "user_id": supabase_user["user_id"],
                "app": "discord",
                "server_id": message.guild.id,
                "message_id": message.id,
                "channel_id": message.channel.id,
                "sentiment": sentiment,
                "priority": priority,
                "send_at": message.created_at.strftime(
                    "%Y-%m-%dT%H:%M:%SZ"
                ),
                "message_link": f'https://discord.com/channels/{message.guild.id}/{message.channel.id}/{message.id}'
            })
        else:
            continue

    supabase_client.table("messages").insert(messages).execute()

if __name__ == "__main__":
    keep_alive()
    client.run(os.getenv("DISCORD_BOT_TOKEN"))
