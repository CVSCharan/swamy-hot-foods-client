// Landing.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import { useShopStatus } from "../context/StatusContext";
import Landing from "../components/Landing";

// Mock the useShopStatus hook
jest.mock("../context/StatusContext", () => ({
  useShopStatus: jest.fn(),
}));

jest.mock("../context/LogoCoontext", () => ({
  useLogo: jest.fn().mockReturnValue({ logoUrl: "" }),
}));

// Helper function to set up the component with shopStatus and other states
const setup = ({ shopStatus, cooking, holiday }) => {
  useShopStatus.mockReturnValue({
    shopStatus,
    cooking,
    holiday,
    noticeBoardTxt: "",
  });
  return render(<Landing />);
};

describe("Landing Component - currentMessage", () => {
  test('displays "We are closing soon..!" when shopStatus is true and it is near closing time', () => {
    // Mock the Date to simulate a time near closing (e.g., 10:50 AM or 8:50 PM)
    jest.useFakeTimers().setSystemTime(new Date("2024-07-08T10:50:00")); // 10:50 AM

    setup({ shopStatus: true, cooking: false, holiday: false });

    expect(screen.getByText("We are closing soon..!")).toBeInTheDocument();

    // Cleanup fake timers
    jest.useRealTimers();
  });

  test('displays "Visit us back at 4:30 PM." when shop is closed after morning hours', () => {
    jest.useFakeTimers().setSystemTime(new Date("2024-07-08T11:30:00")); // 11:30 AM

    setup({ shopStatus: false, cooking: false, holiday: false });

    expect(screen.getByText("Visit us back at 4:30 PM.")).toBeInTheDocument();

    jest.useRealTimers();
  });

  test('displays "Visit us tomorrow by 5:30 AM." when shop is closed after evening hours', () => {
    jest.useFakeTimers().setSystemTime(new Date("2024-07-08T21:15:00")); // 9:15 PM

    setup({ shopStatus: false, cooking: false, holiday: false });

    expect(
      screen.getByText("Visit us tomorrow by 5:30 AM.")
    ).toBeInTheDocument();

    jest.useRealTimers();
  });

  test("does not display any message on Sundays", () => {
    jest.useFakeTimers().setSystemTime(new Date("2024-07-07T10:00:00")); // Sunday 10:00 AM

    setup({ shopStatus: true, cooking: false, holiday: false });

    expect(
      screen.queryByText(
        /We are closing soon..!|Visit us back at 4:30 PM.|Visit us tomorrow by 5:30 AM./
      )
    ).not.toBeInTheDocument();

    jest.useRealTimers();
  });

  test("displays no message if outside any specific conditions", () => {
    jest.useFakeTimers().setSystemTime(new Date("2024-07-08T08:00:00")); // 8:00 AM

    setup({ shopStatus: true, cooking: false, holiday: false });

    expect(
      screen.queryByText(
        /We are closing soon..!|Visit us back at 4:30 PM.|Visit us tomorrow by 5:30 AM./
      )
    ).not.toBeInTheDocument();

    jest.useRealTimers();
  });
});
