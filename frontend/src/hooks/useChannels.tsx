import useGetChatrooms from "@/api/endpoints/chatroom/getChatrooms";
import useSelectedChatroomStore from "@/stores/selectedChatroomStore";
import { useEffect, useState } from "react";
import { Channel } from "@/types/chatroom";

const useChannels = () => {
  const chatrooms = useGetChatrooms();
  const { selectedChatroom, setSelectedChatroom } = useSelectedChatroomStore();
  const [channels, setChannels] = useState<Channel[]>([]);

  useEffect(() => {
    if (chatrooms.isLoading || !chatrooms.data?.chatrooms) {
      return;
    }
    if (selectedChatroom) {
      const selectedChatroomChannels = chatrooms.data?.chatrooms.find(
        (room) => room.chatroomId === selectedChatroom.chatroomId,
      )?.channels;
      setChannels(selectedChatroomChannels!);
    } else {
      setSelectedChatroom(chatrooms.data?.chatrooms[0]);
    }
  }, [selectedChatroom, chatrooms, setSelectedChatroom]);

  return channels;
};

export default useChannels;
