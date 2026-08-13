import { buildMobileMenuItems, getInitials } from "./Header.utils";
import type { AccountNavigation } from "./Header.types";
import type { MenuLinkItem } from "../../types/navigation";

describe("getInitials", () => {
  it("takes the first letter of the first two names, uppercased", () => {
    expect(getInitials("Ada Lovelace")).toBe("AL");
    expect(getInitials("ada lovelace")).toBe("AL");
  });

  it("returns a single initial for a single name", () => {
    expect(getInitials("Ada")).toBe("A");
  });

  it("ignores names beyond the second", () => {
    expect(getInitials("Ada Byron Lovelace")).toBe("AB");
  });

  it("returns an empty string for an empty name", () => {
    expect(getInitials("")).toBe("");
  });
});

describe("buildMobileMenuItems", () => {
  const navItems: MenuLinkItem[] = [
    { label: "Search", href: "/search" },
    { label: "About", href: "/about" },
  ];

  const accountNavigation: AccountNavigation = {
    signIn: { label: "Sign in", href: "/signin" },
    profile: { label: "My profile", href: "/profile" },
    items: [{ label: "Settings", href: "/settings" }],
    logout: { label: "Log out" },
  };

  const labels = (items: MenuLinkItem[]) => items.map(item => item.label);

  it("offers sign in and hides account items when logged out", () => {
    const items = buildMobileMenuItems({
      isLoggedIn: false,
      navItems,
      accountNavigation,
    });

    expect(labels(items)).toEqual(["Sign in", "Search", "About"]);
  });

  it("puts profile first and logout last when logged in", () => {
    const items = buildMobileMenuItems({
      isLoggedIn: true,
      navItems,
      accountNavigation,
    });

    expect(labels(items)).toEqual([
      "My profile",
      "Search",
      "About",
      "Settings",
      "Log out",
    ]);
  });

  it("treats a missing isLoggedIn as logged out", () => {
    const items = buildMobileMenuItems({ navItems, accountNavigation });

    expect(labels(items)).toEqual(["Sign in", "Search", "About"]);
  });

  it("returns an empty list when given nothing", () => {
    expect(buildMobileMenuItems({})).toEqual([]);
  });

  it("omits account entries the consumer did not supply", () => {
    const items = buildMobileMenuItems({
      isLoggedIn: true,
      navItems,
      accountNavigation: { logout: { label: "Log out" } },
    });

    expect(labels(items)).toEqual(["Search", "About", "Log out"]);
  });
});
