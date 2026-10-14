"use client";

import * as React from "react";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import MuiCheckbox, { CheckboxProps } from "@mui/material/Checkbox";
import MuiFormControlLabel from "@mui/material/FormControlLabel";
import { styled, useThemeProps } from "@mui/material/styles";
import MuiTypography from "@mui/material/Typography";
import { tokens } from "../../theme";
import { Button, ButtonProps } from "../Button";
import { IconButton, IconButtonProps } from "../IconButton";
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
    action?: Partial<ButtonProps> & { href?: string };
    closeButton?: Partial<IconButtonProps>;
    checkbox?: Partial<CheckboxProps>;
  };
  sx?: SxProps<Theme>;
}

const BannerRoot = styled("section", {
  name: "HdrukBanner",
  slot: "Root",
})(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: theme.spacing(2),
  padding: theme.spacing(2, 3),
  backgroundColor: theme.palette.info.main,
  color: theme.palette.background.paper,
}));

const BannerContent = styled("div", {
  name: "HdrukBanner",
  slot: "Content",
})(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "baseline",
  gap: theme.spacing(1, 2),
  flex: "1 1 0",
  minWidth: 0,
}));

const BannerHighlight = styled(MuiTypography, {
  name: "HdrukBanner",
  slot: "Highlight",
})(({ theme }) => ({
  color: theme.palette.status.announcement,
})) as typeof MuiTypography;

const BannerTitle = styled(MuiTypography, {
  name: "HdrukBanner",
  slot: "Title",
})({}) as typeof MuiTypography;

const BannerMessage = styled(MuiTypography, {
  name: "HdrukBanner",
  slot: "Message",
})(({ theme }) => ({
  [theme.breakpoints.down("sm")]: { flexBasis: "100%" },
})) as typeof MuiTypography;

const BannerActions = styled("div", {
  name: "HdrukBanner",
  slot: "Actions",
})(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: theme.spacing(2),
  [theme.breakpoints.down("sm")]: { flexBasis: "100%", order: 1 },
}));

const BannerAction = styled(Button, {
  name: "HdrukBanner",
  slot: "Action",
})({});

const BannerSuppress = styled(MuiFormControlLabel, {
  name: "HdrukBanner",
  slot: "Suppress",
})(({ theme }) => ({
  margin: 0,
  color: theme.palette.info.contrastText,
}));

const BannerCheckbox = styled(MuiCheckbox, {
  name: "HdrukBanner",
  slot: "Checkbox",
})(({ theme }) => ({
  padding: theme.spacing(1),
  "&.Mui-focusVisible": {
    outline: `${tokens.stroke.thick}px solid ${theme.palette.status.keyboardFocus}`,
    outlineOffset: 0,
  },
}));

const BannerCheckboxIcon = styled("span", {
  name: "HdrukBanner",
  slot: "CheckboxIcon",
})(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxSizing: "border-box",
  width: tokens.iconSize.medium,
  height: tokens.iconSize.medium,
  fontSize: theme.typography.pxToRem(tokens.iconSize.small),
  backgroundColor: theme.palette.background.paper,
  border: `${tokens.stroke.thin}px solid ${theme.palette.status.faded}`,
  borderRadius: tokens.radius.small,
  color: theme.palette.info.main,
}));

const BannerCloseButton = styled(IconButton, {
  name: "HdrukBanner",
  slot: "CloseButton",
})(({ theme }) => ({
  [theme.breakpoints.down("sm")]: { alignSelf: "flex-start" },
}));

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
            <BannerHighlight
              id={`${id}-highlight`}
              variant="h5"
              component="span">
              {highlight}
            </BannerHighlight>
          ) : null}
          {title ? (
            <BannerTitle
              id={`${id}-title`}
              variant="articleLead"
              component="span">
              {title}
            </BannerTitle>
          ) : null}
          {children ? (
            <BannerMessage variant="body1" component="div">
              {children}
            </BannerMessage>
          ) : null}
        </BannerContent>
        {actionLabel || suppressible ? (
          <BannerActions>
            {actionLabel ? (
              <BannerAction
                purpose="tertiary"
                onClick={onAction}
                {...slotProps?.action}>
                {actionLabel}
              </BannerAction>
            ) : null}
            {suppressible ? (
              <BannerSuppress
                label={suppressLabel}
                slotProps={{ typography: { variant: "subtitle2" } }}
                control={
                  <BannerCheckbox
                    checked={suppressed}
                    onChange={handleSuppressChange}
                    icon={<BannerCheckboxIcon />}
                    checkedIcon={
                      <BannerCheckboxIcon>
                        <CheckIcon fontSize="inherit" />
                      </BannerCheckboxIcon>
                    }
                    {...slotProps?.checkbox}
                  />
                }
              />
            ) : null}
          </BannerActions>
        ) : null}
        {closable ? (
          <BannerCloseButton
            color="inherit"
            aria-label={closeLabel}
            onClick={handleClose}
            {...slotProps?.closeButton}>
            <CloseIcon />
          </BannerCloseButton>
        ) : null}
      </BannerRoot>
    );
  }
);

Banner.displayName = "Banner";
