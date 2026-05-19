'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils/cn';
import { ChevronDownIcon, PlusIcon } from '@/app/assets/icons';
import { DefaultAvatar } from '@/app/assets/images';
import { useUser } from '@/lib/user-context';
import { useLoginModalStore } from '@/stores/loginModalStore';
import { Button } from '@/components/common/button/Button';
import {
  useObservationRecentQuery,
  useObservationDeleteMutation,
} from '@/hooks/queries/observations/useObservation';
import { useQueryClient } from '@tanstack/react-query';
import { MoreButton } from '@/components/common/more-button/MoreButton';

interface NavMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const COMMUNITY_SECTION = {
  href: '/community',
  label: '커뮤니티',
  children: [
    { label: '모아방', href: '/community/moabang' },
    { label: '자유게시판', href: '/community/board' },
  ],
};

const NAV_SECTIONS = [{ href: '/observations', label: 'AI 관찰일지' }, COMMUNITY_SECTION];

export default function NavMenu({ isOpen, onClose, onLogout }: NavMenuProps) {
  const pathname = usePathname() ?? '';
  const user = useUser();
  const openLoginModal = useLoginModalStore((state) => state.open);
  const queryClient = useQueryClient();

  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      NAV_SECTIONS.map((s) => [s.href, pathname === s.href || pathname.startsWith(s.href + '/')]),
    ),
  );

  const toggleSection = (href: string) => {
    setOpenSections((prev) => ({ ...prev, [href]: !prev[href] }));
  };

  const { mutate: deleteObservation } = useObservationDeleteMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['observations', 'recent'] });
      queryClient.invalidateQueries({ queryKey: ['myObservations'] });
    },
  });

  const { data: recentObservations } = useObservationRecentQuery(!!user);

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
            const isSectionOpen = openSections[section.href];
            const isObservation = section.href === '/observations';

            return (
              <div key={section.href}>
                <button
                  onClick={() => toggleSection(section.href)}
                  className="flex w-full items-center justify-between py-3.75 pr-6 pl-4 text-base font-semibold md:px-9"
                >
                  <span className="text-black">{section.label}</span>
                  <ChevronDownIcon
                    className={cn(
                      'h-4 w-4 text-black transition-transform',
                      isSectionOpen ? '-rotate-180' : 'rotate-0',
                    )}
                  />
                </button>

                {isSectionOpen && (
                  <div className="pb-2">
                    {isObservation ? (
                      <div className="bg-black-100 py-2.5">
                        <Link
                          href="/observations"
                          onClick={onClose}
                          className="flex items-center gap-0.5 rounded-lg px-6 py-3.5 text-xs font-semibold text-black hover:bg-black-200 md:px-9"
                        >
                          <PlusIcon className="h-4 w-4 shrink-0" />새 관찰일지
                        </Link>
                        <Link
                          href="/mypage/observations"
                          onClick={onClose}
                          className="mt-2 flex items-center gap-2 rounded-lg px-6 py-3.5 text-xs font-semibold text-black hover:bg-black-200 md:px-9"
                        >
                          최근 관찰일지
                          <ChevronDownIcon className="h-3 w-3 -rotate-90 text-black" />
                        </Link>
                        {recentObservations && recentObservations.length > 0 && (
                          <ul className="flex flex-col">
                            {recentObservations.map((log) => (
                              <li
                                key={log.observationId}
                                className="group relative flex items-center"
                              >
                                <Link
                                  href={`/observations/${log.observationId}`}
                                  onClick={onClose}
                                  className="flex-1 truncate px-6 py-3.5 text-xs font-medium text-black-700 hover:rounded-lg hover:bg-black-200 md:px-9"
                                >
                                  {log.title}
                                </Link>
                                <MoreButton
                                  onDelete={() => deleteObservation(log.observationId)}
                                  className="absolute top-1/2 right-6 -translate-y-1/2 md:right-9"
                                />
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ) : (
                      <ul className="flex flex-col bg-black-100 py-2.5">
                        {COMMUNITY_SECTION.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={onClose}
                              className="block rounded-lg px-6 py-3.5 text-xs font-semibold text-black hover:bg-black-200 md:px-9"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
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
                onClick={onClose}
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
