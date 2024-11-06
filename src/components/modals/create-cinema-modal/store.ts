import { create } from "zustand";

interface useCreateCinemaModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useCreateCinemaModal = create<useCreateCinemaModalStore>(
  (set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  })
);
