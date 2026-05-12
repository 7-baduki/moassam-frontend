'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/common/button/Button';
import { MainLogoIcon } from '@/app/assets/icons';
import { DefaultAvatar } from '@/app/assets/images';
import { useLoginModalStore } from '@/stores/loginModalStore';
import { useUserStore } from '@/stores/userStore';
import { ProfilePopover } from '@/components/common/profile-popover/ProfilePopover';
import NAV_ITEMS from '@/constants/common/nav-items';
import { useLogoutMutation } from '@/hooks/queries/auth/useAuth';
import { useUser } from '@/lib/user-context';

export default function Header() {
  const openLoginModal = useLoginModalStore((state) => state.open);
  const user = useUser();
  const clearUser = useUserStore((state) => state.clearUser);
  const pathname = usePathname() ?? '';
  const router = useRouter();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const { mutate: handleLogout } = useLogoutMutation({
    onSuccess: () => {
      clearUser();
      setIsPopoverOpen(false);
      router.push('/');
      router.refresh();
    },
  });

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
    </header>
  );
}
