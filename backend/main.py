from src.services.suumo_scraper import run_suumo_scraping
import src.services.constants as C

def main():
    # 実行コマンド：python3 $HOME/Git/private/local_rental_housing_scraper/backend/main.py
    search_target_url = C.DEFAULT_SEARCH_URL
    run_suumo_scraping(search_target_url)

if __name__ == "__main__":
    main()