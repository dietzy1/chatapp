import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Settings } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import SearchCommand from "./SearchCommand";
import ChannelHeaderDropdown from "../leftbar/ChannelHeaderDropdown";

function ActivityHeader() {
  const isAuthenticated = false;

  return (
    <>
      <div className="flex flex-col">
        <div className="items mx-2 flex h-16 items-center justify-end">
          <SearchCommand />

          {/*      <div className="rounded-sm p-2 hover:bg-muted">
            <GitHubLogoIcon className="h-5 w-5" />
          </div> */}

          <div className="rounded-sm  hover:bg-muted">
            <ModeToggle />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="rounded-sm p-2 hover:bg-muted">
                <Settings className="h-5 w-5" />
                <ChannelHeaderDropdown />
              </div>
            </DropdownMenuTrigger>
          </DropdownMenu>

          {/*           <Tooltip>
            <TooltipTrigger>
              <Settings />
              <TooltipContent>Settings</TooltipContent>
            </TooltipTrigger>
          </Tooltip> */}
        </div>
        <Separator className="mx-auto w-[99%]" />
      </div>
    </>
  );
}

export default ActivityHeader;

{
  /* <Tooltip>
<TooltipTrigger className="mx-auto flex items-center justify-center  rounded-sm p-1.5 ">
  <div
    className="flex h-14 w-14 items-center justify-center rounded-sm hover:bg-muted "
    onClick={openSearch}
  >
    <div className="flex items-center justify-center">
      <CommandIcon size={20} />
      <span className="text-xl">k</span>
    </div>
  </div>

  <TooltipContent side="right">
    <p>Search</p>
  </TooltipContent>
</TooltipTrigger> */
}
