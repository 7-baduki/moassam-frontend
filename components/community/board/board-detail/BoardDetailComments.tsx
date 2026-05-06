'use client';

import { useState } from 'react';
import { Button } from '@/components/common/button/Button';
import { Textarea } from '@/components/common/textarea/Textarea';
import type { Comment } from './board-detail.type';
import BoardDetailCommentItem from './BoardDetailCommentItem';

const MOCK_COMMENTS: Comment[] = [
  {
    commentId: 1,
    authorId: 2,
    authorNickName: '나미리선생님',
    content: '아직 추천합니다\n얼글루팡치고\n워라밸라밸라밸',
    createdAt: new Date().toISOString(),
  },
  {
    commentId: 2,
    authorId: 3,
    authorNickName: '김지은선생님',
    content: '미래를 위해 이직하세요\n화이팅!',
    createdAt: new Date().toISOString(),
  },
  {
    commentId: 3,
    authorId: 3,
    authorNickName: '김지은선생님',
    content: '저도 공감합니다*********************************************',
    createdAt: new Date().toISOString(),
  },
];

interface BoardDetailCommentsProps {
  commentCount: number;
  currentUserId: number;
  isLoggedIn: boolean;
}

export default function BoardDetailComments({
  commentCount,
  currentUserId,
  isLoggedIn,
}: BoardDetailCommentsProps) {
  const [value, setValue] = useState('');

  return (
    <div className="rounded-2xl border border-black-200 bg-white p-7.5">
      <h2 className="typo-line-m2 text-base font-semibold text-black-800">
        댓글 <span className="text-pink-500">{commentCount}</span>
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
          disabled={!isLoggedIn}
          action={
            <Button size="sm" variant="primary" disabled={!isLoggedIn}>
              등록
            </Button>
          }
        />
      </div>

      <div className="mt-4">
        {MOCK_COMMENTS.map((comment) => (
          <BoardDetailCommentItem
            key={comment.commentId}
            comment={comment}
            isAuthor={comment.authorId === currentUserId}
          />
        ))}
      </div>
    </div>
  );
}
