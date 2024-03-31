import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { CommitIcon } from "@radix-ui/react-icons";
import {
  GitCommitHorizontal,
  GitCommitHorizontalIcon,
  GitCommitVertical,
} from "lucide-react";

type TimelineContentProps = {
  children: ReactNode;
};

const TimelineContent: React.FC<TimelineContentProps> = ({ children }) => (
  <div className={cn("ml-4")}>{children}</div>
);
TimelineContent.displayName = "TimelineContent";

const TimelineDot: React.FC = () => (
  <div className={cn("h-1 w-1 rounded-full bg-gray-400")}></div>
);
TimelineDot.displayName = "TimelineDot";

type TimelineItemProps = {
  children: React.ReactNode;
  className?: string;
};

const TimelineItem: React.FC<TimelineItemProps> = ({ children, className }) => (
  <div className={cn("flex items-center", className)}>
    <TimelineDot />
    <TimelineContent>{children}</TimelineContent>
  </div>
);
TimelineItem.displayName = "TimelineItem";

type TimelineProps = {
  children: React.ReactNode;
};

const Timeline: React.FC<TimelineProps> = ({ children }) => {
  const timelineItems = React.Children.toArray(children);

  return (
    <div className={cn("flex flex-col items-start")}>
      {timelineItems.map((child, index) => (
        <React.Fragment key={index}>
          {index >= 0 && (
            <div className=" flex w-96 items-center">
              <GitCommitHorizontalIcon
                size={24}
                className="ml-2 text-neutral-900"
              />
              <span className="ml-1 text-xs font-light">
                Commits on Jun 24, 2023
              </span>
            </div>
          )}
          <div className="flex min-w-96 flex-col border border-neutral-900">
            {child}
            <div className="mb-2 ml-4 flex items-center">
              <span className=" text-xs font-light ">😡 &nbsp; </span>

              <span className="text-xs font-light text-white">
                Martin commited{" "}
              </span>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};
Timeline.displayName = "Timeline";

export { Timeline, TimelineItem };
