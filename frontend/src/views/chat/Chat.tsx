import Footer from "./Footer";

import MessageContainer from "./MessageContainer";
import ActivityContainer from "./ActivityContainer";
import ChatroomContainer from "./Leftbar";

import { useSwipeable } from "react-swipeable";
//import useIsMobile from "@/hooks/useIsMobile";

function Chat(): JSX.Element {
  //const isMobile = useIsMobile();

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      //setShowChatroom(false);
    },
    onSwipedRight: () => {
      //setShowChatroom(true);
    },
  });

  //We need to hide certain easter eggs within all of the loading elements etc for example the github and linked in icons could we put as servers
  //Servers could be my skillsets
  //Messages should contain an occational meme GIF
  //Chatroom could be the typewriter effect?
  

  return (
    <>
      <div
        {...handlers}
        className=" flex h-[100vh] w-full flex-col bg-neutral-50 pb-1 dark:bg-black sm:p-2"
      >
        <div className="flex flex-row sm:space-x-2">
          <ChatroomContainer />
          <MessageContainer />
          <ActivityContainer />
        </div>
        <Footer />
      </div>
    </>
  );
}
export default Chat;

{
  /* <div className={`flex h-screen max-h-screen flex-col bg-neutral-50 p-2 pb-1 dark:bg-black ${isMobile ? 'overflow-x-auto' : ''}`}>
      <div className="flex flex-row space-x-2 ">
        <div className={showChatroom ? 'flex transition-all duration-500' : 'hidden'} style={{ transform: showChatroom ? 'translateX(0)' : 'translateX(-100%)' }}>
          <ChatroomContainer />
        </div>
        <div className={!showChatroom ? 'flex transition-all duration-500' : 'hidden'} style={{ transform: !showChatroom ? 'translateX(0)' : 'translateX(100%)' }}>
          <MessageContainer />
        </div>
        {!isMobile && <ActivityContainer />}
      </div>
      <Footer />
    </div> */
}
