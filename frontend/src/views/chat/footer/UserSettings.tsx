import { ModeToggle } from "@/components/mode-toggle";
import useWidthStore from "@/stores/widthStore";
import SettingsDropdown from "./SettingsDropdown";
import { Bell } from "lucide-react";

function UserSettings() {
  const cardWidth = useWidthStore((state) => state.widths.rightbarWidth);
  const style = cardWidth ? { width: `${cardWidth}px` } : {};
  return (
    <>
      <div
        style={style}
        className="flex  flex-row items-center justify-center space-x-2 "
      >
        <div className="rounded-sm  hover:bg-muted">
          <Bell className="h-5 w-5" />
        </div>
        <div className="rounded-sm  hover:bg-muted">
          <ModeToggle />
        </div>

        <div className="rounded-sm  hover:bg-muted">
          <SettingsDropdown />
        </div>
      </div>
    </>
  );
}

export default UserSettings;
