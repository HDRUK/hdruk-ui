import "@/types/themeAugmentation";
import { cohortDiscoveryThemeOptions } from "./siteThemes/cohortDiscovery";
import { safePeopleRegistryThemeOptions } from "./siteThemes/safePeopleRegistry";
import type { ThemeOptions } from "@mui/material/styles";

/**
 * Themes for the toolbar switcher. Each non-base entry is a **real site theme**,
 * built from that product's own Figma token export and kept portable so the
 * consuming repo can adopt the file — see `./siteThemes/`.
 *
 * There is no gateway entry — the base theme is built from gateway's tokens,
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

  safePeopleRegistry: {
    name: "Safe People Registry",
    themeOptions: safePeopleRegistryThemeOptions,
  },

  cohortDiscovery: {
    name: "Cohort Discovery",
    themeOptions: cohortDiscoveryThemeOptions,
  },
};

export const demoThemeKeys = Object.keys(demoThemes);
