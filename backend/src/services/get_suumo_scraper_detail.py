import requests
from bs4 import BeautifulSoup
import re
import time
import json
import src.services.constants as C

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
            "管理費・共益費": deposit_fees.get(C.LABEL_ADMIN_FEE),
            "敷金": deposit_fees.get(C.LABEL_DEPOSIT),
            "礼金": deposit_fees.get(C.LABEL_KEY_MONEY),
            "保証金": deposit_fees.get(C.LABEL_GUARANTEE_MONEY),
            "敷引": deposit_fees.get(C.LABEL_DEDUCTION),
            "償却": deposit_fees.get(C.LABEL_AMORTIZATION),
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
    elem = soup.find(C.PROPERTY_NAME_SELECTOR)
    return elem.text.strip() if elem else None

def _extract_address(soup):
    """Extract address (table.property_view_table th: 所在地)"""
    table = soup.find("table", class_=C.PROPERTY_TABLE_CLASS)
    if table:
        ths = table.find_all("th", class_=C.PROPERTY_TABLE_TITLE_CLASS)
        for th in ths:
            if C.LABEL_ADDRESS in th.text:
                td = th.find_next_sibling("td")
                return td.text.strip() if td else None
    return None

def _extract_rent(soup):
    """Extract rent (property_view_note-list内のproperty_view_note-emphasis)"""
    elem = soup.find("span", class_=C.PROPERTY_VIEW_NOTE_EMPHASIS)
    return elem.text.strip() if elem else None

def _extract_admin_fee(soup):
    """Extract admin fee (property_view_note-list内の「管理費・共益費」)"""
    note_list = soup.find("div", class_=C.PROPERTY_VIEW_NOTE_LIST)
    if note_list:
        spans = note_list.find_all("span")
        for span in spans:
            if C.LABEL_ADMIN_FEE[:3] in span.text or "共益費" in span.text:
                return span.text.split(":")[-1].replace("\xa0", "").strip()
    return None

def _extract_layout(soup):
    """Extract layout (table.property_view_table th: 間取り)"""
    table = soup.find("table", class_=C.PROPERTY_TABLE_CLASS)
    if table:
        ths = table.find_all("th", class_=C.PROPERTY_TABLE_TITLE_CLASS)
        for th in ths:
            if C.LABEL_LAYOUT in th.text:
                td = th.find_next_sibling("td")
                return td.text.strip() if td else None
    return None

def _extract_area(soup):
    """Extract area (table.property_view_table th: 専有面積)"""
    table = soup.find("table", class_=C.PROPERTY_TABLE_CLASS)
    if table:
        ths = table.find_all("th", class_=C.PROPERTY_TABLE_TITLE_CLASS)
        for th in ths:
            if C.LABEL_AREA in th.text:
                td = th.find_next_sibling("td")
                return td.text.strip() if td else None
    return None

def _extract_building_age(soup):
    """Extract building age (table.property_view_table th: 築年数)"""
    table = soup.find("table", class_=C.PROPERTY_TABLE_CLASS)
    if table:
        ths = table.find_all("th", class_=C.PROPERTY_TABLE_TITLE_CLASS)
        for th in ths:
            if C.LABEL_BUILDING_AGE in th.text:
                td = th.find_next_sibling("td")
                return td.text.strip() if td else None
    return None

def _extract_floor(soup):
    """Extract floor (table.property_view_table th: 階)"""
    table = soup.find("table", class_=C.PROPERTY_TABLE_CLASS)
    if table:
        ths = table.find_all("th", class_=C.PROPERTY_TABLE_TITLE_CLASS)
        for th in ths:
            if C.LABEL_FLOOR in th.text:
                td = th.find_next_sibling("td")
                return td.text.strip() if td else None
    return None

def _extract_building_type(soup):
    """Extract building type (table.property_view_table th: 建物種別)"""
    table = soup.find("table", class_=C.PROPERTY_TABLE_CLASS)
    if table:
        ths = table.find_all("th", class_=C.PROPERTY_TABLE_TITLE_CLASS)
        for th in ths:
            if C.LABEL_BUILDING_TYPE in th.text:
                td = th.find_next_sibling("td")
                return td.text.strip() if td else None
    return None

