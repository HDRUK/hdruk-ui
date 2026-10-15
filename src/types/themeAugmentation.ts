import type { BannerProps } from "@/components/Banner";
import type { ButtonProps } from "@/components/Button";
import type { DateRangeCalendarProps } from "@/components/DateRangeCalendar";
import type { DateRangePickerProps } from "@/components/DateRangePicker";
import type { IconButtonProps } from "@/components/IconButton";
import type { LoadingProps } from "@/components/Loading";
import type { PickerComponents } from "@mui/x-date-pickers/themeAugmentation";
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
    articleLead: TypographyStyle;
  }
  interface TypographyVariantsOptions {
    bodySmall?: TypographyStyle;
    bodyXxSmall?: TypographyStyle;
    articleLead?: TypographyStyle;
  }
}

// Custom variants have no entry in MUI's variantMapping, so Typography renders
// them as <span>; pass `component` where a block element is wanted.
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    bodySmall: true;
    bodyXxSmall: true;
    articleLead: true;
  }
}

declare module "@mui/material/styles" {
  interface ComponentsPropsList {
    HdrukButton: Partial<ButtonProps>;
    HdrukIconButton: Partial<IconButtonProps>;
    HdrukBanner: Partial<BannerProps>;
    HdrukLoading: Partial<LoadingProps>;
    HdrukDateRangeCalendar: Partial<DateRangeCalendarProps>;
    HdrukDateRangePicker: Partial<DateRangePickerProps>;
  }
  interface ComponentNameToClassKey {
    HdrukButton: "root";
    HdrukIconButton: "root";
    HdrukBanner:
      | "root"
      | "content"
      | "tag"
      | "title"
      | "message"
      | "actions"
      | "action"
      | "suppress"
      | "checkbox"
      | "checkboxIcon"
      | "closeButton";
    HdrukLoading: "root" | "progress" | "label";
    HdrukDateRangeCalendar:
      | "root"
      | "months"
      | "month"
      | "dayCell"
      | "day"
      | "summary"
      | "summaryRange"
      | "summaryCount"
      | "announcement";
    HdrukDateRangePicker:
      | "root"
      | "field"
      | "fieldItem"
      | "label"
      | "hiddenLabel"
      | "input"
      | "dateField"
      | "popover"
      | "dialog"
      | "content"
      | "toolbar"
      | "toolbarTitle"
      | "toolbarHeading"
      | "shortcuts"
      | "shortcut"
      | "footer";
  }
  interface Components<Theme = unknown> extends PickerComponents<Theme> {
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
    HdrukBanner?: {
      defaultProps?: ComponentsPropsList["HdrukBanner"];
      styleOverrides?: ComponentsOverrides<Theme>["HdrukBanner"];
      variants?: ComponentsVariants<Theme>["HdrukBanner"];
    };
    HdrukLoading?: {
      defaultProps?: ComponentsPropsList["HdrukLoading"];
      styleOverrides?: ComponentsOverrides<Theme>["HdrukLoading"];
      variants?: ComponentsVariants<Theme>["HdrukLoading"];
    };
    HdrukDateRangeCalendar?: {
      defaultProps?: ComponentsPropsList["HdrukDateRangeCalendar"];
      styleOverrides?: ComponentsOverrides<Theme>["HdrukDateRangeCalendar"];
      variants?: ComponentsVariants<Theme>["HdrukDateRangeCalendar"];
    };
    HdrukDateRangePicker?: {
      defaultProps?: ComponentsPropsList["HdrukDateRangePicker"];
      styleOverrides?: ComponentsOverrides<Theme>["HdrukDateRangePicker"];
      variants?: ComponentsVariants<Theme>["HdrukDateRangePicker"];
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
