import { Icon } from "../Icon";
import { MenuItem } from "./MenuItem";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof MenuItem> = {
  component: MenuItem,
  title: "Components/MenuItem",
  tags: ["autodocs"],
  args: {
    children: "Library",
  },
};

export default meta;

type Story = StoryObj<typeof MenuItem>;

export const Default: Story = {};

export const WithIcon: Story = {
  args: { icon: <Icon name="bookmark" /> },
};

export const Selected: Story = {
  args: {
    icon: <Icon name="bookmark" />,
    selected: true,
  },
};

export const Disabled: Story = {
  args: {
    icon: <Icon name="bookmark" />,
    disabled: true,
  },
};

export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
    selected: true,
    sx: { width: theme => theme.spacing(24) },
  },
};

export const Centered: Story = {
  args: {
    orientation: "centered",
    selected: true,
    sx: { width: theme => theme.spacing(24) },
  },
};
