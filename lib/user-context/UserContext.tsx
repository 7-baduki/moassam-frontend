'use client';

import { createContext, use, useContext } from 'react';
import { User } from '@/types/user.type';

const UserContext = createContext<Promise<User | null> | null>(null);

export function UserProvider({
  children,
  userPromise,
}: {
  children: React.ReactNode;
  userPromise: Promise<User | null>;
}) {
  return <UserContext value={userPromise}>{children}</UserContext>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser는 UserProvider 안에서만 사용할 수 있어요.');
  return use(context);
}
