'use client';

import { useRouter } from 'next/navigation';
import { ChevronDoubleLeftIcon } from '@/app/assets/icons';

interface ObservationSidebarToggleProps {
  isOpen: boolean;
}

export default function ObservationSidebarToggle({ isOpen }: ObservationSidebarToggleProps) {
  const router = useRouter();

  const handleToggle = () => {
    document.cookie = `observation-sidebar-open=${!isOpen}; path=/; max-age=${60 * 60 * 24 * 365}`;
    router.refresh();
  };

  return (
    <button
      onClick={handleToggle}
      className="absolute top-7.5 right-5"
      aria-label={isOpen ? '사이드바 닫기' : '사이드바 열기'}
    >
      <ChevronDoubleLeftIcon
        className={`transition-transform duration-300 ${isOpen ? '' : 'rotate-180'}`}
      />
    </button>
  );
}
