"use client";

import * as React from "react";
import { useThemeProps } from "@mui/material/styles";
import { unstable_useControlled as useControlled } from "@mui/utils";
import { usePickerAdapter } from "@mui/x-date-pickers/hooks";
import {
  DateRangeCalendarRoot,
  DateRangeCalendarMonths,
  DateRangeCalendarMonth,
  DateRangeCalendarDayCell,
  DateRangeCalendarDay,
  DateRangeCalendarSummary,
  DateRangeCalendarSummaryRange,
  DateRangeCalendarSummaryCount,
  DateRangeCalendarAnnouncement,
} from "./DateRangeCalendar.styles";
import {
  countDays,
  formatRange,
  getDayRangeState,
  isSameRange,
  nextRange,
} from "./DateRangeCalendar.utils";
import type { DateRange, DayRangeState } from "./DateRangeCalendar.utils";
import type { SxProps, Theme } from "@mui/material/styles";
import type { MuiPickersAdapter, PickerValidDate } from "@mui/x-date-pickers";
import type { DateCalendarProps } from "@mui/x-date-pickers/DateCalendar";
import type { PickersDayProps } from "@mui/x-date-pickers/PickersDay";

export type { DateRange };

export interface DateRangeCalendarProps
  extends
    Omit<React.ComponentPropsWithoutRef<"div">, "onChange" | "defaultValue">,
    Pick<
      DateCalendarProps,
      | "disableFuture"
      | "disablePast"
      | "minDate"
      | "maxDate"
      | "shouldDisableDate"
    > {
  value?: DateRange;
  defaultValue?: DateRange;
  /** Fires on every day click; the end is `null` until a second day is picked. */
  onChange?: (value: DateRange) => void;
  /** Number of months shown side by side. */
  calendars?: 1 | 2;
  hideSummary?: boolean;
  getDaysSelectedText?: (count: number) => string;
  /** Announced to screen readers once a start date is picked. */
  getStartSelectedText?: (date: string) => string;
  sx?: SxProps<Theme>;
}

interface RangeContextValue {
  range: DateRange;
  hovered: PickerValidDate | null;
  setHovered: (day: PickerValidDate | null) => void;
}

const RangeContext = React.createContext<RangeContextValue | null>(null);

function useRangeContext() {
  const context = React.useContext(RangeContext);
  if (!context) {
    throw new Error("RangeDay must be rendered inside DateRangeCalendar.");
  }
  return context;
}

const OUTSIDE_MONTH: DayRangeState = {
  isRangeEndpoint: false,
  isInRange: false,
  isInBand: false,
  isBandStart: false,
  isBandEnd: false,
};

function RangeDay(props: PickersDayProps) {
  const { day, outsideCurrentMonth, onMouseEnter, onFocus } = props;
  const adapter = usePickerAdapter();
  const { range, hovered, setHovered } = useRangeContext();

  const { isRangeEndpoint, isInRange, isInBand, isBandStart, isBandEnd } =
    outsideCurrentMonth
      ? OUTSIDE_MONTH
      : getDayRangeState(adapter, day, range, hovered);

  return (
    <DateRangeCalendarDayCell ownerState={{ isInBand, isBandStart, isBandEnd }}>
      <DateRangeCalendarDay
        {...props}
        disableMargin
        selected={isRangeEndpoint}
        aria-selected={isInRange}
        onMouseEnter={(event, date) => {
          setHovered(date);
          if (onMouseEnter) {
            onMouseEnter(event, date);
          }
        }}
        onFocus={(event, date) => {
          setHovered(date);
          if (onFocus) {
            onFocus(event, date);
          }
        }}
      />
    </DateRangeCalendarDayCell>
  );
}

const getFirstMonth = (
  adapter: MuiPickersAdapter,
  [start, end]: DateRange,
  calendars: 1 | 2,
  today: PickerValidDate
) => {
  const month = adapter.startOfMonth(end ?? start ?? today);

  return calendars === 2 && end ? adapter.addMonths(month, -1) : month;
};

// Each DateCalendar is held on its month by an anchor `value`; MUI moves the
// view and the focused day whenever that value's identity changes, so anchors
// are only replaced when the view itself moves.
const getAnchors = (
  adapter: MuiPickersAdapter,
  firstMonth: PickerValidDate,
  calendars: 1 | 2,
  [start, end]: DateRange,
  today: PickerValidDate
) =>
  Array.from({ length: calendars }, (_, index) => {
    const month = adapter.addMonths(firstMonth, index);
    return (
      [start, end, today].find(
        date => date && adapter.isSameMonth(date, month)
      ) ?? month
    );
  });

export const DateRangeCalendar = React.forwardRef<
  HTMLDivElement,
  DateRangeCalendarProps
