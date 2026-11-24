import MuiListItemButton from "@mui/material/ListItemButton";
import { styled } from "@mui/material/styles";
import { focusRing, tokens } from "../../theme";

interface MenuItemOwnerState {
  selected: boolean;
}

export const MenuItemRoot = styled(MuiListItemButton, {
  name: "HdrukMenuItem",
  slot: "Root",
})(({ theme }) => ({
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
})<{ ownerState: MenuItemOwnerState }>(({ theme }) => ({
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
  ],
}));

export const MenuItemEndIcon = styled(MenuItemIcon, {
  name: "HdrukMenuItem",
  slot: "EndIcon",
})({});
