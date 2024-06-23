/* import useMessageStore from "@/stores/messageStore";
import { useEffect, useState, useRef } from "react";

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
      requestAnimationFrame(() => {
        setTimeout(() => {
          scrollToBottom(!isInitialLoad);
          if (isInitialLoad) {
            setIsInitialLoad(false);
          }
        }, 0);
      });
    };

    handleScroll();
  }, [messages, isAutoScrollEnabled, isInitialLoad]);

  useEffect(() => {
    const handleUserScroll = () => {
      if (targetElementRef.current) {
        const { scrollTop, scrollHeight, clientHeight } =
          targetElementRef.current;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10; // Allow some tolerance
        setIsAutoScrollEnabled(isAtBottom);
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
    if (!isAutoScrollEnabled) {
      setNewMessagesCount((prevCount) => prevCount + 1);
    } else {
      setNewMessagesCount(0);
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
 */

import useMessageStore from "@/stores/messageStore";
import { useEffect, useState, useRef } from "react";

function useAutoScroll() {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(true);
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
      requestAnimationFrame(() => {
        setTimeout(() => {
          scrollToBottom(!isInitialLoad);
          if (isInitialLoad) {
            setIsInitialLoad(false);
          }
        }, 0);
      });
    };

    handleScroll();
  }, [messages, isAutoScrollEnabled, isInitialLoad]);

  useEffect(() => {
    const handleUserScroll = () => {
      if (targetElementRef.current) {
        const { scrollTop, scrollHeight, clientHeight } =
          targetElementRef.current;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight; // Allow some tolerance
        setIsAutoScrollEnabled(isAtBottom);
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

  return { targetElementRef, isAutoScrollEnabled };
}

export default useAutoScroll;
