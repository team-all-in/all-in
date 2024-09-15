import logging
import os
import uuid

from dotenv import find_dotenv, load_dotenv
from slack_bolt import App
from slack_bolt.adapter.socket_mode import SocketModeHandler
from slack_bolt.oauth.oauth_settings import OAuthSettings
from slack_sdk import WebClient
from slack_sdk.oauth.installation_store import FileInstallationStore
from slack_sdk.oauth.state_store import FileOAuthStateStore

from app_setting import supabase_client, get_current_user


load_dotenv(find_dotenv())

# logging.basicConfig(level=logging.DEBUG)

# oauth_settings = OAuthSettings(
#     client_id=os.environ["SLACK_CLIENT_ID"],
#     client_secret=os.environ["SLACK_CLIENT_SECRET"],
#     scopes=["channels:read", "groups:read", "chat:write"],
#     redirect_uri='https://localhost:8000/',
#     installation_store=FileInstallationStore(base_dir="./data/installations"),
#     state_store=FileOAuthStateStore(expiration_seconds=600, base_dir="./data/states")
# )

# ボットトークンとソケットモードハンドラーを使ってアプリを初期化します
app = App(token=os.environ.get("SLACK_BOT_TOKEN"))
# app = App(
#     signing_secret=os.environ.get("SLACK_SIGNING_SECRET"),
#     oauth_settings=oauth_settings
# )

client = WebClient(app._token)

# 優先度のモック
def mock_priority(message_text):
    return "high"

def mock_sentiment(message_text):
    return "positive"


member_id = "U07MEPH4AUA"

# @app.message(member_id)
# def message_test(message):
#     server_id = message['team']
#     channel_id = message['channel']
#     message_id = message['ts']



#     message_text = message['text']

#     priority = mock_priority(message_text)
#     sentiment = mock_sentiment(message_text)

    # supabase_client.table('messages').insert([
    #     {
    #         'id': str(uuid.uuid4()),
    #         'user_id': "?????????????",
    #         'app': 'slack',
    #         'channel_id': channel_id,
    #         'message_id': message_id,
    #         'sentiment': sentiment,
    #         'priority': priority,
    #     }
    # ]).execute()


@app.event('message')
def handle_message(event, say):
    message = event['text']
    server_id = event['team']
    channel_id = event['channel']
    message_id = event['ts']

    mention_member_ids = []

    message_elements = event['blocks'][0]['elements'][0]['elements']
    mention_cnt = 0
    for element in message_elements:
        if element['type'] == 'user':
            mention_member_ids.append(element['user_id'])
            mention_cnt += 1
    if mention_cnt == 0:
        pass
    # メンションをされたユーザーがsupabaseに登録されているユーザーかを調べる
    print('-'*50)
    print(event)
    print(event['user'])
    print('-'*50)

    priority = mock_priority(message)
    sentiment = mock_sentiment(message)

    # メッセージを送信
    say(f"Hello, <@{event['user']}>!")


def add_bot_to_all_channels():
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
