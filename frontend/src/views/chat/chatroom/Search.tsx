import React from "react";
import { CommandIcon, SearchIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";

function Search() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const openSearch = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen((open) => !open);
  };

  return (
    <>
      {/*  <div
        className="flex h-14 w-14 items-center justify-center rounded-sm hover:bg-muted "
        onClick={openSearch}
      >
        <div className="flex items-center justify-center">
          <CommandIcon size={20} />
          <span className="text-xl">k</span>
        </div>
      </div> */}

      <div className="flex">
        <Input
          type="text"
          placeholder="Search"
          inputMode="text"
          /* value={input}
        onChange={(event) => setInput(event.target.value)}
        onKeyDown={handleKeyPress} */
          Icon={CommandIcon}
        />
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
            <CommandItem>Calculator</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

export default Search;

/* 
function Search() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const openSearch = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen((open) => !open);
  };

  return (
    <>
      <Tooltip>
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
        </TooltipTrigger>
      </Tooltip>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
            <CommandItem>Calculator</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

export default Search;
 */
