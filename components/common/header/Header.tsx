'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/common/button/Button';
import { MainLogoIcon, XIcon, HamburgerIcon } from '@/app/assets/icons';
import { DefaultAvatar } from '@/app/assets/images';
import { useLoginModalStore } from '@/stores/loginModalStore';
import { ProfilePopover } from '@/components/common/profile-popover/ProfilePopover';
import NAV_ITEMS from '@/constants/common/nav-items';
import { useLogoutMutation } from '@/hooks/queries/auth/useAuth';
import { useUser } from '@/lib/user-context';
import NavMenu from '@/components/common/nav-menu/NavMenu';

export default function Header() {
  const openLoginModal = useLoginModalStore((state) => state.open);
  const user = useUser();
  const pathname = usePathname() ?? '';
  const router = useRouter();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);

  const { mutate: handleLogout } = useLogoutMutation({
    onSuccess: () => {
      setIsPopoverOpen(false);
      router.push('/');
      router.refresh();
    },
  });

  return (
    <header className="relative z-300 flex h-12 items-center justify-between border-b border-black-200 bg-white px-4 md:px-9 xl:h-16 xl:px-20">
      <div className="flex items-center gap-8.5">
        <Link href="/" aria-label="모아쌤 홈으로 이동">
          <MainLogoIcon className="h-7 w-7 xl:h-10 xl:w-10" aria-hidden="true" />
        </Link>
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
      </div>
      <div className="relative flex items-center gap-5">
        <button
          className="xl:hidden"
          onClick={() => setIsNavMenuOpen((prev) => !prev)}
          aria-label={isNavMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={isNavMenuOpen}
        >
          {isNavMenuOpen ? (
            <XIcon className="h-7 w-7 md:h-8 md:w-8" />
          ) : (
            <HamburgerIcon className="h-7 w-7 md:h-8 md:w-8" />
          )}
        </button>
        <div className="hidden md:items-center md:gap-5 xl:flex">
          {user ? (
            <>
              <button
                className="h-9 w-9 cursor-pointer overflow-hidden rounded-full"
                onClick={() => setIsPopoverOpen((prev) => !prev)}
                aria-label="프로필 팝오버 열기"
              >
                <Image
                  src={user.profileImageUrl || DefaultAvatar}
                  alt="프로필 아바타"
                  width={36}
                  height={36}
                />
              </button>
              {isPopoverOpen && (
                <ProfilePopover
                  name={user.nickname}
                  avatarSrc={user.profileImageUrl || DefaultAvatar}
                  onClose={() => setIsPopoverOpen(false)}
                  onLogout={handleLogout}
                />
              )}
            </>
          ) : (
            <Button variant="outline" size="sm" onClick={() => openLoginModal()}>
              로그인
            </Button>
          )}
        </div>
      </div>
      <NavMenu
        key={pathname}
        isOpen={isNavMenuOpen}
        onClose={() => setIsNavMenuOpen(false)}
        onLogout={handleLogout}
      />
    </header>
  );
}
