import type { PostAge, ResourceType } from '@/components/community/moabang/moabang.type';
import type { HeadTag } from '@/components/community/board/board.type';

export type BoardType = 'moabang' | 'free';

export interface WriteFormValues {
  title: string;
  content: string;
  files: File[];
  boardType: BoardType;
  postAge?: PostAge;
  resourceType?: ResourceType;
  headTag?: HeadTag;
}
