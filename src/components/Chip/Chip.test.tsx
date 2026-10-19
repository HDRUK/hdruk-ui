import { render, screen } from "../../../test/renderWithTheme";
import { Icon } from "../Icon";
import { Chip } from "./Chip";

const chevron = <Icon name="expand_more" />;

describe("Chip", () => {
  it("forwards a ref to the chip element", () => {
    const ref = { current: null as HTMLDivElement | null };

    render(<Chip label="Draft" ref={ref} />);

    expect(ref.current).toBe(screen.getByText("Draft").parentElement);
  });

  it("keeps the icon before the label by default", () => {
    render(<Chip label="Draft" icon={chevron} />);

    expect(getComputedStyle(screen.getByText("expand_more")).order).not.toBe(
      "1"
    );
  });

  it("moves the icon after the label when iconPosition is end", () => {
    render(<Chip label="Draft" icon={chevron} iconPosition="end" />);

    expect(getComputedStyle(screen.getByText("expand_more")).order).toBe("1");
  });

  it("keeps the delete icon last when iconPosition is end", () => {
    render(
      <Chip
        label="Draft"
        icon={chevron}
        iconPosition="end"
        onDelete={() => {}}
      />
    );

    expect(getComputedStyle(screen.getByTestId("CancelIcon")).order).toBe("1");
  });

  it("does not leak iconPosition onto the DOM", () => {
    render(<Chip label="Draft" icon={chevron} iconPosition="end" />);

    expect(screen.getByText("Draft").parentElement).not.toHaveAttribute(
      "iconPosition"
    );
  });
});

describe("Chip metrics", () => {
  it.each(["start", "end"] as const)(
    "keeps the %s icon 4px from the label",
    iconPosition => {
      render(<Chip label="Draft" icon={chevron} iconPosition={iconPosition} />);

      expect(
        getComputedStyle(screen.getByText("Draft").parentElement!).gap
      ).toBe("4px");
    }
  );
});
