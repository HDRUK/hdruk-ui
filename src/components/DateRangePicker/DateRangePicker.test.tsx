import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import userEvent from "@testing-library/user-event";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import {
  fireEvent,
  render,
  screen,
  within,
} from "../../../test/renderWithTheme";
import { MultiInputDateRangeField } from "./DateRangeFields";
import { DateRangePicker } from "./DateRangePicker";
import type { DateRangePickerProps } from "./DateRangePicker";
import type { RenderWithThemeOptions } from "../../../test/renderWithTheme";
import type { DateRange } from "../DateRangeCalendar";

const range = (start: string, end: string): DateRange => [
  dayjs(start),
  dayjs(end),
];

const asStrings = (value: DateRange) =>
  value.map(date => (date ? date.format("YYYY-MM-DD") : null));

const shortcuts = [
  {
    label: "Christmas week",
    getValue: () => range("2023-12-25", "2023-12-31"),
  },
  { label: "December", getValue: () => range("2023-12-01", "2023-12-31") },
];

const renderPicker = (
  props: DateRangePickerProps = {},
  options?: RenderWithThemeOptions
) =>
  render(
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      <DateRangePicker {...props} />
    </LocalizationProvider>,
    options
  );

const openPicker = () =>
  userEvent.click(screen.getByRole("button", { name: /^Choose range/ }));

const dialog = () => screen.getByRole("dialog", { name: "Select date range" });

const mockMatchMedia = (matches: boolean) => {
  const original = window.matchMedia;
  window.matchMedia = (query: string) =>
    ({
      ...original(query),
      matches: matches && query.includes("max-width"),
    }) as MediaQueryList;
  return () => {
    window.matchMedia = original;
  };
};

