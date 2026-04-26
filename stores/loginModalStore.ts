import { create } from 'zustand';

const DEFAULT_TITLE = '안녕하세요, 선생님!';
const DEFAULT_DESCRIPTION = '로그인하고 모아쌤을 사용해보세요';

interface LoginModalStore {
  isOpen: boolean;
  title: string;
  description: string;
  open: (title?: string, description?: string) => void;
  close: () => void;
}

export const useLoginModalStore = create<LoginModalStore>((set) => ({
  isOpen: false,
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  open: (title = DEFAULT_TITLE, description = DEFAULT_DESCRIPTION) =>
    set({ isOpen: true, title, description }),
  close: () => set({ isOpen: false }),
}));
