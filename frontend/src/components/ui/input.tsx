import * as React from "react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  TenorPicker?: ReactNode;
  EmojiPicker?: ReactNode; // Add an icon prop
  Node?: ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, TenorPicker, EmojiPicker, Node, ...props }, ref) => {
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
        {TenorPicker && (
          <div className="absolute right-12 p-2 hover:bg-muted  ">
            {TenorPicker}
          </div>
        )}

        {EmojiPicker && (
          <div className="absolute right-3 rounded-sm p-2 hover:bg-muted">
            {EmojiPicker}
          </div>
        )}
        {Node && <div className="absolute right-3">{Node}</div>}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
