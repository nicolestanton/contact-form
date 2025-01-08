/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import classNames from "classnames";

export const Button = ({
  text,
  handleClick,
  type,
  className,
  variant,
}: {
  text: string;
  handleClick?: (e: any) => void;
  type: "submit" | "reset" | "button" | undefined;
  className?: string;
  variant?: "primary" | "other";
}) => {
  const buttonStyles = classNames(
    "border border-solid rounded p-2 text-white w-max font-semibold p-3 rounded-xl",
    variant === "primary" ? "bg-blue-900 hover:bg-blue-500" : "bg-gray-900 hover: bg-gray-400"
  );
  return (
    <button
      className={classNames(className, buttonStyles)}
      onClick={handleClick}
      type={type}
    >
      {text}
    </button>
  );
};
