import { Skeleton } from "@/components/ui/skeleton";

function ActivityLoading() {
  return (
    <>
      <div className="mb-2 flex flex-row items-center gap-x-4 rounded-sm hover:bg-muted">
        <div className="relative m-2">
          <Skeleton className="h-[50px] w-[50px] rounded-full" />
          <div className="text-foreground">
            <Skeleton className="w-[100px]" />
          </div>
        </div>
      </div>
    </>
  );
}
export default ActivityLoading;
