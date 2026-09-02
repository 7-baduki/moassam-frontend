import type { Metadata } from 'next';
import BookmarksBoundary from '@/components/mypage/bookmarks/BookmarksBoundary';

export const metadata: Metadata = {
  title: '마이페이지 - 북마크',
};

export default function BookmarksPage() {
  return <BookmarksBoundary />;
}
