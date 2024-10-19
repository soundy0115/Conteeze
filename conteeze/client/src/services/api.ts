import { Songlist } from '../types';

const dummySonglists: Songlist[] = [
  { id: '1', title: '즐겨찾는 노래' },
  { id: '2', title: '운동할 때 듣는 노래' },
  { id: '3', title: '공부할 때 듣는 노래' },
  { id: '4', title: '드라이브 플레이리스트' },
  { id: '5', title: '파티 플레이리스트' },
];

export const getSonglists = async (): Promise<Songlist[]> => {
  // 실제 API 호출을 시뮬레이션하기 위해 약간의 지연을 추가합니다
  await new Promise(resolve => setTimeout(resolve, 500));
  return dummySonglists;
};