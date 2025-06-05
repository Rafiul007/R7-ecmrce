"use client";

import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface RHFRadioProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: Record<string, any>[];
  optionLabelKey?: string;
  optionValueKey?: string;
  className?: string;
  disabled?: boolean;
  direction?: "row" | "column";
  radioSize?: "xs" | "sm" | "md" | "lg" | "xl";
  onCustomChange?: (value: string) => void;
}

const RHFRadio = <T extends FieldValues>({
  name,
  control,
  label,
  options,
  optionLabelKey = "label",
  optionValueKey = "value",
  className = "",
  disabled = false,
  direction = "column",
  radioSize = "sm",
  onCustomChange,
}: RHFRadioProps<T>) => {
  const wrapperClass =
    direction === "row" ? "flex flex-wrap gap-4" : "flex flex-col gap-2";

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <fieldset className="w-full">
          {label && (
            <legend className="text-xs font-medium mb-1 block">{label}</legend>
          )}

          <div className={wrapperClass}>
            {options.map((opt, idx) => {
              const value = opt[optionValueKey];
              const labelText = opt[optionLabelKey];
              const inputId = `${name}-${value}`;

              return (
                <label
                  key={idx}
                  htmlFor={inputId}
                  className="label cursor-pointer gap-2 inline-flex items-center"
                >
                  <input
                    id={inputId}
                    type="radio"
                    value={value}
                    checked={field.value === value}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      onCustomChange?.(e.target.value);
                    }}
                    disabled={disabled}
                    className={`radio radio-${radioSize} ${className}`}
                  />
                  <span className="label-text text-sm">{labelText}</span>
                </label>
              );
            })}
          </div>

          {fieldState.error && (
            <p className="text-xs text-red-500 mt-1">
              {fieldState.error.message}
            </p>
          )}
        </fieldset>
      )}
    />
  );
};

export default RHFRadio;
