import {
  createTheme,
  responsiveFontSizes,
  ThemeOptions,
} from "@mui/material/styles";

export const brandColors = {
  seaGreen: {
    main: "#3db28c",
    light: "#6fd3b2",
    dark: "#2a8c6e",
    contrastText: "#fff",
  },
  cornflowerBlue: {
    main: "#475da7",
    light: "#6c7cc0",
    dark: "#354681",
    contrastText: "#fff",
  },
  midnightBlue: { main: "#29235c", contrastText: "#fff" },
  duckEggBlue: { main: "#addad9", contrastText: "#111" },
  slateGrey: { main: "#3c3c3b", contrastText: "#fff" },
  lightGrey: { main: "#d0d3d4", contrastText: "#111" },
  orange: { main: "#f98e2b", contrastText: "#111" },
};

export const themeOptions: ThemeOptions = {
  palette: {
    primary: brandColors.seaGreen,
    secondary: brandColors.cornflowerBlue,
    tertiary: {
      midnightBlue: brandColors.midnightBlue,
      duckEggBlue: brandColors.duckEggBlue,
      slateGrey: brandColors.slateGrey,
      lightGrey: brandColors.lightGrey,
      orange: brandColors.orange,
    },
    link: { main: brandColors.cornflowerBlue.main },
    background: {
      default: "#F2F2F2",
      paper: "#F7F7F7",
    },
    divider: brandColors.lightGrey.main,
  },

  spacing: 8,
  shape: { borderRadius: 8 },

  breakpoints: {
    values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
  },

  typography: {
    fontFamily:
      'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    h1: { fontWeight: 700, fontSize: "2.25rem", lineHeight: 1.2 },
    h2: { fontWeight: 700, fontSize: "1.875rem", lineHeight: 1.25 },
    h3: { fontWeight: 600, fontSize: "1.5rem", lineHeight: 1.3 },
    h4: { fontWeight: 600, fontSize: "1.25rem", lineHeight: 1.35 },
    h5: { fontWeight: 600, fontSize: "1.125rem", lineHeight: 1.4 },
    h6: { fontWeight: 600, fontSize: "1rem", lineHeight: 1.45 },
    subtitle1: { fontWeight: 500 },
    subtitle2: { fontWeight: 500 },
    body1: { fontSize: "1rem", lineHeight: 1.6 },
    body2: { fontSize: "0.875rem", lineHeight: 1.57 },
    button: { textTransform: "none", fontWeight: 600, letterSpacing: 0.2 },
    caption: { fontSize: "0.75rem", lineHeight: 1.4 },
    overline: {
      textTransform: "uppercase",
      letterSpacing: 0.8,
      fontWeight: 600,
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
          borderRadius: theme.shape.borderRadius,
          paddingInline: theme.spacing(2),
          paddingBlock: theme.spacing(1),
        }),
        contained: ({ theme }) => ({
          boxShadow: "none",
          "&:hover": { boxShadow: "none" },
          "&:focus-visible": {
            outline: `2px solid ${theme.palette.secondary.main}`,
            outlineOffset: 2,
          },
        }),
        outlined: ({ theme }) => ({
          borderWidth: 2,
          "&:hover": { borderWidth: 2 },
        }),
        sizeSmall: ({ theme }) => ({
          paddingInline: theme.spacing(1.5),
          paddingBlock: theme.spacing(0.5),
        }),
        sizeLarge: ({ theme }) => ({
          paddingInline: theme.spacing(2.5),
          paddingBlock: theme.spacing(1.25),
        }),
      },
      variants: [
        {
          props: { variant: "text", color: "inherit" },
          style: ({ theme }) => ({
            color: theme.palette.tertiary.slateGrey.main,
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
          }),
        },
        {
          props: { color: "link", variant: "text" },
          style: ({ theme }) => ({
            textDecoration: "underline",
            paddingInline: 0,
            minWidth: 0,
            "&:hover": {
              backgroundColor: "transparent",
              textDecoration: "none",
            },
          }),
        },
      ],
    },
    MuiIconButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
          "&:focus-visible": {
            outline: `2px solid ${theme.palette.secondary.main}`,
            outlineOffset: 2,
          },
        }),
      },
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
          borderRadius: theme.shape.borderRadius,
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.main,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderWidth: 2,
          },
        }),
        input: { paddingBlock: 12, paddingInline: 14 },
      },
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
      defaultProps: { elevation: 0 },
      styleOverrides: {
        paper: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
          border: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.paper,
        }),
        list: {
          paddingBlock: 4,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: (theme.shape.borderRadius as number) - 2,
          marginInline: 4,
          "&.Mui-selected": {
            backgroundColor: theme.palette.action.selected,
          },
        }),
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
          border: `1px solid ${theme.palette.divider}`,
        }),
      },
    },

    /* ----- Chips, Badges, Toggles ----- */
    MuiChip: {
      defaultProps: { size: "small" },
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
          fontWeight: 600,
        }),
      },
    },
    MuiSwitch: {
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
        root: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
          backgroundImage: "none",
          border: `1px solid ${theme.palette.divider}`,
        }),
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
          border: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.paper,
        }),
      },
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
          borderRadius: theme.shape.borderRadius,
          marginInline: theme.spacing(0.5),
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

    /* ----- Misc ----- */
    MuiTooltip: {
      defaultProps: { arrow: true },
      styleOverrides: {
        tooltip: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
        }),
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: ({ theme }) => ({
          borderRadius: (theme.shape.borderRadius as number) + 4,
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

const theme = responsiveFontSizes(createTheme(themeOptions));

export default theme;
