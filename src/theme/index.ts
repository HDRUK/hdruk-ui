import {
  createTheme,
  PaletteColor,
  SimplePaletteColorOptions,
  Theme,
  ThemeOptions,
} from "@mui/material/styles";
import { deepmerge } from "@mui/utils";
import "../types/themeAugmentation";

export const tokens = {
  brand: {
    primary: "#475DA7",
    primaryHovered: "#384B91",
    accentPrimary: "#C6CEE5",
    secondary: "#2C8267",
    secondaryHovered: "#267259",
    accentSecondary: "#B8E2D8",
  },
  status: {
    default: "#FFFFFF",
    grey: "#E2E2E2",
    hovered: "#EEEEEE",
    selected: "#2C8267",
    information: "#29235C",
    faded: "#868E96",
    disabled: "#E2E2E2",
    keyboardFocus: "#4682B4",
    success: "#2C8267",
    successHover: "#1C553F",
    error: "#DC3645",
    errorHover: "#C02531",
    warning: "#F2D12D",
    warningHover: "#F0BB24",
    needsAction: "#FE9A2D",
    needsActionHover: "#F27F28",
    archived: "#53575A",
    archivedHovered: "#3C3C3B",
    announcement: "#FBE71E",
  },
  background: {
    white: "#FFFFFF",
    primary: "#F6F7F8",
    secondary: "#E2E2E2",
    error: "#FFECF1",
    warning: "#FDFCE6",
    success: "#E2F3F0",
    information: "#E9ECF4",
  },
  text: {
    primaryBlack: "#262626",
    secondaryBlack: "#3C3C3B",
    primaryWhite: "#FFFFFF",
    secondaryWhite: "#EEEEEE",
    faded: "#53575A",
    disabled: "#868E96",
    error: "#C02531",
    warning: "#856505",
  },
  stroke: { thin: 1, medium: 2, thick: 3 },
  radius: { small: 4, medium: 8, large: 12 },
  iconSize: { small: 20, medium: 24, large: 40 },
  iconWeight: 300,
} as const;

