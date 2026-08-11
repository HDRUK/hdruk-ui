import { demoThemes } from "./demoThemes";
import { withDemoTheme } from "./withDemoTheme.decorator";
import type { Preview } from "@storybook/react-vite";

const preview: Preview = {
  decorators: [withDemoTheme],

  globalTypes: {
    theme: {
      description: "Demo site theme (QA fixtures, not the real site themes)",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        dynamicTitle: true,
        items: Object.entries(demoThemes).map(([value, { name }]) => ({
          value,
          title: name,
        })),
      },
    },
  },

  initialGlobals: {
    theme: "base",
  },

  parameters: {
    controls: {
      matchers: {
        color: /(background|colour|color)$/i,
        date: /Date$/,
      },
    },
    a11y: {
      test: "todo",
    },
    options: {
      storySort: { method: "alphabetical" },
    },
  },
};

export default preview;
