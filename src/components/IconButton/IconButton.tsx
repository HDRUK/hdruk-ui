"use client";

import * as React from "react";
import MuiIconButton, {
  IconButtonProps as MuiIconButtonProps,
} from "@mui/material/IconButton";
import { styled, useThemeProps } from "@mui/material/styles";

export type IconButtonSize = "small" | "medium";

export interface IconButtonProps extends Omit<MuiIconButtonProps, "size"> {
  size?: IconButtonSize;
  "aria-label": string;
}

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
