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
      <WriteForm initialBoard={initialBoard} />
    </div>
  );
}
