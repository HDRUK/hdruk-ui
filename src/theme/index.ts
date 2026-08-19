import {
  createTheme,
  responsiveFontSizes,
  PaletteColor,
  SimplePaletteColorOptions,
  Theme,
  ThemeOptions,
} from "@mui/material/styles";
import { deepmerge } from "@mui/utils";
import "../types/themeAugmentation";

/** The design system's colour tokens, mirroring the Figma `Color/*` namespaces. */
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
  /** `Sizing/Stroke`, in px. Separate from the spacing scale by design. */
  stroke: { thin: 1, medium: 2, thick: 3 },
  /** `RoundedCorner/Global`. `medium` is the theme-wide `shape.borderRadius`. */
  radius: { small: 4, medium: 8, large: 12 },
  /** `Type/Icon/Icon{Small,Medium,Large}`, in px. */
  iconSize: { small: 20, medium: 24, large: 40 },
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
    subtitle1: { fontWeight: 600 },
    subtitle2: { fontWeight: 600 },
    body1: { fontSize: "1rem", lineHeight: 1.6 }, // Body/Large 16
    body2: { fontSize: "0.875rem", lineHeight: 1.57 }, // Body/Medium 14
    button: { textTransform: "none", fontWeight: 600, letterSpacing: 0.2 },
    caption: { fontSize: "0.75rem", lineHeight: 1.4 }, // Body/X-Small 12
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
        // ButtonBase zeroes the UA outline, and disableElevation removes MUI's
        // own focus shadow, so every variant needs this — not just contained.
        root: ({ theme }) => ({
          borderRadius: tokens.radius.small,
          paddingInline: theme.spacing(2),
          paddingBlock: theme.spacing(1),
          "&:focus-visible": {
            outline: `${tokens.stroke.medium}px solid ${theme.palette.status.keyboardFocus}`,
            outlineOffset: 2,
          },
        }),
        contained: () => ({
          boxShadow: "none",
          "&:hover": { boxShadow: "none" },
        }),
        // MUI renders the border at alpha(main, 0.5); the design's are solid.
        outlined: () => ({
          borderWidth: tokens.stroke.medium,
          "--variant-outlinedBorder": "currentColor",
          "&:hover": { borderWidth: tokens.stroke.medium },
        }),
        sizeSmall: ({ theme }) => ({
          paddingInline: theme.spacing(1.5),
          paddingBlock: theme.spacing(0.5),
        }),
        sizeLarge: ({ theme }) => ({
          paddingInline: theme.spacing(2.5),
          paddingBlock: theme.spacing(1.25),
        }),
      },
      variants: [
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
          style: () => ({
            textDecoration: "underline",
            paddingInline: 0,
            minWidth: 0,
            "&:hover": {
              backgroundColor: "transparent",
              textDecoration: "none",
            },
          }),
        },
      ],
    },
    MuiIconButton: {
      styleOverrides: {
        // No borderRadius here — MUI's circular default is what the design uses.
        root: ({ theme }) => ({
          "&:focus-visible": {
            outline: `${tokens.stroke.medium}px solid ${theme.palette.status.keyboardFocus}`,
            outlineOffset: 2,
          },
        }),
      },
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
      defaultProps: { elevation: 0 },
      styleOverrides: {
        paper: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
          border: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.paper,
        }),
        list: {
          paddingBlock: 4,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: (theme.shape.borderRadius as number) - 2,
          marginInline: 4,
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
        root: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
          backgroundImage: "none",
          border: `1px solid ${theme.palette.divider}`,
        }),
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
          border: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.paper,
        }),
      },
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

const baseTheme = createTheme(themeOptions);
const theme = responsiveFontSizes(baseTheme);

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
  return baseTheme.palette.augmentColor({
    color: typeof color === "string" ? { main: color } : color,
  });
}

/**
 * Build a site theme on top of the HDR base. A product supplies only what
 * differs; the base and `responsiveFontSizes` are applied here.
 *
 * A site overriding a palette colour should state `light`, `dark` and
 * `contrastText` alongside `main` — the base's are kept otherwise, and they
 * were chosen for the base's colour.
 */
export function createHdrukTheme(siteOptions: ThemeOptions = {}): Theme {
  return responsiveFontSizes(createTheme(deepmerge(themeOptions, siteOptions)));
}

export default theme;
