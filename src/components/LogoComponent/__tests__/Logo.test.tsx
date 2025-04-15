import React from "react";
import { render, screen } from "@testing-library/react";
import Logo from "../Logo";
import "@testing-library/jest-dom";

describe("Logo", () => {
  it("renders the logo image correctly", () => {
    render(<Logo />);

    // Check if the logo image is rendered
    const logoImage = screen.getByAltText("CV-Library");
    expect(logoImage).toBeInTheDocument();

    // Check if the logo has the correct src
    expect(logoImage).toHaveAttribute("src", "/logo.svg");

    // Check if the logo has the correct class
    expect(logoImage).toHaveClass("logo");
  });

  it("has the correct width and height attributes", () => {
    render(<Logo />);

    const logoImage = screen.getByAltText("CV-Library");

    // Check if the logo has the correct width and height attributes
    expect(logoImage).toHaveAttribute("width", "500");
    expect(logoImage).toHaveAttribute("height", "200");
  });
});
