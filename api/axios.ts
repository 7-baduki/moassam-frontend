import axios from 'axios';
import { useLoginModalStore } from '@/stores/loginModalStore';
import { useUserStore } from '@/stores/userStore';

const apiClient = axios.create({
  baseURL: '/api/proxy',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let isLoggingOut = false;
let pendingQueue: Array<{ resolve: () => void; reject: (error: unknown) => void }> = [];

export const setLoggingOut = (value: boolean) => {
  isLoggingOut = value;
};

const processPendingQueue = (error: unknown) => {
  pendingQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve();
  });
  pendingQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!axios.isAxiosError(error) || !error.config) {
      return Promise.reject(error);
    }

    const originalRequest = error.config;

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    if (isLoggingOut) {
      error.isHandled = true;
      return Promise.reject(error);
    }

    const user = useUserStore.getState().user;
    if (!user) {
      useLoginModalStore.getState().open('로그인이 필요해요!', '로그인 후 이용할 수 있어요');
      error.isHandled = true;
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingQueue.push({
          resolve: () => resolve(apiClient(originalRequest)),
          reject,
        });
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      await apiClient.post('/api/v1/auth/refresh');
      processPendingQueue(null);
      return apiClient(originalRequest);
    } catch (refreshError) {
      processPendingQueue(refreshError);
      await fetch('/api/auth/logout', { method: 'POST' });
      useLoginModalStore.getState().open('세션이 만료되었어요!', '다시 로그인해 주세요');
      if (axios.isAxiosError(refreshError)) refreshError.isHandled = true;
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default apiClient;
