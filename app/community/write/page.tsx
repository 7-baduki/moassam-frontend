import CommunityTitleBar from '@/components/community/CommunityTitleBar';
import WriteForm from '@/components/community/write/WriteForm';
import type { BoardType } from '@/components/community/write/write.type';

interface WritePageProps {
  searchParams: Promise<{ board?: string }>;
}

export default async function WritePage({ searchParams }: WritePageProps) {
  const { board } = await searchParams;
  const initialBoard: BoardType = board === 'free' ? 'free' : 'moabang';

  return (
    <div className="min-w-[700px]">
      <CommunityTitleBar
        title="새글작성"
        description="자유게시판 글 작성 시 1회, 모아방 자료 업로드 시 3회 AI 생성 횟수가 충전돼요."
        hideSearch
      />
      <WriteForm initialBoard={initialBoard} />
    </div>
  );
}
