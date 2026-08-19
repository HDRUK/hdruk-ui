import { Box } from "@mui/material";
import { fn } from "storybook/test";
import Header from "./Header";
import type { AccountNavigation, HeaderMenuLinkItem } from "./Header.types";
import type { Meta, StoryObj } from "@storybook/react-vite";

/**
 * Site header: logo(s), primary navigation (with optional dropdowns) and
 * account actions. Framework-agnostic — pass `next/link` (or any router link)
 * via `linkComponent`. Resize the preview to see the desktop, tablet and mobile
 * layouts.
 */
const meta: Meta<typeof Header> = {
  component: Header,
  title: "Layout/Header",
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {
    accountLoading: false,
  },
};

export default meta;

type Story = StoryObj<typeof Header>;

const navItems: HeaderMenuLinkItem[] = [
  { label: "Datasets", href: "/search?type=datasets" },
  { label: "Data uses", href: "/search?type=dataUses" },
  {
    label: "Resources",
    subItems: [
      { label: "Publications", href: "/search?type=publications" },
      { label: "Tools", href: "/search?type=tools" },
      { label: "Collections", href: "/search?type=collections" },
    ],
  },
  { label: "About", href: "/about" },
];

const accountNavigation: AccountNavigation = {
  profile: { label: "My profile", href: "/account/profile" },
  items: [
    { label: "My datasets", href: "/account/datasets" },
    { label: "Settings", href: "/account/settings" },
  ],
  logout: { label: "Sign out", action: fn() },
  signIn: { label: "Sign in", href: "/login" },
};

export const LoggedOut: Story = {
  args: {
    navItems,
    isLoggedIn: false,
    accountNavigation,
  },
};

export const LoggedIn: Story = {
  args: {
    navItems,
    isLoggedIn: true,
    accountNavigation,
    accountName: { first: "Jane", last: "Doe" },
  },
};

export const AccountLoading: Story = {
  args: {
    navItems,
    accountLoading: true,
    accountNavigation,
  },
};

export const WithoutNavigation: Story = {
  args: {
    isLoggedIn: false,
    accountNavigation,
  },
};

const BrandingLogo = () => (
  <Box
    sx={{
      px: 1.5,
      py: 0.5,
      borderRadius: 1,
      bgcolor: "common.white",
      color: "info.main",
      fontWeight: 700,
      fontSize: "0.875rem",
      whiteSpace: "nowrap",
    }}>
    Partner
  </Box>
);

export const WithBrandingLogo: Story = {
  args: {
    navItems,
    isLoggedIn: true,
    accountNavigation,
    accountName: { first: "Jane", last: "Doe" },
    brandingLogoImage: <BrandingLogo />,
    brandingLogoHref: "https://www.hdruk.ac.uk",
  },
};

/**
 * `appBarColour`, `focusRingColour` and `accountInitialsColour` let a site tune
 * the header without overriding styles — tab through the header to see the
 * focus ring.
 */
export const CustomColours: Story = {
  args: {
    navItems,
    isLoggedIn: true,
    accountNavigation,
    accountName: { first: "Jane", last: "Doe" },
    appBarColour: "secondary",
    focusRingColour: "#f98e2b",
    accountInitialsColour: "#29235c",
  },
};
