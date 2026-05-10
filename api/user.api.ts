import { cache } from 'react';
import { cookies } from 'next/headers';
import { User } from '@/types/user.type';

export const getProfile = cache(async (): Promise<User | null> => {
  const accessToken = (await cookies()).get('accessToken')?.value;
  if (!accessToken) return null;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/profile`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) return null;

  const data = await response.json();
  return data.data;
});
