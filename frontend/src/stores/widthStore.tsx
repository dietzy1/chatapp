import { create } from "zustand";

/* interface WidthStore {
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
})); */

// Define the store interface
export interface WidthStore {
  widths: {
    leftbarWidth: number | null;
    rightbarWidth: number | null;
    middleWidth: number | null;
  };
  setWidth: (key: keyof WidthStore["widths"], width: number | null) => void;
}

// Create the store
const useWidthStore = create<WidthStore>((set) => ({
  widths: {
    leftbarWidth: null,
    rightbarWidth: null,
    middleWidth: null,
  },
  setWidth: (key, width) =>
    set((state) => ({
      widths: { ...state.widths, [key]: width },
    })),
}));

export default useWidthStore;
