import "../src/types/themeAugmentation";
import { createColor } from "../src/theme";
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
 *
 * There is no gateway fixture — the base theme is built from gateway's tokens,
 * so "Library base" is it.
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

  // INVENTED VALUES. Only the shape of the delta is known to be right (soursd
  // runs a magenta primary, a 4px spacing unit and a contained-primary
  // purposeMap); the specific colours are made up because soursd-web was not to
  // hand. Replace with the real deltas from soursd-web src/config/theme.ts
  // before trusting this as a fidelity check.
  soursd: {
    name: "SOURSD",
    themeOptions: {
      palette: {
        primary: createColor("#a4177f"),
        secondary: createColor("#4c2a6e"),
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
  // exists to push the levers hard (large radius, warm background) rather than
  // to resemble daphne. Replace with the real deltas from
  // cohort-discovery-service-web when they're to hand.
  daphne: {
    name: "Daphne",
    themeOptions: {
      palette: {
        primary: createColor("#0b6e6e"),
        secondary: createColor({ main: "#f4a300", contrastText: "#111" }),
        background: { default: "#fbf9f4", paper: "#fff" },
      },
      shape: { borderRadius: 24 },
    },
  },
};

export const demoThemeKeys = Object.keys(demoThemes);
