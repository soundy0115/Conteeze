import React from 'react';
import { Music, Search, List, PlusCircle, Users, Settings, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const menuItems = [
  { icon: <List className="w-5 h-5" />, name: "내 콘티", path: "/my-setlists" },
  { icon: <Search className="w-5 h-5" />, name: "곡 검색", path: "/search" },
  { icon: <Music className="w-5 h-5" />, name: "주제별 곡", path: "/songs-by-theme" },
  { icon: <PlusCircle className="w-5 h-5" />, name: "곡 등록", path: "/add-song" },
  { icon: <Users className="w-5 h-5" />, name: "팀 협업", path: "/collaboration" },
  { icon: <Settings className="w-5 h-5" />, name: "설정", path: "/settings" },
];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('authToken');
    navigate('/');
  };

  return (
    <div className="w-64 bg-white shadow-md flex flex-col h-full">
      <div className="p-4">
        <Link to="/dashboard" className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
          Conteeze
        </Link>
      </div>
      <nav className="mt-4 flex-grow">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
          >
            {item.icon}
            <span className="ml-2">{item.name}</span>
          </Link>
        ))}
      </nav>
      <button
        onClick={handleLogout}
        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 mt-auto mb-4"
      >
        <LogOut className="w-5 h-5 mr-2" />
        로그아웃
      </button>
    </div>
  );
};

export default Sidebar;
