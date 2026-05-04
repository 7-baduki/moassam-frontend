'use client';

import { useEffect, useRef } from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/common/button/Button';
import { XIcon } from '@/app/assets/icons';

type ProfilePopoverProps = {
  name: string;
  avatarSrc: StaticImageData | string; // TODO: API 연동 후 변경
  onClose: () => void;
  onLogout: () => void;
};

export function ProfilePopover({ name, avatarSrc, onClose, onLogout }: ProfilePopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={popoverRef}
      className="absolute top-14 right-0 z-1100 w-75 rounded-[20px] bg-white px-20 pt-11.25 shadow-[5px_6px_10px_0px_rgba(0,0,0,0.14)]"
      role="dialog"
      aria-modal="true"
    >
      <button
        className="absolute top-[12.5px] right-2.5 cursor-pointer text-black"
        onClick={onClose}
        aria-label="닫기"
      >
        <XIcon />
      </button>
      <div className="flex flex-col items-center">
        <div className="h-34.5 w-34.5 overflow-hidden rounded-full">
          <Image src={avatarSrc} alt="프로필 아바타" width={138} height={138} />
        </div>
        <p className="pt-3 pb-5.75 text-sm font-medium whitespace-nowrap text-black">
          안녕하세요, {name} 선생님
        </p>
      </div>

      <Link
        href="/mypage/dashboard"
        className="block w-full rounded-lg bg-pink-500 py-2.25 text-center text-base font-medium text-white hover:bg-pink-600"
        onClick={onClose}
      >
        마이페이지
      </Link>

      <Button
        variant="ghost"
        size="full"
        className="pt-11.5 pb-5 text-xs text-black-500"
        onClick={onLogout}
      >
        로그아웃
      </Button>
    </div>
  );
}
