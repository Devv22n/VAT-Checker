import "@testing-library/jest-dom";
import { act } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { VATChecker } from "./VATChecker";

describe("VATChecker", () => {
  test("renders VAT input", () => {
    render(<VATChecker />);

    const input = screen.getByRole("textbox");

    expect(input).toBeInTheDocument();

    expect(input).toHaveAttribute("placeholder", "Enter VAT Number...");
  });

  test("identifies valid VAT number", async () => {
    render(<VATChecker />);

    const input = await screen.findByRole("textbox");

    userEvent.type(input, "GB 872149903");

    const validationIcon = await waitFor(
      () => screen.findByText("Entered VAT number is valid"),
      { timeout: 2000 } // Wait for debounce to finish
    );

    expect(validationIcon).toBeInTheDocument();
  });

  test("identifies invalid VAT number", async () => {
    render(<VATChecker />);

    const input = await screen.findByRole("textbox");

    userEvent.type(input, "GB 689689443");

    const validationIcon = await waitFor(
      () => screen.findByText("Entered VAT number is invalid"),
      { timeout: 2000 } // Wait for debounce to finish
    );

    expect(validationIcon).toBeInTheDocument();
  });
});
