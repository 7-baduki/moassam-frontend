import apiClient from './axios';

export const refresh = async (): Promise<void> => {
  await apiClient.post('/api/v1/auth/refresh');
};

export const logout = async (): Promise<void> => {
  try {
    await apiClient.post('/api/v1/auth/logout');
  } finally {
    await fetch('/api/auth/logout', { method: 'POST' });
  }
};
