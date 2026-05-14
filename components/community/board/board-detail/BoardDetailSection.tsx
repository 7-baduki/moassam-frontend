'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/common/button/Button';
import CommunityTitleBar from '@/components/community/CommunityTitleBar';
import BoardDetailComments from './BoardDetailComments';
import BoardDetailPost from './BoardDetailPost';
import BoardDetailSideActions from './BoardDetailSideActions';
import ScrollToTopButton from '@/components/common/scroll-top/ScrollToTopButton';
import { usePostDetailQuery, useDeletePostMutation } from '@/hooks/queries/community/useCommunity';

interface BoardDetailSectionProps {
  postId: number;
  title: string;
}

// TODO: 백엔드에서 isAuthor 필드 추가 후 조건 처리 필요
const IS_LOGGED_IN = true;

export default function BoardDetailSection({ postId, title }: BoardDetailSectionProps) {
  const router = useRouter();
  const { data: post } = usePostDetailQuery(postId);
  const { mutate: deletePost, isPending: isDeleting } = useDeletePostMutation();

  function handleEdit() {
    router.push(`/community/edit/${postId}`);
  }

  function handleDelete() {
    if (!window.confirm('게시글을 삭제하시겠습니까?')) return;
    deletePost(postId, {
      onSuccess: () => router.back(),
      onError: () => alert('삭제에 실패했습니다. 잠시 후 다시 시도해주세요.'),
    });
  }

  return (
    <div>
      <div className="flex items-start gap-4">
        <div className="min-w-0 flex-1">
          <CommunityTitleBar
            title={title}
            actions={
              <div className="flex gap-2.5">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-black-400 text-black-700 hover:border-black-500 hover:text-black-800"
                  onClick={handleEdit}
                >
                  수정
                </Button>
                <Button variant="outline" size="sm" onClick={handleDelete} disabled={isDeleting}>
                  삭제
                </Button>
              </div>
            }
          />
          <BoardDetailPost post={post} />
          <div className="mt-7.5">
            <BoardDetailComments
              postId={postId}
              commentCount={post.commentCount}
              isLoggedIn={IS_LOGGED_IN}
            />
          </div>
        </div>
        <div className="sticky top-[263.2px] shrink-0">
          <BoardDetailSideActions
            likeCount={post.likeCount}
            bookmarked={post.bookmarked}
            liked={post.isLiked}
          />
        </div>
      </div>

      <div className="fixed right-20 bottom-17.5">
        <ScrollToTopButton />
      </div>
    </div>
  );
}
