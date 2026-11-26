"use client";

import * as React from "react";
import Collapse, { CollapseProps } from "@mui/material/Collapse";
import { useThemeProps } from "@mui/material/styles";
import { useControlled } from "@mui/material/utils";
import { Icon } from "../Icon";
import { LeftNavContext } from "../LeftNav/LeftNavContext";
import {
  MenuDropdownList,
  MenuDropdownRoot,
  MenuDropdownTrigger,
} from "./MenuDropdown.styles";
import type { MenuItemProps } from "../MenuItem";
import type { SxProps, Theme } from "@mui/material/styles";

export interface MenuDropdownProps extends Omit<
  React.ComponentPropsWithoutRef<"div">,
  "onChange"
> {
  label: React.ReactNode;
  icon?: React.ReactNode;
  defaultExpanded?: boolean;
  expanded?: boolean;
  onChange?: (event: React.SyntheticEvent, expanded: boolean) => void;
  slotProps?: {
    trigger?: Partial<
      Omit<
        MenuItemProps,
        | "ref"
        | "onClick"
        | "aria-expanded"
        | "aria-controls"
        | "children"
        | "endIcon"
        | "icon"
        | "id"
        | "component"
      >
    >;
    transition?: Partial<Omit<CollapseProps, "in" | "children">>;
  };
  sx?: SxProps<Theme>;
}

export const MenuDropdown = React.forwardRef<HTMLDivElement, MenuDropdownProps>(
  function MenuDropdown(inProps, ref) {
    const {
      label,
      icon,
      defaultExpanded = false,
      expanded: expandedProp,
      onChange,
      children,
      slotProps,
      ...rest
    } = useThemeProps({ props: inProps, name: "HdrukMenuDropdown" });

    const nav = React.useContext(LeftNavContext);
    const collapsed = Boolean(nav && nav.collapsed);
    const [expanded, setExpanded] = useControlled({
      controlled: expandedProp,
      default: defaultExpanded,
      name: "MenuDropdown",
      state: "expanded",
    });
    const open = expanded && !collapsed;

    const id = React.useId();
    const triggerId = `${id}-trigger`;
    const listId = `${id}-list`;

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      const next = collapsed ? true : !expanded;
      if (nav && collapsed) {
        nav.expand(event);
      }
      setExpanded(next);
      if (onChange) {
        onChange(event, next);
      }
    };

    return (
      <MenuDropdownRoot ref={ref} {...rest}>
        <MenuDropdownTrigger
          {...slotProps?.trigger}
          component="button"
          id={triggerId}
          icon={icon}
          endIcon={
            <Icon name={open ? "keyboard_arrow_up" : "keyboard_arrow_down"} />
          }
          aria-expanded={open}
          aria-controls={listId}
          onClick={handleClick}>
          {label}
        </MenuDropdownTrigger>
        <Collapse {...slotProps?.transition} in={open}>
          <MenuDropdownList
            id={listId}
            role="group"
            aria-labelledby={triggerId}>
            {children}
          </MenuDropdownList>
        </Collapse>
      </MenuDropdownRoot>
    );
  }
);

MenuDropdown.displayName = "MenuDropdown";
