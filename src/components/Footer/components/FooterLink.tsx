import { Link } from "@mui/material";

type FooterLinkProps = {
  href?: string;
  children: React.ReactNode;
  component?: React.ElementType;
};

const FooterLink = ({ href, children, component = Link }: FooterLinkProps) => {
  const isExternal = !!href && /^(https?:)?\/\//.test(href);

  return (
    <Link
      component={component}
      href={href}
      underline="none"
      sx={(theme) => ({
        color: theme.palette.primary.contrastText,
        textDecoration: "none",
        "&:hover": {
          textDecoration: "underline",
        },
      })}
      {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
    >
      {children}
    </Link>
  );
};

export default FooterLink;
