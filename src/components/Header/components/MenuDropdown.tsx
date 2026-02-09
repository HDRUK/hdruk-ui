import { Menu, MenuItem, Typography } from "@mui/material";
import { getLinkComponent } from "../Header.utils";
import { MenuLinkItem } from "../../../types/navigation";

interface MenuDropdownProps {
  id: string;
  title?: string;
  anchorElement: null | HTMLElement;
  menuItems: MenuLinkItem[];
  handleClose: () => void;
  stopPropagation?: boolean;
  linkComponent?: React.ElementType;
}

export default function MenuDropdown({
  id,
  anchorElement,
  menuItems,
  handleClose,
  title,
  stopPropagation,
  linkComponent,
}: MenuDropdownProps) {
  return (
    <Menu
      id={id}
      disableScrollLock
      disableAutoFocusItem
      anchorEl={anchorElement}
      transformOrigin={{ horizontal: "left", vertical: "top" }}
      anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      onClose={(event: React.MouseEvent<HTMLElement>) => {
        if (stopPropagation) {
          event.stopPropagation();
        }
        handleClose();
      }}
      open={Boolean(anchorElement)}
    >
      {menuItems?.map((menuItem) => {
        if (menuItem.subItems) {
          return menuItem?.subItems.map((subItem) => (
            <MenuItem
              sx={(theme) => ({
                maxWidth: 250,
                color: theme.palette.primary.main,
                textWrap: "initial",
                borderBottom: `${theme.palette.divider} 1px solid`,
              })}
              key={subItem.label}
              onClick={handleClose}
              component={getLinkComponent(linkComponent)}
              href={subItem.href}
            >
              <Typography component={"span"}>{subItem.label}</Typography>
            </MenuItem>
          ));
        }
        const ariaLabel = title ? `${menuItem.label} for ${title}` : undefined;

        let onClick: React.MouseEventHandler<HTMLElement> | undefined;

        if (menuItem.href) {
          onClick = () => handleClose();
        } else if (menuItem.action) {
          onClick = (e) => {
            handleClose();
            menuItem.action?.(e);
          };
        } else {
          return null;
        }

        return (
          <MenuItem
            key={menuItem.label}
            sx={(theme) => ({
              maxWidth: 250,
              color: theme.palette.primary.main,
              textWrap: "initial",
              borderBottom: `${theme.palette.divider} 1px solid`,
            })}
            onClick={onClick}
            aria-label={ariaLabel}
            {...(menuItem.href && {
              component: getLinkComponent(linkComponent),
              href: menuItem.href,
            })}
          >
            <Typography component={"span"}>{menuItem.label}</Typography>
          </MenuItem>
        );
      })}
    </Menu>
  );
}
