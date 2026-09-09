import { render, screen } from "../../../test/renderWithTheme";
import { tokens } from "../../theme";
import { Loading } from "./Loading";

const progress = () => screen.getByRole("progressbar");

describe("Loading", () => {
  it("announces itself with a default label", () => {
    render(<Loading />);

    expect(screen.getByRole("status")).toHaveTextContent("Loading");
  });

  it("announces a caller-supplied label", () => {
    render(<Loading label="Loading search results" />);

    expect(screen.getByRole("status")).toHaveTextContent(
      "Loading search results"
    );
  });

  it("stays silent when the label is empty, for spinners inside a labelled control", () => {
    render(<Loading label="" />);

    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(progress()).toBeInTheDocument();
  });

  it("keeps the label out of the visual flow", () => {
    render(<Loading />);

    const style = getComputedStyle(screen.getByText("Loading"));

    expect(style.position).toBe("absolute");
    expect(style.width).toBe("1px");
  });

  it("forwards a ref to the root element", () => {
    const ref = { current: null as HTMLDivElement | null };

    render(<Loading ref={ref} />);

    expect(ref.current).toBe(screen.getByRole("status"));
  });
});

describe("Loading metrics", () => {
  it("defaults to the large icon size", () => {
    render(<Loading />);

    expect(getComputedStyle(progress()).width).toBe(
      `${tokens.iconSize.large}px`
    );
  });

  it.each(["small", "medium", "large"] as const)(
    "resolves the %s token to the matching icon size",
    size => {
      render(<Loading size={size} />);

      expect(getComputedStyle(progress()).width).toBe(
        `${tokens.iconSize[size]}px`
      );
    }
  );

  it("takes a number for sizes the token scale has no name for", () => {
    render(<Loading size={30} />);

    expect(getComputedStyle(progress()).width).toBe("30px");
  });
});

describe("Loading layout", () => {
  it("centres in a full-width block by default", () => {
    render(<Loading />);

    const style = getComputedStyle(screen.getByRole("status"));

    expect(style.display).toBe("flex");
    expect(style.justifyContent).toBe("center");
    expect(style.width).toBe("100%");
  });

  it("gives a block loader vertical breathing room, and no inert side padding", () => {
    render(<Loading />);

    const style = getComputedStyle(screen.getByRole("status"));

    expect(style.paddingTop).toBe("16px");
    expect(style.paddingBottom).toBe("16px");
    expect(style.paddingLeft).toBe("0px");
  });

  it("sits in the line of content when inline", () => {
    render(<Loading inline />);

    const style = getComputedStyle(screen.getByRole("status"));

    expect(style.display).toBe("inline-flex");
    expect(style.width).toBe("auto");
    expect(style.paddingTop).toBe("0px");
  });

  it("does not leak the inline flag onto the element", () => {
    render(<Loading inline />);

    expect(screen.getByRole("status")).not.toHaveAttribute("inline");
  });

  it("reserves height through sx, so a container cannot collapse", () => {
    render(<Loading sx={{ minHeight: 500 }} />);

    expect(getComputedStyle(screen.getByRole("status")).minHeight).toBe(
      "500px"
    );
  });
});

describe("Loading theme integration", () => {
  it("takes the base theme's spinner colour", () => {
    render(<Loading />);

    expect(progress()).toHaveClass("MuiCircularProgress-colorSecondary");
  });

  it("lets a site swap the spinner colour", () => {
    render(<Loading />, {
      themeOptions: {
        components: {
          HdrukLoading: { defaultProps: { color: "primary" } },
        },
      },
    });

    expect(progress()).toHaveClass("MuiCircularProgress-colorPrimary");
  });

  it("lets a site restyle the root without losing the base layout", () => {
    render(<Loading />, {
      themeOptions: {
        components: {
          HdrukLoading: { styleOverrides: { root: { minHeight: 200 } } },
        },
      },
    });

    const style = getComputedStyle(screen.getByRole("status"));

    expect(style.minHeight).toBe("200px");
    expect(style.justifyContent).toBe("center");
  });

  it("applies defaultProps registered under HdrukLoading", () => {
    render(<Loading />, {
      themeOptions: {
        components: {
          HdrukLoading: { defaultProps: { size: "small" } },
        },
      },
    });

    expect(getComputedStyle(progress()).width).toBe(
      `${tokens.iconSize.small}px`
    );
  });

  it("lets an explicit prop win over the theme default", () => {
    render(<Loading size="large" />, {
      themeOptions: {
        components: {
          HdrukLoading: { defaultProps: { size: "small" } },
        },
      },
    });

    expect(getComputedStyle(progress()).width).toBe(
      `${tokens.iconSize.large}px`
    );
  });

  it("styles the spinner slot separately from the root", () => {
    render(<Loading />, {
      themeOptions: {
        components: {
          HdrukLoading: { styleOverrides: { progress: { opacity: 0.5 } } },
        },
      },
    });

    expect(getComputedStyle(progress()).opacity).toBe("0.5");
  });
});
