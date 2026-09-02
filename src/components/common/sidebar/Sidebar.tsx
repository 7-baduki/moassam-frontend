'use client';

import { usePathname } from 'next/navigation';
import { getSidebarConfig } from '@/utils/sidebar';
import SidebarTab from './SidebarTab';

function isTabActive(pathname: string, href?: string) {
  if (!href) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

function isChildTabActive(pathname: string, children?: { href: string }[]) {
  return !!children?.some((child) => pathname === child.href);
}

export default function Sidebar() {
  const pathname = usePathname() ?? '';
  const sidebarConfig = getSidebarConfig(pathname);

  if (!sidebarConfig.visible) {
    return null;
  }

  return (
    <aside
      className="hidden h-full w-89.25 border-r border-black-200 xl:block"
      aria-label="사이드 내비게이션"
    >
      <div className="flex h-full flex-col justify-between">
        {sidebarConfig.sections.map((section) => (
          <nav key={section.ariaLabel} aria-label={section.ariaLabel}>
            <ul className="mt-15 ml-20 flex flex-col">
              {section.tabs.map((tab, index) => (
                <li key={tab.href ?? index}>
                  <SidebarTab
                    tab={tab}
                    isActive={isTabActive(pathname, tab.href)}
                    isChildActive={isChildTabActive(pathname, tab.children)}
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
