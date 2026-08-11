"use client";

import * as React from "react";
import { useMemo } from "react";
import {
  ThemeProvider,
  CssBaseline,
  createTheme,
  ThemeOptions,
  Theme,
  responsiveFontSizes,
} from "@mui/material";
import { deepmerge } from "@mui/utils";
import { themeOptions as brandThemeOptions } from "../theme";

export interface UiProviderProps {
  children: React.ReactNode;
  themeOptions?: ThemeOptions;
  /**
   * Injects Google Fonts links for Inter and Material Symbols. Set to false
   * when the consuming app loads its own fonts (e.g. via next/font, which
   * also avoids requests to Google from the visitor's browser).
   */
  loadFonts?: boolean;
}

export function HdrukUiProvider({
  children,
  themeOptions,
  loadFonts = true,
}: UiProviderProps) {
  const mergedTheme: Theme = useMemo(() => {
    const theme = createTheme(deepmerge(brandThemeOptions, themeOptions));
    return responsiveFontSizes(theme);
  }, [themeOptions]);
  return (
    <>
      {loadFonts && (
        <>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin=""
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
            rel="stylesheet"
          />
        </>
      )}
      <ThemeProvider theme={mergedTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </>
  );
}
