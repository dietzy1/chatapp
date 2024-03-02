import UserAvatar from "@/components/UserAvatar";
import React from "react";

interface OnlineProps {}

function Online({}: OnlineProps) {
  const onlineUser = {
    name: "User",
    icon: {
      link: "https://avatars.githubusercontent.com/u/76659596?v=4",
    },
  };

  return (
    <>
      <div className="w-56 break-all shadow-inner">
        <div className="mb-2 flex flex-row items-center  rounded-sm hover:bg-muted">
          <div className="relative m-2">
            <UserAvatar />
            <div className="z-2 absolute bottom-0  right-0 rounded-full bg-green-500 p-1.5" />
          </div>
          <div className="text-gray-500"> {onlineUser.name}</div>
        </div>
      </div>
    </>
  );
}

export default Online;
