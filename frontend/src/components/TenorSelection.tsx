import { ImagePlayIcon } from "lucide-react";
import GifPicker, { Theme } from "gif-picker-react";
import "./TenorSelection.css";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TenorSelectionProps {
  handleSendGif: (url: string) => void;
}

function TenorSelection({ handleSendGif }: TenorSelectionProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ImagePlayIcon className="h-5 w-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="top"
        align="end"
        sideOffset={10}
        alignOffset={-100}
      >
        <GifPicker
          onGifClick={(gif) => handleSendGif(gif.url)}
          autoFocusSearch={false}
          theme={Theme.AUTO}
          tenorApiKey={"AIzaSyC4wcn4aGp48kxSjBeNqAtP_rAAO480ANo"}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default TenorSelection;
