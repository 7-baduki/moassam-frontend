import type { Metadata } from 'next';
import PostsBoundary from '@/components/mypage/posts/PostsBoundary';

export const metadata: Metadata = {
  title: '마이페이지 - 게시글',
};

export default function PostsPage() {
  return <PostsBoundary />;
}
