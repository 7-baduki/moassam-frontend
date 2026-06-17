import apiClient from './axios';

export const logout = async (): Promise<void> => {
  await apiClient.post('/api/v1/auth/logout');
};

export const withdraw = async (): Promise<void> => {
  await apiClient.delete('/api/v1/auth/withdraw');
};
