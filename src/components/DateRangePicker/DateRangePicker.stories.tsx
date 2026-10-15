import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import { MultiInputDateRangeField } from "./DateRangeFields";
import { DateRangePicker } from "./DateRangePicker";
import type { DateRange } from "../DateRangeCalendar";
import type { Meta, StoryObj } from "@storybook/react-vite";

const today = dayjs();
const back =
  (amount: number, unit: "day" | "week" | "month" | "year") =>
  (): DateRange => [today.subtract(amount, unit), today];

const meta: Meta<typeof DateRangePicker> = {
  component: DateRangePicker,
  title: "Components/DateRangePicker",
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
        <Story />
      </LocalizationProvider>
    ),
  ],
  args: {
    defaultValue: [dayjs("2023-12-14"), dayjs("2024-01-14")],
  },
};

export default meta;

type Story = StoryObj<typeof DateRangePicker>;

export const Default: Story = {};

export const SplitFields: Story = {
  args: { slots: { field: MultiInputDateRangeField } },
};

export const WithShortcuts: Story = {
  args: {
    defaultValue: back(1, "year")(),
    disableFuture: true,
    shortcuts: [
      { label: "Today", getValue: back(0, "day") },
      { label: "Last week", getValue: back(1, "week") },
      { label: "Last month", getValue: back(1, "month") },
      { label: "Last year", getValue: back(1, "year") },
    ],
  },
};
