"use client";

import * as React from "react";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useThemeProps } from "@mui/material/styles";
import {
  BannerRoot,
  BannerContent,
  BannerHighlight,
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

export interface BannerProps extends Omit<
  React.ComponentPropsWithoutRef<"section">,
  "title"
> {
  /** Lead text in the announcement colour, e.g. "Beta!". */
  highlight?: React.ReactNode;
  title?: React.ReactNode;
  /** Renders the action button when set. */
  actionLabel?: string;
  onAction?: React.MouseEventHandler<HTMLButtonElement>;
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
    action?: Partial<Omit<ButtonProps, "onClick" | "children">> &
      Pick<
        React.AnchorHTMLAttributes<HTMLAnchorElement>,
        "href" | "target" | "rel"
      >;
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
      highlight,
      title,
      children,
      actionLabel,
      onAction,
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

    const labelledBy = [
      highlight ? `${id}-highlight` : null,
      title ? `${id}-title` : null,
    ]
      .filter(Boolean)
      .join(" ");

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
          {highlight ? (
            <BannerHighlight id={`${id}-highlight`}>
              {highlight}
            </BannerHighlight>
          ) : null}
          {title ? <BannerTitle id={`${id}-title`}>{title}</BannerTitle> : null}
          {children ? <BannerMessage>{children}</BannerMessage> : null}
        </BannerContent>
        {actionLabel || suppressible ? (
          <BannerActions>
            {actionLabel ? (
              <BannerAction
                purpose="tertiary"
                {...slotProps?.action}
                onClick={onAction}>
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
