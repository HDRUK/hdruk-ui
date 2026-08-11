import { Box, Stack, Typography } from "@mui/material";
import { Icon } from "./Icon";
import type { Meta, StoryObj } from "@storybook/react-vite";

/**
 * Thin wrapper around MUI `Icon` pinned to the **Material Symbols Outlined**
 * font, so `name` is any symbol name from
 * [fonts.google.com/icons](https://fonts.google.com/icons). The font is loaded
 * by `HdrukUiProvider` — if you see the literal name as text instead of a
 * glyph, the provider is missing.
 */
const meta: Meta<typeof Icon> = {
  component: Icon,
  title: "Components/Icon",
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    name: "search",
  },
};

export const Sizes: Story = {
  render: () => (
    <Stack direction="row" gap={2} alignItems="center">
      <Icon name="search" fontSize="small" />
      <Icon name="search" fontSize="medium" />
      <Icon name="search" fontSize="large" />
    </Stack>
  ),
};

export const Colours: Story = {
  render: () => (
    <Stack direction="row" gap={2} alignItems="center">
      <Icon name="favorite" color="primary" />
      <Icon name="favorite" color="secondary" />
      <Icon name="favorite" color="error" />
      <Icon name="favorite" color="action" />
      <Icon name="favorite" color="disabled" />
    </Stack>
  ),
};

const COMMON_ICONS = [
  "search",
  "add",
  "close",
  "cancel",
  "menu",
  "expand_more",
  "arrow_forward",
  "download",
  "filter_list",
  "info",
  "delete",
  "account_circle",
];

export const CommonIcons: Story = {
  render: () => (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
        gap: 2,
      }}>
      {COMMON_ICONS.map(name => (
        <Stack key={name} alignItems="center" gap={0.5}>
          <Icon name={name} />
          <Typography variant="caption">{name}</Typography>
        </Stack>
      ))}
    </Box>
  ),
};
