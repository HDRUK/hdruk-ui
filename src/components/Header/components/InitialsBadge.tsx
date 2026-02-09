import { Box } from "@mui/material";
import { useMemo } from "react";
import { getInitials } from "../Header.utils";
import theme from "../../../theme";

interface InitialsBadgeProps {
  fullName?: string;
  initials?: string;
}

const InitialsBadge = ({
  fullName = "",
  initials = "",
}: InitialsBadgeProps) => {
  const generatedInitials = useMemo(() => {
    if (!fullName) return "";
    return getInitials(fullName);
  }, [fullName]);

  return (
    <Box
      sx={{
        backgroundColor: "var(--hdruk-header-initials)",
        borderRadius: "50%",
        height: 36,
        width: 36,
        color: theme.palette.primary.contrastText,
        fontWeight: "bold",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {initials || generatedInitials}
    </Box>
  );
};

export default InitialsBadge;
