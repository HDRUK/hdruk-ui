# @hdruk/ui

Common, theme-driven UI for the **HDRUK Tech Team**.  
Built on **MUI v7**, with a shared HDRUK brand theme and a set of reusable components.

## Install

```bash
npm i @hdruk/ui
# peer deps
npm i @mui/material @emotion/react @emotion/styled
```

## Setup

Wrap your app with `HdrukUiProvider`. In Next.js, this goes in your theme registry component:

```tsx
"use client";

import { ReactNode } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { HdrukUiProvider } from "@hdruk/ui";

export default function ThemeRegistry({ children }: { children: ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <HdrukUiProvider>
        {children}
      </HdrukUiProvider>
    </AppRouterCacheProvider>
  );
}
```

Pass `themeOptions` to extend or override the brand theme:

```tsx
<HdrukUiProvider themeOptions={{ shape: { borderRadius: 10 } }}>
  {children}
</HdrukUiProvider>
```

## Components

### Button

Extends MUI `Button` with a `loading` state. Defaults to `variant="contained"`.

```tsx
import { Button } from "@hdruk/ui";

<Button loading={isSubmitting} onClick={handleSubmit}>
  Submit
</Button>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `loading` | `boolean` | `false` | Shows a spinner and disables the button |
| `variant` | MUI `variant` | `"contained"` | Button variant |

All other MUI `Button` props are supported.

---

### SearchBar

Controlled or uncontrolled search input with debounce, clear button, and an optional `⌘K` / `Ctrl+K` focus shortcut.

```tsx
import { SearchBar } from "@hdruk/ui";

<SearchBar
  value={query}
  onChange={setQuery}
  onSearch={handleSearch}
  placeholder="Search datasets…"
  shortcut
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | Controlled value |
| `defaultValue` | `string` | — | Uncontrolled initial value |
| `onChange` | `(value: string) => void` | — | Called on every keystroke (after debounce) |
| `onSearch` | `(value: string) => void` | — | Called on Enter or debounce completion |
| `debounceMs` | `number` | `300` | Debounce delay in ms |
| `loading` | `boolean` | `false` | Shows a spinner in the input |
| `disableClear` | `boolean` | `false` | Hides the clear button |
| `shortcut` | `boolean` | `false` | Enables ⌘K / Ctrl+K focus shortcut |
| `actions` | `ReactNode` | — | Slot rendered to the right of the input |
| `filters` | `ReactNode` | — | Slot rendered below the input |
| `size` | `"small" \| "medium"` | MUI default | Input size |

---

### Header

Full-width AppBar with primary and secondary logos, desktop/mobile navigation, and an account menu.

```tsx
import { Header } from "@hdruk/ui";
import Link from "next/link";

<Header
  linkComponent={Link}
  accountLoading={sessionLoading}
  isLoggedIn={!!user}
  accountName={{ first: "Jane", last: "Smith" }}
  navItems={[
    { label: "Explore", href: "/explore" },
    { label: "About", subItems: [{ label: "Team", href: "/about/team" }] },
  ]}
  accountNavigation={{
    profile: { label: "My profile", href: "/profile" },
    logout: { label: "Sign out", action: handleLogout },
    signIn: { label: "Sign in", href: "/login" },
  }}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `accountLoading` | `boolean` | — | **Required.** Shows a skeleton while session loads |
| `isLoggedIn` | `boolean` | — | Switches between account menu and sign-in link |
| `accountName` | `{ first: string; last: string }` | — | Used for the initials badge and display label |
| `navItems` | `HeaderMenuLinkItem[]` | `[]` | Primary nav links; support `subItems` for dropdowns |
| `accountNavigation` | `AccountNavigation` | — | Profile, extra items, logout, and sign-in config |
| `linkComponent` | `React.ElementType` | `<a>` | Pass `next/link` for client-side routing |
| `logoImage` | `ReactNode` | HDRUK logo | Override the primary logo |
| `logoHref` | `string` | `"/"` | URL for the primary logo link |
| `brandingLogoImage` | `ReactNode` | — | Secondary/partner logo |
| `brandingLogoHref` | `string` | — | URL for the secondary logo |
| `appBarColour` | MUI `AppBarProps["color"]` | `"primary"` | AppBar colour palette key |
| `focusRingColour` | `string` | — | Keyboard focus ring colour override |
| `accountInitialsColour` | `string` | — | Background colour for the initials badge |

---

### Footer

Branded footer with link groups, social links, and a logo.

```tsx
import { Footer } from "@hdruk/ui";
import Link from "next/link";

<Footer
  linkComponent={Link}
  linkGroups={[
    {
      title: "Resources",
      items: [
        { label: "Documentation", href: "/docs" },
        { label: "API", href: "/api" },
      ],
    },
  ]}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `linkGroups` | `FooterLinkGroup[]` | — | Columns of links rendered in the footer body |
| `socialLinks` | `SocialLinkItem[]` | X + LinkedIn | Social/external icon links |
| `copyrightText` | `string` | `© HDR UK <year>` | Copyright line at the bottom |
| `footerBackgroundColor` | `string` | Theme gradient | CSS colour or gradient for the footer background |
| `logoImage` | `ReactNode` | HDRUK logo | Override the footer logo |
| `linkComponent` | `React.ElementType` | `<a>` | Pass `next/link` for client-side routing |
| `sx` | MUI `SxProps` | — | Style overrides for the footer root element |
