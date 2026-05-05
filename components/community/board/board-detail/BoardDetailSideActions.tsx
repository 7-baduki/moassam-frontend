import { LikeCountIcon, CommentCountIcon } from '@/app/assets/icons';

interface BoardDetailSideActionsProps {
  likeCount: number;
  commentCount: number;
  bookmarked: boolean;
}

function BookmarkIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path
        d="M5 3H17C17.5523 3 18 3.44772 18 4V20L11 16.5L4 20V4C4 3.44772 4.44772 3 5 3Z"
        stroke={active ? '#ff7b84' : '#9d9d9d'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={active ? '#ff7b84' : 'none'}
      />
    </svg>
  );
}

export default function BoardDetailSideActions({
  likeCount,
  commentCount,
  bookmarked,
}: BoardDetailSideActionsProps) {
  return (
    <div className="flex flex-col items-center gap-5 rounded-2xl border border-black-200 bg-white px-3 py-5 shadow-sm">
      <button type="button" className="flex cursor-pointer flex-col items-center gap-1.5">
        <BookmarkIcon active={bookmarked} />
        <span className="text-xs font-semibold text-black-600">{likeCount}</span>
      </button>
      <button type="button" className="flex cursor-pointer flex-col items-center gap-1.5">
        <LikeCountIcon className="h-[22px] w-[22px] text-black-500" />
        <span className="text-xs font-semibold text-black-600">{likeCount}</span>
      </button>
      <button type="button" className="flex cursor-pointer flex-col items-center gap-1.5">
        <CommentCountIcon className="h-[22px] w-[22px] text-black-500" />
        <span className="text-xs font-semibold text-black-600">{commentCount}</span>
      </button>
    </div>
  );
}
