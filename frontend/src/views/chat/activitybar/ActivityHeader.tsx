import { Separator } from "@/components/ui/separator";

//import { GitHubLogoIcon } from "@radix-ui/react-icons";

import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";

function ActivityHeader() {
  return (
    <>
      <div className="flex flex-col">
        <div className=" mx-2 flex h-16 items-center justify-center">
          <div className="rounded-sm p-2 hover:bg-muted">
            <GitHubLogoIcon className="h-5 w-5" />
          </div>
          <div className="rounded-sm p-2 hover:bg-muted">
            <LinkedInLogoIcon className="h-5 w-5" />
          </div>
        </div>
        <Separator className="mx-auto w-[99%]" />
      </div>
    </>
  );
}

export default ActivityHeader;