export const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: tokens.brand.primary,
      dark: tokens.brand.primaryHovered,
      light: tokens.brand.accentPrimary,
      contrastText: tokens.text.primaryWhite,
    },
    secondary: {
      main: tokens.brand.secondary,
      dark: tokens.brand.secondaryHovered,
      light: tokens.brand.accentSecondary,
      contrastText: tokens.text.primaryWhite,
    },
    success: {
      main: tokens.status.success,
      dark: tokens.status.successHover,
      light: tokens.background.success,
      contrastText: tokens.text.primaryWhite,
    },
    error: {
      main: tokens.status.error,
      dark: tokens.status.errorHover,
      light: tokens.background.error,
      contrastText: tokens.text.primaryWhite,
    },
    warning: {
      main: tokens.status.warning,
      dark: tokens.status.warningHover,
      light: tokens.background.warning,
      contrastText: tokens.text.warning,
    },
    info: {
      main: tokens.status.information,
      light: tokens.background.information,
      contrastText: tokens.text.primaryWhite,
    },
    text: {
      primary: tokens.text.primaryBlack,
      secondary: tokens.text.faded,
      disabled: tokens.text.disabled,
    },
    background: {
      default: tokens.background.primary,
      paper: tokens.background.white,
      secondary: tokens.background.secondary,
    },
    divider: tokens.background.secondary,
    link: {
      main: tokens.brand.primary,
      dark: tokens.brand.primaryHovered,
      light: tokens.brand.accentPrimary,
      contrastText: tokens.text.primaryWhite,
    },

    brand: tokens.brand,
    status: {
      default: tokens.status.default,
      grey: tokens.status.grey,
      hovered: tokens.status.hovered,
      selected: tokens.status.selected,
      faded: tokens.status.faded,
      disabled: tokens.status.disabled,
      keyboardFocus: tokens.status.keyboardFocus,
      needsAction: tokens.status.needsAction,
      needsActionHover: tokens.status.needsActionHover,
      archived: tokens.status.archived,
      archivedHovered: tokens.status.archivedHovered,
      announcement: tokens.status.announcement,
    },
  },

  spacing: 8,
  shape: { borderRadius: tokens.radius.medium },

  breakpoints: {
    values: {
      xs: 0, // mobile
      sm: 640, // tablet
      md: 1024, // laptop
      lg: 1280, // desktop
      xl: 1536, // large desktop
    },
  },

  typography: {
    fontFamily:
      '"Source Sans 3", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    h1: { fontWeight: 600, fontSize: "2.5rem", lineHeight: 1.2 }, // 40
    h2: { fontWeight: 600, fontSize: "2rem", lineHeight: 1.25 }, // 32
    h3: { fontWeight: 600, fontSize: "1.75rem", lineHeight: 1.3 }, // 28
    h4: { fontWeight: 600, fontSize: "1.5rem", lineHeight: 1.35 }, // 24
    h5: { fontWeight: 600, fontSize: "1.25rem", lineHeight: 1.4 }, // 20
    h6: { fontWeight: 600, fontSize: "1.125rem", lineHeight: 1.45 }, // 18
    // Headers/Article Lead — 20px Regular, a heading-scale size at body weight
    articleLead: { fontWeight: 400, fontSize: "1.25rem", lineHeight: "normal" },
    subtitle1: { fontWeight: 600 },
    subtitle2: { fontWeight: 600 },
    body1: { fontSize: "1rem", lineHeight: 1.6 }, // Body/Large 16
    body2: { fontSize: "0.875rem", lineHeight: 1.57 }, // Body/Medium 14
    bodySmall: { fontSize: "0.8125rem" }, // Body/Small 13
    button: {
      textTransform: "none",
      fontWeight: 400,
      letterSpacing: 0.2,
    },
    caption: { fontSize: "0.75rem", lineHeight: 1.4 }, // Body/X-Small 12
    bodyXxSmall: { fontSize: "0.625rem" }, // Body/X-X-Small 10
    overline: {
      textTransform: "uppercase",
      letterSpacing: 0.8,
      fontWeight: 600,
      fontSize: "0.75rem",
    },
  },

  zIndex: {
    drawer: 2,
  },

  components: {
    /* ----- Buttons ----- */
    MuiButtonBase: {
      defaultProps: { disableRipple: true },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        variant: "contained",
        color: "primary",
      },
      styleOverrides: {
        root: ({ theme }) => ({
          minHeight: theme.spacing(5),
          borderRadius: tokens.radius.small,
          padding: theme.spacing(1, 1.5),
          lineHeight: "1.5rem",
          "&:focus-visible": {
            outline: `${tokens.stroke.thick}px solid ${theme.palette.status.keyboardFocus}`,
            outlineOffset: 0,
          },
          "&.Mui-disabled": {
            backgroundColor: theme.palette.status.disabled,
            borderColor: theme.palette.status.disabled,
            color: theme.palette.text.disabled,
          },
        }),
        contained: () => ({
          boxShadow: "none",
          "&:hover": { boxShadow: "none" },
        }),
        outlined: ({ theme }) => ({
          borderWidth: tokens.stroke.medium,
          "--variant-outlinedBorder": "currentColor",
          padding: theme.spacing(0.75, 1.25),
          "&:hover, &.Mui-disabled": { borderWidth: tokens.stroke.medium },
        }),
        outlinedSizeSmall: ({ theme }) => ({
          padding: theme.spacing(0.25, 1.25),
        }),
        sizeSmall: ({ theme }) => ({
          minHeight: theme.spacing(3.5),
          lineHeight: "1.25rem",
          padding: theme.spacing(0.5, 1.5),
        }),
      },
      variants: [
        {
          props: { variant: "contained", color: "primary" },
          style: ({ theme }) => ({
            "&:focus-visible": {
              backgroundColor: theme.palette.primary.dark,
            },
          }),
        },
        {
          props: { variant: "contained", color: "error" },
          style: ({ theme }) => ({
            "&:focus-visible": {
              backgroundColor: theme.palette.error.dark,
            },
          }),
        },
        {
          props: { variant: "outlined", color: "inherit" },
          style: ({ theme }) => ({
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.background.paper,
            borderWidth: tokens.stroke.thin,
            borderColor: theme.palette.status.faded,
            padding: theme.spacing(0.875, 1.375),
            "&:hover, &.Mui-disabled": { borderWidth: tokens.stroke.thin },
            "&:hover, &:focus-visible": {
              backgroundColor: theme.palette.status.hovered,
            },
          }),
        },
        {
          props: { variant: "outlined", color: "inherit", size: "small" },
          style: ({ theme }) => ({
            padding: theme.spacing(0.375, 1.375),
          }),
        },
        {
          props: { variant: "outlined", color: "secondary" },
          style: ({ theme }) => ({
            color: theme.palette.text.primary,
            borderColor: theme.palette.secondary.main,
            "&:hover, &:focus-visible": {
              backgroundColor: theme.palette.secondary.dark,
              borderColor: theme.palette.secondary.dark,
              color: theme.palette.secondary.contrastText,
            },
          }),
        },
        {
          props: { variant: "text", color: "inherit" },
          style: ({ theme }) => ({
            color: tokens.text.secondaryBlack,
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
          }),
        },
        {
          props: { color: "link", variant: "text" },
          style: ({ theme }) => ({
            padding: 0,
            minWidth: 0,
            minHeight: 0,
            borderRadius: 0,
            lineHeight: 1.3,
            textDecoration: "none",
            "&:hover": {
              backgroundColor: "transparent",
              textDecoration: "underline",
            },
            "&.Mui-disabled": {
              backgroundColor: "transparent",
              color: theme.palette.text.disabled,
            },
          }),
        },
        {
          props: { color: "link", variant: "text", size: "small" },
          style: ({ theme }) => ({
            fontSize: theme.typography.bodySmall.fontSize,
          }),
        },
      ],
    },
    MuiIconButton: {
      defaultProps: {
        size: "small",
      },
      styleOverrides: {
        // Deliberately no border or background here — a site theme adds those
        // if it wants them, so consumers don't inherit a bordered icon button
        // they never asked for.
        root: ({ theme }) => ({
          padding: theme.spacing(0.375),
          // Icons inherit the button's font-size, so size is set in one place.
          "& .MuiIcon-root, & .MuiSvgIcon-root": { fontSize: "inherit" },
          "&:hover": { backgroundColor: theme.palette.status.hovered },
          "&:focus-visible": {
            outline: `${tokens.stroke.thick}px solid ${theme.palette.status.keyboardFocus}`,
            outlineOffset: 0,
            backgroundColor: theme.palette.background.secondary,
          },
          "&.Mui-disabled": {
            color: theme.palette.text.disabled,
          },
        }),
        sizeSmall: ({ theme }) => ({
          fontSize: theme.typography.pxToRem(tokens.iconSize.medium),
        }),
        sizeMedium: ({ theme }) => ({
          fontSize: theme.typography.pxToRem(tokens.iconSize.large),
        }),
      },
      variants: [
        {
          props: { color: "default" },
          style: ({ theme }) => ({ color: theme.palette.text.secondary }),
        },
      ],
    },

    /* ----- Inputs / TextFields ----- */
    MuiFormLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontWeight: 600,
          color: theme.palette.text.secondary,
        }),
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          "&.Mui-focused": {
            color: theme.palette.primary.main,
          },
        }),
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.main,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderWidth: tokens.stroke.medium,
          },
        }),
        input: { paddingBlock: 12, paddingInline: 14 },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
          backgroundColor: theme.palette.background.paper,
          "&:before": { borderBottomWidth: 2 },
        }),
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        size: "medium",
        fullWidth: true,
      },
    },

    /* ----- Selects / Menus / Dropdowns ----- */
    MuiSelect: {
      defaultProps: { displayEmpty: true },
      styleOverrides: {
        outlined: ({ theme }) => ({
          "& .MuiSelect-icon": { color: theme.palette.text.secondary },
        }),
      },
    },
    MuiMenu: {
      // List's padding comes from a MUI `variants` entry, which is emitted
      // after theme styleOverrides — so no `list` slot value can win. Turning
      // the variant off is the only way to make the list flush.
      defaultProps: {
        elevation: 0,
        slotProps: { list: { disablePadding: true } },
      },
      styleOverrides: {
        paper: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
          border: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.paper,
        }),
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          "&.Mui-selected": {
            backgroundColor: theme.palette.action.selected,
          },
        }),
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
          border: `1px solid ${theme.palette.divider}`,
        }),
      },
    },

    /* ----- Chips, Badges, Toggles ----- */
    MuiChip: {
      defaultProps: { size: "small" },
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
          fontWeight: 600,
        }),
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: ({ theme }) => ({
          "&.Mui-checked + .MuiSwitch-track": {
            backgroundColor: theme.palette.primary.main,
          },
        }),
        track: ({ theme }) => ({
          opacity: 1,
          backgroundColor: theme.palette.grey[300],
        }),
      },
    },

    /* ----- Surfaces ----- */
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
    },
    MuiToolbar: {
      styleOverrides: {
        root: ({ theme }) => ({
          gap: theme.spacing(1),
        }),
      },
    },

    /* ----- Lists & Nav ----- */
    MuiListItemButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
          marginInline: theme.spacing(0.5),
          "&.Mui-selected": {
            backgroundColor: theme.palette.action.selected,
          },
        }),
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.secondary,
          minWidth: 36,
        }),
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderColor: theme.palette.divider,
        }),
      },
    },

    /* ----- Feedback ----- */
    MuiAlert: {
      defaultProps: { variant: "filled" },
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
        }),
      },
    },
    MuiSnackbarContent: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
        }),
      },
    },

    /* ----- Misc ----- */
    MuiIcon: {
      styleOverrides: {
        root: {
          fontVariationSettings: `'wght' ${tokens.iconWeight}`,
        },
        fontSizeLarge: ({ theme }) => ({
          fontSize: theme.typography.pxToRem(tokens.iconSize.large),
        }),
      },
    },
    MuiTooltip: {
      defaultProps: { arrow: true },
      styleOverrides: {
        tooltip: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
        }),
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: ({ theme }) => ({
          borderRadius: (theme.shape.borderRadius as number) + 4,
        }),
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: ({ theme }) => ({
          height: 3,
          borderRadius: 3,
          backgroundColor: theme.palette.primary.main,
        }),
      },
    },
    MuiTab: {
      styleOverrides: {
        root: ({ theme }) => ({
          textTransform: "none",
          fontWeight: 600,
          "&.Mui-selected": { color: theme.palette.text.primary },
        }),
      },
    },
  },
};

