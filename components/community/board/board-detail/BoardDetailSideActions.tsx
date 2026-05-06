import { LikeCountIcon, CommentCountIcon } from '@/app/assets/icons';

interface BoardDetailSideActionsProps {
  likeCount: number;
  commentCount: number;
  bookmarked: boolean;
}

// TODO: 북마크 아이콘 필요 (active 여부에 따라 색상 변경)
function BookmarkIcon({ active: _ }: { active: boolean }) {
  return <div className="h-[22px] w-[22px]" />;
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
