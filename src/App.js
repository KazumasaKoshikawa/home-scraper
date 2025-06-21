import React, { useEffect, useState } from "react";

// フィルターバーコンポーネント
function FilterBar({ rentFrom, rentTo, setRentFrom, setRentTo, onFilter }) {
  return (
    <div className="filter-bar" style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 32 }}>
      <label>
        賃料（from）
        <input
          type="number"
          min="0"
          value={rentFrom}
          onChange={e => setRentFrom(e.target.value)}
          className="input-field"
          style={{ marginLeft: 8, borderRadius: 8, padding: '8px 12px', border: '1px solid #A3AAAE' }}
          placeholder="下限"
        />
      </label>
      <span>〜</span>
      <label>
        賃料（to）
        <input
          type="number"
          min="0"
          value={rentTo}
          onChange={e => setRentTo(e.target.value)}
          className="input-field"
          style={{ marginLeft: 8, borderRadius: 8, padding: '8px 12px', border: '1px solid #A3AAAE' }}
          placeholder="上限"
        />
      </label>
      <button
        className="primary-btn"
        style={{ marginLeft: 16, background: '#007AFF', color: '#fff', border: 'none', borderRadius: 12, padding: '12px 24px', minHeight: 44, fontWeight: 600, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', cursor: 'pointer' }}
        onClick={onFilter}
      >
        絞り込み
      </button>
    </div>
  );
}

// 物件リストテーブルコンポーネント
function PropertyTable({ properties }) {
  return (
    <table className="property-table" style={{ width: '100%', background: '#fff', borderRadius: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', borderCollapse: 'separate', borderSpacing: 0 }}>
      <thead>
        <tr style={{ background: '#F5F5F7' }}>
          <th>物件名</th>
          <th>住所</th>
          <th>賃料（最小）</th>
          <th>賃料（最大）</th>
          <th>間取り</th>
          <th>面積（最小）</th>
          <th>面積（最大）</th>
        </tr>
      </thead>
      <tbody>
        {properties.map((p) => (
          <tr key={p.id} style={{ borderBottom: '1px solid #EEEEEE' }}>
            <td>{p.name}</td>
            <td>{p.address}</td>
            <td>{p.rent_min}</td>
            <td>{p.rent_max}</td>
            <td>{p.layout}</td>
            <td>{p.area_min}</td>
            <td>{p.area_max}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

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
      <h1 className="text-large-title" style={{ marginBottom: 24 }}>賃貸物件一覧（仮データ）</h1>
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