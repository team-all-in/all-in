import openai
from fastapi import HTTPException
from dotenv import load_dotenv
import os

load_dotenv()

# OpenAI APIキーを設定
openai.api_key = os.getenv("OPENAI_API_KEY")

# メッセージを生成する関数（ストリーミング対応）
async def generate_message(input_text: str, emotion: str, emoji: str):
    prompt = f"""
    元のメッセージ: {input_text}

    感情: {emotion} {emoji}

    【対応】
    あなたは次のアクションを取ると良いでしょう:
    1. {emotion}に応じて冷静に対処する。
    2. 相手の気持ちを理解し、サポートする。
    """

    try:
        # ストリーミングを使ってChatCompletionを作成
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "あなたは感情に基づく簡潔な対応を提案するアシスタントです。"},
                {"role": "user", "content": prompt}
            ],
            max_tokens=100,
            temperature=0.5,
            stream=True
        )

        # ストリームからのメッセージを部分的に結合して最終的なメッセージを生成
        generated_message = ""
        for chunk in response:
            if 'choices' in chunk and chunk['choices'][0]['delta'].get('content'):
                generated_message += chunk['choices'][0]['delta']['content']

        return generated_message.strip()

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"メッセージ生成中にエラーが発生しました: {str(e)}")
