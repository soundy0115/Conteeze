import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Music, Users, Share2, Lock } from 'lucide-react';

const features = [
  {
    icon: <Music className="w-6 h-6" />,
    title: '손쉬운 곡 목록 관리',
    description: '예배 인도자와 음악팀을 위한 완벽한 솔루션. CCM 곡 목록을 쉽게 생성, 편집, 정리할 수 있습니다.'
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: '협업 플랫폼',
    description: '실시간으로 팀과 함께 작업하세요. 아이디어를 공유하고, 세트리스트를 구성하며, 예배 계획을 간소화할 수 있습니다.'
  },
  {
    icon: <Share2 className="w-6 h-6" />,
    title: '간편한 공유',
    description: '클릭 한 번으로 곡 목록을 공유하세요. 예배팀이나 회중과 쉽게 공유할 수 있습니다.'
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: '안전하고 비공개적인',
    description: '최첨단 보안 조치로 데이터를 보호합니다. 맞춤형 개인정보 설정으로 곡 목록 공개 범위를 제어할 수 있습니다.'
  }
];

export default function LearnMorePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl w-full relative z-10 p-8 text-white"
    >
      <h1 className="text-4xl font-extrabold text-center mb-8">Conteeze 알아보기</h1>
      <p className="text-xl text-center mb-12">
        Conteeze는 현대 기독교 음악(CCM) 곡 목록을 관리하기 위한 최고의 플랫폼입니다. 
        예배 인도자와 음악팀을 위해 설계된 Conteeze는 예배 세트리스트를 만들고, 
        정리하고, 공유하는 과정을 간소화합니다.
      </p>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur-lg"
          >
            <div className="flex items-center mb-4">
              {feature.icon}
              <h2 className="text-xl font-bold ml-2">{feature.title}</h2>
            </div>
            <p>{feature.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold mb-4">예배 계획을 한 단계 높일 준비가 되셨나요?</h2>
        <div className="space-x-4">
          <Link
            to="/signup"
            className="inline-block px-6 py-3 bg-yellow-300 text-gray-900 rounded-full font-semibold hover:bg-yellow-200 transition duration-300 transform hover:scale-105 shadow-lg"
          >
            시작하기
          </Link>
          <Link
            to="/login"
            className="inline-block px-6 py-3 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-200 transition duration-300 transform hover:scale-105 shadow-lg"
          >
            로그인
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
