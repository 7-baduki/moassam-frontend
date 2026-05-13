'use client';

import { useState } from 'react';
import { ProfileSummary } from '@/components/mypage/dashboard/ProfileSummary';
import { GenerationCount } from '@/components/mypage/dashboard/GenerationCount';
import { ChargeGuide } from '@/components/mypage/dashboard/ChargeGuide';
import { ProfileEditModal } from '@/components/mypage/dashboard/ProfileEditModal';
import { WithdrawModal } from '@/components/mypage/dashboard/WithdrawModal';
import { useUser } from '@/lib/user-context';

const MOCK_COUNTS = {
  observationCount: 0,
  bookmarkCount: 0,
};

export default function DashboardSection() {
  const user = useUser();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  return (
    <div className="flex flex-col">
      <ProfileSummary
        name={user?.nickname ?? ''}
        observationCount={MOCK_COUNTS.observationCount}
        bookmarkCount={MOCK_COUNTS.bookmarkCount}
        onEditClick={() => setIsEditModalOpen(true)}
      />

      <GenerationCount used={6} total={10} className="mt-22.5" />

      <ChargeGuide className="mt-10" />

      <ProfileEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onWithdrawClick={() => {
          setIsEditModalOpen(false);
          setIsWithdrawModalOpen(true);
        }}
        username={user?.email ?? ''}
      />
      <WithdrawModal isOpen={isWithdrawModalOpen} onClose={() => setIsWithdrawModalOpen(false)} />
    </div>
  );
}
