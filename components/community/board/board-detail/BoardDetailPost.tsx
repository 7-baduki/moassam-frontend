import Image from 'next/image';
import { ViewCountIcon, CommentCountIcon } from '@/app/assets/icons';
import { Badge } from '@/components/common/badge';
import BoardDetailAttachments from './BoardDetailAttachments';
import type { BoardDetail } from './board-detail.type';

const HEAD_TAG_LABELS: Record<string, string> = {
  QUESTION: '질문',
  FREE: '자유',
  RESOURCE: '활동자료',
  PLAN: '계획안',
  JOURNAL: '일지',
  NOTICE: '안내문',
  WORRY: '고민',
  CHAT: '잡담',
};

function formatRelativeTime(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return '방금 전';
  if (diffHours < 1) return `${diffMins}분 전`;
  if (diffDays < 1) return `${diffHours}시간 전`;
  if (diffDays < 7) return `${diffDays}일 전`;
  return date.toLocaleDateString('ko-KR');
}

interface BoardDetailPostProps {
  post: BoardDetail;
}

export default function BoardDetailPost({ post }: BoardDetailPostProps) {
  const headTagLabel = HEAD_TAG_LABELS[post.headTag] ?? post.headTag;

  return (
    <article className="rounded-2xl border border-black-200 bg-white px-8 py-10">
      <Badge label={headTagLabel} variant="pink-light" />

      <h1 className="mt-3 text-xl font-bold text-black-800">{post.title}</h1>

      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-black-500">
        <span className="font-semibold text-black-600">{post.authorNickName}</span>
        <span className="flex items-center gap-1">
          <ViewCountIcon className="h-3.5 w-3.5" />
          조회 {post.viewCount}
        </span>
        <span className="flex items-center gap-1">
          <CommentCountIcon className="h-3.5 w-3.5" />
          댓글 {post.commentCount}
        </span>
        <span>{formatRelativeTime(post.createdAt)}</span>
      </div>

      <hr className="mt-5 border-black-200" />

      <div className="mt-6 text-sm leading-relaxed font-medium whitespace-pre-wrap text-black-700">
        {post.content}
      </div>

      {post.editorFiles.length > 0 && (
        <div className="mt-6 flex flex-col gap-4">
          {post.editorFiles.map((file) => (
            <div key={file.fileId} className="relative overflow-hidden rounded-xl">
              <Image
                src={file.url}
                alt={file.originalName}
                width={800}
                height={600}
                className="w-full object-contain"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
          ))}
        </div>
      )}

      {post.files.length > 0 && <BoardDetailAttachments files={post.files} />}
    </article>
  );
}