describe("DateRangePicker", () => {
  it("shows the range in the field in the locale's format", () => {
    renderPicker({ defaultValue: range("2023-12-14", "2024-01-14") });

    expect(screen.getByLabelText("Date range")).toHaveValue(
      "14/12/2023 — 14/01/2024"
    );
  });

  it("uses the label as the field's name even when hidden", () => {
    renderPicker({ label: "Choose time period", hideLabel: true });

    expect(screen.getByLabelText("Choose time period")).toBeInTheDocument();
  });

  it("opens a dialog with two months", async () => {
    renderPicker({ defaultValue: range("2023-12-14", "2024-01-14") });

    await openPicker();

    expect(within(dialog()).getAllByRole("grid")).toHaveLength(2);
  });

  it("commits the picked range on OK", async () => {
    const onChange = jest.fn();
    renderPicker({
      defaultValue: range("2023-12-01", "2023-12-02"),
      onChange,
    });

    await openPicker();
    const december = within(dialog()).getByRole("grid", {
      name: "December 2023",
    });
    await userEvent.click(
      within(december).getByRole("gridcell", { name: "14" })
    );
    await userEvent.click(
      within(december).getByRole("gridcell", { name: "21" })
    );
    await userEvent.click(screen.getByRole("button", { name: "OK" }));

    expect(asStrings(onChange.mock.calls[0][0])).toEqual([
      "2023-12-14",
      "2023-12-21",
    ]);
    expect(screen.getByLabelText("Date range")).toHaveValue(
      "14/12/2023 — 21/12/2023"
    );
  });

  it("disables OK until the range has an end", async () => {
    renderPicker({ defaultValue: range("2023-12-01", "2023-12-02") });

    await openPicker();
    const december = within(dialog()).getByRole("grid", {
      name: "December 2023",
    });
    await userEvent.click(
      within(december).getByRole("gridcell", { name: "14" })
    );

    expect(screen.getByRole("button", { name: "OK" })).toBeDisabled();
  });

  it.each([
    [
      "Cancel",
      () => userEvent.click(screen.getByRole("button", { name: "Cancel" })),
    ],
    ["Escape", () => userEvent.keyboard("{Escape}")],
  ])("discards the draft on %s", async (_, dismiss) => {
    const onChange = jest.fn();
    renderPicker({
      defaultValue: range("2023-12-01", "2023-12-02"),
      shortcuts,
      onChange,
    });

    await openPicker();
    await userEvent.click(screen.getByRole("button", { name: "December" }));
    await dismiss();

    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByLabelText("Date range")).toHaveValue(
      "01/12/2023 — 02/12/2023"
    );
  });

  it("applies a shortcut to the draft and marks it pressed", async () => {
    const onChange = jest.fn();
    renderPicker({
      defaultValue: range("2023-12-01", "2023-12-02"),
      shortcuts,
      onChange,
    });

    await openPicker();
    await userEvent.click(
      screen.getByRole("button", { name: "Christmas week" })
    );

    expect(
      screen.getByRole("button", { name: "Christmas week" })
    ).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "December" })).toHaveAttribute(
      "aria-pressed",
      "false"
    );

    await userEvent.click(screen.getByRole("button", { name: "OK" }));

    expect(asStrings(onChange.mock.calls[0][0])).toEqual([
      "2023-12-25",
      "2023-12-31",
    ]);
  });

  it("marks Custom when the draft matches no shortcut", async () => {
    renderPicker({
      defaultValue: range("2023-12-01", "2023-12-02"),
      shortcuts,
    });

    await openPicker();

    const custom = screen.getByText("Custom").closest(".MuiChip-root");
    expect(custom).toHaveClass("MuiChip-filled");
  });

  it("disables a shortcut whose range breaks the date rules", async () => {
    renderPicker({
      defaultValue: range("2023-12-01", "2023-12-02"),
      maxDate: dayjs("2023-12-28"),
      shortcuts,
    });

    await openPicker();

    expect(
      screen.getByRole("button", { name: "Christmas week" })
    ).toHaveAttribute("aria-disabled", "true");
    expect(screen.getByRole("button", { name: "December" })).toHaveAttribute(
      "aria-disabled",
      "true"
    );
  });

  it("fires onAccept with the range on OK", async () => {
    const onAccept = jest.fn();
    renderPicker({
      defaultValue: range("2023-12-01", "2023-12-02"),
      shortcuts,
      onAccept,
    });

    await openPicker();
    await userEvent.click(
      screen.getByRole("button", { name: "Christmas week" })
    );
    await userEvent.click(screen.getByRole("button", { name: "OK" }));

    expect(asStrings(onAccept.mock.calls[0][0])).toEqual([
      "2023-12-25",
      "2023-12-31",
    ]);
  });

  it("takes button labels from the locale text", async () => {
    renderPicker({
      defaultValue: range("2023-12-01", "2023-12-02"),
      localeText: { okButtonLabel: "Iawn", cancelButtonLabel: "Canslo" },
    });

    await openPicker();

    expect(screen.getByRole("button", { name: "Iawn" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Canslo" })).toBeInTheDocument();
  });

  it("forwards a ref to the root element", () => {
    const ref = { current: null as HTMLDivElement | null };

    render(
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
        <DateRangePicker ref={ref} />
      </LocalizationProvider>
    );

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toContainElement(screen.getByLabelText("Date range"));
  });

  it("renders no shortcuts row without shortcuts", async () => {
    renderPicker({ defaultValue: range("2023-12-01", "2023-12-02") });

    await openPicker();

    expect(screen.queryByText("Custom")).not.toBeInTheDocument();
  });
});

describe("DateRangePicker split fields", () => {
  it("labels a start and an end field", () => {
    renderPicker({
      defaultValue: range("2023-12-14", "2024-01-14"),
      slots: { field: MultiInputDateRangeField },
    });

    expect(screen.getByLabelText("Start date")).toHaveValue("14/12/2023");
    expect(screen.getByLabelText("End date")).toHaveValue("14/01/2024");
  });

  it("commits a valid typed date", async () => {
    const onChange = jest.fn();
    renderPicker({
      defaultValue: range("2023-12-14", "2024-01-14"),
      slots: { field: MultiInputDateRangeField },
      onChange,
    });

    fireEvent.change(screen.getByLabelText("End date"), {
      target: { value: "20/01/2024" },
    });

    expect(asStrings(onChange.mock.calls.at(-1)[0])).toEqual([
      "2023-12-14",
      "2024-01-20",
    ]);
  });

  it("ignores a typed end date before the start", () => {
    const onChange = jest.fn();
    renderPicker({
      defaultValue: range("2023-12-14", "2024-01-14"),
      slots: { field: MultiInputDateRangeField },
      onChange,
    });

    fireEvent.change(screen.getByLabelText("End date"), {
      target: { value: "10/12/2023" },
    });

    expect(onChange).not.toHaveBeenCalled();
  });

  it("names the pair of fields as one group", () => {
    renderPicker({
      label: "Report period",
      slots: { field: MultiInputDateRangeField },
    });

    expect(
      screen.getByRole("group", { name: "Report period" })
    ).toBeInTheDocument();
  });
});

describe("DateRangePicker on small screens", () => {
  let restore: () => void;

  beforeEach(() => {
    restore = mockMatchMedia(true);
  });

  afterEach(() => {
    restore();
  });

  it("opens a dialog with typed fields and one month, without shortcuts", async () => {
    renderPicker({
      defaultValue: range("2023-12-14", "2023-12-21"),
      shortcuts,
    });

    await openPicker();

    expect(dialog()).toBeInTheDocument();
    expect(within(dialog()).getAllByRole("grid")).toHaveLength(1);
    expect(within(dialog()).getByLabelText("Start date")).toHaveValue(
      "14/12/2023"
    );
    expect(within(dialog()).getByText("Dec 14 — Dec 21")).toBeInTheDocument();
    expect(screen.queryByText("Christmas week")).not.toBeInTheDocument();
    expect(
      within(dialog()).queryByRole("button", { name: /^Choose range/ })
    ).not.toBeInTheDocument();
  });
});

describe("DateRangePicker theming", () => {
  it("applies an app override without losing the base layout", async () => {
    renderPicker(
      { defaultValue: range("2023-12-01", "2023-12-02") },
      {
        themeOptions: {
          components: {
            HdrukDateRangePicker: {
              styleOverrides: { footer: { gap: 40 } },
            },
          },
        },
      }
    );

    await openPicker();

    const footer = screen.getByRole("button", { name: "OK" })
      .parentElement as HTMLElement;
    const style = getComputedStyle(footer);

    expect(style.gap).toBe("40px");
    expect(style.justifyContent).toBe("flex-end");
  });

  it("takes default labels from the theme", () => {
    renderPicker(
      {},
      {
        themeOptions: {
          components: {
            HdrukDateRangePicker: {
              defaultProps: { label: "Ystod dyddiadau" },
            },
          },
        },
      }
    );

    expect(screen.getByLabelText("Ystod dyddiadau")).toBeInTheDocument();
  });
});
