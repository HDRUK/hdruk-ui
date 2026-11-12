import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof DatePicker> = {
  component: DatePicker,
  title: "Components/DatePicker",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "MUI X `DatePicker`, styled by the theme alone. Needs `@mui/x-date-pickers` (^8.6) and a date library such as `dayjs` installed, and a MUI X `LocalizationProvider` around it.",
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
    label: "Select date",
    defaultValue: dayjs("2023-10-08"),
    views: ["year", "month", "day"],
  },
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {};

export const MonthView: Story = {
  args: { openTo: "month" },
};

export const YearView: Story = {
  args: { openTo: "year" },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const WithError: Story = {
  args: {
    maxDate: dayjs("2023-09-30"),
    slotProps: { textField: { helperText: "Choose a date before October" } },
  },
};

export const Mobile: Story = {
  render: args => <MobileDatePicker {...args} />,
};
