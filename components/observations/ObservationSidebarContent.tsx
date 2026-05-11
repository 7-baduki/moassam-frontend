'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { PlusIcon } from '@/app/assets/icons';
import { MoreButton } from '@/components/common/more-button/MoreButton';
import {
  useObservationDeleteMutation,
  useObservationListQuery,
} from '@/hooks/queries/observations/useObservation';
import { toast } from '@/utils/toast';

export default function ObservationSidebarContent() {
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();
  const isCreatePage = pathname === '/observations';
  const bottomRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useObservationListQuery();
  const { mutate: deleteObservation } = useObservationDeleteMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['observations'] });
      toast.success({
        title: '관찰일지 삭제가 완료되었어요',
        description: '삭제된 관찰일지는 복구할 수 없어요',
      });
      router.push('/observations');
    },
    onError: () => {
      toast.error({
        title: '관찰일지 삭제에 실패했어요',
        description: '잠시 후 다시 시도해주세요',
      });
    },
  });

  const logs = data?.pages.flatMap((page) => page.items) ?? [];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    if (bottomRef.current) observer.observe(bottomRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="flex h-full flex-col pt-20 pl-20">
      <Link
        href="/observations"
        className={`flex items-center gap-1 py-3 pl-5 text-sm hover:rounded-lg hover:bg-black-200 ${isCreatePage ? 'rounded-l-lg rounded-r-[40px] bg-pink-50 font-semibold text-pink-500' : 'font-semibold text-black'}`}
      >
        <PlusIcon />
        <span>새 관찰일지</span>
      </Link>

      <p className="py-3 pl-5 text-sm font-semibold text-black">최근 생성 일지</p>

      <nav aria-label="관찰일지 목록" className="min-h-0 flex-1 overflow-y-auto">
        <ul className="flex flex-col">
          {logs.map((log) => {
            const isDetailPage = pathname === `/observations/${log.observationId}`;
            return (
              <li key={log.observationId} className="group relative flex items-center">
                <Link
                  href={`/observations/${log.observationId}`}
                  className={`flex-1 truncate py-3 pr-8 pl-5 text-sm hover:rounded-lg hover:bg-black-200 ${isDetailPage ? 'rounded-l-lg rounded-r-[40px] bg-pink-50 font-semibold text-pink-500' : 'font-medium text-black-700'}`}
                >
                  {log.title}
                </Link>
                <MoreButton
                  onDelete={() => deleteObservation(log.observationId)}
                  className="invisible absolute top-1/2 right-2.5 -translate-y-1/2 group-hover:visible"
                />
              </li>
            );
          })}
        </ul>
        <div ref={bottomRef} className="h-1" />
      </nav>
    </div>
  );
}
