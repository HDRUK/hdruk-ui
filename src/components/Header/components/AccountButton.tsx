import Button from "@mui/material/Button";
import { getLinkComponent } from "../Header.utils";
import { AccountNavigation } from "../Header.types";

interface AccountButtonProps {
  accountNavigation: AccountNavigation;
  linkComponent?: React.ElementType;
}

export default function AccountButton({
  accountNavigation,
  linkComponent,
}: AccountButtonProps) {
  const signIn = accountNavigation?.signIn;
  if (!signIn) {
    return null;
  }

  return signIn.href ? (
    <Button
      size="small"
      variant="outlined"
      sx={(theme) => ({
        color: theme.palette.common.white,
      })}
      component={getLinkComponent(linkComponent)}
      href={signIn.href}
    >
      {signIn.label}
    </Button>
  ) : (
    <Button
      size="small"
      variant="outlined"
      color="secondary"
      sx={(theme) => ({
        color: theme.palette.common.white,
      })}
      onClick={signIn.action}
    >
      {signIn.label}
    </Button>
  );
}
