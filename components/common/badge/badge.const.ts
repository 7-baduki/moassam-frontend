import type { BadgeVariant } from './badge.type';

export type BadgeKey =
  | 'common'
  | 'baby'
  | 'age3'
  | 'age4'
  | 'age5'
  | 'activity'
  | 'diary'
  | 'plan'
  | 'notice'
  | 'question'
  | 'concern'
  | 'chat';

export const BADGE_MAP: Record<BadgeKey, BadgeVariant> = {
  common: 'yellow',
  baby: 'pink-light',
  age3: 'green-light',
  age4: 'pink-dark',
  age5: 'green-dark',
  activity: 'outline-yellow',
  diary: 'outline-pink',
  plan: 'outline-green',
  notice: 'outline-gray',
  question: 'yellow',
  concern: 'pink-light',
  chat: 'green-light',
};
