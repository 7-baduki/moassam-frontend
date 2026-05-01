'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import MoabangCard from './MoabangCard';
import CommunityTitleBar from '@/components/community/CommunityTitleBar';
import CommunityFilter from '@/components/community/CommunityFilter';
import Pagination from '@/components/common/pagination/Pagination';
import type { MoabangPost } from './moabang.type';

const AGE_TABS = [
  { label: '전체', value: 'all' },
  { label: '영아', value: 'infant' },
  { label: '만 3세', value: 'age3' },
  { label: '만 4세', value: 'age4' },
  { label: '만 5세', value: 'age5' },
];

const CATEGORY_TABS = [
  { label: '전체', value: 'all' },
  { label: '활동자료', value: 'activity' },
  { label: '계획안', value: 'plan' },
  { label: '일지', value: 'journal' },
  { label: '안내문', value: 'notice' },
];

const PAGE_SIZE = 9;

function getValidParam<T extends { value: string }>(
  raw: string | null,
  options: T[],
  fallback: string,
): string {
  if (raw && options.some((o) => o.value === raw)) return raw;
  return fallback;
}

const MOCK_POSTS: MoabangPost[] = Array.from({ length: 90 }, (_, i) => ({
  postId: i + 1,
  category: 'RESOURCE',
  categoryName: '모아방',
  tags: ['영아', '계획안'],
  title: '5월 가정의달 주제 수업 활동지 공유합니다 (수정가능)',
  thumbnail: `https://picsum.photos/400/200?random=${i + 1}`,
  authorName: '햇살선생님',
  likeCount: 46,
  commentCount: 119,
  viewCount: 1230,
  createdAt: '3시간 전',
}));

export default function MoabangSection() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const age = getValidParam(searchParams.get('age'), AGE_TABS, 'all');
  const category = getValidParam(searchParams.get('category'), CATEGORY_TABS, 'all');

  const totalPages = Math.max(1, Math.ceil(MOCK_POSTS.length / PAGE_SIZE));
  const rawPage = Number(searchParams.get('page'));
  const currentPage = Number.isInteger(rawPage) && rawPage >= 1 ? Math.min(rawPage, totalPages) : 1;

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const visiblePosts = MOCK_POSTS.slice(startIndex, startIndex + PAGE_SIZE);

  useEffect(() => {
    if (currentPage >= totalPages) return;
    const nextStart = currentPage * PAGE_SIZE;
    const nextPosts = MOCK_POSTS.slice(nextStart, nextStart + PAGE_SIZE);
    nextPosts.forEach((post) => {
      if (!post.thumbnail) return;
      const img = new window.Image();
      img.src = post.thumbnail;
    });
  }, [currentPage, totalPages]);

  function updateParam(key: string, value: string, resetPage = false) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    if (resetPage) params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`, { scroll: true });
  }

  function handlePageChange(page: number) {
    updateParam('page', String(page));
  }

  return (
    <section className="flex flex-col" aria-label="게시글 목록">
      <CommunityTitleBar title="모아방" description="수업자료를 공유하는 공간입니다" />
      <CommunityFilter
        ageTabs={AGE_TABS}
        age={age}
        onAgeChange={(value) => updateParam('age', value, true)}
        categoryTabs={CATEGORY_TABS}
        category={category}
        onCategoryChange={(value) => updateParam('category', value, true)}
      />
      <div className="grid grid-cols-3 gap-5">
        {visiblePosts.map((post) => (
          <MoabangCard key={post.postId} post={post} />
        ))}
      </div>
      <div className="flex justify-center">
        <Pagination currentPage={currentPage} totalPages={totalPages} onChange={handlePageChange} />
      </div>
    </section>
  );
}
