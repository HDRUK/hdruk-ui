import { createColor } from "../../src/theme";
import type { ThemeOptions } from "@mui/material/styles";

const cd = {
  brand: {
    primary: "#475DA7",
    primaryHovered: "#384B91",
    accentPrimary: "#D4EADD",
    secondary: "#B7C7C3",
    secondaryHovered: "#9CB6B0",
    accentSecondary: "#508C61",
  },
  status: {
    default: "#FAFAFA",
    grey: "#D0D3D4",
    information: "#29235C",
    hovered: "#DEE3F2",
    selected: "#EEEEEE",
    keyboardFocus: "#0000FF",
    needsAction: "#F98E2B",
    success: "#508C61",
    successHover: "#375A40",
    error: "#C14E48",
    errorHover: "#B63C36",
    warning: "#F8D466",
    warningHover: "#F5C430",
  },
  background: {
    primary: "#FAFAFA",
    secondary: "#F2F2F2",
    error: "#FBF0EF",
    warning: "#FFFAF0",
    success: "#F4FAF7",
    information: "#DEE3F2",
  },
  text: {
    secondaryBlack: "#3C3C3B",
    primaryWhite: "#FFFFFF",
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
      contrastText: cd.text.secondaryBlack,
    }),
    success: createColor({
      main: cd.status.success,
      dark: cd.status.successHover,
      light: cd.background.success,
      contrastText: cd.text.primaryWhite,
    }),
    error: createColor({
      main: cd.status.error,
      dark: cd.status.errorHover,
      light: cd.background.error,
      contrastText: cd.text.primaryWhite,
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
      contrastText: cd.text.primaryWhite,
    },
    background: {
      default: cd.background.primary,
      secondary: cd.background.secondary,
    },
    divider: cd.background.secondary,
    status: {
      default: cd.status.default,
      grey: cd.status.grey,
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
    HdrukButton: {
      defaultProps: {
        purposeMap: {
          primary: { variant: "outlined", color: "success" },
          secondary: { variant: "outlined", color: "inherit" },
          tertiary: { variant: "contained", color: "primary" },
        },
      },
      variants: [
        {
          props: { variant: "contained", color: "error" },
          style: { borderRadius: cd.radius.cornerRounding },
        },
        {
          props: { variant: "outlined", color: "success" },
          style: {
            color: cd.text.secondaryBlack,
            backgroundColor: cd.background.primary,
            borderRadius: cd.radius.cornerRounding,
            "--variant-outlinedBorder": cd.brand.accentSecondary,
            "&:hover, &:focus-visible": {
              backgroundColor: cd.brand.accentSecondary,
              color: cd.text.primaryWhite,
            },
          },
        },
        {
          props: { variant: "outlined", color: "inherit" },
          style: {
            color: cd.text.secondaryBlack,
            backgroundColor: cd.background.primary,
            borderColor: cd.status.grey,
            borderRadius: cd.radius.cornerRounding,
            "&:hover, &:focus-visible": {
              backgroundColor: cd.status.grey,
            },
          },
        },
      ],
    },
  },
};
