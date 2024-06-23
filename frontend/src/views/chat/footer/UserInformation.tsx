import { ChevronsUpDown } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import useWidthStore from "@/stores/widthStore";
import useGetUser from "@/api/endpoints/user/getUser";

function UserInformation(): JSX.Element {
  const { data, isLoading } = useGetUser();

  const cardWidth = useWidthStore((state) => state.widths.leftbarWidth);
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
        className="hidden  justify-start space-x-4 rounded-sm p-2 hover:bg-muted sm:flex"
      >
        <img className="h-14 w-14" src={data?.user?.iconSrc} />
        <div className="flex flex-col">
          <span className="text-lg font-medium">{data?.user?.username}</span>
          <span className="text-sm text-muted-foreground">
            #{data?.user?.description || "New guy"}
          </span>
        </div>
      </div>
    </>
  );
}

export default UserInformation;

{
  /*   <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="rounded-sm p-2 hover:bg-muted">
                <Settings className="h-5 w-5" />
                <ChannelHeaderDropdown />
              </div>
            </DropdownMenuTrigger>
          </DropdownMenu> */
}
