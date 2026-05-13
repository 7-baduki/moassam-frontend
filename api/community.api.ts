import apiClient from './axios';
import type {
  MoabangListParams,
  MoabangListResponse,
} from '@/components/community/moabang/moabang.type';
import type { BoardListParams, BoardListResponse } from '@/components/community/board/board.type';

export async function getMoabangPosts(params: MoabangListParams): Promise<MoabangListResponse> {
  const { data } = await apiClient.get('/api/v1/posts/moabang', { params });
  return data.data;
}

export async function getBoardPosts(params: BoardListParams): Promise<BoardListResponse> {
  const { data } = await apiClient.get('/api/v1/posts/free', { params });
  return data.data;
}
