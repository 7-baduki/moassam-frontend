'use client';

import { ProfileSummary } from '@/components/mypage/dashboard/ProfileSummary';
import { GenerationCount } from '@/components/mypage/dashboard/GenerationCount';
import { ChargeGuide } from '@/components/mypage/dashboard/ChargeGuide';

export default function DashboardPage() {
  const mockUser = {
    name: '김모아',
    observationCount: 12,
    bookmarkCount: 10,
    usedCount: 6,
    totalCount: 10,
  };

  const handleEditClick = () => {};

  return (
    <div className="flex flex-col">
      <ProfileSummary
        name={mockUser.name}
        observationCount={mockUser.observationCount}
        bookmarkCount={mockUser.bookmarkCount}
        onEditClick={handleEditClick}
      />

      <GenerationCount used={mockUser.usedCount} total={mockUser.totalCount} className="mt-22.5" />

      <ChargeGuide className="mt-10" />
    </div>
  );
}
