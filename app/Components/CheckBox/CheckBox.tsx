/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

export const Checkbox = ({
  handleOnChange,
  message,
}: {
  handleOnChange: () => void;
  message?: string;
}) => {
  return (
    <>
      <input type="checkbox" onChange={handleOnChange} />;
      {message && <span>{message}</span>}
    </>
  );
};
