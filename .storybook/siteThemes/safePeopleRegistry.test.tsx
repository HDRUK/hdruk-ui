import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { IconButton } from "@/components/IconButton";
import { render, screen } from "../../test/renderWithTheme";
import { safePeopleRegistryThemeOptions } from "./safePeopleRegistry";

const spr = { themeOptions: safePeopleRegistryThemeOptions };
const MAGENTA = "#BE37A3";

const styleOf = (name: string) =>
  getComputedStyle(screen.getByRole("button", { name }));

const emittedVar = (name: string, property: string) => {
  const el = screen.getByRole("button", { name });
  const cls = [...el.classList].find(c => c.startsWith("css-"));

  return Array.from(document.styleSheets)
    .flatMap(sheet => Array.from(sheet.cssRules ?? []))
    .map(rule => rule.cssText)
    .filter(text => text.includes(`.${cls}`))
    .join(" ")
    .match(new RegExp(`${property}: ([^;]*)`))?.[1];
};

describe("safe people registry buttons", () => {
  it("separates the purposes by weight, all in brand primary", () => {
    render(
      <>
        <Button purpose="secondary">S</Button>
        <Button purpose="tertiary">T</Button>
      </>,
      spr
    );

    expect(screen.getByRole("button", { name: "S" })).toHaveClass(
      "MuiButton-outlinedPrimary"
    );
    expect(screen.getByRole("button", { name: "T" })).toHaveClass(
      "MuiButton-textPrimary"
    );
    expect(emittedVar("S", "--variant-outlinedColor")).toBe(MAGENTA);
    expect(emittedVar("T", "--variant-textColor")).toBe(MAGENTA);
  });

  it("pays for secondary's 1px border out of the same 12px inset", () => {
    render(<Button purpose="secondary">S</Button>, spr);

    const style = styleOf("S");

    expect(style.borderWidth).toBe("1px");
    expect(style.paddingTop).toBe("7px");
    expect(style.paddingLeft).toBe("11px");
    expect(style.backgroundColor).toBe("rgb(255, 255, 255)");
  });

  it("draws tertiary with no border at all", () => {
    render(<Button purpose="tertiary">T</Button>, spr);

    expect(styleOf("T").borderWidth).toBe("0px");
  });

  it("darkens tertiary's label on hover without filling it", () => {
    render(<Button purpose="tertiary">T</Button>, spr);

    const el = screen.getByRole("button", { name: "T" });
    const cls = [...el.classList].find(c => c.startsWith("css-"));
    const hover = Array.from(document.styleSheets)
      .flatMap(sheet => Array.from(sheet.cssRules ?? []))
      .map(rule => rule.cssText)
      .filter(text => text.includes(`.${cls}:hover`))
      .join(" ");

    expect(hover).toContain("#6F295F");
    expect(hover).toContain("transparent");
  });
});

describe("safe people registry type", () => {
  it("sets Inter, where the base and cohort discovery use Source Sans 3", () => {
    render(<Button purpose="primary">P</Button>, spr);

    expect(styleOf("P").fontFamily).toContain("Inter");
  });

  it("weights the link SemiBold, and in the rebranded link colour", () => {
    render(<Button purpose="link">L</Button>, spr);

    expect(styleOf("L").fontWeight).toBe("600");
    expect(emittedVar("L", "--variant-textColor")).toBe(MAGENTA);
  });
});

describe("safe people registry icon button", () => {
  it("takes its fill, border and icon from SPR's palette", () => {
    render(
      <IconButton aria-label="Save">
        <Icon name="bookmark" />
      </IconButton>,
      spr
    );

    const style = getComputedStyle(screen.getByRole("button"));

    expect(style.backgroundColor).toBe("rgb(241, 241, 241)");
    expect(style.borderColor).toBe("rgb(124, 124, 124)");
    expect(style.color).toBe("rgb(91, 91, 91)");
  });

  it("has no hover, because the export gives hovered the default's value", () => {
    render(
      <IconButton aria-label="Save">
        <Icon name="bookmark" />
      </IconButton>,
      spr
    );

    const el = screen.getByRole("button");
    const cls = [...el.classList].find(c => c.startsWith("css-"));
    const hover = Array.from(document.styleSheets)
      .flatMap(sheet => Array.from(sheet.cssRules ?? []))
      .map(rule => rule.cssText)
      .filter(text => text.includes(`.${cls}:hover`))
      .join(" ");

    expect(hover).toContain("#F1F1F1");
  });
});
