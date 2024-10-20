import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

interface LayoutProps {
  children: React.ReactNode;
  showBackButton?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showBackButton }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isHeroPage = location.pathname === '/';
  const isDashboardPage = location.pathname === '/dashboard';

  const shouldShowBackButton = showBackButton ?? (!isHeroPage && !isDashboardPage);


  return (
    <div className="min-h-screen overflow-hidden relative flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500"></div>
      
      {shouldShowBackButton && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-6 left-6 text-white hover:text-gray-200 z-20"
          onClick={() => navigate('/')}
        >
          <ArrowLeftIcon className="h-10 w-10" />
        </motion.button>
      )}

      <div className="relative z-10 w-full max-w-4xl p-8">
        {children}
      </div>
    </div>
  );
};

export default Layout;