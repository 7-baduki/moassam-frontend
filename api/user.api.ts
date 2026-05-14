import { cache } from 'react';
import { cookies } from 'next/headers';
import { User } from '@/types/user.type';

export const getProfile = cache(async (): Promise<User | null> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  if (!accessToken) return null;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/profile`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (response.status === 401) {
      cookieStore.delete('accessToken');
      return null;
    }

    if (!response.ok) return null;

    const data = await response.json();
    console.log('[getProfile] response data:', JSON.stringify(data.data, null, 2));
    return data.data;
  } catch {
    return null;
  }
});
