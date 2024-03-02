import React from "react";
import { Settings, Github } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import useWidthStore from "@/stores/widthStore";

interface UserSettingsProps {}

function UserSettings({}: UserSettingsProps) {
  const cardWidth = useWidthStore((state) => state.rightbarWidth);
  const style = cardWidth ? { width: `${cardWidth}px` } : {};
  return (
    <>
      <div
        style={style}
        className="flex flex-row items-center justify-center space-x-2"
      >
        <Settings />
        <Github />
        <ModeToggle />
      </div>
    </>
  );
}

export default UserSettings;
