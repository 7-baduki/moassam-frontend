import Link from 'next/link';
import { ViewCountIcon, LikeCountIcon, CommentCountIcon } from '@/app/assets/icons';
import { Badge } from '@/components/common/badge';
import type { BoardPost } from './board.type';

interface BoardCardProps {
  post: BoardPost;
}

export default function BoardCard({ post }: BoardCardProps) {
  return (
    <Link
      href={`/community/board/${post.postId}`}
      aria-label={`${post.title} 게시글 상세로 이동`}
      className="block cursor-pointer rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500"
    >
      <article className="flex flex-col rounded-2xl border border-black-200 bg-white px-7.5 pt-7.5 pb-6">
        <div className="flex gap-2">
          <Badge label={post.categoryName} variant="pink-light" />
        </div>
        <h3 className="typo-line-m4 mt-2 line-clamp-1 text-base font-semibold text-black-800">
          {post.title}
        </h3>
        <div className="mt-7 h-14">
          <p className="typo-line-m2 line-clamp-2 overflow-hidden text-sm font-medium text-black-700">
            {post.contentPreview}
          </p>
        </div>
        <p className="typo-line-m2 mt-4 truncate text-xs font-semibold text-black-600">
          {post.authorName}
        </p>
        <div className="mt-1.5 flex items-center justify-between text-xs text-black-500">
          <div className="typo-line-p2 flex items-center gap-3">
            {post.viewCount !== undefined && (
              <span className="flex items-center gap-1">
                <ViewCountIcon className="h-4 w-4" />
                {post.viewCount.toLocaleString()}
              </span>
            )}
            <span className="flex items-center gap-1">
              <LikeCountIcon className="h-4 w-4" />
              {post.likeCount.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <CommentCountIcon className="h-4 w-4" />
              {post.commentCount.toLocaleString()}
            </span>
          </div>
          <span>{post.createdAt}</span>
        </div>
      </article>
    </Link>
  );
}
