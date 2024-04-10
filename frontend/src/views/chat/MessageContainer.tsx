import React, { useRef } from "react";
import LeftMessage from "../messages/LeftMessage";
import RightMessage from "../messages/RightMessage";
import Header from "@/components/Header";

import { TracingBeam } from "@/components/ui/tracing";
import useUpdateWidth from "@/hooks/useUpdateWidth";
import useWrappedWebsocket from "@/hooks/useWrappedWebsocket";

function MessageContainer(): JSX.Element {
  //const { format } = useFormatMessage();

  const temp = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  //My target ref for the bracing beam
  const targetElementRef = useRef<HTMLDivElement>(null);

  const middleRef = useRef<HTMLDivElement>(null);
  useUpdateWidth(middleRef, "middleWidth");

  useWrappedWebsocket();

  return (
    <>
      <div
        ref={middleRef}
        className="flex h-[90vh] flex-grow flex-col rounded-lg bg-background "
      >
        <Header />
        <div ref={targetElementRef} className="flex  overflow-y-auto p-10">
          <TracingBeam scrollContainerRef={targetElementRef}>
            {temp.map((_, index) => (
              <React.Fragment key={index}>
                <LeftMessage />
                <RightMessage />
              </React.Fragment>
            ))}
          </TracingBeam>
        </div>
      </div>
    </>
  );
}
export default MessageContainer;
