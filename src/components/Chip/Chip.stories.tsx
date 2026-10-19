import { Stack } from "@mui/material";
import { Icon } from "../Icon";
import { Chip } from "./Chip";
import type { ChipProps } from "./Chip";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Chip> = {
  component: Chip,
  title: "Components/Chip",
  tags: ["autodocs"],
  args: { label: "Label" },
};

export default meta;

type Story = StoryObj<typeof Chip>;

const COLORS: NonNullable<ChipProps["color"]>[] = [
  "default",
  "primary",
  "success",
  "warning",
  "error",
  "needsAction",
  "archived",
];

export const Default: Story = {};

export const Types: Story = {
  render: args => (
    <Stack spacing={2}>
      {COLORS.map(color => (
        <Stack key={color} direction="row" spacing={2}>
          <Chip {...args} color={color} />
          <Chip {...args} color={color} variant="outlined" />
          <Chip {...args} color={color} onClick={() => {}} />
          <Chip {...args} color={color} variant="outlined" onClick={() => {}} />
        </Stack>
      ))}
    </Stack>
  ),
};

export const Icons: Story = {
  render: args => (
    <Stack spacing={2}>
      {COLORS.map(color => (
        <Stack key={color} direction="row" spacing={2}>
          <Chip {...args} color={color} icon={<Icon name="check_circle" />} />
          <Chip
            {...args}
            color={color}
            variant="outlined"
            icon={<Icon name="check_circle" />}
          />
          <Chip
            {...args}
            color={color}
            icon={<Icon name="expand_more" />}
            iconPosition="end"
            onClick={() => {}}
          />
          <Chip
            {...args}
            color={color}
            variant="outlined"
            icon={<Icon name="expand_more" />}
            iconPosition="end"
            onClick={() => {}}
          />
        </Stack>
      ))}
    </Stack>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
};
