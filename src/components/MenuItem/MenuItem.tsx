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
import Tooltip from "@mui/material/Tooltip";
import { LeftNavContext } from "../LeftNav/LeftNavContext";
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

    const nav = React.useContext(LeftNavContext);
    const collapsed = Boolean(nav && nav.collapsed);
    const animating = Boolean(nav && nav.animating);
    const duration = nav ? nav.duration : undefined;
    const ownerState = {
      selected,
      orientation,
      collapsed,
      animating,
      duration,
    };

    return (
      <Tooltip title={collapsed ? children : ""} placement="right">
        <MenuItemRoot
          ref={ref}
          selected={selected}
          ownerState={ownerState}
          {...rest}>
          {icon ? <MenuItemIcon>{icon}</MenuItemIcon> : null}
          <MenuItemLabel ownerState={ownerState}>{children}</MenuItemLabel>
          {endIcon ? (
            <MenuItemEndIcon ownerState={ownerState}>{endIcon}</MenuItemEndIcon>
          ) : null}
        </MenuItemRoot>
      </Tooltip>
    );
  }
) as OverridableComponent<MenuItemTypeMap>;

(MenuItem as { displayName?: string }).displayName = "MenuItem";
