import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ListCollapse, Plus } from "lucide-react";

interface ExpandChatroomsProps {
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
}

function ExpandChatrooms({
  expanded,
  setExpanded,
}: ExpandChatroomsProps): JSX.Element {
  {
    /*Expand list-collapse + Your servers + create new server button */
  }

  if (expanded) {
    return (
      <>
        <div className="mx-auto flex  items-center  justify-start rounded-sm p-1.5">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-sm hover:bg-muted "
            onClick={() => setExpanded(false)}
          >
            <ListCollapse size={24} />
          </div>
          <div className="tracking-widest">Your chatrooms</div>
          <Tooltip>
            <TooltipTrigger className="ml-auto flex h-14 w-14 items-center justify-center rounded-sm hover:bg-muted ">
              <Plus size={24} />
            </TooltipTrigger>

            <TooltipContent side="right">
              <p>Create new chatroom</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </>
    );
  }

  return (
    <>
      <Tooltip>
        <TooltipTrigger className="mx-auto flex items-center justify-center  rounded-sm p-1.5 ">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-sm hover:bg-muted "
            onClick={() => setExpanded(true)}
          >
            <ListCollapse size={24} />
          </div>

          <TooltipContent side="right">
            <p>Expand your chatrooms</p>
          </TooltipContent>
        </TooltipTrigger>
      </Tooltip>
    </>
  );
}

export default ExpandChatrooms;
