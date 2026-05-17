'use client';

import { useState } from 'react';
import { ProfileSummary } from '@/components/mypage/dashboard/ProfileSummary';
import { GenerationCount } from '@/components/mypage/dashboard/GenerationCount';
import { ChargeGuide } from '@/components/mypage/dashboard/ChargeGuide';
import { ProfileEditModal } from '@/components/mypage/dashboard/ProfileEditModal';
import { WithdrawModal } from '@/components/mypage/dashboard/WithdrawModal';
import { useUser } from '@/lib/user-context';
import { useActivitySummaryQuery } from '@/hooks/queries/user/useActivitySummary';
import { useCreditsQuery } from '@/hooks/queries/user/useCredits';
import MypageMenu from './MypageMenu';

export default function DashboardSection() {
  const user = useUser();
  const { data: activitySummary } = useActivitySummaryQuery();
  const { data: credits } = useCreditsQuery();

  const TOTAL_CREDITS = 10;

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  return (
    <div className="flex flex-col">
      <ProfileSummary
        name={user?.nickname ?? ''}
        profileImageUrl={user?.profileImageUrl}
        observationCount={activitySummary?.observationCount ?? 0}
        bookmarkCount={activitySummary?.bookmarkedPostCount ?? 0}
        onEditClick={() => setIsEditModalOpen(true)}
      />

      <GenerationCount
        used={TOTAL_CREDITS - (credits?.balance ?? TOTAL_CREDITS)}
        total={TOTAL_CREDITS}
        className="mt-22.5"
      />

      <ChargeGuide className="mt-10" />
      <MypageMenu />

      <ProfileEditModal
        key={isEditModalOpen ? 'open' : 'closed'}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onWithdrawClick={() => {
          setIsEditModalOpen(false);
          setIsWithdrawModalOpen(true);
        }}
        username={user?.email ?? ''}
        nickname={user?.nickname ?? ''}
      />
      <WithdrawModal isOpen={isWithdrawModalOpen} onClose={() => setIsWithdrawModalOpen(false)} />
    </div>
  );
}
