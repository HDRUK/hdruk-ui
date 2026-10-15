import MuiChip from "@mui/material/Chip";
import MuiDialog from "@mui/material/Dialog";
import MuiFormLabel from "@mui/material/FormLabel";
import MuiOutlinedInput from "@mui/material/OutlinedInput";
import MuiPopover from "@mui/material/Popover";
import { styled } from "@mui/material/styles";
import { visuallyHidden } from "@mui/utils";
import { DateField } from "@mui/x-date-pickers/DateField";
import { focusRing, tokens } from "../../theme";
import type { Theme } from "@mui/material/styles";

export const DateRangePickerRoot = styled("div", {
  name: "HdrukDateRangePicker",
  slot: "Root",
})({
  display: "inline-flex",
});

export const DateRangePickerField = styled("div", {
  name: "HdrukDateRangePicker",
  slot: "Field",
})(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(2),
}));

export const DateRangePickerFieldItem = styled("div", {
  name: "HdrukDateRangePicker",
  slot: "FieldItem",
})(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(0.5),
}));

export const DateRangePickerLabel = styled(MuiFormLabel, {
  name: "HdrukDateRangePicker",
  slot: "Label",
})({});

export const DateRangePickerHiddenLabel = styled("label", {
  name: "HdrukDateRangePicker",
  slot: "HiddenLabel",
})(visuallyHidden);

export const DateRangePickerInput = styled(MuiOutlinedInput, {
  name: "HdrukDateRangePicker",
  slot: "Input",
})({
  "& .MuiOutlinedInput-input": { cursor: "pointer" },
});

export const DateRangePickerDateField = styled(DateField, {
  name: "HdrukDateRangePicker",
  slot: "DateField",
})({});

const surface = (theme: Theme) => ({
  borderRadius: tokens.radius.small,
  border: 0,
  backgroundColor: theme.palette.background.paper,
  boxShadow: tokens.elevation[2],
});

export const DateRangePickerPopover = styled(MuiPopover, {
  name: "HdrukDateRangePicker",
  slot: "Popover",
})(({ theme }) => ({
  "& .MuiPopover-paper": surface(theme),
}));

export const DateRangePickerDialog = styled(MuiDialog, {
  name: "HdrukDateRangePicker",
  slot: "Dialog",
})(({ theme }) => ({
  "& .MuiDialog-paper:not(.MuiDialog-paperFullScreen)": surface(theme),
}));

export const DateRangePickerContent = styled("div", {
  name: "HdrukDateRangePicker",
  slot: "Content",
})<{ ownerState: { desktop: boolean } }>(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  padding: theme.spacing(3),
  [theme.breakpoints.down("sm")]: { padding: theme.spacing(2) },
  variants: [
    {
      props: { desktop: true },
      style: { boxSizing: "border-box", width: theme.spacing(112.5) },
    },
  ],
}));

export const DateRangePickerToolbar = styled("div", {
  name: "HdrukDateRangePicker",
  slot: "Toolbar",
})(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
}));

export const DateRangePickerToolbarTitle = styled("span", {
  name: "HdrukDateRangePicker",
  slot: "ToolbarTitle",
})(({ theme }) => ({
  ...theme.typography.bodySmall,
  fontWeight: theme.typography.fontWeightMedium,
  color: theme.palette.text.secondary,
}));

export const DateRangePickerToolbarHeading = styled("span", {
  name: "HdrukDateRangePicker",
  slot: "ToolbarHeading",
})(({ theme }) => ({
  ...theme.typography.h3,
  color: theme.palette.text.primary,
}));

export const DateRangePickerShortcuts = styled("div", {
  name: "HdrukDateRangePicker",
  slot: "Shortcuts",
})(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(1, 1.5),
}));

export const DateRangePickerShortcut = styled(MuiChip, {
  name: "HdrukDateRangePicker",
  slot: "Shortcut",
})(({ theme }) => ({
  ...theme.typography.bodySmall,
  fontWeight: theme.typography.fontWeightRegular,
  height: "auto",
  minHeight: theme.spacing(3.5),
  gap: theme.spacing(0.5),
  padding: theme.spacing(0.5, 1.5),
  borderRadius: tokens.radius.pill,
  "& .MuiChip-label": { padding: 0, lineHeight: 1 },
  "&.MuiChip-clickable:hover": {
    backgroundColor: theme.palette.status.hovered,
  },
  "&.Mui-focusVisible": {
    ...focusRing(theme),
  },
  variants: [
    {
      props: { variant: "outlined" },
      style: {
        color: tokens.text.secondaryBlack,
        borderColor: "currentColor",
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(0.375, 1.375),
      },
    },
    {
      props: { variant: "filled", color: "primary" },
      style: {
        "&.MuiChip-clickable:hover, &.Mui-focusVisible": {
          backgroundColor: theme.palette.primary.dark,
        },
      },
    },
  ],
}));

export const DateRangePickerFooter = styled("div", {
  name: "HdrukDateRangePicker",
  slot: "Footer",
})(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  gap: theme.spacing(2),
  paddingTop: theme.spacing(2),
  borderTop: `${tokens.stroke.thin}px solid ${theme.palette.divider}`,
}));
