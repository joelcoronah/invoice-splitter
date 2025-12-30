import * as React from "react";

import { cn } from "@/lib/utils";

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "solid" | "bordered" | "flat";
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
}

const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  ({ className, variant = "default", color = "default", ...props }, ref) => {
    const variantStyles = {
      default: "bg-secondary text-secondary-foreground",
      solid: "bg-primary text-primary-foreground",
      bordered: "border border-input bg-transparent",
      flat: "bg-muted text-muted-foreground",
    };

    const colorStyles = {
      default: "",
      primary: "bg-blue-100 text-blue-800 border-blue-200",
      secondary: "bg-gray-100 text-gray-800 border-gray-200",
      success: "bg-green-100 text-green-800 border-green-200",
      warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
      danger: "bg-red-100 text-red-800 border-red-200",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
          variantStyles[variant],
          colorStyles[color],
          className,
        )}
        {...props}
      />
    );
  },
);
Chip.displayName = "Chip";

export { Chip };
