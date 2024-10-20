// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HeroPage from './pages/HeroPage'; // 경로를 맞춰주세요

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* "/" 경로에 HeroPage 컴포넌트를 렌더링 */}
        <Route path="/" element={<HeroPage />} />
      </Routes>
    </Router>
  );
};

export default App;
