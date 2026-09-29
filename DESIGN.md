---
version: alpha
name: Thimphu Tech Meet
description: A warm, editorial community blog for a Bhutanese tech meetup — a clay-red accent over ink and warm paper, with a grotesque display face, a literary serif for reading, and a monospace for dates and labels.
colors:
  primary: "#b5301f"
  onPrimary: "#ffffff"
  primarySoft: "#f6e3df"
  secondary: "#c99a3a"
  background: "#f2f3f0"
  surface: "#fbfbf9"
  text: "#171a1f"
  textSecondary: "#4b525c"
  textMuted: "#7c838c"
  border: "#d9dcd8"
  borderSubtle: "#e7e9e5"
typography:
  h1:
    fontFamily: Bricolage Grotesque
    fontSize: 68px
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.03em"
  h2:
    fontFamily: Bricolage Grotesque
    fontSize: 28px
    fontWeight: 600
    letterSpacing: "-0.01em"
  h3:
    fontFamily: Bricolage Grotesque
    fontSize: 22px
    fontWeight: 600
    letterSpacing: "-0.02em"
  bodyMd:
    fontFamily: Newsreader
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.55
  lede:
    fontFamily: Newsreader
    fontSize: 21px
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: IBM Plex Mono
    fontSize: 12px
    fontWeight: 400
    letterSpacing: "0.04em"
  eyebrow:
    fontFamily: IBM Plex Mono
    fontSize: 12px
    fontWeight: 500
    letterSpacing: "0.08em"
rounded:
  sm: 4px
  md: 8px
  lg: 14px
  xl: 16px
  pill: 999px
spacing:
  xs: 8px
  sm: 12px
  md: 16px
  lg: 20px
  xl: 28px
  section: 56px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.onPrimary}"
    rounded: "{rounded.pill}"
    padding: "16px"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.pill}"
    padding: "16px"
  nav-link:
    textColor: "{colors.textSecondary}"
    rounded: "{rounded.pill}"
    padding: "12px"
  nav-link-active:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.pill}"
    padding: "12px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.lg}"
  chip:
    textColor: "{colors.textSecondary}"
    rounded: "{rounded.pill}"
  caption:
    textColor: "{colors.textMuted}"
    typography: "{typography.label}"
  note:
    backgroundColor: "{colors.primarySoft}"
    textColor: "{colors.text}"
    rounded: "{rounded.lg}"
  eyebrow:
    textColor: "{colors.primary}"
    typography: "{typography.eyebrow}"
---

## Overview

Thimphu Tech Meet is a casual weekly meetup for developers, researchers and
tinkerers in Bhutan. The site is a file-based blog — markdown and pull
requests, no CMS. The visual identity is deliberately quiet and editorial:
warm off-white paper, deep ink text, and one strong accent — a brick/clay red
that is the only color that means "interaction." A gold tone appears only in
decorative moments (avatar tints, photo gradients, the author mark).

Everything is driven by CSS custom properties in `app/globals.css`; a light
palette lives on `:root` and a dark palette swaps the same token names under
`prefers-color-scheme` and an explicit `data-theme="dark"`.

## Colors

The accent is the load-bearing token: use it for links, hover states, primary
buttons, eyebrows, focus outlines, and the brand mark — and nowhere else.
Muted grays (`textSecondary`, `textMuted`) carry secondary and tertiary text;
`border` / `borderSubtle` do structure. `primarySoft` is the accent's tint,
used for callout chips and soft backgrounds.

Light palette (canonical):

