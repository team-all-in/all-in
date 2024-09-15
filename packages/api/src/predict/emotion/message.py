import openai
from fastapi import HTTPException
from dotenv import load_dotenv
import os

# .envファイルからAPIキーをロード
load_dotenv()

# OpenAI APIキーを設定
openai.api_key = os.getenv("OPENAI_API_KEY")

# メッセージを生成する関数
def generate_message(input_text: str, emotion: str, emoji: str):
    prompt = f"""
    元のメッセージ: {input_text}

    感情: {emotion} {emoji}

    【対応】
    あなたは次のアクションを取ると良いでしょう:
    1. {emotion}に応じて冷静に対処する。
    2. 相手の気持ちを理解し、サポートする。
    """

    try:
        # ストリーミングなしでChatCompletionを使用
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "あなたは感情に基づく簡潔な対応を提案するアシスタントです。"},
                {"role": "user", "content": prompt}
            ],
            max_tokens=100,
            temperature=0.5
        )

        # レスポンスから生成されたメッセージを取得
        generated_message = response['choices'][0]['message']['content'].strip()

        return generated_message

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"メッセージ生成中にエラーが発生しました: {str(e)}")
