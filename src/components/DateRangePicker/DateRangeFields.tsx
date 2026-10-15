"use client";

import * as React from "react";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import { usePickerAdapter } from "@mui/x-date-pickers/hooks";
import { formatRange } from "../DateRangeCalendar/DateRangeCalendar.utils";
import { IconButton } from "../IconButton";
import {
  DateRangePickerField,
  DateRangePickerFieldItem,
  DateRangePickerLabel,
  DateRangePickerHiddenLabel,
  DateRangePickerInput,
  DateRangePickerDateField,
} from "./DateRangePicker.styles";
import type {
  DateRange,
  DateRules,
} from "../DateRangeCalendar/DateRangeCalendar.utils";
import type { PickerValidDate } from "@mui/x-date-pickers";
import type { DateValidationError } from "@mui/x-date-pickers/models";

export interface DateRangeFieldProps extends DateRules {
  value: DateRange;
  onChange?: (value: DateRange) => void;
  format: string;
  label: string;
  hideLabel?: boolean;
  startLabel: string;
  endLabel: string;
  open?: boolean;
  onOpen?: () => void;
  /** Renders no open button when empty. */
  openPickerLabel?: string;
}

function OpenPickerButton({
  open = false,
  onOpen,
  label,
}: Pick<DateRangeFieldProps, "open" | "onOpen"> & { label?: string }) {
  if (!label || !onOpen) {
    return null;
  }
  return (
    <InputAdornment position="end">
      <IconButton
        aria-label={label}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={onOpen}>
        <CalendarMonthOutlinedIcon />
      </IconButton>
    </InputAdornment>
  );
}

export function SingleInputDateRangeField({
  value,
  format,
  label,
  hideLabel = false,
  open,
  onOpen,
  openPickerLabel,
}: DateRangeFieldProps) {
  const adapter = usePickerAdapter();
  const id = React.useId();
  const dateFormat = adapter.expandFormat(format);
  const placeholder = `${dateFormat} — ${dateFormat}`;

  return (
    <DateRangePickerFieldItem>
      {hideLabel ? (
        <DateRangePickerHiddenLabel htmlFor={id}>
          {label}
        </DateRangePickerHiddenLabel>
      ) : (
        <DateRangePickerLabel htmlFor={id}>{label}</DateRangePickerLabel>
      )}
      <DateRangePickerInput
        id={id}
        inputProps={{ readOnly: true, size: placeholder.length }}
        value={formatRange(adapter, value, format)}
        placeholder={placeholder}
        onClick={onOpen}
        onKeyDown={event => {
          if (onOpen && (event.key === "Enter" || event.key === " ")) {
            event.preventDefault();
            onOpen();
          }
        }}
        endAdornment={
          <OpenPickerButton
            open={open}
            onOpen={onOpen}
            label={openPickerLabel}
          />
        }
      />
    </DateRangePickerFieldItem>
  );
}

export function MultiInputDateRangeField({
  value,
  onChange,
  format,
  label,
  startLabel,
  endLabel,
  open,
  onOpen,
  openPickerLabel,
  disableFuture,
  disablePast,
  minDate,
  maxDate,
  shouldDisableDate,
}: DateRangeFieldProps) {
  const adapter = usePickerAdapter();
  const id = React.useId();
  const [start, end] = value;

  const handleChange =
    (index: 0 | 1) =>
    (
      date: PickerValidDate | null,
      context: { validationError: DateValidationError }
    ) => {
      if (!onChange || context.validationError) {
        return;
      }
      const day = date ? adapter.startOfDay(date) : null;
      onChange(index === 0 ? [day, end] : [start, day]);
    };

  const fields = [
    { index: 0 as const, label: startLabel, date: start },
    { index: 1 as const, label: endLabel, date: end },
  ];

  return (
    <DateRangePickerField role="group" aria-labelledby={`${id}-group`}>
      <DateRangePickerHiddenLabel as="span" id={`${id}-group`}>
        {label}
      </DateRangePickerHiddenLabel>
      {fields.map(field => (
        <DateRangePickerFieldItem key={field.index}>
          <DateRangePickerLabel htmlFor={`${id}-${field.index}`}>
            {field.label}
          </DateRangePickerLabel>
          <DateRangePickerDateField
            id={`${id}-${field.index}`}
            enableAccessibleFieldDOMStructure={false}
            value={field.date}
            onChange={handleChange(field.index)}
            format={format}
            disableFuture={disableFuture}
            disablePast={disablePast}
            shouldDisableDate={shouldDisableDate}
            minDate={field.index === 1 && start ? start : minDate}
            maxDate={field.index === 0 && end ? end : maxDate}
            InputProps={{
              endAdornment: (
                <OpenPickerButton
                  open={open}
                  onOpen={onOpen}
                  label={openPickerLabel}
                />
              ),
            }}
          />
        </DateRangePickerFieldItem>
      ))}
    </DateRangePickerField>
  );
}
