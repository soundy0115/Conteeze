import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';

interface Setlist {
  id: number;
  name: string;
  date: string;
  songCount: number;
}

const MySetlistsPage: React.FC = () => {
  const [setlists, setSetlists] = useState<Setlist[]>([]);

  useEffect(() => {
    // TODO: API에서 실제 데이터를 가져오는 로직으로 대체해야 합니다.
    const mockSetlists: Setlist[] = [
      { id: 1, name: "주일 예배", date: "2023-05-07", songCount: 5 },
      { id: 2, name: "수요 예배", date: "2023-05-10", songCount: 3 },
      { id: 3, name: "금요 기도회", date: "2023-05-12", songCount: 4 },
    ];
    setSetlists(mockSetlists);
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-y-auto p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">내 콘티</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-semibold mb-4">최근 콘티 목록</h3>
          <div className="grid gap-4">
            {setlists.map((setlist) => (
              <div key={setlist.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <h4 className="text-xl font-semibold">{setlist.name}</h4>
                <p className="text-gray-600">날짜: {setlist.date}</p>
                <p className="text-gray-600">곡 수: {setlist.songCount}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MySetlistsPage;
