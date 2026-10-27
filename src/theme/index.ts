import {
  alpha,
  createTheme,
  Palette,
  PaletteColor,
  SimplePaletteColorOptions,
  Theme,
  ThemeOptions,
} from "@mui/material/styles";
import { deepmerge } from "@mui/utils";
import "../types/themeAugmentation";

export const tokens = {
  brand: {
    primary: "#475DA7",
    primaryHovered: "#384B91",
    accentPrimary: "#C6CEE5",
    secondary: "#2C8267",
    secondaryHovered: "#267259",
    accentSecondary: "#B8E2D8",
  },
  status: {
    default: "#FFFFFF",
    grey: "#E2E2E2",
    hovered: "#EEEEEE",
    selected: "#2C8267",
    information: "#29235C",
    faded: "#868E96",
    disabled: "#E2E2E2",
    keyboardFocus: "#4682B4",
    success: "#2C8267",
    successHover: "#1C553F",
    error: "#DC3645",
    errorHover: "#C02531",
    warning: "#F2D12D",
    warningHover: "#F0BB24",
    needsAction: "#FE9A2D",
    needsActionHover: "#F27F28",
    archived: "#53575A",
    archivedHovered: "#3C3C3B",
    announcement: "#FBE71E",
  },
  background: {
    white: "#FFFFFF",
    primary: "#F6F7F8",
    secondary: "#E2E2E2",
    error: "#FFECF1",
    warning: "#FDFCE6",
    success: "#E2F3F0",
    information: "#E9ECF4",
  },
  text: {
    primaryBlack: "#262626",
    secondaryBlack: "#3C3C3B",
    primaryWhite: "#FFFFFF",
    secondaryWhite: "#EEEEEE",
    faded: "#53575A",
    disabled: "#868E96",
    error: "#C02531",
    warning: "#856505",
  },
  stroke: { thin: 1, medium: 2, thick: 3 },
  radius: { none: 0, small: 4, medium: 8, large: 12, pill: 24 },
  iconSize: { small: 20, medium: 24, large: 40 },
  iconWeight: 300,
  elevation: {
    2: "-3px -3px 4px 0 rgba(0, 0, 0, 0.03), 3px 3px 6px 0 rgba(0, 0, 0, 0.09)",
  },
} as const;

export const focusRing = (theme: Theme) => ({
  outline: `${tokens.stroke.thick}px solid ${theme.palette.status.keyboardFocus}`,
  outlineOffset: tokens.stroke.medium,
});

const statusChip = (
  color: "needsAction" | "archived",
  swatch: (
    palette: Palette
  ) => Pick<PaletteColor, "main" | "dark" | "contrastText">
) => [
  {
    props: { variant: "filled" as const, color },
    style: ({ theme }: { theme: Theme }) => {
      const { main, dark, contrastText } = swatch(theme.palette);
      return {
        backgroundColor: main,
        color: contrastText,
        "&.MuiChip-clickable:hover, &.Mui-focusVisible": {
          backgroundColor: dark,
        },
        "& .MuiChip-deleteIcon": {
          color: alpha(contrastText, 0.7),
          "&:hover, &:active": { color: contrastText },
        },
      };
    },
  },
  {
    props: { variant: "outlined" as const, color },
    style: ({ theme }: { theme: Theme }) => {
      const { main, dark } = swatch(theme.palette);
      return {
        color: main,
        borderColor: main,
        "&.MuiChip-clickable:hover": { borderColor: dark },
        "& .MuiChip-deleteIcon": {
          color: alpha(main, 0.7),
          "&:hover, &:active": { color: main },
        },
      };
    },
  },
];

const calendarCellButton = (theme: Theme) => ({
  ...theme.typography.h5,
  fontWeight: theme.typography.fontWeightRegular,
  color: tokens.text.secondaryBlack,
  borderRadius: tokens.radius.pill,
  "&:focus": { backgroundColor: "transparent" },
  "&:hover": { backgroundColor: theme.palette.status.hovered },
  "&:focus-visible": focusRing(theme),
  "&.Mui-disabled": { color: theme.palette.text.disabled },
  "&.Mui-selected": {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    "&:focus": { backgroundColor: theme.palette.primary.main },
    "&:hover": { backgroundColor: theme.palette.primary.dark },
  },
});

