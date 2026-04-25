import type { BadgeVariant } from './badge.type';

export const MOABANG_BADGE: Record<string, BadgeVariant> = {
  common: 'yellow',
  baby: 'pink-light',
  age3: 'green-light',
  age4: 'pink-dark',
  age5: 'green-dark',
  activity: 'outline-yellow',
  diary: 'outline-pink',
  plan: 'outline-green',
  notice: 'outline-gray',
};

export const FREE_BOARD_BADGE: Record<string, BadgeVariant> = {
  question: 'yellow',
  concern: 'pink-light',
  chat: 'green-light',
};
