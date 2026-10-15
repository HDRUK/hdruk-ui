import Paper from "@mui/material/Paper";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import { DateRangeCalendar } from "./DateRangeCalendar";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof DateRangeCalendar> = {
  component: DateRangeCalendar,
  title: "Components/DateRangeCalendar",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Needs `@mui/x-date-pickers` (^8.6) and a date library such as `dayjs` installed, and a MUI X `LocalizationProvider` around it.",
      },
    },
  },
  decorators: [
    Story => (
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
        <Paper sx={{ display: "inline-block", p: 3 }}>
          <Story />
        </Paper>
      </LocalizationProvider>
    ),
  ],
  args: {
    defaultValue: [dayjs("2023-12-14"), dayjs("2024-01-14")],
  },
};

export default meta;

type Story = StoryObj<typeof DateRangeCalendar>;

export const Default: Story = {};

export const SingleMonth: Story = {
  args: {
    calendars: 1,
    defaultValue: [dayjs("2023-12-14"), dayjs("2023-12-21")],
  },
};

export const DisableFuture: Story = {
  args: {
    defaultValue: [dayjs().subtract(1, "month"), dayjs()],
    disableFuture: true,
  },
};

export const SingleDate: Story = {
  render: () => (
    <DateCalendar
      defaultValue={dayjs("2023-10-08")}
      views={["month", "day"]}
      showDaysOutsideCurrentMonth
    />
  ),
};
