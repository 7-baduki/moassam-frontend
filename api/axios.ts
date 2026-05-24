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

let isLoggingOut = false;
let refreshPromise: Promise<string> | null = null;

export const setLoggingOut = (value: boolean) => {
  isLoggingOut = value;
};

export function refreshAccessToken(): Promise<string> {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/refresh`, {
          method: 'POST',
          credentials: 'include',
          signal: AbortSignal.timeout(10000),
        });
        if (!res.ok) throw new Error('refresh failed');

        const { data } = await res.json();
        if (!data?.accessToken) throw new Error('refresh failed');

        const setTokenRes = await fetch('/api/auth/set-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ accessToken: data.accessToken }),
          signal: AbortSignal.timeout(10000),
        });
        if (!setTokenRes.ok) throw new Error('set-token failed');

        return data.accessToken as string;
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

    if (!document.cookie.split(';').some((c) => c.trim() === 'isLoggedIn=true')) {
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
      } catch {
        // 로그아웃 요청이 실패해도 로컬 상태는 정리한다
      }
      useUserStore.getState().setUser(null);
      useLoginModalStore.getState().open('세션이 만료되었어요!', '다시 로그인해 주세요');
      if (axios.isAxiosError(refreshError)) refreshError.isHandled = true;
      return Promise.reject(refreshError);
    }
  },
);

export default apiClient;
