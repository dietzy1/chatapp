import { Skeleton } from "@/components/ui/skeleton";
import Home from "./Home";
//import useGetUser from "@/api/endpoints/user/getUser";
import Chatroom from "./Chatroom";

import useGetChatrooms from "@/api/endpoints/chatroom/getChatrooms";
import React from "react";

function ChatroomsContainer() {
  const { data, isLoading, error } = useGetChatrooms();

  return (
    <>
      <div className="flex flex-col space-y-2">
        <div className="rounded-lg bg-background">
          <Home />
          {/* <Search /> */}
        </div>

        {/*         <Card className="flex flex-grow flex-col space-y-4 p-2 align-middle"> */}
        <div className=" flex-grow space-y-4 overflow-y-auto rounded-lg bg-background p-2 align-middle">
          {isLoading || error ? (
            <>
              <Skeleton className="h-14 w-14 rounded-sm" />
              <Skeleton className="h-14 w-14 rounded-sm" />
              <Skeleton className="h-14 w-14 rounded-sm" />
              <Skeleton className="h-14 w-14 rounded-sm" />
              <Skeleton className="h-14 w-14 rounded-sm" />
              <Skeleton className="h-14 w-14 rounded-sm" />
              <Skeleton className="h-14 w-14 rounded-sm" />
              <Skeleton className="h-14 w-14 rounded-sm" />
              <Skeleton className="h-14 w-14 rounded-sm" />
            </>
          ) : (
            <>
              {data?.chatrooms.map((value) => (
                <React.Fragment key={value.chatroomId}>
                  <Chatroom chatroom={value} />
                </React.Fragment>
              ))}
            </>
          )}
        </div>
        {/* </Card> */}
      </div>
    </>
  );
}

export default ChatroomsContainer;
