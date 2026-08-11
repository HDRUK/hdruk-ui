import "../src/types/themeAugmentation";
import type { ThemeOptions } from "@mui/material/styles";

/**
 * QA fixtures, deliberately not the real site themes — those live in the
 * consumer repos, and importing them would make this build depend on those
 * repos at HEAD. Fidelity checks belong in each site's own Storybook or via a
 * yalc link; these fixtures only prove the override levers work.
 *
 * Each entry is a small delta over the library base theme, chosen to exercise
 * the theming levers (palette, spacing, shape, HdrukButton defaultProps) so a
 * hardcoded value in a component shows up as "nothing moved" when switching.
 */
export interface DemoTheme {
  name: string;
  themeOptions: ThemeOptions;
}

export const demoThemes: Record<string, DemoTheme> = {
  base: {
    name: "Library base",
    themeOptions: {},
  },

  // palette + background mirror gateway-web src/config/theme.ts @ 8446ed03
  // (purple500 primary, green400 secondary, grey default background — note it
  // is the library's palette swapped). gateway sets no global shape or spacing;
  // its square corners come from per-component overrides, approximated here as
  // borderRadius 0 so the lever is exercised. gateway does not consume the
  // library yet, so it has no HdrukButton purposeMap to copy.
  gateway: {
    name: "Gateway",
    themeOptions: {
      palette: {
        primary: { main: "#475da7", contrastText: "#fff" },
        secondary: { main: "#3db28c", contrastText: "#fff" },
        background: { default: "#f6f7f8" },
      },
      shape: { borderRadius: 0 },
    },
  },

  // INVENTED VALUES. Only the shape of the delta is known to be right (soursd
  // runs a magenta primary, a 4px spacing unit and a contained-primary
  // purposeMap); the specific colours are made up because soursd-web was not to
  // hand. Replace with the real deltas from soursd-web src/config/theme.ts
  // before trusting this as a fidelity check.
  soursd: {
    name: "SOURSD",
    themeOptions: {
      palette: {
        primary: { main: "#a4177f", contrastText: "#fff" },
        secondary: { main: "#4c2a6e", contrastText: "#fff" },
      },
      spacing: 4,
      shape: { borderRadius: 4 },
      components: {
        HdrukButton: {
          defaultProps: {
            purposeMap: {
              secondary: { variant: "contained", color: "secondary" },
              tertiary: { variant: "outlined", color: "primary" },
            },
          },
        },
      },
    },
  },

  // INVENTED VALUES, with no documented deltas to work from — this fixture
  // exists to push the levers hard (large radius, warm background, a different
  // font family) rather than to resemble daphne. The one real detail is that
  // daphne's font is Source Sans 3, loaded here via .storybook/preview-head.html
  // because the app supplies it as a CSS variable the library can't see.
  // Replace with the real deltas from project-daphne-web when it's to hand.
  daphne: {
    name: "Daphne",
    themeOptions: {
      palette: {
        primary: { main: "#0b6e6e", contrastText: "#fff" },
        secondary: { main: "#f4a300", contrastText: "#111" },
        background: { default: "#fbf9f4", paper: "#fff" },
      },
      shape: { borderRadius: 24 },
      typography: {
        fontFamily:
          '"Source Sans 3", system-ui, -apple-system, "Segoe UI", sans-serif',
      },
    },
  },
};

export const demoThemeKeys = Object.keys(demoThemes);
