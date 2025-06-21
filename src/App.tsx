import React from "react";
import { FilterBar } from "./components/FilterBar.tsx";
import { PropertyTable } from "./components/PropertyTable.tsx";

export function App() {
  return (
    <>
      <h1>SUUMO賃貸一覧 by KK</h1>
      <FilterBar />
      <PropertyTable />
    </>
  );
}
