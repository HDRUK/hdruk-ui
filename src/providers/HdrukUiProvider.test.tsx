import { render as rtlRender, screen } from "@testing-library/react";
import { HdrukUiProvider } from "./HdrukUiProvider";

const fontLinks = () =>
  document.querySelectorAll(
    'link[rel="stylesheet"][href*="fonts.googleapis.com"]'
  );

describe("HdrukUiProvider font loading", () => {
  it("injects the Google Fonts links by default", () => {
    rtlRender(
      <HdrukUiProvider>
        <span>content</span>
      </HdrukUiProvider>
    );

    expect(fontLinks()).toHaveLength(2);
    expect(
      document.querySelectorAll('link[rel="preconnect"]')
    ).toHaveLength(2);
  });

  it("injects nothing when the app loads its own fonts", () => {
    rtlRender(
      <HdrukUiProvider loadFonts={false}>
        <span>content</span>
      </HdrukUiProvider>
    );

    expect(fontLinks()).toHaveLength(0);
  });

  it("renders its children either way", () => {
    rtlRender(
      <HdrukUiProvider loadFonts={false}>
        <span>content</span>
      </HdrukUiProvider>
    );

    expect(screen.getByText("content")).toBeInTheDocument();
  });
});
