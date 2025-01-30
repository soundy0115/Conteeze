import React, { useState } from 'react';
import { Search, Heart } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { searchSongs } from '../services/api';
import { Song } from '../types';
import { useNavigate } from 'react-router-dom';

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [searchType, setSearchType] = useState('title');
  const [isSearching, setIsSearching] = useState(false);
  const [sortType, setSortType] = useState<'title' | 'artist' | 'like' | 'album'>('title');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const navigate = useNavigate();

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

  const handleSort = (type: 'title' | 'artist' | 'like' | 'album', order: 'asc' | 'desc') => {
    setSortType(type);
    setSortOrder(order);
    setIsSortMenuOpen(false); // Close the sort menu after selecting a sort type
    const sortedResults = [...searchResults].sort((a, b) => {
      if (a[type] < b[type]) return order === 'asc' ? -1 : 1;
      if (a[type] > b[type]) return order === 'asc' ? 1 : -1;
      return 0;
    });
    setSearchResults(sortedResults);
  };

  const handleSongClick = (songId: string) => {
    navigate(`/songs/${songId}`);
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
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-semibold">검색 결과</h3>
            <div className="relative">
              <button
                onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
                className="px-3 py-1 rounded-md border border-black bg-white text-black"
              >
                {`${sortType === 'title' ? '제목' : sortType === 'artist' ? '아티스트' : sortType === 'like' ? '좋아요' : '앨범'} ${sortOrder === 'asc' ? '오름차순' : '내림차순'}`}
              </button>
              {isSortMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg">
                  <button
                    onClick={() => handleSort('title', 'asc')}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    제목 오름차순
                  </button>
                  <button
                    onClick={() => handleSort('title', 'desc')}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    제목 내림차순
                  </button>
                  <button
                    onClick={() => handleSort('artist', 'asc')}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    아티스트 오름차순
                  </button>
                  <button
                    onClick={() => handleSort('artist', 'desc')}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    아티스트 내림차순
                  </button>
                  <button
                    onClick={() => handleSort('like', 'asc')}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    좋아요 오름차순
                  </button>
                  <button
                    onClick={() => handleSort('like', 'desc')}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    좋아요 내림차순
                  </button>
                  <button
                    onClick={() => handleSort('album', 'asc')}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    앨범 오름차순
                  </button>
                  <button
                    onClick={() => handleSort('album', 'desc')}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    앨범 내림차순
                  </button>
                </div>
              )}
            </div>
          </div>
          {searchResults.length > 0 ? (
            <div className="space-y-4">
              {searchResults.map((song) => (
                <div 
                  key={song.songId} 
                  className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center cursor-pointer" 
                  onClick={() => handleSongClick(song.songId)}
                >
                  <img src={song.album_img !== '-' ? song.album_img : 'default_album_img.png'} alt={song.album} className="w-16 h-16 rounded-md mr-4" />
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
            <p className="text-gray-500">검색어를 입력해주세요.</p>
          )}
        </div>
      </div>
    </div>
  );
}
