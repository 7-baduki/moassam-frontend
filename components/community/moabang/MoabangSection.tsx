'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import MoabangCard from './MoabangCard';
import CommunityTitleBar from '@/components/community/CommunityTitleBar';
import CommunityFilter from '@/components/community/CommunityFilter';
import Pagination from '@/components/common/pagination/Pagination';
import {
  MOABANG_AGE_FILTER_TABS,
  MOABANG_CATEGORY_FILTER_TABS,
} from '@/constants/community/community-tabs';
import { useMoabangPostsQuery } from '@/hooks/queries/community/useCommunity';
import { EmptyState } from '@/components/common/empty-state/EmptyState';
import type { PostAge, ResourceType } from './moabang.type';

function getValidParam<T extends { value: string }>(
  raw: string | null,
  options: T[],
  fallback: string,
): string {
  if (raw && options.some((o) => o.value === raw)) return raw;
  return fallback;
}

export default function MoabangSection() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const age = getValidParam(searchParams.get('age'), MOABANG_AGE_FILTER_TABS, 'all');
  const category = getValidParam(searchParams.get('category'), MOABANG_CATEGORY_FILTER_TABS, 'all');
  const rawPage = Number(searchParams.get('page'));
  const currentPage = Number.isInteger(rawPage) && rawPage >= 1 ? rawPage : 1;

  const { data } = useMoabangPostsQuery({
    postAge: age !== 'all' ? (age as PostAge) : undefined,
    resourceType: category !== 'all' ? (category as ResourceType) : undefined,
    page: currentPage - 1,
    size: 9,
  });

  const totalPages = Math.max(1, data.totalPages);

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
      <CommunityTitleBar
        title="모아방"
        onWrite={() => router.push('/community/write?board=moabang')}
      />
      <CommunityFilter
        ageTabs={MOABANG_AGE_FILTER_TABS}
        age={age}
        onAgeChange={(value) => updateParam('age', value, true)}
        categoryTabs={MOABANG_CATEGORY_FILTER_TABS}
        category={category}
        onCategoryChange={(value) => updateParam('category', value, true)}
      />
      {data.data.length === 0 ? (
        <div className="flex flex-1 items-center justify-center pt-20">
          <EmptyState message="아직 등록된 게시글이 없어요" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-5">
            {data.data.map((post) => (
              <MoabangCard key={post.postId} post={post} />
            ))}
          </div>
          <div className="mt-15 flex justify-center">
            <Pagination currentPage={currentPage} totalPages={totalPages} onChange={handlePageChange} />
          </div>
        </>
      )}
    </section>
  );
}
