import apiClient from './axios';
import { Credit } from '@/types/credit.type';

export const getCredits = async (): Promise<Credit> => {
  const response = await apiClient.get('/api/v1/credits');
  return response.data.data;
};
