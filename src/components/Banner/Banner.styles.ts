import MuiCheckbox from "@mui/material/Checkbox";
import MuiFormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/material/styles";
import { focusRing, tokens } from "../../theme";
import { Button } from "../Button";
import { IconButton } from "../IconButton";

export const BannerRoot = styled("section", {
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

export const BannerContent = styled("div", {
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

export const BannerTag = styled("span", {
  name: "HdrukBanner",
  slot: "Tag",
})(({ theme }) => ({
  ...theme.typography.h4,
  color: theme.palette.status.announcement,
}));

export const BannerTitle = styled("span", {
  name: "HdrukBanner",
  slot: "Title",
})(({ theme }) => theme.typography.articleLead);

export const BannerMessage = styled("div", {
  name: "HdrukBanner",
  slot: "Message",
})(({ theme }) => ({
  ...theme.typography.body1,
  [theme.breakpoints.down("sm")]: { flexBasis: "100%" },
}));

export const BannerActions = styled("div", {
  name: "HdrukBanner",
  slot: "Actions",
})(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: theme.spacing(2),
  [theme.breakpoints.down("sm")]: { flexBasis: "100%", order: 1 },
}));

export const BannerActionButton = styled(Button, {
  name: "HdrukBanner",
  slot: "Action",
})({});

export const BannerSuppress = styled(MuiFormControlLabel, {
  name: "HdrukBanner",
  slot: "Suppress",
})(({ theme }) => ({
  margin: 0,
  color: theme.palette.info.contrastText,
}));

export const BannerCheckbox = styled(MuiCheckbox, {
  name: "HdrukBanner",
  slot: "Checkbox",
})(({ theme }) => ({
  padding: theme.spacing(1),
  "&.Mui-focusVisible": {
    ...focusRing(theme),
  },
}));

export const BannerCheckboxIcon = styled("span", {
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

export const BannerCloseButton = styled(IconButton, {
  name: "HdrukBanner",
  slot: "CloseButton",
})(({ theme }) => ({
  [theme.breakpoints.down("sm")]: { alignSelf: "flex-start" },
}));
