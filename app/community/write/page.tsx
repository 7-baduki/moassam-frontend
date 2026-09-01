import type { Metadata } from 'next';
import { Suspense } from 'react';
import WriteForm from '@/components/community/write/WriteForm';
import type { BoardType } from '@/components/community/write/write.type';

export const metadata: Metadata = {
  title: '게시글 작성',
};

interface WritePageProps {
  searchParams: Promise<{ board?: string }>;
}

export default function WritePage({ searchParams }: WritePageProps) {
  return (
    <div className="w-full">
      <Suspense fallback={null}>
        <WritePageContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function WritePageContent({ searchParams }: WritePageProps) {
  const { board } = await searchParams;
  const initialBoard: BoardType = board === 'free' ? 'free' : 'moabang';

  return <WriteForm initialBoard={initialBoard} />;
}
