from enum import Enum
from pydantic import BaseModel

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