// routes/protectedRoutes.ts
import express, { Request, Response, NextFunction, RequestHandler } from 'express';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

// 보호된 라우트 핸들러
const protectedHandler: RequestHandler = (req, res, next) => {
  res.json({ message: '보호된 데이터에 접근했습니다.' });
};

router.get('/protected', authMiddleware, protectedHandler);

export default router;
