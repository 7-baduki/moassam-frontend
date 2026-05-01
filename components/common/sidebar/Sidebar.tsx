'use client';

import { usePathname } from 'next/navigation';
import { getSidebarConfig } from '@/constants/community/sidebar-config';
import SidebarTab from './SidebarTab';

export default function Sidebar() {
  const pathname = usePathname() ?? '';
  const sidebarConfig = getSidebarConfig(pathname);

  if (!sidebarConfig.visible) {
    return null;
  }

  return (
    <aside className="h-full w-89.25 border-r border-black-200" aria-label="사이드 내비게이션">
      <div className="flex h-full flex-col justify-between">
        {sidebarConfig.sections.map((section) => (
          <nav key={section.ariaLabel} aria-label={section.ariaLabel}>
            <ul className={`${section.className} flex flex-col`}>
              {section.tabs.map((tab) => (
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
        ))}
      </div>
    </aside>
  );
}
