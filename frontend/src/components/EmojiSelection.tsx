import { Smile } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import "./EmojiSelection.css";

import EmojiPicker, { Theme } from "emoji-picker-react";

interface EmojiSelectionProps {
  handleAppendEmoji: (emoji: string) => void;
}

function EmojiSelection({ handleAppendEmoji }: EmojiSelectionProps) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Smile className="h-5 w-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="top"
          align="end"
          sideOffset={10}
          alignOffset={-65}
        >
          <EmojiPicker
            onEmojiClick={(emoji) => handleAppendEmoji(emoji.emoji)}
            autoFocusSearch={false}
            theme={Theme.DARK}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default EmojiSelection;
