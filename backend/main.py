from src.services.suumo_scraper import run_suumo_scraping

def main():
    # 実行コマンド：python3 $HOME/Git/private/local_rental_housing_scraper/backend/main.py
    search_target_url = "https://suumo.jp/jj/chintai/ichiran/FR301FC001/?ar=030&bs=040&smk=r01&ta=13&sc=13101&sc=13102&sc=13103&sc=13104&sc=13105&sc=13113&cb=7.0&ct=8.0&mb=0&mt=9999999&md=05&et=7&cn=9999999&co=1&shkr1=03&shkr2=03&shkr3=03&shkr4=03&sngz=&po1=25&pc=50"
    run_suumo_scraping(search_target_url)

if __name__ == "__main__":
    main()