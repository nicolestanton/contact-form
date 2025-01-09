/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "./Components/Button/Button";
import { Input } from "./Components/Input/Input";
import { Checkbox } from "./Components/CheckBox/CheckBox";
import { Modal } from "./Components/Modal/Modal";
import { validateEmail } from "./Helpers";
import ErrorMessage from "./Components/ErrorMessage/ErrorMessage";

type FormData = {
  name: string;
  contact: string;
  occupation: string;
};

type messageTypes = {
  message: string;
  error: boolean;
};

type errorType = {
  statusCode: number;
  message: string;
} | null;

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
  const [error, setError] = useState<errorType>();

  const handleContactInfo = (
    event: React.ChangeEvent<HTMLInputElement>,
    input: string
  ) => {
    setError(null);
    setFormData((prevState) => ({ ...prevState, [input]: event.target.value }));
  };

  const clearMessage = () => {
    return setTimeout(() => {
      setMessage({ message: "", error: false });
      setError(null);
    }, 2000);
  };

  const handleFormData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const hasValidEmail =
      !formData.contact ||
      (formData.contact && validateEmail(formData.contact));

    if (!hasValidEmail) {
      setMessage({ message: "🥸 Invalid email address", error: true });
      clearMessage();
      return;
    }

    if (!checked) {
      setMessage({ message: "🤖 Oops! You forgot to check the checkbox", error: true });
      clearMessage();
      return;
    }

    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        setError({
          statusCode: response.status,
          message: errorMessage || `Error submitting form (${response.status})`,
        });
        return;
      }

      const data = await response.json();
      console.log("Success:", data);
      setError(null);
      setMessage({ message: "🎉 Details added to DB!", error: false });

      clearMessage();

      setChecked(false);
      // Clear form after successful submission
      setFormData(initialFormState);
    } catch (error: any) {
      setError({
        statusCode: 500,
        message: error.message || "An unexpected error occurred",
      });
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
      {openModal && (
        <Modal handleClick={handleModal}>
          <h3 className="text-blue-900 font-semibold text-lg">Absolutley Nothing!</h3>
          <span className="text-gray-800 text-sm">
            Dont worry, nothing will happen with the data you add inside the
            form. It will sit safe and sound in a MongoDB which is used
            only for this project.{" "}
          </span>
          <Button
            className="m-0 m-auto"
            text="Close"
            type="button"
            variant="primary"
            handleClick={handleModal}
          />
        </Modal>
      )}
      <main className="z-30 flex flex-col items-center p-6 bg-white w-9/12 shadow rounded-lg">
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
          {error ? (
            <ErrorMessage
              statusCode={error.statusCode}
              message={error.message}
            />
          ) : (
            message.message && (
              <div
                className={`px-4 py-3 rounded relative ${
                  message.error
                    ? "bg-red-50 text-red-700"
                    : "bg-green-50 text-green-700"
                }`}
              >
                {message.message}
              </div>
            )
          )}
          <div className="text-blue-900 m-auto m-0 flex items-center">
            <Checkbox handleOnChange={handleCheckbox} />
            <span className="pl-2 text-xs">
              By ticking the box you agree the details you enter can be added to
              a database.{" "}
              <a className="underline cursor-pointer" onClick={handleModal}>
                Find out more
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
