'use client';

import { ProfileSummary } from '@/components/mypage/dashboard/ProfileSummary';

export default function DashboardPage() {
  const mockUser = {
    name: '김모아',
    observationCount: 12,
    bookmarkCount: 10,
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
    </div>
  );
}
