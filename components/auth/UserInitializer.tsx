'use client';

import { useEffect } from 'react';
import { User } from '@/types/user.type';
import { useUserStore } from '@/stores/userStore';

export default function UserInitializer({ user }: { user: User | null }) {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    setUser(user);
  }, [user, setUser]);

  return null;
}
