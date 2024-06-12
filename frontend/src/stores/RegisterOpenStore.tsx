import { create } from "zustand";

export interface RegisterOpenStore {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const useRegisterOpenStore = create<RegisterOpenStore>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}));

export default useRegisterOpenStore;
