// routes/protectedRoutes.ts
import express, { Request, Response, NextFunction, RequestHandler } from 'express';
import { authMiddleware } from '../middleware/auth';
import { ISong } from '../models/Song';
import SongModel from '../models/Song';

const router = express.Router();

// 보호된 라우트 핸들러
const protectedHandler: RequestHandler = (req, res, next) => {
  res.json({ message: '보호된 데이터에 접근했습니다.' });
};

router.get('/protected', authMiddleware, protectedHandler);

router.get('/songs/search', async (req, res) => {
  try {
    const { term } = req.query;
    const regex = new RegExp(term as string, 'i');
    const songs = await SongModel.find({
      $or: [
        { title: regex },
        { artist: regex },
        { album: regex }
      ]
    }).limit(20);
    res.json(songs);
  } catch (error) {
    console.error('검색 중 오류 발생:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

export default router;
