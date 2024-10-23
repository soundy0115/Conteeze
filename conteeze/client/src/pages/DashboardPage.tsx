import React, { useEffect, useState } from 'react';
import { Music, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

interface User {
  name: string;
}

const popularSongs = [
  "Amazing Grace", "How Great Thou Art", "10,000 Reasons", "주님의 은혜", "나의 안에 거하라",
  "나 같은 죄인 살리신", "주님 뜻대로 살기로 했네", "나의 모습 나의 소유", "내 영혼이 은총 입어", "주님만이 나의 전부입니다"
];

const songThemes = [
  "감사", "은혜", "기도", "추수감사절", "동행", "헌신"
];  

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setUser({ name: userId });
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const nextSongs = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 3) % popularSongs.length);
  };

  const prevSongs = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex - 3 + popularSongs.length) % popularSongs.length);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      {/* 메인 콘텐츠 */}
      <div className="flex-1 overflow-y-auto p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">대시보드</h2>
        
        {/* 검색바 */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="곡 검색..."
              className="w-full p-4 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
              검색
            </button>
          </div>
        </div>

        {/* 가장 많이 사용된 찬양 리스트 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-2xl font-semibold mb-4">가장 많이 사용된 찬양</h3>
          <div className="flex items-center">
            <button onClick={prevSongs} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div className="flex-1 overflow-hidden">
              <div 
                className="flex transition-transform duration-300 ease-in-out" 
                style={{ transform: `translateX(-${currentSongIndex * 33.33}%)` }}
              >
                {popularSongs.map((song, index) => (
                  <div key={index} className="flex-shrink-0 w-1/3 px-2">
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 bg-gray-200 rounded-full mb-2 flex items-center justify-center">
                        <Music className="w-10 h-10 text-gray-500" />
                      </div>
                      <p className="text-sm text-gray-700 text-center">{song}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={nextSongs} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* 주제별 찬양 섹션 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-semibold mb-4">주제별 찬양</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {songThemes.map((theme, index) => (
              <Link
                key={index}
                to={`/songs-by-theme/${theme}`}
                className="bg-blue-100 text-blue-800 rounded-lg p-4 text-center hover:bg-blue-200 transition-colors"
              >
                {theme}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
