import type { AppBarProps } from "@mui/material/AppBar";
import { MenuLinkItem } from "../../types/navigation";

export interface AccountName {
  /**
   * User’s first name.
   */
  first: string;

  /**
   * User’s last name.
   */
  last: string;
}

export interface HeaderMenuLinkItem extends MenuLinkItem {
  /**
   * Nested items rendered in a dropdown menu.
   * Presence of this property indicates a submenu trigger.
   */
  subItems?: { label: string; href: string }[];

  /**
   * Click handler for action-based items (e.g. logout).
   * Ignored if `href` is provided.
   */
  action?: React.MouseEventHandler<HTMLElement>;
}

export interface AccountNavigation {
  /**
   * Profile link shown when the user is signed in.
   * Typically links to "My profile".
   */
  profile?: MenuLinkItem;

  /**
   * Additional account-related items shown in the account menu.
   * For example: Settings, Billing.
   */
  items?: HeaderMenuLinkItem[];

  /**
   * Logout action or link.
   * Usually implemented with an `action`.
   */
  logout?: MenuLinkItem;

  /**
   * Sign-in action or link shown when the user is logged out.
   */
  signIn?: MenuLinkItem;
}

export interface HeaderProps {
  /**
   * Primary logo element rendered on the left of the header.
   * Usually an <img />, SVG, or branded React component.
   */
  logoImage: React.ReactNode;

  /**
   * URL the primary logo links to.
   * Defaults to "/".
   */
  logoHref?: string;

  /**
   * Secondary branding logo rendered to the right of the primary logo.
   * Often used for partner or programme branding.
   */
  brandingLogoImage?: React.ReactNode;

  /**
   * URL the secondary branding logo links to.
   * If omitted, the logo is rendered without a link.
   */
  brandingLogoHref?: string;

  /**
   * Focus ring colour for interactive elements within the header.
   *
   * Applied to links, buttons, and menu triggers when focused via keyboard.
   * Defaults to a high-contrast colour (typically white).
   */
  focusRingColour?: string;

  /**
   * Background colour used for the account initials badge.
   *
   * Useful when the header background or brand colours differ per site
   * and a higher-contrast initials badge is required.
   */
  accountInitialsColour?: string;

  /**
   * Primary navigation items rendered in the header.
   *
   * @example
   * navItems={[
   *   { label: "Home", href: "/" },
   *   { label: "Resources", subItems: [...] }
   * ]}
   */
  navItems?: HeaderMenuLinkItem[];

  /**
   * Whether account-related data is currently loading.
   *
   * When true, a skeleton placeholder is shown instead of account actions.
   */
  accountLoading: boolean;

  /**
   * Whether the user is currently authenticated.
   *
   * Controls which account actions are shown (profile vs sign-in).
   */
  isLoggedIn?: boolean;

  /**
   * Account-related navigation configuration.
   *
   * Used to render profile, settings, sign-in, and logout actions.
   */
  accountNavigation?: AccountNavigation;

  /**
   * Optional link component override.
   *
   * Useful for routing libraries such as Next.js or React Router.
   * Example: NextLink, RouterLink.
   */
  linkComponent?: React.ElementType;

  /**
   * Authenticated user’s display name.
   *
   * Used for rendering account labels or initials.
   */
  accountName?: AccountName;

  /**
   * Accessible label for the header navigation region.
   *
   * Defaults to a sensible value if not provided.
   */
  ariaLabel?: string;

  /**
   * MUI AppBar colour prop.
   *
   * Allows consumers to control the header colour via the theme palette.
   */
  appBarColour?: AppBarProps["color"];
}
