const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors'); // CORS 설정 추가

// MongoDB URI 직접 연결
const mongoURI = "mongodb+srv://soundy0115:1234@conteezecluster0.pvmuk.mongodb.net/conteeze?retryWrites=true&w=majority";
const clientOptions = { 
  serverApi: { 
    version: '1', 
    strict: true, 
    deprecationErrors: true 
  } 
};

// MongoDB 연결 설정
mongoose.connect(mongoURI, clientOptions)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // 연결 실패 시 서버 종료
  });

const app = express();
app.use(cors()); // CORS 활성화

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// 종료 신호 핸들링 (MongoDB 연결 닫기)
process.on('SIGINT', async () => {
  console.log('Closing MongoDB connection');
  await mongoose.connection.close();
  process.exit(0);
});
