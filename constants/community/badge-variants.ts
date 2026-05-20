import type { BadgeVariant } from '@/components/common/badge/badge.type';
import type { PostAge, ResourceType } from '@/components/community/moabang/moabang.type';
import type { HeadTag } from '@/components/community/board/board.type';

export const POST_AGE_VARIANT: Record<PostAge, BadgeVariant> = {
  ALL: 'yellow',
  INFANT: 'pink-light',
  AGE_3: 'green-light',
  AGE_4: 'pink-dark',
  AGE_5: 'green-dark',
};

export const RESOURCE_TYPE_VARIANT: Record<ResourceType, BadgeVariant> = {
  ACTIVITY: 'outline-yellow',
  JOURNAL: 'outline-pink',
  PLAN: 'outline-green',
  NOTICE: 'outline-gray',
};

export const HEAD_TAG_VARIANT: Record<HeadTag, BadgeVariant> = {
  QUESTION: 'yellow',
  WORRY: 'pink-light',
  CHAT: 'green-light',
};
