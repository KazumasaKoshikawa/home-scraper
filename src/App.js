import React, { useEffect, useState } from "react";
import FilterBar from "./components/FilterBar";
import PropertyTable from "./components/PropertyTable";

export default function App() {
  const [properties, setProperties] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [rentFrom, setRentFrom] = useState("");
  const [rentTo, setRentTo] = useState("");
  const [layout, setLayout] = useState("");
  const [areaFrom, setAreaFrom] = useState("");
  const [areaTo, setAreaTo] = useState("");
  const [buildingType, setBuildingType] = useState("");
  const [buildingAgeFrom, setBuildingAgeFrom] = useState("");
  const [buildingAgeTo, setBuildingAgeTo] = useState("");
  const [address, setAddress] = useState("");

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
        // 家賃
        const from = rentFrom ? parseInt(rentFrom, 10) : -Infinity;
        const to = rentTo ? parseInt(rentTo, 10) : Infinity;
        if (!(p.rent_min >= from && p.rent_max <= to)) return false;
        // 間取り
        if (layout && p.layout !== layout) return false;
        // 面積
        const areaMin = areaFrom ? parseFloat(areaFrom) : -Infinity;
        const areaMax = areaTo ? parseFloat(areaTo) : Infinity;
        if (!(p.area_min >= areaMin && p.area_max <= areaMax)) return false;
        // 建物種別
        if (buildingType && p.building_type !== buildingType) return false;
        // 築年数
        const getAge = (str) => parseInt(str.replace(/[^0-9]/g, ''), 10) || 0;
        const age = getAge(p.building_age);
        const ageFrom = buildingAgeFrom ? parseInt(buildingAgeFrom, 10) : -Infinity;
        const ageTo = buildingAgeTo ? parseInt(buildingAgeTo, 10) : Infinity;
        if (!(age >= ageFrom && age <= ageTo)) return false;
        // 住所
        if (address && !p.address.includes(address)) return false;
        return true;
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
        layout={layout}
        setLayout={setLayout}
        areaFrom={areaFrom}
        setAreaFrom={setAreaFrom}
        areaTo={areaTo}
        setAreaTo={setAreaTo}
        buildingType={buildingType}
        setBuildingType={setBuildingType}
        buildingAgeFrom={buildingAgeFrom}
        setBuildingAgeFrom={setBuildingAgeFrom}
        buildingAgeTo={buildingAgeTo}
        setBuildingAgeTo={setBuildingAgeTo}
        address={address}
        setAddress={setAddress}
        onFilter={handleFilter}
      />
      <PropertyTable properties={filtered} />
    </div>
  );
}