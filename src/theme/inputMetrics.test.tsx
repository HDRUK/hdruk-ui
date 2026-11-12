import TextField from "@mui/material/TextField";
import { render, screen } from "../../test/renderWithTheme";
import theme from ".";

const INSET = theme.spacing(1, 1.5);
const SIZES = ["small", "medium"] as const;

describe("outlined input metrics", () => {
  it("states the inset as 8px/12px", () => {
    expect(INSET).toBe("8px 12px");
  });

  it.each(SIZES)("insets a single-line %s field on the field itself", size => {
    render(<TextField size={size} label="Name" />);

    expect(getComputedStyle(screen.getByRole("textbox")).padding).toBe(INSET);
  });

  it.each(SIZES)(
    "moves a multiline %s field's inset to the root so the two do not stack",
    size => {
      render(<TextField size={size} label="Notes" multiline rows={3} />);

      const field = screen.getByRole("textbox");
      const root = field.closest(".MuiOutlinedInput-root")!;

      expect(getComputedStyle(field).padding).toBe("0px");
      expect(getComputedStyle(root).padding).toBe(INSET);
    }
  );
});
