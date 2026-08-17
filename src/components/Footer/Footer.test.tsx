import * as React from "react";
import { render, screen } from "../../../test/renderWithTheme";
import Footer from "./Footer";
import type { FooterLinkGroup, SocialLinkItem } from "./Footer.types";

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

const linkGroups: FooterLinkGroup[] = [
  {
    title: "About",
    items: [
      { label: "Our mission", href: "/mission" },
      { label: "Team", href: "/team" },
    ],
  },
  {
    title: "Legal",
    items: [{ label: "Privacy", href: "/privacy" }],
  },
];

describe("Footer branding", () => {
  it("renders the HDR UK logo by default", () => {
    render(<Footer />);

    expect(screen.getByAltText("HDRUK logo")).toBeInTheDocument();
  });

  it("lets a consumer replace the logo", () => {
    render(<Footer logoImage={<span>Partner logo</span>} />);

    expect(screen.getByText("Partner logo")).toBeInTheDocument();
    expect(screen.queryByAltText("HDRUK logo")).not.toBeInTheDocument();
  });

  it("renders as a footer landmark", () => {
    render(<Footer />);

    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });
});

describe("Footer social links", () => {
  it("ships X and LinkedIn by default", () => {
    render(<Footer />);

    expect(screen.getByRole("link", { name: "X" })).toHaveAttribute(
      "href",
      "https://x.com/HDR_UK"
    );
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/company/hdruk/mycompany/"
    );
  });

  it("opens external social links safely", () => {
    render(<Footer />);

    const link = screen.getByRole("link", { name: "X" });

    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders supplied social links with their icons", () => {
    const socialLinks: SocialLinkItem[] = [
      {
        label: "Mastodon",
        href: "https://example.com/hdruk",
        icon: <span data-testid="mastodon-icon" />,
      },
    ];

    render(<Footer socialLinks={socialLinks} />);

    expect(screen.getByRole("link", { name: "Mastodon" })).toBeInTheDocument();
    expect(screen.getByTestId("mastodon-icon")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "X" })).not.toBeInTheDocument();
  });

  it("renders no social list when given an empty array", () => {
    render(<Footer socialLinks={[]} />);

    expect(screen.queryAllByRole("link")).toHaveLength(0);
  });
});

describe("Footer copyright", () => {
  it("defaults to the current year", () => {
    render(<Footer />);

    const year = new Date().getFullYear();

    expect(
      screen.getByText(`©HDR UK ${year}. All rights reserved.`)
    ).toBeInTheDocument();
  });

  it("lets a consumer supply their own text", () => {
    render(<Footer copyrightText="© Example Trust 1999." />);

    expect(screen.getByText("© Example Trust 1999.")).toBeInTheDocument();
    expect(screen.queryByText(/HDR UK/)).not.toBeInTheDocument();
  });

  it("renders nothing when the text is emptied", () => {
    render(<Footer copyrightText="" />);

    expect(screen.queryByText(/All rights reserved/)).not.toBeInTheDocument();
  });
});

describe("Footer link groups", () => {
  it("renders every group item as a link", () => {
    render(<Footer linkGroups={linkGroups} />);

    expect(screen.getByRole("link", { name: "Our mission" })).toHaveAttribute(
      "href",
      "/mission"
    );
    expect(screen.getByRole("link", { name: "Team" })).toHaveAttribute(
      "href",
      "/team"
    );
    expect(screen.getByRole("link", { name: "Privacy" })).toHaveAttribute(
      "href",
      "/privacy"
    );
  });

  it("leaves internal links in the same tab", () => {
    render(<Footer linkGroups={linkGroups} socialLinks={[]} />);

    expect(screen.getByRole("link", { name: "Privacy" })).not.toHaveAttribute(
      "target"
    );
  });

  it("renders no group list when none are supplied", () => {
    render(<Footer socialLinks={[]} />);

    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });
});

describe("Footer routing integration", () => {
  it("routes every link through a consumer-supplied link component", () => {
    render(
      <Footer
        linkGroups={linkGroups}
        socialLinks={[]}
        linkComponent={StubLink}
      />
    );

    expect(screen.getAllByTestId("stub-link")).toHaveLength(3);
    expect(screen.getByRole("link", { name: "Team" })).toHaveAttribute(
      "href",
      "/team"
    );
  });

  it("falls back to a plain anchor when no link component is given", () => {
    render(<Footer linkGroups={linkGroups} socialLinks={[]} />);

    expect(screen.queryByTestId("stub-link")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Team" }).tagName).toBe("A");
  });
});
