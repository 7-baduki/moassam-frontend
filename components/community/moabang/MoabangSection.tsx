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
import {
  useMoabangPostsQuery,
  useMoabangSearchQuery,
} from '@/hooks/queries/community/useCommunity';
import { EmptyState } from '@/components/common/empty-state/EmptyState';
import { getValidParam } from '@/utils/getValidParam';
import type { PostAge, ResourceType, MoabangPost } from './moabang.type';

function PostGrid({ data }: { data: { data: MoabangPost[]; totalPages: number } }) {
  return data.data.length === 0 ? (
    <div className="flex flex-1 items-center justify-center pt-20">
      <EmptyState message="아직 등록된 게시글이 없어요" />
    </div>
  ) : (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 xl:grid-cols-3 xl:gap-5">
      {data.data.map((post) => (
        <MoabangCard key={post.postId} post={post} />
      ))}
    </div>
  );
}

function MoabangListContent({
  age,
  category,
  currentPage,
  onPageChange,
}: {
  age: string;
  category: string;
  currentPage: number;
  onPageChange: (page: number) => void;
}) {
  const { data } = useMoabangPostsQuery({
    postAge: age !== 'all' ? (age as PostAge) : undefined,
    resourceType: category !== 'all' ? (category as ResourceType) : undefined,
    page: currentPage - 1,
    size: 9,
  });

  return (
    <>
      <PostGrid data={data} />
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

function MoabangSearchContent({
  keyword,
  currentPage,
  onPageChange,
}: {
  keyword: string;
  currentPage: number;
  onPageChange: (page: number) => void;
}) {
  const { data } = useMoabangSearchQuery({ keyword, page: currentPage - 1, size: 9 });

  return (
    <>
      <PostGrid data={data} />
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

export default function MoabangSection() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const keyword = searchParams.get('keyword') ?? '';
  const age = getValidParam(searchParams.get('age'), MOABANG_AGE_FILTER_TABS, 'all');
  const category = getValidParam(searchParams.get('category'), MOABANG_CATEGORY_FILTER_TABS, 'all');
  const rawPage = Number(searchParams.get('page'));
  const currentPage = Number.isInteger(rawPage) && rawPage >= 1 ? rawPage : 1;

  function updateParam(key: string, value: string, resetPage = false) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    if (resetPage) params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`, { scroll: true });
  }

  function handleSearch(value: string) {
    const params = new URLSearchParams();
    if (value) params.set('keyword', value);
    params.set('page', '1');
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
        onSearch={handleSearch}
      />
      {!keyword && (
        <CommunityFilter
          ageTabs={MOABANG_AGE_FILTER_TABS}
          age={age}
          onAgeChange={(value) => updateParam('age', value, true)}
          categoryTabs={MOABANG_CATEGORY_FILTER_TABS}
          category={category}
          onCategoryChange={(value) => updateParam('category', value, true)}
        />
      )}
      {keyword ? (
        <MoabangSearchContent
          keyword={keyword}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      ) : (
        <MoabangListContent
          age={age}
          category={category}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </section>
  );
}
