'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { FocusTrap } from 'focus-trap-react';
import { DefaultAvatar } from '@/app/assets/images';
import { Button } from '@/components/common/button/Button';

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWithdrawClick: () => void;
}

export function ProfileEditModal({ isOpen, onClose, onWithdrawClick }: ProfileEditModalProps) {
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <FocusTrap focusTrapOptions={{ escapeDeactivates: false, returnFocusOnDeactivate: true }}>
      <div className="fixed inset-0 z-1000 flex items-center justify-center">
        <div className="overlay absolute inset-0" onClick={onClose} aria-hidden="true" />
        <div
          className="relative z-10 w-95 rounded-[20px] bg-white px-7 pt-2.5 pb-6 leading-[140%]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="profile-edit-modal-title"
        >
          <h2 id="profile-edit-modal-title" className="py-4.5 text-lg font-semibold text-black">
            프로필 편집
          </h2>

          <div className="mx-auto my-8 h-27.5 w-27.5 overflow-hidden rounded-full">
            <Image src={DefaultAvatar} alt="프로필 아바타" width={110} height={110} />
          </div>

          <div className="flex flex-col gap-2.5">
            <div className="flex flex-col rounded-[10px] border-[0.5px] border-black-400 px-3 py-2 focus-within:border-pink-500">
              <span className="mb-0.5 text-xs font-medium text-black-500">표시 이름</span>
              <input
                className="text-sm font-medium text-black outline-none placeholder:text-black-600"
                placeholder="김모아 선생님"
                maxLength={15}
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value.replace(/\s/g, ''))}
              />
            </div>
            <div className="flex flex-col rounded-[10px] border-[0.5px] border-black-400 px-3 py-2 focus-within:border-pink-500">
              <span className="mb-0.5 text-xs font-medium text-black-500">사용자 이름</span>
              <input
                className="text-sm font-medium text-black outline-none placeholder:text-black-600"
                placeholder="moassam@gmail.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <p className="pt-5 pb-5.75 text-center text-xs font-medium text-black-500">
            다른 선생님들에게 보여지는 프로필이에요
          </p>

          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" className="text-xs" onClick={onWithdrawClick}>
              탈퇴하기
            </Button>
            <div className="flex gap-2.5">
              <Button variant="outline" size="sm" onClick={onClose}>
                취소
              </Button>
              <Button variant="primary" size="sm" onClick={onClose}>
                저장
              </Button>
            </div>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
}
