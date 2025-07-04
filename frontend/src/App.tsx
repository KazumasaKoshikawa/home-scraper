import React from "react";
import { Filter } from "./components/Filter.tsx";
import { List } from "./components/List.tsx";
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
      <Filter />
      {/* 物件リストをテーブル形式で表示する。 */}
      <List />
    </>
  );
}
