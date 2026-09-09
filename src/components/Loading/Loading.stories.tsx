import { Chip, Paper, Stack, Table, TableBody, TableCell } from "@mui/material";
import { TableRow, Typography } from "@mui/material";
import { Loading } from "./Loading";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Loading> = {
  component: Loading,
  title: "Components/Loading",
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Loading>;

export const Default: Story = {};

export const Sizes: Story = {
  render: args => (
    <Stack direction="row" gap={2} alignItems="center">
      <Loading {...args} size="small" />
      <Loading {...args} size="medium" />
      <Loading {...args} size="large" />
    </Stack>
  ),
};

export const Colors: Story = {
  render: args => (
    <Stack direction="row" gap={2} alignItems="center">
      <Loading {...args} color="primary" />
      <Loading {...args} color="secondary" />
      <Loading {...args} color="inherit" />
    </Stack>
  ),
};

export const HoldingSpace: Story = {
  render: args => (
    <Stack direction="row" gap={2} alignItems="stretch">
      <Paper variant="outlined" sx={{ flex: 1, p: 2 }}>
        <Typography variant="body2" gutterBottom>
          Without a reserved height
        </Typography>
        <Loading {...args} />
      </Paper>
      <Paper variant="outlined" sx={{ flex: 1, p: 2 }}>
        <Typography variant="body2" gutterBottom>
          With a reserved height
        </Typography>
        <Loading {...args} sx={{ minHeight: 240 }} />
      </Paper>
    </Stack>
  ),
};

export const Inline: Story = {
  render: args => (
    <Stack gap={3} alignItems="flex-start">
      <Table size="small" sx={{ width: 320 }}>
        <TableBody>
          <TableRow>
            <TableCell>Datasets scanned</TableCell>
            <TableCell align="right">1,204</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Records matched</TableCell>
            <TableCell align="right">
              <Loading {...args} inline size="small" label="" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Chip
        label="Add to collection"
        icon={<Loading {...args} inline size="small" label="" />}
      />
      <Typography variant="body2">
        Checking the file <Loading {...args} inline size="small" label="" />
      </Typography>
    </Stack>
  ),
};
