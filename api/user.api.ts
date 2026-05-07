import apiClient from './axios';
import { User } from '@/types/user.type';

export const getProfile = async (): Promise<User> => {
  const response = await apiClient.get('/api/v1/users/profile');
  return response.data.data;
};
