import React from 'react';
import { motion } from 'framer-motion';

export default function HeroPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-6xl font-extrabold mb-4 text-white">
          Welcome to Conteeze
        </h1>
        <p className="text-xl mb-8 text-gray-200">
          Manage your CCM songlists with ease and grace
        </p>
      </motion.div>
      
      <motion.div 
        className="space-x-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <button className="px-6 py-3 bg-yellow-300 text-gray-900 rounded-full font-semibold hover:bg-yellow-200 transition duration-300 transform hover:scale-105 shadow-lg">
          Sign Up
        </button>
        <button className="px-6 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-gray-900 transition duration-300 transform hover:scale-105 shadow-lg">
          Learn More
        </button>
      </motion.div>
      
      <motion.div 
        className="mt-16 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <p className="text-lg mb-4">Trusted by worship leaders worldwide</p>
        <div className="flex justify-center space-x-8">
          {['🎵', '🎶', '🎹', '🎸', '🥁'].map((icon, index) => (
            <motion.span 
              key={index}
              className="text-4xl"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              {icon}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
