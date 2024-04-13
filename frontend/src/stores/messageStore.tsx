import { create } from "zustand";

export interface MessageStore {
  messages: string[];
  addMessage: (message: string) => void;
  clearMessages: () => void;
}

const useMessageStore = create<MessageStore>((set) => ({
  messages: [],
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  clearMessages: () => set({ messages: [] }),
}));

export default useMessageStore;
