from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import json
import time
from selenium.common.exceptions import TimeoutException
import requests

# Selenium 웹드라이버 설정 (Chrome 사용)
driver = webdriver.Chrome()  # ChromeDriver 경로 설정이 필요할 수 있습니다

# 노래 정보를 저장할 리스트
songs = []

def parse_song_info(song_element):
    song_info = {
        'songID': '0',
        'title': '제목 없음',
        'artist': '아티스트 없음',
        'album': '앨범 없음'
    }

    # songID 파싱
    input_element = song_element.select_one('input[type="checkbox"]')
    if input_element and 'value' in input_element.attrs:
        song_info['songID'] = input_element['value']

    # 제목 파싱
    title_element = song_element.select_one('div.wrap_song_info div.ellipsis.rank01 span a')
    if title_element:
        song_info['title'] = title_element.text.strip()

    # 아티스트 파싱
    artist_element = song_element.select_one('div.wrap_song_info div.ellipsis.rank02 a')
    if artist_element:
        song_info['artist'] = artist_element.text.strip()

    # 앨범 파싱
    album_element = song_element.select_one('div.wrap_song_info div.ellipsis.rank03 a')
    if album_element:
        song_info['album'] = album_element.text.strip()

    return song_info

def get_lyrics(song_id):
    url = f"https://www.melon.com/song/detail.htm?songId={song_id}"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36'
    }
    
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')

    print("가사 찾는 중...")

    # 가사 div를 정확히 찾는 로직 수정
    lyrics_div = soup.find('div', {'id': 'd_video_summary'})
    
    if lyrics_div:
        # <br> 태그를 줄바꿈으로 처리
        lyrics = lyrics_div.prettify()
        lyrics = lyrics.replace('<br/>', '\n').replace('<br>', '\n')
        lyrics = BeautifulSoup(lyrics, 'html.parser').get_text(strip=True)
        print("가사 찾음: " + lyrics)
        return lyrics

    return "가사를 찾을 수 없습니다."


song_count = 0
page_number = 1

while page_number <= 2:  # 19351 / 50 = 약 388 페이지
    # 멜론 장르별 차트 페이지 접속
    url = f"https://www.melon.com/genre/song_list.htm?gnrCode=GN2100&dtlGnrCode=GN2102#params%5BgnrCode%5D=GN2100&params%5BdtlGnrCode%5D=GN2102&params%5BorderBy%5D=POP&params%5BsteadyYn%5D=N&po=pageObj&startIndex={1 + (page_number - 1) * 50}"
    driver.get(url)

    # 페이지 로딩 대기 및 확인
    try:
        WebDriverWait(driver, 60).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "div.service_list_song.d_song_list"))
        )
        # 추가적인 대기 시간
        time.sleep(5)
    except TimeoutException:
        print(f"페이지 {page_number}를 로드하는 데 실패했습니다. 다음 페이지로 넘어갑니다.")
        page_number += 1
        continue

    # 현재 페이지의 HTML 파싱
    soup = BeautifulSoup(driver.page_source, 'html.parser')

    # 곡 리스트 확인
    song_list_div = soup.select_one('div.service_list_song.d_song_list')
    if not song_list_div:
        print(f"페이지 {page_number}에서 곡 목록을 찾을 수 없습니다.")
        page_number += 1
        continue

    # 각 곡에 대한 정보 추출
    songs_on_page = song_list_div.select('tr:not(.lst50_th)')  # 헤더 행 제외
    for song in songs_on_page:
        title = song.select_one('div.ellipsis.rank01 a')
        if title:
            title = title.text.strip()
        else:
            continue

        artist = song.select_one('div.ellipsis.rank02 a')
        if artist:
            artist = artist.text.strip()
        else:
            artist = "Unknown Artist"

        album = song.select_one('div.ellipsis.rank03 a')
        if album:
            album = album.text.strip()
        else:
            album = "Unknown Album"

        song_id = song.select_one('input[type="checkbox"]')['value']
        lyrics = get_lyrics(song_id)
        
        song_data = {
            "title": title,
            "artist": artist,
            "album": album,
            "lyrics": lyrics
        }
        songs.append(song_data)
        print(song_data['title'] + " " + song_data['artist'] + " 완료")
    print(f"페이지 {page_number} 완료")
    page_number += 1

# 브라우저 종료
driver.quit()

# JSON 파일로 저장
with open('melon_songs.json', 'w', encoding='utf-8') as f:
    json.dump(songs, f, ensure_ascii=False, indent=4)

print("멜론 곡 정보를 성공적으로 저장했습니다.")
