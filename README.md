## 技術スタック

| カテゴリ | 技術・ライブラリ | 用途 |
|---------|----------------|------|
| **言語** | Python | バックエンド開発 |
| | TypeScript | フロントエンド開発 |
| **フロントエンド** | Vue.js | SPA構築・UIコンポーネント |
| **バックエンド** | Flask | 軽量Webフレームワーク・RESTful API |
| | Flask-SQLAlchemy | ORM・データベース操作 |
| **スクレイピング** | requests | HTTPリクエスト送信 |
| | BeautifulSoup4 | HTML解析・データ抽出 |
| **データベース** | SQLite | ローカルデータストレージ |
| **設定管理** | python-dotenv | 環境変数管理 |
| **開発環境** | pyenv | Pythonバージョン管理 |

### Pythonライブラリ

ref. [backend/requirements.txt](backend/requirements.txt) 

- requests　… HTTPリクエスト送信（SUUMOサイトへのアクセス）
- beautifulsoup4　… HTML解析（物件情報の抽出）
- python-dotenv　… 環境変数管理（DB接続情報、APIキーなど）
- Flask　… 軽量Webフレームワーク（API エンドポイント作成）
- Flask-SQLAlchemy　… FlaskでのORM（データベース操作の簡素化）

## 主な機能

- SUUMOから賃貸物件情報の自動スクレイピング
- SQLiteデータベースへのデータ保存・管理
- Vue.jsによる検索・フィルタリングUI
- 物件詳細の表示とSUUMOページへの直接リンク
