import ListCard from './ListCard';
import CommunityTitleBar from '@/components/comunity/CommunityTitleBar';
import CommunityFilter from '@/components/comunity/CommunityFilter';
import type { ListPost } from './moabang.type';

const AGE_TABS = [
  { label: '전체', value: 'all' },
  { label: '영아', value: 'infant' },
  { label: '만 3세', value: 'age3' },
  { label: '만 4세', value: 'age4' },
  { label: '만 5세', value: 'age5' },
];

const CATEGORY_TABS = [
  { label: '전체', value: 'all' },
  { label: '활동자료', value: 'activity' },
  { label: '계획안', value: 'plan' },
  { label: '일지', value: 'journal' },
  { label: '안내문', value: 'notice' },
];

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
    <section className="flex flex-col gap-4" aria-label="게시글 목록">
      <CommunityTitleBar title="모아방" description="수업자료를 공유하는 공간입니다" />
      <CommunityFilter ageTabs={AGE_TABS} categoryTabs={CATEGORY_TABS} />
      <ListCard post={MOCK_POST} />
    </section>
  );
}
