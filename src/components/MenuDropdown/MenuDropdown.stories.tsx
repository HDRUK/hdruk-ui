import { Icon } from "../Icon";
import { MenuItem } from "../MenuItem";
import { MenuDropdown } from "./MenuDropdown";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof MenuDropdown> = {
  component: MenuDropdown,
  title: "Components/MenuDropdown",
  tags: ["autodocs"],
  args: {
    label: "Data Access Requests",
    icon: <Icon name="conversion_path" />,
  },
  render: args => (
    <MenuDropdown {...args}>
      <MenuItem component="a" href="#">
        Manage templates
      </MenuItem>
      <MenuItem component="a" href="#">
        Applications
      </MenuItem>
      <MenuItem component="a" href="#">
        My data access requests
      </MenuItem>
      <MenuItem component="a" href="#">
        Question Bank
      </MenuItem>
    </MenuDropdown>
  ),
};

export default meta;

type Story = StoryObj<typeof MenuDropdown>;

export const Default: Story = {};

export const Expanded: Story = {
  args: { defaultExpanded: true },
};

export const WithSelectedItem: Story = {
  args: { defaultExpanded: true },
  render: args => (
    <MenuDropdown {...args}>
      <MenuItem component="a" href="#">
        Manage templates
      </MenuItem>
      <MenuItem component="a" href="#" selected aria-current="page">
        Applications
      </MenuItem>
      <MenuItem component="a" href="#">
        Question Bank
      </MenuItem>
    </MenuDropdown>
  ),
};
