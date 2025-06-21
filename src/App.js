import React, { useEffect, useState } from "react";
import FilterBar from "./components/FilterBar";
import PropertyTable from "./components/PropertyTable";

export default function App() {
  const [properties, setProperties] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [rentFrom, setRentFrom] = useState("");
  const [rentTo, setRentTo] = useState("");

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/static_data.json")
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
        setFiltered(data);
      });
  }, []);

  const handleFilter = () => {
    setFiltered(
      properties.filter((p) => {
        const from = rentFrom ? parseInt(rentFrom, 10) : -Infinity;
        const to = rentTo ? parseInt(rentTo, 10) : Infinity;
        return p.rent_min >= from && p.rent_max <= to;
      })
    );
  };

  return (
    <div className="container">
      <h1 className="text-large-title" style={{ marginBottom: 24 }}>SUUMO賃貸一覧 by KK</h1>
      <FilterBar
        rentFrom={rentFrom}
        rentTo={rentTo}
        setRentFrom={setRentFrom}
        setRentTo={setRentTo}
        onFilter={handleFilter}
      />
      <PropertyTable properties={filtered} />
    </div>
  );
}