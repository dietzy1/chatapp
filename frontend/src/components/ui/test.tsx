import * as React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  Icon?: LucideIcon; // Add an icon prop
  valueAsHTML?: string; // Add a prop to accept HTML content
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, Icon, valueAsHTML, ...props }, ref) => {
    return (
      <div className="relative flex items-center">
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
            <Icon className="text-gray-500" />
          </div>
        )}
        {valueAsHTML && (
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 top-0 flex"
            dangerouslySetInnerHTML={{ __html: valueAsHTML }}
          />
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
