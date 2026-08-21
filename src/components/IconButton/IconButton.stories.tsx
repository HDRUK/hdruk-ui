import { Stack } from "@mui/material";
import { Icon } from "../Icon";
import { IconButton } from "./IconButton";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof IconButton> = {
  component: IconButton,
  title: "Components/IconButton",
  tags: ["autodocs"],
  args: { "aria-label": "Save to library" },
};

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  render: (args) => (
    <IconButton {...args}>
      <Icon name="bookmark" />
    </IconButton>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <Stack direction="row" gap={2} alignItems="center">
      <IconButton {...args} size="small">
        <Icon name="bookmark" />
      </IconButton>
      <IconButton {...args} size="medium">
        <Icon name="bookmark" />
      </IconButton>
    </Stack>
  ),
};

export const States: Story = {
  render: (args) => (
    <Stack gap={2}>
      <Stack direction="row" gap={2} alignItems="center">
        <IconButton {...args}>
          <Icon name="bookmark" />
        </IconButton>
        <IconButton {...args} className="Mui-focusVisible">
          <Icon name="bookmark" />
        </IconButton>
        <IconButton {...args} disabled>
          <Icon name="bookmark" />
        </IconButton>
      </Stack>
      <Stack direction="row" gap={2} alignItems="center">
        <IconButton {...args} size="small">
          <Icon name="bookmark" />
        </IconButton>
        <IconButton {...args} size="small" className="Mui-focusVisible">
          <Icon name="bookmark" />
        </IconButton>
        <IconButton {...args} size="small" disabled>
          <Icon name="bookmark" />
        </IconButton>
      </Stack>
    </Stack>
  ),
};
