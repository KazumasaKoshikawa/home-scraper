## ローカル確認

ローカルで開発サーバーを起動して、即時に UI の変更を確認

```shell
# プロジェクトディレクトリに移動
cd $HOME/Git/private/local_home_scraper_f

# 開発サーバーを起動
npm start

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
[package.json](package.json) の"homepage"参照

Github Pages（gh-pages リポジトリ）へのデプロイ方法

```shell
# デプロイ: npm run deploy
cd $HOME/Git/private/local_home_scraper_f ; npm run deploy
```
