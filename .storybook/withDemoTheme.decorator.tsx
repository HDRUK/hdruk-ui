import { HdrukUiProvider } from "../src/providers/HdrukUiProvider";
import { demoThemes } from "./demoThemes";
import type { Decorator } from "@storybook/react-vite";

export const withDemoTheme: Decorator = (Story, context) => {
  const key = (context.globals.theme as string) ?? "base";
  const demo = demoThemes[key] ?? demoThemes.base;

  return (
    <HdrukUiProvider key={key} themeOptions={demo.themeOptions}>
      <Story />
    </HdrukUiProvider>
  );
};
