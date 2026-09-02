'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils/cn';

const LEGAL_TABS = [
  { label: '개인정보처리방침', href: '/privacy' },
  { label: '이용약관', href: '/terms' },
];

export default function LegalTabs() {
  const pathname = usePathname();

  return (
    <div className="flex h-10 items-stretch gap-3 overflow-x-auto rounded-lg bg-black-200 px-5 [scrollbar-width:none] md:gap-5 [&::-webkit-scrollbar]:hidden">
      {LEGAL_TABS.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          aria-current={pathname === tab.href ? 'page' : undefined}
          className={cn(
            'flex h-full items-center border-b-2 text-[13px] whitespace-nowrap transition-colors md:text-sm',
            pathname === tab.href
              ? 'border-pink-500 font-semibold text-pink-500'
              : 'border-transparent font-medium text-black-700',
          )}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
