import React from "react";
import UserAvatar from "./UserAvatar";

import { ChevronsUpDown } from "lucide-react";
import useGetUser from "@/api/endpoints/user/getUser";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar } from "./ui/avatar";
import useWidthStore from "@/stores/widthStore";

interface UserInformationProps {}

function UserInformation({}: UserInformationProps): JSX.Element {
  const { data, error, isLoading } = useGetUser("hello");

  const cardWidth = useWidthStore((state) => state.leftbarWidth);
  const style = cardWidth ? { width: `${cardWidth}px` } : {};

  if (isLoading || error) {
    // Display a loading skeleton while data is being fetched
    return (
      <div className="flex space-x-4 rounded-sm p-1 hover:bg-muted">
        <Skeleton className="h-14 w-14 rounded-sm" />
        <div className="flex flex-col justify-center space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
        <ChevronsUpDown className="self-center" size={24} />
      </div>
    );
  }

  // Display the user information once the data is loaded
  return (
    <>
      <div
        style={style}
        className="flex space-x-4 rounded-sm p-1 hover:bg-muted "
      >
        <UserAvatar width={14} height={14} />
        <div className="flex flex-col">
          <div className="font-medium">{data?.name}</div>
          <div className="font-thin">#{data?.uuid}</div>
        </div>
        <ChevronsUpDown className="self-center" size={24} />
      </div>
    </>
  );
}

export default UserInformation;
