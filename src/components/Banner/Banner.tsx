"use client";

import * as React from "react";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useThemeProps } from "@mui/material/styles";
import {
  BannerRoot,
  BannerContent,
  BannerTag,
  BannerTitle,
  BannerMessage,
  BannerActions,
  BannerAction,
  BannerSuppress,
  BannerCheckbox,
  BannerCheckboxIcon,
  BannerCloseButton,
} from "./Banner.styles";
import type { ButtonProps } from "../Button";
import type { IconButtonProps } from "../IconButton";
import type { CheckboxProps } from "@mui/material/Checkbox";
import type { SxProps, Theme } from "@mui/material/styles";

export interface BannerCloseDetails {
  suppressed: boolean;
}

export interface BannerAction {
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  href?: string;
  /** `"_blank"` defaults `rel` to `"noopener noreferrer"`. */
  target?: React.HTMLAttributeAnchorTarget;
  rel?: string;
  disabled?: boolean;
}

export interface BannerProps extends Omit<
  React.ComponentPropsWithoutRef<"section">,
  "title"
> {
  /** Short label classifying the message, e.g. "BETA" or "New!". */
  tag?: React.ReactNode;
  title?: React.ReactNode;
  /** Renders the action button when set; an `href` makes it a link. */
  action?: BannerAction;
  /** Shows a close button. Closing always hides the banner; `onClose` runs as well. */
  closable?: boolean;
  onClose?: (
    event: React.MouseEvent<HTMLButtonElement>,
    details: BannerCloseDetails
  ) => void;
  closeLabel?: string;
  /** Shows a checkbox for suppressing future display. Persisting the choice is up to the app. */
  suppressible?: boolean;
  onSuppressChange?: (checked: boolean) => void;
  suppressLabel?: string;
  slotProps?: {
    action?: Partial<Omit<ButtonProps, keyof BannerAction | "children">>;
    closeButton?: Partial<
      Omit<IconButtonProps, "onClick" | "aria-label" | "children">
    >;
    checkbox?: Partial<Omit<CheckboxProps, "checked" | "onChange">>;
  };
  sx?: SxProps<Theme>;
}

export const Banner = React.forwardRef<HTMLElement, BannerProps>(
  function Banner(inProps, ref) {
    const {
      tag,
      title,
      children,
      action,
      closable = false,
      onClose,
      closeLabel = "Close banner",
      suppressible = false,
      onSuppressChange,
      suppressLabel = "Don't show me this again",
      slotProps,
      ...rest
    } = useThemeProps({ props: inProps, name: "HdrukBanner" });

    const id = React.useId();
    const [open, setOpen] = React.useState(true);
    const [suppressed, setSuppressed] = React.useState(false);

    if (!open) {
      return null;
    }

    const labelledBy = [tag ? `${id}-tag` : null, title ? `${id}-title` : null]
      .filter(Boolean)
      .join(" ");

    const { label: actionLabel, ...actionProps } = action ?? { label: "" };

    const handleSuppressChange = (
      _event: React.ChangeEvent<HTMLInputElement>,
      checked: boolean
    ) => {
      setSuppressed(checked);
      if (onSuppressChange) {
        onSuppressChange(checked);
      }
    };

    const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
      setOpen(false);
      if (onClose) {
        onClose(event, { suppressed });
      }
    };

    return (
      <BannerRoot ref={ref} aria-labelledby={labelledBy || undefined} {...rest}>
        <BannerContent>
          {tag ? <BannerTag id={`${id}-tag`}>{tag}</BannerTag> : null}
          {title ? <BannerTitle id={`${id}-title`}>{title}</BannerTitle> : null}
          {children ? <BannerMessage>{children}</BannerMessage> : null}
        </BannerContent>
        {action || suppressible ? (
          <BannerActions>
            {action ? (
              <BannerAction
                purpose="tertiary"
                {...slotProps?.action}
                {...actionProps}
                rel={
                  action.rel ??
                  (action.target === "_blank"
                    ? "noopener noreferrer"
                    : undefined)
                }>
                {actionLabel}
              </BannerAction>
            ) : null}
            {suppressible ? (
              <BannerSuppress
                label={suppressLabel}
                slotProps={{ typography: { variant: "subtitle2" } }}
                control={
                  <BannerCheckbox
                    icon={<BannerCheckboxIcon />}
                    checkedIcon={
                      <BannerCheckboxIcon>
                        <CheckIcon fontSize="inherit" />
                      </BannerCheckboxIcon>
                    }
                    {...slotProps?.checkbox}
                    checked={suppressed}
                    onChange={handleSuppressChange}
                  />
                }
              />
            ) : null}
          </BannerActions>
        ) : null}
        {closable ? (
          <BannerCloseButton
            color="inherit"
            {...slotProps?.closeButton}
            aria-label={closeLabel}
            onClick={handleClose}>
            <CloseIcon />
          </BannerCloseButton>
        ) : null}
      </BannerRoot>
    );
  }
);

Banner.displayName = "Banner";
