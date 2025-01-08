/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "./Components/Button/Button";
import { Input } from "./Components/Input/Input";
import { Checkbox } from "./Components/CheckBox/CheckBox";

type FormData = {
  name: string;
  contact: string;
  occupation: string;
};

export default function Home() {
  const initialFormState = {
    name: "",
    contact: "",
    occupation: "",
  };

  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [checked, setChecked] = useState<boolean>(false);

  const handleContactInfo = (
    event: React.ChangeEvent<HTMLInputElement>,
    input: string
  ) => {
    setFormData((prevState) => ({ ...prevState, [input]: event.target.value }));
  };

  const handleFormData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Success:", data);

      // Clear form after successful submission
      setFormData(initialFormState);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCheckbox = () => {
    setChecked(!checked);
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-blue-50">
      <main className="flex flex-col items-center p-6 bg-white w-9/12 shadow rounded-lg">
        <h1 className="text-lg font-sans font-semibold p-4 text-blue-900">
          Contact form
        </h1>
        <span className="text-blue-900 text-sm pb-6">
          Welcome 👋! Fill in the form below to add some data to a MongoDB.
        </span>
        <form
          onSubmit={handleFormData}
          className="space-y-4 w-full flex flex-col"
        >
          <Input
            handleOnChange={(e: any) => handleContactInfo(e, "name")}
            label="Full Name"
            value={formData.name}
            required
            type="text"
          />
          <Input
            handleOnChange={(e: any) => handleContactInfo(e, "occupation")}
            label="Occupation"
            value={formData.occupation}
            required
            type="text"
          />
          <Input
            handleOnChange={(e: any) => handleContactInfo(e, "contact")}
            label="Contact"
            value={formData.contact}
            type="text"
          />
          <Checkbox handleOnChange={handleCheckbox} />
          <Button
            className="m-auto m-0"
            type="submit"
            text="Submit"
            variant="primary"
          />
        </form>
      </main>
    </div>
  );
}
