import Footer from "./Footer";
import type { FooterLinkGroup } from "./Footer.types";
import type { Meta, StoryObj } from "@storybook/react-vite";

/**
 * Site footer: logo, social links, optional link-group columns and copyright.
 * The background defaults to a gradient between the theme's primary and
 * secondary colours — switch the theme in the toolbar to see it change.
 */
const meta: Meta<typeof Footer> = {
  component: Footer,
  title: "Layout/Footer",
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Footer>;

const linkGroups: FooterLinkGroup[] = [
  {
    title: "Explore",
    items: [
      { label: "Datasets", href: "/search?type=datasets" },
      { label: "Data uses", href: "/search?type=dataUses" },
      { label: "Publications", href: "/search?type=publications" },
    ],
  },
  {
    title: "Support",
    items: [
      { label: "Help centre", href: "/support" },
      { label: "Contact us", href: "/contact" },
      { label: "Community", href: "/community" },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Terms and conditions", href: "/terms" },
      { label: "Privacy policy", href: "/privacy" },
      { label: "Cookie policy", href: "/cookies" },
    ],
  },
];

export const Default: Story = {};

export const WithLinkGroups: Story = {
  args: {
    linkGroups,
  },
};

export const WithoutSocialLinks: Story = {
  args: {
    linkGroups,
    socialLinks: [],
  },
};

export const CustomBackground: Story = {
  args: {
    linkGroups,
    footerBackgroundColor: "#29235c",
    copyrightText: "©HDR UK 2026. All rights reserved.",
  },
};
