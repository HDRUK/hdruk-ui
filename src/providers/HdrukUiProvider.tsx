"use client";

import * as React from "react";
import { ThemeProvider, CssBaseline, Theme } from "@mui/material";
import { default as brandTheme } from "../theme";

export interface UiProviderProps {
  children: React.ReactNode;
  /**
   * A theme built with `createHdrukTheme`. Defaults to the HDR base theme, so
   * an app that needs no overrides can mount the provider with no props.
   */
  theme?: Theme;
  /**
   * Injects the Google Fonts link for Source Sans 3, at the two weights the
   * theme uses. Off by default: an app is better off self-hosting or using
   * next/font, which avoids a request to Google from the visitor's browser.
   */
  loadFonts?: boolean;
  /**
   * Injects the Google Fonts link for Material Symbols Rounded, which the
   * `Icon` component renders with. Off by default for the same reason, but
   * needed by any app using `Icon` that doesn't load the face itself.
   */
  loadIconFont?: boolean;
}

const GOOGLE_FONTS = {
  text: "https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;600&display=swap",
  icon: "https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200",
};

export function HdrukUiProvider({
  children,
  theme = brandTheme,
  loadFonts = false,
  loadIconFont = false,
}: UiProviderProps) {
  return (
    <>
      {(loadFonts || loadIconFont) && (
        <>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin=""
          />
        </>
      )}
      {loadFonts && <link href={GOOGLE_FONTS.text} rel="stylesheet" />}
      {loadIconFont && <link href={GOOGLE_FONTS.icon} rel="stylesheet" />}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </>
  );
}
