'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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

interface BoardDetailSectionProps {
  postId: number;
  title: string;
}

export default function BoardDetailSection({ postId, title }: BoardDetailSectionProps) {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const isLoggedIn = user !== null;
  const { data: post } = usePostDetailQuery(postId);
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
        iconType="error"
        title="게시글을 삭제하시겠습니까?"
        description="삭제된 게시글은 복구할 수 없습니다"
        buttons={[
          { children: '취소', variant: 'outline', onClick: () => setDeleteDialogOpen(false) },
          { children: '삭제', variant: 'primary', onClick: confirmDelete, disabled: isDeleting },
        ]}
      />
      <div className="flex items-start gap-4">
        <div className="min-w-0 flex-1">
          <CommunityTitleBar
            title={title}
            actions={
              <div className="flex gap-2.5">
                {post.isMine && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-[50px] border-black-400 text-black-700 hover:border-black-500 hover:text-black-800 xl:w-20"
                      onClick={handleEdit}
                    >
                      수정
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-[50px] xl:w-20"
                      onClick={handleDelete}
                      disabled={isDeleting}
                    >
                      삭제
                    </Button>
                  </>
                )}
              </div>
            }
          />
          <BoardDetailPost post={post} />
          <div className="mt-7.5">
            <BoardDetailComments postId={postId} comments={post.comments} isLoggedIn={isLoggedIn} />
          </div>
        </div>
        <div className="sticky top-[263.2px] hidden shrink-0 xl:block">
          <BoardDetailSideActions
            postId={postId}
            likeCount={post.likeCount}
            bookmarked={post.bookmarked}
            liked={post.isLiked}
          />
        </div>
      </div>

      <div className="fixed right-20 bottom-17.5 hidden xl:block">
        <ScrollToTopButton />
      </div>
    </div>
  );
}
