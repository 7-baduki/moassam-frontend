'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils/cn';
import { ChevronDownIcon } from '@/app/assets/icons';
import { DefaultAvatar } from '@/app/assets/images';
import { useUser } from '@/lib/user-context';
import { useLoginModalStore } from '@/stores/loginModalStore';
import { Button } from '@/components/common/button/Button';

interface NavMenuProps {
  isOpen: boolean;
  onLogout: () => void;
}

const NAV_SECTIONS = [
  {
    href: '/observations',
    label: 'AI 관찰일지',
    children: [
      { label: '새 관찰일지', href: '/observations' },
      { label: '관찰일지 목록 보기', href: '/mypage/observations' },
    ],
  },
  {
    href: '/community',
    label: '커뮤니티',
    children: [
      { label: '모아방', href: '/community/moabang' },
      { label: '자유게시판', href: '/community/board' },
    ],
  },
];

export default function NavMenu({ isOpen, onLogout }: NavMenuProps) {
  const pathname = usePathname() ?? '';
  const user = useUser();
  const openLoginModal = useLoginModalStore((state) => state.open);

  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      NAV_SECTIONS.map((s) => [s.href, pathname === s.href || pathname.startsWith(s.href + '/')]),
    ),
  );

  const toggleSection = (href: string) => {
    setOpenSections((prev) => ({ ...prev, [href]: !prev[href] }));
  };

  return (
    <div
      className={cn(
        'absolute top-12 left-0 z-400 w-full overflow-hidden bg-white shadow-md transition-all duration-300 xl:hidden',
        isOpen ? 'max-h-[calc(100vh-3rem)]' : 'max-h-0',
      )}
      aria-hidden={!isOpen}
    >
      <nav className="flex min-h-[calc(100vh-3rem)] flex-col justify-between">
        <div>
          {NAV_SECTIONS.map((section) => {
            const isSectionActive =
              pathname === section.href || pathname.startsWith(section.href + '/');
            const isSectionOpen = openSections[section.href];

            return (
              <div key={section.href}>
                <button
                  onClick={() => toggleSection(section.href)}
                  className="flex w-full items-center justify-between px-4 py-3.75 text-base font-medium md:px-9"
                >
                  <span
                    className={cn(isSectionActive ? 'font-semibold text-pink-500' : 'text-black')}
                  >
                    {section.label}
                  </span>
                  <ChevronDownIcon
                    className={cn(
                      'h-4 w-4 text-black transition-transform',
                      isSectionOpen ? '-rotate-180' : 'rotate-0',
                    )}
                  />
                </button>

                {isSectionOpen && (
                  <ul className="flex flex-col pb-2">
                    {section.children.map((child) => {
                      const isActive = pathname === child.href;
                      return (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={cn(
                              'block px-8 py-3 text-sm leading-[140%] tracking-[-0.02em]',
                              isActive ? 'font-semibold text-pink-500' : 'font-medium text-black',
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
          })}
        </div>

        <div>
          {user ? (
            <>
              <Link
                href="/mypage/dashboard"
                className="flex items-center gap-5 px-4 py-[18.5px] md:px-9"
              >
                <div className="h-12.5 w-12.5 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={user.profileImageUrl || DefaultAvatar}
                    alt="프로필 아바타"
                    width={50}
                    height={50}
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <span className="text-sm font-semibold text-black">{user.nickname} 선생님</span>
                  <span className="truncate text-xs font-medium text-black-600">{user.email}</span>
                </div>
                <ChevronDownIcon className="h-4 w-4 shrink-0 -rotate-90 text-black" />
              </Link>
              <div className="flex justify-end bg-black-100 py-4 pr-4 md:pr-9">
                <button onClick={onLogout} className="text-xs text-black-500">
                  로그아웃
                </button>
              </div>
            </>
          ) : (
            <div className="px-4 py-11.75">
              <Button
                variant="primary"
                size="full"
                className="py-4"
                onClick={() => openLoginModal()}
              >
                로그인
              </Button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
