import type { Metadata } from 'next';
import { MoabangBoundary } from '@/components/community/moabang';

export const metadata: Metadata = {
  title: '커뮤니티 - 모아방',
};

export default function MoabangPage() {
  return <MoabangBoundary />;
}
