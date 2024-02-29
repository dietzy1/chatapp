import React from "react";
import { Separator } from "@/components/ui/separator";
interface HeaderProps {}

function Header({}: HeaderProps): JSX.Element {
  return (
    <>
      <div className="mx-auto flex h-16 w-full items-center justify-center rounded-sm ">
        <div className="flex  items-center justify-center rounded-sm  hover:bg-muted">
          Channelheader super long name
        </div>
      </div>
      <Separator className="" />
    </>
  );
}

export default Header;
