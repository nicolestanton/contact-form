"use client";

export const Modal = ({ handleClick }: { handleClick: () => void }) => {
  return (
    <div className="flex justify-center bg-gray-200 w-screen h-screen z-50 absolute">
      <div className="bg-white w-max h-max relative top-1/2">
        <span className="text-blue-900">modal</span>

        <button onClick={handleClick}>Close</button>
      </div>
    </div>
  );
};
