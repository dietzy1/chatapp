import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Search from "./Search";
import Home from "./Home";
import useGetUser from "@/api/endpoints/user/getUser";
import Chatroom from "./Chatroom";

interface ChatroomsContainerProps {}

function ChatroomsContainer({}: ChatroomsContainerProps) {
  const user = useGetUser("hello");

  return (
    <>
      <div className="flex flex-col space-y-2">
        {/* <Card className=""> */}
        <div className="rounded-lg bg-background">
          <Home />
          <Search />
        </div>
        {/* </Card> */}

        {/*         <Card className="flex flex-grow flex-col space-y-4 p-2 align-middle"> */}
        <div className="flex flex-grow flex-col space-y-4 rounded-lg bg-background p-2 align-middle">
          {user.isLoading || user.error ? (
            <>
              <Skeleton className="h-14 w-14 rounded-sm" />
              <Skeleton className="h-14 w-14 rounded-sm" />
              <Skeleton className="h-14 w-14 rounded-sm" />
              <Skeleton className="h-14 w-14 rounded-sm" />
              <Skeleton className="h-14 w-14 rounded-sm" />
            </>
          ) : (
            <>
              {user.data?.chatServers.map((chatroom, i) => (
                <>
                  <Chatroom key={i} />
                </>
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
