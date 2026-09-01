'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/common/button/Button';
import { MainLogoIcon, XIcon, HamburgerIcon } from '@/app/assets/icons';
import { DefaultAvatar } from '@/app/assets/images';
import { useLoginModalStore } from '@/stores/loginModalStore';
import { ProfilePopover } from '@/components/common/profile-popover/ProfilePopover';
import { useLogoutMutation } from '@/hooks/queries/auth/useAuth';
import { useUserStore } from '@/stores/userStore';
import { toast } from '@/utils/toast';
import { HeaderNavLinks, HeaderNavMenu } from './HeaderNav';

export default function Header() {
  const openLoginModal = useLoginModalStore((state) => state.open);
  const user = useUserStore((state) => state.user);
  const router = useRouter();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const observer = new ResizeObserver(() => {
      document.documentElement.style.setProperty(
        '--header-height',
        `${header.getBoundingClientRect().height}px`,
      );
    });

    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  const { mutate: handleLogout } = useLogoutMutation({
    onSuccess: () => {
      setIsPopoverOpen(false);
      toast.success({ title: '로그아웃 완료', description: '안전하게 로그아웃되었어요.' });
      router.push('/');
      router.refresh();
    },
    onError: () => {
      toast.error({ title: '로그아웃에 실패했어요. 다시 시도해주세요.' });
    },
  });

  return (
    <header
      ref={headerRef}
      className="relative flex h-12 items-center justify-between border-b border-black-200 bg-white px-4 pt-[env(safe-area-inset-top)] md:px-9 xl:h-16 xl:px-20"
    >
      <div className="flex items-center gap-8.5">
        <Link href="/" aria-label="모아쌤 홈으로 이동" onClick={() => setIsNavMenuOpen(false)}>
          <MainLogoIcon className="h-7 w-7 xl:h-10 xl:w-10" aria-hidden="true" />
        </Link>
        <Suspense fallback={null}>
          <HeaderNavLinks />
        </Suspense>
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
                  email={user.email}
                  provider={user.provider}
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
      <Suspense fallback={null}>
        <HeaderNavMenu
          isOpen={isNavMenuOpen}
          onClose={() => setIsNavMenuOpen(false)}
          onLogout={handleLogout}
        />
      </Suspense>
    </header>
  );
}
