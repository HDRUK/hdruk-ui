import TextField from "@mui/material/TextField";
import { render, screen } from "../../test/renderWithTheme";
import theme from ".";

const INSET = theme.spacing(1.5, 1.75);

describe("outlined input metrics", () => {
  it("insets a single-line field by 12px/14px on the field itself", () => {
    render(<TextField label="Name" />);

    const style = getComputedStyle(screen.getByRole("textbox"));

    expect(INSET).toBe("12px 14px");
    expect(style.padding).toBe(INSET);
  });

  it("moves a multiline field's inset to the root so the two do not stack", () => {
    render(<TextField label="Notes" multiline rows={3} />);

    const field = screen.getByRole("textbox");
    const root = field.closest(".MuiOutlinedInput-root")!;

    expect(getComputedStyle(field).padding).toBe("0px");
    expect(getComputedStyle(root).padding).toBe(INSET);
  });
});
