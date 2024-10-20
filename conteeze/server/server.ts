// server.ts
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import protectedRoutes from './routes/protectedRoutes'; // 추가
import connectDB from './config/db';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();


mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log('MongoDB에 연결되었습니다.'))
  .catch((error) => console.error('MongoDB 연결 오류:', error));
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', protectedRoutes); // 추가

// 데이터베이스 연결을 메인 모듈에서만 수행
if (require.main === module) {
  connectDB();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
  });
}

export default app;
