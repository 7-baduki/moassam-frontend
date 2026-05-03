'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/common/button/Button';
import { MainLogoIcon, ProfileIcon } from '@/app/assets/icons';
import { useLoginModalStore } from '@/stores/loginModalStore';
import NAV_ITEMS from '@/constants/common/nav-items';

interface HeaderProps {
  isLoggedIn?: boolean;
}

export default function Header({ isLoggedIn = false }: HeaderProps) {
  const openLoginModal = useLoginModalStore((state) => state.open);
  const pathname = usePathname() ?? '';
  return (
    <header className="flex h-16 items-center justify-between border-b border-black-200 px-20">
      <div className="flex items-center gap-8.5">
        <Link href="/" aria-label="모아쌤 홈으로 이동">
          <MainLogoIcon aria-hidden="true" />
        </Link>
        <nav
          aria-label="주요 메뉴"
          className="flex items-center gap-8.5 text-base leading-[140%] font-medium tracking-[-0.02em]"
        >
          {NAV_ITEMS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={pathname.startsWith(href) ? 'font-semibold text-pink-500' : ''}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-5">
        {isLoggedIn ? (
          <>
            <ProfileIcon className="cursor-pointer" />
          </>
        ) : (
          <Button variant="outline" size="sm" onClick={() => openLoginModal()}>
            로그인
          </Button>
        )}
      </div>
    </header>
  );
}
