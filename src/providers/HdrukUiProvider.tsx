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
}

export function HdrukUiProvider({ children, themeOptions }: UiProviderProps) {
  const mergedTheme: Theme = useMemo(() => {
    const theme = createTheme(deepmerge(brandThemeOptions, themeOptions));
    return responsiveFontSizes(theme);
  }, [themeOptions]);
  return (
    <ThemeProvider theme={mergedTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
