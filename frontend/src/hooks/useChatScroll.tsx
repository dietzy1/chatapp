/* import { useState, useEffect } from "react";

const useAutoScroll = (chatWindowRef, messages) => {
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

  useEffect(() => {
    const chatWindow = chatWindowRef.current;
    if (!chatWindow) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = chatWindow;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight;
      setShouldAutoScroll(isAtBottom);
    };

    chatWindow.addEventListener("scroll", handleScroll);

    return () => {
      chatWindow.removeEventListener("scroll", handleScroll);
    };
  }, [chatWindowRef]);

  useEffect(() => {
    const chatWindow = chatWindowRef.current;
    if (!chatWindow) return;

    if (shouldAutoScroll) {
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }
  }, [messages, shouldAutoScroll, chatWindowRef]);

  return chatWindowRef;
};

export default useAutoScroll; */
