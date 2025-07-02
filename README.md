# リポジトリが public の理由

本リポジトリは、GitHub Pages による Web サイト公開（静的フロントエンドのホスティング）を目的としているため、**public（公開）設定**としています。

- GitHub Pages は、リポジトリが public であることが公開要件（無料プランでは、private リポジトリで公開不可）
- フロントエンド（`frontend/` ディレクトリ）は静的ビルド成果物を GitHub Pages で公開する
- 公開内容は主に UI・クライアントサイドのコードであり、機密情報や個人情報は含めない
- バックエンドや環境変数などの機密情報は `.env` などで管理し、リポジトリには含めない

TODO:

- フロントが静的ページ公開なので、DB は不要かもしれない
- バックエンドではスクレイピングを行うが、永続化は DB ではなく Json ファイルなどで十分かもしれない

# 技術スタック

- **フロントエンド**: React, TypeScript, Vite, MUI (Material-UI)
- **バックエンド**: Python, Flask, Flask-SQLAlchemy, BeautifulSoup, requests
- **データベース**: SQLite

# Frontend

## ローカル確認

ローカルで開発サーバーを起動して、即時に UI の変更を確認する方法

```shell
# ローカル起動（Vite）
cd $HOME/Git/private/local_home_scraper/frontend ; npx vite
```

## GitHub Pages

設定画面  
https://github.com/KazumasaKoshikawa/home-scraper-frontend/settings/pages

ページ URL  
[package.json](package.json) の"homepage"キー参照

### Github Pages（gh-pages リポジトリ）へのデプロイ方法

```shell
# ビルド
cd $HOME/Git/private/local_home_scraper/frontend ; npx vite build
  -> ビルド成果物は `frontend/dist` ディレクトリに出力される

# デプロイ（package.json に定義しているコマンド）
cd $HOME/Git/private/local_home_scraper/frontend ; npm run deploy:github-pages
  -> コマンド内部の流れ：
     1. Viteで本番ビルド（dist/ディレクトリ生成）
     2. gh-pagesパッケージでdist/配下をgh-pagesブランチに自動デプロイ（GitHub Pagesで公開される）
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
