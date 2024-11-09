import axios from 'axios';
import { SongType } from '../types/SongType';

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3000/api'
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