'use client';

import { usePathname } from 'next/navigation';
import SidebarTab from './SidebarTab';

const TOP_TABS = [
  { label: '모아방', href: '/community/moabang' },
  { label: '자유게시판', href: '/community/board' },
];

const BOTTOM_TABS = [
  { label: '내 활동 글', href: '/my/posts' },
  { label: '작성한 댓글', href: '/my/comments' },
  { label: '보관함', href: '/my/saved' },
]; //임시

export default function Sidebar() {
  const pathname = usePathname() ?? '';

  return (
    <aside className="h-full w-89.25 border-r border-black-200" aria-label="사이드 내비게이션">
      <div className="flex h-full flex-col justify-between">
        <nav aria-label="메인 메뉴">
          <ul className="mt-15 ml-20 flex flex-col">
            {TOP_TABS.map((tab) => (
              <li key={tab.href}>
                <SidebarTab
                  label={tab.label}
                  href={tab.href}
                  isActive={
                    pathname === tab.href || (tab.href !== '/' && pathname.startsWith(tab.href))
                  }
                />
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="내 활동 메뉴">
          <ul className="mb-39.25 ml-20 flex flex-col">
            {BOTTOM_TABS.map((tab) => (
              <li key={tab.href}>
                <SidebarTab
                  label={tab.label}
                  href={tab.href}
                  isActive={
                    pathname === tab.href || (tab.href !== '/' && pathname.startsWith(tab.href))
                  }
                />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
