// app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Conteeze - AI 기반 찬양 콘티 생성기',
  description: '찬양곡을 검색하고 AI로 최적의 콘티를 생성해보세요',
  keywords: '찬양, 콘티, AI, 교회, 음악',
  authors: [{ name: 'Conteeze Team' }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Sans+KR:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
