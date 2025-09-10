# @hdruk/ui

Common, theme-driven UI for the **HDRUK Tech Team**.  
Built on **MUI v7**, with a shared theme and a small set of reusable components

To be updated....

## Install

```bash
npm i @hdruk/ui
# peer deps (make sure your app has these)
npm i @mui/material @emotion/react @emotion/styled
```

## Example usage

Use the the UiProvider in your next.js package:

```tsx
"use client";

import { ReactNode } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import GlobalStyles from "@mui/material/GlobalStyles";
import { themeOptions } from "./config/theme"; // your app-level overrides
import { HdrukUiProvider } from "@hdruk/ui";

export default function ThemeRegistry({ children }: { children: ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <HdrukUiProvider themeOptions={themeOptions}>
        <GlobalStyles
          styles={{
            body: { margin: 0, width: "100%", height: "100%" },
            main: { height: "100%" },
          }}
        />
        {children}
      </HdrukUiProvider>
    </AppRouterCacheProvider>
  );
}
```

Override the default options:

```tsx
<HdrukUiProvider themeOptions={{ shape: { borderRadius: 10 } }}>
  {children}
</HdrukUiProvider>
```
