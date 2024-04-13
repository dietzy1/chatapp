import React, { useRef } from "react";

import Header from "@/components/Header";

import { TracingBeam } from "@/components/ui/tracing";
import useUpdateWidth from "@/hooks/useUpdateWidth";
import useWrappedWebsocket from "@/hooks/useWrappedWebsocket";
import MessageLayout from "./messages/MessageLayout";
import MessageDevider from "./messages/MessageDevider";

function MessageContainer(): JSX.Element {
  //const { format } = useFormatMessage();

  const temp = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  //My target ref for the bracing beam
  const targetElementRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const middleRef = useRef<HTMLDivElement>(null);
  useUpdateWidth(middleRef, "middleWidth");

  //scrollRef.current?.scrollIntoView({ behavior: "smooth" });

  useWrappedWebsocket();

  //Different scenarios we must take care of.
  //On load we must fetch the last 25 messages

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
                <MessageLayout align="right" />
                <MessageLayout align="left" />
                <MessageDevider timestamp="Yesterday at 19:48" />
              </React.Fragment>
            ))}
            <div ref={scrollRef}></div>
          </TracingBeam>
        </div>
      </div>
    </>
  );
}
export default MessageContainer;
