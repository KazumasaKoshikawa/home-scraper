from app.services.suumo_scraper import scrape_property_detail

def main():
    print("SUUMOスクレイピング開始...")
    
    # 指定されたURL
    url = "https://suumo.jp/chintai/bc_100437850029/"
    
    # 物件情報を取得
    property_data = scrape_property_detail(url)
    
    if property_data:
        print("=== 取得した物件情報 ===")
        for key, value in property_data.items():
            print(f"{key}: {value}")
        print("スクレイピング完了しました")
    else:
        print("データの取得に失敗しました")

if __name__ == "__main__":
    main()