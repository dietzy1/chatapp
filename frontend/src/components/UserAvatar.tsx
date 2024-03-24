import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
  src: string;
  width?: number;
  height?: number;
}

function UserAvatar({ src, width, height }: UserAvatarProps): JSX.Element {
  const avatarClasses = `h-${height || "10"} w-${
    width || "10"
  } rounded-sm border-2 border-orange-400`;

  return (
    <>
      <Avatar className={avatarClasses}>
        <AvatarImage src={src} alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </>
  );
}

export default UserAvatar;
