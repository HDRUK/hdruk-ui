import userEvent from "@testing-library/user-event";
import { render, screen } from "../../../test/renderWithTheme";
import { Banner } from "./Banner";

describe("Banner", () => {
  it("renders the highlight, title and message", () => {
    render(
      <Banner highlight="New!" title="Announcement">
        More about this announcement
      </Banner>
    );

    expect(screen.getByText("New!")).toBeInTheDocument();
    expect(screen.getByText("Announcement")).toBeInTheDocument();
    expect(
      screen.getByText("More about this announcement")
    ).toBeInTheDocument();
  });

  it("names its region from the highlight and title", () => {
    render(
      <Banner highlight="New!" title="Announcement">
        More about this announcement
      </Banner>
    );

    expect(
      screen.getByRole("region", { name: "New! Announcement" })
    ).toBeInTheDocument();
  });

  it("renders no controls unless asked", () => {
    render(<Banner highlight="Beta!">Message</Banner>);

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
  });

  it("calls onAction from the action button", async () => {
    const user = userEvent.setup();
    const onAction = jest.fn();
    render(
      <Banner actionLabel="Share feedback" onAction={onAction}>
        Message
      </Banner>
    );

    await user.click(screen.getByRole("button", { name: "Share feedback" }));

    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it("renders the action as a link when given an href", () => {
    render(
      <Banner
        actionLabel="Share feedback"
        slotProps={{
          action: { href: "/feedback", target: "_blank", rel: "noreferrer" },
        }}>
        Message
      </Banner>
    );

    expect(
      screen.getByRole("link", { name: "Share feedback" })
    ).toHaveAttribute("href", "/feedback");
    expect(
      screen.getByRole("link", { name: "Share feedback" })
    ).toHaveAttribute("target", "_blank");
  });

  it("hides itself and calls onClose when closed", async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    render(
      <Banner closable onClose={onClose}>
        Message
      </Banner>
    );

    await user.click(screen.getByRole("button", { name: "Close banner" }));

    expect(screen.queryByText("Message")).not.toBeInTheDocument();
    expect(onClose).toHaveBeenCalledWith(expect.anything(), {
      suppressed: false,
    });
  });

  it("closes without an onClose handler", async () => {
    const user = userEvent.setup();
    render(<Banner closable>Message</Banner>);

    await user.click(screen.getByRole("button", { name: "Close banner" }));

    expect(screen.queryByText("Message")).not.toBeInTheDocument();
  });

  it("reports the suppress choice on change and on close", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    const onClose = jest.fn();
    render(
      <Banner
        closable
        onClose={onClose}
        suppressible
        onSuppressChange={onChange}>
        Message
      </Banner>
    );

    await user.click(
      screen.getByRole("checkbox", { name: "Don't show me this again" })
    );
    expect(onChange).toHaveBeenLastCalledWith(true);

    await user.click(screen.getByRole("button", { name: "Close banner" }));
    expect(onClose).toHaveBeenCalledWith(expect.anything(), {
      suppressed: true,
    });
  });

  it("keeps its own handlers and labels when slotProps are passed", async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    const onSuppressChange = jest.fn();
    const onAction = jest.fn();
    render(
      <Banner
        actionLabel="Share feedback"
        onAction={onAction}
        closable
        onClose={onClose}
        suppressible
        onSuppressChange={onSuppressChange}
        slotProps={{
          // @ts-expect-error onClick is owned by the banner
          action: { onClick: jest.fn() },
          // @ts-expect-error onClick and aria-label are owned by the banner
          closeButton: { onClick: jest.fn(), "aria-label": "Dismiss" },
          // @ts-expect-error onChange is owned by the banner
          checkbox: { onChange: jest.fn() },
        }}>
        Message
      </Banner>
    );

    await user.click(screen.getByRole("button", { name: "Share feedback" }));
    await user.click(
      screen.getByRole("checkbox", { name: "Don't show me this again" })
    );
    await user.click(screen.getByRole("button", { name: "Close banner" }));

    expect(onAction).toHaveBeenCalledTimes(1);
    expect(onSuppressChange).toHaveBeenCalledWith(true);
    expect(onClose).toHaveBeenCalledWith(expect.anything(), {
      suppressed: true,
    });
    expect(screen.queryByText("Message")).not.toBeInTheDocument();
  });

  it("uses caller-supplied labels", () => {
    render(
      <Banner
        closable
        closeLabel="Dismiss"
        suppressible
        suppressLabel="Hide for good">
        Message
      </Banner>
    );

    expect(screen.getByRole("button", { name: "Dismiss" })).toBeInTheDocument();
    expect(
      screen.getByRole("checkbox", { name: "Hide for good" })
    ).toBeInTheDocument();
  });

  it("forwards a ref to the root element", () => {
    const ref = { current: null as HTMLElement | null };
    render(<Banner ref={ref}>Message</Banner>);

    expect(ref.current?.tagName).toBe("SECTION");
  });
});

describe("Banner theme integration", () => {
  it("applies defaultProps registered under HdrukBanner", () => {
    render(<Banner closable>Message</Banner>, {
      themeOptions: {
        components: {
          HdrukBanner: { defaultProps: { closeLabel: "Dismiss" } },
        },
      },
    });

    expect(screen.getByRole("button", { name: "Dismiss" })).toBeInTheDocument();
  });

  it("lets an explicit prop win over the theme default", () => {
    render(
      <Banner closable closeLabel="Hide">
        Message
      </Banner>,
      {
        themeOptions: {
          components: {
            HdrukBanner: { defaultProps: { closeLabel: "Dismiss" } },
          },
        },
      }
    );

    expect(screen.getByRole("button", { name: "Hide" })).toBeInTheDocument();
  });

  it("keeps app Typography margins out of the banner text", () => {
    render(
      <Banner highlight="New!" title="Announcement">
        Message
      </Banner>,
      {
        themeOptions: {
          components: {
            MuiTypography: {
              styleOverrides: {
                h4: { marginBottom: 8 },
                body1: { marginBottom: 8 },
              },
            },
          },
        },
      }
    );

    expect(getComputedStyle(screen.getByText("New!")).marginBottom).not.toBe(
      "8px"
    );
    expect(getComputedStyle(screen.getByText("Message")).marginBottom).not.toBe(
      "8px"
    );
  });

  it("lets a site restyle the root without losing the base styles", () => {
    render(<Banner highlight="New!">Message</Banner>, {
      themeOptions: {
        components: {
          HdrukBanner: { styleOverrides: { root: { minHeight: 200 } } },
        },
      },
    });

    const style = getComputedStyle(screen.getByRole("region"));

    expect(style.minHeight).toBe("200px");
    expect(style.backgroundColor).toBe("rgb(41, 35, 92)");
  });
});
