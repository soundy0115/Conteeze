import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { searchSongs } from '../services/api';
import { Song } from '../types';

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [searchType, setSearchType] = useState('title');

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      console.log('검색어를 입력해주세요.');
      return;
    }

    try {
      console.log(`검색 시작: 검색어 - "${searchTerm}", 검색 유형 - ${searchType}`);
      const songs = await searchSongs(searchTerm, searchType as 'title' | 'lyrics');
      console.log(`검색 결과: ${songs.length}개의 노래 찾음`);
      setSearchResults(songs);
    } catch (error) {
      console.error('검색 오류:', error);
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
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left">앨범</th>
                  <th className="p-2 text-left">제목</th>
                  <th className="p-2 text-left">아티스트</th>
                  <th className="p-2 text-left">좋아요</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((song) => (
                  <tr key={song.songId} className="border-b">
                    <td className="p-2">
                      <img src={song.album_img} alt={song.album} className="w-12 h-12 object-cover" />
                    </td>
                    <td className="p-2">{song.title}</td>
                    <td className="p-2">{song.artist}</td>
                    <td className="p-2">{song.like}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">검색 결과가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}
