'use client';

import { BottomSheet } from '@/components/common/bottom-sheet/BottomSheet';
import { LoginButton } from './LoginButton';
import { Tooltip } from '@/components/common/tooltip/Tooltip';
import { MainLogoIcon, LoginKakaoIcon, LoginNaverIcon } from '@/app/assets/icons';

interface LoginBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  lastProvider: 'kakao' | 'naver' | null;
  onKakaoLogin: () => void;
  onNaverLogin: () => void;
}

export function LoginBottomSheet({
  isOpen,
  onClose,
  title,
  description,
  lastProvider,
  onKakaoLogin,
  onNaverLogin,
}: LoginBottomSheetProps) {
  return (
    <BottomSheet
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
      title=""
      hasClose={false}
    >
      <div className="flex flex-col items-center px-5 pt-6 pb-10">
        <MainLogoIcon className="h-10 w-10" />
        <p className="mt-1.5 text-xl font-semibold text-pink-500">{title}</p>
        <p className="text-sm font-medium text-black">{description}</p>

        <div className="mt-[28.5px] flex w-full items-center gap-4.5">
          <div className="h-px flex-1 bg-black-500" />
          <span className="text-xs font-medium text-black-500">로그인</span>
          <div className="h-px flex-1 bg-black-500" />
        </div>

        <div className="mt-4 w-full py-6.5">
          <div className="flex flex-col gap-10">
            <div className="relative">
              {lastProvider === 'kakao' && <Tooltip label="최근에 로그인 했어요!" />}
              <LoginButton
                icon={<LoginKakaoIcon />}
                label="카카오로 시작하기"
                className="bg-[#FEE300] text-[#461E25]"
                onClick={onKakaoLogin}
              />
            </div>
            <div className="relative">
              {lastProvider === 'naver' && <Tooltip label="최근에 로그인 했어요!" />}
              <LoginButton
                icon={<LoginNaverIcon />}
                label="네이버로 시작하기"
                className="bg-[#00CE45] text-white"
                onClick={onNaverLogin}
              />
            </div>
          </div>
        </div>
      </div>
    </BottomSheet>
  );
}
