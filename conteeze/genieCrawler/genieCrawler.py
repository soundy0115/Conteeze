from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import json
import time
from webdriver_manager.chrome import ChromeDriverManager

# Chrome 옵션 설정
chrome_options = Options()
chrome_options.add_argument("--headless")  # 헤드리스 모드 실행

# WebDriver 설정
service = ChromeService(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service, options=chrome_options)

# 지니뮤직 페이지 URL
url = "https://www.genie.co.kr/genre/L0801?genreCode=L0801&pg=1"

# 페이지 로드
driver.get(url)

# 페이지가 완전히 로드될 때까지 대기
wait = WebDriverWait(driver, 10)
wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "tr.list")))

# 페이지 소스 가져오기
html = driver.page_source

# BeautifulSoup을 사용해 HTML 파싱
soup = BeautifulSoup(html, "html.parser")

# 음악 정보 추출
songs = []
song_rows = soup.select("tr.list")  # 곡 정보가 포함된 <tr> 태그 선택

for row in song_rows:
    song_id = row.get("songid")  # songid 속성 추출
    title = row.select_one(".title.ellipsis").get_text(strip=True)  # 곡 제목 추출
    artist = row.select_one(".artist.ellipsis").get_text(strip=True)  # 아티스트 이름 추출
    album = row.select_one(".albumtitle.ellipsis").get_text(strip=True)  # 앨범 이름 추출

    # 곡 상세 페이지 URL 생성
    detail_url = f"https://www.genie.co.kr/detail/songInfo?xgnm={song_id}"
    
    # 상세 페이지 로드
    driver.get(detail_url)
    wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "#pLyrics")))
    
    # 상세 페이지 파싱
    detail_html = driver.page_source
    detail_soup = BeautifulSoup(detail_html, "html.parser")
    
    # 가사 추출 (수정된 부분)
    lyrics_element = detail_soup.select_one("#pLyrics p")
    lyrics = lyrics_element.get_text(strip=True) if lyrics_element else "가사 정보 없음"
    
    # 장르 추출
    genre = detail_soup.select_one(".info-zone > li:nth-child(3)").get_text(strip=True).split(": ")[1] if detail_soup.select_one(".info-zone > li:nth-child(3)") else "장르 정보 없음"

    # 곡 정보를 딕셔너리 형태로 저장
    song_data = {
        "songID": song_id,
        "title": title,
        "artist": artist,
        "album": album,
        "genre": genre,
        "lyrics": lyrics,
    }
    print(song_data)
    songs.append(song_data)

# 브라우저 종료
driver.quit()

# JSON 파일로 저장
with open("genie_music.json", "w", encoding="utf-8") as f:
    json.dump(songs, f, ensure_ascii=False, indent=4)

print("음악 정보가 JSON 파일로 저장되었습니다.")
