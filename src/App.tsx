import React from "react";
import { FilterBar } from "./components/FilterBar.tsx";
import { HomeList } from "./components/HomeList.tsx";
import { Container, CssBaseline } from "@mui/material";

export function App() {
  return (
    <>
      <CssBaseline />
      <Container
        maxWidth={false}
        sx={{
          width: "90vw",
          maxWidth: "90vw",
          margin: "0 auto",
          minHeight: "100vh",
          paddingTop: 2,
          paddingBottom: 2,
        }}
      >
        <h1>SUUMO SCRAPER by KK</h1>
        <FilterBar />
        <HomeList />
      </Container>
    </>
  );
}
