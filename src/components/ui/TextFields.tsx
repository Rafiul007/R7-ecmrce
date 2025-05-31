// components/form/TextInputField.tsx
import { InputHTMLAttributes } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError;
  registration: UseFormRegisterReturn;
}

const TextInputField = ({ label, error, registration, ...rest }: Props) => {
  return (
    <div className="w-full">
      {label && (
        <label className="text-xs font-medium mb-1 block">{label}</label>
      )}
      <input
        {...registration}
        {...rest}
        className={`input input-bordered input-sm w-full ${
          error ? "border-red-500" : ""
        }`}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error.message}</p>}
    </div>
  );
};

export default TextInputField;
