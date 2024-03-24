import { useEffect, RefObject } from "react";
import useWidthStore, { WidthStore } from "@/stores/widthStore";

// Custom hook for a single ref
const useUpdateWidth = (
  ref: RefObject<HTMLDivElement>,
  key: keyof WidthStore["widths"],
) => {
  const setWidth = useWidthStore((state) => state.setWidth);
  const width = useWidthStore((state) => state.widths[key]);

  useEffect(() => {
    const updateWidth = () => {
      if (ref.current) {
        setWidth(key, ref.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, [ref, key, setWidth]);

  return width;
};

export default useUpdateWidth;
