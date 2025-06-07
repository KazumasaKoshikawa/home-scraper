import requests
from bs4 import BeautifulSoup
import re
import time
import json

def get_suumo_scraper_detail(url):
    """
    SUUMOの物件詳細ページから情報を取得
    * suumo.jp/chintai/jnc_000... 形式のURLのみ受付可能    
    """
    try:
        time.sleep(1)  # サーバー負荷軽減
        response = requests.get(url)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, "html.parser")

        deposit_fees = get_deposit_fees(soup)
        property_data: dict = {
            "url": url,
            "SUUMO物件コード": get_property_code(soup),
            "物件名": get_property_name(soup),
            "所在地": get_address(soup),
            "賃料": get_rent(soup),
            "管理費・共益費": deposit_fees.get("管理費・共益費"),
            "敷金": deposit_fees.get("敷金"),
            "礼金": deposit_fees.get("礼金"),
            "保証金": deposit_fees.get("保証金"),
            "敷引": deposit_fees.get("敷引"),
            "償却": deposit_fees.get("償却"),
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

def get_deposit_fees(soup):
    """
    敷金・礼金・保証金・敷引・償却・管理費・共益費を robust に抽出
    <div class="property_view_note-list">内の<span>から該当項目を抽出
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
                # 管理費・共益費: 7000円
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
                # 例: 敷引・償却: -
                val = text.split(":")[-1].replace("\xa0", "").strip()
                # 「/」区切りの場合もあるが、SUUMOは「-」や空欄も多い
                if "/" in val:
                    shikibiki, shoukyaku = val.split("/")
                    result["敷引"] = shikibiki.strip()
                    result["償却"] = shoukyaku.strip()
                else:
                    # 両方同じ値を入れる
                    result["敷引"] = val
                    result["償却"] = val
    return result

def get_property_code(soup):
    """
    SUUMO物件詳細ページからSUUMO物件コード（管理番号）を抽出
    1. <span class="property_view_note-property_id">物件コード: 123456789</span>
    2. <th class="data_01">SUUMO\n物件コード</th>の隣<td>（推奨）
    3. ページ全体テキストから「物件コード」や「管理番号」
    """
    # 1. table_gaiyou内のthでSUUMO物件コードを探す
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
    # 2. よくあるclass名で探す
    code_elem = soup.find("span", class_="property_view_note-property_id")
    if code_elem and ("物件コード" in code_elem.text or "管理番号" in code_elem.text):
        m = re.search(r"[0-9]{6,}", code_elem.text)
        if m:
            return m.group(0)
    # 3. ページ全体テキストから探す
    text = soup.get_text()
    m = re.search(r"(物件コード|管理番号)[ ：:]*([0-9]{6,})", text)
    if m:
        return m.group(2)
    return None

# FIXME テスト用
if __name__ == "__main__":
    test_url = "https://suumo.jp/chintai/jnc_000098919464/"
    result = get_suumo_scraper_detail(test_url)
    print("取得結果:")
    if result:
        print(json.dumps(result, ensure_ascii=False, indent=2))
    else:
        print(json.dumps({"error": "データ取得に失敗しました。"}, ensure_ascii=False, indent=2))