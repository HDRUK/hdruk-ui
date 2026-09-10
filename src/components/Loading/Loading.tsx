"use client";

import * as React from "react";
import MuiCircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import { styled, useThemeProps } from "@mui/material/styles";
import { visuallyHidden } from "@mui/utils";
import { tokens } from "../../theme";
import type { SxProps, Theme } from "@mui/material/styles";

export type LoadingSize = "small" | "medium" | "large";

export interface LoadingProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "color"> {
  /** Spinner diameter. Tokens map to the icon size scale; a number overrides it. */
  size?: LoadingSize | number;
  /** Palette colour of the spinner. */
  color?: CircularProgressProps["color"];
  /** Sits in a line of content — a table cell, chip or input adornment — instead of centring in a block. */
  inline?: boolean;
  /** Announced to screen readers. Pass an empty string for a spinner inside an already-labelled control. */
  label?: string;
  /** Props applied to the spinner. */
  slotProps?: { progress?: Partial<CircularProgressProps> };
  sx?: SxProps<Theme>;
}

const LoadingRoot = styled("div", {
  name: "HdrukLoading",
  slot: "Root",
})<{ ownerState: { inline: boolean } }>(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  padding: theme.spacing(2, 0),
  variants: [
    {
      props: { inline: true },
      style: { display: "inline-flex", width: "auto", padding: 0 },
    },
  ],
}));

const LoadingProgress = styled(MuiCircularProgress, {
  name: "HdrukLoading",
  slot: "Progress",
})({});

const LoadingLabel = styled("span", {
  name: "HdrukLoading",
  slot: "Label",
})(visuallyHidden);

export const Loading = React.forwardRef<HTMLDivElement, LoadingProps>(
  function Loading(inProps, ref) {
    const {
      size = "large",
      color,
      inline = false,
      label = "Loading",
      slotProps,
      ...rest
    } = useThemeProps({ props: inProps, name: "HdrukLoading" });

    return (
      <LoadingRoot
        ref={ref}
        role={label ? "status" : undefined}
        ownerState={{ inline }}
        {...rest}>
        <LoadingProgress
          size={typeof size === "number" ? size : tokens.iconSize[size]}
          color={color}
          {...slotProps?.progress}
        />
        {label ? <LoadingLabel>{label}</LoadingLabel> : null}
      </LoadingRoot>
    );
  }
);

Loading.displayName = "Loading";
