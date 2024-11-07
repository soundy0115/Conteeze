import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {
      // 연결 옵션 추가
      serverSelectionTimeoutMS: 5000, // 서버 선택 타임아웃
      socketTimeoutMS: 45000, // 소켓 타임아웃
      connectTimeoutMS: 10000, // 연결 타임아웃
    });
    console.log(`MongoDB 연결 성공: ${mongoose.connection.host}`);
  } catch (error) {
    console.error('MongoDB 연결 오류:', error);
    process.exit(1);
  }
};

// 연결 이벤트 리스너 추가
mongoose.connection.on('error', err => {
  console.error('MongoDB 연결 에러:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB 연결이 끊어졌습니다. 재연결을 시도합니다.');
});

export default connectDB;