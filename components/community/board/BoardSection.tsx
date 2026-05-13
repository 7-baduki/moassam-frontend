'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import BoardCard from './BoardCard';
import CommunityTitleBar from '@/components/community/CommunityTitleBar';
import CommunityFilter from '@/components/community/CommunityFilter';
import Pagination from '@/components/common/pagination/Pagination';
import { BOARD_CATEGORY_FILTER_TABS } from '@/constants/community/community-tabs';
import { useBoardPostsQuery } from '@/hooks/queries/community/useCommunity';
import { EmptyState } from '@/components/common/empty-state/EmptyState';
import type { HeadTag } from './board.type';

function getValidParam<T extends { value: string }>(
  raw: string | null,
  options: T[],
  fallback: string,
): string {
  if (raw && options.some((o) => o.value === raw)) return raw;
  return fallback;
}

export default function BoardSection() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const category = getValidParam(searchParams.get('category'), BOARD_CATEGORY_FILTER_TABS, 'all');
  const rawPage = Number(searchParams.get('page'));
  const currentPage = Number.isInteger(rawPage) && rawPage >= 1 ? rawPage : 1;

  const { data } = useBoardPostsQuery({
    headTag: category !== 'all' ? (category as HeadTag) : undefined,
    page: currentPage - 1,
    size: 9,
  });

  const totalPages = Math.max(1, data.totalPages);

  function updateParam(key: string, value: string, resetPage = false) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    if (resetPage) params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function handlePageChange(page: number) {
    updateParam('page', String(page));
  }

  return (
    <section className="flex flex-col" aria-label="게시글 목록">
      <CommunityTitleBar
        title="자유게시판"
        onWrite={() => router.push('/community/write?board=free')}
      />
      <CommunityFilter
        categoryTabs={BOARD_CATEGORY_FILTER_TABS}
        category={category}
        onCategoryChange={(value) => updateParam('category', value, true)}
      />
      {data.data.length === 0 ? (
        <div className="flex flex-1 items-center justify-center pt-20">
          <EmptyState message="아직 등록된 게시글이 없어요" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-5">
            {data.data.map((post) => (
              <BoardCard key={post.postId} post={post} />
            ))}
          </div>
          <div className="mt-15 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onChange={handlePageChange}
            />
          </div>
        </>
      )}
    </section>
  );
}
