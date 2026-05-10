import apiClient from './axios';
import { ObservationRequest, ObservationResponse } from '@/types/observation.type';

export const createObservation = async (data: ObservationRequest): Promise<ObservationResponse> => {
  const response = await apiClient.post('/api/v1/observations', data);
  return response.data.data;
};
