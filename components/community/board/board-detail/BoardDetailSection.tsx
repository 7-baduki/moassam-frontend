'use client';

import { Button } from '@/components/common/button/Button';
import CommunityTitleBar from '@/components/community/CommunityTitleBar';
import BoardDetailComments from './BoardDetailComments';
import BoardDetailPost from './BoardDetailPost';
import BoardDetailSideActions from './BoardDetailSideActions';
import ScrollToTopButton from '@/components/common/scroll-top/ScrollToTopButton';
import { usePostDetailQuery } from '@/hooks/queries/community/useCommunity';

interface BoardDetailSectionProps {
  postId: number;
  title: string;
}

// TODO: 실제 로그인 유저 ID로 교체 필요
const CURRENT_USER_ID = 1;
const IS_LOGGED_IN = true;

export default function BoardDetailSection({ postId, title }: BoardDetailSectionProps) {
  const { data: post } = usePostDetailQuery(postId);
  const isAuthor = post.authorId === CURRENT_USER_ID;

  return (
    <div>
      <div className="flex items-start gap-4">
        <div className="min-w-0 flex-1">
          <CommunityTitleBar
            title={title}
            actions={
              isAuthor ? (
                <div className="flex gap-2.5">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-black-400 text-black-700 hover:border-black-500 hover:text-black-800"
                  >
                    수정
                  </Button>
                  <Button variant="outline" size="sm">
                    삭제
                  </Button>
                </div>
              ) : null
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
