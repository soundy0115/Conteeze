// tests/auth.test.ts
import request from 'supertest';
import app from '../server';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/db';

dotenv.config();

describe('Auth API', () => {
  jest.setTimeout(10000);

  beforeAll(async () => {
    if (!process.env.MONGO_URI || !process.env.DB_PASSWORD) {
      throw new Error('MONGO_URI 또는 DB_PASSWORD가 환경 변수에 정의되지 않았습니다.');
    }
    await connectDB();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('POST /api/signup', () => {
    it('should signup successfully with unique userId and password', async () => {
      const response = await request(app)
        .post('/api/signup')
        .send({
          userId: 'testuser123',
          password: 'testpassword',
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('token');
      expect(response.body.user).toHaveProperty('userId', 'testuser123');
    });

    it('should fail signup with duplicate userId', async () => {
      // 먼저 사용자 생성
      await User.create({
        userId: 'testuser123',
        password: await bcrypt.hash('testpassword', 10),
      });

      const response = await request(app)
        .post('/api/signup')
        .send({
          userId: 'testuser123',
          password: 'newpassword',
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', '이미 사용 중인 User ID입니다.');
    });
  });

  describe('POST /api/login', () => {
    it('should login successfully with correct credentials', async () => {
      // 테스트용 사용자 생성
      const userId = 'testuser123';
      const password = 'testpassword';
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({
        userId,
        password: hashedPassword,
      });

      const response = await request(app)
        .post('/api/login')
        .send({
          userId: 'testuser123',
          password: 'testpassword',
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body.user).toHaveProperty('userId', 'testuser123');
    });

    it('should fail login with incorrect password', async () => {
      // 테스트용 사용자 생성
      const userId = 'testuser123';
      const password = 'testpassword';
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({
        userId,
        password: hashedPassword,
      });

      const response = await request(app)
        .post('/api/login')
        .send({
          userId: 'testuser123',
          password: 'wrongpassword',
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', '비밀번호가 일치하지 않습니다.');
    });

    it('should fail login with non-existent user', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({
          userId: 'nonexistentuser',
          password: 'somepassword',
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', '사용자를 찾을 수 없습니다.');
    });
  });
});
