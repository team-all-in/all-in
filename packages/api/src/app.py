import logging
from typing import Annotated

from gotrue.types import User
from fastapi import Depends
from src.app_setting import app, get_current_user
from src.const.message import Message, MessageResponse, App
from src.predict.emotion.emotion import analyze_emotion
from src.predict.priority.priority import prioritize_message
from src.sync_app.discord.discord import get_discord_message
from src.sync_app.slack.slack import get_slack_message
from src.app_setting import supabase_client
from src.decode import decrypt

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ルートエンドポイント
@app.get("/")
async def read_root():
    return {"health": "ok"}


@app.get("/auth-check")
async def auth_check(
    user=Depends(get_current_user),
):
    return {"user": user}


@app.post("/messages")
async def get_messages(
    messages: list[Message], user: Annotated[User, Depends(get_current_user)]
) -> list[MessageResponse]:
    slack_access_token = ''

    if has_slack(messages):
        encrypted_token = (
            supabase_client.table("slack_settings")
            .select("access_token")
            .eq("user_id", user.id)
            .execute()
        ).data[0]["access_token"]
        # 複合化
        slack_access_token = decrypt(encrypted_token)

    responses = []
    for message in messages:
        logger.info(f"get_message: {message}")
        if message.app == App.SLACK:
            try:
                responses.append(
                    get_slack_message(
                        slack_access_token=slack_access_token,
                        server_id=message.server_id,
                        channel_id=message.channel_id,
                        message_id=message.message_id,
                    )
                )
            except Exception as e:
                logger.error('slack server error')
                logger.error(e)


        if message.app == App.DISCORD:
            responses.append(
                get_discord_message(
                    server_id=message.server_id,
                    channel_id=message.channel_id,
                    message_id=message.message_id,
                )
            )

    return responses


@app.get("/predict")
async def predict(
    text: str,
):
    emoji = analyze_emotion(text)["emoji"]
    priority = prioritize_message(text)

    return {"sentiment": emoji, "priority": priority}


def has_slack(messages: list[Message]) -> bool:
    for message in messages:
        if message.app == App.SLACK:
            return True
    return False
