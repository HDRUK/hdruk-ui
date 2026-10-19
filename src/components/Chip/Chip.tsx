"use client";

import * as React from "react";
import MuiChip, { ChipProps as MuiChipProps } from "@mui/material/Chip";
import { styled, useThemeProps } from "@mui/material/styles";

export type ChipIconPosition = "start" | "end";

export interface ChipProps extends MuiChipProps {
  /** Which side of the label `icon` sits on. Defaults to "start". */
  iconPosition?: ChipIconPosition;
}

type ChipOwnerState = ChipProps & { iconPosition: ChipIconPosition };

const ChipRoot = styled(MuiChip, {
  name: "HdrukChip",
  slot: "Root",
})<{ ownerState: ChipOwnerState }>({});

export const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  function Chip(inProps, ref) {
    const props = useThemeProps({ props: inProps, name: "HdrukChip" });
    const { iconPosition = "start", ...rest } = props;

    return (
      <ChipRoot ref={ref} {...rest} ownerState={{ ...rest, iconPosition }} />
    );
  }
);

Chip.displayName = "Chip";
