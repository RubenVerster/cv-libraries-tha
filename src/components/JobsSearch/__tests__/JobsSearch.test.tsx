import React from "react";
import { render, screen } from "@testing-library/react";
import JobsSearch from "../index";

// Mock the TabsComponent
jest.mock("@/components/TabsComponent", () => {
  return function MockTabsComponent() {
    return <div data-testid="tabs-component">Mocked Tabs Component</div>;
  };
});

// Mock the LocationAutocomplete component
jest.mock("@/components/LocationAutocomplete", () => {
  return function MockLocationAutocomplete() {
    return <input data-testid="location-autocomplete" />;
  };
});

// Mock the useI18n hook
jest.mock("@/hooks/useI18n", () => ({
  useI18n: () => ({
    t: (key) => key,
    isLoading: false,
  }),
}));

describe("JobsSearch", () => {
  const defaultProps = {
    locale: "en",
    initialView: "location",
  };

  it("renders the loading state initially", () => {
    render(<JobsSearch {...defaultProps} />);

    // Check if the loading state is shown
    const loadingElements = screen.getAllByText("Loading...");
    expect(loadingElements.length).toBeGreaterThan(0);
  });
});
