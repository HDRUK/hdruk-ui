import * as React from "react";
import userEvent from "@testing-library/user-event";
import { fireEvent, render, screen } from "../../../test/renderWithTheme";
import { MenuDropdown } from "../MenuDropdown";
import { MenuItem } from "../MenuItem";
import { LeftNav } from "./LeftNav";

const endTransition = (element: Element, propertyName: string) => {
  const event = new Event("transitionend", { bubbles: true });
  Object.assign(event, { propertyName });
  fireEvent(element, event);
};

const renderNav = (
  props: Partial<React.ComponentProps<typeof LeftNav>> = {},
  options?: Parameters<typeof render>[1]
) =>
  render(
    <LeftNav heading="Your profile" {...props}>
      <MenuItem
        component="a"
        href="/dashboard"
        icon={<span />}
        selected
        aria-current="page">
        Dashboard
      </MenuItem>
      <MenuDropdown label="Integrations" icon={<span />}>
        <MenuItem component="a" href="/widgets">
          Widgets
        </MenuItem>
      </MenuDropdown>
    </LeftNav>,
    options
  );

describe("LeftNav", () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it("is a navigation landmark with a default name", () => {
    renderNav();

    expect(
      screen.getByRole("navigation", { name: "Navigation" })
    ).toBeInTheDocument();
  });

  it("uses a caller-supplied landmark name", () => {
    renderNav({ "aria-label": "Account" });

    expect(
      screen.getByRole("navigation", { name: "Account" })
    ).toBeInTheDocument();
  });

  it("collapses to a rail and reports the change", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    renderNav({ onChange });

    const toggle = screen.getByRole("button", { name: "Collapse navigation" });
    expect(toggle).toHaveAttribute("aria-expanded", "true");

    await user.click(toggle);

    expect(
      screen.getByRole("button", { name: "Expand navigation" })
    ).toHaveAttribute("aria-expanded", "false");
    expect(onChange).toHaveBeenCalledWith(expect.anything(), false);
  });

  it("animates the width with the theme's screen durations", async () => {
    const user = userEvent.setup();
    renderNav();

    await user.click(
      screen.getByRole("button", { name: "Collapse navigation" })
    );
    expect(getComputedStyle(screen.getByRole("navigation")).transition).toBe(
      "width 195ms cubic-bezier(0.4, 0, 1, 1) 0ms"
    );

    await user.click(screen.getByRole("button", { name: "Expand navigation" }));
    expect(getComputedStyle(screen.getByRole("navigation")).transition).toBe(
      "width 225ms cubic-bezier(0.0, 0, 0.2, 1) 0ms"
    );
  });

  it("uses a caller-supplied transition duration", () => {
    renderNav({ transitionDuration: 0 });

    expect(getComputedStyle(screen.getByRole("navigation")).transition).toBe(
      "width 0ms cubic-bezier(0.0, 0, 0.2, 1) 0ms"
    );
  });

  it("fades the labels over the width animation's duration", () => {
    renderNav({ transitionDuration: 0 });

    expect(
      getComputedStyle(screen.getAllByText("Your profile")[0]).transition
    ).toMatch(/^opacity 0ms /);
    expect(getComputedStyle(screen.getByText("Dashboard")).transition).toMatch(
      /^opacity 0ms /
    );
  });

  it("clips its content until the width transition ends", async () => {
    const user = userEvent.setup();
    renderNav({ defaultExpanded: false });
    const nav = screen.getByRole("navigation");

    await user.click(screen.getByRole("button", { name: "Expand navigation" }));
    expect(getComputedStyle(nav).overflowX).toBe("hidden");
    expect(getComputedStyle(nav).whiteSpace).toBe("nowrap");

    endTransition(nav, "opacity");
    expect(getComputedStyle(nav).overflowX).toBe("hidden");

    endTransition(nav, "width");
    expect(getComputedStyle(nav).overflowX).not.toBe("hidden");
  });

  it("stops clipping when no width transition runs", async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    renderNav({ defaultExpanded: false });
    const nav = screen.getByRole("navigation");

    await user.click(screen.getByRole("button", { name: "Expand navigation" }));
    React.act(() => {
      jest.advanceTimersByTime(225);
    });
    expect(getComputedStyle(nav).overflowX).toBe("hidden");

    React.act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(getComputedStyle(nav).overflowX).not.toBe("hidden");
  });

  it("fades the heading out in place before hiding it", async () => {
    const user = userEvent.setup();
    renderNav();
    const heading = screen.getAllByText("Your profile")[0];

    await user.click(
      screen.getByRole("button", { name: "Collapse navigation" })
    );
    expect(getComputedStyle(heading).position).not.toBe("absolute");
    expect(getComputedStyle(heading).opacity).toBe("0");

    endTransition(screen.getByRole("navigation"), "width");
    expect(getComputedStyle(heading).position).toBe("absolute");
  });

  it("keeps every item named in the rail", () => {
    renderNav({ defaultExpanded: false });

    expect(screen.getByRole("link", { name: "Dashboard" })).toHaveAttribute(
      "aria-current",
      "page"
    );
    expect(
      screen.getByRole("button", { name: "Integrations" })
    ).toHaveAttribute("aria-expanded", "false");
  });

  it("expands the rail and opens a section from its trigger", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    renderNav({ defaultExpanded: false, onChange });

    await user.click(screen.getByRole("button", { name: "Integrations" }));

    expect(
      screen.getByRole("button", { name: "Collapse navigation" })
    ).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByRole("button", { name: "Integrations" })
    ).toHaveAttribute("aria-expanded", "true");
    expect(onChange).toHaveBeenCalledWith(expect.anything(), true);
  });

  it("shows and hides the list from the mobile toggle", async () => {
    const user = userEvent.setup();
    renderNav();

    const toggle = screen.getByRole("button", { name: "Your profile" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    await user.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "true");
  });

  it("underlines the mobile toggle only while its list is open", async () => {
    const user = userEvent.setup();
    renderNav();

    const toggle = screen.getByRole("button", { name: "Your profile" });
    expect(toggle).not.toHaveClass("Mui-selected");

    await user.click(toggle);

    expect(toggle).toHaveClass("Mui-selected");
    expect(getComputedStyle(toggle).boxShadow).toMatch(/^inset 0 -3px 0 /);
  });

  it("closes the mobile list when one of its links is followed", async () => {
    const user = userEvent.setup();
    renderNav();

    const toggle = screen.getByRole("button", { name: "Your profile" });
    await user.click(toggle);
    await user.click(screen.getByRole("link", { name: "Dashboard" }));

    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("keeps the mobile list open when a section is toggled", async () => {
    const user = userEvent.setup();
    renderNav();

    const toggle = screen.getByRole("button", { name: "Your profile" });
    await user.click(toggle);
    await user.click(screen.getByRole("button", { name: "Integrations" }));

    expect(toggle).toHaveAttribute("aria-expanded", "true");
  });

  it("uses caller-supplied toggle labels", () => {
    renderNav({ collapseText: "Hide menu", expandText: "Show menu" });

    expect(
      screen.getByRole("button", { name: "Hide menu" })
    ).toBeInTheDocument();
  });

  it("forwards a ref to the root element", () => {
    const ref = React.createRef<HTMLElement>();
    renderNav({ ref });

    expect(ref.current).toBe(screen.getByRole("navigation"));
  });
});

describe("LeftNav theme integration", () => {
  it("applies defaultProps registered under HdrukLeftNav", () => {
    renderNav(
      {},
      {
        themeOptions: {
          components: {
            HdrukLeftNav: { defaultProps: { defaultExpanded: false } },
          },
        },
      }
    );

    expect(
      screen.getByRole("button", { name: "Expand navigation" })
    ).toBeInTheDocument();
  });

  it("lets an explicit prop win over the theme default", () => {
    renderNav(
      { defaultExpanded: true },
      {
        themeOptions: {
          components: {
            HdrukLeftNav: { defaultProps: { defaultExpanded: false } },
          },
        },
      }
    );

    expect(
      screen.getByRole("button", { name: "Collapse navigation" })
    ).toBeInTheDocument();
  });

  it("keeps app Typography margins out of the heading", () => {
    renderNav(
      {},
      {
        themeOptions: {
          components: {
            MuiTypography: {
              styleOverrides: { body1: { marginBottom: 8 } },
            },
          },
        },
      }
    );

    expect(
      getComputedStyle(screen.getAllByText("Your profile")[0]).marginBottom
    ).not.toBe("8px");
  });

  it("sizes the toggle to fill its header cell, square-cornered", () => {
    renderNav();

    const style = getComputedStyle(
      screen.getByRole("button", { name: "Collapse navigation" })
    );

    expect(style.paddingTop).toBe("8px");
    expect(style.paddingLeft).toBe("12px");
    expect(style.borderRadius).toBe("0");
  });

  it("keeps app icon button borders and fills off the toggle", () => {
    renderNav(
      {},
      {
        themeOptions: {
          components: {
            MuiIconButton: {
              styleOverrides: {
                root: { border: "1px solid red", backgroundColor: "red" },
              },
            },
          },
        },
      }
    );

    const style = getComputedStyle(
      screen.getByRole("button", { name: "Collapse navigation" })
    );

    expect(style.borderTopStyle).not.toBe("solid");
    expect(style.backgroundColor).not.toBe("rgb(255, 0, 0)");
  });

  it("lets a site restyle the root without losing the base styles", () => {
    renderNav(
      {},
      {
        themeOptions: {
          components: {
            HdrukLeftNav: { styleOverrides: { root: { width: 280 } } },
          },
        },
      }
    );

    const style = getComputedStyle(screen.getByRole("navigation"));

    expect(style.width).toBe("280px");
    expect(style.backgroundColor).toBe("rgb(255, 255, 255)");
  });
});
