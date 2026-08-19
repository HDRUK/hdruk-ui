import { render as rtlRender, screen } from "@testing-library/react";
import { HdrukUiProvider } from "./HdrukUiProvider";

const fontLinks = () =>
  document.querySelectorAll(
    'link[rel="stylesheet"][href*="fonts.googleapis.com"]'
  );

const preconnects = () =>
  document.querySelectorAll('link[rel="preconnect"]');

describe("HdrukUiProvider font loading", () => {
  it("injects nothing by default, so apps load their own fonts", () => {
    rtlRender(
      <HdrukUiProvider>
        <span>content</span>
      </HdrukUiProvider>
    );

    expect(fontLinks()).toHaveLength(0);
    expect(preconnects()).toHaveLength(0);
  });

  it("injects Source Sans 3 when the text font is opted into", () => {
    rtlRender(
      <HdrukUiProvider loadFonts>
        <span>content</span>
      </HdrukUiProvider>
    );

    expect(fontLinks()).toHaveLength(1);
    expect(fontLinks()[0].getAttribute("href")).toContain("Source+Sans+3");
    expect(preconnects()).toHaveLength(2);
  });

  it("injects Material Symbols Rounded when the icon font is opted into", () => {
    rtlRender(
      <HdrukUiProvider loadIconFont>
        <span>content</span>
      </HdrukUiProvider>
    );

    expect(fontLinks()).toHaveLength(1);
    expect(fontLinks()[0].getAttribute("href")).toContain(
      "Material+Symbols+Rounded"
    );
  });

  it("preconnects only once when both fonts are opted into", () => {
    rtlRender(
      <HdrukUiProvider loadFonts loadIconFont>
        <span>content</span>
      </HdrukUiProvider>
    );

    expect(fontLinks()).toHaveLength(2);
    expect(preconnects()).toHaveLength(2);
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
