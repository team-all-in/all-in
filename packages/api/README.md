# init
1. 以下で依存関係をインストール
```
pip install uv
uv venv -p 3.11
uv pip install -r requirements.txt
```
2. 環境変数を設定  
以下のコマンドでファイルを複製したのち、値を代入
```
cp .env.sample .env
```

# How to Run
```
docker build -t all-in-api .
docker run -v .:/app -p 8000:8000 all-in-api
```