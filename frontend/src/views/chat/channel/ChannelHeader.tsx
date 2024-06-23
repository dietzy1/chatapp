import { Separator } from "@/components/ui/separator";
import { ChevronDown } from "lucide-react";
import ChannelHeaderDropdown from "./ChannelHeaderDropdown";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useSelectedChatroomStore from "@/stores/selectedChatroomStore";

function ChannelHeader() {
  const { selectedChatroom } = useSelectedChatroomStore();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex h-16 items-center justify-between rounded-sm p-4 tracking-widest hover:bg-muted ">
            <span>{selectedChatroom?.name || "Javascript haters"} </span>
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
