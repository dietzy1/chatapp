import React, { useMemo, useRef } from "react";

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
  //const { format } = useFormatMessage();

  //My target ref for the bracing beam
  const targetElementRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const middleRef = useRef<HTMLDivElement>(null);
  useUpdateWidth(middleRef, "middleWidth");

  //scrollRef.current?.scrollIntoView({ behavior: "smooth" });

  //Different scenarios we must take care of.
  //On load we must fetch the last 25 messages
  //When we scroll to the top we must fetch the next 25 messages
  //We need to continuesly append new messages into the array of messages
  //We need to show a loading spinner when we are fetching new messages

  //If there is a big timestamp gap between messages we need to show a timestamp

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

  //Now we want to add timestamps inbetween messages if there is a day difference between them

  return (
    <>
      <div
        ref={middleRef}
        className="flex h-[90vh] flex-grow flex-col rounded-lg bg-background "
      >
        <Header />
        <div ref={targetElementRef} className="flex  overflow-y-auto p-10">
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
            <div ref={scrollRef}></div>
          </TracingBeam>
        </div>
      </div>
    </>
  );
}
export default MessageContainer;
