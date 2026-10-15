"use client";

import * as React from "react";
import { useTheme, useThemeProps } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  unstable_useControlled as useControlled,
  unstable_useForkRef as useForkRef,
} from "@mui/utils";
import {
  usePickerAdapter,
  usePickerTranslations,
} from "@mui/x-date-pickers/hooks";
import { Button } from "../Button";
import { DateRangeCalendar } from "../DateRangeCalendar";
import {
  formatRange,
  isRangeAllowed,
  isSameRange,
} from "../DateRangeCalendar/DateRangeCalendar.utils";
import {
  MultiInputDateRangeField,
  SingleInputDateRangeField,
} from "./DateRangeFields";
import {
  DateRangePickerRoot,
  DateRangePickerContent,
  DateRangePickerDialog,
  DateRangePickerPopover,
  DateRangePickerToolbar,
  DateRangePickerToolbarTitle,
  DateRangePickerToolbarHeading,
  DateRangePickerShortcuts,
  DateRangePickerShortcut,
  DateRangePickerFooter,
} from "./DateRangePicker.styles";
import type { DateRangeFieldProps } from "./DateRangeFields";
import type { DateRange, DateRangeCalendarProps } from "../DateRangeCalendar";
import type { PickersInputLocaleText } from "@mui/x-date-pickers";
import type { PickersShortcutsItem } from "@mui/x-date-pickers/PickersShortcuts";

export interface DateRangePickerProps extends Omit<
  DateRangeCalendarProps,
  "onChange" | "calendars" | "hideSummary"
> {
  /** Fires when the value is committed: on OK, or when a split field holds a valid typed date. */
  onChange?: (value: DateRange) => void;
  /** Fires on OK. */
  onAccept?: (value: DateRange) => void;
  /** Shortcuts whose range breaks the date rules are disabled. */
  shortcuts?: PickersShortcutsItem<DateRange>[];
  /** Defaults to the adapter locale's keyboard date format. */
  format?: string;
  label?: string;
  /** Keeps the label for screen readers only. */
  hideLabel?: boolean;
  customShortcutLabel?: string;
  /** Overrides the `LocalizationProvider` translations for this picker. */
  localeText?: PickersInputLocaleText;
  slots?: {
    field?: React.ElementType<DateRangeFieldProps>;
  };
}

export const DateRangePicker = React.forwardRef<
  HTMLDivElement,
  DateRangePickerProps
