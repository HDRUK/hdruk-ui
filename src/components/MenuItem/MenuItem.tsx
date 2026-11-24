"use client";

import * as React from "react";
import {
  ListItemButtonOwnProps,
  ListItemButtonTypeMap,
} from "@mui/material/ListItemButton";
import {
  OverridableComponent,
  OverrideProps,
} from "@mui/material/OverridableComponent";
import { useThemeProps } from "@mui/material/styles";
import {
  MenuItemEndIcon,
  MenuItemIcon,
  MenuItemLabel,
  MenuItemRoot,
} from "./MenuItem.styles";

export interface MenuItemOwnProps extends ListItemButtonOwnProps {
  icon?: React.ReactNode;
  endIcon?: React.ReactNode;
  orientation?: "vertical" | "horizontal" | "centered";
}

export type MenuItemTypeMap<
  AdditionalProps = object,
  RootComponent extends React.ElementType = "div",
> = ListItemButtonTypeMap<AdditionalProps & MenuItemOwnProps, RootComponent>;

export type MenuItemProps<
  RootComponent extends React.ElementType = MenuItemTypeMap["defaultComponent"],
  AdditionalProps = object,
> = OverrideProps<
  MenuItemTypeMap<AdditionalProps, RootComponent>,
  RootComponent
> & { component?: React.ElementType };

export const MenuItem = React.forwardRef<HTMLDivElement, MenuItemProps>(
  function MenuItem(inProps, ref) {
    const {
      icon,
      endIcon,
      children,
      selected = false,
      orientation = "vertical",
      ...rest
    } = useThemeProps({
      props: inProps,
      name: "HdrukMenuItem",
    }) as MenuItemProps;

    const ownerState = { selected, orientation };

    return (
      <MenuItemRoot
        ref={ref}
        selected={selected}
        ownerState={ownerState}
        {...rest}>
        {icon ? <MenuItemIcon>{icon}</MenuItemIcon> : null}
        <MenuItemLabel ownerState={ownerState}>{children}</MenuItemLabel>
        {endIcon ? <MenuItemEndIcon>{endIcon}</MenuItemEndIcon> : null}
      </MenuItemRoot>
    );
  }
) as OverridableComponent<MenuItemTypeMap>;

(MenuItem as { displayName?: string }).displayName = "MenuItem";
