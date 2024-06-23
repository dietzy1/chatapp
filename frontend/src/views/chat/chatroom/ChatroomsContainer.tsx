import { Skeleton } from "@/components/ui/skeleton";
import Home from "./Home";
import useGetChatrooms from "@/api/endpoints/chatroom/getChatrooms";
import React from "react";
import SelectChatroom from "./SelectChatroom";
import SearchChatrooms from "./SearchChatrooms";
import ExpandChatrooms from "./ExpandChatrooms";

function ChatroomsContainer() {
  const { data, isLoading, error } = useGetChatrooms();

  const [expandChatrooms, setExpandChatrooms] = React.useState(true);

  return (
    <>
      <div className="flex flex-col space-y-2 ">
        <div className=" rounded-lg bg-background">
          <Home expanded={expandChatrooms} />
          <SearchChatrooms expanded={expandChatrooms} />
        </div>

        <div className="   flex-grow space-y-4 overflow-y-auto rounded-lg bg-background align-middle">
          <ExpandChatrooms
            expanded={expandChatrooms}
            setExpanded={setExpandChatrooms}
          />
          {isLoading || error || !data ? (
            <>
              <Skeleton className="m-1.5 h-14 w-14 rounded-sm" />
              <Skeleton className="m-1.5 h-14 w-14 rounded-sm" />
              <Skeleton className="m-1.5 h-14 w-14 rounded-sm" />
              <Skeleton className="m-1.5 h-14 w-14 rounded-sm" />
              <Skeleton className="m-1.5 h-14 w-14 rounded-sm" />
              <Skeleton className="m-1.5 h-14 w-14 rounded-sm" />
              <Skeleton className="m-1.5 h-14 w-14 rounded-sm" />
            </>
          ) : (
            <>
              {data?.chatrooms.map((value) => (
                <React.Fragment key={value.chatroomId}>
                  <SelectChatroom chatroom={value} expanded={expandChatrooms} />
                </React.Fragment>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ChatroomsContainer;
