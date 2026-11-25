import MuiListItemButton from "@mui/material/ListItemButton";
import { styled } from "@mui/material/styles";
import { focusRing, tokens } from "../../theme";

interface MenuItemOwnerState {
  selected: boolean;
  orientation: "vertical" | "horizontal" | "centered";
}

type WithOwnerState = { ownerState: MenuItemOwnerState };

export const MenuItemRoot = styled(MuiListItemButton, {
  name: "HdrukMenuItem",
  slot: "Root",
})<WithOwnerState>(({ theme }) => ({
  gap: theme.spacing(1),
  minHeight: theme.spacing(5),
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  paddingLeft: theme.spacing(1.5),
  paddingRight: theme.spacing(1.5),
  color: tokens.text.secondaryBlack,
  backgroundColor: "transparent",
  "&:hover": {
    backgroundColor: theme.palette.status.hovered,
  },
  "&.Mui-focusVisible": {
    ...focusRing(theme),
    backgroundColor: "transparent",
  },
  "&.Mui-selected, &.Mui-selected.Mui-focusVisible": {
    backgroundColor: "transparent",
    boxShadow: `inset ${tokens.stroke.thick}px 0 0 ${theme.palette.status.selected}`,
  },
  "&.Mui-selected:hover": {
    backgroundColor: theme.palette.status.hovered,
  },
  "&.Mui-disabled": {
    opacity: 1,
    color: theme.palette.text.disabled,
  },
  variants: [
    {
      props: ({ ownerState }: WithOwnerState) =>
        ownerState.orientation !== "vertical",
      style: {
        display: "inline-flex",
        flexGrow: 0,
        "&.Mui-selected, &.Mui-selected.Mui-focusVisible": {
          boxShadow: `inset 0 -${tokens.stroke.thick}px 0 ${theme.palette.status.selected}`,
        },
      },
    },
    {
      props: ({ ownerState }: WithOwnerState) =>
        ownerState.orientation === "centered",
      style: { justifyContent: "center" },
    },
  ],
}));

export const MenuItemIcon = styled("span", {
  name: "HdrukMenuItem",
  slot: "Icon",
})(({ theme }) => ({
  display: "flex",
  flexShrink: 0,
  alignItems: "center",
  justifyContent: "center",
  width: tokens.iconSize.medium,
  height: tokens.iconSize.medium,
  fontSize: theme.typography.pxToRem(tokens.iconSize.medium),
}));

export const MenuItemLabel = styled("span", {
  name: "HdrukMenuItem",
  slot: "Label",
})<WithOwnerState>(({ theme }) => ({
  ...theme.typography.body1,
  flex: "1 1 auto",
  minWidth: 0,
  textAlign: "left",
  variants: [
    {
      props: ({ ownerState }: { ownerState: MenuItemOwnerState }) =>
        ownerState.selected,
      style: { fontWeight: theme.typography.fontWeightMedium },
    },
    {
      props: ({ ownerState }: WithOwnerState) =>
        ownerState.orientation === "centered",
      style: { flex: "0 1 auto", textAlign: "center" },
    },
  ],
}));

export const MenuItemEndIcon = styled(MenuItemIcon, {
  name: "HdrukMenuItem",
  slot: "EndIcon",
})({});
