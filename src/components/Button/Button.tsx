"use client";

import * as React from "react";
import MuiButton, { ButtonProps as MuiButtonProps } from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

export interface ButtonProps extends Omit<MuiButtonProps, "variant"> {
  /**
   * Shows a spinner and disables the button.
   */
  loading?: boolean;
  /**
   * Default to our branded variant unless overridden.
   */
  variant?: MuiButtonProps["variant"];
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      loading = false,
      disabled,
      children,
      color = "primary",
      variant = "contained",
      ...rest
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <MuiButton
        ref={ref}
        variant={variant as MuiButtonProps["variant"]}
        disabled={isDisabled}
        startIcon={loading ? <CircularProgress size={12} /> : rest.startIcon}
        {...rest}
      >
        {children}
      </MuiButton>
    );
  }
);

Button.displayName = "HdrButton";
