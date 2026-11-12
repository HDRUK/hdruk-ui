import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof TextField> = {
  component: TextField,
  title: "Components/Input",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "MUI `TextField`, styled by the theme alone. The label sits above the field.",
      },
    },
  },
  args: {
    label: "Label",
  },
};

export default meta;

type Story = StoryObj<typeof TextField>;

export const Default: Story = {};

export const WithPlaceholder: Story = {
  args: { placeholder: "Placeholder" },
};

export const Required: Story = {
  args: { required: true },
};

export const WithHelperText: Story = {
  args: { helperText: "Helper text" },
};

export const WithError: Story = {
  args: { error: true, defaultValue: "Value", helperText: "Error message" },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const TextArea: Story = {
  args: { multiline: true, minRows: 3 },
};

export const Select: Story = {
  args: { select: true, defaultValue: "one" },
  render: args => (
    <TextField {...args}>
      <MenuItem value="one">Option one</MenuItem>
      <MenuItem value="two">Option two</MenuItem>
    </TextField>
  ),
};
