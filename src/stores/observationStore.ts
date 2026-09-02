import { create } from 'zustand';

interface ObservationStore {
  isGenerating: boolean;
  setIsGenerating: (value: boolean) => void;
}

export const useObservationStore = create<ObservationStore>((set) => ({
  isGenerating: false,
  setIsGenerating: (value) => set({ isGenerating: value }),
}));
