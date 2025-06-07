# 以下を参考にロジック追加
# コード：https://rookzeno.hatenablog.com/entry/2025/01/08/170000

import requests
from bs4 import BeautifulSoup
import re
import time

data = []
for page in range(1, 334):
    time.sleep(3)
    url = f"https://suumo.jp/jj/chintai/ichiran/FR301FC001/?ar=030&bs=040&ta=13&cb=0.0&ct=10.0&mb=0&mt=9999999&et=10&cn=30&co=1&shkr1=03&shkr2=03&shkr3=03&shkr4=03&ekInput=25620&nk=-1&tj=30&sngz=&po1=09&page={page}"
    response = requests.get(url)
    response.raise_for_status()  # エラーレスポンスをチェック
    soup = BeautifulSoup(response.content, "html.parser")

    # 物件リストの要素を探す
    property_items = soup.find_all("div", class_="cassetteitem")

    for item in property_items:
        # 物件詳細情報の取得
        detail = item.find("div", class_="cassetteitem-detail")
        if detail:
            title_elem = detail.find("div", class_="cassetteitem_content-title")
            title = title_elem.text.strip() if title_elem else None

            address_elem = detail.find("li", class_="cassetteitem_detail-col1")
            address = address_elem.text.strip() if address_elem else None

            stations_elem = detail.find("li", class_="cassetteitem_detail-col2")
            stations = (
                [
                    div.text.strip()
                    for div in stations_elem.find_all(
                        "div", class_="cassetteitem_detail-text"
                    )
                ]
                if stations_elem
                else []
            )

            building_info_elem = detail.find("li", class_="cassetteitem_detail-col3")
            building_info = (
                [div.text.strip() for div in building_info_elem.find_all("div")]
                if building_info_elem
                else []
            )

            # 目的駅までの所要時間・乗換回数
            transfer_info_elem = detail.find("dd", class_="cassetteitem_transfer-body")
            transfer_info = []
            if transfer_info_elem:
                transfer_items = transfer_info_elem.find_all("li")
                for transfer_item in transfer_items:
                    match = re.search(r"(.+)\（(.+)\）", transfer_item.text)
                    if match:
                        transfer_info.append(match.groups())

        else:
            title, address, stations, building_info, transfer_info = (
                None,
                None,
                [],
                [],
                [],
            )

        # 各部屋の情報を取得
        table = item.find("table", class_="cassetteitem_other")
        if table:
            rows = table.find("tbody").find_all("tr", class_="js-cassette_link")
            for row in rows:
                floor_elem = row.find_all("td")[2]
                floor = floor_elem.text.strip() if floor_elem else None

                rent_admin_elems = row.find_all("td")[3].find_all(
                    "span", class_="cassetteitem_price"
                )
                rent = (
                    rent_admin_elems[0].text.strip()
                    if len(rent_admin_elems) > 0
                    else None
                )
                admin_fee = (
                    rent_admin_elems[1].text.strip()
                    if len(rent_admin_elems) > 1
                    else None
                )

                deposit_gratuity_elems = row.find_all("td")[4].find_all(
                    "span", class_="cassetteitem_price"
                )
                deposit = (
                    deposit_gratuity_elems[0].text.strip()
                    if len(deposit_gratuity_elems) > 0
                    else None
                )
                gratuity = (
                    deposit_gratuity_elems[1].text.strip()
                    if len(deposit_gratuity_elems) > 1
                    else None
                )

                layout_area_elems = row.find_all("td")[5].find_all("span")
                layout = (
                    layout_area_elems[0].text.strip()
                    if len(layout_area_elems) > 0
                    else None
                )
                area = (
                    layout_area_elems[1].text.strip()
                    if len(layout_area_elems) > 1
                    else None
                )

                tags_elem = row.find_all("td")[6].find(
                    "ul", class_="cassetteitem-taglist"
                )
                tags = (
                    [
                        tag.text.strip()
                        for tag in tags_elem.find_all("span", class_="cassetteitem-tag")
                    ]
                    if tags_elem
                    else []
                )

                data.append(
                    {
                        "物件名": title,
                        "住所": address,
                        "最寄駅": stations,
                        "築年数・階数": building_info,
                        "目的駅までの所要時間・乗換回数": transfer_info,
                        "階": floor,
                        "賃料": rent,
                        "管理費": admin_fee,
                        "敷金": deposit,
                        "礼金": gratuity,
                        "間取り": layout,
                        "面積": area,
                        "タグ": tags,
                    }
                )
        else:
            data.append(
                {
                    "物件名": title,
                    "住所": address,
                    "最寄駅": stations,
                    "築年数・階数": building_info,
                    "目的駅までの所要時間・乗換回数": transfer_info,
                    "階": None,
                    "賃料": None,
                    "管理費": None,
                    "敷金": None,
                    "礼金": None,
                    "間取り": None,
                    "面積": None,
                    "タグ": [],
                }
            )
