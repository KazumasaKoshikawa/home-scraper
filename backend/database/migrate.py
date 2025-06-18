import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), 'rental_properties.sqlite3')
SCHEMA_PATH = os.path.join(os.path.dirname(__file__), 'schema.sql')

# 実行方法
# cd local_rental_housing_scraper/backend/database
# python3 migrate.py

# --- DB初期化 ---
def init_db():
    with open(SCHEMA_PATH, 'r', encoding='utf-8') as f:
        schema = f.read()
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.executescript(schema)
    conn.commit()
    conn.close()
    print('DB初期化完了:', DB_PATH)

# --- サンプルデータ投入 ---
def insert_sample_data():
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    # 既存データを全削除（トランケート相当）
    cur.execute('DELETE FROM nearest_stations;')
    cur.execute('DELETE FROM properties;')
    # properties テーブルにサンプル物件を追加
    cur.execute('''
        INSERT INTO properties (
            url, suumo_code, name, address, rent_min, rent_max, admin_fee_min, admin_fee_max,
            deposit, key_money, guarantee_money, deduction, amortization, layout, area_min, area_max,
            building_age, floor, building_type
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        'https://suumo.jp/chintai/jnc_123456789/',
        '123456789',
        'サンプルマンション',
        '東京都新宿区西新宿1-1-1',
        82000, 82000, 3000, 3000,
        82000, 82000, 0, 0, 0,
        '1K', 20.5, 20.5,
        '築10年', '3階/10階建', 'マンション'
    ))
    property_id = cur.lastrowid
    # nearest_stations テーブルにサンプル駅を追加
    cur.execute('''
        INSERT INTO nearest_stations (property_id, station_name) VALUES (?, ?)
    ''', (property_id, '新宿駅 徒歩5分'))
    cur.execute('''
        INSERT INTO nearest_stations (property_id, station_name) VALUES (?, ?)
    ''', (property_id, '西新宿駅 徒歩8分'))
    conn.commit()
    conn.close()
    print('サンプルデータ投入完了\n')

# --- データ取得サンプル ---
def fetch_properties():
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute('SELECT * FROM properties')
    properties = cur.fetchall()
    
    print('データ取得テスト\n')
    for prop in properties:
        print('物件:', prop)
        
        # 最寄駅も取得
        cur.execute('SELECT station_name FROM nearest_stations WHERE property_id=?', (prop[0],))
        stations = cur.fetchall()
        print('最寄駅:', [s[0] for s in stations])
    conn.close()

if __name__ == '__main__':
    init_db()
    insert_sample_data()
    fetch_properties()
