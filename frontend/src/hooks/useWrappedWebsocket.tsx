import useGetUser from "@/api/endpoints/user/getUser";
import useActivityStore from "@/stores/activityStore";
import useMessageStore from "@/stores/messageStore";
import useSelectedChatroomStore from "@/stores/selectedChatroomStore";
import { useState, useCallback, useEffect } from "react";
import useWebSocket from "react-use-websocket";

interface Packet {
  kind: string;
  payload: CreateMessageEvent | RecieveMessageEvent | ActivityEvent;
}

//Kind = "1"
interface CreateMessageEvent {
  channelId: string;
  chatroomId: string;
  userId: string;
  content: string;
}

//Kind = "2"
interface RecieveMessageEvent {
  messageId: string;
  channelId: string;
  chatroomId: string;
  userId: string;
  content: string;
  createdAt: string;
}

//Kind = "3"
interface ActivityEvent {
  activeUsers: string[];
}

type QueryParams = {
  chatroomId?: string;
  channelId?: string;
  userId?: string;
};

const useWrappedWebsocket = () => {
  const store = useSelectedChatroomStore();

  const activityStore = useActivityStore();
  const messageStore = useMessageStore();

  const { data } = useGetUser();

  const [socketUrl] = useState("ws://localhost:9080/ws");

  const queryParams: QueryParams = {
    userId: data?.user.userId,
    chatroomId: store.selectedChatroom?.chatroomId,
    channelId: store.selectedChannel?.channelId,
  };

  //I need to find out if query params like this correctly forces the websocket to reconnect
  const { sendJsonMessage, lastMessage } = useWebSocket(
    socketUrl,
    {
      queryParams: queryParams,
    },
    true,
  );

  useEffect(() => {
    if (lastMessage !== null) {
      console.log("We recieved something", lastMessage);

      //Handle the different kinds of packets
      const packet: Packet = JSON.parse(lastMessage.data);
      console.log(packet);
    }
  }, [lastMessage]);

  //Wrap sendJsonMessage
  const sendMessage = useCallback(
    (content: string) => {
      //If either the selected channel or chatroom is null, return
      if (!store.selectedChannel || !store.selectedChatroom) {
        console.error("No selected channel or chatroom");
        return;
      }
      //Return on the user or data being null
      if (!data?.user) {
        console.error("No user");
        return;
      }

      const packet: Packet = {
        kind: "1",
        payload: {
          channelId: store.selectedChannel?.channelId,
          chatroomId: store.selectedChatroom?.chatroomId,
          userId: data?.user.userId,
          content: content,
        },
      };
      sendJsonMessage(packet);
    },
    [
      sendJsonMessage,
      store.selectedChannel,
      store.selectedChatroom,
      data?.user,
    ],
  );

  return {
    sendMessage,
  };
};

export default useWrappedWebsocket;
