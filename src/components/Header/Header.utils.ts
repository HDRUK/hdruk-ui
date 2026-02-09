import { SxProps, Theme } from "@mui/material";
import { AccountNavigation } from "./Header.types";
import { MenuLinkItem } from "../../types/navigation";

export const buildMobileMenuItems = ({
  isLoggedIn,
  navItems,
  accountNavigation,
}: {
  isLoggedIn?: boolean;
  navItems?: MenuLinkItem[];
  accountNavigation?: AccountNavigation;
}): MenuLinkItem[] => [
  ...(!isLoggedIn && accountNavigation?.signIn
    ? [accountNavigation.signIn]
    : []),
  ...(isLoggedIn && accountNavigation?.profile
    ? [accountNavigation.profile]
    : []),
  ...(navItems ?? []),
  ...(isLoggedIn ? (accountNavigation?.items ?? []) : []),
  ...(isLoggedIn && accountNavigation?.logout
    ? [accountNavigation.logout]
    : []),
];

export function getLinkComponent(linkComponent?: React.ElementType) {
  return linkComponent ?? "a";
}

export const getInitials = (fullName: string) => {
  const nameArray = fullName?.split(" ");

  const firstLetter = nameArray[0] ? nameArray[0].charAt(0) : "";
  const lastLetter = nameArray[1] ? nameArray[1].charAt(0) : "";

  return `${firstLetter.toUpperCase()}${lastLetter.toUpperCase()}`;
};

/**
 * Shared focus styles for header interactive elements.
 * Uses CSS var set on the AppBar: `--hdruk-header-focus`
 */
export const headerFocusRingSx = {
  "&&:focus-visible, &&.Mui-focusVisible": {
    outline: "2px solid var(--hdruk-header-focus)",
    outlineOffset: 3,
    borderRadius: 0,
    textDecoration: "underline",
  },
  "&&:focus-visible svg, &&.Mui-focusVisible svg": {
    color: "var(--hdruk-header-focus)",
  },
} satisfies SxProps<Theme>;
