import * as React from "react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  Icon?: LucideIcon; // Add an icon prop
  Node?: ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, Icon, Node, ...props }, ref) => {
    return (
      <div className="relative flex flex-grow items-center">
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
        />
        {Icon && (
          <div className="absolute right-3">
            <Icon className="text-foreground" />
          </div>
        )}
        {Node && <div className="absolute right-3">{Node}</div>}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
