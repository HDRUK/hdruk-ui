import * as React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen } from "../../../test/renderWithTheme";
import Header from "./Header";
import type { AccountNavigation, HeaderMenuLinkItem } from "./Header.types";

const StubLink = ({
  href,
  children,
}: {
  href?: string;
  children?: React.ReactNode;
}) => (
  <a data-testid="stub-link" href={href}>
    {children}
  </a>
);

const logoImage = <span>Gateway</span>;

const navItems: HeaderMenuLinkItem[] = [
  { label: "Search", href: "/search" },
  {
    label: "Resources",
    subItems: [
      { label: "Guide", href: "/guide" },
      { label: "Support", href: "/support" },
    ],
  },
];

const accountNavigation: AccountNavigation = {
  signIn: { label: "Sign in", href: "/signin" },
  profile: { label: "My profile", href: "/profile" },
  items: [{ label: "Settings", href: "/settings" }],
  logout: { label: "Log out", action: () => {} },
};

const logoLinks = () => screen.getAllByRole("link", { name: "Gateway" });

describe("Header branding", () => {
  it("renders the HDR UK logo by default", () => {
    render(<Header accountLoading={false} />);

    expect(screen.getAllByAltText("HDRUK logo").length).toBeGreaterThan(0);
  });

  it("points every logo link at / by default", () => {
    render(<Header accountLoading={false} logoImage={logoImage} />);

    expect(logoLinks().length).toBeGreaterThan(0);
    logoLinks().forEach(link => expect(link).toHaveAttribute("href", "/"));
  });

  it("honours a custom logoHref", () => {
    render(
      <Header accountLoading={false} logoImage={logoImage} logoHref="/home" />
    );

    logoLinks().forEach(link => expect(link).toHaveAttribute("href", "/home"));
  });

  it("renders a branding logo without a link when no href is given", () => {
    render(
      <Header
        accountLoading={false}
        logoImage={logoImage}
        brandingLogoImage={<span>Partner</span>}
      />
    );

    expect(screen.getAllByText("Partner").length).toBeGreaterThan(0);
    expect(
      screen.queryByRole("link", { name: "Partner" })
    ).not.toBeInTheDocument();
  });

  it("links the branding logo when given an href", () => {
    render(
      <Header
        accountLoading={false}
        logoImage={logoImage}
        brandingLogoImage={<span>Partner</span>}
        brandingLogoHref="https://partner.example.com"
      />
    );

    screen
      .getAllByRole("link", { name: "Partner" })
      .forEach(link =>
        expect(link).toHaveAttribute("href", "https://partner.example.com")
      );
  });

  it("routes links through a consumer-supplied link component", () => {
    render(
      <Header
        accountLoading={false}
        logoImage={logoImage}
        linkComponent={StubLink}
      />
    );

    expect(screen.getAllByTestId("stub-link").length).toBeGreaterThan(0);
  });
});

