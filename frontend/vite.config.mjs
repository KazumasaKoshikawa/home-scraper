import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// TODO GitHub Pagesでサブパス（リポジトリ名）を公開する場合
// base: を必ず指定する必要があります。
// これを指定しないと、公開時にリソース（JS/CSS等）が404になります。
export default defineConfig({
    base: '/home-scraper-frontend/', // ← GitHubリポジトリ構造に合わせる
    plugins: [react()],
    root: '.',
    build: {
        outDir: 'dist',
    },
});
