import ChatroomAvatar from "@/components/ChatroomAvatar";

interface ChatroomProps {}

function Chatroom({}: ChatroomProps): JSX.Element {
  return (
    <>
      <ChatroomAvatar tooltip="Chatroom" />
    </>
  );
}

export default Chatroom;

/*   <TooltipTrigger>Hover</TooltipTrigger>
  <TooltipContent>
    <p>Add to library</p>
  </TooltipContent>
 */
