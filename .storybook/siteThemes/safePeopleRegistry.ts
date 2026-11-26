import { createColor, tokens } from "../../src/theme";
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
    neutral: "#E1E1E1",
    hovered: "#F1F1F1",
    keyboardFocus: "#937C42",
    needsAction: "#F98E2B",
    announcement: "#5B5B5B",
    success: "#0F8071",
    successHover: "#194B43",
    error: "#C94A53",
    errorHover: "#B53F46",
    warning: "#F3C853",
  },
  background: {
    default: "#FFFFFF",
    primary: "#F1F1F1",
    secondary: "#F7EAF3",
    error: "#FBEBEA",
    warning: "#FCF9F0",
    success: "#E8EFED",
    information: "#E8EFED",
  },
  text: {
    primaryDefault: "#1E1E1E",
    secondaryDefault: "#2C2C2C",
    primaryInverse: "#FFFFFF",
    faded: "#5B5B5B",
    disabled: "#7C7C7C",
    warning: "#937C42",
  },
} as const;

export const safePeopleRegistryThemeOptions: ThemeOptions = {
  palette: {
    brand: spr.brand,
    primary: createColor({
      main: spr.brand.primary,
      dark: spr.brand.primaryHovered,
      light: spr.brand.accentPrimary,
      contrastText: spr.text.primaryInverse,
    }),
    secondary: createColor({
      main: spr.brand.secondary,
      dark: spr.brand.secondaryHovered,
      light: spr.brand.accentSecondary,
      contrastText: spr.text.primaryInverse,
    }),
    success: createColor({
      main: spr.status.success,
      dark: spr.status.successHover,
      light: spr.background.success,
      contrastText: spr.text.primaryInverse,
    }),
    error: createColor({
      main: spr.status.error,
      dark: spr.status.errorHover,
      light: spr.background.error,
      contrastText: spr.text.primaryInverse,
    }),
    warning: createColor({
      main: spr.status.warning,
      dark: spr.status.warning,
      light: spr.background.warning,
      contrastText: spr.text.warning,
    }),
    info: {
      main: spr.brand.secondary,
      light: spr.background.information,
      contrastText: spr.text.primaryInverse,
    },
    link: {
      main: spr.brand.primary,
      dark: spr.brand.primaryHovered,
      light: spr.brand.accentPrimary,
      contrastText: spr.text.primaryInverse,
    },
    text: {
      primary: spr.text.primaryDefault,
      secondary: spr.text.faded,
      disabled: spr.text.disabled,
      secondaryDefault: spr.text.secondaryDefault,
      error: spr.status.errorHover,
    },
    background: {
      default: spr.background.primary,
      paper: spr.background.default,
      secondary: spr.background.secondary,
    },
    divider: spr.background.secondary,
    status: {
      grey: spr.status.neutral,
      hovered: spr.status.hovered,
      selected: spr.brand.primary,
      faded: spr.text.disabled,
      keyboardFocus: spr.status.keyboardFocus,
      needsAction: spr.status.needsAction,
      archived: spr.text.faded,
      archivedHovered: spr.text.secondaryDefault,
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
    MuiIconButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          border: `${tokens.stroke.thin}px solid ${theme.palette.status.faded}`,
          backgroundColor: theme.palette.status.grey,
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          border: `1px solid ${theme.palette.divider}`,
        }),
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: tokens.radius.large,
        },
      },
    },
    HdrukLoading: {
      defaultProps: { color: "primary" },
    },
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
            backgroundColor: spr.background.default,
            borderWidth: 1,
            padding: theme.spacing(0.875, 1.375),
            "&:hover, &.Mui-disabled": {
              borderWidth: 1,
            },
            "&:hover, &:focus-visible": {
              backgroundColor: spr.background.primary,
              borderColor: spr.brand.primaryHovered,
              color: spr.brand.primaryHovered,
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
