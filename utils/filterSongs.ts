import { Song } from "@/types/Song";

export type SearchType = 'all' | 'title' | 'artist' | 'lyrics';
export type SortType = 'title' | 'artist' | 'album' | 'relevance';

export interface SearchResult {
  song: Song;
  relevance: number;
  highlightedTitle: string;
  highlightedArtist: string;
  highlightedLyrics: string;
}

export const filterSongs = (
  songs: Song[], 
  query: string, 
  searchType: SearchType = 'all',
  sortType: SortType = 'title'
): SearchResult[] => {
  if (!query.trim()) {
    return songs.map(song => ({
      song,
      relevance: 0,
      highlightedTitle: song.title,
      highlightedArtist: song.artist,
      highlightedLyrics: song.lyrics
    })).sort((a, b) => { // 기본적으로 제목순으로 정렬하여 반환
      if (sortType === 'artist') return a.song.artist.localeCompare(b.song.artist);
      if (sortType === 'album') return a.song.album.localeCompare(b.song.album);
      return a.song.title.localeCompare(b.song.title);
    });
  }

  const lowerQuery = query.toLowerCase();
  const results: SearchResult[] = [];

  songs.forEach(song => {
    let relevance = 0;
    let matches = false;

    if (searchType === 'all' || searchType === 'title') {
      if (song.title.toLowerCase().includes(lowerQuery)) {
        relevance += song.title.toLowerCase() === lowerQuery ? 100 : 10;
        matches = true;
      }
    }

    if (searchType === 'all' || searchType === 'artist') {
      if (song.artist.toLowerCase().includes(lowerQuery)) {
        relevance += song.artist.toLowerCase() === lowerQuery ? 100 : 10;
        matches = true;
      }
    }

    if (searchType === 'all' || searchType === 'lyrics') {
      if (song.lyrics.toLowerCase().includes(lowerQuery)) {
        // 가사에서 검색어가 나오는 횟수를 계산
        const lyricMatches = (song.lyrics.toLowerCase().match(new RegExp(lowerQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
        relevance += lyricMatches * 5;
        matches = true;
      }
    }

    if (matches) {
      results.push({
        song,
        relevance,
        highlightedTitle: highlightText(song.title, query),
        highlightedArtist: highlightText(song.artist, query),
        highlightedLyrics: highlightText(song.lyrics, query)
      });
    }
  });

  // 정렬
  return sortResults(results, sortType, query);
};

const highlightText = (text: string, query: string): string => {
  if (!query.trim()) return text;
  
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-800 rounded">$1</mark>');
};

const sortResults = (results: SearchResult[], sortType: SortType, query: string): SearchResult[] => {
  const lowerQuery = query.toLowerCase();
  
  return results.sort((a, b) => {
    switch (sortType) {
      case 'artist':
        return a.song.artist.localeCompare(b.song.artist);
      case 'album':
        return a.song.album.localeCompare(b.song.album);
      case 'relevance':
        // 정확한 매칭을 우선시
        const aExactMatch = 
          a.song.title.toLowerCase() === lowerQuery ||
          a.song.artist.toLowerCase() === lowerQuery;
        const bExactMatch = 
          b.song.title.toLowerCase() === lowerQuery ||
          b.song.artist.toLowerCase() === lowerQuery;
        
        if (aExactMatch && !bExactMatch) return -1;
        if (!aExactMatch && bExactMatch) return 1;
        
        return b.relevance - a.relevance;
      case 'title':
      default:
        return a.song.title.localeCompare(b.song.title);
    }
  });
};
