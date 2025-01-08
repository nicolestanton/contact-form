/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

export const Checkbox = ({
  handleOnChange,
}: {
  handleOnChange: () => void;
}) => {
  return (
    <>
      <input type="checkbox" onChange={handleOnChange} />
    </>
  );
};
