import { useEffect, useState, useRef } from "react";
import useMessageStore from "@/stores/messageStore";

function useAutoScroll() {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(true);
  const [newMessagesCount, setNewMessagesCount] = useState(0);
  const targetElementRef = useRef<HTMLDivElement>(null);
  const { messages } = useMessageStore();

  useEffect(() => {
    const scrollToBottom = (smooth: boolean) => {
      if (targetElementRef.current && isAutoScrollEnabled) {
        if (smooth) {
          targetElementRef.current.scrollTo({
            top: targetElementRef.current.scrollHeight,
            behavior: "smooth",
          });
        } else {
          targetElementRef.current.scrollTop =
            targetElementRef.current.scrollHeight;
        }
      }
    };

    const handleScroll = () => {
      if (isInitialLoad) {
        setIsInitialLoad(false);
        scrollToBottom(false); // Immediate scroll on initial load
      } else {
        scrollToBottom(true); // Smooth scroll on subsequent updates
      }
    };

    handleScroll();
  }, [messages, isAutoScrollEnabled, isInitialLoad]);

  useEffect(() => {
    const handleUserScroll = () => {
      if (targetElementRef.current) {
        const { scrollTop, scrollHeight, clientHeight } =
          targetElementRef.current;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10; // Tolerance
        setIsAutoScrollEnabled(isAtBottom);

        if (isAtBottom) {
          setNewMessagesCount(0); // Reset new messages count when auto-scroll is enabled
        }
      }
    };

    if (targetElementRef.current) {
      targetElementRef.current.addEventListener("scroll", handleUserScroll);
    }

    return () => {
      if (targetElementRef.current) {
        targetElementRef.current.removeEventListener(
          "scroll",
          handleUserScroll,
        );
      }
    };
  }, []);

  useEffect(() => {
    // Update new messages count when autoscroll is disabled and new messages arrive
    if (!isAutoScrollEnabled && messages.length > 0) {
      setNewMessagesCount((prevCount) => prevCount + 1);
    }
  }, [messages, isAutoScrollEnabled]);

  const scrollToBottom = (smooth = true) => {
    if (targetElementRef.current) {
      targetElementRef.current.scrollTo({
        top: targetElementRef.current.scrollHeight,
        behavior: smooth ? "smooth" : "auto",
      });
      setNewMessagesCount(0);
    }
  };

  return {
    targetElementRef,
    isAutoScrollEnabled,
    newMessagesCount,
    scrollToBottom,
  };
}

export default useAutoScroll;
