import DOMPurify from 'isomorphic-dompurify';
import Image from 'next/image';
import { Badge } from '@/components/common/badge';
import type { BadgeVariant } from '@/components/common/badge/badge.type';
import { AGE_OPTIONS, MATERIAL_TYPE_OPTIONS } from '@/components/community/write/write-selects';
import type { PostAge, ResourceType } from '@/components/community/moabang/moabang.type';
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

const POST_AGE_LABEL: Record<PostAge, string> = Object.fromEntries(
  AGE_OPTIONS.map((o) => [o.value, o.label]),
) as Record<PostAge, string>;

const RESOURCE_TYPE_LABEL: Record<ResourceType, string> = Object.fromEntries(
  MATERIAL_TYPE_OPTIONS.map((o) => [o.value, o.label]),
) as Record<ResourceType, string>;

const POST_AGE_VARIANT: Record<PostAge, BadgeVariant> = {
  ALL: 'yellow',
  INFANT: 'pink-light',
  AGE_3: 'green-light',
  AGE_4: 'pink-dark',
  AGE_5: 'green-dark',
};

const RESOURCE_TYPE_VARIANT: Record<ResourceType, BadgeVariant> = {
  ACTIVITY: 'outline-yellow',
  PLAN: 'outline-green',
  JOURNAL: 'outline-pink',
  NOTICE: 'outline-gray',
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
  const isMoabang = post.postAge !== null || post.resourceType !== null;

  return (
    <article
      aria-labelledby="post-title"
      className="rounded-2xl border border-black-200 bg-white p-7.5"
    >
      <div>
        {isMoabang ? (
          <div className="flex gap-1.5">
            {post.postAge && (
              <Badge
                label={POST_AGE_LABEL[post.postAge]}
                variant={POST_AGE_VARIANT[post.postAge]}
              />
            )}
            {post.resourceType && (
              <Badge
                label={RESOURCE_TYPE_LABEL[post.resourceType]}
                variant={RESOURCE_TYPE_VARIANT[post.resourceType]}
              />
            )}
          </div>
        ) : (
          post.headTag && (
            <Badge label={HEAD_TAG_LABELS[post.headTag] ?? post.headTag} variant="pink-light" />
          )
        )}

        <h1 id="post-title" className="typo-line-m2 mt-3.5 text-xl font-semibold text-black-800">
          {post.title}
        </h1>

        <div className="mt-4.5 flex flex-wrap items-center gap-2.5">
          <span
            aria-label={`작성자 ${post.authorNickName}`}
            className="typo-line-m2 text-xs font-semibold text-black-600"
          >
            {post.authorNickName}
          </span>
          <span
            aria-label={`조회수 ${post.viewCount}`}
            className="text-xs font-medium text-black-500"
          >
            조회 {post.viewCount}
          </span>
          <span
            aria-label={`댓글 수 ${post.commentCount}`}
            className="text-xs font-medium text-black-500"
          >
            댓글 {post.commentCount}
          </span>
          <span
            aria-label={`작성 시간 ${formatRelativeTime(post.createdAt)}`}
            className="text-xs font-medium text-black-500"
          >
            {formatRelativeTime(post.createdAt)}
          </span>
        </div>
      </div>

      <hr className="mt-5 border-black-200" />

      <div
        className="mt-6 text-sm leading-relaxed font-medium text-black-700"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
      />

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
