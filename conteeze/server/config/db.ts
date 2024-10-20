// config/db.ts
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI?.replace('<DB_PASSWORD>', process.env.DB_PASSWORD || '');
    if (!uri) {
      throw new Error('MONGO_URI 환경 변수가 설정되지 않았습니다.');
    }
    console.log(`Connecting to MongoDB with URI: ${uri}`); // 디버깅을 위해 추가
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB 연결 성공: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`MongoDB 연결 오류: ${error.message}`);
      if ('code' in error) {
        console.error('MongoDB 서버 오류 코드:', (error as any).code);
      }
    } else {
      console.error('알 수 없는 오류가 발생했습니다');
    }
    // 테스트 환경이 아닐 때만 프로세스를 종료합니다.
    if (process.env.NODE_ENV !== 'test') {
      process.exit(1);
    }
  }
};

export default connectDB;
