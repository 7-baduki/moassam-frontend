import type { Metadata } from 'next';
import ObservationsBoundary from '@/components/mypage/observations/ObservationsBoundary';

export const metadata: Metadata = {
  title: '마이페이지 - 관찰일지 내역',
};

export default function ObservationsPage() {
  return <ObservationsBoundary />;
}
