'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import BoardCard from './BoardCard';
import CommunityTitleBar from '@/components/community/CommunityTitleBar';
import CommunityFilter from '@/components/community/CommunityFilter';
import Pagination from '@/components/common/pagination/Pagination';
import { BOARD_CATEGORY_FILTER_TABS } from '@/constants/community/community-tabs';
import { useBoardPostsQuery, useBoardSearchQuery } from '@/hooks/queries/community/useCommunity';
import { EmptyState } from '@/components/common/empty-state/EmptyState';
import { getValidParam } from '@/utils/getValidParam';
import type { BoardPost, HeadTag } from './board.type';

function PostList({ data }: { data: { data: BoardPost[]; totalPages: number } }) {
  return data.data.length === 0 ? (
    <div className="flex flex-1 items-center justify-center pt-20">
      <EmptyState message="아직 등록된 게시글이 없어요" />
    </div>
  ) : (
    <div className="grid grid-cols-2 gap-5">
      {data.data.map((post) => (
        <BoardCard key={post.postId} post={post} />
      ))}
    </div>
  );
}

function BoardListContent({
  category,
  currentPage,
  onPageChange,
}: {
  category: string;
  currentPage: number;
  onPageChange: (page: number) => void;
}) {
  const { data } = useBoardPostsQuery({
    headTag: category !== 'all' ? (category as HeadTag) : undefined,
    page: currentPage - 1,
    size: 9,
  });

  return (
    <>
      <PostList data={data} />
      {data.totalPages > 1 && (
        <div className="mt-15 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.max(1, data.totalPages)}
            onChange={onPageChange}
          />
        </div>
      )}
    </>
  );
}

function BoardSearchContent({
  keyword,
  currentPage,
  onPageChange,
}: {
  keyword: string;
  currentPage: number;
  onPageChange: (page: number) => void;
}) {
  const { data } = useBoardSearchQuery({ keyword, page: currentPage - 1, size: 9 });

  return (
    <>
      <PostList data={data} />
      {data.totalPages > 1 && (
        <div className="mt-15 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.max(1, data.totalPages)}
            onChange={onPageChange}
          />
        </div>
      )}
    </>
  );
}

export default function BoardSection() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const keyword = searchParams.get('keyword') ?? '';
  const category = getValidParam(searchParams.get('category'), BOARD_CATEGORY_FILTER_TABS, 'all');
  const rawPage = Number(searchParams.get('page'));
  const currentPage = Number.isInteger(rawPage) && rawPage >= 1 ? rawPage : 1;

  function updateParam(key: string, value: string, resetPage = false) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    if (resetPage) params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function handleSearch(value: string) {
    const params = new URLSearchParams();
    if (value) params.set('keyword', value);
    params.set('page', '1');
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
        onSearch={handleSearch}
      />
      {!keyword && (
        <CommunityFilter
          categoryTabs={BOARD_CATEGORY_FILTER_TABS}
          category={category}
          onCategoryChange={(value) => updateParam('category', value, true)}
        />
      )}
      {keyword ? (
        <BoardSearchContent
          keyword={keyword}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      ) : (
        <BoardListContent
          category={category}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </section>
  );
}
