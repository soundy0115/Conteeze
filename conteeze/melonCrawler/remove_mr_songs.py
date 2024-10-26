import json

def remove_mr_songs(input_file, output_file):
    # JSON 파일 읽기
    with open(input_file, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # "mr"이 포함되지 않은 항목만 필터링
    filtered_data = [song for song in data if "mr" not in song['title'].lower()]

    # 필터링된 데이터를 새 JSON 파일에 저장
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(filtered_data, f, ensure_ascii=False, indent=2)

    print(f"원본 데이터 수: {len(data)}")
    print(f"필터링 후 데이터 수: {len(filtered_data)}")
    print(f"제거된 항목 수: {len(data) - len(filtered_data)}")

# 스크립트 실행
if __name__ == "__main__":
    input_file = "merged_songs.json"  # 입력 JSON 파일 이름
    output_file = "filtered_songs.json"  # 출력 JSON 파일 이름
    remove_mr_songs(input_file, output_file)
