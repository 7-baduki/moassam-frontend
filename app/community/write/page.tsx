import type { Metadata } from 'next';
import WriteForm from '@/components/community/write/WriteForm';
import type { BoardType } from '@/components/community/write/write.type';

export const metadata: Metadata = {
  title: '게시글 작성',
};

interface WritePageProps {
  searchParams: Promise<{ board?: string }>;
}

export default async function WritePage({ searchParams }: WritePageProps) {
  const { board } = await searchParams;
  const initialBoard: BoardType = board === 'free' ? 'free' : 'moabang';

  return (
    <div className="w-full">
      <WriteForm initialBoard={initialBoard} />
    </div>
  );
}
