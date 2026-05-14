import Link from 'next/link';
import Image from 'next/image';
import { ViewCountIcon, LikeCountIcon, CommentCountIcon } from '@/app/assets/icons';
import { Badge } from '@/components/common/badge';
import type { MoabangPost, ResourceType } from './moabang.type';
import { formatRelativeTime } from '@/utils/formatRelativeTime';

const RESOURCE_TYPE_LABEL: Record<ResourceType, string> = {
  ACTIVITY: '활동자료',
  PLAN: '계획안',
  JOURNAL: '일지',
  NOTICE: '안내문',
};

interface MoabangCardProps {
  post: MoabangPost;
}

export default function MoabangCard({ post }: MoabangCardProps) {
  return (
    <Link
      href={`/community/moabang/${post.postId}`}
      aria-label={`${post.title} 모아방 게시글 상세로 이동`}
      className="block cursor-pointer rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500"
    >
      <article className="flex h-99.5 w-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm">
        {post.thumbnailUrl && (
          <div className="relative h-61.25 w-full shrink-0">
            <Image src={post.thumbnailUrl} alt={post.title} fill className="object-cover" />
          </div>
        )}
        <div className="flex flex-col px-5 py-6">
          <div className="flex gap-2">
            <Badge label={RESOURCE_TYPE_LABEL[post.resourceType]} variant="pink-light" />
          </div>
          <h3 className="typo-line-m4 mt-2.5 line-clamp-1 text-base font-semibold text-black-800">
            {post.title}
          </h3>
          <p className="typo-line-m2 mt-4 truncate text-xs font-semibold text-black-600">
            {post.authorNickName}
          </p>
          <div className="mt-1.5 flex items-center justify-between text-xs text-black-500">
            <div className="typo-line-p2 flex items-center gap-3">
              <span className="flex items-center gap-1">
                <ViewCountIcon className="h-4 w-4" />
                {post.viewCount.toLocaleString()}
              </span>
              <span className="flex items-center gap-1">
                <LikeCountIcon className="h-4 w-4" />
                {post.likeCount.toLocaleString()}
              </span>
              <span className="flex items-center gap-1">
                <CommentCountIcon className="h-4 w-4" />
                {post.commentCount.toLocaleString()}
              </span>
            </div>
            <span>{formatRelativeTime(post.createdAt)}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
