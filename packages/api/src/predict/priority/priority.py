import openai
from fastapi import HTTPException
from dotenv import load_dotenv
import os

# .envファイルからAPIキーをロード
load_dotenv()

# OpenAI APIキーを設定
openai.api_key = os.getenv("OPENAI_API_KEY")

# メッセージに基づき優先順位を決定する関数
def prioritize_message(input_text: str):
    prompt = f"""
    以下のメッセージに対して、適切な優先順位（low, medium, high, urgent, critical）をつけてください。
    メッセージ: {input_text}

    優先順位の基準:
    1. 緊急でも重要でもない内容は"low"
    2. 重要だが緊急でない内容は"medium"
    3. 重要で、対応が必要な内容は"high"
    4. 早急に対応すべき内容は"urgent"
    5. 極めて重要で、即時対応が必要な内容は"critical"

    それでは、このメッセージの優先順位を一つ選んでください。
    """

    try:
        # ChatCompletionを使用して優先順位を生成
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "あなたはメッセージの優先順位を決めるアシスタントです。"},
                {"role": "user", "content": prompt}
            ],
            max_tokens=100,
            temperature=0.5
        )

        # レスポンスから優先順位を取得
        priority = response['choices'][0]['message']['content'].strip()

        # 「優先順位: 」などの余分な部分が含まれている場合を削除
        if "優先順位:" in priority:
            priority = priority.replace("優先順位:", "").strip()
            
        priority_number_dict = {
            "low": 0,
            "medium": 1,
            "high": 2,
            "urgent": 3,
            "critical": 4
        }
        
        if priority in priority_number_dict.keys():
            return priority_number_dict[priority]
        else:
            return priority_number_dict["medium"]

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"優先順位決定中にエラーが発生しました: {str(e)}")
