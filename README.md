# @hdruk/ui

Common, theme-driven UI for the **HDRUK Tech Team**.  
Built on **MUI v7**, with a shared HDRUK brand theme and a set of reusable components.

## Viewing the components

**[Browse the component catalogue →](https://hdruk.github.io/hdruk-ui/)**
(published from `main` on every release)

Storybook is the primary dev surface — every component renders through
`HdrukUiProvider`, so no consumer app is needed:

```bash
npm install
npm run storybook   # http://localhost:6006
```

The **Theme** dropdown in the toolbar switches between the library base theme
and site-flavoured demo themes (`.storybook/demoThemes.ts`). These are QA
fixtures, not the real site themes — their job is to shake out hardcoded values
and prove the theming levers work on every story. Anything that doesn't move
when you switch is a bug.

`npm run build-storybook` produces `storybook-static`, which the Storybook
workflow publishes to GitHub Pages on merge to `main`.

## Install

```bash
npm i @hdruk/ui
# peer deps
npm i @mui/material @emotion/react @emotion/styled
```

Peer requirements: React `^18 || ^19`, MUI `^7.3`, Emotion `^11.14`.

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

---

## Theming contract

`HdrukUiProvider` builds its theme with
`createTheme(deepmerge(brandThemeOptions, yourThemeOptions))`, so anything you
pass in `themeOptions` wins over the HDRUK defaults. Components style
themselves only through theme tokens — no hardcoded colours — so a re-brand is
a matter of overriding tokens.

Tokens the components rely on (your overrides must keep these keys populated):

- The standard MUI palette slots (`primary`, `secondary`, `background`,
  `divider`, `action`, `text`) — override freely.
- `palette.tertiary.{midnightBlue,duckEggBlue,slateGrey,lightGrey,orange}` —
  the HDRUK brand slots. `tertiary.slateGrey` is used by the `text`/`inherit`
  Button variant.
- `palette.link` — used by the `color="link"` variant on Button, Chip,
  IconButton, Checkbox and Switch.

The base theme, its options and the raw brand colours are exported for
composing your overrides (or for use outside MUI, e.g. charts):

```ts
import { theme, themeOptions, brandColors } from "@hdruk/ui";
```

Re-branding example (magenta primary, custom fonts):

```tsx
<HdrukUiProvider
  loadFonts={false}
  themeOptions={{
    palette: {
      primary: { main: "#BE37A3" },
      tertiary: { slateGrey: { main: "#333333" } },
    },
    typography: { fontFamily: "MyFont, sans-serif" },
  }}>
  {children}
</HdrukUiProvider>
```

### Fonts

By default the provider injects Google Fonts links for Inter and Material
Symbols. Pass `loadFonts={false}` and load fonts yourself (e.g. with
`next/font`, which self-hosts and avoids your visitors' browsers calling
Google) when your app uses different fonts or you want to keep font delivery
first-party.

## Tests

Jest + React Testing Library, in a jsdom environment, transformed by
`@swc/jest` (no Babel — the repo builds with esbuild and Vite).

```bash
npm run test         # once
npm run test:watch   # watch mode
npm run coverage     # with a coverage report
```

Tests sit next to what they cover, the same way stories do
(`Button.tsx` → `Button.test.tsx`). Shared scaffolding lives in `test/`:

- `test/renderWithTheme.tsx` re-exports Testing Library with `render` wrapped in
  `HdrukUiProvider` (and `loadFonts={false}`), so components see the real brand
  theme. Pass `themeOptions` to exercise app-side overrides the way a consumer
  would:

  ```tsx
  import { render, screen } from "../../../test/renderWithTheme";

  render(<Button purpose="primary">Go</Button>, {
    themeOptions: {
      components: {
        HdrukButton: {
          defaultProps: { purposeMap: { primary: { variant: "outlined" } } },
        },
      },
    },
  });
  ```

- `test/svgStub.ts` stands in for SVG imports, which `tsup` resolves to a URL
  string via its `file` loader.

Favour tests that pin the **consumer-visible contract** — the purpose→variant
mapping, theme override behaviour, rendered roles and class hooks — over
implementation detail. A test that only mirrors a literal from the
implementation has no independent oracle: it can fail only when someone edits
that literal deliberately, so it earns nothing. See the `## Theming contract`
section for what counts as breaking.

`.github/workflows/ci.yml` runs lint, typecheck, tests and build on every pull
request. There is no coverage threshold yet.

## Release process

Every merge to `main` publishes a new version. There is no manual version bump
and no `npm publish` by hand — don't push work in progress to `main`.

Work lands through a PR into `main`, which is protected: reviewed, with CI
green. The **PR title** is the thing that matters at merge time — it becomes the
commit message and decides the version, so it must be a conventional-commit
title:

- `fix:` or `perf:` → patch
- `feat:` → minor
- `feat!:`, or a `BREAKING CHANGE:` footer → major
- `docs:`, `chore:`, `refactor:`, `test:` → no release

On merge, semantic-release works out the version, publishes to npm, updates
`CHANGELOG.md`, tags the commit and writes a GitHub Release.

**What counts as breaking** is broader than a changed type signature. Renaming
or removing a palette token, theme key or breakpoint; changing a slot class or
the DOM a consumer targets with `styleOverrides`, `sx` or test selectors;
changing a prop default so existing call sites render differently; raising a
peer version floor. Any of those is `feat!:`, not `feat:`.

Apps depend on a caret range, so patches and minors reach them as automated
update PRs and can merge once their own CI is green. Majors sit outside the
range and are adopted deliberately, using the Release notes as the migration
guide.

If a bad version ships, fix forward rather than unpublishing: `npm deprecate`
it with a pointer to the good version, then land the fix as `fix:` so the patch
supersedes it.
