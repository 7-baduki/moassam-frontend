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
];

export default function HotPostSection() {
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
      <div className="flex gap-4 pb-6">
        {MOCK_HOT_POSTS.map((post) => (
          <HotPostCard key={post.postId} post={post} />
        ))}
      </div>
    </section>
  );
}
