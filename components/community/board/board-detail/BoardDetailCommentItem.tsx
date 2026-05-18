'use client';

import { useState } from 'react';
import { MoreButton } from '@/components/common/more-button/MoreButton';
import { Textarea } from '@/components/common/textarea/Textarea';
import { Button } from '@/components/common/button/Button';
import { Dialog } from '@/components/common/dialog/Dialog';
import type { Comment } from './board-detail.type';

interface BoardDetailCommentItemProps {
  comment: Comment;
  onUpdate: (commentId: number, content: string) => void;
  onDelete: (commentId: number) => void;
}

function formatCommentTime(isoString: string): string {
  const date = new Date(isoString);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

export default function BoardDetailCommentItem({
  comment,
  onUpdate,
  onDelete,
}: BoardDetailCommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(comment.content);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  function handleEditSubmit() {
    if (!editValue.trim()) return;
    onUpdate(comment.commentId, editValue);
    setIsEditing(false);
  }

  function handleEditCancel() {
    setEditValue(comment.content);
    setIsEditing(false);
  }

  return (
    <li className="flex items-start gap-2 border-b border-black-200 py-4 last:border-b-0">
      <Dialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        iconType="trash"
        title="댓글을 삭제하시겠습니까?"
        description="삭제한 게시글은 다시 복구할 수 없어요"
        buttons={[
          { children: '취소', variant: 'outline', onClick: () => setDeleteDialogOpen(false) },
          {
            children: '삭제',
            variant: 'primary',
            onClick: () => {
              setDeleteDialogOpen(false);
              onDelete(comment.commentId);
            },
          },
        ]}
      />
      <div aria-hidden="true" className="h-9 w-9 shrink-0 rounded-full bg-black-200" />

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-center gap-1">
          <span className="text-sm font-semibold text-black-700">{comment.authorNickname}</span>
          <span
            aria-label={`작성 시간 ${formatCommentTime(comment.createdAt)}`}
            className="text-xs font-medium text-black-500"
          >
            {formatCommentTime(comment.createdAt)}
          </span>
        </div>

        {isEditing ? (
          <div className="mt-1">
            <Textarea
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              maxLength={3000}
              rows={3}
              action={
                <div className="flex gap-1.5">
                  <Button size="sm" variant="outline" onClick={handleEditCancel}>
                    취소
                  </Button>
                  <Button
                    size="sm"
                    variant="primary"
                    disabled={!editValue.trim()}
                    onClick={handleEditSubmit}
                  >
                    수정
                  </Button>
                </div>
              }
            />
          </div>
        ) : (
          <p className="text-sm font-medium whitespace-pre-wrap text-black-700">
            {comment.content}
          </p>
        )}
      </div>

      {!isEditing && comment.isMine && (
        <MoreButton onEdit={() => setIsEditing(true)} onDelete={() => setDeleteDialogOpen(true)} />
      )}
    </li>
  );
}