>(function DateRangeCalendar(inProps, ref) {
  const {
    value: valueProp,
    defaultValue = [null, null],
    onChange,
    calendars = 2,
    hideSummary = false,
    getDaysSelectedText = (count: number) =>
      `${count} ${count === 1 ? "day" : "days"} selected`,
    getStartSelectedText = (date: string) =>
      `Start date ${date} selected. Choose an end date.`,
    disableFuture,
    disablePast,
    minDate,
    maxDate,
    shouldDisableDate,
    ...rest
  } = useThemeProps({ props: inProps, name: "HdrukDateRangeCalendar" });

  const adapter = usePickerAdapter();
  const [today] = React.useState(() => adapter.startOfDay(adapter.date()));
  const [range, setRange] = useControlled<DateRange>({
    controlled: valueProp,
    default: defaultValue,
    name: "DateRangeCalendar",
  });
  const [hovered, setHovered] = React.useState<PickerValidDate | null>(null);
  const [view, setView] = React.useState(() => {
    const firstMonth = getFirstMonth(adapter, range, calendars, today);
    return {
      firstMonth,
      calendars,
      anchors: getAnchors(adapter, firstMonth, calendars, range, today),
    };
  });
  const { firstMonth, anchors } = view;

  const [start, end] = range;
  const lastMonth = adapter.addMonths(firstMonth, calendars - 1);

  const [shownRange, setShownRange] = React.useState(range);
  const rangeChanged = !isSameRange(adapter, shownRange, range);
  if (rangeChanged) {
    setShownRange(range);
  }
  const anchor = end ?? start;
  const rangeOutOfView =
    rangeChanged &&
    anchor !== null &&
    (adapter.isBefore(anchor, firstMonth) ||
      adapter.isAfter(anchor, adapter.endOfMonth(lastMonth)));
  if (rangeOutOfView || view.calendars !== calendars) {
    const nextFirst = getFirstMonth(adapter, range, calendars, today);
    setView({
      firstMonth: nextFirst,
      calendars,
      anchors: getAnchors(adapter, nextFirst, calendars, range, today),
    });
  }

  const handleDaySelect = (day: PickerValidDate | null) => {
    if (!day) {
      return;
    }
    const next = nextRange(adapter, range, adapter.startOfDay(day));
    setRange(next);
    if (onChange) {
      onChange(next);
    }
  };

  const handleMonthChange = (index: number, visible: PickerValidDate) => {
    setView(current => {
      if (
        adapter.isSameMonth(
          adapter.addMonths(current.firstMonth, index),
          visible
        )
      ) {
        return current;
      }
      const nextFirst = adapter.addMonths(visible, -index);
      const fresh = getAnchors(adapter, nextFirst, calendars, range, today);
      return {
        firstMonth: nextFirst,
        calendars,
        anchors: fresh.map((next, other) =>
          other === index ? current.anchors[other] : next
        ),
      };
    });
  };

  const monthsRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (monthsRef.current) {
      monthsRef.current
        .querySelectorAll('[role="grid"]')
        .forEach(grid => grid.setAttribute("aria-multiselectable", "true"));
    }
  }, [calendars]);

  const summaryRange = formatRange(adapter, range, adapter.formats.fullDate);
  const daysSelected =
    start && end ? getDaysSelectedText(countDays(adapter, start, end)) : null;
  let announcement = "";
  if (start && end) {
    announcement = `${summaryRange}, ${daysSelected}`;
  } else if (start) {
    announcement = getStartSelectedText(summaryRange);
  }

  const contextValue = React.useMemo(
    () => ({ range, hovered, setHovered }),
    [range, hovered]
  );

  return (
    <RangeContext.Provider value={contextValue}>
      <DateRangeCalendarRoot ref={ref} {...rest}>
        <DateRangeCalendarMonths
          ref={monthsRef}
          onMouseLeave={() => setHovered(null)}>
          {anchors.map((monthAnchor, index) => (
            <DateRangeCalendarMonth
              key={index}
              ownerState={{
                hidePrevious: index > 0,
                hideNext: index < calendars - 1,
              }}
              views={["day"]}
              value={monthAnchor}
              onChange={handleDaySelect}
              onMonthChange={visible => handleMonthChange(index, visible)}
              dayOfWeekFormatter={day => adapter.format(day, "weekdayShort")}
              slots={{ day: RangeDay }}
              disableFuture={disableFuture}
              disablePast={disablePast}
              minDate={minDate}
              maxDate={maxDate}
              shouldDisableDate={shouldDisableDate}
            />
          ))}
        </DateRangeCalendarMonths>
        {!hideSummary ? (
          <DateRangeCalendarSummary>
            <DateRangeCalendarSummaryRange>
              {summaryRange}
              {start && !end ? " —" : null}
            </DateRangeCalendarSummaryRange>
            <DateRangeCalendarSummaryCount>
              {daysSelected}
            </DateRangeCalendarSummaryCount>
          </DateRangeCalendarSummary>
        ) : null}
        <DateRangeCalendarAnnouncement role="status">
          {announcement}
        </DateRangeCalendarAnnouncement>
      </DateRangeCalendarRoot>
    </RangeContext.Provider>
  );
});

DateRangeCalendar.displayName = "DateRangeCalendar";
