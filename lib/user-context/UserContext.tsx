'use client';

import { use, useEffect } from 'react';
import { User } from '@/types/user.type';
import { useUserStore } from '@/stores/userStore';

export function UserInitializer({ userPromise }: { userPromise: Promise<User | null> }) {
  const user = use(userPromise);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    setUser(user);
  }, [user, setUser]);

  return null;
}
