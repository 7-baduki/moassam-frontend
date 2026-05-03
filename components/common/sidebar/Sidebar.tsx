'use client';

import { usePathname } from 'next/navigation';
import { getSidebarConfig } from '@/utils/sidebar';
import SidebarTab from './SidebarTab';

function isSidebarTabActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

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
            <ul className="mt-15 ml-20 flex flex-col">
              {section.tabs.map((tab) => (
                <li key={tab.href}>
                  <SidebarTab
                    label={tab.label}
                    href={tab.href}
                    isActive={isSidebarTabActive(pathname, tab.href)}
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
