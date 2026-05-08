import { Button } from '@/components/common/button/Button';
import CommunityTitleBar from '@/components/community/CommunityTitleBar';
import BoardDetailComments from './BoardDetailComments';
import BoardDetailPost from './BoardDetailPost';
import BoardDetailSideActions from './BoardDetailSideActions';
import ScrollToTopButton from '@/components/common/scroll-top/ScrollToTopButton';
import type { BoardDetail } from './board-detail.type';

const MOCK_POST: BoardDetail = {
  postId: 1,
  authorId: 1,
  authorNickName: '햇살선생님',
  title: '활동자료 어쩌구',
  category: 'FREE',
  age: null,
  resourceType: null,
  headTag: 'RESOURCE',
  content: '글로글로\n가나다\n라이바\n사이자\n자카타\n파하',
  files: [
    {
      fileId: 1,
      originalName: '뿌뿌뿌뿌뿌뿌뿌뿌뿌뿌뿌뿌뿌뿌뿌뿌뿌뿌뿌뿌 말동이.png',
      url: 'https://picsum.photos/seed/file1/400/300',
      size: 331776,
      fileType: 'IMAGE',
    },
    {
      fileId: 2,
      originalName: '미션 수행.png',
      url: 'https://picsum.photos/seed/file2/400/300',
      size: 204800,
      fileType: 'IMAGE',
    },
    {
      fileId: 3,
      originalName: '활동지.png',
      url: 'https://picsum.photos/seed/file3/400/300',
      size: 409600,
      fileType: 'IMAGE',
    },
    {
      fileId: 4,
      originalName: '수업계획서.svg',
      url: '',
      size: 51200,
      fileType: 'FILE',
    },
  ],
  editorFiles: [
    {
      fileId: 10,
      originalName: '아이들사진.jpg',
      url: 'https://picsum.photos/seed/kids/800/500',
      size: 512000,
      fileType: 'IMAGE',
    },
    {
      fileId: 11,
      originalName: '보드게임.jpg',
      url: 'https://picsum.photos/seed/game/800/600',
      size: 716800,
      fileType: 'IMAGE',
    },
  ],
  viewCount: 12,
  commentCount: 4,
  likeCount: 12,
  bookmarked: false,
  liked: false,
  createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
};

interface BoardDetailSectionProps {
  postId: string;
  title: string;
}

// TODO: 실제 로그인 유저 ID로 교체 필요
const CURRENT_USER_ID = 1;
const IS_LOGGED_IN = true;

export default function BoardDetailSection({ postId: _, title }: BoardDetailSectionProps) {
  const isAuthor = MOCK_POST.authorId === CURRENT_USER_ID;

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
          <BoardDetailPost post={MOCK_POST} />
          <div className="mt-7.5">
            <BoardDetailComments
              commentCount={MOCK_POST.commentCount}
              currentUserId={CURRENT_USER_ID}
              isLoggedIn={IS_LOGGED_IN}
            />
          </div>
        </div>
        <div className="sticky top-[263.2px] shrink-0">
          <BoardDetailSideActions
            likeCount={MOCK_POST.likeCount}
            bookmarked={MOCK_POST.bookmarked}
            liked={MOCK_POST.liked}
          />
        </div>
      </div>

      <div className="fixed right-20 bottom-17.5">
        <ScrollToTopButton />
      </div>
    </div>
  );
}
