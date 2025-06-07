import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

def get_suumo_detail_urls(search_result_url):
    """
    SUUMO検索結果ページから詳細ページへのURLリストを返す
    * 検索結果画面の「建物ごとに表示」タブのみ受付可能
    :param search_url: 検索結果ページのURL
    :return: 詳細ページURLのリスト
    """
    try:
        response = requests.get(search_result_url)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, "html.parser")
        detail_urls = []
        # l-cassetteitem > li > ... > table.cassetteitem_other > tbody > tr.js-cassette_link > td:last > a.js-cassette_link_href
        for li in soup.select('ul.l-cassetteitem > li'):
            for tr in li.select('table.cassetteitem_other tr.js-cassette_link'):
                a = tr.select_one('a.js-cassette_link_href')
                if a and a.has_attr('href'):
                    href = a['href']
                    if href.startswith('/'):
                        full_url = urljoin(search_result_url, href)
                        if full_url not in detail_urls:
                            detail_urls.append(full_url)
        return detail_urls
    except Exception as e:
        print(f"検索結果ページの取得・解析エラー: {e}")
        return []
