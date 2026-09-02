import apiClient from './axios';
import { MyMoabangPost, MyFreePost, MyPostListResponse } from '@/components/mypage/posts/post.type';

export const getMyMoabangPosts = async (
  page: number,
): Promise<MyPostListResponse<MyMoabangPost>> => {
  const response = await apiClient.get('/api/v1/users/posts/moabang', {
    params: { page, size: 10 },
  });
  return response.data.data;
};

export const getMyFreePosts = async (page: number): Promise<MyPostListResponse<MyFreePost>> => {
  const response = await apiClient.get('/api/v1/users/posts/free', {
    params: { page, size: 10 },
  });
  return response.data.data;
};
