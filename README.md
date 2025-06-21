## 技術スタック

| カテゴリ                         | 技術・ライブラリ | 用途                                 |
| -------------------------------- | ---------------- | ------------------------------------ |
| **言語**                         | Python           | バックエンド開発                     |
|                                  | TypeScript       | フロントエンド開発                   |
| **フロントエンド**               | Vue.js           | SPA 構築・UI コンポーネント          |
| **バックエンド**                 | Flask            | 軽量 Web フレームワーク・RESTful API |
|                                  | Flask-SQLAlchemy | ORM・データベース操作                |
| **スクレイピング<br>ライブラリ** | requests         | HTTP リクエスト送信                  |
|                                  | BeautifulSoup4   | HTML 解析・データ抽出                |
| **データベース**                 | SQLite           | ローカルデータストレージ             |
| **設定管理**                     | python-dotenv    | 環境変数管理                         |
| **開発環境**                     | pyenv            | Python バージョン管理                |

### Python ライブラリ

ref. [backend/requirements.txt](backend/requirements.txt)

- requests 　… HTTP リクエスト送信（SUUMO サイトへのアクセス）
- beautifulsoup4 　… HTML 解析（物件情報の抽出）
- python-dotenv 　… 環境変数管理（DB 接続情報、API キーなど）
- Flask 　… 軽量 Web フレームワーク（API エンドポイント作成）
- Flask-SQLAlchemy 　… Flask での ORM（データベース操作の簡素化）

## GitHub Pages

https://github.com/KazumasaKoshikawa/home-scraper-front/settings/pages

gh-pages リポジトリへのデプロイ

```shell
cd ＄HOME/Git/private/local_rental_housing_scraper/frontend
npm run deploy
```
