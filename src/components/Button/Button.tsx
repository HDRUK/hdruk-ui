"use client";

import * as React from "react";
import MuiButton, {
  ButtonProps as MuiButtonProps,
  ButtonOwnProps as MuiButtonOwnProps,
} from "@mui/material/Button";
import { ExtendButtonBaseTypeMap } from "@mui/material/ButtonBase";
import {
  OverridableComponent,
  OverrideProps,
} from "@mui/material/OverridableComponent";
import { styled, useThemeProps } from "@mui/material/styles";

export type ButtonPurpose =
  | "primary"
  | "secondary"
  | "tertiary"
  | "destructive"
  | "link";

/** The MUI look a purpose resolves to. */
export type PurposeMapping = Pick<MuiButtonProps, "variant" | "color">;

export type ButtonSize = "small" | "medium";

/** Props of the button itself, independent of the element it renders as. */
export interface ButtonOwnProps extends Omit<MuiButtonOwnProps, "size"> {
  size?: ButtonSize;
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
}

/**
 * Polymorphic like MUI's own Button: `component="a"` / `component={Link}` swaps
 * the root element and widens the accepted props to that element's attributes
 * (`href`, `target`, `rel`). A button that navigates should render as an anchor,
 * so this needs to be expressible rather than bolted on as extra props.
 */
export type ButtonTypeMap<
  AdditionalProps = object,
  RootComponent extends React.ElementType = "button",
> = ExtendButtonBaseTypeMap<{
  props: AdditionalProps & ButtonOwnProps;
  defaultComponent: RootComponent;
}>;

export type ButtonProps<
  RootComponent extends React.ElementType = ButtonTypeMap["defaultComponent"],
  AdditionalProps = object,
> = OverrideProps<
  ButtonTypeMap<AdditionalProps, RootComponent>,
  RootComponent
> & { component?: React.ElementType };

/**
 * Library base map — used when the app theme doesn't override a purpose.
 */
const BASE_PURPOSE_MAP: Record<ButtonPurpose, PurposeMapping> = {
  primary: { variant: "contained", color: "primary" },
  secondary: { variant: "outlined", color: "secondary" },
  tertiary: { variant: "outlined", color: "inherit" },
  destructive: { variant: "contained", color: "error" },
  link: { variant: "text", color: "link" },
};

/**
 * Styled MUI Button registered under the "HdrukButton" theme name so app
 * `styleOverrides`/`variants` under `components.HdrukButton` apply and
 * `.HdrukButton-root` is a stable class target. No styles of its own.
 */
const ButtonRoot = styled(MuiButton, {
  name: "HdrukButton",
  slot: "Root",
})({});

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(inProps, ref) {
    const props = useThemeProps({
      props: inProps,
      name: "HdrukButton",
    }) as ButtonProps;
    const {
      purpose = "primary",
      purposeMap,
      variant,
      color,
      loadingPosition = "start",
      children,
      ...rest
    } = props;

    const mapped = { ...BASE_PURPOSE_MAP[purpose], ...purposeMap?.[purpose] };

    return (
      <ButtonRoot
        ref={ref}
        variant={variant ?? mapped.variant}
        color={color ?? mapped.color}
        loadingPosition={loadingPosition}
        {...rest}>
        {children}
      </ButtonRoot>
    );
  }
  // Re-typed as polymorphic so `component` swaps the root element and widens
  // the accepted props to that element's attributes, as MUI's Button does.
) as OverridableComponent<ButtonTypeMap>;

(Button as { displayName?: string }).displayName = "Button";
