import type { ButtonProps } from "../components/Button/Button";
import type { IconButtonProps } from "../components/IconButton/IconButton";
import type {
  PaletteColorOptions,
  ComponentsOverrides,
  ComponentsVariants,
  TypographyStyle,
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
  default: string;
  grey: string;
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
  interface TypeBackground {
    secondary: string;
  }
}

declare module "@mui/material/styles" {
  interface TypographyVariants {
    bodySmall: TypographyStyle;
    bodyXxSmall: TypographyStyle;
  }
  interface TypographyVariantsOptions {
    bodySmall?: TypographyStyle;
    bodyXxSmall?: TypographyStyle;
  }
}

// Custom variants have no entry in MUI's variantMapping, so Typography renders
// them as <span>; pass `component` where a block element is wanted.
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    bodySmall: true;
    bodyXxSmall: true;
  }
}

declare module "@mui/material/styles" {
  interface ComponentsPropsList {
    HdrukButton: Partial<ButtonProps>;
    HdrukIconButton: Partial<IconButtonProps>;
  }
  interface ComponentNameToClassKey {
    HdrukButton: "root";
    HdrukIconButton: "root";
  }
  interface Components<Theme = unknown> {
    HdrukButton?: {
      defaultProps?: ComponentsPropsList["HdrukButton"];
      styleOverrides?: ComponentsOverrides<Theme>["HdrukButton"];
      variants?: ComponentsVariants<Theme>["HdrukButton"];
    };
    HdrukIconButton?: {
      defaultProps?: ComponentsPropsList["HdrukIconButton"];
      styleOverrides?: ComponentsOverrides<Theme>["HdrukIconButton"];
      variants?: ComponentsVariants<Theme>["HdrukIconButton"];
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
