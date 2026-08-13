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

  it("replaces a supplied startIcon with the spinner", () => {
    render(
      <Button loading startIcon={<span data-testid="start-icon" />}>
        Go
      </Button>
    );

    expect(screen.queryByTestId("start-icon")).not.toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
