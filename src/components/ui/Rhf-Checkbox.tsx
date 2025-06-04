"use client";

import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface RHFCheckboxProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  className?: string;
  disabled?: boolean;
  onCustomChange?: (checked: boolean) => void;
  layout?: "row" | "column";
}

const RHFCheckbox = <T extends FieldValues>({
  name,
  control,
  label,
  className = "",
  disabled = false,
  onCustomChange,
  layout = "row",
}: RHFCheckboxProps<T>) => {
  const wrapperClass =
    layout === "column"
      ? "flex flex-col items-start gap-1"
      : "flex items-center gap-2";

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className={`w-full ${wrapperClass}`}>
          <label
            htmlFor={name}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="checkbox"
              id={name}
              checked={!!field.value}
              onChange={(e) => {
                field.onChange(e.target.checked);
                onCustomChange?.(e.target.checked);
              }}
              disabled={disabled}
              className={`checkbox checkbox-sm ${className} ${
                fieldState.error ? "border-red-500" : ""
              }`}
            />
            <span className="text-sm">{label}</span>
          </label>
          {fieldState.error && (
            <p className="text-xs text-red-500 ml-1">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
};

export default RHFCheckbox;
