from datetime import datetime

from decode import decrypt
from slack_sdk import WebClient
from src.app import MessageResponse
from src.app_setting import supabase_client


def get_slack_message(
    user_id: str, server_id: str, channel_id: str, message_id: str
) -> MessageResponse:
    # 暗号化されたトークンを取得
    encrypted_token = (
        supabase_client.table("slack_settings")
        .select("access_token")
        .eq("user_id", user_id)
        .execute()
    ).data[0]["access_token"]
    # 複合化
    slack_access_token = decrypt(encrypted_token)

    client = WebClient(token=slack_access_token)

    # サーバー
    server_info = client.team_info(team=server_id)["team"]
    server_name = server_info["name"]
    server_image = server_info["icon"]["image_34"]

    # チャンネル
    channel_info = client.conversations_info(channel=channel_id)["channel"]
    channel_name = channel_info["name"]

    # メッセージ
    message = client.conversations_history(
        channel=channel_id, inclusive=True, latest=message_id, limit=1
    )
    context = message["messages"][0]["text"]
    message_link = (
        server_info["url"]
        + "archives/"
        + channel_id
        + "/p"
        + message_id.replace(".", "")
    )

    # 送信者
    member_info = client.users_info(user=message["messages"][0]["user"])
    sender_name = (
        member_info["user"]["profile"]["display_name"]
        if member_info["user"]["profile"]["display_name"] != ""
        else member_info["user"]["real_name"]
    )
    sender_image = member_info["user"]["profile"]["image_48"]

    return {
        "id": message_id,
        "server_name": server_name,
        "server_image": server_image,
        "channel_name": channel_name,
        "sender_name": sender_name,
        "sender_image": sender_image,
        "content": context,
        "message_link": message_link,
        # '2024-09-14 05:45:02'
        "send_at": datetime.fromtimestamp(float(message_id.split(".")[0])).strftime(
            "%Y-%m-%dT%H:%M:%SZ"
        ),
    }


# また今度やる
# def add_bot_to_all_channels():
#     channels_list = client.conversations_list()
#     channel_ids = [channel['id'] for channel in channels_list['channels']]

#     for channel_id in channel_ids:
#         # 全チャンネルにbotを追加
#         client.conversations_join(channel=channel_id)
