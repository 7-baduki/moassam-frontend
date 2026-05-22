'use client';

import { useState } from 'react';
import { DetailBookmarkIcon, DetailHeartIcon } from '@/app/assets/icons';
import { useLikeMutation, useBookmarkMutation } from '@/hooks/queries/community';
import { toast } from '@/utils/toast';

interface BoardDetailInlineActionsProps {
  postId: number;
  bookmarked: boolean;
  liked: boolean;
  className?: string;
}

export default function BoardDetailInlineActions({
  postId,
  bookmarked: initialBookmarked,
  liked: initialLiked,
  className,
}: BoardDetailInlineActionsProps) {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
  const [isLiked, setIsLiked] = useState(initialLiked);

  const { mutate: toggleLike, isPending: isLikePending } = useLikeMutation(postId);
  const { mutate: toggleBookmark, isPending: isBookmarkPending } = useBookmarkMutation(postId);

  function handleLikeToggle() {
    if (isLikePending) return;
    const prev = isLiked;
    setIsLiked(!prev);
    toggleLike(prev, {
      onSuccess: () => {
        if (!prev) {
          toast.success({
            title: '좋아요를 눌렀어요',
            description: '이 게시글에 좋아요를 표시했어요',
          });
        } else {
          toast.success({
            title: '좋아요를 취소했어요',
            description: '언제든 다시 좋아요를 누를 수 있어요',
          });
        }
      },
      onError: () => setIsLiked(prev),
    });
  }

  function handleBookmarkToggle() {
    if (isBookmarkPending) return;
    const prev = isBookmarked;
    setIsBookmarked(!prev);
    toggleBookmark(prev, {
      onSuccess: () => {
        if (!prev) {
          toast.success({
            title: '북마크 저장 완료',
            description: '마이페이지 > 북마크에서 확인할 수 있어요',
          });
        } else {
          toast.success({
            title: '북마크가 삭제되었어요',
            description: '삭제해도 언제든 다시 북마크할 수 있어요',
          });
        }
      },
      onError: () => setIsBookmarked(prev),
    });
  }

  return (
    <div
      role="group"
      aria-label="게시글 액션"
      className={`flex items-center gap-2 ${className ?? ''}`}
    >
      <button
        type="button"
        onClick={handleLikeToggle}
        aria-label={isLiked ? '좋아요 취소' : '좋아요'}
        aria-pressed={isLiked}
        disabled={isLikePending}
        className="flex cursor-pointer items-center disabled:opacity-50"
      >
        <DetailHeartIcon
          className={
            isLiked
              ? '[&_path]:fill-black-700 [&_path]:stroke-black-700'
              : '[&_path]:fill-transparent [&_path]:stroke-black-700'
          }
        />
      </button>
      <button
        type="button"
        onClick={handleBookmarkToggle}
        aria-label={isBookmarked ? '북마크 취소' : '북마크'}
        aria-pressed={isBookmarked}
        disabled={isBookmarkPending}
        className="flex cursor-pointer items-center disabled:opacity-50"
      >
        <DetailBookmarkIcon
          className={
            isBookmarked
              ? '[&_path]:fill-black-700 [&_path]:stroke-black-700'
              : '[&_path]:fill-transparent [&_path]:stroke-black-700'
          }
        />
      </button>
    </div>
  );
}
