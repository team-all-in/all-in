import openai
from fastapi import HTTPException
from dotenv import load_dotenv
import os

# .envファイルからAPIキーをロード
load_dotenv()

# OpenAI APIキーを設定
openai.api_key = os.getenv("OPENAI_API_KEY")

SYSTEM_PROMPT = """
あなたは感情分析を行うアシスタントです。

入力されたテキストに相当する絵文字を出力しなさい。
**出力は一つの絵文字のみにすること。**

### 入力例
こんにちは

### 出力例
😊
"""

# 感情を分析する関数
def analyze_emotion(input_text: str):
    try:
        # ChatCompletionを使用して感情を分析
        response = openai.ChatCompletion.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": input_text}
            ]
        )

        # レスポンスから感情の絵文字を取得
        emotion = response['choices'][0]['message']['content'].strip()

        return {"emotion": emotion}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"感情分析中にエラーが発生しました: {str(e)}")
