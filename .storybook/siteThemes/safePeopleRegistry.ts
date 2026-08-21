import { createColor } from "../../src/theme";
import type { ThemeOptions } from "@mui/material/styles";

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
        purposeMap: {
          secondary: { variant: "outlined", color: "primary" },
          tertiary: { variant: "text", color: "primary" },
        },
      },
      variants: [
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
        {
          props: { variant: "text", color: "primary" },
          style: {
            "&:hover": {
              backgroundColor: "transparent",
              color: spr.brand.primaryHovered,
            },
          },
        },
        {
          props: { variant: "text", color: "link" },
          style: { fontWeight: 600 },
        },
      ],
    },
  },
};
