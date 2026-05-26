import type { Metadata } from 'next';
import CommentsBoundary from '@/components/mypage/comments/CommentsBoundary';

export const metadata: Metadata = {
  title: '마이페이지 - 댓글',
};

export default function CommentsPage() {
  return <CommentsBoundary />;
}
