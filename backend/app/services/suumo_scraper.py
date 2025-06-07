import requests
from bs4 import BeautifulSoup
import re
import time

def scrape_property_detail(url):
    """
    SUUMOの物件詳細ページから情報を取得
    """
    try:
        time.sleep(1)  # サーバー負荷軽減
        response = requests.get(url)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, "html.parser")

        property_data = {
            "url": url,
            "物件名": get_property_name(soup),
            "所在地": get_address(soup),
            "賃料": get_rent(soup),
            "管理費": get_admin_fee(soup),
            "間取り": get_layout(soup),
            "専有面積": get_area(soup),
            "築年数": get_building_age(soup),
            "階": get_floor(soup),
            "建物種別": get_building_type(soup),
            "最寄駅": get_nearest_stations(soup),
        }
        return property_data
    except Exception as e:
        print(f"スクレイピングエラー: {e}")
        return None

def get_property_name(soup):
    """物件名を取得（h1.section_h1-header-title）"""
    elem = soup.find("h1", class_="section_h1-header-title")
    return elem.text.strip() if elem else None

def get_address(soup):
    """所在地を取得（table.property_view_table内のth: 所在地）"""
    table = soup.find("table", class_="property_view_table")
    if table:
        ths = table.find_all("th", class_="property_view_table-title")
        for th in ths:
            if "所在地" in th.text:
                td = th.find_next_sibling("td")
                return td.text.strip() if td else None
    return None

def get_rent(soup):
    """賃料を取得（property_view_note-list内のproperty_view_note-emphasis）"""
    # 物件画像の下にある賃料
    elem = soup.find("span", class_="property_view_note-emphasis")
    return elem.text.strip() if elem else None

def get_admin_fee(soup):
    """管理費を取得（property_view_note-list内の「管理費・共益費」）"""
    # 賃料の隣に「管理費・共益費: 7000円」などがある
    note_list = soup.find("div", class_="property_view_note-list")
    if note_list:
        spans = note_list.find_all("span")
        for span in spans:
            if "管理費" in span.text or "共益費" in span.text:
                # 例: 管理費・共益費: 7000円
                return span.text.split(":")[-1].replace(" ", "").strip()
    return None

def get_layout(soup):
    """間取りを取得（table.property_view_table内のth: 間取り）"""
    table = soup.find("table", class_="property_view_table")
    if table:
        ths = table.find_all("th", class_="property_view_table-title")
        for th in ths:
            if "間取り" in th.text:
                td = th.find_next_sibling("td")
                return td.text.strip() if td else None
    return None

def get_area(soup):
    """専有面積を取得（table.property_view_table内のth: 専有面積）"""
    table = soup.find("table", class_="property_view_table")
    if table:
        ths = table.find_all("th", class_="property_view_table-title")
        for th in ths:
            if "専有面積" in th.text:
                td = th.find_next_sibling("td")
                return td.text.strip() if td else None
    return None

def get_building_age(soup):
    """築年数を取得（table.property_view_table内のth: 築年数）"""
    table = soup.find("table", class_="property_view_table")
    if table:
        ths = table.find_all("th", class_="property_view_table-title")
        for th in ths:
            if "築年数" in th.text:
                td = th.find_next_sibling("td")
                return td.text.strip() if td else None
    return None

def get_floor(soup):
    """階を取得（table.property_view_table内のth: 階）"""
    table = soup.find("table", class_="property_view_table")
    if table:
        ths = table.find_all("th", class_="property_view_table-title")
        for th in ths:
            if "階" in th.text:
                td = th.find_next_sibling("td")
                return td.text.strip() if td else None
    return None

def get_building_type(soup):
    """建物種別を取得（table.property_view_table内のth: 建物種別）"""
    table = soup.find("table", class_="property_view_table")
    if table:
        ths = table.find_all("th", class_="property_view_table-title")
        for th in ths:
            if "建物種別" in th.text:
                td = th.find_next_sibling("td")
                return td.text.strip() if td else None
    return None

def get_nearest_stations(soup):
    """最寄駅情報を取得（table.property_view_table内のth: 駅徒歩）"""
    stations = []
    table = soup.find("table", class_="property_view_table")
    if table:
        ths = table.find_all("th", class_="property_view_table-title")
        for th in ths:
            if "駅徒歩" in th.text:
                td = th.find_next_sibling("td")
                if td:
                    divs = td.find_all("div", class_="property_view_table-read")
                    for div in divs:
                        stations.append(div.text.strip())
    return stations

if __name__ == "__main__":
    # テスト用: 実際の物件詳細ページURLに差し替えてください
    test_url = "https://suumo.jp/chintai/jnc_000098919464/"
    result = scrape_property_detail(test_url)
    print("取得結果:")
    if result:
        for key, value in result.items():
            print(f"{key}: {value}")
    else:
        print("データ取得に失敗しました。")