import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HeroPage from './pages/HeroPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import LearnMorePage from './pages/LearnMorePage';
import DashboardPage from './pages/DashboardPage';
import MySetlistsPage from './pages/MySetlistsPage';
import SettingsPage from './pages/SettingsPage';
import SearchPage from './pages/SearchPage';
import SongDetailPage from './pages/SongDetailPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/my-setlists" element={<MySetlistsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/songs/:songId" element={<SongDetailPage />} />
        <Route
          path="*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<HeroPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/learn-more" element={<LearnMorePage />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
