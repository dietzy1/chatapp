import { Channel, Chatroom } from "@/types/user";
import { create } from "zustand";

export interface SelectedChatroomStore {
  selectedChatroom: Chatroom | null;
  selectedChannel: Channel | null;
  setSelectedChatroom: (chatroom: Chatroom) => void;
  setSelectedChannel: (channel: Channel) => void;
}

const useSelectedChatroomStore = create<SelectedChatroomStore>((set) => ({
  selectedChatroom: null,
  selectedChannel: null,
  setSelectedChatroom: (chatroom) => {
    set({ selectedChatroom: chatroom, selectedChannel: chatroom.channels[0] });
  },
  setSelectedChannel: (channel) => set({ selectedChannel: channel }),
}));

export default useSelectedChatroomStore;
