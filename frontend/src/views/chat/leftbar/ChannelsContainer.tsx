import ChannelHeader from "./ChannelHeader";

import { ChevronDown } from "lucide-react";

import useChannels from "@/hooks/useChannels";
import React from "react";
import SelectChannel from "./SelectChannel";

function ChannelsContainer() {
  const channels = useChannels(); //use the value from the store to call the API for channels

  return (
    <>
      <div className="flex w-56 flex-grow flex-col rounded-lg bg-background">
        {/* <Card className="flex w-56 flex-grow flex-col"> */}
        <ChannelHeader />

        <div className="my-4 ml-3 flex flex-row">
          {/* <div className="ml-2 flex flex-row"> */}
          <ChevronDown className="mr-2 h-5 w-5 text-white " />
          <div className="text-gray-500">CHANNELS</div>
          {/* </div> */}
        </div>

        <div className="ml-3 space-y-3 overflow-y-auto">
          {channels.map((value) => (
            <React.Fragment key={value.channelId}>
              <SelectChannel channel={value} />
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
}

export default ChannelsContainer;
