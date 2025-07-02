-- 物件情報テーブル（賃貸物件の基本情報を保持）
CREATE TABLE IF NOT EXISTS properties (
    id INTEGER PRIMARY KEY AUTOINCREMENT, -- 物件ID
    url TEXT UNIQUE,                      -- SUUMO物件URL（ユニーク制約）
    suumo_code TEXT UNIQUE,               -- SUUMO物件コード（ユニーク制約）
    name TEXT,                            -- 物件名
    address TEXT,                         -- 住所
    rent_min INTEGER,                     -- 最低賃料
    rent_max INTEGER,                     -- 最高賃料
    admin_fee_min INTEGER,                -- 最低管理費
    admin_fee_max INTEGER,                -- 最高管理費
    deposit INTEGER,                      -- 敷金
    key_money INTEGER,                    -- 礼金
    guarantee_money INTEGER,              -- 保証金
    deduction INTEGER,                    -- 償却
    amortization INTEGER,                 -- 敷引
    layout TEXT,                          -- 間取り
    area_min REAL,                        -- 最小専有面積
    area_max REAL,                        -- 最大専有面積
    building_age TEXT,                    -- 築年数
    floor TEXT,                           -- 階数
    building_type TEXT,                   -- 建物種別
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- 登録日時
    updated_at DATETIME,                  -- 更新日時
    is_deleted INTEGER DEFAULT 0          -- 論理削除フラグ（0:有効／1:削除）
);

-- 最寄駅情報テーブル（物件に紐づく最寄駅情報を保持）
CREATE TABLE IF NOT EXISTS nearest_stations (
    id INTEGER PRIMARY KEY AUTOINCREMENT, -- 最寄駅ID
    property_id INTEGER,                  -- 物件ID（properties.idへの外部キー）
    station_name TEXT,                    -- 最寄駅名
    FOREIGN KEY(property_id) REFERENCES properties(id)
);
