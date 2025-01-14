import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "./page";

// Mock the fetch function
global.fetch = jest.fn();

describe("Home Component", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    global.fetch.mockReset();
  });

  it("renders the contact form with all required elements", () => {
    render(<Home />);

    expect(screen.getByText("Contact form")).toBeInTheDocument();
    expect(screen.getByText(/Welcome 👋!/)).toBeInTheDocument();

    expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Occupation")).toBeInTheDocument();
    expect(screen.getByLabelText("Email Address")).toBeInTheDocument();

    expect(screen.getByRole("checkbox")).toBeInTheDocument();
    expect(screen.getByTestId("agreementNotice")).toBeInTheDocument();
  });

  it("displays error message for invalid email", async () => {
    render(<Home />);

    const emailInput = screen.getByRole("textbox", { name: /email address/i });
    const form = screen.getByRole("form");

    // Enter invalid email
    await userEvent.type(emailInput, "invalid-email");

    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText("🥸 Invalid email address")).toBeInTheDocument();
    });

    await waitFor(
      () => {
        expect(
          screen.queryByText("🥸 Invalid email address")
        ).not.toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it("displays error message when checkbox is not checked", async () => {
    render(<Home />);

    const nameInput = screen.getByLabelText("Full Name");
    const emailInput = screen.getByLabelText("Email Address");
    const submitButton = screen.getByRole("button", { name: /submit/i });

    // Fill in valid form data but don't check the checkbox
    await userEvent.type(nameInput, "John Doe");
    await userEvent.type(emailInput, "john@example.com");
    fireEvent.click(submitButton);

    expect(
      screen.getByText("🤖 Oops! You forgot to check the checkbox")
    ).toBeInTheDocument();
  });

  it("successfully submits form with valid data", async () => {
    render(<Home />);

    // Mock successful API response with complete response
    global.fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: () =>
        Promise.resolve({
          success: true,
          message: "Success",
        }),
      text: () => Promise.resolve("Success"),
    });

    const nameInput = screen.getByRole("textbox", { name: /full name/i });
    const emailInput = screen.getByRole("textbox", { name: /email address/i });
    const checkbox = screen.getByRole("checkbox");

    await userEvent.type(nameInput, "John Doe");
    await userEvent.type(emailInput, "john@example.com");
    await userEvent.click(checkbox);

    const form = screen.getByRole("form");
    await fireEvent.submit(form);

    await waitFor(
      () => {
        const message = screen.getByTestId("form-message");
        expect(message).toBeInTheDocument();
        expect(message).toHaveTextContent("🎉 Details added to DB!");
      },
      { timeout: 3000 }
    );

    expect(nameInput).toHaveValue("");
    expect(emailInput).toHaveValue("");
    expect(checkbox).not.toBeChecked();

    // Verify API was called correctly
    expect(fetch).toHaveBeenCalledWith("/api/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "John Doe",
        contact: "john@example.com",
        occupation: "",
      }),
    });
  });

  it("handles API error responses", async () => {
    render(<Home />);

    // Mock API error response
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      text: () => Promise.resolve("Bad Request"),
    });

    const nameInput = screen.getByRole("textbox", { name: /full name/i });
    const emailInput = screen.getByRole("textbox", { name: /email address/i });
    const checkbox = screen.getByRole("checkbox");

    await userEvent.type(nameInput, "John Doe");
    await userEvent.type(emailInput, "john@example.com");
    await userEvent.click(checkbox);

    const form = screen.getByRole("form");
    await fireEvent.submit(form);

    // Wait for error message
    await waitFor(() => {
      const errorElement = screen.getByTestId("error-message");
      expect(errorElement).toBeInTheDocument();
    });
  });

  it("opens and closes the modal", () => {
    render(<Home />);

    fireEvent.click(screen.getByText("Find out more"));

    expect(screen.getByText("Absolutley Nothing!")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /close/i }));

    expect(screen.queryByText("Absolutley Nothing!")).not.toBeInTheDocument();
  });
});
