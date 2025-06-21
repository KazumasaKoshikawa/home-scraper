import React from "react";

export default function FilterBar({ rentFrom, rentTo, setRentFrom, setRentTo, onFilter }) {
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