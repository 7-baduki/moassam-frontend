'use client';

import { PlusIcon } from '@/app/assets/icons';

interface CommunityFabProps {
  onClick?: () => void;
  className?: string;
}

export default function CommunityFab({ onClick, className }: CommunityFabProps) {
  return (
    <button
      type="button"
      aria-label="새글 작성"
      onClick={onClick}
      className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-pink-500 shadow-lg transition-colors hover:bg-pink-600 xl:hidden ${className ?? 'fixed right-9 bottom-9 z-300'}`}
    >
      <PlusIcon viewBox="1 1 14 14" className="h-4.5 w-4.5 text-white [&_path]:stroke-2" />
    </button>
  );
}