export const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: tokens.brand.primary,
      dark: tokens.brand.primaryHovered,
      light: tokens.brand.accentPrimary,
      contrastText: tokens.text.primaryWhite,
    },
    secondary: {
      main: tokens.brand.secondary,
      dark: tokens.brand.secondaryHovered,
      light: tokens.brand.accentSecondary,
      contrastText: tokens.text.primaryWhite,
    },
    success: {
      main: tokens.status.success,
      dark: tokens.status.successHover,
      light: tokens.background.success,
      contrastText: tokens.text.primaryWhite,
    },
    error: {
      main: tokens.status.error,
      dark: tokens.status.errorHover,
      light: tokens.background.error,
      contrastText: tokens.text.primaryWhite,
    },
    warning: {
      main: tokens.status.warning,
      dark: tokens.status.warningHover,
      light: tokens.background.warning,
      contrastText: tokens.text.warning,
    },
    info: {
      main: tokens.status.information,
      light: tokens.background.information,
      contrastText: tokens.text.primaryWhite,
    },
    text: {
      primary: tokens.text.primaryBlack,
      secondary: tokens.text.faded,
      disabled: tokens.text.disabled,
    },
    background: {
      default: tokens.background.primary,
      paper: tokens.background.white,
      secondary: tokens.background.secondary,
    },
    divider: tokens.background.secondary,
    link: {
      main: tokens.brand.primary,
      dark: tokens.brand.primaryHovered,
      light: tokens.brand.accentPrimary,
      contrastText: tokens.text.primaryWhite,
    },

    brand: tokens.brand,
    status: {
      default: tokens.status.default,
      grey: tokens.status.grey,
      hovered: tokens.status.hovered,
      selected: tokens.status.selected,
      faded: tokens.status.faded,
      disabled: tokens.status.disabled,
      keyboardFocus: tokens.status.keyboardFocus,
      needsAction: tokens.status.needsAction,
      needsActionHover: tokens.status.needsActionHover,
      archived: tokens.status.archived,
      archivedHovered: tokens.status.archivedHovered,
      announcement: tokens.status.announcement,
    },
  },

  spacing: 8,
  shape: { borderRadius: tokens.radius.small },

  breakpoints: {
    values: {
      xs: 0, // mobile
      sm: 640, // tablet
      md: 1024, // laptop
      lg: 1280, // desktop
      xl: 1536, // large desktop
    },
  },

  typography: {
    fontFamily:
      '"Source Sans 3", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    h1: { fontWeight: 600, fontSize: "2.5rem", lineHeight: 1.2 }, // 40
    h2: { fontWeight: 600, fontSize: "2rem", lineHeight: 1.25 }, // 32
    h3: { fontWeight: 600, fontSize: "1.75rem", lineHeight: 1.3 }, // 28
    h4: { fontWeight: 600, fontSize: "1.5rem", lineHeight: 1.35 }, // 24
    h5: { fontWeight: 600, fontSize: "1.25rem", lineHeight: 1.4 }, // 20
    h6: { fontWeight: 600, fontSize: "1.125rem", lineHeight: 1.45 }, // 18
    // Headers/Article Lead — 20px Regular, a heading-scale size at body weight
    articleLead: { fontWeight: 400, fontSize: "1.25rem", lineHeight: "normal" },
    subtitle1: { fontWeight: 600 },
    subtitle2: { fontWeight: 600 },
    body1: { fontSize: "1rem", lineHeight: 1.6 }, // Body/Large 16
    body2: { fontSize: "0.875rem", lineHeight: 1.57 }, // Body/Medium 14
    bodySmall: { fontSize: "0.8125rem" }, // Body/Small 13
    button: {
      textTransform: "none",
      fontWeight: 400,
      letterSpacing: 0.2,
    },
    caption: { fontSize: "0.75rem", lineHeight: 1.4 }, // Body/X-Small 12
    bodyXxSmall: { fontSize: "0.625rem" }, // Body/X-X-Small 10
    overline: {
      textTransform: "uppercase",
      letterSpacing: 0.8,
      fontWeight: 600,
      fontSize: "0.75rem",
    },
  },

  zIndex: {
    drawer: 2,
  },

  components: {
    /* ----- Buttons ----- */
    MuiButtonBase: {
      defaultProps: { disableRipple: true },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        variant: "contained",
        color: "primary",
      },
      styleOverrides: {
        root: ({ theme }) => ({
          minHeight: theme.spacing(5),
          padding: theme.spacing(1, 1.5),
          lineHeight: "1.5rem",
          "&:focus-visible": focusRing(theme),
          "&.Mui-disabled": {
            backgroundColor: theme.palette.status.disabled,
            borderColor: theme.palette.status.disabled,
            color: theme.palette.text.disabled,
          },
        }),
        contained: () => ({
          boxShadow: "none",
          "&:hover": { boxShadow: "none" },
        }),
        outlined: ({ theme }) => ({
          borderWidth: tokens.stroke.medium,
          "--variant-outlinedBorder": "currentColor",
          padding: theme.spacing(0.75, 1.25),
          "&:hover, &.Mui-disabled": { borderWidth: tokens.stroke.medium },
        }),
        outlinedSizeSmall: ({ theme }) => ({
          padding: theme.spacing(0.25, 1.25),
        }),
        sizeSmall: ({ theme }) => ({
          minHeight: theme.spacing(3.5),
          lineHeight: "1.25rem",
          padding: theme.spacing(0.5, 1.5),
        }),
      },
      variants: [
        {
          props: { variant: "contained", color: "primary" },
          style: ({ theme }) => ({
            "&:focus-visible": {
              backgroundColor: theme.palette.primary.dark,
            },
          }),
        },
        {
          props: { variant: "contained", color: "error" },
          style: ({ theme }) => ({
            "&:focus-visible": {
              backgroundColor: theme.palette.error.dark,
            },
          }),
        },
        {
          props: { variant: "outlined", color: "inherit" },
          style: ({ theme }) => ({
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.background.paper,
            borderWidth: tokens.stroke.thin,
            borderColor: theme.palette.status.faded,
            padding: theme.spacing(0.875, 1.375),
            "&:hover, &.Mui-disabled": { borderWidth: tokens.stroke.thin },
            "&:hover, &:focus-visible": {
              backgroundColor: theme.palette.status.hovered,
            },
          }),
        },
        {
          props: { variant: "outlined", color: "inherit", size: "small" },
          style: ({ theme }) => ({
            padding: theme.spacing(0.375, 1.375),
          }),
        },
        {
          props: { variant: "outlined", color: "secondary" },
          style: ({ theme }) => ({
            color: theme.palette.text.primary,
            borderColor: theme.palette.secondary.main,
            "&:hover, &:focus-visible": {
              backgroundColor: theme.palette.secondary.dark,
              borderColor: theme.palette.secondary.dark,
              color: theme.palette.secondary.contrastText,
            },
          }),
        },
        {
          props: { variant: "text", color: "inherit" },
          style: ({ theme }) => ({
            color: tokens.text.secondaryBlack,
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
          }),
        },
        {
          props: { color: "link", variant: "text" },
          style: ({ theme }) => ({
            padding: 0,
            minWidth: 0,
            minHeight: 0,
            borderRadius: 0,
            lineHeight: 1.3,
            textDecoration: "none",
            "&:hover": {
              backgroundColor: "transparent",
              textDecoration: "underline",
            },
            "&.Mui-disabled": {
              backgroundColor: "transparent",
              color: theme.palette.text.disabled,
            },
          }),
        },
        {
          props: { color: "link", variant: "text", size: "small" },
          style: ({ theme }) => ({
            fontSize: theme.typography.bodySmall.fontSize,
          }),
        },
      ],
    },
    MuiIconButton: {
      defaultProps: {
        size: "small",
      },
      styleOverrides: {
        // Deliberately no border or background here — a site theme adds those
        // if it wants them, so consumers don't inherit a bordered icon button
        // they never asked for.
        root: ({ theme }) => ({
          padding: theme.spacing(0.375),
          // Icons inherit the button's font-size, so size is set in one place.
          "& .MuiIcon-root, & .MuiSvgIcon-root": { fontSize: "inherit" },
          "&:hover": { backgroundColor: theme.palette.status.hovered },
          "&:focus-visible": {
            ...focusRing(theme),
            backgroundColor: theme.palette.background.secondary,
          },
          "&.Mui-disabled": {
            color: theme.palette.text.disabled,
          },
        }),
        sizeSmall: ({ theme }) => ({
          fontSize: theme.typography.pxToRem(tokens.iconSize.medium),
        }),
        sizeMedium: ({ theme }) => ({
          fontSize: theme.typography.pxToRem(tokens.iconSize.large),
        }),
        sizeLarge: ({ theme }) => ({
          padding: theme.spacing(1.5),
        }),
      },
      variants: [
        {
          props: { color: "default" },
          style: ({ theme }) => ({ color: theme.palette.text.secondary }),
        },
        {
          props: { color: "inherit" },
          style: ({ theme }) => ({
            "&:hover, &:focus-visible": {
              backgroundColor: `color-mix(in srgb, currentColor ${theme.palette.action.focusOpacity * 100}%, transparent)`,
            },
          }),
        },
      ],
    },

    /* ----- Inputs / TextFields ----- */
    MuiFormLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontWeight: 600,
          color: theme.palette.text.secondary,
        }),
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          "&.Mui-focused": {
            color: theme.palette.primary.main,
          },
        }),
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.secondary.main,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderWidth: tokens.stroke.medium,
            borderColor: theme.palette.secondary.main,
          },
        }),
        input: ({ theme, ownerState }) =>
          ownerState.multiline
            ? { padding: 0 }
            : {
                padding: theme.spacing(1.5, 1.75),
                paddingTop: theme.spacing(1.5),
              },
      },
      variants: [
        {
          props: { multiline: true },
          style: ({ theme }) => ({
            padding: theme.spacing(1.5, 1.75),
            paddingTop: theme.spacing(1.5),
          }),
        },
      ],
    },
    MuiFilledInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
          backgroundColor: theme.palette.background.paper,
          "&:before": { borderBottomWidth: 2 },
        }),
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        size: "medium",
        fullWidth: true,
      },
    },

    /* ----- Selects / Menus / Dropdowns ----- */
    MuiSelect: {
      defaultProps: { displayEmpty: true },
      styleOverrides: {
        outlined: ({ theme }) => ({
          "& .MuiSelect-icon": { color: theme.palette.text.secondary },
        }),
      },
    },
    MuiMenu: {
      // List's padding comes from a MUI `variants` entry, which is emitted
      // after theme styleOverrides — so no `list` slot value can win. Turning
      // the variant off is the only way to make the list flush.
      defaultProps: {
        elevation: 0,
        slotProps: { list: { disablePadding: true } },
      },
      styleOverrides: {
        paper: ({ theme }) => ({
          borderRadius: tokens.radius.none,
          border: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.paper,
        }),
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          "&:hover": {
            backgroundColor: theme.palette.status.hovered,
          },
          "&.Mui-selected, &.Mui-selected:is(:hover, :focus)": {
            backgroundColor: theme.palette.status.grey,
          },
        }),
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: ({ theme }) => ({
          borderRadius: tokens.radius.none,
          border: `1px solid ${theme.palette.divider}`,
        }),
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: tokens.radius.none,
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          borderRadius: tokens.radius.none,
        },
      },
    },

    /* ----- Chips, Badges, Toggles ----- */
    MuiChip: {
      defaultProps: { size: "small" },
      styleOverrides: {
        root: ({ theme }) => ({
          height: "auto",
          minHeight: theme.spacing(3.5),
          padding: theme.spacing(0.5, 1.5),
          gap: theme.spacing(0.5),
          borderRadius: tokens.radius.pill,
          fontSize: theme.typography.bodySmall.fontSize,
          fontWeight: theme.typography.fontWeightRegular,
          lineHeight: "1.25rem",
          "&.Mui-focusVisible": focusRing(theme),
          "&.Mui-disabled": {
            opacity: 1,
            backgroundColor: theme.palette.status.disabled,
            borderColor: theme.palette.status.disabled,
            color: theme.palette.text.disabled,
          },
        }),
        outlined: ({ theme }) => ({
          padding: theme.spacing(0.375, 1.375),
          backgroundColor: theme.palette.background.paper,
          "&.MuiChip-clickable:hover": {
            backgroundColor: theme.palette.background.default,
          },
          "&.Mui-focusVisible": {
            backgroundColor: theme.palette.background.paper,
          },
        }),
        label: { padding: 0 },
        icon: ({ theme }) => ({
          margin: 0,
          fontSize: theme.typography.pxToRem(tokens.iconSize.small),
        }),
        avatar: { margin: 0 },
        deleteIcon: { margin: 0 },
      },
      variants: [
        {
          props: { color: "warning" },
          style: { color: tokens.text.secondaryBlack },
        },
        {
          props: { variant: "outlined", color: "default" },
          style: ({ theme }) => ({
            borderColor: tokens.text.secondaryBlack,
            "&.MuiChip-clickable:hover": {
              backgroundColor: theme.palette.status.hovered,
            },
          }),
        },
        ...(["primary", "success", "warning", "error"] as const).map(color => ({
          props: { variant: "outlined" as const, color },
          style: ({ theme }: { theme: Theme }) => ({
            borderColor: theme.palette[color].main,
            "&.MuiChip-clickable:hover": {
              borderColor: theme.palette[color].dark,
            },
          }),
        })),
        ...statusChip("needsAction", ({ status, text }) => ({
          main: status.needsAction,
          dark: status.needsActionHover,
          contrastText: text.primary,
        })),
        {
          props: { variant: "outlined", color: "needsAction" },
          style: { color: tokens.text.secondaryBlack },
        },
        ...statusChip("archived", ({ status, common }) => ({
          main: status.archived,
          dark: status.archivedHovered,
          contrastText: common.white,
        })),
      ],
    },
    HdrukChip: {
      variants: [
        {
          props: { iconPosition: "end" },
          style: { "& .MuiChip-icon, & .MuiChip-deleteIcon": { order: 1 } },
        },
      ],
    },

    /* ----- Date pickers ----- */
    MuiDateCalendar: {
      styleOverrides: {
        root: ({ theme }) => ({
          width: theme.spacing(45.5),
          [theme.breakpoints.down("sm")]: { width: theme.spacing(38.5) },
          height: "auto",
          maxHeight: "none",
          overflow: "visible",
        }),
      },
    },
    MuiPickersCalendarHeader: {
      styleOverrides: {
        root: ({ theme }) => ({
          display: "grid",
          gridTemplateColumns: "auto 1fr auto",
          alignItems: "center",
          marginTop: 0,
          marginBottom: theme.spacing(1),
          paddingLeft: 0,
          paddingRight: 0,
          "& .MuiPickersArrowSwitcher-root": { display: "contents" },
          "& .MuiPickersArrowSwitcher-spacer": { display: "none" },
          "& .MuiPickersArrowSwitcher-previousIconButton": {
            gridColumn: 1,
            gridRow: 1,
          },
          "& .MuiPickersArrowSwitcher-nextIconButton": {
            gridColumn: 3,
            gridRow: 1,
          },
        }),
        labelContainer: ({ theme }) => ({
          ...theme.typography.h3,
          color: tokens.text.secondaryBlack,
          gridColumn: 2,
          gridRow: 1,
          justifySelf: "center",
          marginRight: 0,
          overflow: "visible",
        }),
      },
    },
    MuiPickersArrowSwitcher: {
      styleOverrides: {
        button: ({ theme }) => ({
          fontSize: theme.typography.pxToRem(tokens.iconSize.medium),
          marginLeft: 0,
          marginRight: 0,
        }),
      },
    },
    MuiDayCalendar: {
      styleOverrides: {
        weekDayLabel: ({ theme }) => ({
          ...theme.typography.bodySmall,
          fontWeight: theme.typography.fontWeightMedium,
          color: tokens.text.secondaryBlack,
          width: theme.spacing(5),
          height: theme.spacing(5),
          margin: theme.spacing(0, 0.75),
          [theme.breakpoints.down("sm")]: { margin: theme.spacing(0, 0.25) },
        }),
        // Each row's margin plus this padding leaves room for a day's focus
        // ring, which the month container and slide transition would clip.
        monthContainer: {
          padding: `${tokens.stroke.thin}px 0`,
        },
        weekContainer: ({ theme }) => ({
          margin: theme.spacing(0.5, 0),
        }),
        slideTransition: ({ theme }) => ({
          minHeight: `calc(${theme.spacing(33.5)} + ${2 * tokens.stroke.thin}px)`,
        }),
        loadingContainer: ({ theme }) => ({
          minHeight: `calc(${theme.spacing(33.5)} + ${2 * tokens.stroke.thin}px)`,
        }),
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          ...theme.typography.h5,
          fontWeight: theme.typography.fontWeightRegular,
          width: theme.spacing(5),
          height: theme.spacing(5),
          color: tokens.text.secondaryBlack,
          ...(ownerState.disableMargin
            ? {}
            : {
                margin: theme.spacing(0, 0.75),
                [theme.breakpoints.down("sm")]: {
                  margin: theme.spacing(0, 0.25),
                },
              }),
          ...(ownerState.isDayOutsideMonth
            ? { color: theme.palette.text.disabled }
            : {}),
          ...(ownerState.isDayCurrent && !ownerState.disableHighlightToday
            ? {
                "&:not(.Mui-selected)": {
                  border: `${tokens.stroke.thin}px solid ${theme.palette.primary.main}`,
                },
              }
            : {}),
          "&:focus": {
            backgroundColor: "transparent",
            "&.Mui-selected": { backgroundColor: theme.palette.primary.main },
          },
          "@media (pointer: fine)": {
            "&:hover": { backgroundColor: theme.palette.status.hovered },
            "&.Mui-selected:hover": {
              backgroundColor: theme.palette.primary.dark,
            },
          },
          "&:focus-visible": focusRing(theme),
        }),
      },
    },
    MuiDesktopDatePicker: {
      defaultProps: { yearsPerRow: 3 },
    },
    MuiMonthCalendar: {
      styleOverrides: {
        root: { marginLeft: "auto", marginRight: "auto" },
        button: ({ theme }) => calendarCellButton(theme),
      },
    },
    MuiYearCalendar: {
      styleOverrides: {
        root: { marginLeft: "auto", marginRight: "auto" },
        button: ({ theme }) => calendarCellButton(theme),
      },
    },

    MuiSwitch: {
      defaultProps: { slotProps: { input: { role: "switch" } } },
      styleOverrides: {
        switchBase: ({ theme }) => ({
          "&.Mui-checked + .MuiSwitch-track": {
            backgroundColor: theme.palette.primary.main,
          },
        }),
        track: ({ theme }) => ({
          opacity: 1,
          backgroundColor: theme.palette.grey[300],
        }),
      },
    },

    /* ----- Surfaces ----- */
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
    },
    MuiToolbar: {
      styleOverrides: {
        root: ({ theme }) => ({
          gap: theme.spacing(1),
        }),
      },
    },

    /* ----- Lists & Nav ----- */
    MuiListItemButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          "&.Mui-selected": {
            backgroundColor: theme.palette.action.selected,
          },
        }),
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.secondary,
          minWidth: 36,
        }),
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderColor: theme.palette.divider,
        }),
      },
    },

    /* ----- Feedback ----- */
    MuiAlert: {
      defaultProps: { variant: "filled" },
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
        }),
      },
    },
    MuiSnackbarContent: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
        }),
      },
    },
    HdrukLoading: {
      defaultProps: { color: "secondary" },
    },

    /* ----- Misc ----- */
    MuiTypography: {
      defaultProps: { variant: "body2" },
    },
    MuiCssBaseline: {
      styleOverrides: theme => ({
        body: {
          fontSize: theme.typography.body2.fontSize,
          lineHeight: theme.typography.body2.lineHeight,
        },
      }),
    },
    MuiIcon: {
      styleOverrides: {
        root: {
          fontVariationSettings: `'wght' ${tokens.iconWeight}`,
        },
        fontSizeLarge: ({ theme }) => ({
          fontSize: theme.typography.pxToRem(tokens.iconSize.large),
        }),
      },
    },
    MuiTooltip: {
      defaultProps: { arrow: true },
      styleOverrides: {
        tooltip: ({ theme }) => ({
          backgroundColor: theme.palette.info.main,
          color: theme.palette.info.contrastText,
          fontSize: theme.typography.bodySmall.fontSize,
          padding: theme.spacing(2),
          maxWidth: 395,
        }),
        arrow: ({ theme }) => ({
          color: theme.palette.info.main,
        }),
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: ({ theme }) => ({
          height: 3,
          borderRadius: 3,
          backgroundColor: theme.palette.primary.main,
        }),
      },
    },
    MuiTab: {
      styleOverrides: {
        root: ({ theme }) => ({
          textTransform: "none",
          fontWeight: 600,
          "&.Mui-selected": { color: theme.palette.text.primary },
        }),
      },
    },
  },
};

