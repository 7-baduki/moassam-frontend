import Link from 'next/link';
import Image from 'next/image';
import { ViewCountIcon, LikeCountIcon, CommentCountIcon } from '@/app/assets/icons';
import { Badge } from '@/components/common/badge';
import type { MoabangPost, ResourceType } from './moabang.type';
import { formatRelativeTime } from '@/utils/formatRelativeTime';
import { RESOURCE_TYPE_VARIANT, POST_AGE_VARIANT } from '@/constants/community/badge-variants';
import type { PostAge } from './moabang.type';
import { BoardAltImg } from '@/app/assets/images';

const POST_AGE_LABEL: Record<PostAge, string> = {
  ALL: '공통',
  INFANT: '영아',
  AGE_3: '만 3세',
  AGE_4: '만 4세',
  AGE_5: '만 5세',
};

const RESOURCE_TYPE_LABEL: Record<ResourceType, string> = {
  ACTIVITY: '활동자료',
  ENVIRONMENT: '환경구성',
  PLAN: '계획안',
  DOCUMENT_FORM: '문서/서식',
};

interface MoabangCardProps {
  post: MoabangPost;
}

export default function MoabangCard({ post }: MoabangCardProps) {
  return (
    <Link
      href={`/community/moabang/${post.postId}`}
      aria-label={`${post.title} 모아방 게시글 상세로 이동`}
      className="animate-lift block cursor-pointer rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500"
    >
      <article className="flex h-99.5 w-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="relative h-61.25 w-full shrink-0 border-b border-black-200">
          <Image
            src={post.thumbnailUrl ?? BoardAltImg}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col px-5 py-6">
          <div className="flex gap-2">
            <Badge label={POST_AGE_LABEL[post.postAge]} variant={POST_AGE_VARIANT[post.postAge]} />
            <Badge
              label={RESOURCE_TYPE_LABEL[post.resourceType]}
              variant={RESOURCE_TYPE_VARIANT[post.resourceType]}
            />
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
