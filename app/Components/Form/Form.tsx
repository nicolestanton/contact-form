/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ReactNode } from "react";
import { Button } from "../Button/Button";

export const Form = ({
  children,
  handleSubmit,
}: {
  children: ReactNode;
  handleSubmit: (e: any) => void;
}) => {
  return (
    <form className="space-y-4 w-full flex flex-col" onSubmit={handleSubmit} role="form">
      {children}{" "}
      <Button
        className="m-auto m-0"
        type="submit"
        text="Submit"
        variant="primary"
      />
    </form>
  );
};
