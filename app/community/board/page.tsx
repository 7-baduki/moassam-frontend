import type { Metadata } from 'next';
import { BoardBoundary } from '@/components/community/board';

export const metadata: Metadata = {
  title: '커뮤니티 - 자유게시판',
};

export default function BoardPage() {
  return <BoardBoundary />;
}
