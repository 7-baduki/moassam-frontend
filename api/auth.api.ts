import apiClient from './axios';

export const refresh = async (): Promise<void> => {
  await apiClient.post('/api/v1/auth/refresh');
};
