'use client';

import { useEffect, useState } from 'react';
import { TopIcon } from '@/app/assets/icons';
import { useScrollRoot } from '@/lib/scroll-root';

interface ScrollToTopButtonProps {
  showAfter?: number;
}

export default function ScrollToTopButton({ showAfter }: ScrollToTopButtonProps) {
  const scrollRef = useScrollRoot();
  const [visible, setVisible] = useState(showAfter === undefined);

  useEffect(() => {
    if (showAfter === undefined) return;
    const el = scrollRef?.current;
    if (!el) return;
    const onScroll = () => setVisible(el.scrollTop > showAfter);
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [scrollRef, showAfter]);

  const handleClick = () => {
    scrollRef?.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-[30px] border border-black-300 bg-white shadow-[0px_4px_12px_0px_#00000014]"
      aria-label="맨 위로 이동"
    >
      <TopIcon />
    </button>
  );
}
