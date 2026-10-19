import Chip from "@mui/material/Chip";
import { hexToRgb } from "@mui/material/styles";
import { render, screen } from "../../test/renderWithTheme";
import theme, { tokens } from ".";

describe("chip metrics", () => {
  it("gives a filled chip a 28px pill with 4px/12px padding", () => {
    render(<Chip label="Active" />);

    const chip = getComputedStyle(screen.getByText("Active").parentElement!);
    expect(chip.minHeight).toBe(theme.spacing(3.5));
    expect(chip.padding).toBe(theme.spacing(0.5, 1.5));
    expect(chip.borderRadius).toBe(`${tokens.radius.pill}px`);
  });

  it("pays for the outlined chip's border out of its padding", () => {
    render(<Chip label="Draft" variant="outlined" />);

    const chip = getComputedStyle(screen.getByText("Draft").parentElement!);
    expect(chip.padding).toBe(theme.spacing(0.375, 1.375));
  });

  it("draws the outlined border in the full colour, not MUI's 70% tint", () => {
    render(<Chip label="Primary" variant="outlined" color="primary" />);

    expect(
      getComputedStyle(screen.getByText("Primary").parentElement!).borderColor
    ).toBe("rgb(71, 93, 167)");
  });

  it("sizes the icon to the small icon token, spaced by the root's gap", () => {
    const icon = theme.components?.MuiChip?.styleOverrides?.icon as (props: {
      theme: typeof theme;
    }) => Record<string, unknown>;

    expect(icon({ theme })).toEqual({
      margin: 0,
      fontSize: theme.typography.pxToRem(tokens.iconSize.small),
    });
  });

  it.each([
    ["needsAction", tokens.status.needsAction, tokens.text.primaryBlack],
    ["archived", tokens.status.archived, tokens.text.primaryWhite],
  ] as const)(
    "fills a %s chip from the status palette",
    (color, main, contrastText) => {
      render(<Chip label="Status" color={color} />);

      const chip = getComputedStyle(screen.getByText("Status").parentElement!);
      expect(chip.backgroundColor).toBe(hexToRgb(main));
      expect(chip.color).toBe(hexToRgb(contrastText));
    }
  );

  it.each([
    ["filled", "warning"],
    ["outlined", "warning"],
    ["outlined", "needsAction"],
  ] as const)("labels a %s %s chip in secondary black", (variant, color) => {
    render(<Chip label="Status" color={color} variant={variant} />);

    expect(
      getComputedStyle(screen.getByText("Status").parentElement!).color
    ).toBe(hexToRgb(tokens.text.secondaryBlack));
  });

  it("sets the avatar and delete icon flush, spaced by the root's gap", () => {
    render(
      <Chip
        label="Draft"
        avatar={<span data-testid="avatar" />}
        onDelete={() => {}}
      />
    );

    expect(getComputedStyle(screen.getByTestId("avatar")).margin).toBe("0px");
    expect(getComputedStyle(screen.getByTestId("CancelIcon")).margin).toBe(
      "0px"
    );
  });

  it("keeps a disabled chip opaque, on the disabled grey", () => {
    render(<Chip label="Archived" color="archived" disabled />);

    const chip = getComputedStyle(screen.getByText("Archived").parentElement!);
    expect(chip.opacity).toBe("1");
    expect(chip.backgroundColor).toBe("rgb(226, 226, 226)");
  });
});
