import apiClient from './axios';
import { ObservationCreateRequest, ObservationCreateResponse } from '@/types/observation.type';

export const createObservation = async (
  data: ObservationCreateRequest,
): Promise<ObservationCreateResponse> => {
  const response = await apiClient.post('/api/v1/observations', data);
  return response.data.data;
};
