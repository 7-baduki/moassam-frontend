'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import NAV_ITEMS from '@/constants/common/nav-items';
import NavMenu from '@/components/common/nav-menu/NavMenu';

export function HeaderNavLinks() {
  const pathname = usePathname() ?? '';

  return (
    <nav
      aria-label="주요 메뉴"
      className="hidden items-center gap-8.5 text-base leading-[140%] font-medium tracking-[-0.02em] xl:flex"
    >
      {NAV_ITEMS.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={
            pathname === href || pathname.startsWith(href + '/')
              ? 'font-semibold text-pink-500'
              : ''
          }
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}

export function HeaderNavMenu({
  isOpen,
  onClose,
  onLogout,
}: {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}) {
  const pathname = usePathname() ?? '';

  return <NavMenu key={pathname} isOpen={isOpen} onClose={onClose} onLogout={onLogout} />;
}
