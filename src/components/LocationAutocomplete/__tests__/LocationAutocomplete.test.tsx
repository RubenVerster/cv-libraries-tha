import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LocationAutocomplete from "../index";

// Mock the fetch function
global.fetch = jest.fn();

describe("LocationAutocomplete", () => {
  const mockOnChange = jest.fn();
  const mockOnSelect = jest.fn();
  const defaultProps = {
    value: "",
    onChange: mockOnChange,
    onSelect: mockOnSelect,
    placeholder: "Enter a location",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the component correctly", () => {
    render(<LocationAutocomplete {...defaultProps} />);

    // Check if the input is rendered
    const input = screen.getByPlaceholderText("Enter a location");
    expect(input).toBeInTheDocument();
  });

  it("calls onChange when input value changes", () => {
    render(<LocationAutocomplete {...defaultProps} />);

    // Change the input value
    const input = screen.getByPlaceholderText("Enter a location");
    fireEvent.change(input, { target: { value: "Lon" } });

    // Check if onChange was called with the new value
    expect(mockOnChange).toHaveBeenCalledWith("Lon");
  });
});
