import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useSelectedChatroomStore from "@/stores/selectedChatroomStore";
import { Chatroom } from "@/types/user";

interface ChatroomProps {
  chatroom: Chatroom;
}

function Chatroom({ chatroom }: ChatroomProps): JSX.Element {
  const store = useSelectedChatroomStore();

  //Select chatroom
  const selectChatroom = () => {
    store.setSelectedChatroom(chatroom);
  };

  return (
    <>
      <Tooltip>
        <TooltipTrigger className="flex items-center justify-center  rounded-sm p-1.5">
          <div
            className="flex h-14 w-14  rounded-sm hover:bg-muted "
            onClick={selectChatroom}
          >
            <AspectRatio
              ratio={1}
              className="item-center flex items-center justify-center"
            >
              <img src={chatroom.icon.link} className="h-12 w-12 rounded-sm " />
            </AspectRatio>
          </div>

          <TooltipContent side="right">
            <p>{chatroom.name}</p>
          </TooltipContent>
        </TooltipTrigger>
      </Tooltip>
    </>
  );
}

export default Chatroom;

/*   <TooltipTrigger>Hover</TooltipTrigger>
  <TooltipContent>
    <p>Add to library</p>
  </TooltipContent>
 */
