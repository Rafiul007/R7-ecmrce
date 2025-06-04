"use client";

import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface Option {
  [key: string]: string;
}

interface RHFSelectProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  options: Option[];
  optionLabelKey?: string;
  optionValueKey?: string;
  className?: string;
  disabled?: boolean;
  onCustomChange?: (value: string) => void;
}

const RHFSelect = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder = "Select an option",
  options,
  optionLabelKey = "label",
  optionValueKey = "value",
  className = "",
  disabled = false,
  onCustomChange,
}: RHFSelectProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="w-full">
          {label && (
            <label htmlFor={name} className="text-xs font-medium mb-1 block">
              {label}
            </label>
          )}
          <select
            {...field}
            id={name}
            disabled={disabled}
            onChange={(e) => {
              field.onChange(e.target.value);
              onCustomChange?.(e.target.value);
            }}
            className={`select select-bordered select-sm w-full ${className} ${
              fieldState.error ? "border-red-500" : ""
            }`}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((opt, idx) => (
              <option key={idx} value={opt[optionValueKey]}>
                {opt[optionLabelKey]}
              </option>
            ))}
          </select>
          {fieldState.error && (
            <p className="text-xs text-red-500 mt-1">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
};

export default RHFSelect;
