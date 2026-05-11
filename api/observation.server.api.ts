import { cookies } from 'next/headers';
import { ObservationDetailResponse } from '@/types/observation.type';

export const getObservationDetail = async (
  id: number,
): Promise<ObservationDetailResponse | null> => {
  const accessToken = (await cookies()).get('accessToken')?.value;
  if (!accessToken) return null;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/observations/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!response.ok) return null;

    const data = await response.json();
    return data.data;
  } catch {
    return null;
  }
};
