import logging

from fastapi import Depends
from src.app_setting import app, get_current_user
from src.const.message import Message, MessageResponse
from src.predict.emotion.emotion import analyze_emotion
from src.predict.priority.priority import prioritize_message
from src.sync_app.discord.discord import get_discord_message
from src.sync_app.slack.slack import get_slack_message


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ルートエンドポイント
@app.get("/")
async def read_root():
    return {"message": "hello_world!!"}


@app.get("/auth-check")
async def auth_check(
    user = Depends(get_current_user),
):
    print(user.id)
    return {"user": user}


@app.post("/messages")
async def get_messages(
    messages: list[Message], user = Depends(get_current_user)
) -> list[MessageResponse]:
    responses = []

    logger.info(f"get_messages: {messages}")
    logger.info(f"user: {user}")

    for message in messages:
        if message.app.SLACK:
            try:
                responses.append(
                    get_slack_message(
                        user_id=user.id,
                        server_id=message.server_id,
                        channel_id=message.channel_id,
                        message_id=message.message_id,
                    )
                )
            except Exception as e:
                logger.error(e)

        if message.app.DISCORD:
            try:
                responses.append(
                    get_discord_message(
                        channel_id=message.channel_id,
                        message_id=message.message_id,
                    )
                )
            except Exception as e:
                # TODO: 直す
                # 絶対エラーでる
                logger.error(e)

    return responses


@app.get("/predict")
async def predict(
    text: str,
):
    emoji = analyze_emotion(text)["emoji"]
    priority = prioritize_message(text)

    return {"sentiment": emoji, "priority": priority}
