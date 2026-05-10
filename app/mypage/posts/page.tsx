'use client';

import { useState } from 'react';
import Link from 'next/link';
import Pagination from '@/components/common/pagination/Pagination';
import Tabs, { TabOption } from '@/components/common/tabs/Tabs';
import { ViewCountIcon } from '@/app/assets/icons';

const TAB_OPTIONS: TabOption[] = [
  { label: '모아방', value: 'moabang' },
  { label: '자유게시판', value: 'board' },
];

const MOCK_POSTS = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: `게시글 제목 ${i + 1}`,
  createdAt: '2026.03.06',
  viewCount: 56,
}));

const TOTAL_PAGES = 10;

export default function PostsPage() {
  const [currentPage, setCurrentPage] = useState(1);
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
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="flex flex-col gap-3">
        {MOCK_POSTS.map((post) => (
          <Link
            key={post.id}
            href={`/community/${activeTab === 'moabang' ? 'moabang' : 'board'}/${post.id}`}
            className="flex items-center rounded-[10px] bg-white px-5 py-3 transition-colors hover:bg-black-200"
          >
            <span className="min-w-0 flex-1 truncate text-sm font-medium text-black-800">
              {post.title}
            </span>
            <div className="flex items-center gap-5 pl-10 text-xs font-medium text-black-500">
              <span>{post.createdAt}</span>
              <span className="flex items-center gap-1">
                <ViewCountIcon />
                {post.viewCount}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center pt-12">
        <Pagination currentPage={currentPage} totalPages={TOTAL_PAGES} onChange={setCurrentPage} />
      </div>
    </div>
  );
}
