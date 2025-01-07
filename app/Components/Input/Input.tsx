'use client';

export const Input = ({ value, label, handleOnChange, inputName }: {value: string, label: string, inputName?: string, handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
  return (
    <div className="flex flex-col">
      {label && <span className="text-xs pb-1">{label}</span>}
      <input
        type="text"
        placeholder="placeholder"
        className="border rounded border-solid border-black p-2"
        onChange={handleOnChange}
        name={inputName}
        value={value}
      />
    </div>
  );
};
