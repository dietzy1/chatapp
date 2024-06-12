import { useEffect, useRef, useState } from "react";

import { SendHorizontal, ThumbsUp, CommandIcon } from "lucide-react";
import { Input } from "./ui/input";
import useWidthStore from "@/stores/widthStore";
import useWrappedWebsocket from "@/hooks/useWrappedWebsocket";
import TenorSelection from "./TenorSelection";
import EmojiSelection from "./EmojiSelection";

function MessageInput(): JSX.Element {
  const [input, setInput] = useState<string>("");

  const { sendMessage } = useWrappedWebsocket();

  const handleSendMessage = () => {
    if (input.trim() !== "") {
      console.log(input);
      sendMessage("MESSAGE", input);

      setInput("");
    }
  };

  const handleThumbsUp = () => {
    sendMessage("MESSAGE", "👍");
  };

  const handleSendGif = (url: string) => {
    sendMessage("GIF", url);
  };

  const handleAppendEmoji = (emoji: string) => {
    setInput((prevInput) => prevInput + emoji);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Check if the Command (Mac) or Ctrl (Windows/Linux) key is pressed and the key pressed is "p"
      if ((event.metaKey || event.ctrlKey) && event.key === "p") {
        // Prevent the default behavior of the browser for the "Command+P" or "Ctrl+P" shortcut
        event.preventDefault();

        // Focus on the specific input field
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    };

    // Add the event listener when the component mounts
    window.addEventListener("keydown", handleKeyPress);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const cardWidth = useWidthStore((state) => state.widths.middleWidth);
  const style = cardWidth ? { width: `${cardWidth}px` } : {};

  return (
    <>
      <div
        style={style}
        className="flex  items-center  justify-center space-x-2 "
      >
        <div className="hidden items-center justify-center rounded-sm p-1 hover:bg-muted sm:flex">
          <CommandIcon />
          <span className="text-center text-xs">p</span>
        </div>
        <Input
          ref={inputRef}
          type="text"
          placeholder="Aa"
          inputMode="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleKeyPress}
          EmojiPicker={<EmojiSelection handleAppendEmoji={handleAppendEmoji} />}
          TenorPicker={<TenorSelection handleSendGif={handleSendGif} />}
        />

        <div className="rounded-sm p-2 hover:bg-muted">
          {input.length > 0 ? (
            <SendHorizontal className="h-5 w-5" onClick={handleSendMessage} />
          ) : (
            <ThumbsUp className="h-5 w-5" onClick={handleThumbsUp} />
          )}
        </div>
      </div>
    </>
  );
}

export default MessageInput;
