from app_setting import supabase_client
import discord
import os
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

client = discord.Client(intents=discord.Intents.all())

# 自分がメンションされたメッセージを取得してDBに格納する関数
@client.event
async def on_message(message):
    # supabaseに入っているユーザの一覧を取得
    supabase_users = (
        supabase_client.table("all-in-relation")
        .select("discord_member_id")
        .execute()
    ).data
    supabase_user_name_list = [user["discord_member_id"] for user in supabase_users]
    # logger.info(f"{message.mentions}")
    # 取得したメッセージのmentionsがsupabaseに入っていればDBに格納する
    for mention in message.mentions:
        if mention.name in supabase_user_name_list:
            message = {
                "user_id": mention.name,
                "app": "discord",
                "server_id": message.guild.id,
                "message_id": message.id,
                "channel_id": message.channel.id,
                "sentiment": "neutral",
                "priority": "low",
            }
            supabase_client.table("messages").insert(message).execute()

if __name__ == "__main__":
    client.run(os.getenv("DISCORD_BOT_TOKEN"))