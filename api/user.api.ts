import apiClient from './axios';
import { User } from '@/types/user.type';

export const updateProfile = async (nickname: string): Promise<User> => {
  const response = await apiClient.patch('/api/v1/users/profile', nickname, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data.data;
};
