import type { Metadata } from 'next';
import DashboardBoundary from '@/components/mypage/dashboard/DashboardBoundary';

export const metadata: Metadata = {
  title: '마이페이지 - 대시보드',
};

export default function DashboardPage() {
  return <DashboardBoundary />;
}
