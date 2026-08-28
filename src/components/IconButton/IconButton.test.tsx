import MuiIconButton from "@mui/material/IconButton";
import { render, screen } from "../../../test/renderWithTheme";
import { Icon } from "../Icon";
import { IconButton } from "./IconButton";

const bookmark = <Icon name="bookmark" />;

describe("IconButton", () => {
  it("is named by its aria-label", () => {
    render(<IconButton aria-label="Save to library">{bookmark}</IconButton>);

    expect(
      screen.getByRole("button", { name: "Save to library" })
    ).toBeInTheDocument();
  });

  it("defaults to the small size", () => {
    render(<IconButton aria-label="Save">{bookmark}</IconButton>);

    expect(screen.getByRole("button")).toHaveClass("MuiIconButton-sizeSmall");
  });

  it("forwards a ref to the button element", () => {
    const ref = { current: null as HTMLButtonElement | null };

    render(
      <IconButton aria-label="Save" ref={ref}>
        {bookmark}
      </IconButton>
    );

    expect(ref.current).toBe(screen.getByRole("button"));
  });
});

describe("IconButton metrics", () => {
  it("defaults to the small size's 24px icon", () => {
    render(<IconButton aria-label="Save">{bookmark}</IconButton>);

    const style = getComputedStyle(screen.getByRole("button"));

    expect(style.paddingTop).toBe("3px");
    expect(style.fontSize).toBe("1.5rem");
  });

  it("keeps the padding at medium, taking the icon up to 40px", () => {
    render(
      <IconButton aria-label="Save" size="medium">
        {bookmark}
      </IconButton>
    );

    const style = getComputedStyle(screen.getByRole("button"));

    expect(style.paddingTop).toBe("3px");
    expect(style.fontSize).toBe("2.5rem");
  });

  it("styles a raw MuiIconButton identically, since the theme owns the design", () => {
    render(
      <MuiIconButton aria-label="Save" size="medium">
        {bookmark}
      </MuiIconButton>
    );

    const style = getComputedStyle(screen.getByRole("button"));

    expect(style.paddingTop).toBe("3px");
    expect(style.fontSize).toBe("2.5rem");
  });

  it("stays circular on MUI's own default rather than a radius token", () => {
    render(<IconButton aria-label="Save">{bookmark}</IconButton>);

    expect(getComputedStyle(screen.getByRole("button")).borderRadius).toBe(
      "50%"
    );
  });
});

describe("IconButton states", () => {
  it("gives the resting state a faded icon colour", () => {
    render(<IconButton aria-label="Save">{bookmark}</IconButton>);

    const style = getComputedStyle(screen.getByRole("button"));

    expect(style.color).toBe("rgb(83, 87, 90)");
  });

  it("fades icon colour when disabled", () => {
    render(
      <IconButton aria-label="Save" disabled>
        {bookmark}
      </IconButton>
    );

    const style = getComputedStyle(screen.getByRole("button"));

    expect(style.color).toBe("rgb(134, 142, 150)");
  });

  it("leaves an explicit colour to MUI rather than forcing the faded icon", () => {
    render(
      <IconButton aria-label="Save" color="primary">
        {bookmark}
      </IconButton>
    );

    expect(getComputedStyle(screen.getByRole("button")).color).toBe(
      "rgb(71, 93, 167)"
    );
  });

  it("takes its focus fill from the palette, not raw tokens", () => {
    render(<IconButton aria-label="Save">{bookmark}</IconButton>, {
      themeOptions: {
        palette: {
          background: { secondary: "rgb(4, 5, 6)" },
        },
      },
    });

    const el = screen.getByRole("button");
    const cls = [...el.classList].find(c => c.startsWith("css-"));
    const rules = Array.from(document.styleSheets)
      .flatMap(sheet => Array.from(sheet.cssRules ?? []))
      .map(rule => rule.cssText)
      .filter(text => text.includes(`.${cls}`))
      .join(" ");

    expect(rules).toContain("rgb(4, 5, 6)");
  });
});

describe("IconButton theme integration", () => {
  it("lets a site restyle it without losing the base root styles", () => {
    render(<IconButton aria-label="Save">{bookmark}</IconButton>, {
      themeOptions: {
        components: {
          HdrukIconButton: { styleOverrides: { root: { borderRadius: 4 } } },
        },
      },
    });

    const style = getComputedStyle(screen.getByRole("button"));

    expect(style.borderRadius).toBe("4px");
    expect(style.paddingTop).toBe("3px");
  });

  it("applies defaultProps registered under HdrukIconButton", () => {
    render(<IconButton aria-label="Save">{bookmark}</IconButton>, {
      themeOptions: {
        components: {
          HdrukIconButton: { defaultProps: { size: "small" } },
        },
      },
    });

    expect(screen.getByRole("button")).toHaveClass("MuiIconButton-sizeSmall");
  });
});
