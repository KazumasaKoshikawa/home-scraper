import React from "react";

const layouts = ["", "1R", "1K", "1DK", "1LDK", "2DK", "2LDK", "3DK", "3LDK"];
const buildingTypes = ["", "マンション", "アパート"];

export default function FilterBar({
    rentFrom, setRentFrom,
    rentTo, setRentTo,
    layout, setLayout,
    areaFrom, setAreaFrom,
    areaTo, setAreaTo,
    buildingType, setBuildingType,
    buildingAgeFrom, setBuildingAgeFrom,
    buildingAgeTo, setBuildingAgeTo,
    address, setAddress,
    onFilter
}) {
    return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
            <input type="number" placeholder="家賃(下限)" value={rentFrom} onChange={e => setRentFrom(e.target.value)} style={{ width: 90 }} />
            <input type="number" placeholder="家賃(上限)" value={rentTo} onChange={e => setRentTo(e.target.value)} style={{ width: 90 }} />
            <select value={layout} onChange={e => setLayout(e.target.value)} style={{ width: 90 }}>
                {layouts.map(l => <option key={l} value={l}>{l || "間取り"}</option>)}
            </select>
            <input type="number" placeholder="面積(下限)" value={areaFrom} onChange={e => setAreaFrom(e.target.value)} style={{ width: 90 }} />
            <input type="number" placeholder="面積(上限)" value={areaTo} onChange={e => setAreaTo(e.target.value)} style={{ width: 90 }} />
            <select value={buildingType} onChange={e => setBuildingType(e.target.value)} style={{ width: 90 }}>
                {buildingTypes.map(t => <option key={t} value={t}>{t || "建物種別"}</option>)}
            </select>
            <input type="number" placeholder="築年数(下限)" value={buildingAgeFrom} onChange={e => setBuildingAgeFrom(e.target.value)} style={{ width: 110 }} />
            <input type="number" placeholder="築年数(上限)" value={buildingAgeTo} onChange={e => setBuildingAgeTo(e.target.value)} style={{ width: 110 }} />
            <input type="text" placeholder="住所キーワード" value={address} onChange={e => setAddress(e.target.value)} style={{ width: 120 }} />
            <button onClick={onFilter}>検索</button>
        </div>
    );
} 