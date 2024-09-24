import openai
from fastapi import HTTPException
from dotenv import load_dotenv
import os

# .envファイルからAPIキーをロード
load_dotenv()

# OpenAI APIキーを設定
openai.api_key = os.getenv("OPENAI_API_KEY")

SYSTEM_PROMPT = """
あなたはメッセージの優先順位を決めるアシスタントです。
入力されたメッセージに対して、適切な優先順位をつけなさい。
出力は次の中から選ぶこと: critical, urgent, high, medium, low

### 優先順位の評価基準
- 極めて重要で、即時対応が必要: critical
- 早急に対応すべき: urgent
- 重要で、対応が必要: high
- 重要だが緊急でない: medium
- 緊急でも重要でもない: low

### 入力例
このプロジェクトの締め切りを延期する必要があります。

### 出力例
high

"""


# メッセージに基づき優先順位を決定する関数
def prioritize_message(input_text: str):

    try:
        # ChatCompletionを使用して優先順位を生成
        response = openai.ChatCompletion.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": input_text}
            ],
            max_tokens=100,
            temperature=0.5
        )

        # レスポンスから優先順位を取得
        priority = response['choices'][0]['message']['content'].strip()

        print(f"priority: {priority}")

        # 「優先順位: 」などの余分な部分が含まれている場合を削除
        if "優先順位:" in priority:
            priority = priority.replace("優先順位:", "").strip()

        priority_number_dict = {
            "low": 1,
            "medium": 2,
            "high": 3,
            "urgent": 4,
            "critical": 5,
        }

        if priority in priority_number_dict.keys():
            return priority_number_dict[priority]
        else:
            return priority_number_dict["medium"]

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"優先順位決定中にエラーが発生しました: {str(e)}")
