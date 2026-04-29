import Image from 'next/image';
import HotBadge from '@/components/common/badge/HotBadge';
import TagLabel from '@/components/common/badge/TagLabel';
import type { HotPost } from './moabang.type';

interface HotPostCardProps {
  post: HotPost;
}

export default function HotPostCard({ post }: HotPostCardProps) {
  return (
    <article className="flex overflow-hidden rounded-2xl border border-yellow-100 bg-white">
      <div className="flex w-97.5 shrink-0 flex-col py-6">
        <div className="w-fit">
          <TagLabel label={post.categoryName} />
        </div>
        <div className="flex flex-1 flex-col gap-2 px-5 pt-3">
          <div className="flex flex-col gap-1">
            <h3 className="line-clamp-2 min-h-[2.8rem] text-base leading-[140%] font-semibold tracking-[-0.02em] text-black-800">
              {post.title}
            </h3>
            <p className="line-clamp-1 text-sm leading-[140%] font-medium tracking-[-0.02em] text-black-600">
              {post.contentPreview}
            </p>
          </div>
          <div className="mt-4 flex items-center justify-between">
            {post.authorName && <HotBadge label={post.authorName} />}
            <span className="shrink-0 text-xs font-medium text-black-500">{post.createdAt}</span>
          </div>
        </div>
      </div>
      {post.thumnail && (
        <div className="relative w-39 shrink-0">
          <Image src={post.thumnail} alt="" fill className="object-cover" />
        </div>
      )}
    </article>
  );
}
