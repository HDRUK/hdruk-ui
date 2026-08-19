import type { ButtonProps } from "../components/Button/Button";
import type {
  PaletteColorOptions,
  ComponentsOverrides,
  ComponentsVariants,
} from "@mui/material/styles";

interface BrandPalette {
  primary: string;
  primaryHovered: string;
  accentPrimary: string;
  secondary: string;
  secondaryHovered: string;
  accentSecondary: string;
}

interface StatusPalette {
  hovered: string;
  selected: string;
  faded: string;
  disabled: string;
  keyboardFocus: string;
  needsAction: string;
  needsActionHover: string;
  archived: string;
  archivedHovered: string;
  announcement: string;
}

declare module "@mui/material/styles" {
  interface Palette {
    brand: BrandPalette;
    status: StatusPalette;
    link: Palette["primary"];
  }
  interface PaletteOptions {
    brand?: Partial<BrandPalette>;
    status?: Partial<StatusPalette>;
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
