import { HashIcon } from "lucide-react";
import { Channel } from "@/types/user";
import useSelectedChatroomStore from "@/stores/selectedChatroomStore";

interface ChannelProps {
  channel: Channel;
}

function Channel({ channel }: ChannelProps) {
  const { selectedChannel, setSelectedChannel } = useSelectedChatroomStore();

  if (channel.channelId === selectedChannel?.channelId) {
    return (
      <>
        <div className="mr-2 flex flex-row items-center rounded-sm bg-muted p-2">
          <HashIcon className="mr-2 h-6 w-6  text-foreground" />
          <span
            onClick={() => setSelectedChannel(channel)}
            className="truncate text-foreground"
          >
            {channel.name}
          </span>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="mr-2 flex flex-row items-center rounded-sm hover:bg-muted">
        <HashIcon className="mr-2 h-8 w-8  text-primary " />
        <span onClick={() => setSelectedChannel(channel)} className="truncate">
          {channel.name}
        </span>
      </div>
    </>
  );
}

export default Channel;
