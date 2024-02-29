import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
  width?: number;
  height?: number;
}

function UserAvatar({ width, height }: UserAvatarProps): JSX.Element {
  const avatarClasses = `h-${height || "10"} w-${
    width || "10"
  } rounded-sm border-2 border-orange-400`;

  return (
    <>
      <Avatar className={avatarClasses}>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </>
  );
}

export default UserAvatar;
