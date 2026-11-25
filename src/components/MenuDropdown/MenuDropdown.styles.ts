import type * as React from "react";
import { styled } from "@mui/material/styles";
import { tokens } from "../../theme";
import { MenuItem } from "../MenuItem";

export const MenuDropdownRoot = styled("div", {
  name: "HdrukMenuDropdown",
  slot: "Root",
})(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: tokens.stroke.thin,
  backgroundColor: theme.palette.background.paper,
}));

export const MenuDropdownTrigger = styled(MenuItem, {
  name: "HdrukMenuDropdown",
  slot: "Trigger",
})<{ component?: React.ElementType }>({});

export const MenuDropdownList = styled("div", {
  name: "HdrukMenuDropdown",
  slot: "List",
})(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: tokens.stroke.thin,
  marginLeft: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderLeft: `${tokens.stroke.thin}px solid ${theme.palette.status.grey}`,
}));
