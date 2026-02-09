export interface MenuLinkItem {
  /**
   * Visible label for the menu item.
   */
  label: string;

  /**
   * Destination URL.
   * If provided, the item renders as a link.
   */
  href?: string;
}
