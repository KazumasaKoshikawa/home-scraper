import React, { useEffect, useState } from "react";

function App() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetch("/properties.json")
      .then((res) => res.json())
      .then((data) => setProperties(data));
  }, []);

  return (
    <div>
      <h1>賃貸物件一覧（仮データ）</h1>
      <table border="1">
        <thead>
          <tr>
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
            <tr key={p.id}>
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
    </div>
  );
}

export default App;