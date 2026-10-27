import MuiPaper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { tokens } from "../../theme";

export const SearchBarRoot = styled(MuiPaper, {
  name: "HdrukSearchBar",
  slot: "Root",
})(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  "& .MuiOutlinedInput-notchedOutline": {
    borderStyle: "none",
  },
  "&:focus-within": {
    outline: `${tokens.stroke.thin}px solid ${theme.palette.secondary.main}`,
  },
  variants: [
    {
      props: { elevation: 0 },
      style: {
        border: `${tokens.stroke.thin}px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        "&:hover, &:focus-within": {
          borderColor: theme.palette.secondary.main,
        },
      },
    },
  ],
}));
