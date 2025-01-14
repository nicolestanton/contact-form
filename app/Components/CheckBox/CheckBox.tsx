/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

export const Checkbox = ({
  handleOnChange,
  checked
}: {
  handleOnChange: () => void;
  checked: boolean;
}) => {
  return (
    <>
      <input type="checkbox" checked={checked} onChange={handleOnChange} />
    </>
  );
};
