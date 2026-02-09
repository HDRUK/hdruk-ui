export interface MenuLinkItem {
  /**
   * Visible label for the menu item.
   */
  label: React.ReactNode;

  /**
   * Destination URL.
   * If provided, the item renders as a link.
   */
  href?: string;

  /**
   * Click handler for action-based items (e.g. logout).
   * Ignored if `href` is provided.
   */
  action?: React.MouseEventHandler<HTMLElement>;

  /**
   * Nested items rendered in a dropdown menu.
   * Presence of this property indicates a submenu trigger.
   */
  subItems?: { label: string; href: string }[];
}
