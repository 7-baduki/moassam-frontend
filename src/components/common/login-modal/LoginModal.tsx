'use client';

import { useEffect } from 'react';
import { FocusTrap } from 'focus-trap-react';
import { MainLogoIcon, LoginKakaoIcon, LoginNaverIcon } from '@/app/assets/icons';
import { useLoginModalStore } from '@/stores/loginModalStore';
import { LoginButton } from './LoginButton';
import { LoginBottomSheet } from './LoginBottomSheet';
import { Tooltip } from '@/components/common/tooltip/Tooltip';
import { KAKAO_AUTH_URL, NAVER_AUTH_URL } from '@/constants/auth';
import { useIsMobile } from '@/hooks/useIsMobile';

export function LoginModal() {
  const { isOpen, title, description, close, lastProvider, setLastProvider } = useLoginModalStore();
  const isMobile = useIsMobile();

  const handleKakaoLogin = () => {
    setLastProvider('kakao');
    window.location.href = KAKAO_AUTH_URL;
  };

  const handleNaverLogin = () => {
    setLastProvider('naver');
    window.location.href = NAVER_AUTH_URL;
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, close]);

  if (!isOpen) return null;

  if (isMobile) {
    return (
      <LoginBottomSheet
        isOpen={isOpen}
        onClose={close}
        title={title}
        description={description}
        lastProvider={lastProvider}
        onKakaoLogin={handleKakaoLogin}
        onNaverLogin={handleNaverLogin}
      />
    );
  }

  return (
    <FocusTrap focusTrapOptions={{ escapeDeactivates: false, returnFocusOnDeactivate: true }}>
      <div className="fixed inset-0 z-1000 flex items-center justify-center">
        <div className="overlay absolute inset-0" onClick={close} aria-hidden="true" />
        <div
          className="relative z-10 flex w-130 flex-col items-center rounded-[20px] bg-white px-[62.5px] pt-12.5 pb-10.75 leading-[140%] tracking-[-0.02em]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="login-modal-title"
        >
          <MainLogoIcon className="h-10 w-10" />
          <p id="login-modal-title" className="mt-1.5 text-xl font-semibold text-pink-500">
            {title}
          </p>
          <p className="text-sm font-medium text-black">{description}</p>

          <div className="mt-[28.5px] flex w-full items-center gap-4.5 px-[24.5px]">
            <div className="h-px flex-1 bg-black-500" />
            <span className="text-xs font-medium text-black-500">로그인</span>
            <div className="h-px flex-1 bg-black-500" />
          </div>

          <div className="mt-4 w-full px-5 py-6.5">
            <div className="flex flex-col gap-10">
              <div className="relative">
                {lastProvider === 'kakao' && <Tooltip label="최근에 로그인 했어요!" />}
                <LoginButton
                  icon={<LoginKakaoIcon />}
                  label="카카오로 시작하기"
                  className="bg-[#FEE300] text-[#461E25]"
                  onClick={handleKakaoLogin}
                />
              </div>
              <div className="relative">
                {lastProvider === 'naver' && <Tooltip label="최근에 로그인 했어요!" />}
                <LoginButton
                  icon={<LoginNaverIcon />}
                  label="네이버로 시작하기"
                  className="bg-[#00CE45] text-white"
                  onClick={handleNaverLogin}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
}
