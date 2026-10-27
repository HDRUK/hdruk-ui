import Switch from "@mui/material/Switch";
import { render, screen } from "../../test/renderWithTheme";

describe("switch semantics", () => {
  it("keeps the switch role when a caller names the input through slotProps", () => {
    render(<Switch slotProps={{ input: { "aria-label": "Enabled" } }} />);

    expect(screen.getByRole("switch", { name: "Enabled" })).toBeInTheDocument();
  });
});
