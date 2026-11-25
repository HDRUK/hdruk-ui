import * as React from "react";

export interface LeftNavContextValue {
  collapsed: boolean;
  animating: boolean;
  duration: number;
  expand: (event: React.SyntheticEvent) => void;
}

export const LeftNavContext = React.createContext<LeftNavContextValue | null>(
  null
);
