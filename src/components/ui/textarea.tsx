import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[60px] w-full rounded-xl border-2 border-gray-200 bg-transparent px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 ease-in-out placeholder:text-gray-500 hover:border-purple-200 hover:bg-purple-50/50 focus:border-purple-500 focus:bg-purple-50 focus:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
