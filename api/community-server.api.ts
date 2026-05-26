import { cookies } from 'next/headers';

interface PostTitleResponse {
  title: string;
}

export const getPostTitle = async (postId: number): Promise<string | null> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/posts/${postId}`, {
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
    });

    if (!response.ok) return null;

    const data = await response.json();
    const post = data.data as PostTitleResponse | undefined;
    return post?.title ?? null;
  } catch {
    return null;
  }
};
