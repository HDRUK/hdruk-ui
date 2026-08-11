"use client";

import * as React from "react";
import MuiButton, { ButtonProps as MuiButtonProps } from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { styled, useThemeProps } from "@mui/material/styles";

export type ButtonPurpose =
  "primary" | "secondary" | "tertiary" | "destructive";

/** The MUI look a purpose resolves to. */
export type PurposeMapping = Pick<MuiButtonProps, "variant" | "color">;

export interface ButtonProps extends MuiButtonProps {
  /**
   * What the button means. The app theme decides what it looks like via
   * `purposeMap`. Defaults to "primary".
   */
  purpose?: ButtonPurpose;
  /**
   * purpose → variant/color mapping. Set via the app theme's
   * `components.HdrukButton.defaultProps`, not at call sites. App entries
   * merge over (and win against) the library's base map.
   */
  purposeMap?: Partial<Record<ButtonPurpose, PurposeMapping>>;
  /**
   * Shows a spinner and disables the button.
   */
  loading?: boolean;
}

/**
 * Library base map — used when the app theme doesn't override a purpose.
 */
const BASE_PURPOSE_MAP: Record<ButtonPurpose, PurposeMapping> = {
  primary: { variant: "contained", color: "primary" },
  secondary: { variant: "outlined", color: "primary" },
  tertiary: { variant: "text", color: "primary" },
  destructive: { variant: "contained", color: "error" },
};

/**
 * Styled MUI Button registered under the "HdrukButton" theme name so app
 * `styleOverrides`/`variants` under `components.HdrukButton` apply and
 * `.HdrukButton-root` is a stable class target. No styles of its own.
 */
const ButtonRoot = styled(MuiButton, {
  name: "HdrukButton",
  slot: "Root",
})<{ ownerState?: { purpose: ButtonPurpose } }>({});

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(inProps, ref) {
    const props = useThemeProps({ props: inProps, name: "HdrukButton" });
    const {
      purpose = "primary",
      purposeMap,
      variant,
      color,
      loading = false,
      disabled,
      startIcon,
      children,
      ...rest
    } = props;

    const mapped = { ...BASE_PURPOSE_MAP[purpose], ...purposeMap?.[purpose] };

    return (
      <ButtonRoot
        ref={ref}
        ownerState={{ purpose }}
        variant={variant ?? mapped.variant}
        color={color ?? mapped.color}
        disabled={disabled || loading}
        startIcon={loading ? <CircularProgress size={12} /> : startIcon}
        {...rest}>
        {children}
      </ButtonRoot>
    );
  }
);

Button.displayName = "HdrukButton";
