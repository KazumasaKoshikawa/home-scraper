import React from "react";
import FilterBar from "./components/FilterBar.tsx";
import PropertyTable from "./components/PropertyTable.tsx";

const App = () => (
  <>
    <h1>SUUMO賃貸一覧 by KK</h1>
    <FilterBar />
    <PropertyTable />
  </>
);

export default App;
