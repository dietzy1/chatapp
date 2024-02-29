import UserAvatar from "@/components/UserAvatar";
import React from "react";

interface RightMessageProps {}

function RightMessage({}: RightMessageProps) {
  return (
    <>
      <div className=" flex  flex-row-reverse overflow-y-auto">
        <UserAvatar />
        <div className="px-2">
          <div className="text-right text-lg">Bob</div>
          <div className=" ml-auto flex max-w-[75%] flex-col gap-2 rounded-lg bg-primary   box-decoration-clone  px-3 py-2 text-sm text-primary-foreground">
            I fuckking hate javascript
          </div>
        </div>
      </div>
    </>
  );
}

export default RightMessage;

<section className=" flex flex-row space-x-2 overflow-y-auto">
  <UserAvatar />
  <div className="">
    <div className="inline-block text-lg">Bob</div>

    <div className=" max-w-[75%] text-wrap break-words rounded-lg bg-muted px-3 py-2 text-sm">
      My name is bob and this is a message
    </div>
  </div>
</section>;
