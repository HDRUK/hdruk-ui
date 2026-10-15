import { styled } from "@mui/material/styles";
import { visuallyHidden } from "@mui/utils";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { tokens } from "../../theme";

interface MonthOwnerState {
  hidePrevious: boolean;
  hideNext: boolean;
}

interface DayCellOwnerState {
  isInBand: boolean;
  isBandStart: boolean;
  isBandEnd: boolean;
}

export const DateRangeCalendarRoot = styled("div", {
  name: "HdrukDateRangeCalendar",
  slot: "Root",
})({
  display: "flex",
  flexDirection: "column",
});

export const DateRangeCalendarMonths = styled("div", {
  name: "HdrukDateRangeCalendar",
  slot: "Months",
})(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing(3),
  "& > * + *": {
    boxSizing: "content-box",
    borderLeft: `${tokens.stroke.thin}px solid ${theme.palette.divider}`,
    paddingLeft: `calc(${theme.spacing(3)} - ${tokens.stroke.thin}px)`,
  },
}));

export const DateRangeCalendarMonth = styled(DateCalendar, {
  name: "HdrukDateRangeCalendar",
  slot: "Month",
})<{ ownerState: MonthOwnerState }>(({ theme }) => ({
  margin: 0,
  "&.MuiDateCalendar-root": { flex: "1 1 0", width: "auto" },
  "& .MuiPickersCalendarHeader-labelContainer": theme.typography.h5,
  "& .MuiDayCalendar-weekDayLabel": {
    flex: "1 1 0",
    minWidth: theme.spacing(6.5),
    margin: 0,
    [theme.breakpoints.down("sm")]: { minWidth: theme.spacing(5.5) },
  },
  variants: [
    {
      props: { hidePrevious: true },
      style: {
        "& .MuiPickersArrowSwitcher-previousIconButton": {
          visibility: "hidden",
        },
      },
    },
    {
      props: { hideNext: true },
      style: {
        "& .MuiPickersArrowSwitcher-nextIconButton": {
          visibility: "hidden",
        },
      },
    },
  ],
}));

export const DateRangeCalendarDayCell = styled("div", {
  name: "HdrukDateRangeCalendar",
  slot: "DayCell",
})<{ ownerState: DayCellOwnerState }>(({ theme }) => ({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  flex: "1 1 0",
  minWidth: theme.spacing(6.5),
  [theme.breakpoints.down("sm")]: { minWidth: theme.spacing(5.5) },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  variants: [
    {
      props: { isInBand: true },
      style: {
        "&::before": { backgroundColor: theme.palette.brand.accentPrimary },
      },
    },
    {
      props: { isInBand: true, isBandStart: true },
      style: {
        "&::before": {
          left: `calc(50% - ${theme.spacing(2.5)})`,
          borderTopLeftRadius: tokens.radius.pill,
          borderBottomLeftRadius: tokens.radius.pill,
        },
      },
    },
    {
      props: { isInBand: true, isBandEnd: true },
      style: {
        "&::before": {
          right: `calc(50% - ${theme.spacing(2.5)})`,
          borderTopRightRadius: tokens.radius.pill,
          borderBottomRightRadius: tokens.radius.pill,
        },
      },
    },
  ],
}));

export const DateRangeCalendarDay = styled(PickersDay, {
  name: "HdrukDateRangeCalendar",
  slot: "Day",
})({
  position: "relative",
});

export const DateRangeCalendarSummary = styled("div", {
  name: "HdrukDateRangeCalendar",
  slot: "Summary",
})(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  gap: theme.spacing(1, 2),
  marginTop: theme.spacing(2),
  ...theme.typography.bodySmall,
  minHeight: "1lh",
}));

export const DateRangeCalendarSummaryRange = styled("span", {
  name: "HdrukDateRangeCalendar",
  slot: "SummaryRange",
})(({ theme }) => ({
  ...theme.typography.bodySmall,
  fontWeight: theme.typography.fontWeightMedium,
  color: theme.palette.text.primary,
}));

export const DateRangeCalendarSummaryCount = styled("span", {
  name: "HdrukDateRangeCalendar",
  slot: "SummaryCount",
})(({ theme }) => ({
  ...theme.typography.bodySmall,
  color: theme.palette.text.secondary,
}));

export const DateRangeCalendarAnnouncement = styled("span", {
  name: "HdrukDateRangeCalendar",
  slot: "Announcement",
})(visuallyHidden);