const theme = createTheme(themeOptions);

/**
 * Fill in the shades of a palette colour. Anything not supplied is derived from
 * `main`, so a site states one value and gets a complete colour back — the
 * shades MUI needs for hover and contrast, matched to the site's own colour
 * rather than inherited from the base.
 *
 * ```ts
 * createHdrukTheme({ palette: { primary: createColor("#a4177f") } });
 * createHdrukTheme({ palette: { primary: createColor({ main: "#a4177f", dark: "#4a0033" }) } });
 * ```
 */
export function createColor(
  color: string | SimplePaletteColorOptions
): PaletteColor {
  return theme.palette.augmentColor({
    color: typeof color === "string" ? { main: color } : color,
  });
}

/**
 * Build a site theme on top of the HDR base. A product supplies only what
 * differs; the base is applied here.
 *
 * A site overriding a palette colour should state `light`, `dark` and
 * `contrastText` alongside `main` — the base's are kept otherwise, and they
 * were chosen for the base's colour.
 */
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
type SlotRecord = Record<string, any>;

export function createHdrukTheme(siteOptions: ThemeOptions = {}): Theme {
  const merged = deepmerge(themeOptions, siteOptions);

  const baseComps = (themeOptions.components ?? {}) as SlotRecord;
  const siteComps = (siteOptions.components ?? {}) as SlotRecord;
  const outComps = (merged.components ?? {}) as SlotRecord;

  for (const name in siteComps) {
    const baseOverrides = baseComps[name]?.styleOverrides;
    const siteOverrides = siteComps[name]?.styleOverrides;

    // A site keeps the base's styling unless it overrides that specific
    // property. deepmerge gets object-on-object slots right and keeps site-only
    // ones, but it cannot merge a slot *function* — it can't call one, so it
    // replaces and one side's styles vanish. One uniform rule for every
    // colliding slot: merge base-then-site, calling whichever side is a
    // function. Anything deepmerge already handled is left untouched.
    if (baseOverrides && siteOverrides) {
      const mergedOverrides = outComps[name].styleOverrides;

      for (const slot in siteOverrides) {
        const baseSlot = baseOverrides[slot];
        if (baseSlot === undefined) continue;

        const siteSlot = siteOverrides[slot];
        const baseIsFn = typeof baseSlot === "function";
        const siteIsFn = typeof siteSlot === "function";

        if (baseIsFn || siteIsFn) {
          mergedOverrides[slot] = (params: SlotRecord) =>
            deepmerge(
              baseIsFn ? baseSlot(params) : baseSlot,
              siteIsFn ? siteSlot(params) : siteSlot
            );
        }
      }
    }

    // `variants` is an array, and deepmerge replaces arrays outright — so a
    // site declaring any variants would silently drop every base one (which is
    // where the purpose styling lives). Concatenate instead, base first so a
    // site entry matching the same props still wins.
    const baseVariants = baseComps[name]?.variants;
    const siteVariants = siteComps[name]?.variants;

    if (Array.isArray(baseVariants) && Array.isArray(siteVariants)) {
      outComps[name].variants = [...baseVariants, ...siteVariants];
    }
  }

  return createTheme(merged);
}

export default theme;
