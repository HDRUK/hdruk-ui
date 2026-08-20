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
      "default",
      "disabled",
      "faded",
      "grey",
      "hovered",
      "keyboardFocus",
      "needsAction",
      "needsActionHover",
      "selected",
    ]);
    // `background.secondary` has no MUI slot either, and IconButton's focus fill
    // reads it — a raw `tokens` read there is not re-themeable by an app.
    expect(theme.palette.background.secondary).toBe(tokens.background.secondary);
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

  it("carries every step of the design's Body scale", () => {
    // Body/Small (13) and Body/X-X-Small (10) have no MUI equivalent. A missing
    // step doesn't fail loudly — it turns up as a literal px in a component.
    (
      ["body1", "body2", "bodySmall", "caption", "bodyXxSmall"] as const
    ).forEach(step => {
      expect(theme.typography[step].fontSize).toBeDefined();
    });
  });

  it("leaves the two added Body steps out of responsiveFontSizes", () => {
    // It only rewrites h1-h6 by default. Body text at 13px and 10px has no
    // headroom to scale into anyway, but a future `variants` option would.
    expect(Object.keys(theme.typography.bodySmall)).toEqual(["fontSize"]);
    expect(Object.keys(theme.typography.bodyXxSmall)).toEqual(["fontSize"]);
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

  const variant = (props: Record<string, unknown>) => {
    const entry = theme.components?.MuiButton?.variants?.find(
      v => JSON.stringify(v.props) === JSON.stringify(props)
    );

    return (
      typeof entry?.style === "function"
        ? entry.style({ theme } as never)
        : entry?.style
    ) as Record<string, unknown>;
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

  it("draws buttons and icon buttons the same focus ring, at the thick stroke", () => {
    // Pinning the width, not just the colour: the two share a helper, so
    // changing one silently changes the other.
    const ring = {
      outline: `${tokens.stroke.thick}px solid ${tokens.status.keyboardFocus}`,
      outlineOffset: 0,
    };

    expect(slot("MuiButton", "root")["&:focus-visible"]).toEqual(ring);
    // The icon button adds the design's focus fill on top of the shared ring.
    expect(slot("MuiIconButton", "root")["&:focus-visible"]).toMatchObject(ring);
  });

  it("draws outlined borders solid, at full strength", () => {
    // Without this MUI renders them at alpha(main, 0.5).
    const outlined = slot("MuiButton", "outlined");

    expect(outlined["--variant-outlinedBorder"]).toBe("currentColor");
    expect(outlined.borderWidth).toBe(tokens.stroke.medium);
  });

  it("shaves each variant's padding by its border, as MUI's own outlined does", () => {
    expect(slot("MuiButton", "root").padding).toBe("8px 12px");
    expect(slot("MuiButton", "outlined").padding).toBe("6px 10px");
    expect(variant({ variant: "outlined", color: "inherit" }).padding).toBe(
      "7px 11px"
    );

    expect(slot("MuiButton", "sizeSmall").padding).toBe("4px 12px");
    expect(slot("MuiButton", "outlinedSizeSmall").padding).toBe("2px 10px");
    expect(
      variant({ variant: "outlined", color: "inherit", size: "small" }).padding
    ).toBe("3px 11px");
  });

  it("gives each size its own label height, and lets no boxed variant compete", () => {
    // The third number in a size spec: 40/8/24 and 28/4/20. A variant setting
    // lineHeight resolves after the size slots and would win, so a small
    // tertiary would get a different label box from a small primary.
    expect(slot("MuiButton", "root").lineHeight).toBe("1.5rem");
    expect(slot("MuiButton", "sizeSmall").lineHeight).toBe("1.25rem");

    theme.components?.MuiButton?.variants?.forEach(entry => {
      const style = (
        typeof entry.style === "function"
          ? entry.style({ theme } as never)
          : entry.style
      ) as Record<string, unknown>;

      // A variant may only own its line-height by giving up the box first —
      // then there is no shared label box left for it to diverge from.
      if (style?.minHeight === 0) {
        expect(style.padding).toBe(0);
        return;
      }

      expect(style).not.toHaveProperty("lineHeight");
    });
  });

  it("darkens filled buttons on focus, like the outlined ones", () => {
    // Every purpose adopts its hover fill on focus. MUI drives contained hover
    // by reassigning `--variant-containedBg` and ships no hover variable to
    // reuse, so each contained colour in the base purpose map states its own.
    expect(
      variant({ variant: "contained", color: "primary" })["&:focus-visible"]
    ).toEqual({ backgroundColor: theme.palette.primary.dark });
    expect(
      variant({ variant: "contained", color: "error" })["&:focus-visible"]
    ).toEqual({ backgroundColor: theme.palette.error.dark });
  });

  it("draws focus with an outline, never a border", () => {
    // The design specifies a 3px border, and it is drawn flush to match — but as
    // an outline, because a border participates in layout and would have to be
    // paid for out of each variant's padding at every size. This is the one
    // property where following the export literally would be wrong.
    const ring = slot("MuiButton", "root")["&:focus-visible"] as Record<
      string,
      unknown
    >;

    expect(ring.outline).toContain("solid");
    expect(ring).not.toHaveProperty("border");
    expect(ring).not.toHaveProperty("borderWidth");
  });

  it("draws the link as text, underlined only on hover", () => {
    const link = variant({ color: "link", variant: "text" });

    // `<Button href>` renders an anchor, which the UA underlines at rest.
    expect(link.textDecoration).toBe("none");
    expect(link["&:hover"]).toEqual({
      backgroundColor: "transparent",
      textDecoration: "underline",
    });
  });

  it("drops the button box from the link entirely", () => {
    const link = variant({ color: "link", variant: "text" });

    expect(link.padding).toBe(0);
    expect(link.minWidth).toBe(0);
    expect(link.minHeight).toBe(0);
    expect(link.lineHeight).toBe(1.3);
  });

  it("fades the disabled link to grey text with no filled pill", () => {
    // The root's `.Mui-disabled` fills with status.disabled, which would give a
    // grey pill behind a link that has no box.
    expect(variant({ color: "link", variant: "text" })["&.Mui-disabled"]).toEqual(
      {
        backgroundColor: "transparent",
        color: tokens.text.disabled,
      }
    );
  });

  it("takes the small link's size from the Body/Small step, not a literal", () => {
    expect(
      variant({ color: "link", variant: "text", size: "small" }).fontSize
    ).toBe(theme.typography.bodySmall.fontSize);
  });

  it("clamps `large` to the medium metrics", () => {
    // `ButtonProps` omits it, but a raw MuiButton still reaches it — and MUI's
    // own sizeLarge carries a bigger font and padding than the design has.
    expect(slot("MuiButton", "sizeLarge").padding).toBe("8px 12px");
    expect(slot("MuiButton", "sizeLarge").fontSize).toBe(
      theme.typography.button.fontSize
    );
    expect(slot("MuiButton", "outlinedSizeLarge").padding).toBe("6px 10px");
  });

  it("keeps each variant's border width when disabled", () => {
    expect(slot("MuiButton", "outlined")["&:hover, &.Mui-disabled"]).toEqual({
      borderWidth: tokens.stroke.medium,
    });
    expect(
      variant({ variant: "outlined", color: "inherit" })[
        "&:hover, &.Mui-disabled"
      ]
    ).toEqual({ borderWidth: tokens.stroke.thin });
  });

  it("fills the secondary button on hover and focus, flipping the label", () => {
    const secondary = variant({ variant: "outlined", color: "secondary" });

    expect(secondary["&:hover, &:focus-visible"]).toMatchObject({
      backgroundColor: theme.palette.secondary.dark,
      borderColor: theme.palette.secondary.dark,
      color: theme.palette.secondary.contrastText,
    });
  });

  it("gives every purpose the same disabled fill, border colour and label", () => {
    // Without the label colour MUI's own action.disabled applies, which sits
    // at about 1.9:1 on this fill.
    expect(slot("MuiButton", "root")["&.Mui-disabled"]).toEqual({
      backgroundColor: tokens.status.disabled,
      borderColor: tokens.status.disabled,
      color: tokens.text.disabled,
    });
  });

  it("keeps every button label at the regular weight", () => {
    expect(theme.typography.button.fontWeight).toBe(
      theme.typography.fontWeightRegular
    );
  });

  it("gives the tertiary button its own fill, thin ring and dark label", () => {
    const tertiary = variant({ variant: "outlined", color: "inherit" });

    expect(tertiary).toMatchObject({
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.background.paper,
      borderWidth: tokens.stroke.thin,
      borderColor: tokens.status.faded,
    });
    expect(tertiary["&:hover, &:focus-visible"]).toMatchObject({
      backgroundColor: tokens.status.hovered,
    });
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
