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
          messages: [{ message: [newMessage], dayDifference: false }],
        };
      } else {
        // Get the latest message
        const latestMessage = state.messages[state.messages.length - 1];

        // Check if the userID of the new message matches the userID of the latest message
        if (latestMessage.message[0].userId === newMessage.userId) {
          // Check if there's a day difference between the new message and the latest message
          const dayDifference =
            Math.abs(
              new Date(latestMessage.message[0].createdAt).getTime() -
                new Date(newMessage.createdAt).getTime(),
            ) >
            24 * 60 * 60 * 1000;

          // If they match, append the new message to the existing message array
          const updatedMessages = state.messages.slice(0, -1).concat({
            message: [...latestMessage.message, newMessage],
            dayDifference: dayDifference,
          });
          return { messages: updatedMessages };
        } else {
          // If they don't match, add the new message as a separate entry
          const updatedMessages = [
            ...state.messages,
            { message: [newMessage], dayDifference: false },
          ];
          return { messages: updatedMessages };
        }
      }
    });
  },

  clearMessages: () => set({ messages: [] }),
}));

export default useMessageStore;
