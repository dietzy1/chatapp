import { Message, RecieveMessageEvent } from "@/types/message";
import { create } from "zustand";

export interface MessageStore {
  messages: Message[];
  addMessage: (newMessage: RecieveMessageEvent) => void;
  clearMessages: () => void;
}

const useMessageStore = create<MessageStore>((set) => ({
  messages: [],
  addMessage: (newMessage) => {
    set((state) => {
      // Check if there are any existing messages
      if (state.messages.length === 0) {
        // If no existing messages, create a new message entry
        return {
          messages: [{ message: [newMessage] }],
        };
      } else {
        // Get the latest message
        const latestMessage = state.messages[state.messages.length - 1];

        // Check if the userID of the new message matches the userID of the latest message
        if (latestMessage.message[0].userId === newMessage.userId) {
          // If they match, append the new message to the existing message array
          const updatedMessages = state.messages.slice(0, -1).concat({
            message: [...latestMessage.message, newMessage],
          });
          return { messages: updatedMessages };
        } else {
          // If they don't match, add the new message as a separate entry
          const updatedMessages = [
            ...state.messages,
            { message: [newMessage] },
          ];
          return { messages: updatedMessages };
        }
      }
    });
  },
  /* addMessage: (newMessage) => {
    set((state) => {
      // Check if there are any existing messages
      if (state.messages.length === 0) {
        // If no existing messages, create a new message entry
        return {
          messages: [{ message: [newMessage] }],
        };
      } else {
        // Get the latest message
        const latestMessage = state.messages[state.messages.length - 1].message;

        // Check if the userID of the new message matches the userID of the latest message
        if (
          latestMessage[latestMessage.length - 1].userId === newMessage.userId
        ) {
          // If they match, append the new message to the existing message array
          const updatedMessages = state.messages.slice(0, -1).concat({
            message: [...latestMessage, newMessage],
          });
          return { messages: updatedMessages };
        } else {
          // If they don't match, add the new message as a separate entry
          const updatedMessages = [
            ...state.messages,
            { message: [newMessage] },
          ];
          return { messages: updatedMessages };
        }
      }
    });
  }, */
  clearMessages: () => set({ messages: [] }),
}));

export default useMessageStore;
