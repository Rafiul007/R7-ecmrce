"use client";

import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface RHFTextFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  type?: string;
  className?: string;
  disabled?: boolean;
  autoComplete?: string;
}

const RHFTextField = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  type = "text",
  className = "",
  disabled = false,
  autoComplete,
}: RHFTextFieldProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="w-full">
          {label && (
            <label htmlFor={name} className="text-xs font-medium mb-1 block">
              {label}
            </label>
          )}
          <input
            {...field}
            id={name}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            autoComplete={autoComplete}
            className={`input input-bordered input-sm w-full ${className} ${
              fieldState.error ? "border-red-500" : ""
            }`}
          />
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

export default RHFTextField;
