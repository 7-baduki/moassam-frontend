import { Button } from '@/components/common/button/Button';
import BoardDetailPost from './BoardDetailPost';
import BoardDetailSideActions from './BoardDetailSideActions';
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
      originalName: '뿌뿌뿌뿌 말동이.png',
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
  createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
};

interface BoardDetailSectionProps {
  postId: string;
}

export default function BoardDetailSection({ postId: _ }: BoardDetailSectionProps) {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="typo-line-m2 text-lg font-semibold text-black-800">자유게시판</h2>
          <p className="typo-line-m4 text-sm font-medium text-black-600">
            자유롭게 이야기를 나누는 공간입니다
          </p>
        </div>
        <div className="flex gap-2.5">
          <Button variant="outline" size="sm">
            수정
          </Button>
          <Button variant="primary" size="sm">
            삭제
          </Button>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <div className="min-w-0 flex-1">
          <BoardDetailPost post={MOCK_POST} />
        </div>
        <div className="sticky top-8 shrink-0">
          <BoardDetailSideActions
            likeCount={MOCK_POST.likeCount}
            commentCount={MOCK_POST.commentCount}
            bookmarked={MOCK_POST.bookmarked}
          />
        </div>
      </div>
    </div>
  );
}
