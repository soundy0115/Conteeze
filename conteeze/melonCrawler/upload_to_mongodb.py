import os
from dotenv import load_dotenv
from pymongo import MongoClient
import json  # 이 줄을 추가하세요

# .env 파일 로드
load_dotenv()

# 환경 변수에서 MongoDB URI 가져오기
MONGODB_URI = os.getenv('MONGO_URI')

# JSON 파일 경로
JSON_FILE_PATH = "Songs.json"

def upload_to_mongodb():
    try:
        # MongoDB 클라이언트 생성
        client = MongoClient(MONGODB_URI)

        # 데이터베이스 선택
        db = client["conteeze"]

        # 컬렉션 선택
        collection = db["songs"]

        # JSON 파일 읽기
        with open(JSON_FILE_PATH, 'r', encoding='utf-8') as file:
            data = json.load(file)

        # 데이터 삽입
        result = collection.insert_many(data)

        print(f"{len(result.inserted_ids)} 개의 문서가 성공적으로 삽입되었습니다.")
    except Exception as e:
        print(f"오류 발생: {e}")
    finally:
        # 연결 종료
        client.close()

if __name__ == "__main__":
    upload_to_mongodb()
