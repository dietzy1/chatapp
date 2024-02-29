import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Hash } from "lucide-react";

interface ChatroomAvatarProps {
  tooltip: string;
}

function ChatroomAvatar({ tooltip }: ChatroomAvatarProps): JSX.Element {
  return (
    <>
      <Tooltip>
        <TooltipTrigger className="flex items-center justify-center  rounded-sm p-1.5">
          <div className="rounded-sm">
            <Hash size={46} />
          </div>

          <TooltipContent side="right">
            <p>{tooltip}</p>
          </TooltipContent>
        </TooltipTrigger>
      </Tooltip>
    </>
  );
}

export default ChatroomAvatar;
