import apiClient from './axios';
import { MyBookmarkListResponse } from '@/components/mypage/bookmarks/bookmark.type';

export const getMyBookmarks = async (page: number): Promise<MyBookmarkListResponse> => {
  const response = await apiClient.get('/api/v1/users/posts/bookmarked', {
    params: { page, size: 10 },
  });
  return response.data.data;
};
