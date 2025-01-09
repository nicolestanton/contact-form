"use client";
import { ReactNode } from "react";
import { IoIosClose } from "react-icons/io";

export const Modal = ({
  handleClick,
  children,
}: {
  handleClick: () => void;
  children: ReactNode;
}) => {
  return (
    <div className="absolute flex justify-center ">
      <div className="bg-blue-400 w-screen h-screen z-40 bg-opacity-60"></div>
      <div className="bg-white top-52 z-50 absolute flex flex-col max-w-xl rounded-lg p-2">
        <button className="text-blue-900 text-4xl relative flex justify-end" onClick={handleClick}>
          <IoIosClose />
        </button>
        <div className="flex flex-col text-center gap-6 py-2 px-8">{children}</div>
      </div>
    </div>
  );
};
