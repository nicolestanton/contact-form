/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "./Components/Button/Button";
import { Input } from "./Components/Input/Input";
import { Checkbox } from "./Components/CheckBox/CheckBox";
import { Modal } from "./Components/Modal/Modal";
import { validateEmail } from "./Helpers";
import classNames from "classnames";

type FormData = {
  name: string;
  contact: string;
  occupation: string;
};

type messageTypes = {
  message: string;
  error: boolean;
};

export default function Home() {
  const initialFormState = {
    name: "",
    contact: "",
    occupation: "",
  };

  const messageState = {
    message: "",
    error: false,
  };

  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [checked, setChecked] = useState<boolean>();
  const [message, setMessage] = useState<messageTypes>(messageState);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleContactInfo = (
    event: React.ChangeEvent<HTMLInputElement>,
    input: string
  ) => {
    setFormData((prevState) => ({ ...prevState, [input]: event.target.value }));
  };

  const clearMessage = () => {
    return setTimeout(() => setMessage({ message: "", error: false }), 2000);
  };

  const handleFormData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const hasValidEmail =
      !formData.contact ||
      (formData.contact && validateEmail(formData.contact));

    if (checked && hasValidEmail) {
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
        setMessage({ message: "info added", error: false });

        clearMessage();

        setChecked(false);
        // Clear form after successful submission
        setFormData(initialFormState);
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      if (!hasValidEmail) {
        setMessage({ message: "invalid email address", error: true });
        clearMessage();
      }

      if (!checked) {
        setMessage({ message: "check the box", error: true });
        clearMessage();
      }
    }
  };

  const handleCheckbox = () => {
    setChecked(!checked);
  };

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-blue-50">
      {openModal && <Modal handleClick={handleModal} />}
      <main className="z-40 flex flex-col items-center p-6 bg-white w-9/12 shadow rounded-lg">
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
            label="Email Address"
            value={formData.contact}
            type="email"
          />
          {message && (
            <span className={classNames("text-center", message.error ? "text-red-700"  : "text-green-900")}>{message.message}</span>
          )}
          <div className="text-blue-900 m-auto m-0 flex items-center">
            <Checkbox handleOnChange={handleCheckbox} />
            <span className="pl-2 text-xs">
              To find out what happens with the data you enter{" "}
              <a className="underline cursor-pointer" onClick={handleModal}>
                Click here
              </a>
            </span>
          </div>
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
