import { create } from 'zustand';

export const LAST_LOGIN_PROVIDER_KEY = 'lastLoginProvider';
export type LoginProvider = 'kakao' | 'naver' | 'google';

const DEFAULT_TITLE = '안녕하세요, 선생님!';
const DEFAULT_DESCRIPTION = '로그인하고 모아쌤을 사용해보세요';

interface LoginModalStore {
  isOpen: boolean;
  title: string;
  description: string;
  lastProvider: LoginProvider | null;
  open: (title?: string, description?: string) => void;
  close: () => void;
}

export const useLoginModalStore = create<LoginModalStore>((set) => ({
  isOpen: false,
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  lastProvider: null,
  open: (title = DEFAULT_TITLE, description = DEFAULT_DESCRIPTION) => {
    const lastProvider = localStorage.getItem(LAST_LOGIN_PROVIDER_KEY) as LoginProvider | null;
    set({ isOpen: true, title, description, lastProvider });
  },
  close: () => set({ isOpen: false }),
}));
