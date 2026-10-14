import { Box, Typography } from "@mui/material";
import { Banner } from "./Banner";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Banner> = {
  component: Banner,
  title: "Components/Banner",
  tags: ["autodocs"],
  args: {
    tag: "Beta!",
    children:
      "This dashboard will be periodically improved based on usage and user feedback.",
    action: { label: "Share feedback" },
  },
};

export default meta;

type Story = StoryObj<typeof Banner>;

export const Default: Story = {};

export const WithTitle: Story = {
  args: {
    title: "Custodian Dashboard",
    children:
      "See how users engage with your content, with more insights and functionality coming over time.",
    closable: true,
    suppressible: true,
  },
};

export const MessageOnly: Story = {
  args: {
    tag: undefined,
    action: undefined,
  },
};

export const Disabled: Story = {
  args: {
    title: "Custodian Dashboard",
    action: { label: "Share feedback", disabled: true },
    closable: true,
    suppressible: true,
    slotProps: {
      checkbox: { disabled: true },
      closeButton: { disabled: true },
    },
  },
};

export const InPage: Story = {
  args: {
    tag: "New!",
    title: "Announcement",
    children: "More about this announcement…",
    action: { label: "Action Button" },
    closable: true,
    suppressible: true,
  },
  render: args => (
    <Box sx={{ bgcolor: "background.default", p: 3 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Page title
      </Typography>
      <Banner {...args} />
      <Typography sx={{ mt: 2 }}>Page content continues below.</Typography>
    </Box>
  ),
};
