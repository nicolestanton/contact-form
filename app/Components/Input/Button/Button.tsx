/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

export const Button = ({
  text,
  handleClick,
  type,
}: {
  text: string;
  handleClick?: (e: any) => void;
  type: "submit" | "reset" | "button" | undefined;
}) => {
  return (
    <button
      className="border border-solid rounded p-2 bg-black text-white"
      onClick={handleClick}
      type={type}
    >
      {text}
    </button>
  );
};
