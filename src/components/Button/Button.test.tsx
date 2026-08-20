import MuiButton from "@mui/material/Button";
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
      classes: ["MuiButton-outlined", "MuiButton-colorSecondary"],
    },
    {
      purpose: "tertiary",
      classes: ["MuiButton-outlined", "MuiButton-colorInherit"],
    },
    {
      purpose: "destructive",
      classes: ["MuiButton-contained", "MuiButton-colorError"],
    },
    {
      purpose: "link",
      classes: ["MuiButton-text", "MuiButton-colorLink"],
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

  it("forwards a ref to the button element", () => {
    const ref = { current: null as HTMLButtonElement | null };

    render(<Button ref={ref}>Go</Button>);

    expect(ref.current).toBe(screen.getByRole("button"));
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
    expect(style.minHeight).toBe("40px");
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

  it("lets a site add a prop-matched variant, not just flat overrides", () => {
    // How cohort discovery keeps its tertiary square while every other purpose
    // is a pill: `cornerRounding` is 48 but `tertiaryCornerRounding` is 4. An
    // app-level `MuiButton.variants` would replace the library's whole array,
    // so `HdrukButton.variants` is the only seam that can express this.
    render(
      <>
        <Button purpose="primary">Matched</Button>
        <Button purpose="tertiary">Unmatched</Button>
      </>,
      {
        themeOptions: {
          components: {
            HdrukButton: {
              styleOverrides: { root: { borderRadius: 9999 } },
              variants: [
                {
                  props: { variant: "contained", color: "primary" },
                  style: { borderRadius: 4 },
                },
              ],
            },
          },
        },
      }
    );

    // The variant must beat the site's own root override, or the exception
    // cannot be carved out of it.
    expect(
      getComputedStyle(screen.getByRole("button", { name: "Matched" }))
        .borderRadius
    ).toBe("4px");
    expect(
      getComputedStyle(screen.getByRole("button", { name: "Unmatched" }))
        .borderRadius
    ).toBe("9999px");
  });

  it("lets a site override a state rule, not just a resting one", () => {
    // The library's state rules land at 0,2,0. A site only reaches them by
    // repeating the selector — a flat property in `root` is 0,1,0 and loses.
    render(<Button disabled>Go</Button>, {
      themeOptions: {
        components: {
          HdrukButton: {
            styleOverrides: {
              root: { "&.Mui-disabled": { backgroundColor: "rgb(1, 2, 3)" } },
            },
          },
        },
      },
    });

    expect(getComputedStyle(screen.getByRole("button")).backgroundColor).toBe(
      "rgb(1, 2, 3)"
    );
  });
});

describe("Button metrics", () => {
  it("gives the default size the design's 40px box and 8px/12px padding", () => {
    render(<Button>Go</Button>);

    const style = getComputedStyle(screen.getByRole("button"));

    expect(style.minHeight).toBe("40px");
    expect(style.lineHeight).toBe("1.5rem");
    expect(style.paddingTop).toBe("8px");
    expect(style.paddingLeft).toBe("12px");
  });

  it("keeps the secondary button's text 12px from the outer edge", () => {
    render(<Button purpose="secondary">Go</Button>);

    const style = getComputedStyle(screen.getByRole("button"));

    expect(style.minHeight).toBe("40px");
    expect(style.borderWidth).toBe("2px");
    expect(style.paddingTop).toBe("6px");
    expect(style.paddingLeft).toBe("10px");
  });

  it("gives the tertiary button a white fill, thin grey border and regular label", () => {
    render(<Button purpose="tertiary">Go</Button>);

    const style = getComputedStyle(screen.getByRole("button"));

    expect(style.minHeight).toBe("40px");
    expect(style.backgroundColor).toBe("rgb(255, 255, 255)");
    expect(style.color).toBe("rgb(38, 38, 38)");
    expect(style.fontWeight).toBe("400");
    expect(style.borderWidth).toBe("1px");
    expect(style.borderColor).toBe("rgb(134, 142, 150)");
    expect(style.paddingTop).toBe("7px");
    expect(style.paddingLeft).toBe("11px");
  });

  it("gives the small size a 28px box, which needs its own 20px label", () => {
    render(<Button size="small">Go</Button>);

    const style = getComputedStyle(screen.getByRole("button"));

    expect(style.minHeight).toBe("28px");
    expect(style.lineHeight).toBe("1.25rem");
    expect(style.paddingTop).toBe("4px");
    expect(style.paddingLeft).toBe("12px");
  });

  it("gives every purpose the same label box at a given size", () => {
    render(
      <>
        <Button size="small">Primary</Button>
        <Button size="small" purpose="tertiary">
          Tertiary
        </Button>
      </>
    );

    const [primary, tertiary] = screen
      .getAllByRole("button")
      .map(button => getComputedStyle(button));

    expect(tertiary.lineHeight).toBe(primary.lineHeight);
    expect(tertiary.minHeight).toBe(primary.minHeight);
  });

  it("clamps a `large` that reaches the theme past ButtonProps", () => {
    // `size` is narrowed to small|medium, so this is only reachable from a raw
    // MuiButton — which a consuming app still has.
    render(<MuiButton size="large">Go</MuiButton>);

    const style = getComputedStyle(screen.getByRole("button"));

    expect(style.minHeight).toBe("40px");
    expect(style.paddingTop).toBe("8px");
    expect(style.paddingLeft).toBe("12px");
    expect(style.fontSize).toBe("0.875rem");
  });
});

describe("Button label colour", () => {
  it.each([
    ["secondary", "rgb(38, 38, 38)", "rgb(44, 130, 103)"],
    ["tertiary", "rgb(38, 38, 38)", "rgb(134, 142, 150)"],
  ] as const)("keeps %s's label dark and its border its own colour", (
    purpose,
    color,
    borderColor
  ) => {
    render(<Button purpose={purpose}>Go</Button>);

    const style = getComputedStyle(screen.getByRole("button"));

    expect(style.color).toBe(color);
    expect(style.borderColor).toBe(borderColor);
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

describe("Button link metrics", () => {
  it("drops the button box so it sits inline as text", () => {
    render(<Button purpose="link">Read more</Button>);

    const style = getComputedStyle(screen.getByRole("button"));

    expect(style.paddingTop).toBe("0px");
    expect(style.paddingLeft).toBe("0px");
    expect(style.minHeight).toBe("0");
    expect(style.minWidth).toBe("0");
    expect(style.lineHeight).toBe("1.3");
    expect(style.textDecoration).toBe("none");
  });

  it("gives the small link the design's 13px, not the small button's box", () => {
    render(
      <Button purpose="link" size="small">
        Read more
      </Button>
    );

    const style = getComputedStyle(screen.getByRole("button"));

    expect(style.fontSize).toBe("0.8125rem");
    expect(style.paddingTop).toBe("0px");
    expect(style.minHeight).toBe("0");
  });

  it("squares the focus ring off, since a link has no box", () => {
    // An outline follows the element's border-radius and CSS has no
    // outline-radius, so zeroing the link's own radius is what keeps the ring
    // from implying a box. A site rounding its buttons must not reach it.
    render(<Button purpose="link">Read more</Button>);

    expect(getComputedStyle(screen.getByRole("button")).borderRadius).toBe("0");
  });

  it("leaves a disabled link as grey text, with no filled pill", () => {
    render(
      <Button purpose="link" disabled>
        Read more
      </Button>
    );

    const style = getComputedStyle(screen.getByRole("button"));

    expect(style.color).toBe("rgb(134, 142, 150)");
    expect(style.backgroundColor).toBe("rgba(0, 0, 0, 0)");
  });

  it("renders an anchor when given an href, still unstyled at rest", () => {
    render(
      <Button purpose="link" href="/datasets">
        Read more
      </Button>
    );

    const link = screen.getByRole("link", { name: "Read more" });

    expect(link.tagName).toBe("A");
    expect(getComputedStyle(link).textDecoration).toBe("none");
  });
});