def _extract_nearest_stations(soup):
    """Extract nearest stations (table.property_view_table th: 駅徒歩)"""
    stations = []
    table = soup.find("table", class_=C.PROPERTY_TABLE_CLASS)
    if table:
        ths = table.find_all("th", class_=C.PROPERTY_TABLE_TITLE_CLASS)
        for th in ths:
            if C.LABEL_NEAREST_STATION in th.text:
                td = th.find_next_sibling("td")
                if td:
                    divs = td.find_all("div", class_=C.PROPERTY_VIEW_TABLE_READ)
                    for div in divs:
                        stations.append(div.text.strip())
    return stations

def _extract_deposit_fees(soup):
    """
    Extract deposit/fees (敷金・礼金・保証金・敷引・償却・管理費・共益費)
    """
    result = {
        C.LABEL_ADMIN_FEE: None,
        C.LABEL_DEPOSIT: None,
        C.LABEL_KEY_MONEY: None,
        C.LABEL_GUARANTEE_MONEY: None,
        C.LABEL_DEDUCTION: None,
        C.LABEL_AMORTIZATION: None
    }
    note_lists = soup.find_all("div", class_=C.PROPERTY_VIEW_NOTE_LIST)
    for note in note_lists:
        spans = note.find_all("span")
        for span in spans:
            text = span.get_text(strip=True)
            if text.startswith(C.LABEL_ADMIN_FEE):
                val = text.split(":")[-1].replace("\xa0", "").strip()
                result[C.LABEL_ADMIN_FEE] = val
            elif text.startswith(C.LABEL_DEPOSIT):
                val = text.split(":")[-1].replace("\xa0", "").strip()
                result[C.LABEL_DEPOSIT] = val
            elif text.startswith(C.LABEL_KEY_MONEY):
                val = text.split(":")[-1].replace("\xa0", "").strip()
                result[C.LABEL_KEY_MONEY] = val
            elif text.startswith(C.LABEL_GUARANTEE_MONEY):
                val = text.split(":")[-1].replace("\xa0", "").strip()
                result[C.LABEL_GUARANTEE_MONEY] = val
            elif text.startswith(C.LABEL_DEDUCTION_AMORTIZATION):
                val = text.split(":")[-1].replace("\xa0", "").strip()
                if "/" in val:
                    shikibiki, shoukyaku = val.split("/")
                    result[C.LABEL_DEDUCTION] = shikibiki.strip()
                    result[C.LABEL_AMORTIZATION] = shoukyaku.strip()
                else:
                    result[C.LABEL_DEDUCTION] = val
                    result[C.LABEL_AMORTIZATION] = val
    return result

def _extract_property_code(soup):
    """
    Extract SUUMO property code (物件コード/管理番号)
    """
    table = soup.find("table", class_=C.DATA_TABLE_GAIYOU)
    if table:
        ths = table.find_all("th")
        for th in ths:
            if C.LABEL_SUUMO_CODE[:5] in th.text and C.LABEL_PROPERTY_CODE in th.text:
                td = th.find_next_sibling("td")
                if td:
                    code = td.text.strip()
                    if re.match(r"^[0-9]{6,}$", code):
                        return code
    code_elem = soup.find("span", class_=C.PROPERTY_ID_SPAN)
    if code_elem and (C.LABEL_PROPERTY_CODE in code_elem.text or C.LABEL_MANAGEMENT_NUMBER in code_elem.text):
        m = re.search(r"[0-9]{6,}", code_elem.text)
        if m:
            return m.group(0)
    text = soup.get_text()
    m = re.search(r"(" + C.LABEL_PROPERTY_CODE + r"|" + C.LABEL_MANAGEMENT_NUMBER + r")[ ：:]*([0-9]{6,})", text)
    if m:
        return m.group(2)
    return None

