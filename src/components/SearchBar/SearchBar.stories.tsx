import * as React from "react";
import { Chip, Stack, Typography } from "@mui/material";
import { fn } from "storybook/test";
import { Button } from "../Button";
import { SearchBar } from "./SearchBar";
import type { Meta, StoryObj } from "@storybook/react-vite";

/**
 * Debounced search input. Works uncontrolled (`defaultValue`) or controlled
 * (`value` + `onChange`); `onSearch` fires on the debounced value, on Enter and
 * on clear. `Cmd/Ctrl+K` focuses the input while `shortcut` is enabled.
 */
const meta: Meta<typeof SearchBar> = {
  component: SearchBar,
  title: "Components/SearchBar",
  tags: ["autodocs"],
  args: {
    onChange: fn(),
    onSearch: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
  args: {
    placeholder: "Search datasets…",
  },
};

const ControlledExample = () => {
  const [value, setValue] = React.useState("cohort");

  return (
    <Stack gap={1}>
      <SearchBar value={value} onChange={setValue} />
      <Typography variant="caption">Value: {value || "(empty)"}</Typography>
    </Stack>
  );
};

export const Controlled: Story = {
  render: () => <ControlledExample />,
};

export const Loading: Story = {
  args: {
    defaultValue: "diabetes",
    loading: true,
  },
};

export const Small: Story = {
  args: {
    size: "small",
    defaultValue: "asthma",
  },
};

export const DisableClear: Story = {
  args: {
    defaultValue: "no clear button",
    disableClear: true,
  },
};

export const WithActionsAndFilters: Story = {
  args: {
    defaultValue: "heart",
    actions: <Button>Search</Button>,
    filters: (
      <>
        <Chip label="Datasets" onDelete={fn()} />
        <Chip label="Publications" onDelete={fn()} />
        <Chip label="Tools" onDelete={fn()} />
      </>
    ),
  },
};

export const Elevated: Story = {
  args: {
    elevation: 3,
    placeholder: "Search datasets…",
  },
};
