import React from "react";
import ChannelHeader from "./ChannelHeader";
import { Card } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import Channel from "./Channel";

interface ChannelsContainerProps {}

function ChannelsContainer({}: ChannelsContainerProps) {
  const channels = [1, 2, 3];

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

        <div className="ml-3 space-y-3">
          {channels.map((channel, i) => (
            <>
              <Channel key={i} />
            </>
          ))}
        </div>
        {/* </Card> */}
      </div>
    </>
  );
}

export default ChannelsContainer;
