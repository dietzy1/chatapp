import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { CommandIcon } from "lucide-react";
import React from "react";

function SearchCommand() {
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

  const commandK = (
    <div className="flex items-center justify-center rounded-sm p-1 hover:bg-muted">
      <CommandIcon className="h-5 w-5" />
      <span className="text-center text-xs">k</span>
    </div>
  );

  return (
    <>
      <Input
        onClick={openSearch}
        type="text"
        placeholder="Search"
        inputMode="text"
        Node={commandK}
      />
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

export default SearchCommand;
