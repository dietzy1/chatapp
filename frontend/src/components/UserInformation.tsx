import { ChevronsUpDown } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import useWidthStore from "@/stores/widthStore";
import useGetUser from "@/api/endpoints/user/getUser";

function UserInformation(): JSX.Element {
  //const { data, error, isLoading } = useGetUser("hello");
  const { data, isLoading } = useGetUser();

  const cardWidth = useWidthStore((state) => state.widths.leftbarWidth);
  console.log("LeftbarWidth", cardWidth);
  const style = cardWidth ? { width: `${cardWidth}px` } : {};

  if (isLoading) {
    // Display a loading skeleton while data is being fetched
    return (
      <div className="hidden flex-grow space-x-4 rounded-sm p-1 hover:bg-muted sm:flex">
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
        className="hidden space-x-4 rounded-sm p-1 hover:bg-muted sm:flex"
      >
        <img className="h-14 w-14" src={data?.user?.icon.link} />
        {/* <UserAvatar  width={14} height={14} /> */}
        <div className="flex flex-col">
          <div className="font-medium">{data?.user?.username}</div>
          <div className="font-thin">#{data?.user?.description}</div>
        </div>
        <ChevronsUpDown className="self-center" size={24} />
      </div>
    </>
  );
}

export default UserInformation;
