import React, { useState } from 'react';
import { Search, Heart } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { searchSongs } from '../services/api';
import { Song } from '../types';

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Song[]>([{ 
    songId: "-", 
    title: '-', 
    artist: '-', 
    album: '-', 
    like: 0, 
    album_img: '-', 
    lyrics: '-'
  }]);
  const [searchType, setSearchType] = useState('title');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (isSearching) return;
    setIsSearching(true);

    if (!searchTerm.trim()) {
      console.log('검색어를 입력해주세요.');
      setIsSearching(false);
      return;
    }

    try {
      console.log(`검색 시작: 검색어 - "${searchTerm}", 검색 유형 - ${searchType}`);
      const songs = await searchSongs(searchTerm, searchType as 'title' | 'lyrics');
      console.log(`검색 결과: ${songs.length}개의 노래 찾음`);
      setSearchResults(songs);
    } catch (error) {
      console.error('검색 오류:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(); // 엔터 키가 눌리면 검색 실행
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-y-auto p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">곡 검색</h2>
        
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <button
              onClick={() => setSearchType('title')}
              className={`px-4 py-2 rounded-md ${
                searchType === 'title' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              제목으로 검색
            </button>
            <button
              onClick={() => setSearchType('lyrics')}
              className={`px-4 py-2 rounded-md ${
                searchType === 'lyrics' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              가사로 검색
            </button>
          </div>
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={searchType === 'title' ? "곡 제목으로 검색..." : "가사로 검색..."}
              className="w-full p-4 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <button
              onClick={handleSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              검색
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-semibold mb-4">검색 결과</h3>
          {searchResults.length > 0 ? (
            <div className="space-y-4">
              {searchResults.map((song) => (
                <div key={song.songId} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center">
                  <img src={song.album_img} alt={song.album} className="w-16 h-16 rounded-md mr-4" />
                  <div className="flex-1">
                    <div className="text-lg font-bold">{song.title}</div>
                    <div className="text-sm text-gray-600 mt-1">{song.artist}</div>
                    <div className="text-sm text-gray-500 mt-1">{song.album}</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <Heart className="text-red-500 w-8 h-8 mb-1" />
                    <div className="text-lg font-semibold text-gray-700">{song.like}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">검색 결과가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}
