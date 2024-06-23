import { HashIcon } from "lucide-react";
import { Channel } from "@/types/chatroom";

import useSelectedChatroomStore from "@/stores/selectedChatroomStore";

interface SelectChannelProps {
  channel: Channel;
}

function SelectChannel({ channel }: SelectChannelProps) {
  const { selectedChannel, setSelectedChannel } = useSelectedChatroomStore();

  if (channel.channelId === selectedChannel?.channelId) {
    return (
      <>
        <div
          onClick={() => setSelectedChannel(channel)}
          className="mr-2 flex flex-row items-center rounded-sm bg-muted p-2"
        >
          <HashIcon className="mr-2 h-6 w-6  text-primary" />
          <span className="truncate text-foreground">{channel.name}</span>
        </div>
      </>
    );
  }

  return (
    <>
      <div
        onClick={() => setSelectedChannel(channel)}
        className="mr-2 flex flex-row items-center rounded-sm p-2 hover:bg-muted"
      >
        <HashIcon className="mr-2 h-6 w-6  text-primary " />
        <span className="truncate">{channel.name}</span>
      </div>
    </>
  );
}

export default SelectChannel;
