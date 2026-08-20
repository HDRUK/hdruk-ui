import { Stack, Typography, useTheme } from "@mui/material";
import type { TypographyProps } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta = {
  title: "Foundations/Typography",
  tags: ["autodocs"],
};

export default meta;

type Row = { variant: TypographyProps["variant"]; token: string };

const HEADINGS: Row[] = [
  { variant: "h1", token: "Type/H1" },
  { variant: "h2", token: "Type/H2" },
  { variant: "h3", token: "Type/H3" },
  { variant: "h4", token: "Type/H4" },
  { variant: "h5", token: "Type/H5" },
  { variant: "h6", token: "Type/H6" },
];

const BODY: Row[] = [
  { variant: "body1", token: "Body/Large" },
  { variant: "body2", token: "Body/Medium" },
  { variant: "bodySmall", token: "Body/Small" },
  { variant: "caption", token: "Body/X-Small" },
  { variant: "bodyXxSmall", token: "Body/X-X-Small" },
];

const SUPPORTING: Row[] = [
  { variant: "subtitle1", token: "—" },
  { variant: "subtitle2", token: "—" },
  { variant: "button", token: "—" },
  { variant: "overline", token: "—" },
];

const Scale = ({ rows }: { rows: Row[] }) => {
  const theme = useTheme();

  return (
    <Stack gap={3}>
      {rows.map(({ variant, token }) => {
        const style = theme.typography[variant as "body1"];
        const rem = String(style.fontSize ?? "inherit");
        const px = rem.endsWith("rem")
          ? `${parseFloat(rem) * 16}px`
          : "inherited";

        return (
          <Stack key={variant} gap={0.5}>
            <Typography variant="caption" color="text.secondary">
              {variant} · {token} · {rem} · {px} ·{" "}
              {style.lineHeight
                ? `line-height ${style.lineHeight}`
                : "no line-height"}
            </Typography>
            <Typography variant={variant}>
              Health Data Research Gateway
            </Typography>
          </Stack>
        );
      })}
    </Stack>
  );
};

type Story = StoryObj;

export const BodyScale: Story = {
  render: () => <Scale rows={BODY} />,
};

export const Headings: Story = {
  render: () => <Scale rows={HEADINGS} />,
};

export const Supporting: Story = {
  render: () => <Scale rows={SUPPORTING} />,
};

export const CustomVariantsRenderAsSpan: Story = {
  render: () => (
    <Stack gap={2}>
      <Typography variant="bodySmall">
        bodySmall — a span, inline by default
      </Typography>
      <Typography variant="bodySmall" component="p">
        bodySmall with component=&quot;p&quot; — a block
      </Typography>
    </Stack>
  ),
};
