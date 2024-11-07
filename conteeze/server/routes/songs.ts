import express, { Request, Response, NextFunction, RequestHandler } from 'express';
import { ISong } from '../models/Song';

const router = express.Router();

const searchHandler: RequestHandler = async (req, res, next): Promise<void> => {
    console.log('검색 요청 수신');
  try {
    const { q, type } = req.query;

    if (!q || typeof q !== 'string') {
      res.status(400).json({ message: '검색어를 입력해주세요.' });
      return;
    }

    let query = {};

    if (type === 'title') {
      query = { title: { $regex: q, $options: 'i' } };
    } else if (type === 'lyrics') {
      query = { lyrics: { $regex: q, $options: 'i' } };
    } else {
      res.status(400).json({ message: '올바른 검색 유형을 선택해주세요.' });
      return;
    }

    console.log('MongoDB 쿼리:', query);  // 쿼리 로깅 추가

    const songs = await ISong.find(query).limit(100);  // 결과 제한 추가
    
    // 검색 결과 필터링 추가
    const filteredSongs = songs.filter(song => 
      type === 'title' ? song?.title?.toLowerCase().includes(q.toLowerCase()) : 
      song?.lyrics?.toLowerCase().includes(q.toLowerCase())
    );

    console.log(`Server 검색 결과: ${filteredSongs.length}개의 노래 찾음`);

    res.json(filteredSongs);
  } catch (error) {
    console.error('검색 오류:', error);
    next(error);
  }
};

router.get('/search', searchHandler);

export default router;
