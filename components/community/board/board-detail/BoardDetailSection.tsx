'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/common/button/Button';
import { Dialog } from '@/components/common/dialog/Dialog';
import CommunityTitleBar from '@/components/community/CommunityTitleBar';
import BoardDetailComments from './BoardDetailComments';
import BoardDetailPost from './BoardDetailPost';
import BoardDetailSideActions from './BoardDetailSideActions';
import ScrollToTopButton from '@/components/common/scroll-top/ScrollToTopButton';
import { usePostDetailQuery, useDeletePostMutation } from '@/hooks/queries/community/useCommunity';
import { useUserStore } from '@/stores/userStore';
import { toast } from '@/utils/toast';
import { AsyncBoundary, LoadingSpinner, ErrorFallback } from '@/lib/async-boundary';

interface BoardDetailSectionProps {
  postId: number;
  title: string;
}

function BoardDetailHeaderActions({
  postId,
  onEdit,
  onDelete,
  isDeleting,
}: {
  postId: number;
  onEdit: () => void;
  onDelete: () => void;
  isDeleting: boolean;
}) {
  const { data: post } = usePostDetailQuery(postId);
  if (!post.isMine) return null;
  return (
    <div className="flex gap-2.5">
      <Button
        variant="outline"
        size="sm"
        className="w-12.5 border-black-400 text-black-700 hover:border-black-500 hover:text-black-800 xl:w-20"
        onClick={onEdit}
      >
        수정
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="w-12.5 xl:w-20"
        onClick={onDelete}
        disabled={isDeleting}
      >
        삭제
      </Button>
    </div>
  );
}

function BoardDetailSideActionsLoader({ postId }: { postId: number }) {
  const { data: post } = usePostDetailQuery(postId);
  return (
    <BoardDetailSideActions
      postId={postId}
      likeCount={post.likeCount}
      bookmarkCount={post.bookmarkCount}
      bookmarked={post.bookmarked}
      liked={post.isLiked}
    />
  );
}

function BoardDetailContent({ postId, isLoggedIn }: { postId: number; isLoggedIn: boolean }) {
  const { data: post } = usePostDetailQuery(postId);
  return (
    <>
      <BoardDetailPost post={post} />
      <div className="mt-7.5">
        <BoardDetailComments postId={postId} comments={post.comments} isLoggedIn={isLoggedIn} />
      </div>
    </>
  );
}

export default function BoardDetailSection({ postId, title }: BoardDetailSectionProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const listKey = title === '모아방' ? 'moabang' : 'board';
    return () => {
      queryClient.invalidateQueries({ queryKey: [listKey, 'posts'] });
    };
  }, [queryClient, title]);
  const isLoggedIn = user !== null;
  const { mutate: deletePost, isPending: isDeleting } = useDeletePostMutation();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  function handleEdit() {
    router.push(`/community/edit/${postId}`);
  }

  function handleDelete() {
    setDeleteDialogOpen(true);
  }

  function confirmDelete() {
    setDeleteDialogOpen(false);
    deletePost(postId, {
      onSuccess: () => router.back(),
      onError: () => toast.error({ title: '삭제 실패', description: '잠시 후 다시 시도해주세요' }),
    });
  }

  return (
    <div>
      <Dialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        iconType="trash"
        title="게시글을 삭제할까요?"
        description="삭제한 게시글은 다시 복구할 수 없어요"
        buttons={[
          { children: '취소', variant: 'outline', onClick: () => setDeleteDialogOpen(false) },
          { children: '삭제', variant: 'primary', onClick: confirmDelete, disabled: isDeleting },
        ]}
      />
      <div className="flex items-start gap-4">
        <div className="min-w-0 flex-1">
          <CommunityTitleBar
            title={title}
            showBackButton
            actions={
              <AsyncBoundary pendingFallback={null} rejectedFallback={() => null}>
                <BoardDetailHeaderActions
                  postId={postId}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  isDeleting={isDeleting}
                />
              </AsyncBoundary>
            }
          />
          <AsyncBoundary
            pendingFallback={<LoadingSpinner className="mt-[20vh]" />}
            rejectedFallback={({ error, reset }) => (
              <ErrorFallback
                error={error}
                actionLabel="다시 시도"
                onAction={reset}
                className="pt-7.5"
              />
            )}
          >
            <BoardDetailContent postId={postId} isLoggedIn={isLoggedIn} />
          </AsyncBoundary>
        </div>
        <div className="sticky top-[263.2px] hidden shrink-0 xl:block">
          <AsyncBoundary pendingFallback={null} rejectedFallback={() => null}>
            <BoardDetailSideActionsLoader postId={postId} />
          </AsyncBoundary>
        </div>
      </div>
      <div className="fixed right-20 bottom-17.5 hidden xl:block">
        <ScrollToTopButton />
      </div>
    </div>
  );
}
