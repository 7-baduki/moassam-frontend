'use client';

import { TopIcon } from '@/app/assets/icons';

export default function ScrollToTopButton() {
  const handleClick = () => {
    document.querySelector('main')?.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
