import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Providers from './providers';
import Header from '@/components/common/header/Header';
import Sidebar from '@/components/common/sidebar/Sidebar';

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: '모아쌤',
  description: '유치원·어린이집 교사를 위한 AI 관찰일지 작성 및 수업자료 공유 커뮤니티 플랫폼',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable} h-full antialiased`}>
      <body className={`${pretendard.className} min-h-screen`}>
        <Header />
        <Providers>
          <div className="flex min-h-screen flex-col">
            <div className="flex flex-1">
              <Sidebar />
              <main className="flex-1">{children}</main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
