'use client';

import { useEffect } from 'react';
import { FocusTrap } from 'focus-trap-react';
import LoginTopLogo from '@/app/assets/icons/LoginTopLogo.svg';
import LoginKakaoIcon from '@/app/assets/icons/LoginKakaoIcon.svg';
import LoginNaverIcon from '@/app/assets/icons/LoginNaverIcon.svg';
import LoginGoogleIcon from '@/app/assets/icons/LoginGoogleIcon.svg';
import LoginBottomLogo from '@/app/assets/icons/LoginBottomLogo.svg';
import { useLoginModalStore } from '@/stores/loginModalStore';
import { LoginButton } from './LoginButton';
import { LoginTooltip } from './LoginTooltip';

export function LoginModal() {
  const { isOpen, title, description, close, lastProvider } = useLoginModalStore();

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
    <FocusTrap focusTrapOptions={{ escapeDeactivates: false, returnFocusOnDeactivate: true }}>
      <div className="fixed inset-0 z-1000 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-[#00000073] backdrop-blur-[10px]"
          onClick={close}
          aria-hidden="true"
        />
        <div
          className="relative z-10 flex w-130 flex-col items-center rounded-[20px] bg-white px-[62.5px] pt-12.5 pb-10.75 leading-[140%] tracking-[-0.02em]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="login-modal-title"
        >
          <LoginTopLogo />
          <p id="login-modal-title" className="mt-1.5 text-xl font-semibold text-pink-500">
            {title}
          </p>
          <p className="text-sm text-black">{description}</p>

          <div className="mt-[28.5px] flex w-full items-center gap-4.5 px-[24.5px]">
            <div className="h-px flex-1 bg-black-500" />
            <span className="text-xs font-medium text-black-500">로그인</span>
            <div className="h-px flex-1 bg-black-500" />
          </div>

          <div className="mt-4 w-full px-5 py-6.5">
            <div className="flex flex-col gap-10">
              <div className="relative">
                {lastProvider === 'kakao' && <LoginTooltip label="최근에 로그인 했어요!" />}
                <LoginButton
                  icon={<LoginKakaoIcon />}
                  label="카카오로 시작하기"
                  className="bg-[#FEE300] text-[#461E25]"
                />
              </div>
              <div className="relative">
                {lastProvider === 'naver' && <LoginTooltip label="최근에 로그인 했어요!" />}
                <LoginButton
                  icon={<LoginNaverIcon />}
                  label="네이버로 시작하기"
                  className="bg-[#00CE45] text-white"
                />
              </div>
              <div className="relative">
                {lastProvider === 'google' && <LoginTooltip label="최근에 로그인 했어요!" />}
                <LoginButton
                  icon={<LoginGoogleIcon />}
                  label="구글로 시작하기"
                  className="border-[0.5px] border-black-500 bg-white text-black-800"
                />
              </div>
            </div>
          </div>

          <LoginBottomLogo className="mt-4" />
        </div>
      </div>
    </FocusTrap>
  );
}
