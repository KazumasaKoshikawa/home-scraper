CREATE TABLE IF NOT EXISTS properties (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT UNIQUE,
    suumo_code TEXT,
    name TEXT,
    address TEXT,
    rent_min INTEGER,
    rent_max INTEGER,
    admin_fee_min INTEGER,
    admin_fee_max INTEGER,
    deposit INTEGER,
    key_money INTEGER,
    guarantee_money INTEGER,
    deduction INTEGER,
    amortization INTEGER,
    layout TEXT,
    area_min REAL,
    area_max REAL,
    building_age TEXT,
    floor TEXT,
    building_type TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME
);

CREATE TABLE IF NOT EXISTS nearest_stations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    property_id INTEGER,
    station_name TEXT,
    FOREIGN KEY(property_id) REFERENCES properties(id)
);
