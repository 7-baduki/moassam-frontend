import apiClient from './axios';
import {
  ObservationCreateRequest,
  ObservationCreateResponse,
  ObservationDetailResponse,
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
