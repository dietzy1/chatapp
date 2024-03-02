import { useEffect, useRef, useState } from "react";

import { SendHorizontal, ThumbsUp, Smile, CommandIcon } from "lucide-react";
import useFormatMessage from "@/hooks/useFormatMessage";
import { Input } from "./ui/input";
import useWidthStore from "@/stores/widthStore";

interface MessageInputProps {}

function MessageInput({}: MessageInputProps): JSX.Element {
  const [input, setInput] = useState<string>("");

  const sendMessage = () => {
    if (input.trim() !== "") {
      console.log(input);

      setInput("");
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      sendMessage();
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

  const cardWidth = useWidthStore((state) => state.middleWidth);
  const style = cardWidth ? { width: `${cardWidth}px` } : {};

  const { format } = useFormatMessage();

  return (
    <>
      <div
        style={style}
        className="flex  items-center  justify-center space-x-2"
      >
        <div className="flex items-center justify-center rounded-full p-1 hover:bg-muted">
          <CommandIcon />
          <span className="text-center">p</span>
        </div>
        <Input
          ref={inputRef}
          type="text"
          placeholder="Aa"
          inputMode="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleKeyPress}
          Icon={Smile}
        />

        <div className="rounded-full p-1 hover:bg-muted">
          {input.length > 0 ? (
            <SendHorizontal onClick={sendMessage} />
          ) : (
            <ThumbsUp className="" onClick={() => console.log("hello")} />
          )}
        </div>
      </div>
    </>
  );
}

export default MessageInput;
