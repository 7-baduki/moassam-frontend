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
    <div
      role="group"
      aria-label="게시글 액션"
      className="flex flex-col items-center gap-2 rounded-[30px] bg-black-300 p-1"
    >
      <button
        type="button"
        onClick={() => setIsBookmarked((prev) => !prev)}
        aria-label={isBookmarked ? '북마크 취소' : '북마크'}
        aria-pressed={isBookmarked}
        className="flex cursor-pointer flex-col items-center gap-1.5"
      >
        <DetailBookmarkIcon
          className={
            isBookmarked
              ? '[&_path]:fill-black-600 [&_path]:stroke-black-600'
              : '[&_path]:fill-transparent [&_path]:stroke-black-600'
          }
        />
        <span aria-hidden="true" className="typo-line-p2 text-xs font-medium text-black-600">
          {likeCount}
        </span>
      </button>
      <button
        type="button"
        onClick={() => setIsLiked((prev) => !prev)}
        aria-label={isLiked ? '좋아요 취소' : '좋아요'}
        aria-pressed={isLiked}
        className="flex cursor-pointer flex-col items-center gap-1.5"
      >
        <DetailHeartIcon
          className={
            isLiked
              ? '[&_path]:fill-black-600 [&_path]:stroke-black-600'
              : '[&_path]:fill-transparent [&_path]:stroke-black-600'
          }
        />
        <span aria-hidden="true" className="typo-line-p2 text-xs font-medium text-black-600">
          {likeCount}
        </span>
      </button>
    </div>
  );
}
