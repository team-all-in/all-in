from pydantic import BaseModel

# TextInput の定義
class TextInput(BaseModel):
    text: str
