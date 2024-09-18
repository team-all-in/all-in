# 開発環境の始め方

```bash
# ルートで作業します
pwd 
# -> path/to/all-in

# 環境変数を設定します
# 中身は適宜変更してください
cp packages/web/.env.local.example packages/web/.env.local

# パッケージをインストールします
pnpm install

# 開発サーバーを立ち上げます
pnpm dev
```

