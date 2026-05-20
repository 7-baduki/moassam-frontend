import apiClient from './axios';
import { User, ActivitySummary } from '@/types/user.type';
import { MyObservationListResponse } from '@/types/observation.type';

export const getMyObservations = async (page: number): Promise<MyObservationListResponse> => {
  const response = await apiClient.get('/api/v1/users/observations', {
    params: { page, size: 10 },
  });
  return response.data.data;
};

export const getActivitySummary = async (): Promise<ActivitySummary> => {
  const response = await apiClient.get('/api/v1/users/activity-summary');
  return response.data.data;
};

export const updateProfile = async (nickname: string): Promise<User> => {
  const response = await apiClient.patch('/api/v1/users/profile', { nickname });
  return response.data.data;
};
