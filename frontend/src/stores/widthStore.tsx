import { create } from "zustand";

interface WidthStore {
  leftbarWidth: number | null;
  rightbarWidth: number | null;
  middleWidth: number | null;
  setLeftbarWidth: (width: number) => void;
  setRightbarWidth: (width: number) => void;
  setMiddleWidth: (width: number) => void;
}

const useWidthStore = create<WidthStore>((set) => ({
  leftbarWidth: null,
  rightbarWidth: null,
  middleWidth: null,
  setLeftbarWidth: (width) => set({ leftbarWidth: width }),
  setRightbarWidth: (width) => set({ rightbarWidth: width }),
  setMiddleWidth: (width) => set({ middleWidth: width }),
}));

export default useWidthStore;
