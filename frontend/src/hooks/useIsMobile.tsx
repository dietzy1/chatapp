import { useState, useEffect } from "react";

export default function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)"); // Change this to the actual breakpoint for mobile devices
    setIsMobile(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handler);

    return () => {
      mediaQuery.removeEventListener("change", handler);
    };
  }, []);

  return isMobile;
}
