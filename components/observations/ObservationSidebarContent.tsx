'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PlusIcon } from '@/app/assets/icons';
import { useObservationListQuery } from '@/hooks/queries/observations/useObservation';

export default function ObservationSidebarContent() {
  const pathname = usePathname();
  const isCreatePage = pathname === '/observations';
  const bottomRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useObservationListQuery();

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
    <div className="flex flex-col overflow-y-auto pt-20 pl-20">
      <Link
        href="/observations"
        className={`flex items-center gap-1 py-3 pl-5 text-sm hover:rounded-lg hover:bg-black-200 ${isCreatePage ? 'rounded-l-lg rounded-r-[40px] bg-pink-50 font-semibold text-pink-500' : 'font-semibold text-black'}`}
      >
        <PlusIcon />
        <span>새 관찰일지</span>
      </Link>

      <p className="py-3 pl-5 text-sm font-semibold text-black">최근 생성 일지</p>

      <nav aria-label="관찰일지 목록">
        <ul className="flex flex-col">
          {logs.map((log) => {
            const isDetailPage = pathname === `/observations/${log.observationId}`;
            return (
              <li key={log.observationId}>
                <Link
                  href={`/observations/${log.observationId}`}
                  className={`block truncate px-5 py-3 text-sm hover:rounded-lg hover:bg-black-200 ${isDetailPage ? 'rounded-l-lg rounded-r-[40px] bg-pink-50 font-semibold text-pink-500' : 'font-medium text-black-700'}`}
                >
                  {log.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div ref={bottomRef} className="h-1" />
    </div>
  );
}
