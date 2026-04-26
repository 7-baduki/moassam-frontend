'use client';

import { useEffect } from 'react';
import HeaderLogo from '@/app/assets/icons/HeaderLogo.svg';
import LoginKakaoIcon from '@/app/assets/icons/LoginKakaoIcon.svg';
import LoginNaverIcon from '@/app/assets/icons/LoginNaverIcon.svg';
import LoginGoogleIcon from '@/app/assets/icons/LoginGoogleIcon.svg';
import { useLoginModalStore } from '@/stores/loginModalStore';
import { LoginButton } from './LoginButton';

export function LoginModal() {
  const { isOpen, title, description, close } = useLoginModalStore();

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-[#00000073] backdrop-blur-[10px]"
        onClick={close}
        aria-hidden="true"
      />
      <div
        className="relative z-10 flex w-[520px] flex-col items-center rounded-2xl bg-white px-12 py-10"
        role="dialog"
        aria-modal="true"
      >
        <HeaderLogo className="h-14 w-14" />
        <p className="mt-4 text-xl font-bold text-pink-500">{title}</p>
        <p className="mt-2 text-sm text-black-700">{description}</p>

        <div className="mt-8 flex w-full items-center gap-3">
          <div className="h-px flex-1 bg-black-300" />
          <span className="text-xs text-black-500">로그인</span>
          <div className="h-px flex-1 bg-black-300" />
        </div>

        <div className="mt-6 flex w-full flex-col gap-4">
          <LoginButton
            icon={<LoginKakaoIcon />}
            label="카카오로 시작하기"
            className="bg-[#FEE300] text-[#461E25]"
          />
          <LoginButton
            icon={<LoginNaverIcon />}
            label="네이버로 시작하기"
            className="bg-[#00CE45] text-white"
          />
          <LoginButton
            icon={<LoginGoogleIcon />}
            label="구글로 시작하기"
            className="border-[0.5px] border-black-500 bg-white text-black-800"
          />
        </div>

        <p className="mt-8 text-sm font-bold tracking-wider text-black-700">moassem</p>
      </div>
    </div>
  );
}
