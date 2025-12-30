import * as React from "react";

import { cn } from "@/lib/utils";

interface ButtonGroupProps {
  value: string;
  onValueChange: (value: string) => void;
  options: Array<{ value: string; icon: React.ReactNode; label?: string }>;
  className?: string;
}

export function ButtonGroup({
  value,
  onValueChange,
  options,
  className,
}: ButtonGroupProps) {
  return (
    <div
      className={cn(
        "inline-flex bg-gray-100 rounded-xl p-1 gap-1",
        className,
      )}
      role="group"
      aria-label="Button group"
    >
      {options.map((option) => {
        const isSelected = value === option.value;

        return (
          <button
            key={option.value}
            type="button"
            className={cn(
              "px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-1",
              isSelected
                ? "bg-white text-purple-600 shadow-sm"
                : "text-gray-600 hover:text-purple-600",
            )}
            onClick={() => onValueChange(option.value)}
            aria-pressed={isSelected}
          >
            {option.icon}
            {option.label && <span>{option.label}</span>}
          </button>
        );
      })}
    </div>
  );
}
