'use client';

import { useState } from 'react';
import { DetailBookmarkIcon, DetailHeartIcon } from '@/app/assets/icons';

interface BoardDetailSideActionsProps {
  likeCount: number;
  bookmarked: boolean;
}

export default function BoardDetailSideActions({
  likeCount,
  bookmarked: initialBookmarked,
}: BoardDetailSideActionsProps) {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="flex flex-col items-center gap-2 rounded-[30px] bg-black-300 p-1">
      <button
        type="button"
        onClick={() => setIsBookmarked((prev) => !prev)}
        className="flex cursor-pointer flex-col items-center gap-1.5"
      >
        <DetailBookmarkIcon
          className={
            isBookmarked
              ? '[&_path]:fill-black-600 [&_path]:stroke-black-600'
              : '[&_path]:fill-transparent [&_path]:stroke-black-600'
          }
        />
        <span className="typo-line-p2 text-xs font-medium text-black-600">{likeCount}</span>
      </button>
      <button
        type="button"
        onClick={() => setIsLiked((prev) => !prev)}
        className="flex cursor-pointer flex-col items-center gap-1.5"
      >
        <DetailHeartIcon
          className={
            isLiked
              ? '[&_path]:fill-black-600 [&_path]:stroke-black-600'
              : '[&_path]:fill-transparent [&_path]:stroke-black-600'
          }
        />
        <span className="typo-line-p2 text-xs font-medium text-black-600">{likeCount}</span>
      </button>
    </div>
  );
}
