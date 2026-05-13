import apiClient from './axios';
import type {
  MoabangListParams,
  MoabangListResponse,
} from '@/components/community/moabang/moabang.type';

export async function getMoabangPosts(params: MoabangListParams): Promise<MoabangListResponse> {
  const { data } = await apiClient.get('/api/v1/posts/moabang', { params });
  return data.data;
}
