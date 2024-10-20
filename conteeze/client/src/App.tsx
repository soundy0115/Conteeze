import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HeroPage from './pages/HeroPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import LearnMorePage from './pages/LearnMorePage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HeroPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/learn-more" element={<LearnMorePage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
