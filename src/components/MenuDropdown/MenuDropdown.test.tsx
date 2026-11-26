import * as React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen } from "../../../test/renderWithTheme";
import { MenuItem } from "../MenuItem";
import { MenuDropdown } from "./MenuDropdown";

const renderDropdown = (
  props: Partial<React.ComponentProps<typeof MenuDropdown>> = {},
  options?: Parameters<typeof render>[1]
) =>
  render(
    <MenuDropdown label="Integrations" {...props}>
      <MenuItem component="a" href="/custom">
        Custom Integrations
      </MenuItem>
      <MenuItem component="a" href="/widgets">
        Widgets
      </MenuItem>
    </MenuDropdown>,
    options
  );

const trigger = () => screen.getByRole("button", { name: "Integrations" });

describe("MenuDropdown", () => {
  it("starts collapsed with its items hidden", () => {
    renderDropdown();

    expect(trigger()).toHaveAttribute("aria-expanded", "false");
    expect(
      screen.queryByRole("link", { name: "Widgets" })
    ).not.toBeInTheDocument();
  });

  it("toggles its items on click", async () => {
    const user = userEvent.setup();
    renderDropdown();

    await user.click(trigger());

    expect(trigger()).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("link", { name: "Widgets" })).toBeVisible();

    await user.click(trigger());

    expect(trigger()).toHaveAttribute("aria-expanded", "false");
  });

  it("toggles from the keyboard with Enter and Space", async () => {
    const user = userEvent.setup();
    renderDropdown();

    trigger().focus();
    await user.keyboard("{Enter}");
    expect(trigger()).toHaveAttribute("aria-expanded", "true");

    await user.keyboard(" ");
    expect(trigger()).toHaveAttribute("aria-expanded", "false");
  });

  it("controls a group named by its trigger", () => {
    renderDropdown({ defaultExpanded: true });

    const group = screen.getByRole("group", { name: "Integrations" });

    expect(trigger()).toHaveAttribute("aria-controls", group.id);
    expect(group).toContainElement(
      screen.getByRole("link", { name: "Widgets" })
    );
  });

  it("starts expanded with defaultExpanded", () => {
    renderDropdown({ defaultExpanded: true });

    expect(trigger()).toHaveAttribute("aria-expanded", "true");
  });

  it("follows a controlled expanded prop and reports clicks", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    const { rerender } = renderDropdown({ expanded: false, onChange });

    await user.click(trigger());

    expect(onChange).toHaveBeenCalledWith(expect.anything(), true);
    expect(trigger()).toHaveAttribute("aria-expanded", "false");

    rerender(
      <MenuDropdown label="Integrations" expanded onChange={onChange}>
        <MenuItem component="a" href="/widgets">
          Widgets
        </MenuItem>
      </MenuDropdown>
    );

    expect(trigger()).toHaveAttribute("aria-expanded", "true");
  });

  it("reports the uncontrolled toggle too", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    renderDropdown({ onChange });

    await user.click(trigger());

    expect(onChange).toHaveBeenCalledWith(expect.anything(), true);
    expect(trigger()).toHaveAttribute("aria-expanded", "true");
  });

  it("keeps its own toggle when slotProps are passed", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();

    renderDropdown({
      slotProps: {
        // @ts-expect-error onClick and aria-expanded are owned by the dropdown
        trigger: { onClick, "aria-expanded": true },
      },
    });

    expect(trigger()).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger());

    expect(onClick).not.toHaveBeenCalled();
    expect(trigger()).toHaveAttribute("aria-expanded", "true");
  });

  it("forwards a ref to the root element", () => {
    const ref = React.createRef<HTMLDivElement>();
    renderDropdown({ ref });

    expect(ref.current).toContainElement(trigger());
  });
});

describe("MenuDropdown theme integration", () => {
  it("applies defaultProps registered under HdrukMenuDropdown", () => {
    renderDropdown(
      {},
      {
        themeOptions: {
          components: {
            HdrukMenuDropdown: { defaultProps: { defaultExpanded: true } },
          },
        },
      }
    );

    expect(trigger()).toHaveAttribute("aria-expanded", "true");
  });

  it("lets an explicit prop win over the theme default", () => {
    renderDropdown(
      { defaultExpanded: false },
      {
        themeOptions: {
          components: {
            HdrukMenuDropdown: { defaultProps: { defaultExpanded: true } },
          },
        },
      }
    );

    expect(trigger()).toHaveAttribute("aria-expanded", "false");
  });

  it("lets a site restyle the nested list without losing the base styles", () => {
    renderDropdown(
      { defaultExpanded: true },
      {
        themeOptions: {
          components: {
            HdrukMenuDropdown: {
              styleOverrides: { list: { borderLeftColor: "rgb(255, 0, 0)" } },
            },
          },
        },
      }
    );

    const style = getComputedStyle(
      screen.getByRole("group", { name: "Integrations" })
    );

    expect(style.borderLeftColor).toBe("rgb(255, 0, 0)");
    expect(style.borderLeftWidth).toBe("1px");
    expect(style.marginLeft).toBe("24px");
  });
});
