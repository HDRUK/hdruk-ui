import { Box, Container, Typography } from "@mui/material";
import { FooterProps, SocialLinkItem } from "./Footer.types";
import FooterLink from "./components/FooterLink";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import hdrukLogoUrl from "../../assets/heath_data_research_gateway_logo_white.svg";
const hdrukLogo = new URL(hdrukLogoUrl, import.meta.url).href;

const defaultLogoImage = (
  <img
    src={hdrukLogo}
    alt="cohort discovery logo"
    height={50}
    width={110}
    style={{ display: "block", width: "auto" }}
  />
);

const RESET_LIST_SX = {
  pl: 0,
  listStyle: "none",
};

const linksSocial: SocialLinkItem[] = [
  {
    href: "https://x.com/HDR_UK",
    label: "X",
    icon: <XIcon fontSize="small" />,
  },
  {
    href: "https://www.linkedin.com/company/hdruk/mycompany/",
    label: "LinkedIn",
    icon: <LinkedInIcon fontSize="small" />,
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
        (theme) => ({
          fontSize: theme.typography.body2.fontSize,
          lineHeight: theme.typography.body2.lineHeight,
          background:
            footerBackgroundColor ??
            `linear-gradient(97deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          color: theme.palette.primary.contrastText,
          sx,
        }),
      ]}
    >
      <Container
        sx={(theme) => ({
          py: 6,
          display: "flex",
          gap: theme.spacing(8),
          [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
            gap: 2,
          },
        })}
      >
        <Box sx={{ p: 0 }}>
          {logoImage}
          {(socialLinks?.length ?? 0) > 0 && (
            <Box
              component="ul"
              sx={(theme) => ({
                textDecoration: "none",
                gap: 3,
                display: "flex",
                [theme.breakpoints.down("sm")]: {
                  flexDirection: "column",
                  gap: 1,
                },
                ...RESET_LIST_SX,
              })}
            >
              {socialLinks?.map((item) => (
                <li key={`${item.label}-${item.href}`}>
                  <FooterLink href={item.href} component={linkComponent}>
                    <Box
                      component="span"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
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
            sx={(theme) => ({
              display: "flex",
              gap: 5,
              [theme.breakpoints.down("sm")]: {
                flexDirection: "column",
                gap: 2,
              },
              ...RESET_LIST_SX,
            })}
          >
            {linkGroups?.map((group) => (
              <li key={group.title}>
                <Box
                  component="ul"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5,
                    ...RESET_LIST_SX,
                  }}
                >
                  {group.items.map((item) => (
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
