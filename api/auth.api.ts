import apiClient from './axios';

export const logout = async (): Promise<void> => {
  try {
    await apiClient.post('/api/v1/auth/logout');
  } finally {
    await fetch('/api/auth/logout', { method: 'POST' });
  }
};

export const withdraw = async (): Promise<void> => {
  try {
    await apiClient.delete('/api/v1/auth/withdraw');
  } finally {
    await fetch('/api/auth/withdraw', { method: 'POST' });
  }
};
