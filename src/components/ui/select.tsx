import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  selectedKeys?: string[];
  children: React.ReactNode;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, selectedKeys, children, onChange, ...props }, ref) => {
    const [value, setValue] = React.useState(
      selectedKeys?.[0] || props.value || "",
    );

    React.useEffect(() => {
      if (selectedKeys?.[0]) {
        setValue(selectedKeys[0]);
      }
    }, [selectedKeys]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setValue(e.target.value);
      onChange?.(e);
    };

    return (
      <div className="relative">
        <select
          className={cn(
            "flex h-10 w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          value={value}
          onChange={handleChange}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 pointer-events-none opacity-50" />
      </div>
    );
  },
);
Select.displayName = "Select";

export interface SelectItemProps
  extends React.OptionHTMLAttributes<HTMLOptionElement> {
  key?: string;
}

const SelectItem = React.forwardRef<HTMLOptionElement, SelectItemProps>(
  ({ className, key, value, children, ...props }, ref) => {
    return (
      <option
        ref={ref}
        key={key}
        value={value}
        className={cn(className)}
        {...props}
      >
        {children}
      </option>
    );
  },
);
SelectItem.displayName = "SelectItem";

export { Select, SelectItem };
