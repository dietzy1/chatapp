import { Skeleton } from "@/components/ui/skeleton";
import { HashIcon } from "lucide-react";

function ChannelLoading() {
  return (
    <>
      <div className="mr-2 flex flex-row items-center rounded-sm p-2">
        <HashIcon className="mr-2 h-6 w-6 text-primary/10 " />
        <Skeleton className="h-6 w-[100px]" />
      </div>

      <div className="mr-2 flex flex-row items-center rounded-sm p-2">
        <HashIcon className="mr-2 h-6 w-6 text-primary/10 " />
        <Skeleton className="h-6 w-[120px]" />
      </div>

      <div className="mr-2 flex flex-row items-center rounded-sm p-2">
        <HashIcon className="mr-2 h-6 w-6 text-primary/10 " />
        <Skeleton className="h-6 w-[100px]" />
      </div>

      <div className="mr-2 flex flex-row items-center rounded-sm p-2">
        <HashIcon className="mr-2 h-6 w-6 text-primary/10 " />
        <Skeleton className="h-6 w-[80px]" />
      </div>

      <div className="mr-2 flex flex-row items-center rounded-sm p-2">
        <HashIcon className="mr-2 h-6 w-6 text-primary/10 " />
        <Skeleton className="h-6 w-[150px]" />
      </div>

      <div className="mr-2 flex flex-row items-center rounded-sm p-2">
        <HashIcon className="mr-2 h-6 w-6 text-primary/10 " />
        <Skeleton className="h-6 w-[80px]" />
      </div>
    </>
  );
}

export default ChannelLoading;
