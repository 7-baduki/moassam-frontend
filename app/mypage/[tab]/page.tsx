import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BookmarksBoundary from '@/components/mypage/bookmarks/BookmarksBoundary';
import CommentsBoundary from '@/components/mypage/comments/CommentsBoundary';
import DashboardBoundary from '@/components/mypage/dashboard/DashboardBoundary';
import ObservationsBoundary from '@/components/mypage/observations/ObservationsBoundary';
import PostsBoundary from '@/components/mypage/posts/PostsBoundary';

const MYPAGE_TABS = {
  dashboard: { title: '대시보드', Boundary: DashboardBoundary },
  observations: { title: '관찰일지 내역', Boundary: ObservationsBoundary },
  posts: { title: '게시글', Boundary: PostsBoundary },
  comments: { title: '댓글', Boundary: CommentsBoundary },
  bookmarks: { title: '북마크', Boundary: BookmarksBoundary },
} as const;

type MyPageTab = keyof typeof MYPAGE_TABS;

function isMyPageTab(tab: string): tab is MyPageTab {
  return tab in MYPAGE_TABS;
}

export function generateStaticParams() {
  return Object.keys(MYPAGE_TABS).map((tab) => ({ tab }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tab: string }>;
}): Promise<Metadata> {
  const { tab } = await params;
  if (!isMyPageTab(tab)) return {};

  return { title: `마이페이지 - ${MYPAGE_TABS[tab].title}` };
}

export default async function MyPageTabPage({ params }: { params: Promise<{ tab: string }> }) {
  const { tab } = await params;
  if (!isMyPageTab(tab)) notFound();

  const { Boundary } = MYPAGE_TABS[tab];
  return <Boundary />;
}
