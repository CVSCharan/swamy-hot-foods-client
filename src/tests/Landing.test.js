import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { useShopStatus } from "../context/StatusContext";
import { useLogo } from "../context/LogoCoontext";
import Landing from "../components/Landing";

// Mock contexts
jest.mock("../context/StatusContext", () => ({
  useShopStatus: jest.fn(),
}));

jest.mock("../context/LogoCoontext", () => ({
  useLogo: jest.fn(),
}));

// Mock child components
jest.mock("../components/GMapsDirection", () => () => (
  <div>Get Directions Button</div>
));
jest.mock("../components/CutomGoogleRatings", () => () => (
  <div>Google Reviews</div>
));
jest.mock("../components/Footer", () => () => <div>Footer</div>);
jest.mock("../components/TextAnimation", () => ({
  WaveText: () => <div>WaveText Animation</div>,
}));

describe("Landing Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the logo when logoUrl is available", () => {
    useLogo.mockReturnValue({ logoUrl: "/logo.png" });
    useShopStatus.mockReturnValue({
      shopStatus: true,
      cooking: false,
      holiday: false,
    });

    render(
      <HelmetProvider>
        <Landing />
      </HelmetProvider>
    );

    const logo = screen.getByAltText("Swamy's Hot Foods Landing Logo");
    expect(logo).toBeInTheDocument();
  });

  test("renders loading spinner when logoUrl is not available", () => {
    useLogo.mockReturnValue({ logoUrl: null });
    useShopStatus.mockReturnValue({
      shopStatus: true,
      cooking: false,
      holiday: false,
    });

    render(
      <HelmetProvider>
        <Landing />
      </HelmetProvider>
    );

    const loader = screen.getByRole("status");
    expect(loader).toBeInTheDocument();
  });

  test("shows 'We are Open' message when shopStatus is true", () => {
    useLogo.mockReturnValue({ logoUrl: "/logo.png" });
    useShopStatus.mockReturnValue({
      shopStatus: true,
      cooking: false,
      holiday: false,
    });

    render(
      <HelmetProvider>
        <Landing />
      </HelmetProvider>
    );

    expect(screen.getByText("We are Open! 😊")).toBeInTheDocument();
  });

  test("shows 'Sorry, We're Closed Now' when shopStatus is false", () => {
    useLogo.mockReturnValue({ logoUrl: "/logo.png" });
    useShopStatus.mockReturnValue({
      shopStatus: false,
      cooking: false,
      holiday: false,
    });

    render(
      <HelmetProvider>
        <Landing />
      </HelmetProvider>
    );

    expect(screen.getByText("Sorry, We're Closed Now. 😔")).toBeInTheDocument();
  });

  test("displays 'Cooking..!!' when cooking is true", () => {
    useLogo.mockReturnValue({ logoUrl: "/logo.png" });
    useShopStatus.mockReturnValue({
      shopStatus: true,
      cooking: true,
      holiday: false,
    });

    render(
      <HelmetProvider>
        <Landing />
      </HelmetProvider>
    );

    expect(screen.getByText("Cooking..!!")).toBeInTheDocument();
  });

  test("displays holiday message when holiday is true", () => {
    useLogo.mockReturnValue({ logoUrl: "/logo.png" });
    useShopStatus.mockReturnValue({
      shopStatus: false,
      cooking: false,
      holiday: true,
    });

    render(
      <HelmetProvider>
        <Landing />
      </HelmetProvider>
    );

    expect(screen.getByText("It's a Holiday Today")).toBeInTheDocument();
  });

  test("renders the call button with the correct phone number", () => {
    useLogo.mockReturnValue({ logoUrl: "/logo.png" });
    useShopStatus.mockReturnValue({
      shopStatus: true,
      cooking: false,
      holiday: false,
    });

    render(
      <HelmetProvider>
        <Landing />
      </HelmetProvider>
    );

    const callButton = screen.getByText("+91 9642415385");
    expect(callButton).toBeInTheDocument();
    expect(callButton.closest("a")).toHaveAttribute(
      "href",
      "tel:+91 9642415385"
    );
  });

  test("renders working hours section", () => {
    useLogo.mockReturnValue({ logoUrl: "/logo.png" });
    useShopStatus.mockReturnValue({
      shopStatus: true,
      cooking: false,
      holiday: false,
    });

    render(
      <HelmetProvider>
        <Landing />
      </HelmetProvider>
    );

    expect(screen.getByText("Monday - Saturday")).toBeInTheDocument();
    expect(screen.getByText("5:30 AM - 11:00 AM")).toBeInTheDocument();
    expect(screen.getByText("4:30 PM - 9:00 PM")).toBeInTheDocument();
    expect(screen.getByText("Sunday's holiday")).toBeInTheDocument();
  });
});
