'use client';

import { MoreButton } from '@/components/common/more-button/MoreButton';
import type { Comment } from './board-detail.type';

interface BoardDetailCommentItemProps {
  comment: Comment;
  isAuthor: boolean;
}

function formatCommentTime(isoString: string): string {
  const date = new Date(isoString);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

export default function BoardDetailCommentItem({ comment, isAuthor }: BoardDetailCommentItemProps) {
  return (
    <li className="flex items-start gap-2 border-b border-black-200 py-4 last:border-b-0">
      <div aria-hidden="true" className="h-9 w-9 shrink-0 rounded-full bg-black-200" />

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-center gap-1">
          <span className="text-sm font-semibold text-black-700">{comment.authorNickName}</span>
          <span
            aria-label={`작성 시간 ${formatCommentTime(comment.createdAt)}`}
            className="text-xs font-medium text-black-500"
          >
            {formatCommentTime(comment.createdAt)}
          </span>
        </div>
        <p className="text-sm font-medium whitespace-pre-wrap text-black-700">{comment.content}</p>
      </div>

      {isAuthor && <MoreButton onEdit={() => {}} onDelete={() => {}} />}
    </li>
  );
}
