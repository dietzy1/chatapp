import { useRef } from "react";

import ChatroomsContainer from "./leftbar/ChatroomsContainer";
import ChannelsContainer from "./leftbar/ChannelsContainer";
import useUpdateWidth from "@/hooks/useUpdateWidth";

function ChatroomContainer(): JSX.Element {
  //

  //const chatrooms = useGetChatrooms(user.data);
  const leftbarRef = useRef<HTMLDivElement>(null);
  useUpdateWidth(leftbarRef, "leftbarWidth");

  return (
    <>
      <div
        ref={leftbarRef}
        className="hidden h-[90vh] flex-row space-x-4 lg:flex"
      >
        <ChatroomsContainer />
        <ChannelsContainer />
      </div>
    </>
  );
}

export default ChatroomContainer;
