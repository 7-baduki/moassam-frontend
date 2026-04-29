import ListCard from './ListCard';
import type { ListPost } from './moabang.type';

const MOCK_POST: ListPost = {
  postId: 1,
  category: 'RESOURCE',
  categoryName: '모아방',
  tags: ['영아', '계획안'],
  title: '5월 가정의달 주제 수업 활동지 공유합니다 (수정가능)',
  thumnail: 'https://picsum.photos/400/200?random=10',
  authorName: '햇살선생님',
  likeCount: 46,
  commentCount: 119,
  viewCount: 1230,
  createdAt: '3시간 전',
};

export default function ListPostSection() {
  return (
    <section aria-label="게시글 목록">
      <ListCard post={MOCK_POST} />
    </section>
  );
}