>(function DateRangePicker(inProps, ref) {
  const {
    value: valueProp,
    defaultValue = [null, null],
    onChange,
    onAccept,
    shortcuts = [],
    format: formatProp,
    label = "Date range",
    hideLabel = false,
    customShortcutLabel = "Custom",
    localeText,
    getDaysSelectedText,
    getStartSelectedText,
    disableFuture,
    disablePast,
    minDate,
    maxDate,
    shouldDisableDate,
    slots,
    ...rest
  } = useThemeProps({ props: inProps, name: "HdrukDateRangePicker" });

  const adapter = usePickerAdapter();
  const translations = { ...usePickerTranslations(), ...localeText };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isFullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const handleRef = useForkRef(rootRef, ref);
  const titleId = React.useId();
  const format = formatProp ?? adapter.formats.keyboardDate;
  const Field = slots?.field ?? SingleInputDateRangeField;
  const [today] = React.useState(() => adapter.startOfDay(adapter.date()));

  const [value, setValue] = useControlled<DateRange>({
    controlled: valueProp,
    default: defaultValue,
    name: "DateRangePicker",
  });
  const [open, setOpen] = React.useState(false);
  const [draft, setDraft] = React.useState<DateRange>(value);

  const commit = (next: DateRange) => {
    setValue(next);
    if (onChange) {
      onChange(next);
    }
  };

  const handleOpen = () => {
    setDraft(value);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAccept = () => {
    commit(draft);
    if (onAccept) {
      onAccept(draft);
    }
    setOpen(false);
  };

  const rules = {
    disableFuture,
    disablePast,
    minDate,
    maxDate,
    shouldDisableDate,
  };
  const isValid = (range: DateRange) =>
    isRangeAllowed(adapter, range, rules, today);
  const shortcutItems = shortcuts.map(item => {
    const range = item.getValue({ isValid });
    return { item, range, disabled: !isValid(range) };
  });
  const isCustom = !shortcutItems.some(({ range }) =>
    isSameRange(adapter, range, draft)
  );

  const formattedValue = formatRange(adapter, value, format);
  const fieldProps: DateRangeFieldProps = {
    value,
    onChange: commit,
    format,
    label,
    hideLabel,
    startLabel: translations.startDate,
    endLabel: translations.endDate,
    open,
    onOpen: handleOpen,
    openPickerLabel: translations.openRangePickerDialogue(formattedValue),
    ...rules,
  };

  const calendar = (
    <DateRangeCalendar
      value={draft}
      onChange={setDraft}
      calendars={isMobile ? 1 : 2}
      hideSummary={isMobile}
      getDaysSelectedText={getDaysSelectedText}
      getStartSelectedText={getStartSelectedText}
      {...rules}
    />
  );

  const footer = (
    <DateRangePickerFooter>
      <Button purpose="tertiary" onClick={handleClose}>
        {translations.cancelButtonLabel}
      </Button>
      <Button
        purpose="primary"
        disabled={!draft[0] || !draft[1]}
        onClick={handleAccept}>
        {translations.okButtonLabel}
      </Button>
    </DateRangePickerFooter>
  );

  return (
    <DateRangePickerRoot ref={handleRef} {...rest}>
      <Field {...fieldProps} />
      {isMobile ? (
        <DateRangePickerDialog
          open={open}
          onClose={handleClose}
          fullWidth
          fullScreen={isFullScreen}
          aria-labelledby={titleId}>
          <DateRangePickerContent ownerState={{ desktop: false }}>
            <DateRangePickerToolbar>
              <DateRangePickerToolbarTitle id={titleId}>
                {translations.dateRangePickerToolbarTitle}
              </DateRangePickerToolbarTitle>
              <DateRangePickerToolbarHeading>
                {formatRange(adapter, draft, adapter.formats.shortDate) || "—"}
              </DateRangePickerToolbarHeading>
            </DateRangePickerToolbar>
            <MultiInputDateRangeField
              {...fieldProps}
              value={draft}
              onChange={setDraft}
              openPickerLabel=""
            />
            {calendar}
            {footer}
          </DateRangePickerContent>
        </DateRangePickerDialog>
      ) : (
        <DateRangePickerPopover
          open={open}
          anchorEl={rootRef.current}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          slotProps={{
            paper: {
              role: "dialog",
              "aria-label": translations.dateRangePickerToolbarTitle,
            },
          }}>
          <DateRangePickerContent ownerState={{ desktop: true }}>
            {shortcutItems.length > 0 ? (
              <DateRangePickerShortcuts>
                <DateRangePickerShortcut
                  label={customShortcutLabel}
                  variant={isCustom ? "filled" : "outlined"}
                  color={isCustom ? "primary" : "default"}
                />
                {shortcutItems.map(({ item, range, disabled }) => {
                  const pressed =
                    !isCustom && isSameRange(adapter, range, draft);
                  return (
                    <DateRangePickerShortcut
                      key={item.id ?? item.label}
                      label={item.label}
                      variant={pressed ? "filled" : "outlined"}
                      color={pressed ? "primary" : "default"}
                      aria-pressed={pressed}
                      disabled={disabled}
                      onClick={() => setDraft(range)}
                    />
                  );
                })}
              </DateRangePickerShortcuts>
            ) : null}
            {calendar}
            {footer}
          </DateRangePickerContent>
        </DateRangePickerPopover>
      )}
    </DateRangePickerRoot>
  );
});

DateRangePicker.displayName = "DateRangePicker";
