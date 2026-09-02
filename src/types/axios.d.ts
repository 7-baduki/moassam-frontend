import 'axios';

declare module 'axios' {
  interface AxiosError {
    isHandled?: boolean;
  }

  interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}
