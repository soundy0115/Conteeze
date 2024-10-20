import React, { useEffect, useState } from 'react';
import { Music, Users, Share, Settings } from 'lucide-react';

interface User {
  name: string;
}

const features = [
  { icon: <Music className="w-6 h-6" />, name: "곡 목록 관리" },
  { icon: <Users className="w-6 h-6" />, name: "팀 협업" },
  { icon: <Share className="w-6 h-6" />, name: "공유 옵션" },
  { icon: <Settings className="w-6 h-6" />, name: "계정 설정" },
];

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setUser({ name: userId });
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-white">대시보드</h1>
      
      {user && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-2">로그인 성공!</h2>
          <p className="text-lg">환영합니다, {user.name}님! 다시 뵙게 되어 기쁩니다.</p>
        </div>
      )}

      <h3 className="text-2xl font-semibold mb-4 text-white">주요 기능</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {features.map((feature, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-2">
              {feature.icon}
              <h4 className="text-xl font-semibold ml-2">{feature.name}</h4>
            </div>
            <p>이 기능은 현재 개발 중입니다. 업데이트를 기대해 주세요!</p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <p className="text-lg text-white">
          최고의 경험을 제공하기 위해 열심히 노력하고 있습니다. 
          곧 새로운 기능과 업데이트를 확인하실 수 있습니다!
        </p>
      </div>
    </div>
  );
}
