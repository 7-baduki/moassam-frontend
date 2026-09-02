'use client';

import { useState } from 'react';
import { DetailBookmarkIcon, DetailHeartIcon } from '@/app/assets/icons';
import { useLikeMutation, useBookmarkMutation } from '@/hooks/queries/community';
import { toast } from '@/utils/toast';

interface BoardDetailSideActionsProps {
  postId: number;
  likeCount: number;
  bookmarkCount: number;
  bookmarked: boolean;
  liked: boolean;
}

export default function BoardDetailSideActions({
  postId,
  likeCount,
  bookmarkCount,
  bookmarked: initialBookmarked,
  liked: initialLiked,
}: BoardDetailSideActionsProps) {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [optimisticLikeCount, setOptimisticLikeCount] = useState(likeCount);
  const [optimisticBookmarkCount, setOptimisticBookmarkCount] = useState(bookmarkCount);

  const { mutate: toggleLike, isPending: isLikePending } = useLikeMutation(postId);
  const { mutate: toggleBookmark, isPending: isBookmarkPending } = useBookmarkMutation(postId);

  function handleLikeToggle() {
    if (isLikePending) return;
    const prevLiked = isLiked;
    const prevCount = optimisticLikeCount;
    setIsLiked(!prevLiked);
    setOptimisticLikeCount((prev) => (!prevLiked ? prev + 1 : prev - 1));
    toggleLike(prevLiked, {
      onSuccess: () => {
        if (!prevLiked) {
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
      onError: () => {
        setIsLiked(prevLiked);
        setOptimisticLikeCount(prevCount);
      },
    });
  }

  function handleBookmarkToggle() {
    if (isBookmarkPending) return;
    const prevBookmarked = isBookmarked;
    const prevCount = optimisticBookmarkCount;
    setIsBookmarked(!prevBookmarked);
    setOptimisticBookmarkCount((prev) => (!prevBookmarked ? prev + 1 : prev - 1));
    toggleBookmark(prevBookmarked, {
      onSuccess: () => {
        if (!prevBookmarked) {
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
      onError: () => {
        setIsBookmarked(prevBookmarked);
        setOptimisticBookmarkCount(prevCount);
      },
    });
  }

  return (
    <div
      role="group"
      aria-label="게시글 액션"
      className="flex flex-col items-center gap-2 rounded-[30px] bg-black-300 p-1"
    >
      <button
        type="button"
        onClick={handleBookmarkToggle}
        aria-label={isBookmarked ? '북마크 취소' : '북마크'}
        aria-pressed={isBookmarked}
        disabled={isBookmarkPending}
        className="flex cursor-pointer flex-col items-center gap-1.5 disabled:opacity-50"
      >
        <DetailBookmarkIcon
          className={
            isBookmarked
              ? '[&_path]:fill-black-600 [&_path]:stroke-black-600'
              : '[&_path]:fill-transparent [&_path]:stroke-black-600'
          }
        />
        <span aria-hidden="true" className="typo-line-p2 text-xs font-medium text-black-600">
          {optimisticBookmarkCount}
        </span>
      </button>
      <button
        type="button"
        onClick={handleLikeToggle}
        aria-label={isLiked ? '좋아요 취소' : '좋아요'}
        aria-pressed={isLiked}
        disabled={isLikePending}
        className="flex cursor-pointer flex-col items-center gap-1.5 disabled:opacity-50"
      >
        <DetailHeartIcon
          className={
            isLiked
              ? '[&_path]:fill-black-600 [&_path]:stroke-black-600'
              : '[&_path]:fill-transparent [&_path]:stroke-black-600'
          }
        />
        <span aria-hidden="true" className="typo-line-p2 text-xs font-medium text-black-600">
          {optimisticLikeCount}
        </span>
      </button>
    </div>
  );
}
