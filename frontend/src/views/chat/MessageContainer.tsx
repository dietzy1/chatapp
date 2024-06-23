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
import NewMessagesSince from "./messages/NewMessagesSince";
import useAutoScroll from "@/hooks/useNewAutoScroll";

function MessageContainer(): JSX.Element {
  const middleRef = useRef<HTMLDivElement>(null);
  useUpdateWidth(middleRef, "middleWidth");
  const {
    targetElementRef,
    isAutoScrollEnabled,
    scrollToBottom,
    newMessagesCount,
  } = useAutoScroll();

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

  return (
    <>
      <div
        ref={middleRef}
        className="flex h-[90dvh] flex-grow  flex-col rounded-lg bg-background "
      >
        <Header />
        {/*  {!isAutoScrollEnabled && (
          <>
            <NewMessagesSince
              amount={newMessagesCount}
              date="Yesterday at 19:48"
            />
          </>
        )} */}

        <div
          ref={targetElementRef}
          className=" mb-6 flex h-full flex-col overflow-y-auto p-4"
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
          </TracingBeam>
        </div>
      </div>
    </>
  );
}
export default MessageContainer;
