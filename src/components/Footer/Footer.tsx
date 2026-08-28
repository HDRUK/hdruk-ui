import { Box, Container, Typography } from "@mui/material";
import hdrukLogoUrl from "../../assets/heath_data_research_gateway_logo_white.svg";
import FooterLink from "./components/FooterLink";
import { FooterProps, SocialLinkItem } from "./Footer.types";

const defaultLogoImage = (
  <img
    src={hdrukLogoUrl}
    alt="HDRUK logo"
    height={50}
    width={110}
    style={{ display: "block", width: "auto" }}
  />
);

const RESET_LIST_SX = {
  pl: 0,
  listStyle: "none",
};

const XSvgIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="currentColor"
    aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInSvgIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="currentColor"
    aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const linksSocial: SocialLinkItem[] = [
  {
    href: "https://x.com/HDR_UK",
    label: "X",
    icon: <XSvgIcon />,
  },
  {
    href: "https://www.linkedin.com/company/hdruk/mycompany/",
    label: "LinkedIn",
    icon: <LinkedInSvgIcon />,
  },
];

const getCopyrightText = () => {
  const copyright = String.fromCodePoint(0x00a9);
  const currentYear = new Date().getFullYear();

  return `${copyright}HDR UK ${currentYear}. All rights reserved.`;
};

export default function Footer({
  logoImage = defaultLogoImage,
  linkComponent,
  socialLinks = linksSocial,
  copyrightText = getCopyrightText(),
  linkGroups,
  footerBackgroundColor,
  sx = {},
}: FooterProps) {
  return (
    <Box
      component="footer"
      sx={[
        theme => ({
          fontSize: theme.typography.body2.fontSize,
          lineHeight: theme.typography.body2.lineHeight,
          background:
            footerBackgroundColor ??
            `linear-gradient(97deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          color: theme.palette.primary.contrastText,
          sx,
        }),
      ]}>
      <Container
        sx={theme => ({
          py: 6,
          display: "flex",
          gap: theme.spacing(8),
          [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
            gap: 2,
          },
        })}>
        <Box sx={{ p: 0 }}>
          {logoImage}
          {(socialLinks?.length ?? 0) > 0 && (
            <Box
              component="ul"
              sx={theme => ({
                textDecoration: "none",
                gap: 3,
                display: "flex",
                [theme.breakpoints.down("sm")]: {
                  flexDirection: "column",
                  gap: 1,
                },
                ...RESET_LIST_SX,
              })}>
              {socialLinks?.map(item => (
                <li key={`${item.label}-${item.href}`}>
                  <FooterLink href={item.href} component={linkComponent}>
                    <Box
                      component="span"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}>
                      {item.icon}
                      <Typography component="span">{item.label}</Typography>
                    </Box>
                  </FooterLink>
                </li>
              ))}
            </Box>
          )}
          <Box>
            {copyrightText ? (
              <Typography variant="body2">{copyrightText}</Typography>
            ) : null}
          </Box>
        </Box>
        {(linkGroups?.length ?? 0) > 0 && (
          <Box
            component="ul"
            sx={theme => ({
              display: "flex",
              gap: 5,
              [theme.breakpoints.down("sm")]: {
                flexDirection: "column",
                gap: 2,
              },
              ...RESET_LIST_SX,
            })}>
            {linkGroups?.map(group => (
              <li key={group.title}>
                <Box
                  component="ul"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5,
                    ...RESET_LIST_SX,
                  }}>
                  {group.items.map(item => (
                    <li key={`${item.label}-${item.href}`}>
                      <FooterLink href={item.href} component={linkComponent}>
                        {item.label}
                      </FooterLink>
                    </li>
                  ))}
                </Box>
              </li>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}
