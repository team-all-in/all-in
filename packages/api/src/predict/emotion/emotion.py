import openai
from fastapi import HTTPException
from dotenv import load_dotenv
import os

# .envファイルからAPIキーをロード
load_dotenv()

# OpenAI APIキーを設定
openai.api_key = os.getenv("OPENAI_API_KEY")

# 感情を分析する関数
def analyze_emotion(input_text: str):
    try:
        # ChatCompletionを使用して感情を分析
        response = openai.ChatCompletion.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "あなたは感情分析を行うアシスタントです。"},
                {"role": "user", "content": f"次のテキストの感情を一つの絵文字（例: 😂）で教えてください: {input_text}"}
            ]
        )

        # レスポンスから感情の絵文字を取得
        emotion = response['choices'][0]['message']['content'].strip()

        return {"emotion": emotion}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"感情分析中にエラーが発生しました: {str(e)}")
