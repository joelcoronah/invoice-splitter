import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  isSelected?: boolean;
  onValueChange?: (isSelected: boolean) => void;
  checked?: boolean;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, isSelected, checked: checkedProp, onValueChange, onChange, ...props }, ref) => {
    const [internalChecked, setInternalChecked] = React.useState(
      checkedProp ?? isSelected ?? false,
    );

    const checked = checkedProp ?? isSelected ?? internalChecked;

    React.useEffect(() => {
      if (checkedProp !== undefined || isSelected !== undefined) {
        setInternalChecked(checkedProp ?? isSelected ?? false);
      }
    }, [checkedProp, isSelected]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = e.target.checked;
      setInternalChecked(newChecked);
      onValueChange?.(newChecked);
      onChange?.(e);
    };

    return (
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only"
          ref={ref}
          checked={checked}
          onChange={handleChange}
          {...props}
        />
        <div
          className={cn(
            "flex h-4 w-4 items-center justify-center rounded border-2 transition-colors",
            checked
              ? "bg-primary border-primary"
              : "border-input bg-background",
            className,
          )}
        >
          {checked && <Check className="h-3 w-3 text-primary-foreground" />}
        </div>
      </label>
    );
  },
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
