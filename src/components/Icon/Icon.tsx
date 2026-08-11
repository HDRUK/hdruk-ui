import * as React from "react";
import { Icon as MuiIcon, IconProps as MuiIconProps } from "@mui/material";

export interface IconProps extends Omit<MuiIconProps, "baseClassName"> {
  name: string;
}

export function Icon({ name, ...props }: IconProps) {
  return (
    <MuiIcon baseClassName="material-symbols-outlined" {...props}>
      {name}
    </MuiIcon>
  );
}

export default Icon;
