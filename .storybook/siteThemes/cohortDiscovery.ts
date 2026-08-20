import { createColor } from "../../src/theme";
import type { ThemeOptions } from "@mui/material/styles";

/**
 * Cohort Discovery's real theme, derived from its Figma token export
 * (`Product ID/id: "cd"`) — 63 of the 158 keys differ from the gateway export
 * the library base is built from.
 *
 * Portable by design: it imports only `createColor` and a type, both of which
 * `@hdruk/ui` exports publicly, so cohort-discovery-service-web can take this
 * file as-is and change the import to the package name.
 *
 * Not covered, for want of a library component to theme: the export's
 * `Components/Checkbox` (rounding 0 → 8, border 2 → 1),
 * `Components/Tables` (header fill → `Brand/secondary`) and
 * `Components/Menu Item` (selected goes from a 3px border to a `selected` fill)
 * deltas.
 */
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
    // Unchanged from gateway, but restated so `info.light` can be set.
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
  /**
   * `Buttons/cornerRounding` is 48 — Figma for "fully round" — against
   * `tertiaryCornerRounding` 4, which is already the library base. A literal 48
   * stops reading as a pill above 96px tall, so it is expressed
   * size-independently instead.
   */
  radius: { pill: 9999 },
} as const;

export const cohortDiscoveryThemeOptions: ThemeOptions = {
  palette: {
    // Brand primary is identical to gateway's; what changes is its role — here
    // it is the *tertiary* button, not the primary one.
    brand: cd.brand,
    secondary: createColor({
      main: cd.brand.secondary,
      dark: cd.brand.secondaryHovered,
      light: cd.brand.accentSecondary,
      // Pale teal: white on it is 1.7:1, so the contrast flips to dark. The
      // export agrees — `Buttons/Secondary/Hover/textColor` is secondaryBlack.
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

  // Only the deltas: CD's headings are smaller than gateway's and drop to
  // Medium (500) from H4 down. Body sizes are identical across both products.
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
        // Primary and tertiary invert against gateway: CD's primary is a
        // bordered button on a page-coloured fill, and its tertiary is the
        // filled brand blue that gateway calls primary.
        purposeMap: {
          primary: { variant: "outlined", color: "success" },
          secondary: { variant: "outlined", color: "inherit" },
          tertiary: { variant: "contained", color: "primary" },
        },
      },
      // The pill rounding goes on each boxed variant rather than on `root`. A
      // root radius also reaches the link, whose focus ring is deliberately
      // square because it has no box — and tertiary then needs no exception,
      // since it simply keeps the base's 4px.
      variants: [
        // Destructive is not in CD's export; it follows the general
        // `cornerRounding` rather than tertiary's exception.
        {
          props: { variant: "contained", color: "error" },
          style: { borderRadius: cd.radius.pill },
        },
        // Primary: green border on a page-coloured fill, filling solid on hover.
        // The base sets `--variant-outlinedBorder: currentColor`, so the border
        // is set through that variable rather than fighting it with borderColor.
        {
          props: { variant: "outlined", color: "success" },
          style: {
            color: cd.text.secondaryBlack,
            backgroundColor: cd.background.primary,
            borderRadius: cd.radius.pill,
            "--variant-outlinedBorder": cd.brand.accentSecondary,
            "&:hover, &:focus-visible": {
              backgroundColor: cd.brand.accentSecondary,
              color: cd.text.primaryWhite,
            },
          },
        },
        // Secondary: the base's tertiary treatment, restated onto CD's greys.
        {
          props: { variant: "outlined", color: "inherit" },
          style: {
            color: cd.text.secondaryBlack,
            backgroundColor: cd.background.primary,
            borderColor: cd.status.grey,
            borderRadius: cd.radius.pill,
            "&:hover, &:focus-visible": {
              backgroundColor: cd.status.grey,
            },
          },
        },
      ],
    },
  },
};