const theme = createTheme(themeOptions);

/**
 * Fill in the shades of a palette colour. Anything not supplied is derived from
 * `main`, so a site states one value and gets a complete colour back — the
 * shades MUI needs for hover and contrast, matched to the site's own colour
 * rather than inherited from the base.
 *
 * ```ts
 * createHdrukTheme({ palette: { primary: createColor("#a4177f") } });
 * createHdrukTheme({ palette: { primary: createColor({ main: "#a4177f", dark: "#4a0033" }) } });
 * ```
 */
export function createColor(
  color: string | SimplePaletteColorOptions
): PaletteColor {
  return theme.palette.augmentColor({
    color: typeof color === "string" ? { main: color } : color,
  });
}

/**
 * Build a site theme on top of the HDR base. A product supplies only what
 * differs; the base is applied here.
 *
 * A site overriding a palette colour should state `light`, `dark` and
 * `contrastText` alongside `main` — the base's are kept otherwise, and they
 * were chosen for the base's colour.
 */
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
type SlotRecord = Record<string, any>;

export function createHdrukTheme(siteOptions: ThemeOptions = {}): Theme {
  const merged = deepmerge(themeOptions, siteOptions);

  const baseComps = (themeOptions.components ?? {}) as SlotRecord;
  const siteComps = (siteOptions.components ?? {}) as SlotRecord;
  const outComps = (merged.components ?? {}) as SlotRecord;

  for (const name in siteComps) {
    const baseOverrides = baseComps[name]?.styleOverrides;
    const siteOverrides = siteComps[name]?.styleOverrides;

    // A site keeps the base's styling unless it overrides that specific
    // property. deepmerge gets object-on-object slots right and keeps site-only
    // ones, but it cannot merge a slot *function* — it can't call one, so it
    // replaces and one side's styles vanish. One uniform rule for every
    // colliding slot: merge base-then-site, calling whichever side is a
    // function. Anything deepmerge already handled is left untouched.
    if (baseOverrides && siteOverrides) {
      const mergedOverrides = outComps[name].styleOverrides;

      for (const slot in siteOverrides) {
        const baseSlot = baseOverrides[slot];
        if (baseSlot === undefined) continue;

        const siteSlot = siteOverrides[slot];
        const baseIsFn = typeof baseSlot === "function";
        const siteIsFn = typeof siteSlot === "function";

        if (baseIsFn || siteIsFn) {
          mergedOverrides[slot] = (params: SlotRecord) =>
            deepmerge(
              baseIsFn ? baseSlot(params) : baseSlot,
              siteIsFn ? siteSlot(params) : siteSlot
            );
        }
      }
    }

    // `variants` is an array, and deepmerge replaces arrays outright — so a
    // site declaring any variants would silently drop every base one (which is
    // where the purpose styling lives). Concatenate instead, base first so a
    // site entry matching the same props still wins.
    const baseVariants = baseComps[name]?.variants;
    const siteVariants = siteComps[name]?.variants;

    if (Array.isArray(baseVariants) && Array.isArray(siteVariants)) {
      outComps[name].variants = [...baseVariants, ...siteVariants];
    }
  }

  return createTheme(merged);
}

export default theme;
