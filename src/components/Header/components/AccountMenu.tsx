import Box from "@mui/system/Box";
import Button from "@mui/material/Button";
import MenuDropdown from "./MenuDropdown";
import React from "react";
import { AccountName, AccountNavigation } from "../Header.types";
import InitialsBadge from "./InitialsBadge";
import { headerFocusRingSx } from "../Header.utils";

type AccountMenuProps = {
  accountNavigation?: AccountNavigation;
  linkComponent?: React.ElementType;
  accountName?: AccountName;
};

export default function AccountMenu({
  accountNavigation,
  linkComponent,
  accountName,
}: AccountMenuProps) {
  const [anchorElement, setAnchorElement] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const handleClose = () => setAnchorElement(null);

  const menuId = "header-account-menu";

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <InitialsBadge
          fullName={`${accountName?.first ?? ""} ${accountName?.last ?? ""}`}
        />

        <Button
          disableRipple
          sx={(theme) => ({
            ...headerFocusRingSx,
            marginLeft: "5px",
            color: theme.palette.common.white,
          })}
          variant="text"
          onClick={handleOpen}
          aria-haspopup="menu"
          aria-controls={anchorElement ? menuId : undefined}
          aria-expanded={anchorElement ? "true" : "false"}
        >
          {accountName?.first ?? "Account"}
        </Button>
      </Box>

      {accountNavigation && (
        <MenuDropdown
          id={menuId}
          anchorElement={anchorElement}
          handleClose={handleClose}
          menuItems={[
            ...(accountNavigation.profile ? [accountNavigation.profile] : []),
            ...(accountNavigation.items ? accountNavigation.items : []),
            ...(accountNavigation.logout ? [accountNavigation.logout] : []),
          ]}
          linkComponent={linkComponent}
        />
      )}
    </>
  );
}
