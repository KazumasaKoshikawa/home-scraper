import requests
from bs4 import BeautifulSoup
import re
import time
import json

def get_suumo_scraper_detail(page_url):
    """
    SUUMOの物件詳細ページから情報を取得
    * suumo.jp/chintai/jnc_000... 形式のURLのみ受付可能    
    """
    try:
        time.sleep(1)  # サーバー負荷軽減
        response = requests.get(page_url)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, "html.parser")

        deposit_fees = _extract_deposit_fees(soup)
        property_data: dict = {
            "url": page_url,
            "SUUMO物件コード": _extract_property_code(soup),
            "物件名": _extract_property_name(soup),
            "所在地": _extract_address(soup),
            "賃料": _extract_rent(soup),
            "管理費・共益費": deposit_fees.get("管理費・共益費"),
            "敷金": deposit_fees.get("敷金"),
            "礼金": deposit_fees.get("礼金"),
            "保証金": deposit_fees.get("保証金"),
            "敷引": deposit_fees.get("敷引"),
            "償却": deposit_fees.get("償却"),
            "間取り": _extract_layout(soup),
            "専有面積": _extract_area(soup),
            "築年数": _extract_building_age(soup),
            "階": _extract_floor(soup),
            "建物種別": _extract_building_type(soup),
            "最寄駅": _extract_nearest_stations(soup),
        }
        return property_data
    except Exception as e:
        print(f"スクレイピングエラー: {e}")
        return None


def _extract_property_name(soup):
    """Extract property name (h1.section_h1-header-title)"""
    elem = soup.find("h1", class_="section_h1-header-title")
    return elem.text.strip() if elem else None

def _extract_address(soup):
    """Extract address (table.property_view_table th: 所在地)"""
    table = soup.find("table", class_="property_view_table")
    if table:
        ths = table.find_all("th", class_="property_view_table-title")
        for th in ths:
            if "所在地" in th.text:
                td = th.find_next_sibling("td")
                return td.text.strip() if td else None
    return None

def _extract_rent(soup):
    """Extract rent (property_view_note-list内のproperty_view_note-emphasis)"""
    elem = soup.find("span", class_="property_view_note-emphasis")
    return elem.text.strip() if elem else None

def _extract_admin_fee(soup):
    """Extract admin fee (property_view_note-list内の「管理費・共益費」)"""
    note_list = soup.find("div", class_="property_view_note-list")
    if note_list:
        spans = note_list.find_all("span")
        for span in spans:
            if "管理費" in span.text or "共益費" in span.text:
                return span.text.split(":")[-1].replace(" ", "").strip()
    return None

def _extract_layout(soup):
    """Extract layout (table.property_view_table th: 間取り)"""
    table = soup.find("table", class_="property_view_table")
    if table:
        ths = table.find_all("th", class_="property_view_table-title")
        for th in ths:
            if "間取り" in th.text:
                td = th.find_next_sibling("td")
                return td.text.strip() if td else None
    return None

def _extract_area(soup):
    """Extract area (table.property_view_table th: 専有面積)"""
    table = soup.find("table", class_="property_view_table")
    if table:
        ths = table.find_all("th", class_="property_view_table-title")
        for th in ths:
            if "専有面積" in th.text:
                td = th.find_next_sibling("td")
                return td.text.strip() if td else None
    return None

def _extract_building_age(soup):
    """Extract building age (table.property_view_table th: 築年数)"""
    table = soup.find("table", class_="property_view_table")
    if table:
        ths = table.find_all("th", class_="property_view_table-title")
        for th in ths:
            if "築年数" in th.text:
                td = th.find_next_sibling("td")
                return td.text.strip() if td else None
    return None

def _extract_floor(soup):
    """Extract floor (table.property_view_table th: 階)"""
    table = soup.find("table", class_="property_view_table")
    if table:
        ths = table.find_all("th", class_="property_view_table-title")
        for th in ths:
            if "階" in th.text:
                td = th.find_next_sibling("td")
                return td.text.strip() if td else None
    return None

def _extract_building_type(soup):
    """Extract building type (table.property_view_table th: 建物種別)"""
    table = soup.find("table", class_="property_view_table")
    if table:
        ths = table.find_all("th", class_="property_view_table-title")
        for th in ths:
            if "建物種別" in th.text:
                td = th.find_next_sibling("td")
                return td.text.strip() if td else None
    return None

def _extract_nearest_stations(soup):
    """Extract nearest stations (table.property_view_table th: 駅徒歩)"""
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

def _extract_deposit_fees(soup):
    """
    Extract deposit/fees (敷金・礼金・保証金・敷引・償却・管理費・共益費)
    """
    result = {
        "管理費・共益費": None,
        "敷金": None,
        "礼金": None,
        "保証金": None,
        "敷引": None,
        "償却": None
    }
    note_lists = soup.find_all("div", class_="property_view_note-list")
    for note in note_lists:
        spans = note.find_all("span")
        for span in spans:
            text = span.get_text(strip=True)
            if text.startswith("管理費・共益費"):
                val = text.split(":")[-1].replace("\xa0", "").strip()
                result["管理費・共益費"] = val
            elif text.startswith("敷金"):
                val = text.split(":")[-1].replace("\xa0", "").strip()
                result["敷金"] = val
            elif text.startswith("礼金"):
                val = text.split(":")[-1].replace("\xa0", "").strip()
                result["礼金"] = val
            elif text.startswith("保証金"):
                val = text.split(":")[-1].replace("\xa0", "").strip()
                result["保証金"] = val
            elif text.startswith("敷引・償却"):
                val = text.split(":")[-1].replace("\xa0", "").strip()
                if "/" in val:
                    shikibiki, shoukyaku = val.split("/")
                    result["敷引"] = shikibiki.strip()
                    result["償却"] = shoukyaku.strip()
                else:
                    result["敷引"] = val
                    result["償却"] = val
    return result

def _extract_property_code(soup):
    """
    Extract SUUMO property code (物件コード/管理番号)
    """
    table = soup.find("table", class_="data_table table_gaiyou")
    if table:
        ths = table.find_all("th")
        for th in ths:
            if "SUUMO" in th.text and "物件コード" in th.text:
                td = th.find_next_sibling("td")
                if td:
                    code = td.text.strip()
                    if re.match(r"^[0-9]{6,}$", code):
                        return code
    code_elem = soup.find("span", class_="property_view_note-property_id")
    if code_elem and ("物件コード" in code_elem.text or "管理番号" in code_elem.text):
        m = re.search(r"[0-9]{6,}", code_elem.text)
        if m:
            return m.group(0)
    text = soup.get_text()
    m = re.search(r"(物件コード|管理番号)[ ：:]*([0-9]{6,})", text)
    if m:
        return m.group(2)
    return None

