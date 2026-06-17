import axios from 'axios';
import { useLoginModalStore } from '@/stores/loginModalStore';
import { useUserStore } from '@/stores/userStore';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isLoggingOut = false;
let refreshPromise: Promise<void> | null = null;

export const setLoggingOut = (value: boolean) => {
  isLoggingOut = value;
};

export function refreshAccessToken(): Promise<void> {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/refresh`, {
          method: 'POST',
          credentials: 'include',
          signal: AbortSignal.timeout(10000),
        });
        if (!res.ok) throw new Error('refresh failed');
      } finally {
        refreshPromise = null;
      }
    })();
  }
  return refreshPromise;
}

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

    if (!useUserStore.getState().user) {
      error.isHandled = true;
      useLoginModalStore.getState().open();
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      await refreshAccessToken();
      return apiClient(originalRequest);
    } catch (refreshError) {
      try {
        await fetch('/api/auth/logout', { method: 'POST' });
      } catch {}
      useUserStore.getState().setUser(null);
      useLoginModalStore.getState().open('세션이 만료되었어요!', '다시 로그인해 주세요');
      if (axios.isAxiosError(refreshError)) refreshError.isHandled = true;
      return Promise.reject(refreshError);
    }
  },
);

export default apiClient;
