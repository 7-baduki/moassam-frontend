'use client';

import { useState } from 'react';
import Tabs, { TabOption } from '@/components/common/tabs/Tabs';
import { AsyncBoundary, LoadingSpinner, ErrorFallback } from '@/lib/async-boundary';
import MoabangPostList from './MoabangPostList';
import FreePostList from './FreePostList';

const TAB_OPTIONS: TabOption[] = [
  { label: '모아방', value: 'moabang' },
  { label: '자유게시판', value: 'free' },
];

export default function PostsBoundary() {
  const [currentPage, setCurrentPage] = useState(0);
  const [activeTab, setActiveTab] = useState('moabang');

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-lg font-semibold text-black">게시글</h1>

      <div className="flex h-10 items-stretch rounded-lg bg-black-200 px-5">
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
