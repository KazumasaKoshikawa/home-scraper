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
        # 各物件の「詳細を見る」リンクを取得
        # <a href="/chintai/jnc_xxxxxxxx/?bc=xxxxxxxxx&..." class="js-cassette_link_href cassetteitem_other-linktext">詳細を見る</a>
        for li in soup.select('ul.l-cassetteitem > li'):
            for tr in li.select('table.cassetteitem_other tr.js-cassette_link'):
                a = tr.select_one('a.js-cassette_link_href')
                # aタグが存在し、href属性を持っている場合に処理を行う
                if a and a.has_attr('href'):
                    href = a['href']  # href属性を取得
                    # hrefがリスト型の場合は最初の要素を取得（通常はstr型だが、念のため対応）
                    if isinstance(href, list):
                        href = href[0]
                    # hrefが文字列型かつ「/」で始まる（絶対パス）の場合のみ処理
                    if isinstance(href, str) and href.startswith('/'):
                        # 検索結果ページのURLを基準に絶対URLを生成
                        full_url = urljoin(search_result_url, href)
                        # すでにリストに含まれていない場合のみ追加（重複排除）
                        if full_url not in detail_urls:
                            detail_urls.append(full_url)
        return detail_urls
    except Exception as e:
        print(f"検索結果ページの取得・解析エラー: {e}")
        return []
