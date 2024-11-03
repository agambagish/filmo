import { create } from "zustand";

interface useSelectCityModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useSelectCityModal = create<useSelectCityModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
