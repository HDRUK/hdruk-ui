import theme, { createColor, createHdrukTheme, tokens } from ".";
import type { ThemeOptions } from "@mui/material/styles";

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
    expect(theme.palette.background.secondary).toBe(tokens.background.secondary);
  });
});

describe("layout contract", () => {
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
    expect(theme.typography.fontWeightMedium).toBe(600);
  });

  it("carries every step of the design's Body scale", () => {
    (
      ["body1", "body2", "bodySmall", "caption", "bodyXxSmall"] as const
    ).forEach(step => {
      expect(theme.typography[step].fontSize).toBeDefined();
    });
  });

  it("carries Headers/Article Lead at 20px regular", () => {
    expect(theme.typography.articleLead).toMatchObject({
      fontSize: "1.25rem",
      fontWeight: 400,
      lineHeight: "normal",
    });
  });

  it("keeps heading sizes flat, as the design tokens define them", () => {
    HEADINGS.forEach(variant => {
      const mediaQueries = Object.keys(theme.typography[variant]).filter(key =>
        key.startsWith("@media")
      );
      expect(mediaQueries).toHaveLength(0);
    });
  });

  it("renders the heading steps at their token sizes", () => {
    expect(theme.typography.h5.fontSize).toBe("1.25rem");
    expect(theme.typography.h6.fontSize).toBe("1.125rem");
  });
});

