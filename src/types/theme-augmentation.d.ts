import "@mui/material/styles";
import { PaletteColor, PaletteColorOptions } from "@mui/material/styles";

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
