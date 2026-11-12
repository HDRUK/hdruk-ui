import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import userEvent from "@testing-library/user-event";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import { render, screen } from "../../test/renderWithTheme";
import { createColor, tokens } from ".";
import type { RenderWithThemeOptions } from "../../test/renderWithTheme";
import type { DesktopDatePickerProps } from "@mui/x-date-pickers/DesktopDatePicker";

const hexToRgb = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16));
  return `rgb(${r}, ${g}, ${b})`;
};

const renderPicker = (
  props: Partial<DesktopDatePickerProps> = {},
  options?: RenderWithThemeOptions
) =>
  render(
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      <DesktopDatePicker
        label="Select date"
        defaultValue={dayjs("2023-10-08")}
        views={["year", "month", "day"]}
        {...props}
      />
    </LocalizationProvider>,
    options
  );

const openPicker = () =>
  userEvent.click(screen.getByRole("button", { name: /^Choose date/ }));

const field = (container: HTMLElement) =>
  container.querySelector(".MuiPickersOutlinedInput-root") as HTMLElement;

const paper = () =>
  screen
    .getByRole("dialog")
    .querySelector(".MuiPickerPopper-paper") as HTMLElement;

const shadowOf = (el: HTMLElement) =>
  getComputedStyle(el).boxShadow.replace(/,(?=\S)/g, ", ");

const focusedOutlineColour = (container: HTMLElement) => {
  const cls = [...field(container).classList].find(c => c.startsWith("css-"));
  const rule = Array.from(document.styleSheets)
    .flatMap(sheet => Array.from(sheet.cssRules ?? []))
    .map(r => r.cssText)
    .filter(text =>
      text.startsWith(
        `.${cls}.Mui-focused:not(.Mui-error) .MuiPickersOutlinedInput-notchedOutline`
      )
    )
    .pop();
  return rule?.match(/border-color: ([^;]*);/)?.[1].toLowerCase();
};

describe("date picker field", () => {
  it.each(["small", "medium"] as const)(
    "insets a %s field like the other outlined inputs",
    size => {
      const { container } = renderPicker({
        slotProps: { textField: { size } },
      });

      const sections = field(container).querySelector(
        ".MuiPickersInputBase-sectionsContainer"
      ) as HTMLElement;

      expect(getComputedStyle(sections).padding).toBe("8px 0px");
      expect(getComputedStyle(field(container)).padding).toBe("0px 12px");
    }
  );

  it("outlines the focused field in the selected colour", () => {
    const { container } = renderPicker();

    expect(focusedOutlineColour(container)).toBe(
      tokens.status.selected.toLowerCase()
    );
  });
});

describe("date picker popup", () => {
  it("draws the popup as a card", async () => {
    renderPicker();

    await openPicker();

    expect(getComputedStyle(paper()).borderRadius).toBe(
      `${tokens.radius.small}px`
    );
    expect(shadowOf(paper())).toBe(tokens.elevation[2]);
  });

  it("insets the calendar inside the card", async () => {
    renderPicker();

    await openPicker();

    expect(getComputedStyle(paper()).padding).toBe("24px");
  });

  it.each([
    ["month", "October"],
    ["year", "2023"],
  ] as const)(
    "fills the selected %s with the primary colour",
    async (view, label) => {
      renderPicker({ openTo: view });

      await openPicker();

      const cell = getComputedStyle(screen.getByRole("radio", { name: label }));
      expect(cell.backgroundColor).toBe(hexToRgb(tokens.brand.primary));
      expect(cell.color).toBe(hexToRgb(tokens.text.primaryWhite));
    }
  );
});

describe("date picker theming", () => {
  it("lets a site override the card without losing the base surface", async () => {
    renderPicker(
      {},
      {
        themeOptions: {
          components: {
            MuiPickerPopper: {
              styleOverrides: { paper: { borderRadius: 12 } },
            },
          },
        },
      }
    );

    await openPicker();

    expect(getComputedStyle(paper()).borderRadius).toBe("12px");
    expect(shadowOf(paper())).toBe(tokens.elevation[2]);
  });

  it("lets a site override a day without losing the base size", async () => {
    renderPicker(
      {},
      {
        themeOptions: {
          components: {
            MuiPickersDay: { styleOverrides: { root: { fontWeight: 700 } } },
          },
        },
      }
    );

    await openPicker();

    const day = getComputedStyle(screen.getByRole("gridcell", { name: "9" }));
    expect(day.fontWeight).toBe("700");
    expect(day.width).toBe("40px");
  });

  it("follows a site's palette", async () => {
    const { container } = renderPicker(
      { openTo: "month" },
      {
        themeOptions: {
          palette: {
            primary: createColor("#a4177f"),
            status: { selected: "#4b7e59" },
          },
        },
      }
    );

    expect(focusedOutlineColour(container)).toBe("#4b7e59");

    await openPicker();

    expect(
      getComputedStyle(screen.getByRole("radio", { name: "October" }))
        .backgroundColor
    ).toBe("rgb(164, 23, 127)");
  });
});
