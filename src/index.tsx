import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App.tsx";
import { AppProvider } from "./contexts/Context.tsx";
import { reportWebVitals } from "./reportWebVitals.ts";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

// MUIのカスタムテーマを作成する
const theme = createTheme({
  palette: {
    primary: { main: "#007AFF" },
    background: { default: "#F5F5F7", paper: "#fff" },
    text: { primary: "#1D1D1F", secondary: "#666" },
  },
  shape: { borderRadius: 16 },
  typography: {
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif",
    h1: { fontSize: 34, fontWeight: 700 },
  },
});

// Reactアプリのルート要素を取得し、アプリ全体を描画する
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* MUIのテーマとCSSリセットを全体に適用する */}
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* 画面中央に配置するためのコンテナ。最大幅はmd。上下に余白を持たせている。 */}
      <Container maxWidth="md" sx={{ py: 4 }}>
        {/* アプリ全体の状態管理ProviderでAppをラップする */}
        <AppProvider>
          <App />
        </AppProvider>
      </Container>
    </ThemeProvider>
  </React.StrictMode>
);

// パフォーマンス計測を行いたい場合は、下記関数にコールバックを渡す
// 例: reportWebVitals(console.log)
reportWebVitals();
