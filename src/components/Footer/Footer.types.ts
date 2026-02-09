import { SxProps, Theme } from "@mui/material";
import { MenuLinkItem } from "../../types/navigation";

export interface SocialLinkItem extends MenuLinkItem {
  /**
   * Optional icon or logo rendered alongside the label.
   */
  icon?: React.ReactNode;
}

export interface FooterLinkGroup {
  title?: string;
  items: MenuLinkItem[];
}

export interface FooterProps {
  /**
   * Footer background colour.
   *
   * - If omitted, defaults to a branded gradient / theme colour.
   * - Accepts any valid CSS colour value.
   *
   * @example
   * footerBackgroundColor="#003a8f"
   * footerBackgroundColor="linear-gradient(...)"
   */
  footerBackgroundColor?: string;

  /**
   * Social media or external links (e.g. Twitter, GitHub).
   */
  socialLinks?: SocialLinkItem[];

  /**
   * Footer navigation link groups rendered as columns.
   */
  linkGroups?: FooterLinkGroup[];

  /**
   * Copyright or legal text shown at the bottom of the footer.
   */
  copyrightText?: string;

  /**
   * Primary logo element rendered on the left of the header.
   * Usually an <img />, SVG, or branded React component.
   */
  logoImage: React.ReactNode;

  /**
   * Optional link component override.
   *
   * Useful for routing libraries such as Next.js or React Router.
   * Example: NextLink, RouterLink.
   */
  linkComponent?: React.ElementType;

  /**
   * Optional style overrides for the footer root element.
   * Applied on top of the default styles.
   */
  sx?: SxProps<Theme>;
}
