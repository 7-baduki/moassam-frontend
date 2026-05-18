'use client';

import { usePostDetailQuery } from '@/hooks/queries/community/useCommunity';
import WriteForm from '@/components/community/write/WriteForm';
import type { BoardType } from '@/components/community/write/write.type';
import type { HeadTag } from '@/components/community/board/board.type';

interface EditSectionProps {
  postId: number;
}

export default function EditSection({ postId }: EditSectionProps) {
  const { data: post } = usePostDetailQuery(postId);

  const initialBoard: BoardType = post.category === 'MOABANG' ? 'moabang' : 'free';

  return (
    <div className="w-full">
      <WriteForm
        mode="edit"
        postId={post.postId}
        initialBoard={initialBoard}
        initialValues={{
          title: post.title,
          content: post.content,
          postAge: post.postAge ?? undefined,
          resourceType: post.resourceType ?? undefined,
          headTag: (post.headTag as HeadTag | null) ?? undefined,
        }}
        initialExistingFiles={post.files}
      />
    </div>
  );
}
