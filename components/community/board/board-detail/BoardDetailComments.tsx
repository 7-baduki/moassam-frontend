'use client';

import { useState } from 'react';
import { Button } from '@/components/common/button/Button';
import { Textarea } from '@/components/common/textarea/Textarea';
import type { Comment } from './board-detail.type';
import BoardDetailCommentItem from './BoardDetailCommentItem';
import {
  useCommentsQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from '@/hooks/queries/community/useCommunity';

interface BoardDetailCommentsProps {
  postId: number;
  commentCount: number;
  isLoggedIn: boolean;
}

export default function BoardDetailComments({
  postId,
  commentCount,
  isLoggedIn,
}: BoardDetailCommentsProps) {
  const [value, setValue] = useState('');

  // TODO: 500 에러 해결 후 주석 해제
  // const { data: comments } = useCommentsQuery(postId);
  const comments: Comment[] = [];
  const { mutate: createComment, isPending: isCreating } = useCreateCommentMutation(postId);
  const { mutate: updateComment } = useUpdateCommentMutation(postId);
  const { mutate: deleteComment } = useDeleteCommentMutation(postId);

  function handleSubmit() {
    if (!value.trim()) return;
    createComment(value, { onSuccess: () => setValue('') });
  }

  return (
    <section aria-label="댓글" className="rounded-2xl border border-black-200 bg-white p-7.5">
      <h2 id="comments-title" className="typo-line-m2 text-base font-semibold text-black-800">
        댓글{' '}
        <span className={commentCount === 0 ? 'text-black-500' : 'text-pink-500'}>
          {commentCount}
        </span>
      </h2>

      <div className="mt-4">
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={
            isLoggedIn
              ? '나누고 싶은 이야기나 따뜻한 응원을 남겨주세요'
              : '댓글을 남기려면 로그인이 필요해요'
          }
          maxLength={3000}
          rows={3}
          disabled={!isLoggedIn || isCreating}
          action={
            <Button
              size="sm"
              variant="primary"
              disabled={!isLoggedIn || value.trim() === '' || isCreating}
              aria-label="댓글 등록"
              onClick={handleSubmit}
            >
              등록
            </Button>
          }
        />
      </div>

      <ul aria-labelledby="comments-title" className="mt-4">
        {comments.map((comment) => (
          <BoardDetailCommentItem
            key={comment.commentId}
            comment={comment}
            onUpdate={(commentId, content) => updateComment({ commentId, content })}
            onDelete={(commentId) => deleteComment(commentId)}
          />
        ))}
      </ul>
    </section>
  );
}
