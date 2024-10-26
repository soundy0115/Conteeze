import React, { useState } from 'react';
import { Moon, Sun, Bell, BellOff } from 'lucide-react';
import Sidebar from '../components/Sidebar';

const SettingsPage: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [fontSize, setFontSize] = useState('medium');

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleNotifications = () => setNotifications(!notifications);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-y-auto p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">설정</h2>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">앱 테마</h3>
          <div className="flex items-center justify-between">
            <span>다크 모드</span>
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
            >
              {darkMode ? <Moon /> : <Sun />}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">알림 설정</h3>
          <div className="flex items-center justify-between">
            <span>알림 받기</span>
            <button
              onClick={toggleNotifications}
              className={`p-2 rounded-full ${notifications ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              {notifications ? <Bell /> : <BellOff />}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">글자 크기</h3>
          <select
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="small">작게</option>
            <option value="medium">보통</option>
            <option value="large">크게</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
