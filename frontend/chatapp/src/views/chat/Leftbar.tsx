import React from "react";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Channels from "./leftbar/Channels";
import Home from "./leftbar/Home";

import ChatroomsContainer from "./leftbar/ChatroomsContainer";
import ChannelsContainer from "./leftbar/ChannelsContainer";

interface LeftbarProps {}

function Leftbar({}: LeftbarProps): JSX.Element {
  //

  //const chatrooms = useGetChatrooms(user.data);

  return (
    <>
      <nav className="flex flex-row space-x-2">
        <ChatroomsContainer />

        <ChannelsContainer />
      </nav>
    </>
  );
}

export default Leftbar;