describe("Header desktop navigation", () => {
  it("renders no nav landmark when there are no nav items", () => {
    render(<Header accountLoading={false} logoImage={logoImage} />);

    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  it("renders plain nav items as links", () => {
    render(
      <Header
        accountLoading={false}
        logoImage={logoImage}
        navItems={navItems}
      />
    );

    expect(screen.getByRole("link", { name: "Search" })).toHaveAttribute(
      "href",
      "/search"
    );
  });

  it("labels the nav landmark, defaulting to Primary navigation", () => {
    render(
      <Header
        accountLoading={false}
        logoImage={logoImage}
        navItems={navItems}
      />
    );

    expect(
      screen.getByRole("navigation", { name: "Primary navigation" })
    ).toBeInTheDocument();
  });

  it("honours a custom ariaLabel", () => {
    render(
      <Header
        accountLoading={false}
        logoImage={logoImage}
        navItems={navItems}
        ariaLabel="Gateway navigation"
      />
    );

    expect(
      screen.getByRole("navigation", { name: "Gateway navigation" })
    ).toBeInTheDocument();
  });

  it("opens a submenu on click and reports it via aria-expanded", async () => {
    const user = userEvent.setup();
    render(
      <Header
        accountLoading={false}
        logoImage={logoImage}
        navItems={navItems}
      />
    );

    const trigger = screen.getByRole("button", { name: /Resources/ });

    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("menuitem", { name: "Guide" })).toHaveAttribute(
      "href",
      "/guide"
    );
    expect(screen.getByRole("menuitem", { name: "Support" })).toBeVisible();
  });
});

describe("Header account area", () => {
  it("renders nothing when no account navigation is supplied", () => {
    render(<Header accountLoading={false} logoImage={logoImage} />);

    expect(
      screen.queryByRole("link", { name: "Sign in" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Account" })
    ).not.toBeInTheDocument();
  });

  it("shows skeletons while the account is loading", () => {
    const { container } = render(
      <Header
        accountLoading
        logoImage={logoImage}
        accountNavigation={accountNavigation}
      />
    );

    expect(container.querySelectorAll(".MuiSkeleton-root")).toHaveLength(2);
    expect(
      screen.queryByRole("link", { name: "Sign in" })
    ).not.toBeInTheDocument();
  });

  it("offers a sign-in link when logged out", () => {
    render(
      <Header
        accountLoading={false}
        logoImage={logoImage}
        accountNavigation={accountNavigation}
      />
    );

    expect(screen.getByRole("link", { name: "Sign in" })).toHaveAttribute(
      "href",
      "/signin"
    );
  });

  it("falls back to an action button when sign-in has no href", async () => {
    const user = userEvent.setup();
    const action = jest.fn();
    render(
      <Header
        accountLoading={false}
        logoImage={logoImage}
        accountNavigation={{ signIn: { label: "Sign in", action } }}
      />
    );

    await user.click(screen.getByRole("button", { name: "Sign in" }));

    expect(action).toHaveBeenCalledTimes(1);
  });

  it("shows the account initials and first name when logged in", () => {
    render(
      <Header
        accountLoading={false}
        isLoggedIn
        logoImage={logoImage}
        accountNavigation={accountNavigation}
        accountName={{ first: "Ada", last: "Lovelace" }}
      />
    );

    expect(screen.getByText("AL")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Ada" })).toBeInTheDocument();
  });

  it("falls back to Account when no name is supplied", () => {
    render(
      <Header
        accountLoading={false}
        isLoggedIn
        logoImage={logoImage}
        accountNavigation={accountNavigation}
      />
    );

    expect(screen.getByRole("button", { name: "Account" })).toBeInTheDocument();
  });

  it("opens the account menu with profile, items and logout", async () => {
    const user = userEvent.setup();
    render(
      <Header
        accountLoading={false}
        isLoggedIn
        logoImage={logoImage}
        accountNavigation={accountNavigation}
        accountName={{ first: "Ada", last: "Lovelace" }}
      />
    );

    await user.click(screen.getByRole("button", { name: "Ada" }));

    expect(
      screen.getByRole("menuitem", { name: "My profile" })
    ).toHaveAttribute("href", "/profile");
    expect(screen.getByRole("menuitem", { name: "Settings" })).toBeVisible();
    expect(screen.getByRole("menuitem", { name: "Log out" })).toBeVisible();
  });

  it("runs the logout action and closes the menu", async () => {
    const user = userEvent.setup();
    const action = jest.fn();
    render(
      <Header
        accountLoading={false}
        isLoggedIn
        logoImage={logoImage}
        accountNavigation={{
          ...accountNavigation,
          logout: { label: "Log out", action },
        }}
        accountName={{ first: "Ada", last: "Lovelace" }}
      />
    );

    await user.click(screen.getByRole("button", { name: "Ada" }));
    await user.click(screen.getByRole("menuitem", { name: "Log out" }));

    expect(action).toHaveBeenCalledTimes(1);
  });
});

describe("Header mobile menu", () => {
  it("opens the mobile menu with sign-in ahead of the nav items", async () => {
    const user = userEvent.setup();
    render(
      <Header
        accountLoading={false}
        logoImage={logoImage}
        navItems={[{ label: "Search", href: "/search" }]}
        accountNavigation={accountNavigation}
      />
    );

    await user.click(screen.getByRole("button", { name: "navigation menu" }));

    const items = screen.getAllByRole("menuitem").map(item => item.textContent);

    expect(items).toEqual(["Sign in", "Search"]);
  });

  it("swaps sign-in for profile and logout once logged in", async () => {
    const user = userEvent.setup();
    render(
      <Header
        accountLoading={false}
        isLoggedIn
        logoImage={logoImage}
        navItems={[{ label: "Search", href: "/search" }]}
        accountNavigation={accountNavigation}
      />
    );

    await user.click(screen.getByRole("button", { name: "navigation menu" }));

    const items = screen.getAllByRole("menuitem").map(item => item.textContent);

    expect(items).toEqual(["My profile", "Search", "Settings", "Log out"]);
  });

  it("drops menu entries that have neither an href nor an action", async () => {
    const user = userEvent.setup();
    render(
      <Header
        accountLoading={false}
        isLoggedIn
        logoImage={logoImage}
        navItems={[{ label: "Search", href: "/search" }]}
        accountNavigation={{ logout: { label: "Log out" } }}
      />
    );

    await user.click(screen.getByRole("button", { name: "navigation menu" }));

    expect(screen.getByRole("menuitem", { name: "Search" })).toBeVisible();
    expect(
      screen.queryByRole("menuitem", { name: "Log out" })
    ).not.toBeInTheDocument();
  });
});
