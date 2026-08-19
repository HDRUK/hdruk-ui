import theme, { createColor, createHdrukTheme, tokens } from ".";

/**
 * Covers the theme's *structure and behaviour* — how tokens are wired into MUI's
 * slots, how a site theme merges over the base, and decisions that would be
 * silently re-broken.
 *
 * Colours and type sizes are deliberately not pinned: a wrong one is obvious in
 * Storybook, and asserting them only means updating a test every time the design
 * changes. Values are pinned only where breakage is invisible — spacing and
 * breakpoints, which reflow apps without anyone looking at that screen.
 */

const HEADINGS = ["h1", "h2", "h3", "h4", "h5", "h6"] as const;

describe("palette contract", () => {
  it("maps brand onto MUI's primary and secondary slots", () => {
    expect(theme.palette.primary).toMatchObject({
      main: tokens.brand.primary,
      dark: tokens.brand.primaryHovered,
      light: tokens.brand.accentPrimary,
      contrastText: tokens.text.primaryWhite,
    });
    expect(theme.palette.secondary).toMatchObject({
      main: tokens.brand.secondary,
      dark: tokens.brand.secondaryHovered,
      light: tokens.brand.accentSecondary,
      contrastText: tokens.text.primaryWhite,
    });
  });

  it("maps status onto MUI's semantic slots", () => {
    expect(theme.palette.success.main).toBe(tokens.status.success);
    expect(theme.palette.error.main).toBe(tokens.status.error);
    expect(theme.palette.warning.main).toBe(tokens.status.warning);
    expect(theme.palette.info.main).toBe(tokens.status.information);
  });

  it("maps text, background and divider onto MUI's slots", () => {
    expect(theme.palette.text.primary).toBe(tokens.text.primaryBlack);
    expect(theme.palette.text.secondary).toBe(tokens.text.faded);
    expect(theme.palette.text.disabled).toBe(tokens.text.disabled);
    expect(theme.palette.background.default).toBe(tokens.background.primary);
    expect(theme.palette.background.paper).toBe(tokens.background.white);
    expect(theme.palette.divider).toBe(tokens.background.secondary);
    expect(theme.palette.link.main).toBe(tokens.brand.primary);
  });

  it("exposes the tokens MUI has no slot for", () => {
    // The key sets are the contract — apps reference these by name, so adding
    // or removing one changes what they can rely on.
    expect(Object.keys(theme.palette.brand).sort()).toEqual([
      "accentPrimary",
      "accentSecondary",
      "primary",
      "primaryHovered",
      "secondary",
      "secondaryHovered",
    ]);
    expect(Object.keys(theme.palette.status).sort()).toEqual([
      "announcement",
      "archived",
      "archivedHovered",
      "disabled",
      "faded",
      "hovered",
      "keyboardFocus",
      "needsAction",
      "needsActionHover",
      "selected",
    ]);
  });
});

describe("layout contract", () => {
  // Only values whose breakage is invisible: apps write `spacing(2)` and
  // `breakpoints.up("md")` all over, so a change here silently reflows them.
  // Colours and type sizes are deliberately not pinned — those show up the
  // moment you open Storybook.
  it("keeps the 8px spacing step", () => {
    expect(theme.spacing(1)).toBe("8px");
    expect(theme.spacing(2)).toBe("16px");
  });

  it("keeps the exact breakpoint values apps lay out against", () => {
    expect(theme.breakpoints.values).toEqual({
      xs: 0,
      sm: 640,
      md: 1024,
      lg: 1280,
      xl: 1536,
    });
  });
});

describe("typography", () => {
  it("points fontWeightMedium at Semi Bold, not MUI's 500", () => {
    // MUI defaults medium to 500, which is not one of the weights the base
    // uses — anything MUI styles as "medium" would fall off the scale.
    expect(theme.typography.fontWeightMedium).toBe(600);
  });

  it("applies responsiveFontSizes to the headings", () => {
    // h6 is left alone — at 1rem it's already at the floor MUI scales from.
    HEADINGS.filter(variant => variant !== "h6").forEach(variant => {
      const mediaQueries = Object.keys(theme.typography[variant]).filter(key =>
        key.startsWith("@media")
      );
      expect(mediaQueries.length).toBeGreaterThan(0);
    });
  });
});

