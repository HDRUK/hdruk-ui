import { render, screen } from "../../../test/renderWithTheme";
import { Button } from "./Button";
import type { ButtonPurpose } from "./Button";

describe("Button purpose mapping", () => {
  const cases: { purpose: ButtonPurpose; classes: string[] }[] = [
    {
      purpose: "primary",
      classes: ["MuiButton-contained", "MuiButton-colorPrimary"],
    },
    {
      purpose: "secondary",
      classes: ["MuiButton-outlined", "MuiButton-colorPrimary"],
    },
    {
      purpose: "tertiary",
      classes: ["MuiButton-text", "MuiButton-colorPrimary"],
    },
    {
      purpose: "destructive",
      classes: ["MuiButton-contained", "MuiButton-colorError"],
    },
  ];

  it.each(cases)("maps $purpose to $classes", ({ purpose, classes }) => {
    render(<Button purpose={purpose}>Go</Button>);

    expect(screen.getByRole("button", { name: "Go" })).toHaveClass(...classes);
  });

  it("defaults to primary", () => {
    render(<Button>Go</Button>);

    expect(screen.getByRole("button")).toHaveClass(
      "MuiButton-contained",
      "MuiButton-colorPrimary"
    );
  });

  it("lets an explicit variant and color win over the mapping", () => {
    render(
      <Button purpose="primary" variant="text" color="secondary">
        Go
      </Button>
    );

    expect(screen.getByRole("button")).toHaveClass(
      "MuiButton-text",
      "MuiButton-colorSecondary"
    );
  });
});

describe("Button theme integration", () => {
  it("merges an app purposeMap over the library base map", () => {
    render(<Button purpose="primary">Go</Button>, {
      themeOptions: {
        components: {
          HdrukButton: {
            defaultProps: {
              purposeMap: { primary: { variant: "outlined", color: "error" } },
            },
          },
        },
      },
    });

    expect(screen.getByRole("button")).toHaveClass(
      "MuiButton-outlined",
      "MuiButton-colorError"
    );
  });

  it("lets a site restyle the button without losing the base root styles", () => {
    render(<Button>Go</Button>, {
      themeOptions: {
        components: {
          HdrukButton: {
            styleOverrides: { root: { borderRadius: 999 } },
          },
        },
      },
    });

    const style = getComputedStyle(screen.getByRole("button"));

    expect(style.borderRadius).toBe("999px");
    // HdrukButton is the seam: the base MuiButton root styles still apply.
    expect(style.paddingLeft).toBe("16px");
  });

  it("leaves unmapped purposes on the library base map", () => {
    render(<Button purpose="secondary">Go</Button>, {
      themeOptions: {
        components: {
          HdrukButton: {
            defaultProps: {
              purposeMap: { primary: { variant: "text" } },
            },
          },
        },
      },
    });

    expect(screen.getByRole("button")).toHaveClass("MuiButton-outlined");
  });

  it("applies styleOverrides registered under HdrukButton", () => {
    render(<Button>Go</Button>, {
      themeOptions: {
        components: {
          HdrukButton: {
            styleOverrides: { root: { textTransform: "lowercase" } },
          },
        },
      },
    });

    expect(getComputedStyle(screen.getByRole("button")).textTransform).toBe(
      "lowercase"
    );
  });
});

describe("Button loading state", () => {
  it("shows a spinner and disables the button", () => {
    render(<Button loading>Go</Button>);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("keeps the label readable by loading from the start position", () => {
    render(<Button loading>Go</Button>);

    expect(screen.getByText("Go")).toBeInTheDocument();
  });

  it("keeps a supplied startIcon mounted, with the spinner over it", () => {
    render(
      <Button loading startIcon={<span data-testid="start-icon" />}>
        Go
      </Button>
    );

    expect(screen.getByTestId("start-icon")).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
