'use client';

import { createContext, use, useContext, useEffect } from 'react';
import { User } from '@/types/user.type';
import { useUserStore } from '@/stores/userStore';

const UserContext = createContext<Promise<User | null> | null>(null);

function UserInitializer({ userPromise }: { userPromise: Promise<User | null> }) {
  const user = use(userPromise);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    setUser(user);
  }, [user, setUser]);

  return null;
}

export function UserProvider({
  children,
  userPromise,
}: {
  children: React.ReactNode;
  userPromise: Promise<User | null>;
}) {
  return (
    <UserContext value={userPromise}>
      <UserInitializer userPromise={userPromise} />
      {children}
    </UserContext>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser는 UserProvider 안에서만 사용할 수 있어요.');
  return use(context);
}
