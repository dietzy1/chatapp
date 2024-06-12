import React, { useEffect, useMemo, useRef } from "react";

import Header from "@/components/Header";

import { TracingBeam } from "@/components/ui/tracing";
import useUpdateWidth from "@/hooks/useUpdateWidth";
import MessageLayout from "./messages/MessageLayout";
import MessageDevider from "./messages/MessageDevider";
import MessageLoading from "./messages/MessageLoading";
import useMessageStore from "@/stores/messageStore";
import useGetUsers from "@/api/endpoints/user/getUsers";
import { User } from "@/types/user";
import useGetUser from "@/api/endpoints/user/getUser";

function MessageContainer(): JSX.Element {
  const targetElementRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const middleRef = useRef<HTMLDivElement>(null);
  useUpdateWidth(middleRef, "middleWidth");

  const { messages } = useMessageStore();
  const user = useGetUser();
  const users = useGetUsers();

  const userMap = useMemo(
    () =>
      users.data?.users.reduce<Record<string, User>>((acc, user) => {
        acc[user.userId] = user;
        return acc;
      }, {}) || {},
    [users],
  );

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages]);

  //Scroll to bottom on load using useLayout Effect
  /*   useLayoutEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [scrollRef, messages]); */

  return (
    <>
      <div
        ref={middleRef}
        className="flex h-[90dvh] flex-grow  flex-col rounded-lg bg-background "
      >
        <Header />

        <div
          ref={targetElementRef}
          className="flex  h-full flex-col overflow-y-auto p-4"
        >
          <TracingBeam scrollContainerRef={targetElementRef}>
            {messages.length === 0 && <MessageLoading />}
            {messages.map((value) => (
              <React.Fragment key={value.message[0].messageId}>
                {value.dayDifference && (
                  <MessageDevider timestamp="Yesterday at 19:48" />
                )}
                <MessageLayout
                  message={value}
                  user={userMap[value.message[0].userId]}
                  align={
                    user.data?.user.userId === value.message[0].userId
                      ? "right"
                      : "left"
                  }
                />
              </React.Fragment>
            ))}
            <div ref={scrollRef} style={{ height: 10 }} />
          </TracingBeam>
        </div>  
      </div>
    </>
  );
}
export default MessageContainer;
