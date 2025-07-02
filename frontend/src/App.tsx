import React from "react";
import { FilterBar } from "./components/FilterBar.tsx";
import { HomeList } from "./components/HomeList.tsx";
import { CssBaseline } from "@mui/material";

// アプリケーションのメインコンポーネント
export function App() {
  return (
    <>
      {/* MUIのデフォルトスタイルを適用する */}
      <CssBaseline />
      {/* タイトル表示 */}
      <h1>SUUMO SCRAPER by KK</h1>
      {/* フィルタバーを表示する。物件の絞り込みができる。 */}
      <FilterBar />
      {/* 物件リストをテーブル形式で表示する。 */}
      <HomeList />
    </>
  );
}