describe("createHdrukTheme", () => {
  it("returns the base theme when a site overrides nothing", () => {
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

  it("keeps the base variants when a site adds its own", () => {
    const baseCount = (
      theme.components?.MuiButton as { variants?: unknown[] } | undefined
    )?.variants?.length;

    const site = createHdrukTheme({
      components: {
        MuiButton: {
          variants: [{ props: { color: "primary" }, style: { margin: 1 } }],
        },
      },
    });

    const siteVariants = (
      site.components?.MuiButton as { variants?: unknown[] } | undefined
    )?.variants;

    // deepmerge replaces arrays, so without composition the base variants —
    // which carry the purpose styling — would be silently dropped.
    expect(baseCount).toBeGreaterThan(0);
    expect(siteVariants).toHaveLength((baseCount ?? 0) + 1);
  });

  describe("styleOverrides merging", () => {
    type Slot =
      | Record<string, unknown>
      | ((params: unknown) => Record<string, unknown>);

    const overridesFor = (siteOptions: ThemeOptions, component: string) => {
      const site = createHdrukTheme(siteOptions);
      return (
        site.components?.[
          component as keyof NonNullable<typeof site.components>
        ] as { styleOverrides?: Record<string, Slot> } | undefined
      )?.styleOverrides;
    };

    /** Slots may be objects or functions; resolve either to plain styles. */
    const resolve = (slot: Slot | undefined) =>
      typeof slot === "function" ? slot({ theme }) : (slot ?? {});

    it("keeps a site's object override on a base object slot", () => {
      // MuiPaper.root is an object in the base. Gateway sets borderRadius: 0
      // here; dropping it is what left the search table rounded.
      const root = resolve(
        overridesFor(
          {
            components: {
              MuiPaper: { styleOverrides: { root: { borderRadius: 0 } } },
            },
          },
          "MuiPaper"
        )?.root
      );

      expect(root.borderRadius).toBe(0);
      expect(root.backgroundImage).toBe("none");
    });

    it("composes a site's object override with a base function slot", () => {
      // MuiChip.root is a function in the base carrying borderRadius and
      // fontWeight. A site passing a plain object must not wipe them — this is
      // what left Chips on MUI's 16px pill instead of the 8px token.
      const root = resolve(
        overridesFor(
          { components: { MuiChip: { styleOverrides: { root: { zIndex: 7 } } } } },
          "MuiChip"
        )?.root
      );

      expect(root.zIndex).toBe(7);
      expect(root.borderRadius).toBe(theme.shape.borderRadius);
      expect(root.fontWeight).toBe(600);
    });

    it("keeps a slot only the site declares", () => {
      const overrides = overridesFor(
        {
          components: {
            MuiPaper: { styleOverrides: { elevation1: { zIndex: 3 } } },
          },
        },
        "MuiPaper"
      );

      expect(overrides).toHaveProperty("elevation1");
      expect(overrides).toHaveProperty("root");
    });

    it("composes two slot functions, deep-merging nested selectors", () => {
      // The real collision: a site adding a border to MuiIconButton must not
      // wipe the base's hover/focus/disabled rules.
      const root = overridesFor(
        {
          components: {
            MuiIconButton: {
              styleOverrides: {
                root: () => ({ border: "1px solid red" }),
              },
            },
          },
        },
        "MuiIconButton"
      )?.root;

      const resolved = resolve(root);

      expect(resolved.border).toBe("1px solid red");
      expect(resolved).toHaveProperty("&:hover");
      expect(resolved).toHaveProperty("&:focus-visible");
    });
  });

  it("gives a site the token heading sizes, flat across breakpoints", () => {
    const site = createHdrukTheme({ palette: { primary: { main: "#123456" } } });
    const mediaQueries = Object.keys(site.typography.h5).filter(key =>
      key.startsWith("@media")
    );

    expect(mediaQueries).toHaveLength(0);
    expect(site.typography.h5.fontSize).toBe("1.25rem");
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

describe("button styling contract", () => {
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
    expect(slot("MuiButton", "root")["&:focus-visible"]).toMatchObject({
      outline: expect.stringContaining(tokens.status.keyboardFocus),
    });
    expect(slot("MuiButton", "contained")["&:focus-visible"]).toBeUndefined();
  });

  it("draws buttons and icon buttons the same focus ring, at the thick stroke", () => {
    const ring = {
      outline: `${tokens.stroke.thick}px solid ${tokens.status.keyboardFocus}`,
      outlineOffset: 0,
    };

    expect(slot("MuiButton", "root")["&:focus-visible"]).toEqual(ring);
    expect(slot("MuiIconButton", "root")["&:focus-visible"]).toMatchObject(ring);
  });

  it("draws outlined borders solid, at full strength", () => {
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
    expect(slot("MuiButton", "root").lineHeight).toBe("1.5rem");
    expect(slot("MuiButton", "sizeSmall").lineHeight).toBe("1.25rem");

    theme.components?.MuiButton?.variants?.forEach(entry => {
      const style = (
        typeof entry.style === "function"
          ? entry.style({ theme } as never)
          : entry.style
      ) as Record<string, unknown>;

      if (style?.minHeight === 0) {
        expect(style.padding).toBe(0);
        return;
      }

      expect(style).not.toHaveProperty("lineHeight");
    });
  });

  it("darkens filled buttons on focus, like the outlined ones", () => {
    expect(
      variant({ variant: "contained", color: "primary" })["&:focus-visible"]
    ).toEqual({ backgroundColor: theme.palette.primary.dark });
    expect(
      variant({ variant: "contained", color: "error" })["&:focus-visible"]
    ).toEqual({ backgroundColor: theme.palette.error.dark });
  });

  it("draws focus with an outline, never a border", () => {
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

  it("leaves icon buttons borderless and circular", () => {
    const root = slot("MuiIconButton", "root");
    expect(root).not.toHaveProperty("border");
    expect(root).not.toHaveProperty("borderRadius");
  });
});

describe("menu styling contract", () => {
  it("disables list padding at the prop, since a style override cannot win", () => {
    expect(theme.components?.MuiMenu?.defaultProps).toMatchObject({
      slotProps: { list: { disablePadding: true } },
    });
    expect(slot("MuiMenu", "list")).toBeUndefined();
  });

  it("leaves menu items square and full-bleed", () => {
    const root = slot("MuiMenuItem", "root");
    expect(root).not.toHaveProperty("borderRadius");
    expect(root).not.toHaveProperty("marginInline");
    expect(root).not.toHaveProperty("margin");
  });

  it("keeps the menu paper rounded and bordered", () => {
    expect(slot("MuiMenu", "paper")).toMatchObject({
      borderRadius: theme.shape.borderRadius,
      border: `1px solid ${theme.palette.divider}`,
    });
  });
});

describe("component theme keys", () => {
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
