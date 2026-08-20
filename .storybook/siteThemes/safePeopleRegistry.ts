import { createColor } from "../../src/theme";
import type { ThemeOptions } from "@mui/material/styles";

/**
 * Safe People Registry's real theme, derived from its Figma token export — 78 of
 * the 158 keys differ from the gateway export the library base is built from.
 *
 * Portable by design: it imports only `createColor` and a type, both of which
 * `@hdruk/ui` exports publicly, so safepeopleregistry-web can take this file
 * as-is and change the import to the package name.

 *
 * Not covered, for want of a library component to theme: the export's
 * `Components/Tables` deltas (vertical border 1 → 0, cell height 43 → 44).
 */
const spr = {
  brand: {
    primary: "#BE37A3",
    primaryHovered: "#6F295F",
    accentPrimary: "#EF9F9C",
    secondary: "#5769B2",
    secondaryHovered: "#353F66",
    accentSecondary: "#4B9286",
  },
  status: {
    default: "#F1F1F1",
    grey: "#E1E1E1",
    hovered: "#F1F1F1",
    selected: "#BE37A3",
    information: "#5769B2",
    keyboardFocus: "#937C42",
    needsAction: "#F98E2B",
    archived: "#5B5B5B",
    archivedHovered: "#2C2C2C",
    announcement: "#5B5B5B",
    success: "#0F8071",
    successHover: "#194B43",
    error: "#C94A53",
    errorHover: "#B53F46",
    warning: "#F3C853",
    warningHover: "#F3C853",
  },
  background: {
    white: "#FFFFFF",
    primary: "#F1F1F1",
    secondary: "#F7EAF3",
    error: "#FBEBEA",
    warning: "#FCF9F0",
    success: "#E8EFED",
    information: "#E8EFED",
  },
  text: {
    primaryBlack: "#1E1E1E",
    primaryWhite: "#FFFFFF",
    faded: "#5B5B5B",
    disabled: "#7C7C7C",
    warning: "#937C42",
  },
  /** `Buttons/Secondary/Default/borderWidth`, against the base's 2. */
  secondaryBorderWidth: 1,
} as const;

export const safePeopleRegistryThemeOptions: ThemeOptions = {
  palette: {
    brand: spr.brand,
    primary: createColor({
      main: spr.brand.primary,
      dark: spr.brand.primaryHovered,
      light: spr.brand.accentPrimary,
      contrastText: spr.text.primaryWhite,
    }),
    secondary: createColor({
      main: spr.brand.secondary,
      dark: spr.brand.secondaryHovered,
      light: spr.brand.accentSecondary,
      contrastText: spr.text.primaryWhite,
    }),
    success: createColor({
      main: spr.status.success,
      dark: spr.status.successHover,
      light: spr.background.success,
      contrastText: spr.text.primaryWhite,
    }),
    error: createColor({
      main: spr.status.error,
      dark: spr.status.errorHover,
      light: spr.background.error,
      contrastText: spr.text.primaryWhite,
    }),
    warning: createColor({
      main: spr.status.warning,
      dark: spr.status.warningHover,
      light: spr.background.warning,
      contrastText: spr.text.warning,
    }),
    info: {
      main: spr.status.information,
      light: spr.background.information,
      contrastText: spr.text.primaryWhite,
    },
    // `palette.link` is its own slot, not derived from brand — without this a
    // site keeps the base's gateway blue however it rebrands primary.
    link: {
      main: spr.brand.primary,
      dark: spr.brand.primaryHovered,
      light: spr.brand.accentPrimary,
      contrastText: spr.text.primaryWhite,
    },
    text: {
      primary: spr.text.primaryBlack,
      secondary: spr.text.faded,
      disabled: spr.text.disabled,
    },
    background: {
      default: spr.background.primary,
      paper: spr.background.white,
      secondary: spr.background.secondary,
    },
    divider: spr.background.secondary,
    status: {
      default: spr.status.default,
      grey: spr.status.grey,
      hovered: spr.status.hovered,
      selected: spr.status.selected,
      faded: spr.text.disabled,
      keyboardFocus: spr.status.keyboardFocus,
      needsAction: spr.status.needsAction,
      archived: spr.status.archived,
      archivedHovered: spr.status.archivedHovered,
      announcement: spr.status.announcement,
    },
  },

  typography: {
    // Inter throughout, where gateway and cohort discovery both use Source Sans 3.
    fontFamily:
      'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    h1: { fontSize: "2rem", fontWeight: 700 },
    h2: { fontSize: "1.75rem" },
    h3: { fontSize: "1.625rem" },
    h4: { fontSize: "1.375rem", fontWeight: 500 },
    h5: { fontWeight: 500 },
    h6: { fontWeight: 500 },
  },

  components: {
    HdrukButton: {
      defaultProps: {
        // Every purpose is drawn in brand primary, separated by weight rather
        // than by hue: filled, then outlined, then bare text.
        purposeMap: {
          secondary: { variant: "outlined", color: "primary" },
          tertiary: { variant: "text", color: "primary" },
        },
      },
      variants: [
        // Secondary carries a 1px border where the base draws 2px, so it pays a
        // narrower stroke out of the same 12px inset — the arithmetic the base
        // already does for its own 1px tertiary.
        {
          props: { variant: "outlined", color: "primary" },
          style: ({ theme }) => ({
            backgroundColor: spr.background.white,
            borderWidth: spr.secondaryBorderWidth,
            padding: theme.spacing(0.875, 1.375),
            "&:hover, &.Mui-disabled": {
              borderWidth: spr.secondaryBorderWidth,
            },
          }),
        },
        {
          props: { variant: "outlined", color: "primary", size: "small" },
          style: ({ theme }) => ({
            padding: theme.spacing(0.375, 1.375),
          }),
        },
        // Tertiary darkens its label and stays unfilled. MUI's text variant
        // tints its background on hover, so `Status/Default/noColor` has to be
        // restated as transparent rather than simply left alone.
        {
          props: { variant: "text", color: "primary" },
          style: {
            "&:hover": {
              backgroundColor: "transparent",
              color: spr.brand.primaryHovered,
            },
          },
        },
        // `Type/Links/linkStyle` is SemiBold here, against Regular elsewhere.
        {
          props: { variant: "text", color: "link" },
          style: { fontWeight: 600 },
        },
      ],
    },
  },
};
