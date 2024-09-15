from enum import Enum

from fastapi import Depends
from pydantic import BaseModel
from src.app_setting import app, get_current_user
from src.slack.slack import get_slack_message
from src.discord.discord import get_discord_message


class App(Enum):
    SLACK = "slack"
    DISCORD = "discord"


class Message(BaseModel):
    app: App
    server_id: str
    channel_id: str
    message_id: str


class MessageResponse(BaseModel):
    id: str
    app: App
    server_name: str
    server_image: str
    channel_name: str
    sender_name: str
    sender_image: str
    content: str
    message_link: str
    send_at: str


# ルートエンドポイント


@app.get("/")
async def read_root():
    return {"message": "hello_world!!"}


# サンプル:ログインユーザーの取得


@app.get("/auth-check")
async def auth_check(
    user: str = Depends(get_current_user),
):
    print(user)
    return {"user": user}

<<<<<<< HEAD
<<<<<<< HEAD
# サンプル:subapaseのデータ取得


@app.get("/items")
async def read_items():
    response = supabase_client.table("your_table_name").select("*").execute()
    return response.data
=======
=======
>>>>>>> ad30e6c (feat: connect front)

@app.post("/messages")
def get_messages(
<<<<<<< HEAD
    message: Message, user: str = Depends(get_current_user)
) -> MessageResponse:
    if message.app.SLACK:
        return get_slack_message(
            user_id=user,
            server_id=message.server_id,
            channel_id=message.channel_id,
            message_id=message.message_id,
        )
    if message.app.DISCORD:
        # TODO: Discordのメッセージを取得する関数を呼び出す
        # @nakano1122
        return
>>>>>>> b6f33f7 (feat: メッセージを取得できるエンドポイントを追加)
=======
    messages: list[Message], user: str = Depends(get_current_user)
) -> list[MessageResponse]:
    responses = []

    for message in messages:
        if message.app.SLACK:
            responses.append(
                get_slack_message(
                    user_id=user,
                    server_id=message.server_id,
                    channel_id=message.channel_id,
                    message_id=message.message_id,
                )
            )
        if message.app.DISCORD:
            responses.append(
                get_discord_message(
                    # discord はこれだけでよさそう？
                    channel_id=message.channel_id,
                    message_id=message.message_id,
                )
            )

    return responses
>>>>>>> 0ebc1ef (feat: メッセージを複数取得できるようにする)