describe("createHdrukTheme", () => {
  it("returns the base theme when a site overrides nothing", () => {
    // Same shape as the default export, so `<HdrukUiProvider>` with no props
    // and `createHdrukTheme()` cannot drift apart.
    const bare = createHdrukTheme();

    expect(bare.palette.primary.main).toBe(theme.palette.primary.main);
    expect(bare.shape.borderRadius).toBe(theme.shape.borderRadius);
    expect(Object.keys(bare.components ?? {}).sort()).toEqual(
      Object.keys(theme.components ?? {}).sort()
    );
  });

  it("merges a site's overrides over the base", () => {
    const site = createHdrukTheme({
      palette: { primary: { main: "#123456" } },
    });

    expect(site.palette.primary.main).toBe("#123456");
    expect(site.palette.secondary.main).toBe(tokens.brand.secondary);
    expect(site.shape.borderRadius).toBe(tokens.radius.medium);
  });

  it("applies responsiveFontSizes so a site can't forget it", () => {
    const site = createHdrukTheme({ palette: { primary: { main: "#123456" } } });
    const mediaQueries = Object.keys(site.typography.h1).filter(key =>
      key.startsWith("@media")
    );

    expect(mediaQueries.length).toBeGreaterThan(0);
  });

  it("lets a site override one custom token without restating the set", () => {
    const site = createHdrukTheme({
      palette: { status: { keyboardFocus: "#FF0000" } },
    });

    expect(site.palette.status.keyboardFocus).toBe("#FF0000");
    expect(site.palette.status.disabled).toBe(tokens.status.disabled);
  });

  it("leaves the base theme untouched", () => {
    createHdrukTheme({ palette: { primary: { main: "#123456" } } });

    expect(theme.palette.primary.main).toBe(tokens.brand.primary);
  });
});

describe("createColor", () => {
  it("derives every shade from a single value", () => {
    const color = createColor("#a4177f");

    expect(color.main).toBe("#a4177f");
    // Distinct from main and from each other — `toBeTruthy` would pass on a
    // helper that just copied main into all three.
    expect(new Set([color.main, color.light, color.dark]).size).toBe(3);
    expect(color.contrastText).toBe("#fff");
  });

  it("keeps the shades that are supplied", () => {
    const color = createColor({ main: "#a4177f", dark: "#4a0033" });

    expect(color.dark).toBe("#4a0033");
    expect(color.light).not.toBe("#4a0033");
  });

  it("picks readable contrast text for a pale colour", () => {
    expect(createColor("#F2D12D").contrastText).not.toBe(
      createColor("#29235C").contrastText
    );
  });

  it("replaces the base's shades rather than inheriting them", () => {
    const site = createHdrukTheme({
      palette: { primary: createColor("#a4177f") },
    });

    expect(site.palette.primary.dark).not.toBe(tokens.brand.primaryHovered);
    expect(site.palette.primary.light).not.toBe(tokens.brand.accentPrimary);
  });
});

describe("button styling contract", () => {
  const slot = (component: string, name: string) => {
    const overrides = (
      theme.components as Record<
        string,
        { styleOverrides?: Record<string, unknown> }
      >
    )[component]?.styleOverrides?.[name];

    return typeof overrides === "function"
      ? (overrides({ theme } as never) as Record<string, unknown>)
      : (overrides as Record<string, unknown>);
  };

  it("rounds buttons to the design's button radius, not the global one", () => {
    expect(slot("MuiButton", "root").borderRadius).toBe(tokens.radius.small);
    expect(tokens.radius.small).not.toBe(theme.shape.borderRadius);
  });

  it("gives every variant a focus ring, not just contained", () => {
    // ButtonBase zeroes the UA outline and disableElevation removes MUI's
    // focus shadow, so a ring on `contained` alone leaves outlined and text
    // with no keyboard indicator at all.
    expect(slot("MuiButton", "root")["&:focus-visible"]).toMatchObject({
      outline: expect.stringContaining(tokens.status.keyboardFocus),
    });
    expect(slot("MuiButton", "contained")["&:focus-visible"]).toBeUndefined();
  });

  it("draws outlined borders at full strength", () => {
    // Without this MUI renders them at alpha(main, 0.5).
    expect(slot("MuiButton", "outlined")["--variant-outlinedBorder"]).toBe(
      "currentColor"
    );
  });

  it("leaves icon buttons circular", () => {
    expect(slot("MuiIconButton", "root")).not.toHaveProperty("borderRadius");
  });
});

describe("component theme keys", () => {
  // `HdrukButton` is absent by design — declared in the type augmentation and
  // set by apps, with no base entry shipped.
  it("registers exactly the components the apps override against", () => {
    expect(Object.keys(theme.components ?? {}).sort()).toEqual([
      "MuiAlert",
      "MuiButton",
      "MuiButtonBase",
      "MuiCard",
      "MuiChip",
      "MuiDialog",
      "MuiDivider",
      "MuiFilledInput",
      "MuiFormLabel",
      "MuiIcon",
      "MuiIconButton",
      "MuiInputLabel",
      "MuiListItemButton",
      "MuiListItemIcon",
      "MuiMenu",
      "MuiMenuItem",
      "MuiOutlinedInput",
      "MuiPaper",
      "MuiPopover",
      "MuiSelect",
      "MuiSnackbarContent",
      "MuiSwitch",
      "MuiTab",
      "MuiTabs",
      "MuiTextField",
      "MuiToolbar",
      "MuiTooltip",
    ]);
  });

  it("keeps the Button defaults the apps rely on", () => {
    expect(theme.components?.MuiButton?.defaultProps).toEqual({
      disableElevation: true,
      variant: "contained",
      color: "primary",
    });
    expect(theme.components?.MuiButtonBase?.defaultProps).toEqual({
      disableRipple: true,
    });
  });
});
