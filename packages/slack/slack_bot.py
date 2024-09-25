import logging
import os
import uuid
from datetime import datetime

from fastapi import FastAPI
from threading import Thread
import uvicorn
import requests
from app_setting import supabase_client
from dotenv import load_dotenv
from slack_bolt import App
from slack_sdk import WebClient
# from slack_bolt.adapter.socket_mode import SocketModeHandler

from slack_bolt.oauth.oauth_settings import OAuthSettings
from slack_sdk.oauth.installation_store import FileInstallationStore
from slack_sdk.oauth.state_store import FileOAuthStateStore

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# 複数のワークスペースに対応させる
oauth_settings = OAuthSettings(
    client_id=os.environ["SLACK_CLIENT_ID"],
    client_secret=os.environ["SLACK_CLIENT_SECRET"],
    scopes= [
        # "channels:join",
        "team:read",
        "channels:read",
        "channels:history",
        "groups:read",  # private channel
        "groups:history",  # private channel
        "users:read"
    ],
    installation_store=FileInstallationStore(base_dir="./data/installations"),
    state_store=FileOAuthStateStore(expiration_seconds=600, base_dir="./data/states"),
    # token_rotation_expiration_minutes=60 * 12,  # 12 hours
)

app = App(
    signing_secret=os.environ["SLACK_SIGNING_SECRET"],
    oauth_settings=oauth_settings,
    logger=logger,
)

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


def get_priority_and_sentient(message_text):
    response = requests.get(
        f"https://kctebirgsq.ap-northeast-1.awsapprunner.com/predict?text={message_text}"
    ).json()
    return response["sentiment"], response["priority"]


@app.event("message")
def handle_message(event, client: WebClient):
    logger.info(event)
    message = event["text"]
    server_id = event["team"]
    channel_id = event["channel"]
    message_id = event["ts"]

    logger.info('-'*10 + ' slack bot log ' + '-'*10)
    logger.info(message)
    logger.info(server_id)
    logger.info(channel_id)
    logger.info(message_id)

    mention_member_ids = []

    message_elements = event["blocks"][0]["elements"][0]["elements"]

    for element in message_elements:
        if element["type"] == "user":
            mention_member_ids.append(element["user_id"])

    if len(mention_member_ids) == 0:
        return

    # メンションをされたユーザーがsupabaseに登録されているユーザーかを調べる
    insert_data = []
    user_ids = (
        supabase_client.table("all-in-relation")
        .select("user_id")
        .in_("slack_member_id", mention_member_ids)
        .execute()
    ).data

    # 引数に入ったclientには、受け取ったworkspaceのtokenが入っている
    # なので、これをそのまま使えば、情報取得ができる
    server_info = client.team_info(team=server_id)["team"]

    message_link = (
        server_info["url"]
        + "archives/"
        + channel_id
        + "/p"
        + message_id.replace(".", "")
    )

    sentiment, priority = get_priority_and_sentient(message)

    for user in user_ids:
        user_id = user["user_id"]

        insert_data.append(
            {
                "id": str(uuid.uuid4()),
                "user_id": user_id,
                "app": "slack",
                "server_id": server_id,
                "channel_id": channel_id,
                "message_id": message_id,
                "sentiment": sentiment,
                "priority": priority,
                "send_at": datetime.fromtimestamp(float(message_id.split(".")[0])).strftime(
                    "%Y-%m-%dT%H:%M:%SZ"
                ),
                "message_link": message_link,
            }
        )

    if insert_data == []:
        return

    try:
        supabase_client.table("messages").insert(insert_data).execute()

        logger.info("Inserted successfully")
    except Exception as e:
        logger.error(e)


# アプリを起動
if __name__ == "__main__":
    keep_alive()
    # SocketModeHandler(app=app, app_token=os.environ["SLACK_APP_TOKEN"]).start()
    app.start(port=3000)
