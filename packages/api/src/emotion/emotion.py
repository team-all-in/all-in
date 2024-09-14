import openai
from fastapi import HTTPException
from dotenv import load_dotenv
import os

load_dotenv()

# OpenAI APIキーを設定
openai.api_key = os.getenv("OPENAI_API_KEY")

# 感情と絵文字の対応辞書
emotions_emoji_dict = {
    "怒り": "😠",
    "嫌悪": "🤮",
    "恐怖": "😨😱",
    "幸せ": "🤗",
    "喜び": "😂",
    "中立": "😐",
    "悲しみ": "😔",
    "恥": "😳",
    "驚き": "😮"
}

# 感情を分析する関数
async def analyze_emotion(input_text: str):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "あなたは感情分析を行うアシスタントです。"},
                {"role": "user", "content": f"次のテキストの感情を一語で教えてください: {input_text}"}
            ]
        )
        emotion = response['choices'][0]['message']['content'].strip()
        emoji = emotions_emoji_dict.get(emotion, "😐")  # 対応する絵文字がなければ中立を返す
        return {"emotion": emotion, "emoji": emoji}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"感情分析中にエラーが発生しました: {str(e)}")
