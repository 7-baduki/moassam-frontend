'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDownIcon } from '@/app/assets/icons';
import { cn } from '@/utils/cn';
import type { SidebarTabItem } from '@/constants/common/sidebar-config';

interface SidebarTabProps {
  tab: SidebarTabItem;
  isActive: boolean;
  isChildActive: boolean;
}

export default function SidebarTab({ tab, isActive, isChildActive }: SidebarTabProps) {
  const pathname = usePathname() ?? '';
  const hasChildren = !!tab.children?.length;
  const [isOpen, setIsOpen] = useState(isChildActive);

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className={cn(
            'flex w-full items-center gap-2 rounded-[8px_40px_40px_8px] py-3 pl-5 text-sm leading-[140%] tracking-[-0.02em] transition-colors',
            isChildActive
              ? 'font-semibold text-pink-500'
              : 'font-medium text-black-700 hover:bg-black-200',
          )}
        >
          <ChevronDownIcon
            className={cn('h-4 w-4 transition-transform', !isOpen && '-rotate-90')}
          />
          {tab.label}
        </button>
        {isOpen && (
          <ul className="flex flex-col">
            {(tab.children ?? []).map((child) => {
              const isChildItemActive = pathname === child.href;
              return (
                <li key={child.href}>
                  <Link
                    href={child.href}
                    aria-current={isChildItemActive ? 'page' : undefined}
                    className={cn(
                      'block rounded-[8px_40px_40px_8px] py-3 pl-5 text-sm leading-[140%] tracking-[-0.02em] transition-colors',
                      isChildItemActive
                        ? 'bg-pink-50 font-semibold text-pink-500'
                        : 'font-medium text-black-700 hover:bg-black-200',
                    )}
                  >
                    {child.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }

  return (
    <Link
      href={tab.href!}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'block rounded-[8px_40px_40px_8px] py-3 pl-5 text-sm leading-[140%] tracking-[-0.02em] transition-colors',
        isActive
          ? 'bg-pink-50 font-semibold text-pink-500'
          : 'font-medium text-black-700 hover:bg-black-200',
      )}
    >
      {tab.label}
    </Link>
  );
}
