import { createColor, tokens } from "../../src/theme";
import type { ThemeOptions } from "@mui/material/styles";

const cd = {
  brand: {
    primary: "#475DA7",
    primaryHovered: "#384B91",
    accentPrimary: "#A2AED3",
    secondary: "#BED4CF",
    secondaryHovered: "#66928B",
    accentSecondary: "#91B3AC",
  },
  status: {
    neutral: "#D0D3D4",
    information: "#29235C",
    hovered: "#E3E7F2",
    selected: "#4B7E59",
    keyboardFocus: "#0000FF",
    needsAction: "#F98E2B",
    success: "#4B7E59",
    successHover: "#457050",
    error: "#B63C36",
    errorHover: "#8B2C28",
    warning: "#F8D466",
    warningHover: "#F5C430",
  },
  background: {
    primary: "#FAFAFA",
    secondary: "#F2F2F2",
    error: "#FBF0EF",
    warning: "#FFFAF0",
    success: "#F4FAF7",
    information: "#E3E7F2",
  },
  text: {
    secondaryDefault: "#3C3C3B",
    primaryInverse: "#FFFFFF",
    warning: "#755501",
  },
  radius: { cornerRounding: 48 },
} as const;

export const cohortDiscoveryThemeOptions: ThemeOptions = {
  palette: {
    brand: cd.brand,
    secondary: createColor({
      main: cd.brand.secondary,
      dark: cd.brand.secondaryHovered,
      light: cd.brand.accentSecondary,
      contrastText: cd.text.secondaryDefault,
    }),
    success: createColor({
      main: cd.status.success,
      dark: cd.status.successHover,
      light: cd.background.success,
      contrastText: cd.text.primaryInverse,
    }),
    error: createColor({
      main: cd.status.error,
      dark: cd.status.errorHover,
      light: cd.background.error,
      contrastText: cd.text.primaryInverse,
    }),
    warning: createColor({
      main: cd.status.warning,
      dark: cd.status.warningHover,
      light: cd.background.warning,
      contrastText: cd.text.warning,
    }),
    info: {
      main: cd.status.information,
      light: cd.background.information,
      contrastText: cd.text.primaryInverse,
    },
    background: {
      default: cd.background.primary,
      secondary: cd.background.secondary,
    },
    divider: cd.background.secondary,
    text: {
      secondaryDefault: cd.text.secondaryDefault,
      error: cd.status.error,
    },
    status: {
      grey: cd.status.neutral,
      hovered: cd.status.hovered,
      selected: cd.status.selected,
      keyboardFocus: cd.status.keyboardFocus,
      needsAction: cd.status.needsAction,
    },
  },

  typography: {
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
          backgroundColor: theme.palette.status.default,
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
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: tokens.radius.medium,
        },
      },
    },
    HdrukLoading: {
      defaultProps: { color: "primary" },
    },
    HdrukButton: {
      defaultProps: {
        purposeMap: {
          primary: { variant: "contained", color: "primary" },
          secondary: { variant: "outlined", color: "success" },
          tertiary: { variant: "outlined", color: "inherit" },
        },
      },
      variants: [
        {
          props: { variant: "contained" },
          style: { borderRadius: cd.radius.cornerRounding },
        },
        {
          props: { variant: "outlined", color: "success" },
          style: ({ theme }) => ({
            color: cd.text.secondaryDefault,
            backgroundColor: theme.palette.background.paper,
            borderRadius: cd.radius.cornerRounding,
            "--variant-outlinedBorder": cd.status.success,
            "&:hover, &:focus-visible": {
              backgroundColor: cd.status.successHover,
              "--variant-outlinedBorder": cd.status.successHover,
              color: cd.text.primaryInverse,
            },
          }),
        },
        {
          props: { variant: "outlined", color: "inherit" },
          style: ({ theme }) => ({
            color: cd.text.secondaryDefault,
            backgroundColor: theme.palette.background.paper,
            borderRadius: cd.radius.cornerRounding,
            "&:hover, &:focus-visible": {
              backgroundColor: cd.status.hovered,
            },
          }),
        },
      ],
    },
    HdrukMenuItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          "&:hover": { color: theme.palette.text.primary },
        }),
      },
      variants: [
        {
          props: ({ ownerState }) => ownerState.orientation === "vertical",
          style: {
            "&.Mui-selected, &.Mui-selected.Mui-focusVisible": {
              boxShadow: `inset ${tokens.stroke.thick}px 0 0 ${cd.brand.primaryHovered}`,
            },
          },
        },
        {
          props: ({ ownerState }) => ownerState.orientation !== "vertical",
          style: {
            "&.Mui-selected, &.Mui-selected.Mui-focusVisible": {
              boxShadow: `inset 0 -${tokens.stroke.thick}px 0 ${cd.brand.primaryHovered}`,
            },
          },
        },
      ],
    },
  },
};
