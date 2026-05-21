'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDownIcon } from '@/app/assets/icons';
import Tabs, { TabOption } from '@/components/common/tabs/Tabs';
import { AsyncBoundary, LoadingSpinner, ErrorFallback } from '@/lib/async-boundary';
import MoabangPostList from './MoabangPostList';
import FreePostList from './FreePostList';

const TAB_OPTIONS: TabOption[] = [
  { label: '모아방', value: 'moabang' },
  { label: '자유게시판', value: 'free' },
];

export default function PostsBoundary() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const [activeTab, setActiveTab] = useState('moabang');

  return (
    <div className="flex flex-col gap-2 xl:gap-3">
      <div className="flex items-center gap-4 px-4 pt-4 md:px-9 md:pt-9 xl:hidden">
        <button type="button" onClick={() => router.back()} aria-label="뒤로가기">
          <ChevronDownIcon className="h-5 w-5 rotate-90 text-black" />
        </button>
        <h1 className="py-2 text-base font-semibold text-black md:text-[18px]">게시글</h1>
      </div>
      <h1 className="hidden text-lg font-semibold text-black xl:block xl:pt-[10.5px]">게시글</h1>

      <div className="mx-4 flex h-10 items-stretch rounded-lg bg-black-200 px-5 md:mx-9 xl:mx-0">
        <Tabs
          options={TAB_OPTIONS}
          value={activeTab}
          onChange={(v) => {
            setActiveTab(v);
            setCurrentPage(0);
          }}
        />
      </div>

      {activeTab === 'moabang' ? (
        <AsyncBoundary
          pendingFallback={<LoadingSpinner className="pt-11.25" />}
          rejectedFallback={({ error, reset }) => (
            <ErrorFallback
              error={error}
              actionLabel="다시 시도"
              onAction={reset}
              className="pt-7.5"
            />
          )}
        >
          <MoabangPostList currentPage={currentPage} onPageChange={setCurrentPage} />
        </AsyncBoundary>
      ) : (
        <AsyncBoundary
          pendingFallback={<LoadingSpinner className="pt-11.25" />}
          rejectedFallback={({ error, reset }) => (
            <ErrorFallback
              error={error}
              actionLabel="다시 시도"
              onAction={reset}
              className="pt-7.5"
            />
          )}
        >
          <FreePostList currentPage={currentPage} onPageChange={setCurrentPage} />
        </AsyncBoundary>
      )}
    </div>
  );
}
