import { Box, Container, Typography } from "@mui/material";
import { FooterProps } from "./Footer.types";
import FooterLink from "./components/FooterLink";

const RESET_LIST_SX = {
  pl: 0,
  listStyle: "none",
};

export default function Footer({
  logoImage,
  linkComponent,
  socialLinks,
  copyrightText,
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
          background: footerBackgroundColor ?? theme.palette.primary.main,
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
          {socialLinks?.length && (
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
              {socialLinks.map((item) => (
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

        {linkGroups?.length && (
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
            {linkGroups.map((group) => (
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
