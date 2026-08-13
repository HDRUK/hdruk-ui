import { act, renderHook } from "@testing-library/react";
import { useDebounce } from "./useDebounce";

describe("useDebounce", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("returns the initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("first"));

    expect(result.current).toBe("first");
  });

  it("holds the previous value until the default 300ms elapses", () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value), {
      initialProps: { value: "first" },
    });

    rerender({ value: "second" });
    expect(result.current).toBe("first");

    act(() => {
      jest.advanceTimersByTime(299);
    });
    expect(result.current).toBe("first");

    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(result.current).toBe("second");
  });

  it("restarts the timer on a rapid change, emitting only the last value", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: "a" } }
    );

    rerender({ value: "ab" });
    act(() => {
      jest.advanceTimersByTime(200);
    });

    rerender({ value: "abc" });
    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(result.current).toBe("a");

    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(result.current).toBe("abc");
  });

  it("honours a custom delay", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 1000),
      { initialProps: { value: "first" } }
    );

    rerender({ value: "second" });
    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(result.current).toBe("first");

    act(() => {
      jest.advanceTimersByTime(700);
    });
    expect(result.current).toBe("second");
  });
});
