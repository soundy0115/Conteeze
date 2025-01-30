import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heart } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { getSongDetails } from '../services/api';
import { SongType } from '../types/SongType';

export default function SongDetailPage() {
  const { songId } = useParams();
  const [song, setSong] = useState<SongType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSongDetails = async () => {
      try {
        if (!songId) return;
        const songData = await getSongDetails(songId);
        setSong(songData);
      } catch (err) {
        setError('곡 정보를 불러오는데 실패했습니다.');
        console.error('곡 상세 정보 로딩 오류:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSongDetails();
  }, [songId]);

  if (loading) return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="text-center">로딩 중...</div>
      </div>
    </div>
  );

  if (error || !song) return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="text-center text-red-500">{error || '곡을 찾을 수 없습니다.'}</div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="flex items-start gap-8">
            <img 
              src={song.album_img !== '-' ? song.album_img : '/default_album_img.png'} 
              alt={song.album} 
              className="w-64 h-64 rounded-lg shadow-lg object-cover"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{song.title}</h1>
              <p className="text-xl text-gray-700 mb-4">{song.artist}</p>
              <p className="text-lg text-gray-600 mb-4">{song.album}</p>
              <div className="flex items-center gap-2">
                <Heart className="text-red-500 w-6 h-6" />
                <span className="text-lg font-semibold">{song.like}</span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">가사</h2>
            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
              {song.lyrics || '가사 정보가 없습니다.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 