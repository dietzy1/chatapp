import { create } from "zustand";

export interface LoginOpenStore {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const useLoginOpenStore = create<LoginOpenStore>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}));

export default useLoginOpenStore;
