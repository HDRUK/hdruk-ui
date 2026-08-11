import type { ButtonProps } from "../components/Button/Button";
import type {
  PaletteColor,
  PaletteColorOptions,
  ComponentsOverrides,
  ComponentsVariants,
} from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    tertiary: {
      midnightBlue: PaletteColor;
      duckEggBlue: PaletteColor;
      slateGrey: PaletteColor;
      lightGrey: PaletteColor;
      orange: PaletteColor;
    };
    link: Palette["primary"];
  }
  interface PaletteOptions {
    tertiary?: {
      midnightBlue?: PaletteColorOptions;
      duckEggBlue?: PaletteColorOptions;
      slateGrey?: PaletteColorOptions;
      lightGrey?: PaletteColorOptions;
      orange?: PaletteColorOptions;
    };
    link?: PaletteColorOptions;
  }
}

declare module "@mui/material/styles" {
  interface ComponentsPropsList {
    HdrukButton: Partial<ButtonProps>;
  }
  interface ComponentNameToClassKey {
    HdrukButton: "root";
  }
  interface Components<Theme = unknown> {
    HdrukButton?: {
      defaultProps?: ComponentsPropsList["HdrukButton"];
      styleOverrides?: ComponentsOverrides<Theme>["HdrukButton"];
      variants?: ComponentsVariants<Theme>["HdrukButton"];
    };
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    link: true;
  }
}
declare module "@mui/material/Chip" {
  interface ChipPropsColorOverrides {
    link: true;
  }
}
declare module "@mui/material/IconButton" {
  interface IconButtonPropsColorOverrides {
    link: true;
  }
}
declare module "@mui/material/Checkbox" {
  interface CheckboxPropsColorOverrides {
    link: true;
  }
}
declare module "@mui/material/Switch" {
  interface SwitchPropsColorOverrides {
    link: true;
  }
}

export {};