- **primary (#b5301f)** — clay red. The sole interaction driver.
- **secondary (#c99a3a)** — gold. Decorative only: avatar tints, photo-gradient accents, author mark.
- **background (#f2f3f0)** — page background, warm off-white.
- **surface (#fbfbf9)** — cards, header, nav pills, buttons.
- **text (#171a1f)** — primary ink; headings and body.
- **textSecondary (#4b525c)** — secondary text, nav links.
- **textMuted (#7c838c)** — tertiary text; tiny mono labels and captions.
- **border (#d9dcd8)** / **borderSubtle (#e7e9e5)** — strong / subtle hairlines.

Dark palette (same roles): background `#12151a`, surface `#1a1e24`, text
`#eeefea`, textSecondary `#aeb4bc`, textMuted `#7c838c`, border `#2c323a`,
borderSubtle `#22272e`, primary `#e0553f` (lighter for dark contrast),
onPrimary `#12151a`, primarySoft `#3a1f1b`, secondary `#d9ae55`.

## Typography

Three typefaces, self-hosted via `next/font`:

- **Bricolage Grotesque** — display face for headings, nav, buttons, labels.
- **Newsreader** — literary serif for body copy and article text.
- **IBM Plex Mono** — dates, captions, tags, eyebrows, code.

Headings are grotesque, tight, and slightly negative-tracked. Body is a serif
at 18px with 1.55 line height. Mono labels are 12px, uppercase, and
letter-spaced (`0.04em` general, `0.08em` for eyebrows). The hero `h1` and
page titles use responsive `clamp()` sizing (68px and 52px ceilings
respectively) — the token records the ceiling value.

## Layout & Spacing

Content sits in a `.wrap` container maxing at 1080px with 20px inline padding.
Sections use 56px block padding and are separated by a 1px `borderSubtle` top
border. Cards and grids use a small gap scale: 8px (chips, avatars), 12px
(buttons, photo strips), 16px (nav, actions), 20px (two-column doors), 28px
(section heads). The article column is narrower — 680px — for comfortable
reading measure.

## Elevation & Depth

Depth is minimal and paper-like. Cards use a soft shadow:
`0 1px 2px rgba(23,26,31,.06), 0 8px 24px -12px rgba(23,26,31,.18)`.
Hover states lift elements with a small translate (`translateY(-1px)` on
buttons, `-2px` on doors) rather than stronger shadows. The sticky header uses
a translucent background (`color-mix` 88% background) plus `blur(10px)`.

## Shapes

Corners are rounded, not square. The scale: 4px (code chips, photo captions),
8px (code blocks, logo tiles), 14px (cards, notes), 16px (doors, venue),
and a full `pill` radius (999px) for buttons, nav links, tags, and avatars.
The brand mark is a circle with one squared corner (`50% 50% 50% 4px`).

## Components

- **button-primary** — the only high-emphasis action on a page. Clay red fill,
  white text, pill radius. Hover lifts it 1px; it does not change color.
- **button-secondary** — surface fill, ink text, 1px `border`. Used for
  secondary actions and the theme toggle.
- **nav-link / nav-link-active** — pill links in the header; active state gets
  a surface fill and 1px inset border.
- **card** — surface fill, 1px `border`, 14px radius, soft shadow. Used by
  "next meetup", doors, steps, notes, and the author block.
- **chip** — mono uppercase tags, 11–12px, 1px border, pill radius.
- **caption** — mono tertiary label in `textMuted`; dates, captions, and bylines.
- **note** — `primarySoft` tint background for callouts and "linked" chips.
- **eyebrow** — mono uppercase label in the accent color; introduces a section
  or card. Never wraps; used sparingly.

Button padding is `10px 16px` (small: `7px 12px`); the token records the
dominant 16px horizontal padding.

Note: `border` and `borderSubtle` are real palette tokens (1px structural
hairlines on every card and section) but the component schema has no
border-color slot, so they cannot be referenced by a component and the linter
reports them as orphaned. Keep them — they are the site's structure.

## Do's and Don'ts

**Do:**

- Use the accent for exactly one interactive purpose per region.
- Keep background warm and quiet; let photography and accent carry color.
- Use mono for anything temporal or code-like (dates, tags, filenames).
- Reach for `surface` + 1px `border` before adding a shadow.

**Don't:**

- Don't introduce a second "action" color — gold is decorative, never interactive.
- Don't set body text below 18px; the serif needs the size to stay legible.
- Don't square off a corner that should be rounded — pills and cards are a signature.
- Don't use `textMuted` for anything load-bearing at small sizes; it is below
  AA contrast for 12px labels and is reserved for auxiliary captions.
