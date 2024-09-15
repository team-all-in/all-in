from datetime import datetime
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
from decode import decrypt

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
    insert_data = []
    for member_id in mention_member_ids:
        user_id = (
            supabase_client
            .table('all-in-relation')
            .select('slack_member_id')
            .eq('slack_member_id', member_id)
            .execute()
        ).data[0]['user_id']

        if not user_id:
            continue

        insert_data.append({
            'id': str(uuid.uuid4()),
            'user_id': user_id,
            'app': 'slack',
            'server_id': server_id,
            'channel_id': channel_id,
            'message_id': message_id,
            'sentiment': mock_sentiment(message),
            'priority': mock_priority(message),
        })

    if insert_data == []:
        pass

    try:
        response = supabase_client.table('messages').insert(insert_data).execute()

        if response['status'] == 201:
            print('Inserted successfully')
    except Exception as e:
        print(e)

def add_bot_to_all_channels():
    channels_list = client.conversations_list()
    channel_ids = [channel['id'] for channel in channels_list['channels']]

    for channel_id in channel_ids:
        # 全チャンネルにbotを追加
        client.conversations_join(channel=channel_id)

# # クライアントからのリクエストとして受け取る
# # 基本複数個
user_id = ""
server_id = 'T07N3HCA1S4'
channel_id = 'C07MELMF3TM'
message_id = '1726380661.651149'

def get_message(user_id, server_id, channel_id, message_id):
    # 暗号化されたトークンを取得
    encrypted_token = (
        supabase_client
        .table('slack_settings')
        .select('access_token')
        .eq('user_id', user_id)
        .execute()
    ).data[0]['access_token']
    # 複合化する
    slack_access_token = decrypt(encrypted_token)
    client = WebClient(token=slack_access_token)

    # サーバー
    server_info = client.team_info(team=server_id)["team"]
    server_name = server_info['name']
    server_image = server_info['icon']['image_34']

    # メッセージ
    message = client.conversations_history(channel=channel_id, inclusive=True, latest=message_id, limit=1)
    context = message['messages'][0]['text']
    message_link = server_info['url'] + "archives/" + channel_id + "/p" + message_id.replace(".", "")

    # 送信者
    member_info = client.users_info(user=message['messages'][0]['user'])
    sender_name = member_info['user']['profile']['display_name'] if member_info['user']['profile']['display_name'] != "" else member_info['user']['real_name']
    sender_image = member_info['user']['profile']['image_48']

    response = {
        "id": message_id,
        "server_name": server_name,
        "server_image": server_image,
        "sender_name": sender_name,
        "sender_image": sender_image,
        "content": context,
        "message_link": message_link,
        "send_at": float(message_id.split(".")[0]),
    }

    return response

response = get_message(user_id, server_id, channel_id, message_id)
print('-'*20 + 'response' + '-'*20)
print(response)

# アプリを起動します
if __name__ == "__main__":
    SocketModeHandler(app, os.environ["SLACK_APP_TOKEN"]).start()
