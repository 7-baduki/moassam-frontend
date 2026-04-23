'use client';

import { useState } from 'react';
import SidebarTab from './SidebarTab';

const TOP_TABS = ['모아방', '자유게시판'];
const BOTTOM_TABS = ['내 활동 글', '작성한 댓글', '보관함']; //임시

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState('모아방');

  return (
    <aside className="h-screen w-89.25 border-r border-black-400">
      <div className="flex h-full flex-col justify-between">
        <div className="mt-15 ml-20 flex flex-col">
          {TOP_TABS.map((tab) => (
            <SidebarTab
              key={tab}
              label={tab}
              isActive={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            />
          ))}
        </div>
        <div className="mb-15 ml-20 flex flex-col">
          {BOTTOM_TABS.map((tab) => (
            <SidebarTab
              key={tab}
              label={tab}
              isActive={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
