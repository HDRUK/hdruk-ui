import { List, ListItemButton } from "@mui/material";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { IconButton } from "@/components/IconButton";
import { MenuItem } from "@/components/MenuItem";
import { tokens } from "@/theme";
import { render, screen } from "../../test/renderWithTheme";
import { cohortDiscoveryThemeOptions } from "./cohortDiscovery";

const cd = { themeOptions: cohortDiscoveryThemeOptions };

const radiusOf = (name: string) =>
  getComputedStyle(screen.getByRole("button", { name })).borderRadius;

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

describe("cohort discovery button rounding", () => {
  it("pills every boxed purpose", () => {
    render(
      <>
        <Button purpose="primary">P</Button>
        <Button purpose="secondary">S</Button>
        <Button purpose="tertiary">T</Button>
      </>,
      cd
    );

    expect(radiusOf("P")).toBe("48px");
    expect(radiusOf("S")).toBe("48px");
    expect(radiusOf("T")).toBe("48px");
  });

  it("keeps the link's focus ring square", () => {
    render(<Button purpose="link">L</Button>, cd);

    expect(radiusOf("L")).toBe("0");
  });
});

describe("cohort discovery button colours", () => {
  it("fills primary with the brand blue", () => {
    render(<Button purpose="primary">P</Button>, cd);

    expect(screen.getByRole("button", { name: "P" })).toHaveClass(
      "MuiButton-containedPrimary"
    );
  });

  it("outlines secondary in the success green on white", () => {
    render(<Button purpose="secondary">S</Button>, cd);

    const style = getComputedStyle(screen.getByRole("button"));

    expect(emittedVar("S", "--variant-outlinedBorder")).toBe("#4B7E59");
    expect(style.borderWidth).toBe("2px");
    expect(style.backgroundColor).toBe("rgb(255, 255, 255)");
    expect(style.color).toBe("rgb(60, 60, 59)");
  });

  it("outlines tertiary in thin grey on white, not the base's grey fill", () => {
    render(<Button purpose="tertiary">T</Button>, cd);

    const style = getComputedStyle(screen.getByRole("button"));

    expect(style.borderColor).toBe("rgb(134, 142, 150)");
    expect(style.borderWidth).toBe("1px");
    expect(style.backgroundColor).toBe("rgb(255, 255, 255)");
    expect(style.color).toBe("rgb(60, 60, 59)");
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

    expect(style.backgroundColor).toBe("rgb(208, 211, 212)");
    expect(style.borderColor).toBe("rgb(134, 142, 150)");
    expect(style.color).toBe("rgb(80, 90, 96)");
    expect(rules).toContain("#e3e7f2");
    expect(rules).toContain("#f2f2f2");
    expect(rules).toContain("#0000ff");
  });
});

describe("cohort discovery nav list items", () => {
  it("rounds list items, which the base leaves square", () => {
    render(
      <List>
        <ListItemButton component="button">I</ListItemButton>
      </List>,
      cd
    );

    expect(radiusOf("I")).toBe(`${tokens.radius.medium}px`);
  });

  it("keeps them full-bleed, with no inset from the base", () => {
    render(
      <List>
        <ListItemButton component="button">I</ListItemButton>
      </List>,
      cd
    );

    expect(getComputedStyle(screen.getByRole("button")).margin).toBe("0px");
  });
});

describe("cohort discovery menu items", () => {
  it("marks the selected item with the navy bar, not the status green", () => {
    render(
      <MenuItem selected aria-current="page">
        Queries
      </MenuItem>,
      cd
    );

    expect(
      getComputedStyle(screen.getByRole("button", { name: "Queries" }))
        .boxShadow
    ).toContain("#384B91");
  });

  it("draws the horizontal selected bar navy, along the bottom", () => {
    render(
      <MenuItem selected orientation="horizontal">
        Queries
      </MenuItem>,
      cd
    );

    expect(
      getComputedStyle(screen.getByRole("button", { name: "Queries" }))
        .boxShadow
    ).toBe("inset 0 -3px 0 #384B91");
  });
});
