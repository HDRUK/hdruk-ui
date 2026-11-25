import { Icon } from "../Icon";
import { MenuDropdown } from "../MenuDropdown";
import { MenuItem } from "../MenuItem";
import { LeftNav } from "./LeftNav";
import type { Meta, StoryObj } from "@storybook/react-vite";

const links: [string, string][] = [
  ["Dashboard", "space_dashboard"],
  ["Team Members", "groups"],
  ["Library", "bookmark"],
  ["Saved searches", "saved_search"],
];

const sections: [string, string, string[]][] = [
  [
    "Integrations",
    "cloud_upload",
    ["Custom Integrations", "Predefined Integrations", "Widgets"],
  ],
  [
    "Data Access Requests",
    "conversion_path",
    ["Manage templates", "Applications", "Question Bank"],
  ],
];

const meta: Meta<typeof LeftNav> = {
  component: LeftNav,
  title: "Components/LeftNav",
  tags: ["autodocs"],
  args: {
    heading: "Your profile",
  },
  render: args => (
    <LeftNav {...args}>
      {links.map(([label, icon], index) => (
        <MenuItem
          key={label}
          component="a"
          href="#"
          icon={<Icon name={icon} />}
          selected={index === 0}
          aria-current={index === 0 ? "page" : undefined}>
          {label}
        </MenuItem>
      ))}
      {sections.map(([label, icon, items]) => (
        <MenuDropdown
          key={label}
          label={label}
          icon={<Icon name={icon} />}
          defaultExpanded>
          {items.map(item => (
            <MenuItem key={item} component="a" href="#">
              {item}
            </MenuItem>
          ))}
        </MenuDropdown>
      ))}
      <MenuItem component="a" href="#" icon={<Icon name="help" />}>
        Help
      </MenuItem>
    </LeftNav>
  ),
};

export default meta;

type Story = StoryObj<typeof LeftNav>;

export const Expanded: Story = {};

export const Collapsed: Story = {
  args: { defaultExpanded: false },
};

export const Mobile: Story = {
  globals: { viewport: { value: "mobile1", isRotated: false } },
};
