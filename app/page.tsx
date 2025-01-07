"use client";

import { useState } from "react";
import { Button } from "./Components/Input/Button/Button";
import { Input } from "./Components/Input/Input";

type FormData = {
  name: string;
  contact: string;
};

export default function Home() {
  const initialFormState = {
    name: "",
    contact: "",
  };

  const [formData, setFormData] = useState<FormData>(initialFormState);

  const handleContactInfo = (event: React.ChangeEvent<HTMLInputElement>, input: string) => {
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

  return (
    <div>
      <main className="flex flex-col items-center border p-6 rounded border-solid border-black">
        <form onSubmit={handleFormData} className="space-y-4">
          <div>
            <Input
              handleOnChange={(e) => handleContactInfo(e, "name")}
              label="Name"
              value={formData.name}
            />
            <Input
              handleOnChange={(e) => handleContactInfo(e, "contact")}
              label="Contact"
              value={formData.contact}
            />
          </div>
          <Button
            type="submit"
            text="Submit form data"
          />
        </form>
      </main>
    </div>
  );
}