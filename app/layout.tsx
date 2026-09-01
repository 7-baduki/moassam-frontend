import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { Suspense } from 'react';
import {
  Noto_Sans_KR,
  Noto_Serif_KR,
  Do_Hyeon,
  Black_Han_Sans,
  Gamja_Flower,
} from 'next/font/google';
import { Toaster } from 'sonner';
import { GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';
import Providers from './providers';
import Header from '@/components/common/header/Header';
import Sidebar from '@/components/common/sidebar/Sidebar';
import { LoginModal } from '@/components/common/login-modal/LoginModal';
import UserSlot from '@/components/common/user-slot/UserSlot';
import { ScrollRoot } from '@/lib/scroll-root';

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans-kr',
});
const notoSerifKR = Noto_Serif_KR({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-noto-serif-kr',
});
const doHyeon = Do_Hyeon({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-do-hyeon',
});
const blackHanSans = Black_Han_Sans({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-black-han-sans',
});
const gamjaFlower = Gamja_Flower({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-gamja-flower',
});

const SITE_URL = 'https://www.moassam.com';
const SITE_NAME = '모아쌤';
const SITE_DESCRIPTION = '유치원·어린이집 교사를 위한 AI 관찰일지 작성 및 활동자료 공유 커뮤니티';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontVariables = [
    pretendard.variable,
    notoSansKR.variable,
    notoSerifKR.variable,
    doHyeon.variable,
    blackHanSans.variable,
    gamjaFlower.variable,
  ].join(' ');

  return (
    <html lang="ko" className={`${fontVariables} h-full antialiased`}>
      <body className={`${pretendard.className} flex h-dvh flex-col overflow-hidden`}>
        <Providers>
          <Suspense fallback={null}>
            <UserSlot />
          </Suspense>
          <Header />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar />
            <ScrollRoot className="flex-1 overflow-y-auto bg-black-100">{children}</ScrollRoot>
          </div>
        </Providers>
        <Toaster position="top-right" offset={{ top: 69 }} />
        <LoginModal />
      </body>
      {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}
    </html>
  );
}
