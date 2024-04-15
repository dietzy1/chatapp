import useGetUser from "@/api/endpoints/user/getUser";

import useActivityStore from "@/stores/activityStore";
import useMessageStore from "@/stores/messageStore";
import useSelectedChatroomStore from "@/stores/selectedChatroomStore";
import {
  ActivityEvent,
  CreateMessageEvent,
  RecieveMessageEvent,
} from "@/types/message";

import { useState, useCallback, useEffect } from "react";
import useWebSocket from "react-use-websocket";

interface Packet {
  kind: string;
  payload: CreateMessageEvent | RecieveMessageEvent | ActivityEvent;
}

//Kind = "1"

type QueryParams = {
  chatroomId?: string;
  channelId?: string;
  userId?: string;
};

const useWrappedWebsocket = () => {
  const store = useSelectedChatroomStore();

  const { addActivity } = useActivityStore();
  const { addMessage, clearMessages } = useMessageStore();

  const { data } = useGetUser();

  const [socketUrl] = useState("ws://localhost:9080/ws");

  const queryParams: QueryParams = {
    userId: data?.user.userId,
    chatroomId: store.selectedChatroom?.chatroomId,
    channelId: store.selectedChannel?.channelId,
  };

  const { sendJsonMessage, lastMessage } = useWebSocket(
    socketUrl,
    {
      queryParams: queryParams,
    },
    !!queryParams.chatroomId && !!queryParams.channelId && !!queryParams.userId,
  );

  //We should clear messages when we change chatroom
  useEffect(() => {
    console.log("Clearing messages");
    clearMessages();
  }, [store.selectedChatroom, store.selectedChannel, clearMessages]);

  //I should handle the grouping of messages here aswell
  useEffect(() => {
    if (lastMessage !== null) {
      console.log("We recieved something", lastMessage);

      //Handle the different kinds of packets
      try {
        const packet: Packet = JSON.parse(lastMessage.data);

        switch (packet.kind) {
          case "2": {
            //Recieve message event
            const recieveMessageEvent = packet.payload as RecieveMessageEvent;
            console.log("Recieved real message", recieveMessageEvent);

            addMessage(recieveMessageEvent);

            break;
          }
          case "3":
            //Activity event
            {
              const activityEvent = packet.payload as ActivityEvent;
              console.log("Recieved activity event", activityEvent);

              //Update the activity store
              addActivity(activityEvent.activeUsers);
            }

            break;
          default:
            console.error("Invalid packet kind");
        }
      } catch (error) {
        console.error("Error parsing packet", error);
      }
    }
  }, [lastMessage, addMessage, addActivity]);

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
