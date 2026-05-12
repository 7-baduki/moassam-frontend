import 'axios';

declare module 'axios' {
  interface AxiosError {
    isHandled?: boolean;
  }
}
