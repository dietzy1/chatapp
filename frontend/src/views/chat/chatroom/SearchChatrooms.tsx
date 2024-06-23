import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Search } from "lucide-react";

interface SearchChatroomsProps {
  expanded: boolean;
}

function SearchChatrooms({ expanded }: SearchChatroomsProps): JSX.Element {
  if (expanded) {
    return (
      <div className="mx-auto flex min-w-72 items-center  justify-start rounded-sm p-1.5">
        <div className="flex h-14 w-14 items-center justify-center rounded-sm hover:bg-muted ">
          <Search size={24} />
        </div>
        <div className=" tracking-widest">Search</div>
      </div>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger className="mx-auto flex items-center justify-center  rounded-sm p-1.5 ">
        <div className="flex h-14 w-14 items-center justify-center rounded-sm hover:bg-muted ">
          <Search size={24} />
        </div>

        <TooltipContent side="right">
          <p>Search your chatrooms</p>
        </TooltipContent>
      </TooltipTrigger>
    </Tooltip>
  );
}

export default SearchChatrooms;
