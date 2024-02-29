import React from "react";
import { HashIcon } from "lucide-react";

interface ChannelProps {}

function Channel({}: ChannelProps) {
  return (
    <>
      <div className="mr-2 flex flex-row items-center rounded-sm hover:bg-muted">
        <HashIcon className="mr-2 h-8 w-8  text-primary " />
        <span className="truncate">Channelname which is fucking long</span>
      </div>
    </>
  );
}

export default Channel;
