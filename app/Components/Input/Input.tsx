/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";

export const Input = ({
  value,
  required,
  type,
  label,
  handleOnChange,
  placeholder,
}: {
  required?: boolean;
  type: string;
  value: string;
  label: string;
  placeholder?: string;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className="relative">
      <input
        required={required}
        type={type}
        value={value}
        onChange={handleOnChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="w-full border-t-0 border-r-0 border-l-0 px-3 py-2 text-gray-700 border peer focus:outline-none focus:border-blue-900"
        placeholder={placeholder}
      />
      <label
        className={`
        absolute left-3 transition-all duration-200 pointer-events-none
        peer-placeholder-shown:text-gray-400
        peer-placeholder-shown:top-2
        peer-focus:-top-2
        peer-focus:text-xs
        peer-focus:font-semibold
        peer-focus:text-blue-900
        ${
          isFocused || value
            ? "-top-6 text-xs text-blue-900"
            : "top-2 text-gray-400"
        }
      `}
      >
        {label}
      </label>
    </div>
  );
};
