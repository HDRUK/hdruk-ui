"use client";

import * as React from "react";
import MuiIconButton, {
  IconButtonProps as MuiIconButtonProps,
} from "@mui/material/IconButton";
import { styled, useThemeProps } from "@mui/material/styles";

export type IconButtonSize = "small" | "medium";

export interface IconButtonProps extends Omit<MuiIconButtonProps, "size"> {
  size?: IconButtonSize;
  /** Required: the icon carries no text, so the button has no other name. */
  "aria-label": string;
}

/**
 * Styled MUI IconButton registered under the "HdrukIconButton" theme name so
 * app `styleOverrides`/`variants` under `components.HdrukIconButton` apply and
 * `.HdrukIconButton-root` is a stable class target. No styles of its own.
 */
const IconButtonRoot = styled(MuiIconButton, {
  name: "HdrukIconButton",
  slot: "Root",
})({});

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(inProps, ref) {
    const props = useThemeProps({ props: inProps, name: "HdrukIconButton" });

    return <IconButtonRoot ref={ref} {...props} />;
  }
);

IconButton.displayName = "IconButton";
