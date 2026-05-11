import apiClient from './axios';
import {
  ObservationCreateRequest,
  ObservationCreateResponse,
  ObservationDetailResponse,
  ObservationListResponse,
} from '@/types/observation.type';

export const createObservation = async (
  data: ObservationCreateRequest,
): Promise<ObservationCreateResponse> => {
  const response = await apiClient.post('/api/v1/observations', data);
  return response.data.data;
};

export const getObservation = async (id: number): Promise<ObservationDetailResponse> => {
  const response = await apiClient.get(`/api/v1/observations/${id}`);
  return response.data.data;
};

export const regenerateObservation = async (id: number): Promise<ObservationDetailResponse> => {
  const response = await apiClient.post(`/api/v1/observations/${id}/regenerate`);
  return response.data.data;
};

export const getObservations = async (cursor?: number): Promise<ObservationListResponse> => {
  const response = await apiClient.get('/api/v1/observations', {
    params: { cursor, size: 20 },
  });
  return response.data.data;
};

export const deleteObservation = async (id: number): Promise<void> => {
  await apiClient.delete(`/api/v1/observations/${id}`);
};
