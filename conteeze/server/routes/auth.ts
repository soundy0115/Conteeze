import express, { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/auth';

const router = express.Router();

// 회원가입 엔드포인트
router.post('/signup', (req: Request, res: Response, next: NextFunction) => {
  (async () => {
    try {
      const { userId, password } = req.body;
      // userId 중복 확인
      const existingUser = await User.findOne({ userId });
      if (existingUser) {
        return res.status(400).json({ error: '이미 사용 중인 User ID입니다.' });
      }

      // 비밀번호 해싱
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // 새 사용자 생성 (userId는 클라이언트로부터 받음)
      const newUser = new User({
        userId,
        password: hashedPassword,
      });

      await newUser.save();

      // JWT 토큰 생성
      const token = generateToken(newUser.userId);

      res.status(201).json({ token, user: { userId: newUser.userId } });
    } catch (error) {
      next(error); // 에러를 next 함수로 전달
    }
  })();
});

// 로그인 엔드포인트
router.post('/login', (req: Request, res: Response, next: NextFunction) => {
  (async () => {
    try {
      const { userId, password } = req.body as { userId: string; password: string };
    const user = await User.findOne({ userId });
    
    if (!user) {
      return res.status(400).json({ error: '사용자를 찾을 수 없습니다.' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(400).json({ error: '비밀번호가 일치하지 않습니다.' });
    }

    // JWT 토큰 생성 및 반환
    const token = generateToken(user.userId);
    res.status(200).json({ token, user: { userId: user.userId } });
  } catch (error) {
    console.error('로그인 에러:', error);
      res.status(500).json({ error: '서버 오류가 발생했습니다.' });
    }
  })();
});

export default router;
