import json
from app.services.get_suumo_detail_urls import get_suumo_detail_urls
from app.services.get_suumo_scraper_detail import get_suumo_scraper_detail

def main():
    print("SUUMOスクレイピング開始...")
    # 検索結果ページURL
    # search_result_url = "https://suumo.jp/jj/chintai/ichiran/FR301FC001/?ar=030&bs=040&pc=30&smk=r01&po1=25&po2=99&shkr1=03&shkr2=03&shkr3=03&shkr4=03&sc=13101&sc=13102&sc=13103&sc=13104&sc=13105&sc=13113&ta=13&cb=7.0&ct=7.5&co=1&md=05&et=5&mb=0&mt=9999999&cn=9999999&fw2="
    # ページネーションありURL
    search_result_url = "https://suumo.jp/jj/chintai/ichiran/FR301FC001/?ar=030&bs=040&smk=r01&ta=13&sc=13101&sc=13102&sc=13103&sc=13104&sc=13105&sc=13113&cb=7.0&ct=8.0&mb=0&mt=9999999&md=05&et=7&cn=9999999&co=1&shkr1=03&shkr2=03&shkr3=03&shkr4=03&sngz=&po1=25&pc=10"
    # 詳細ページURLリストを取得
    detail_page_urls = get_suumo_detail_urls(search_result_url)
    print(f"検索結果ページ: ページ目")
    print(f"ページ目 詳細ページURLs: {detail_page_urls}")
    print(f"ページ目 詳細ページ数: {len(detail_page_urls)}")
    print(f"検索結果ページ: 合計ページ数")

    scraping_results = []
    # for unit_url in detail_page_urls:
    #     data = get_suumo_scraper_detail(unit_url)
    #     if data:
    #         scraping_results.append(data)

    print(json.dumps(scraping_results, ensure_ascii=False, indent=2))
    print("スクレイピング完了しました")

if __name__ == "__main__":
    main()