import React from "react";
import { Box, Button, Divider } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuDropdown from "./MenuDropdown";
import { getLinkComponent, headerFocusRingSx } from "../Header.utils";
import { MenuLinkItem } from "../../../types/navigation";

type DesktopNavProps = {
  linkComponent?: React.ElementType;
  navItems: MenuLinkItem[];
  ariaLabel?: string;
};

export default function DesktopNav({
  linkComponent,
  navItems,
  ariaLabel = "Primary navigation",
}: DesktopNavProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [menuItems, setMenuItems] = React.useState<MenuLinkItem[]>([]);
  const [activeLabel, setActiveLabel] = React.useState<string | null>(null);

  const menuId = "header-desktop-menu";

  const handleOpenMenu = (
    el: HTMLElement,
    label: string,
    subItems: { label: string; href: string }[],
  ) => {
    setAnchorEl(el);
    setActiveLabel(label);
    setMenuItems(subItems);
  };

  const handleClose = () => {
    setMenuItems([]);
    setAnchorEl(null);
    setActiveLabel(null);
  };

  return (
    <Box
      component="nav"
      aria-label={ariaLabel}
      sx={{
        display: "flex",
        alignItems: "center",
        ml: 4,
        gap: 1,
      }}
    >
      {navItems.map((item) => {
        if (item.subItems?.length) {
          const open = Boolean(anchorEl) && activeLabel === item.label;

          return (
            <Button
              key={item.label}
              variant="text"
              endIcon={
                <ExpandMoreIcon
                  sx={(theme) => ({
                    color: theme.palette.primary.contrastText,
                  })}
                />
              }
              onClick={(event) =>
                handleOpenMenu(
                  event.currentTarget,
                  item.label,
                  item.subItems || [],
                )
              }
              aria-haspopup="menu"
              aria-controls={open ? menuId : undefined}
              aria-expanded={open ? "true" : "false"}
              sx={(theme) => ({
                color: theme.palette.primary.contrastText,
                ...headerFocusRingSx,
              })}
            >
              {item.label}
            </Button>
          );
        }

        return (
          <React.Fragment key={item.label}>
            <Divider
              orientation="vertical"
              sx={(theme) => ({
                bgcolor: theme.palette.primary.contrastText,
                mx: 1,
              })}
            />

            <Button
              key={item.label}
              sx={(theme) => ({
                ...headerFocusRingSx,
                color: theme.palette.primary.contrastText,
              })}
              variant="text"
              component={getLinkComponent(linkComponent)}
              href={item.href}
            >
              {item.label}
            </Button>
          </React.Fragment>
        );
      })}

      <MenuDropdown
        id={menuId}
        menuItems={menuItems}
        anchorElement={anchorEl}
        handleClose={handleClose}
        linkComponent={linkComponent}
      />
    </Box>
  );
}
