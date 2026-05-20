'use client';

import { useState } from 'react';
import { ProfileSummary } from '@/components/mypage/dashboard/ProfileSummary';
import { GenerationCount } from '@/components/mypage/dashboard/GenerationCount';
import { ChargeGuide } from '@/components/mypage/dashboard/ChargeGuide';
import { ProfileEditModal } from '@/components/mypage/dashboard/ProfileEditModal';
import { ProfileEditBottomSheet } from '@/components/mypage/dashboard/ProfileEditBottomSheet';
import { WithdrawModal } from '@/components/mypage/dashboard/WithdrawModal';
import { WithdrawBottomSheet } from '@/components/mypage/dashboard/WithdrawBottomSheet';
import { useUser } from '@/lib/user-context';
import { useActivitySummaryQuery } from '@/hooks/queries/user/useActivitySummary';
import { useCreditsQuery } from '@/hooks/queries/user/useCredits';
import { useIsMobile } from '@/hooks/useIsMobile';
import MypageMenu from './MypageMenu';

export default function DashboardSection() {
  const user = useUser();
  const { data: activitySummary } = useActivitySummaryQuery();
  const { data: credits } = useCreditsQuery();

  const isMobile = useIsMobile();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  return (
    <div className="flex flex-col">
      <ProfileSummary
        name={user?.nickname ?? ''}
        email={user?.email ?? ''}
        provider={user?.provider ?? 'KAKAO'}
        profileImageUrl={user?.profileImageUrl}
        observationCount={activitySummary?.observationCount ?? 0}
        bookmarkCount={activitySummary?.bookmarkedPostCount ?? 0}
        onEditClick={() => setIsEditModalOpen(true)}
      />

      <GenerationCount
        balance={credits?.balance ?? 0}
        total={credits?.total ?? 0}
        className="mt-7.5 xl:mt-22.5"
      />

      <ChargeGuide className="mt-7.5 xl:mt-10" />
      <MypageMenu />

      {isMobile ? (
        <ProfileEditBottomSheet
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
      ) : (
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
      )}
      {isMobile ? (
        <WithdrawBottomSheet
          isOpen={isWithdrawModalOpen}
          onClose={() => setIsWithdrawModalOpen(false)}
        />
      ) : (
        <WithdrawModal isOpen={isWithdrawModalOpen} onClose={() => setIsWithdrawModalOpen(false)} />
      )}
    </div>
  );
}
