'use client';

import useEmblaCarousel from 'embla-carousel-react';
import HotPostCard from './HotPostCard';
import type { HotPost } from './moabang.type';

const MOCK_HOT_POSTS: HotPost[] = [
  {
    postId: 1,
    category: 'RESOURCE',
    categoryName: '모아방',
    title: '저번주에 진행한 아이들 활동지 공유드립니다 ㅇㄹㅇㄹㅇㄹㅇㄹㅇ',
    contentPreview: '유치원에서 학부모 면담에서 칭찬받은 활동지 어쩌구',
    authorName: '👑 자료 맞짐 작성자',
    createdAt: '2026.03.16',
    thumnail: 'https://picsum.photos/156/200?random=1',
  },
  {
    postId: 2,
    category: 'FREE',
    categoryName: '자유게시판',
    title: '저번주에 진행한 아이들 활동지 공유드립니다 ㅇㄹㅇㄹㅇㄹㅇㄹㅇ',
    contentPreview: '유치원에서 학부모 면담에서 칭찬받은 활동지 어쩌구',
    authorName: '👑 자료 맞짐 작성자',
    createdAt: '2026.03.16',
  },
  {
    postId: 3,
    category: 'RESOURCE',
    categoryName: '모아방',
    title: '저번주에 진행한 아이들 활동지 공유드립니다 ㅇㄹㅇㄹㅇㄹㅇㄹㅇ',
    contentPreview: '유치원에서 학부모 면담에서 칭찬받은 활동지 어쩌구',
    authorName: '👑 자료 맞짐 작성자',
    createdAt: '2026.03.16',
    thumnail: 'https://picsum.photos/156/200?random=2',
  },
  {
    postId: 4,
    category: 'QUESTION',
    categoryName: 'QA',
    title: '5월 가정의달 주제 수업 활동지 공유합니다 (수정가능)',
    contentPreview: '수업 때 아이들 반응이 너무 좋았어요 참고하세요',
    authorName: '햇살선생님',
    createdAt: '2026.03.14',
    thumnail: 'https://picsum.photos/156/200?random=3',
  },
  {
    postId: 5,
    category: 'FREE',
    categoryName: '자유게시판',
    title: '신규 교사 첫 학부모 상담 후기 공유합니다',
    contentPreview: '긴장했는데 생각보다 잘 됐어요 팁 공유드려요',
    authorName: '새싹선생님',
    createdAt: '2026.03.12',
  },
  {
    postId: 6,
    category: 'RESOURCE',
    categoryName: '모아방',
    title: '봄 주제 미술활동 계획안 공유드립니다',
    contentPreview: '꽃 만들기 활동인데 아이들이 정말 좋아했어요',
    authorName: '꽃샘선생님',
    createdAt: '2026.03.10',
    thumnail: 'https://picsum.photos/156/200?random=4',
  },
];

export default function HotPostSection() {
  const [emblaRef] = useEmblaCarousel({ dragFree: true });

  return (
    <section
      aria-label="실시간 HOT 게시글"
      className="w-full bg-[url('/images/HotSeticonBg.png')] bg-size-[100%_100%] bg-no-repeat px-6"
    >
      <div className="mt-7.5 mb-5">
        <h2 className="text-xl font-semibold tracking-[-0.02em] text-black">
          실시간 <span className="text-[#FF4646]">HOT</span> 게시글 🔥
        </h2>
      </div>
      <div className="overflow-hidden pb-6" ref={emblaRef}>
        <div className="flex gap-4">
          {MOCK_HOT_POSTS.map((post) => (
            <div key={post.postId} className="shrink-0">
              <HotPostCard post={post} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
