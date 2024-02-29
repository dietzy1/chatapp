import React from "react";

import { Separator } from "@/components/ui/separator";
import { ChevronDown } from "lucide-react";
import ChannelHeaderDropdown from "./ChannelHeaderDropdown";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
interface ChannelHeaderProps {}

function ChannelHeader({}: ChannelHeaderProps) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex h-16 items-center justify-between rounded-sm p-4 hover:bg-muted">
            <span>Bobs Chatserver</span>
            <ChevronDown className="h-5 w-5" />
            <ChannelHeaderDropdown />
          </div>
        </DropdownMenuTrigger>
      </DropdownMenu>
      <Separator className="mx-auto w-11/12" />
    </>
  );
}

export default ChannelHeader;
