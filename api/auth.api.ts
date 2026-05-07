import apiClient from './axios';

export const refresh = async (): Promise<string> => {
  const response = await apiClient.post('/api/v1/auth/refresh');
  return response.data.data.accessToken;
};
