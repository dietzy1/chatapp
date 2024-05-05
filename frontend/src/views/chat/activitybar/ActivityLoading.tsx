import { Skeleton } from "@/components/ui/skeleton";

function ActivityLoading() {
  return (
    <>
      <div className="flex w-full grow flex-col items-start gap-2">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[100px]" />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[110px]" />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[70px]" />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[100px]" />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[80px]" />
          </div>
        </div>
      </div>
    </>
  );
}
export default ActivityLoading;
