import Box from "@mui/system/Box";
import { AccountName, AccountNavigation } from "../Header.types";
import Skeleton from "@mui/material/Skeleton";
import AccountButton from "./AccountButton";
import AccountMenu from "./AccountMenu";

type AccountNavProps = {
  isLoggedIn?: boolean;
  accountLoading: boolean;
  accountNavigation?: AccountNavigation;
  linkComponent?: React.ElementType;
  accountName?: AccountName;
};

export default function AccountNav({
  isLoggedIn,
  accountLoading = false,
  accountNavigation,
  linkComponent,
  accountName,
}: AccountNavProps) {
  if (!accountNavigation) {
    return null;
  }

  if (accountLoading) {
    return (
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Skeleton variant="circular" width={36} height={36} />
        <Skeleton variant="rectangular" width={80} height={20} />
      </Box>
    );
  }

  if (isLoggedIn) {
    return (
      <AccountMenu
        accountNavigation={accountNavigation}
        accountName={accountName}
        linkComponent={linkComponent}
      />
    );
  }

  return (
    <AccountButton
      accountNavigation={accountNavigation}
      linkComponent={linkComponent}
    />
  );
}
