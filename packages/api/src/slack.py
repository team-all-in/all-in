import logging
import os

from dotenv import find_dotenv, load_dotenv
from slack_bolt import App
from slack_bolt.adapter.socket_mode import SocketModeHandler
from slack_sdk import WebClient

load_dotenv(find_dotenv())

# logging.basicConfig(level=logging.DEBUG)

# ボットトークンとソケットモードハンドラーを使ってアプリを初期化します
app = App(token=os.environ.get("SLACK_BOT_TOKEN"))
client = WebClient(token=os.environ.get("SLACK_BOT_TOKEN"))

# @app.event("message")
# def handle_message_events(body, logger):
#     logger.info(body)



user_id = "U07MEPH4AUA"

@app.message(user_id)
def message_test(message, say):
    print("-"*40)
    print(message)
    print("-"*40)
    say(f"channel: {message['channel']}, ts(message_id) is {message['ts']},\n {message['text']}")


channels_list = client.conversations_list()
channel_ids = [channel['id'] for channel in channels_list['channels']]

for channel_id in channel_ids:
    # 全チャンネルにbotを追加
    client.conversations_join(channel=channel_id)

channel = 'C07MELMF3TM'
ts = '1726314416.256329'

history = client.conversations_history(channel=channel, inclusive=True, latest=ts, limit=1)
print(history['messages'][0]['text'])

# アプリを起動します
if __name__ == "__main__":
    SocketModeHandler(app, os.environ["SLACK_APP_TOKEN"]).start()
