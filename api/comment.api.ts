import apiClient from './axios';
import { MyCommentListResponse } from '@/components/mypage/comments/comment.type';

export const getMyComments = async (page: number): Promise<MyCommentListResponse> => {
  const response = await apiClient.get('/api/v1/users/comments', {
    params: { page, size: 10 },
  });
  return response.data.data;
};
