'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import BoardCard from './BoardCard';
import CommunityTitleBar from '@/components/community/CommunityTitleBar';
import CommunityFilter from '@/components/community/CommunityFilter';
import Pagination from '@/components/common/pagination/Pagination';
import type { BoardPost } from './board.type';
import { BOARD_CATEGORY_FILTER_TABS } from '@/components/community/COMMUNITY_TABS';

const PAGE_SIZE = 8;

function getValidParam<T extends { value: string }>(
  raw: string | null,
  options: T[],
  fallback: string,
): string {
  if (raw && options.some((o) => o.value === raw)) return raw;
  return fallback;
}

const MOCK_POSTS: BoardPost[] = Array.from({ length: 80 }, (_, i) => ({
  postId: i + 1,
  categoryName: '고민',
  title: '자유놀이 시간마다 자꾸 같은 놀잇감만 찾는 아이들, 어떻게 도와주시나요?',
  contentPreview:
    '한 가지 놀잇감에만 입몰하는 건 좋은데 다른 활동으로는 잘 확장이 안 돼서요. 억지로 바꾸게 하기보다 자연스럽게 관심을 넓혀주고 싶은데 비슷한 경우 어떻게 하시는지 궁금합니다.',
  authorName: '햇살선생님',
  likeCount: 46,
  commentCount: 119,
  viewCount: 1230,
  createdAt: '3시간 전',
}));

export default function BoardSection() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const category = getValidParam(searchParams.get('category'), BOARD_CATEGORY_FILTER_TABS, 'all');

  const totalPages = Math.max(1, Math.ceil(MOCK_POSTS.length / PAGE_SIZE));
  const rawPage = Number(searchParams.get('page'));
  const currentPage = Number.isInteger(rawPage) && rawPage >= 1 ? Math.min(rawPage, totalPages) : 1;

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const visiblePosts = MOCK_POSTS.slice(startIndex, startIndex + PAGE_SIZE);

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
      <CommunityTitleBar title="자유게시판" description="자유롭게 이야기를 나누는 공간입니다" />
      <CommunityFilter
        categoryTabs={BOARD_CATEGORY_FILTER_TABS}
        category={category}
        onCategoryChange={(value) => updateParam('category', value, true)}
      />
      <div className="grid grid-cols-2 gap-5">
        {visiblePosts.map((post) => (
          <BoardCard key={post.postId} post={post} />
        ))}
      </div>
      <div className="flex justify-center">
        <Pagination currentPage={currentPage} totalPages={totalPages} onChange={handlePageChange} />
      </div>
    </section>
  );
}
