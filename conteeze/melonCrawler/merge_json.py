import json
import glob
import os

def merge_json_files(file_pattern):
    all_songs = {}
    total_songs = 0
    
    # 현재 스크립트의 디렉토리 경로를 가져옵니다
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    # song_data 디렉토리의 경로를 생성합니다
    song_data_dir = os.path.join(script_dir, 'song_data')
    
    # 모든 JSON 파일을 읽습니다
    for filename in glob.glob(os.path.join(song_data_dir, file_pattern)):
        with open(filename, 'r', encoding='utf-8') as file:
            songs = json.load(file)
            total_songs += len(songs)
            for song in songs:
                # songID를 키로 사용하여 중복을 제거합니다
                if 'songId' in song:
                    all_songs[song['songId']] = song
                else:
                    # songId가 없는 경우 title을 키로 사용합니다
                    all_songs[song['title']] = song

    # 중복이 제거된 노래들을 리스트로 변환합니다
    merged_songs = list(all_songs.values())

    # 결과를 새 JSON 파일로 저장합니다
    output_file = os.path.join(script_dir, 'merged_songs.json')
    with open(output_file, 'w', encoding='utf-8') as outfile:
        json.dump(merged_songs, outfile, ensure_ascii=False, indent=2)

    duplicates_removed = total_songs - len(merged_songs)
    print(f"총 {total_songs}개의 노래 중 {len(merged_songs)}개의 고유한 노래가 병합되었습니다.")
    print(f"{duplicates_removed}개의 중복된 노래가 제거되었습니다.")
    print(f"병합된 파일이 {output_file}에 저장되었습니다.")

# 스크립트 실행
merge_json_files('melon_songs_new_*.json')
