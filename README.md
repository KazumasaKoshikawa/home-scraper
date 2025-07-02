# 技術スタック

- **フロントエンド**: React, TypeScript, Vite, MUI (Material-UI)
- **バックエンド**: Python, Flask, Flask-SQLAlchemy, BeautifulSoup, requests
- **データベース**: SQLite

# Frontend

## ローカル確認

ローカルで開発サーバーを起動して、即時に UI の変更を確認する方法

```shell
# ローカル起動: npm start
cd $HOME/Git/private/local_home_scraper/frontend ; npm start
# Vite を使っている場合
npm run dev
```

起動後、ブラウザで http://localhost:3000 を開くとアプリが表示されます。

コードを保存すると自動でブラウザがリロードされ、すぐに UI の変更を確認できます。

ページ URL 　
http://localhost:3000/home-scraper-frontend

## GitHub Pages

設定画面  
https://github.com/KazumasaKoshikawa/home-scraper-frontend/settings/pages

ページ URL  
[package.json](package.json) の"homepage"キー参照

Github Pages（gh-pages リポジトリ）へのデプロイ方法

```shell
# デプロイ: npm run deploy
cd $HOME/Git/private/local_home_scraper/frontend ; npm run deploy
```

# Backend

### Python 使用ライブラリ

| ライブラリ名     | 用途・説明                                        |
| ---------------- | ------------------------------------------------- |
| Flask            | 軽量 Web フレームワーク（API エンドポイント作成） |
| Flask-SQLAlchemy | Flask での ORM（データベース操作の簡素化）        |
| requests         | HTTP リクエスト送信（SUUMO サイトへのアクセス）   |
| beautifulsoup4   | HTML 解析（物件情報の抽出）                       |
| python-dotenv    | 環境変数管理（DB 接続情報、API キーなど）         |

バックエンドで使用する全依存ライブラリを管理するファイル  
-> ref. [`requirements.txt`](backend/requirements.txt)
