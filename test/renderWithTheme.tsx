import * as React from "react";
import { render as rtlRender } from "@testing-library/react";
import { HdrukUiProvider } from "../src/providers/HdrukUiProvider";
import type { ThemeOptions } from "@mui/material";
import type { RenderOptions } from "@testing-library/react";

export type RenderWithThemeOptions = Omit<RenderOptions, "wrapper"> & {
  /** App-side theme overrides, as a consumer would pass them. */
  themeOptions?: ThemeOptions;
};

/**
 * Renders inside HdrukUiProvider so components see the real brand theme.
 * `loadFonts` is off: tests have no use for Google Fonts <link> tags.
 */
export function renderWithTheme(
  ui: React.ReactNode,
  { themeOptions, ...options }: RenderWithThemeOptions = {}
) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <HdrukUiProvider loadFonts={false} themeOptions={themeOptions}>
      {children}
    </HdrukUiProvider>
  );

  return rtlRender(ui, { wrapper: Wrapper, ...options });
}

export * from "@testing-library/react";
export { renderWithTheme as render };
