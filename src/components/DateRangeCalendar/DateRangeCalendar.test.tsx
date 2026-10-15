import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import userEvent from "@testing-library/user-event";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import { render, screen, within } from "../../../test/renderWithTheme";
import { DateRangeCalendar } from "./DateRangeCalendar";
import type { DateRangeCalendarProps } from "./DateRangeCalendar";
import type { RenderWithThemeOptions } from "../../../test/renderWithTheme";

const renderCalendar = (
  props: DateRangeCalendarProps = {},
  options?: RenderWithThemeOptions
) =>
  render(
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      <DateRangeCalendar {...props} />
    </LocalizationProvider>,
    options
  );

const december = () => screen.getByRole("grid", { name: "December 2023" });
const day = (grid: HTMLElement, date: number) =>
  within(grid).getByRole("gridcell", { name: String(date) });

const range = (start: string, end: string) =>
  [dayjs(start), dayjs(end)] as DateRangeCalendarProps["value"];

describe("DateRangeCalendar", () => {
  it("shows the end month on the right of two calendars", () => {
    renderCalendar({ defaultValue: range("2023-12-14", "2024-01-14") });

    expect(december()).toBeInTheDocument();
    expect(
      screen.getByRole("grid", { name: "January 2024" })
    ).toBeInTheDocument();
  });

  it("shows a single month when asked", () => {
    renderCalendar({
      calendars: 1,
      defaultValue: range("2023-12-14", "2023-12-21"),
    });

    expect(screen.getAllByRole("grid")).toHaveLength(1);
    expect(december()).toBeInTheDocument();
  });

  it("labels weekdays with two letters, starting on Monday", () => {
    renderCalendar({
      calendars: 1,
      defaultValue: range("2023-12-14", "2023-12-21"),
    });

    const labels = within(december())
      .getAllByRole("columnheader")
      .map(cell => cell.textContent);

    expect(labels).toEqual(["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]);
  });

  it("starts a range on the first click and ends it on the second", async () => {
    const onChange = jest.fn();
    renderCalendar({
      calendars: 1,
      defaultValue: range("2023-12-01", "2023-12-02"),
      onChange,
    });

    await userEvent.click(day(december(), 14));
    await userEvent.click(day(december(), 21));

    const [[first], [second]] = onChange.mock.calls;
    expect(first[0].format("YYYY-MM-DD")).toBe("2023-12-14");
    expect(first[1]).toBeNull();
    expect(second.map((d: dayjs.Dayjs) => d.format("YYYY-MM-DD"))).toEqual([
      "2023-12-14",
      "2023-12-21",
    ]);
  });

  it("swaps the ends when the second day is earlier", async () => {
    const onChange = jest.fn();
    renderCalendar({
      calendars: 1,
      defaultValue: range("2023-12-01", "2023-12-02"),
      onChange,
    });

    await userEvent.click(day(december(), 21));
    await userEvent.click(day(december(), 14));

    const last = onChange.mock.calls.at(-1)[0];
    expect(last.map((d: dayjs.Dayjs) => d.format("YYYY-MM-DD"))).toEqual([
      "2023-12-14",
      "2023-12-21",
    ]);
  });

  it("fills the two ends and marks every day between as selected", () => {
    renderCalendar({
      calendars: 1,
      defaultValue: range("2023-12-14", "2023-12-17"),
    });

    const grid = december();
    const selected = within(grid)
      .getAllByRole("gridcell", { selected: true })
      .map(cell => cell.textContent);

    expect(selected).toEqual(["14", "15", "16", "17"]);
    expect(day(grid, 14)).toHaveClass("Mui-selected");
    expect(day(grid, 15)).not.toHaveClass("Mui-selected");
    expect(grid).toHaveAttribute("aria-multiselectable", "true");
  });

  it("announces the start, then the finished range", async () => {
    renderCalendar({
      calendars: 1,
      defaultValue: range("2023-12-01", "2023-12-02"),
    });

    await userEvent.click(day(december(), 14));

    expect(screen.getByRole("status")).toHaveTextContent(
      "Start date 14 Dec 2023 selected. Choose an end date."
    );

    await userEvent.click(day(december(), 21));

    expect(screen.getByRole("status")).toHaveTextContent(
      "14 Dec 2023 — 21 Dec 2023, 8 days selected"
    );
  });

  it("summarises the range and counts its days", () => {
    renderCalendar({ defaultValue: range("2023-12-14", "2024-01-14") });

    expect(screen.getByText("14 Dec 2023 — 14 Jan 2024")).toBeInTheDocument();
    expect(screen.getByText("32 days selected")).toBeInTheDocument();
  });

  it("counts a single day in the singular", () => {
    renderCalendar({ defaultValue: range("2023-12-14", "2023-12-14") });

    expect(screen.getByText("1 day selected")).toBeInTheDocument();
  });

  it("keeps the summary while the end is being picked", async () => {
    renderCalendar({
      calendars: 1,
      defaultValue: range("2023-12-01", "2023-12-02"),
    });

    await userEvent.click(day(december(), 14));

    expect(screen.getByText("14 Dec 2023 —")).toBeInTheDocument();
    expect(screen.queryByText(/days? selected/)).not.toBeInTheDocument();
  });

  it("formats the day count with the caller's function", () => {
    renderCalendar({
      defaultValue: range("2023-12-14", "2023-12-21"),
      getDaysSelectedText: count => `${count} diwrnod`,
    });

    expect(screen.getByText("8 diwrnod")).toBeInTheDocument();
  });

  it("hides the summary when asked", () => {
    renderCalendar({
      defaultValue: range("2023-12-14", "2023-12-21"),
      hideSummary: true,
    });

    expect(screen.queryByText("8 days selected")).not.toBeInTheDocument();
  });

  it("disables days after today with disableFuture", () => {
    renderCalendar({ calendars: 1, disableFuture: true });

    const tomorrow = dayjs().add(1, "day");
    if (tomorrow.month() === dayjs().month()) {
      expect(day(screen.getByRole("grid"), tomorrow.date())).toBeDisabled();
    }
  });

  it("moves the view to a range set from outside", async () => {
    const { rerender } = renderCalendar({
      calendars: 1,
      value: range("2023-12-14", "2023-12-21"),
    });

    rerender(
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
        <DateRangeCalendar
          calendars={1}
          value={range("2024-03-01", "2024-03-10")}
        />
      </LocalizationProvider>
    );

    expect(
      await screen.findByRole("grid", { name: "March 2024" })
    ).toBeInTheDocument();
  });

  it("picks whole days, without the time of day", async () => {
    const onChange = jest.fn();
    renderCalendar({ calendars: 1, onChange });

    const grid = screen.getByRole("grid");
    await userEvent.click(
      within(grid).getAllByRole("gridcell", { name: "10" })[0]
    );

    const [start] = onChange.mock.calls[0][0];
    expect(start.format("HH:mm:ss.SSS")).toBe("00:00:00.000");
  });

  it("moves focus with the arrow keys in a month without a range end", async () => {
    renderCalendar({ defaultValue: range("2023-12-14", "2023-12-21") });

    const november = screen.getByRole("grid", { name: "November 2023" });
    day(november, 10).focus();
    await userEvent.keyboard("{ArrowRight}{ArrowRight}");

    expect(document.activeElement?.textContent).toBe("12");
  });

  it("keeps the focused day when the keyboard crosses into the next month", async () => {
    renderCalendar({ defaultValue: range("2023-12-14", "2024-01-14") });

    day(december(), 31).focus();
    await userEvent.keyboard("{ArrowRight}");

    const focused = document.activeElement as HTMLElement;
    expect(focused.textContent).toBe("1");
    expect(
      await screen.findByRole("grid", { name: "January 2024" })
    ).toContainElement(focused);
  });

  it("moves both months together with the arrows", async () => {
    renderCalendar({ defaultValue: range("2023-12-14", "2024-01-14") });

    const [previous] = screen
      .getAllByRole("button", { name: "Previous month" })
      .filter(button => getComputedStyle(button).visibility !== "hidden");
    await userEvent.click(previous);

    expect(
      await screen.findByRole("grid", { name: "November 2023" })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("grid", { name: "December 2023" })
    ).toBeInTheDocument();
  });

  it("forwards a ref to the root element", () => {
    const ref = { current: null as HTMLDivElement | null };

    render(
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
        <DateRangeCalendar ref={ref} />
      </LocalizationProvider>
    );

    expect(ref.current).toContainElement(screen.getAllByRole("grid")[0]);
  });

  it("keeps range state off the DOM", () => {
    const { container } = renderCalendar({
      defaultValue: range("2023-12-14", "2024-01-14"),
    });

    expect(container.querySelector("[isinband]")).toBeNull();
    expect(container.querySelector("[hidenext]")).toBeNull();
  });
});

describe("DateRangeCalendar theming", () => {
  it("applies an app override without losing the base layout", () => {
    renderCalendar(
      { defaultValue: range("2023-12-14", "2024-01-14") },
      {
        themeOptions: {
          components: {
            HdrukDateRangeCalendar: {
              styleOverrides: { months: { gap: 40 } },
            },
          },
        },
      }
    );

    const months = december().closest(".MuiDateCalendar-root")
      ?.parentElement as HTMLElement;
    const style = getComputedStyle(months);

    expect(style.gap).toBe("40px");
    expect(style.display).toBe("flex");
  });
});
