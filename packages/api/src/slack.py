import logging
import os

from dotenv import find_dotenv, load_dotenv
from slack_bolt import App
from slack_bolt.adapter.socket_mode import SocketModeHandler

load_dotenv(find_dotenv())

logging.basicConfig(level=logging.DEBUG)

# ボットトークンとソケットモードハンドラーを使ってアプリを初期化します
app = App(token=os.environ.get("SLACK_BOT_TOKEN"))

user_id = "U07MEPH4AUA"

@app.message(user_id)
def message_test(message, say):
    print("-"*40)
    print(message)
    print("-"*40)
    say(f"Hello, <@{message['user']}>! This message's ts(message_id) is {message['ts']}")


@app.event("message")
def handle_message_events(body, logger):
    logger.info(body)


# アプリを起動します
if __name__ == "__main__":
    SocketModeHandler(app, os.environ["SLACK_APP_TOKEN"]).start()

