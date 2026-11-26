"use client";

import * as React from "react";
import { useTheme, useThemeProps } from "@mui/material/styles";
import { useEventCallback } from "@mui/material/utils";
import { Icon } from "../Icon";
import {
  LeftNavHeader,
  LeftNavHeading,
  LeftNavList,
  LeftNavMobileToggle,
  LeftNavRoot,
  LeftNavToggle,
} from "./LeftNav.styles";
import { LeftNavContext, LeftNavContextValue } from "./LeftNavContext";
import type { SxProps, Theme } from "@mui/material/styles";
import type { TransitionProps } from "@mui/material/transitions";

export interface LeftNavProps extends Omit<
  React.ComponentPropsWithoutRef<"nav">,
  "onChange"
> {
  heading?: React.ReactNode;
  /** Shows labels when true, an icon-only rail when false. Ignored below `sm`. */
  defaultExpanded?: boolean;
  /** Persisting the choice is up to the app. */
  onChange?: (event: React.SyntheticEvent, expanded: boolean) => void;
  expandText?: string;
  collapseText?: string;
  /** Width animation between the rail and the full nav. `0` turns it off. */
  transitionDuration?: TransitionProps["timeout"];
  sx?: SxProps<Theme>;
}

export const LeftNav = React.forwardRef<HTMLElement, LeftNavProps>(
  function LeftNav(inProps, ref) {
    const theme = useTheme();
    const {
      heading,
      defaultExpanded = true,
      onChange,
      expandText = "Expand navigation",
      collapseText = "Collapse navigation",
      transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
      },
      "aria-label": ariaLabel = "Navigation",
      onTransitionEnd,
      children,
      ...rest
    } = useThemeProps({ props: inProps, name: "HdrukLeftNav" });

    const [expanded, setExpanded] = React.useState(defaultExpanded);
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [animating, setAnimating] = React.useState(false);
    const animationTimer =
      React.useRef<ReturnType<typeof setTimeout>>(undefined);
    const listId = `${React.useId()}-list`;
    const collapsed = !expanded;

    const durationFor = (entering: boolean) =>
      (typeof transitionDuration === "number"
        ? transitionDuration
        : transitionDuration[entering ? "enter" : "exit"]) ??
      theme.transitions.duration.standard;

    const ownerState = {
      collapsed,
      mobileOpen,
      animating,
      duration: durationFor(expanded),
    };

    React.useEffect(() => () => clearTimeout(animationTimer.current), []);

    const changeExpanded = useEventCallback(
      (event: React.SyntheticEvent, next: boolean) => {
        setExpanded(next);
        const duration = durationFor(next);
        if (duration > 0) {
          setAnimating(true);
          clearTimeout(animationTimer.current);
          animationTimer.current = setTimeout(
            () => setAnimating(false),
            duration + theme.transitions.duration.shortest
          );
        }
        if (onChange) {
          onChange(event, next);
        }
      }
    );

    const contextValue = React.useMemo<LeftNavContextValue>(
      () => ({
        collapsed,
        animating,
        duration: ownerState.duration,
        expand: event => changeExpanded(event, true),
      }),
      [collapsed, animating, ownerState.duration, changeExpanded]
    );

    const handleTransitionEnd = (event: React.TransitionEvent<HTMLElement>) => {
      if (
        event.target === event.currentTarget &&
        event.propertyName === "width"
      ) {
        clearTimeout(animationTimer.current);
        setAnimating(false);
      }
      if (onTransitionEnd) {
        onTransitionEnd(event);
      }
    };

    const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
      changeExpanded(event, !expanded);
    };

    const handleListClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if ((event.target as HTMLElement).closest("a[href]")) {
        setMobileOpen(false);
      }
    };

    return (
      <LeftNavRoot
        ref={ref}
        aria-label={ariaLabel}
        ownerState={ownerState}
        onTransitionEnd={handleTransitionEnd}
        {...rest}>
        <LeftNavHeader>
          {heading ? (
            <LeftNavHeading ownerState={ownerState}>{heading}</LeftNavHeading>
          ) : null}
          <LeftNavToggle
            aria-label={expanded ? collapseText : expandText}
            aria-expanded={expanded}
            aria-controls={listId}
            onClick={handleToggle}>
            <Icon name={expanded ? "left_panel_close" : "left_panel_open"} />
          </LeftNavToggle>
        </LeftNavHeader>
        <LeftNavMobileToggle
          component="button"
          orientation="horizontal"
          selected={mobileOpen}
          aria-expanded={mobileOpen}
          aria-controls={listId}
          endIcon={
            <Icon
              name={mobileOpen ? "keyboard_arrow_up" : "keyboard_arrow_down"}
            />
          }
          onClick={() => setMobileOpen(!mobileOpen)}>
          {heading ?? ariaLabel}
        </LeftNavMobileToggle>
        <LeftNavContext.Provider value={contextValue}>
          <LeftNavList
            id={listId}
            ownerState={ownerState}
            onClick={handleListClick}>
            {children}
          </LeftNavList>
        </LeftNavContext.Provider>
      </LeftNavRoot>
    );
  }
);

LeftNav.displayName = "LeftNav";
