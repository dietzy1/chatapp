import { Separator } from "@/components/ui/separator";

interface ActivityHeaderProps {}

function ActivityHeader({}: ActivityHeaderProps) {
  return (
    <>
      <div className="h-16 ">Activity bar :/</div>
      <Separator className="mx-auto w-11/12" />
    </>
  );
}

export default ActivityHeader;
