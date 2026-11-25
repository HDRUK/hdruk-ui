import type * as React from "react";
import ButtonBase from "@mui/material/ButtonBase";
import { styled } from "@mui/material/styles";
import { visuallyHidden } from "@mui/utils";
import { focusRing, tokens } from "../../theme";
import { MenuItem } from "../MenuItem";

interface LeftNavOwnerState {
  collapsed: boolean;
  mobileOpen: boolean;
  animating?: boolean;
  duration?: number;
}

type WithOwnerState = { ownerState: LeftNavOwnerState };

export const LeftNavRoot = styled("nav", {
  name: "HdrukLeftNav",
  slot: "Root",
})<WithOwnerState>(({ theme, ownerState }) => ({
  display: "flex",
  flexDirection: "column",
  width: theme.spacing(30),
  backgroundColor: theme.palette.background.paper,
  transition: theme.transitions.create("width", {
    duration: ownerState.duration,
    easing: ownerState.collapsed
      ? theme.transitions.easing.easeIn
      : theme.transitions.easing.easeOut,
  }),
  "@media (prefers-reduced-motion: reduce)": { transition: "none" },
  [theme.breakpoints.down("sm")]: { width: "100%" },
  variants: [
    {
      props: ({ ownerState }: WithOwnerState) => Boolean(ownerState.animating),
      style: { overflowX: "hidden", whiteSpace: "nowrap" },
    },
    {
      props: ({ ownerState }: WithOwnerState) => ownerState.collapsed,
      style: {
        [theme.breakpoints.up("sm")]: {
          width: `calc(${theme.spacing(3)} + ${tokens.iconSize.medium}px)`,
        },
      },
    },
  ],
}));

export const LeftNavHeader = styled("div", {
  name: "HdrukLeftNav",
  slot: "Header",
})(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  alignSelf: "stretch",
  gap: theme.spacing(1),
  minHeight: theme.spacing(5),
  borderBottom: `${tokens.stroke.thin}px solid ${theme.palette.status.grey}`,
  [theme.breakpoints.down("sm")]: { display: "none" },
}));

export const LeftNavHeading = styled("span", {
  name: "HdrukLeftNav",
  slot: "Heading",
})<WithOwnerState>(({ theme, ownerState }) => ({
  ...theme.typography.body1,
  flex: "1 1 auto",
  minWidth: 0,
  paddingLeft: theme.spacing(1.5),
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  color: theme.palette.text.secondaryDefault,
  transition: theme.transitions.create("opacity", {
    duration: ownerState.duration,
  }),
  "@media (prefers-reduced-motion: reduce)": { transition: "none" },
  variants: [
    {
      props: ({ ownerState }: WithOwnerState) => ownerState.collapsed,
      style: { opacity: 0 },
    },
    {
      props: ({ ownerState }: WithOwnerState) =>
        ownerState.collapsed && !ownerState.animating,
      style: visuallyHidden,
    },
  ],
}));

export const LeftNavToggle = styled(ButtonBase, {
  name: "HdrukLeftNav",
  slot: "Toggle",
})(({ theme }) => ({
  alignSelf: "stretch",
  flexShrink: 0,
  padding: theme.spacing(1, 1.5),
  borderRadius: tokens.radius.none,
  color: theme.palette.text.secondaryDefault,
  fontSize: theme.typography.pxToRem(tokens.iconSize.medium),
  "&:hover, &.Mui-focusVisible": {
    backgroundColor: `color-mix(in srgb, currentColor ${theme.palette.action.focusOpacity * 100}%, transparent)`,
  },
  "&.Mui-focusVisible": focusRing(theme),
}));

export const LeftNavMobileToggle = styled(MenuItem, {
  name: "HdrukLeftNav",
  slot: "MobileToggle",
})<{ component?: React.ElementType }>(({ theme }) => ({
  flexGrow: 0,
  borderBottom: `${tokens.stroke.thin}px solid ${theme.palette.status.grey}`,
  [theme.breakpoints.up("sm")]: { display: "none" },
}));

export const LeftNavList = styled("div", {
  name: "HdrukLeftNav",
  slot: "List",
})<WithOwnerState>(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  variants: [
    {
      props: ({ ownerState }: WithOwnerState) => !ownerState.mobileOpen,
      style: { [theme.breakpoints.down("sm")]: { display: "none" } },
    },
  ],
}));
