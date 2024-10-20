// conteeze/client/src/pages/HeroPage.tsx
import React from 'react';

export default function HeroPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <h1 className="text-6xl font-bold text-white mb-4">Welcome to Conteeze</h1>
      <p className="text-xl text-white mb-8">Manage your CCM songlists with ease</p>
      <div className="space-x-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Sign Up
        </button>
        <button className="px-4 py-2 border border-white text-white rounded-lg hover:bg-gray-100">
          Learn More
        </button>
      </div>
    </div>
  );
}
