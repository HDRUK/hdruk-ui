import * as React from "react";
import { AppBar, Container, Toolbar, Link, Box } from "@mui/material";
import { AccountNav, DesktopNav } from "./components";
import MobileMenu from "./components/MobileMenu";
import { getLinkComponent, headerFocusRingSx } from "./Header.utils";
import { HeaderProps } from "./Header.types";
import hdrukLogoUrl from "../../assets/heath_data_research_gateway_logo_white.svg";

const hdrukLogo = new URL(hdrukLogoUrl, import.meta.url).href;

const defaultLogoImage = (
  <img
    src={hdrukLogo}
    alt="HDRUK logo"
    height={50}
    width={110}
    style={{ display: "block", width: "auto" }}
  />
);

export default function Header({
  logoImage = defaultLogoImage,
  logoHref = "/",
  brandingLogoImage,
  brandingLogoHref,
  navItems = [],
  isLoggedIn,
  accountLoading,
  accountNavigation,
  accountName,
  linkComponent,
  focusRingColour,
  accountInitialsColour,
  ariaLabel,
  appBarColour = "primary",
}: HeaderProps) {
  const [anchorElement, setAnchorElement] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const hasNavItems = (navItems?.length ?? 0) > 0;

  return (
    <AppBar
      position={"static"}
      color={appBarColour}
      sx={(theme) => ({
        "--hdruk-header-focus":
          focusRingColour ?? theme.palette.primary.contrastText,
        "--hdruk-header-initials":
          accountInitialsColour ?? theme.palette.primary.main,
      })}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            pt: 1,
            pb: 1,
            justifyContent: hasNavItems ? { md: "initial" } : "space-between",
          }}
        >
          <Box
            sx={{
              alignItems: "center",
              gap: 2,
              mr: 2,
              flexShrink: 0,
              display: { xs: "none", lg: "flex" },
              "& img": { display: "block" },
            }}
          >
            <Link
              component={getLinkComponent(linkComponent)}
              href={logoHref}
              sx={{ ...headerFocusRingSx }}
            >
              {logoImage}
            </Link>

            {brandingLogoImage && (
              <Box sx={{ display: "inline-flex", alignItems: "center" }}>
                {brandingLogoHref ? (
                  <Link
                    component={getLinkComponent(linkComponent)}
                    href={brandingLogoHref}
                    sx={{
                      display: { xs: "none", lg: "flex" },
                      ...headerFocusRingSx,
                    }}
                  >
                    {brandingLogoImage}
                  </Link>
                ) : (
                  brandingLogoImage
                )}
              </Box>
            )}
          </Box>

          <MobileMenu
            accountNavigation={accountNavigation}
            handleOpenNavMenu={handleOpenNavMenu}
            setAnchorElement={setAnchorElement}
            isLoggedIn={isLoggedIn}
            navItems={navItems}
            anchorElement={anchorElement}
            linkComponent={linkComponent}
          />

          <Box
            sx={{
              gap: 2,
              mr: 2,
              flexGrow: 1,
              display: { xs: "flex", lg: "none" },
              justifyContent: { xs: "center", sm: "flex-start" },
            }}
          >
            <Link
              component={getLinkComponent(linkComponent)}
              href={logoHref}
              sx={{
                ml: { sm: 2 },
                mr: { sm: 1 },
                ...headerFocusRingSx,
              }}
            >
              {logoImage}
            </Link>

            {brandingLogoImage &&
              (brandingLogoHref ? (
                <Link
                  component={getLinkComponent(linkComponent)}
                  href={brandingLogoHref}
                  sx={{ ...headerFocusRingSx }}
                >
                  {brandingLogoImage}
                </Link>
              ) : (
                brandingLogoImage
              ))}
          </Box>

          {hasNavItems && (
            <Box sx={{ flexGrow: 1, display: { xs: "none", lg: "flex" } }}>
              <DesktopNav
                navItems={navItems}
                linkComponent={linkComponent}
                ariaLabel={ariaLabel}
              />
            </Box>
          )}

          <Box
            sx={{
              justifySelf: "end",
              flexGrow: hasNavItems ? 0 : 0, // fine either way; kept explicit
              display: { xs: "none", sm: "flex" },
            }}
          >
            <AccountNav
              isLoggedIn={isLoggedIn}
              accountLoading={accountLoading}
              accountNavigation={accountNavigation}
              linkComponent={linkComponent}
              accountName={accountName}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
