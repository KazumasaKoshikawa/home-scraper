import React from "react";
import { FilterBar } from "./components/FilterBar.tsx";
import { HomeList } from "./components/HomeList.tsx";
import { Container, CssBaseline } from "@mui/material";

// アプリケーションのメインコンポーネント
export function App() {
  return (
    <>
      {/* MUIのデフォルトスタイルを適用する */}
      <CssBaseline />
      {/* 画面中央に配置するためのコンテナ。最大幅はmd。上下に余白を持たせている。 */}
      <Container
        maxWidth="md"
        sx={{
          mx: "auto",
          minHeight: "100vh",
          py: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* タイトル表示 */}
        <h1>SUUMO SCRAPER by KK</h1>
        {/* フィルタバーを表示する。物件の絞り込みができる。 */}
        <FilterBar />
        {/* 物件リストをテーブル形式で表示する。 */}
        <HomeList />
      </Container>
    </>
  );
}
