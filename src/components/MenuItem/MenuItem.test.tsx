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

  it("marks a selected item down its left edge by default", () => {
    render(<MenuItem selected>Library</MenuItem>);

    expect(
      getComputedStyle(screen.getByRole("button", { name: "Library" }))
        .boxShadow
    ).toMatch(/^inset 3px 0 0 /);
  });

  it("marks a selected horizontal item along its bottom edge", () => {
    render(
      <MenuItem orientation="horizontal" selected>
        Library
      </MenuItem>
    );

    expect(
      getComputedStyle(screen.getByRole("button", { name: "Library" }))
        .boxShadow
    ).toMatch(/^inset 0 -3px 0 /);
  });

  it("sizes a horizontal item to its content", () => {
    render(<MenuItem orientation="horizontal">Library</MenuItem>);

    const style = getComputedStyle(
      screen.getByRole("button", { name: "Library" })
    );

    expect(style.display).toBe("inline-flex");
    expect(style.flexGrow).toBe("0");
  });

  it("centres its content when centered", () => {
    render(<MenuItem orientation="centered">Library</MenuItem>);

    expect(
      getComputedStyle(screen.getByRole("button", { name: "Library" }))
        .justifyContent
    ).toBe("center");
    expect(getComputedStyle(screen.getByText("Library")).textAlign).toBe(
      "center"
    );
  });

  it("marks a selected centered item along its bottom edge", () => {
    render(
      <MenuItem orientation="centered" selected>
        Library
      </MenuItem>
    );

    expect(
      getComputedStyle(screen.getByRole("button", { name: "Library" }))
        .boxShadow
    ).toMatch(/^inset 0 -3px 0 /);
  });

  it("keeps orientation off the DOM", () => {
    render(<MenuItem orientation="centered">Library</MenuItem>);

    expect(screen.getByRole("button", { name: "Library" })).not.toHaveAttribute(
      "orientation"
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

  it("takes its text colour from the palette's secondaryDefault text", () => {
    render(<MenuItem>Teams</MenuItem>, {
      themeOptions: {
        palette: { text: { secondaryDefault: "#FF0000" } },
      },
    });

    expect(
      getComputedStyle(screen.getByRole("button", { name: "Teams" })).color
    ).toBe("rgb(255, 0, 0)");
  });

  it("keeps app list item rounding off the row", () => {
    render(<MenuItem selected>Teams</MenuItem>, {
      themeOptions: {
        components: {
          MuiListItemButton: { styleOverrides: { root: { borderRadius: 8 } } },
        },
      },
    });

    expect(
      getComputedStyle(screen.getByRole("button", { name: "Teams" }))
        .borderRadius
    ).toBe("0");
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
