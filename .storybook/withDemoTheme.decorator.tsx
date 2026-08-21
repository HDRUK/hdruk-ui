import { HdrukUiProvider } from "../src/providers/HdrukUiProvider";
import { createHdrukTheme } from "../src/theme";
import { demoThemes } from "./demoThemes";
import type { Decorator } from "@storybook/react-vite";

export const withDemoTheme: Decorator = (Story, context) => {
  const key = (context.globals.theme as string) ?? "base";
  const demo = demoThemes[key] ?? demoThemes.base;

  return (
    <HdrukUiProvider key={key} theme={createHdrukTheme(demo.themeOptions)}>
      <Story />
    </HdrukUiProvider>
  );
};
