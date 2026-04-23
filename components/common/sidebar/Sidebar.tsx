'use client';

import { useState } from 'react';
import SidebarTab from './SidebarTab';

const TOP_TABS = ['모아방', '자유게시판'];
const BOTTOM_TABS = ['내 활동 글', '작성한 댓글', '보관함']; //임시

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState('모아방');

  return (
    <aside
      className="h-screen w-89.25 overflow-hidden border-r border-black-400"
      aria-label="사이드 내비게이션"
    >
      <div className="flex h-full flex-col justify-between">
        <nav aria-label="메인 메뉴">
          <ul className="mt-15 ml-20 flex flex-col">
            {TOP_TABS.map((tab) => (
              <li key={tab}>
                <SidebarTab
                  label={tab}
                  isActive={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                />
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="내 활동 메뉴">
          <ul className="mb-39.25 ml-20 flex flex-col">
            {BOTTOM_TABS.map((tab) => (
              <li key={tab}>
                <SidebarTab
                  label={tab}
                  isActive={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
