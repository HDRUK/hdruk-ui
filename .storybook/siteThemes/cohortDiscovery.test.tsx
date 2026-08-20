import { Button } from "../../src/components/Button";
import { Icon } from "../../src/components/Icon";
import { IconButton } from "../../src/components/IconButton";
import { render, screen } from "../../test/renderWithTheme";
import { cohortDiscoveryThemeOptions } from "./cohortDiscovery";

/**
 * Guards the decisions in the CD theme that a colour change would not catch —
 * the ones derived from reading two token exports against each other.
 */
const cd = { themeOptions: cohortDiscoveryThemeOptions };

const radiusOf = (name: string) =>
  getComputedStyle(screen.getByRole("button", { name })).borderRadius;

describe("cohort discovery button rounding", () => {
  it("pills the boxed purposes but leaves tertiary square", () => {
    // `Buttons/cornerRounding` is 48 against `tertiaryCornerRounding` 4 — the
    // one token pair that differs in kind rather than value between products.
    render(
      <>
        <Button purpose="primary">P</Button>
        <Button purpose="secondary">S</Button>
        <Button purpose="tertiary">T</Button>
      </>,
      cd
    );

    expect(radiusOf("P")).toBe("9999px");
    expect(radiusOf("S")).toBe("9999px");
    expect(radiusOf("T")).toBe("4px");
  });

  it("keeps the link's focus ring square", () => {
    // The reason the pill is set per boxed variant rather than on `root`: a root
    // radius reaches the link too, and an outline follows the element's radius.
    render(<Button purpose="link">L</Button>, cd);

    expect(radiusOf("L")).toBe("0");
  });
});

describe("cohort discovery button colours", () => {
  it("gives primary a green border on a page-coloured fill", () => {
    render(<Button purpose="primary">P</Button>, cd);

    const style = getComputedStyle(screen.getByRole("button"));

    expect(style.backgroundColor).toBe("rgb(250, 250, 250)");
    expect(style.color).toBe("rgb(60, 60, 59)");
    expect(style.borderWidth).toBe("2px");
  });

  it("gives secondary the pale grey border, not the base's darker one", () => {
    render(<Button purpose="secondary">S</Button>, cd);

    const style = getComputedStyle(screen.getByRole("button"));

    expect(style.borderColor).toBe("rgb(208, 211, 212)");
    expect(style.borderWidth).toBe("1px");
  });
});

describe("cohort discovery icon button", () => {
  it("takes every state's colour from CD's palette, not the base's", () => {
    render(
      <IconButton aria-label="Save">
        <Icon name="bookmark" />
      </IconButton>,
      cd
    );

    const el = screen.getByRole("button");
    const cls = [...el.classList].find(c => c.startsWith("css-"));
    const rules = Array.from(document.styleSheets)
      .flatMap(sheet => Array.from(sheet.cssRules ?? []))
      .map(rule => rule.cssText)
      .filter(text => text.includes(`.${cls}`))
      .join(" ")
      .toLowerCase();
    const style = getComputedStyle(el);

    expect(style.backgroundColor).toBe("rgb(250, 250, 250)");
    expect(style.borderColor).toBe("rgb(134, 142, 150)");
    expect(style.color).toBe("rgb(83, 87, 90)");
    expect(rules).toContain("#dee3f2");
    expect(rules).toContain("#f2f2f2");
    expect(rules).toContain("#0000ff");
  });
});
