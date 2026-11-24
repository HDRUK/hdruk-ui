import * as React from "react";
import { render, screen } from "../../../test/renderWithTheme";
import { MenuItem } from "./MenuItem";

describe("MenuItem", () => {
  it("renders its label and leading icon", () => {
    render(<MenuItem icon={<span data-testid="icon" />}>Dashboard</MenuItem>);

    expect(
      screen.getByRole("button", { name: "Dashboard" })
    ).toBeInTheDocument();
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("renders as a link when given a component and href", () => {
    render(
      <MenuItem component="a" href="/library">
        Library
      </MenuItem>
    );

    expect(screen.getByRole("link", { name: "Library" })).toHaveAttribute(
      "href",
      "/library"
    );
  });

  it("marks the selected item and emboldens its label", () => {
    render(
      <MenuItem component="a" href="/library" selected aria-current="page">
        Library
      </MenuItem>
    );

    const link = screen.getByRole("link", { name: "Library" });

    expect(link).toHaveClass("Mui-selected");
    expect(getComputedStyle(screen.getByText("Library")).fontWeight).toBe(
      "600"
    );
  });

  it("takes a disabled item out of the tab order", () => {
    render(<MenuItem disabled>Teams</MenuItem>);

    expect(screen.getByRole("button", { name: "Teams" })).toHaveAttribute(
      "tabindex",
      "-1"
    );
  });

  it("forwards a ref to the root element", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<MenuItem ref={ref}>Teams</MenuItem>);

    expect(ref.current).toBe(screen.getByRole("button", { name: "Teams" }));
  });
});

describe("MenuItem theme integration", () => {
  it("applies defaultProps registered under HdrukMenuItem", () => {
    render(<MenuItem>Teams</MenuItem>, {
      themeOptions: {
        components: { HdrukMenuItem: { defaultProps: { disabled: true } } },
      },
    });

    expect(screen.getByRole("button", { name: "Teams" })).toHaveClass(
      "Mui-disabled"
    );
  });

  it("lets an explicit prop win over the theme default", () => {
    render(<MenuItem disabled={false}>Teams</MenuItem>, {
      themeOptions: {
        components: { HdrukMenuItem: { defaultProps: { disabled: true } } },
      },
    });

    expect(screen.getByRole("button", { name: "Teams" })).not.toHaveClass(
      "Mui-disabled"
    );
  });

  it("keeps app Typography margins out of the label", () => {
    render(<MenuItem>Teams</MenuItem>, {
      themeOptions: {
        components: {
          MuiTypography: {
            styleOverrides: { body1: { marginBottom: 8 } },
          },
        },
      },
    });

    expect(getComputedStyle(screen.getByText("Teams")).marginBottom).not.toBe(
      "8px"
    );
  });

  it("lets a site restyle the root without losing the base styles", () => {
    render(<MenuItem>Teams</MenuItem>, {
      themeOptions: {
        components: {
          HdrukMenuItem: { styleOverrides: { root: { minHeight: 48 } } },
        },
      },
    });

    const style = getComputedStyle(
      screen.getByRole("button", { name: "Teams" })
    );

    expect(style.minHeight).toBe("48px");
    expect(style.paddingTop).toBe("8px");
    expect(style.paddingLeft).toBe("12px");
  });

  it("keeps app MuiListItemButton selected styles off a selected item", () => {
    render(<MenuItem selected>Teams</MenuItem>, {
      themeOptions: {
        components: {
          MuiListItemButton: {
            styleOverrides: {
              root: { "&.Mui-selected": { backgroundColor: "red" } },
            },
          },
        },
      },
    });

    expect(
      getComputedStyle(screen.getByRole("button", { name: "Teams" }))
        .backgroundColor
    ).not.toBe("rgb(255, 0, 0)");
  });
});
