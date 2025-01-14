import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Form } from "../Components/Form/Form";

describe("Form Component", () => {
  it("renders the form with just a submit button", async () => {
    const mockHandleSubmit = jest.fn();

    render(<Form handleSubmit={mockHandleSubmit} />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("calls handle submit on form submission", async () => {
    const mockHandleSubmit = jest.fn();
    mockHandleSubmit.mockClear();
    render(<Form handleSubmit={mockHandleSubmit} />);

    await userEvent.click(screen.getByRole("button"));
    expect(mockHandleSubmit).toHaveBeenCalled();
  });
});
