import requests
from bs4 import BeautifulSoup
import json
import time

# 헤더 설정
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.183 Safari/537.36'
}

# 멜론 페이지 기본 URL 템플릿
base_url_template = "https://www.melon.com/genre/song_list.htm?gnrCode=GN2100&dtlGnrCode=GN2102#params%5BgnrCode%5D=GN2100&params%5BdtlGnrCode%5D=GN2102&params%5BorderBy%5D=NEW&params%5BsteadyYn%5D=N&po=pageObj&startIndex={start_index}"

# 총 곡 수와 페이지당 곡 수
TOTAL_SONGS = 19351
SONGS_PER_PAGE = 50

# 최대 startIndex 계산
max_start_index = TOTAL_SONGS

# 노래 정보를 저장할 리스트
songs = []

def parse_song_info(song_element):
    song_info = {
        'songID': '0',  # songID를 첫 번째 속성으로 이동
        'title': '제목 없음',
        'artist': '아티스트 없음',
        'album': '앨범 없음'
    }

    # songID 파싱
    input_element = song_element.select_one('input[type="checkbox"]')
    if input_element and 'value' in input_element.attrs:
        song_info['songID'] = input_element['value']

    # 제목 파싱
    title_element = song_element.select_one('div.ellipsis.rank01 a')
    if title_element:
        song_info['title'] = title_element.text.strip()

    # 아티스트 파싱
    artist_element = song_element.select_one('div.ellipsis.rank02 a')
    if artist_element:
        song_info['artist'] = artist_element.text.strip()

    # 앨범 파싱
    album_element = song_element.select_one('div.ellipsis.rank03 a')
    if album_element:
        song_info['album'] = album_element.text.strip()

    return song_info

song_count = 0

for start_index in range(1, max_start_index + 1, SONGS_PER_PAGE):
    try:
        # 현재 페이지 URL 생성
        base_url = base_url_template.format(start_index=start_index)
        
        # 페이지 요청 및 HTML 파싱
        response = requests.get(base_url, headers=headers)
        if response.status_code != 200:
            print(f"페이지 {start_index} 요청 실패: 상태 코드 {response.status_code}")
            continue  # 다음 페이지로 이동

        soup = BeautifulSoup(response.text, 'html.parser')

        # 곡 리스트를 찾기 위해 테이블 행(tr) 선택
        song_rows = soup.select('tr[data-song-no]')  # 데이터 속성으로 필터링

        if not song_rows:
            print(f"페이지 {start_index}에 곡 정보가 없습니다.")
            continue  # 다음 페이지로 이동

        for row in song_rows:
            try:
                # 노래 정보를 딕셔너리로 저장
                song_info = parse_song_info(row)

                # 곡 ID 추출
                song_id_tag = row.select_one('a[href^="javascript:melon.link.goSongDetail"]')
                song_id = song_id_tag['href'].split("'")[1] if song_id_tag else None

                # 곡 상세 페이지에서 가사 가져오기
                if song_id:
                    detail_url = f"https://www.melon.com/song/detail.htm?songId={song_id}"
                    detail_response = requests.get(detail_url, headers=headers)
                    if detail_response.status_code != 200:
                        print(f"곡 상세 페이지 요청 실패: {detail_url} 상태 코드 {detail_response.status_code}")
                        lyrics_text = "가사 정보 없음"
                    else:
                        detail_soup = BeautifulSoup(detail_response.text, 'html.parser')

                        # 가사 정보 추출
                        lyrics_div = detail_soup.select_one('div.lyric')
                        if lyrics_div:
                            # 가사 텍스트 추출 (줄바꿈 유지)
                            lyrics_text = lyrics_div.get_text(separator='\n', strip=True)
                        else:
                            lyrics_text = "가사 없음"
                else:
                    lyrics_text = "가사 정보 없음"

                # 노래 정보를 딕셔너리로 저장
                songs.append({
                    'songID': song_info['songID'],
                    'title': song_info['title'],
                    'artist': song_info['artist'],
                    'album': song_info['album'],
                    'lyrics': lyrics_text
                })
                song_count += 1
                print(f"{song_count}번째 곡 추가: {song_info['title']} - {song_info['artist']}")
                print(f"가사 첫 100자: {lyrics_text[:100]}\n")

                # 요청 간격 지연
                time.sleep(0.3)

            except Exception as e:
                print(f"곡 정보 파싱 중 오류 발생: {e}")
                continue  # 다음 곡으로 이동

    except Exception as e:
        print(f"페이지 {start_index} 처리 중 오류 발생: {e}")
        continue  # 다음 페이지로 이동

# JSON 파일로 저장
with open('melon_songs.json', 'w', encoding='utf-8') as f:
    json.dump(songs, f, ensure_ascii=False, indent=4)

print(f"멜론 곡 정보를 성공적으로 저장했습니다. 총 {song_count}곡.")

