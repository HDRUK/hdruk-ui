import type { MuiPickersAdapter, PickerValidDate } from "@mui/x-date-pickers";
import type { DateCalendarProps } from "@mui/x-date-pickers/DateCalendar";

export type DateRange = [PickerValidDate | null, PickerValidDate | null];

type Adapter = MuiPickersAdapter;

const MS_PER_DAY = 24 * 60 * 60 * 1000;

export type DateRules = Pick<
  DateCalendarProps,
  "disableFuture" | "disablePast" | "minDate" | "maxDate" | "shouldDisableDate"
>;

export function isDayAllowed(
  adapter: Adapter,
  day: PickerValidDate,
  rules: DateRules,
  today: PickerValidDate
) {
  const { disableFuture, disablePast, minDate, maxDate, shouldDisableDate } =
    rules;

  return (
    adapter.isValid(day) &&
    !(disableFuture && adapter.isAfterDay(day, today)) &&
    !(disablePast && adapter.isBeforeDay(day, today)) &&
    !(minDate && adapter.isBeforeDay(day, minDate)) &&
    !(maxDate && adapter.isAfterDay(day, maxDate)) &&
    !(shouldDisableDate && shouldDisableDate(day))
  );
}

export function isRangeAllowed(
  adapter: Adapter,
  [start, end]: DateRange,
  rules: DateRules,
  today: PickerValidDate
) {
  return (
    start !== null &&
    end !== null &&
    !adapter.isAfterDay(start, end) &&
    isDayAllowed(adapter, start, rules, today) &&
    isDayAllowed(adapter, end, rules, today)
  );
}

export function nextRange(
  adapter: Adapter,
  [start, end]: DateRange,
  day: PickerValidDate
): DateRange {
  if (!start || end) {
    return [day, null];
  }
  if (adapter.isBeforeDay(day, start)) {
    return [day, start];
  }
  return [start, day];
}

export function isSameRange(
  adapter: Adapter,
  [aStart, aEnd]: DateRange,
  [bStart, bEnd]: DateRange
) {
  const same = (a: PickerValidDate | null, b: PickerValidDate | null) =>
    a === null || b === null ? a === b : adapter.isSameDay(a, b);

  return same(aStart, bStart) && same(aEnd, bEnd);
}

export function countDays(
  adapter: Adapter,
  start: PickerValidDate,
  end: PickerValidDate
) {
  const from = adapter.toJsDate(adapter.startOfDay(start)).getTime();
  const to = adapter.toJsDate(adapter.startOfDay(end)).getTime();

  return Math.round((to - from) / MS_PER_DAY) + 1;
}

export function formatRange(
  adapter: Adapter,
  [start, end]: DateRange,
  format: string
) {
  return [start, end]
    .filter((date): date is PickerValidDate => date !== null)
    .map(date => adapter.formatByString(date, format))
    .join(" — ");
}

export interface DayRangeState {
  isRangeEndpoint: boolean;
  isInRange: boolean;
  isInBand: boolean;
  isBandStart: boolean;
  isBandEnd: boolean;
}

export function getDayRangeState(
  adapter: Adapter,
  day: PickerValidDate,
  [start, end]: DateRange,
  hovered: PickerValidDate | null
): DayRangeState {
  const isRangeEndpoint =
    (start !== null && adapter.isSameDay(day, start)) ||
    (end !== null && adapter.isSameDay(day, end));

  const last = end ?? hovered;
  if (!start || !last || adapter.isSameDay(start, last)) {
    return {
      isRangeEndpoint,
      isInRange: isRangeEndpoint,
      isInBand: false,
      isBandStart: false,
      isBandEnd: false,
    };
  }

  const [from, to] = adapter.isBeforeDay(last, start)
    ? [last, start]
    : [start, last];
  const isInBand =
    !adapter.isBeforeDay(day, from) && !adapter.isAfterDay(day, to);

  return {
    isRangeEndpoint,
    isInRange: isRangeEndpoint || (end !== null && isInBand),
    isInBand,
    isBandStart:
      adapter.isSameDay(day, from) ||
      adapter.isSameDay(day, adapter.startOfWeek(day)) ||
      adapter.isSameDay(day, adapter.startOfMonth(day)),
    isBandEnd:
      adapter.isSameDay(day, to) ||
      adapter.isSameDay(day, adapter.endOfWeek(day)) ||
      adapter.isSameDay(day, adapter.endOfMonth(day)),
  };
}
