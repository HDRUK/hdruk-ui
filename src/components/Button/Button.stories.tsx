import { Stack, ThemeProvider, useTheme } from "@mui/material";
import { Icon } from "../Icon";
import { Button } from "./Button";
import type { Meta, StoryObj } from "@storybook/react-vite";

/**
 * Buttons are described by **purpose**, not by MUI `variant`/`color`. Each app
 * theme decides what a purpose looks like via
 * `components.HdrukButton.defaultProps.purposeMap` — switch the theme in the
 * toolbar to see the same purposes render differently.
 */
const meta: Meta<typeof Button> = {
  component: Button,
  title: "Components/Button",
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Continue",
  },
};

export const Purposes: Story = {
  render: () => (
    <Stack direction="row" gap={2} flexWrap="wrap">
      <Button purpose="primary">Primary</Button>
      <Button purpose="secondary">Secondary</Button>
      <Button purpose="tertiary">Tertiary</Button>
      <Button purpose="destructive">Destructive</Button>
      <Button purpose="link">Link</Button>
    </Stack>
  ),
};

export const Links: Story = {
  render: () => (
    <Stack gap={2} alignItems="flex-start">
      <Stack direction="row" gap={3} alignItems="baseline">
        <Button purpose="link">Medium</Button>
        <Button purpose="link" size="small">
          Small
        </Button>
        <Button purpose="link" disabled>
          Disabled
        </Button>
      </Stack>
      <Button purpose="link" href="#">
        Rendered as an anchor
      </Button>
    </Stack>
  ),
};

export const Loading: Story = {
  render: () => (
    <Stack direction="row" gap={2} flexWrap="wrap">
      <Button loading>Saving</Button>
      <Button purpose="secondary" loading>
        Saving
      </Button>
    </Stack>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Stack direction="row" gap={2} flexWrap="wrap">
      <Button startIcon={<Icon name="add" />}>Add dataset</Button>
      <Button purpose="secondary" endIcon={<Icon name="arrow_forward" />}>
        Next
      </Button>
      <Button purpose="destructive" startIcon={<Icon name="delete" />}>
        Delete
      </Button>
    </Stack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Stack gap={2}>
      <Stack direction="row" gap={2} alignItems="center" flexWrap="wrap">
        <Button size="small">Small</Button>
        <Button size="small" purpose="secondary">
          Small
        </Button>
        <Button size="small" purpose="tertiary">
          Small
        </Button>
      </Stack>
      <Stack direction="row" gap={2} alignItems="center" flexWrap="wrap">
        <Button size="medium">Medium</Button>
        <Button size="medium" purpose="secondary">
          Medium
        </Button>
        <Button size="medium" purpose="tertiary">
          Medium
        </Button>
      </Stack>
    </Stack>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Stack direction="row" gap={2} flexWrap="wrap">
      <Button disabled>Primary</Button>
      <Button purpose="secondary" disabled>
        Secondary
      </Button>
      <Button purpose="tertiary" disabled>
        Tertiary
      </Button>
    </Stack>
  ),
};

/**
 * An app remaps purposes through its own theme — no call-site changes. Here the
 * active theme is extended with a `purposeMap` that makes `secondary` a filled
 * secondary button and `tertiary` an outlined one.
 */
const ThemeOverrideExample = () => {
  const theme = useTheme();

  return (
    <Stack gap={3}>
      <Stack direction="row" gap={2} flexWrap="wrap">
        <Button purpose="secondary">Theme default</Button>
        <Button purpose="tertiary">Theme default</Button>
      </Stack>
      <ThemeProvider
        theme={{
          ...theme,
          components: {
            ...theme.components,
            HdrukButton: {
              defaultProps: {
                purposeMap: {
                  secondary: { variant: "contained", color: "secondary" },
                  tertiary: { variant: "outlined", color: "secondary" },
                },
              },
            },
          },
        }}>
        <Stack direction="row" gap={2} flexWrap="wrap">
          <Button purpose="secondary">Remapped</Button>
          <Button purpose="tertiary">Remapped</Button>
        </Stack>
      </ThemeProvider>
    </Stack>
  );
};

export const ThemeOverride: Story = {
  render: () => <ThemeOverrideExample />,
};
