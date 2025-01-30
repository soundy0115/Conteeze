import axios from 'axios';
import { SongType } from '../types/SongType';

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3000/api',
  timeout: 5000, // 타임아웃 설정
  headers: {
    'Content-Type': 'application/json',
  }
});

export const searchSongs = async (query: string, type: 'title' | 'lyrics'): Promise<SongType[]> => {
  try {
    const response = await api.get('/songs/search', { params: { q: query, type } });
    console.log('API 응답:', response.data);
    return response.data;
  } catch (error) {
    console.error('API 호출 오류:', error);
    throw error;
  }
};

export const getSongDetails = async (songId: string): Promise<SongType> => {
  try {
    // songId가 유효한지 확인
    if (!songId) {
      throw new Error('유효하지 않은 songId입니다.');
    }
    
    console.log(`노래 상세 정보 요청: songId = ${songId}`);
    const response = await api.get(`/songs/${songId}`);
    
    // 응답 데이터 로깅
    console.log('노래 세부 정보 API 응답:', response.data);
    
    // 응답 데이터가 없는 경우 처리
    if (!response.data) {
      throw new Error('노래 정보를 찾을 수 없습니다.');
    }
    
    return response.data;
  } catch (error) {
    console.error('노래 세부 정보 API 호출 오류:', error);
    // 더 자세한 에러 정보 로깅
    if (axios.isAxiosError(error)) {
      console.error('상태 코드:', error.response?.status);
      console.error('에러 응답:', error.response?.data);
    }
    throw error;
  }
};