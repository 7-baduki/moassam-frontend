'use client';

import { PlusIcon } from '@/app/assets/icons';

interface CommunityFabProps {
  onClick?: () => void;
}

export default function CommunityFab({ onClick }: CommunityFabProps) {
  return (
    <button
      type="button"
      aria-label="새글 작성"
      onClick={onClick}
      className="fixed right-4 bottom-6 z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-pink-500 shadow-lg transition-colors hover:bg-pink-600 xl:hidden"
    >
      <PlusIcon viewBox="1 1 14 14" className="h-[18px] w-[18px] text-white [&_path]:stroke-2" />
    </button>
  );
}
