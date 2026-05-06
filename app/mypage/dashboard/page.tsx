'use client';

import { useState } from 'react';
import { ProfileSummary } from '@/components/mypage/dashboard/ProfileSummary';
import { GenerationCount } from '@/components/mypage/dashboard/GenerationCount';
import { ChargeGuide } from '@/components/mypage/dashboard/ChargeGuide';
import { ProfileEditModal } from '@/components/mypage/dashboard/ProfileEditModal';
import { WithdrawModal } from '@/components/mypage/dashboard/WithdrawModal';

export default function DashboardPage() {
  const mockUser = {
    name: '김모아',
    username: 'moassam@naver.com',
    observationCount: 12,
    bookmarkCount: 10,
    usedCount: 6,
    totalCount: 10,
  };

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  return (
    <div className="flex flex-col">
      <ProfileSummary
        name={mockUser.name}
        observationCount={mockUser.observationCount}
        bookmarkCount={mockUser.bookmarkCount}
        onEditClick={() => setIsEditModalOpen(true)}
      />

      <GenerationCount used={mockUser.usedCount} total={mockUser.totalCount} className="mt-22.5" />

      <ChargeGuide className="mt-10" />

      <ProfileEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onWithdrawClick={() => {
          setIsEditModalOpen(false);
          setIsWithdrawModalOpen(true);
        }}
        username={mockUser.username}
      />
      <WithdrawModal isOpen={isWithdrawModalOpen} onClose={() => setIsWithdrawModalOpen(false)} />
    </div>
  );
}
