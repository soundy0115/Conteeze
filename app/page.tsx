'use client';
import { useState, useEffect } from 'react';
import songsData from '../db/songs.json';
import { Song } from '../types/Song';
import { filterSongs, SearchType, SortType, SearchResult } from '../utils/filterSongs';

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<SearchType>('all');
  const [sortType, setSortType] = useState<SortType>('title');
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const songs: Song[] = songsData;
  const results = filterSongs(songs, searchQuery, searchType, sortType);

  // 엔터키로 검색 실행
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setSearchQuery(query);
    }
  };

  // 검색 버튼 클릭
  const handleSearch = () => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* 헤더 */}
      <header className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
              Conteeze
            </h1>
            <p className="text-xl md:text-2xl font-light mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              AI 기반 찬양 콘티 생성기
            </p>
            <div className="flex justify-center space-x-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 text-sm">
                🎵 {songs.length}곡의 찬양
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 text-sm">
                🤖 AI 최적화
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 text-sm">
                ⚡ 빠른 검색
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 검색 섹션 */}
        <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="max-w-4xl mx-auto space-y-6">
            {/* 검색 옵션들 */}
            <div className="flex flex-wrap gap-4 justify-center">
              {/* 검색 타입 선택 */}
              <div className="flex items-center space-x-2 bg-white dark:bg-slate-800 rounded-lg p-2 shadow-md">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">검색:</span>
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value as SearchType)}
                  className="text-sm bg-transparent border border-gray-200 dark:border-slate-600 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">전체</option>
                  <option value="title">제목</option>
                  <option value="artist">아티스트</option>
                  <option value="lyrics">가사</option>
                </select>
              </div>

              {/* 정렬 옵션 */}
              <div className="flex items-center space-x-2 bg-white dark:bg-slate-800 rounded-lg p-2 shadow-md">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">정렬:</span>
                <select
                  value={sortType}
                  onChange={(e) => setSortType(e.target.value as SortType)}
                  className="text-sm bg-transparent border border-gray-200 dark:border-slate-600 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="relevance">관련순</option>
                  <option value="title">제목순</option>
                  <option value="artist">아티스트순</option>
                  <option value="album">앨범순</option>
                </select>
              </div>
            </div>

            {/* 검색 입력창 */}
            <div className="relative">
              <input
                type="text"
                placeholder="곡명, 아티스트, 가사로 검색해보세요..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-6 py-4 text-lg bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-600 rounded-2xl shadow-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500 pr-20"
              />
              <button
                onClick={handleSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                검색
              </button>
            </div>
          </div>
        </div>

        {/* 결과 섹션 */}
        <div className="animate-fade-in" style={{ animationDelay: '0.8s' }}>
          {searchQuery && (
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                검색 결과
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {results.length}개의 찬양곡을 찾았습니다
              </p>
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-500">
                {searchType !== 'all' ? `"${searchType}" 검색` : '전체 검색'} • {
                  sortType === 'relevance' ? '관련순' :
                  sortType === 'title' ? '제목순' :
                  sortType === 'artist' ? '아티스트순' : '앨범순'
                } 정렬
              </div>
            </div>
          )}

          {!searchQuery && (
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                찬양곡을 검색해보세요
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                위의 검색창에 곡명, 아티스트, 또는 가사 일부를 입력하고 검색 버튼을 클릭하거나 엔터키를 누르면 관련 찬양곡들을 찾을 수 있습니다.
              </p>
            </div>
          )}

          {/* 찬양곡 리스트 */}
          <div className="space-y-4">
            {results.map((result, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-slate-700 animate-slide-in"
                style={{ animationDelay: `${0.1 * idx}s` }}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 
                            className="text-lg font-semibold text-gray-900 dark:text-white mb-1 truncate"
                            dangerouslySetInnerHTML={{ __html: result.highlightedTitle }}
                          />
                          <p 
                            className="text-sm text-gray-600 dark:text-gray-400 mb-1"
                            dangerouslySetInnerHTML={{ __html: result.highlightedArtist }}
                          />
                          <p className="text-xs text-gray-500 dark:text-gray-500">
                            {result.song.album}
                          </p>
                        </div>
                      </div>

                      {/* 가사 드롭다운 */}
                      {selectedSong?.title === result.song.title && (
                        <div className="mt-4 p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            가사
                          </h4>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            <pre 
                              className="whitespace-pre-wrap font-sans"
                              dangerouslySetInnerHTML={{ __html: result.highlightedLyrics }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-end space-y-3 ml-4">
                      <button
                        onClick={() => setSelectedSong(selectedSong?.title === result.song.title ? null : result.song)}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="가사 보기"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      <div className="flex space-x-2">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors">
                          콘티에 추가
                        </button>
                        <button className="px-3 py-2 text-gray-400 hover:text-blue-600 transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 결과가 없을 때 */}
          {searchQuery && results.length === 0 && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-slate-700 rounded-full mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                검색 결과가 없습니다
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                다른 키워드나 검색 옵션으로 검색해보세요
              </p>
              
              {/* 검색 옵션 제안 */}
              <div className="max-w-md mx-auto">
                <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
                  제목, 아티스트, 가사로 검색하시겠습니까?
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <button
                    onClick={() => {
                      setSearchType('title');
                      setSearchQuery(query);
                    }}
                    className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors text-sm font-medium"
                  >
                    제목으로 검색
                  </button>
                  <button
                    onClick={() => {
                      setSearchType('artist');
                      setSearchQuery(query);
                    }}
                    className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors text-sm font-medium"
                  >
                    아티스트로 검색
                  </button>
                  <button
                    onClick={() => {
                      setSearchType('lyrics');
                      setSearchQuery(query);
                    }}
                    className="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors text-sm font-medium"
                  >
                    가사로 검색
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* 푸터 */}
      <footer className="bg-gray-50 dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400">
              © 2025 Conteeze. 찬양 검색 서비스
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
