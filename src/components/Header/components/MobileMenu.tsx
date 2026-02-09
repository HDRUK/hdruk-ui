import IconButton from "@mui/material/IconButton";
import Box from "@mui/system/Box";
import MenuIcon from "@mui/icons-material/Menu";
import MenuDropdown from "./MenuDropdown";
import { AccountNavigation, MenuLinkItem } from "../Header.types";
import { buildMobileMenuItems, headerFocusRingSx } from "../Header.utils";

interface MobileMenuProps {
  accountNavigation?: AccountNavigation;
  handleOpenNavMenu: (event: React.MouseEvent<HTMLElement>) => void;
  setAnchorElement: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  isLoggedIn?: boolean;
  navItems: MenuLinkItem[] | undefined;
  anchorElement: HTMLElement | null;
  linkComponent?: React.ElementType;
}

const MobileMenu = ({
  accountNavigation,
  handleOpenNavMenu,
  setAnchorElement,
  isLoggedIn,
  navItems,
  anchorElement,
  linkComponent,
}: MobileMenuProps) => {
  const menuId = "header-mobile-menu";

  return (
    <Box
      sx={{
        display: { xs: "flex", lg: "none" },
      }}
    >
      <IconButton
        size="large"
        aria-label="navigation menu"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
        sx={{ ...headerFocusRingSx }}
      >
        <MenuIcon htmlColor="white" />
      </IconButton>

      <MenuDropdown
        id={menuId}
        handleClose={() => setAnchorElement(null)}
        menuItems={buildMobileMenuItems({
          isLoggedIn,
          navItems,
          accountNavigation,
        })}
        anchorElement={anchorElement}
        linkComponent={linkComponent}
      />
    </Box>
  );
};

export default MobileMenu;
