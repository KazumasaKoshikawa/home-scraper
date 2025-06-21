import React from "react";

export default function PropertyTable({ properties }) {
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