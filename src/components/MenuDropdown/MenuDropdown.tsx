"use client";

import * as React from "react";
import Collapse, { CollapseProps } from "@mui/material/Collapse";
import { useThemeProps } from "@mui/material/styles";
import { Icon } from "../Icon";
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
      children,
      slotProps,
      ...rest
    } = useThemeProps({ props: inProps, name: "HdrukMenuDropdown" });

    const [expanded, setExpanded] = React.useState(defaultExpanded);

    const id = React.useId();
    const triggerId = `${id}-trigger`;
    const listId = `${id}-list`;

    const handleClick = () => {
      setExpanded(previous => !previous);
    };

    return (
      <MenuDropdownRoot ref={ref} {...rest}>
        <MenuDropdownTrigger
          {...slotProps?.trigger}
          component="button"
          id={triggerId}
          icon={icon}
          endIcon={<Icon name={expanded ? "expand_less" : "expand_more"} />}
          aria-expanded={expanded}
          aria-controls={listId}
          onClick={handleClick}>
          {label}
        </MenuDropdownTrigger>
        <Collapse {...slotProps?.transition} in={expanded}>
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
