"use client";
import { useState } from "react";
import { motion, useTransform, useMotionValue, useSpring } from "framer-motion";

export const AnimatedTooltip = ({
  item,
}: {
  item: {
    id: string;
    name: string;
    designation: string;
    image: string;
    online?: boolean;
  };
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0); // going to set this value on mouse move
  // rotate the tooltip
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig,
  );
  // translate the tooltip
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig,
  );
  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const halfWidth = event.currentTarget.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  //-mr-4
  return (
    <>
      {item && (
        <div
          className="group  relative -mr-4"
          key={item.name}
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {hoveredIndex === item.id && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.6 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 260,
                  damping: 10,
                },
              }}
              exit={{ opacity: 0, y: 20, scale: 0.6 }}
              style={{
                translateX: translateX,
                rotate: rotate,
                whiteSpace: "nowrap",
              }}
              className="absolute -left-1/2 -top-16 z-50 flex translate-x-1/2  flex-col items-center justify-center rounded-md bg-black px-4 py-2 text-xs shadow-xl"
            >
              <div className="absolute inset-x-10 -bottom-px z-30 h-px w-[20%] bg-gradient-to-r from-transparent via-orange-600 to-transparent " />
              <div className="absolute -bottom-px left-10 z-30 h-px w-[40%] bg-gradient-to-r from-transparent via-orange-500 to-transparent " />
              <div className="relative z-30 text-base font-bold text-white">
                {item.name}
              </div>
              <div className="text-xs text-white">{item.designation}</div>
            </motion.div>
          )}

          <img
            onMouseMove={handleMouseMove}
            height={100}
            width={100}
            src={item.image}
            alt={item.name}
            className="relative !m-0 h-12 w-12  object-cover object-top !p-0 transition  duration-500 group-hover:z-30 group-hover:scale-105"
          />
          {item.online && (
            <div className="absolute bottom-0 right-0  z-50  rounded-full border-2 border-background bg-green-500 p-1.5" />
          )}
          {item.online === false && (
            <div className="absolute bottom-0 right-0  z-50  rounded-full border-2 border-background bg-orange-500 p-1.5" />
          )}
        </div>
      )}
    </>
  );
};
