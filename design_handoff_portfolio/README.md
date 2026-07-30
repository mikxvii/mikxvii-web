# Handoff: Mike Guerrero — Personal Portfolio

## Overview
A warm, vintage, film-inspired personal portfolio for **Mike Guerrero**, an
aspiring software engineer in San Diego, CA. It is a **multi-page site**: a home
page plus five section pages — About, Experience, Projects, Photography, and
Writings. The mood is mid-century California (cream paper, terracotta, serif
display type, 35mm film grain) with a modern, minimal structure and a first-class
warm dark mode. Signature interactions carry each section's metaphor without
overwhelming the reader.

## About the Design Files
The files in this bundle are **design references authored in HTML** — working
prototypes that show intended look, layout, copy, and behavior. They are **not
production code to drop in as-is.**

They are written as "Design Components" (`.dc.html`) that run in a specific
preview runtime (`support.js`) and pull styling from a bound design-system bundle.
That runtime will **not** exist in your target project. Your task is to
**recreate these designs in your own codebase's environment** — most naturally a
React/Next.js app (the brand's real site is Next.js 15) — using its established
patterns, then port the design tokens below into your styling layer (CSS
variables, Tailwind theme, etc.). If you have no project yet, Next.js + plain CSS
variables is the closest match to how this was designed.

Read the `.dc.html` files for **structure, exact copy, measurements, and the
interaction logic** (the `<script data-dc-script>` block at the bottom of each is
plain JS state + handlers you can translate to React state/hooks). Ignore the DC
scaffolding (`<x-dc>`, `<x-import>`, `<dc-import>`, `<sc-for>`, `<sc-if>`,
`hint-*` attributes) — those are runtime constructs, described below so you know
what they map to.

### DC construct → what to build
- `<x-import component-from-global-scope="…Button">` → a design-system component
  (Button, Avatar, Monogram, ThemeToggle, SocialLink, Tag, MonoStamp). Rebuild
  these as components in your app, or map to your own library. See **Components**.
- `<dc-import name="SiteFooter">` → a shared `<SiteFooter>` component rendered at
  the bottom of every page (the "Explore" section cards + the footer).
- `<sc-for list as>` → `.map()`. `<sc-if value>` → conditional render.
- `{{ x }}` holes → values/props. `style-hover=""` → `:hover` CSS.
- `var(--token)` → the CSS variables in **Design Tokens** (already themeable for
  light/dark via `[data-theme="dark"]`).

## Fidelity
**High-fidelity.** Final colors, typography, spacing, copy, and interactions are
all specified. Recreate the UI pixel-accurately using your codebase's libraries,
then wire the interactions described under **Interactions & Behavior**.

---

## Screens / Views

### 1. Home (`Home.dc.html`)
- **Purpose:** Landing; introduce Mike and route to the five sections.
- **Layout:** Sticky translucent top nav (blur, 1px bottom border). Full-bleed
  hero (`min-height:600px`, centered column) with the `sf_sunset.jpg` photo behind
  it, faded so the image stays visible at top and dissolves seamlessly into the
  page background toward the bottom. Below: the shared **Explore** cards grid, then
  the shared footer.
- **Hero fade (important, explicitly requested):** the photo layer uses
  `opacity:0.6` **plus** a vertical `mask-image` so the top ~30% is fully visible
  and it fades to transparent by the bottom; over it sit two protection gradients
  (a top-to-bottom `--bg` alpha ramp and a soft radial behind the text) plus the
  grain overlay. Net effect: photo reads clearly, text stays legible, and it
  transitions into the sections below with no hard seam. Recreate all four stacked
  layers, not a single overlay.
- **Components:** MonoStamp eyebrow ("SAN DIEGO, CA · EST. 2025"); Avatar (150px,
  accent ring, `mike.jpg`); H1 "Welcome, I'm Mike Guerrero" (display serif, primary
  color on the name) with a blinking mono cursor; sub-paragraph; three SocialLinks
  (GitHub, LinkedIn, Résumé). Entrance: `mg-rise` fade-up 0.7s ease-out.

### 2. About (`About.dc.html`)
- **Purpose:** Bio.
- **Layout:** Page header (eyebrow "01 · Profile" + big display H1). Two columns
  `300px | 1fr`, gap 48px: left is a sticky portrait card (`mike.jpg`, 4:5, grain
  overlay, mono date-stamp) + a facts card (Based in / Role / Focus / Currently);
  right is prose (lead paragraph in display serif, then muted body), a divider, a
  "When I'm not at a keyboard" block, a row of Tags, and two Buttons. Then shared
  footer.

### 3. Experience (`Experience.dc.html`) — "The Reel"
- **Purpose:** Roles/experience as a film reel.
- **Layout:** Centered intro with a bouncing "SCROLL ↓" hint. Then a dark
  (`#0e0b06`) scroll section: each role is a **film frame** — a projected cream
  "screen" panel flanked by two vertical sprocket-hole strips, `min-height:90vh`,
  y-scroll-snap. Each panel: mono "Reel 02 · Scene NN" + ember date-stamp, role
  title (display), org · location, bulleted highlights, mint tech pills.
- **Interaction:** an IntersectionObserver reveals each frame (fade + translateY,
  0.6s) as it enters, and re-triggers a brief `mg-flicker` brightness flash on the
  panel — like a projector catching the frame. Reveal once, then unobserve.

### 4. Projects (`Projects.dc.html`) — "The Crate"
- **Purpose:** Projects presented as records in a crate; open one into a record
  player.
- **Layout:** Intro header, then a "crate" panel (inset shadow, sunk surface) with
  a grid of albums — **3 per row** (`repeat(auto-fill, minmax(300px,1fr))`,
  gap 30px). Each album = a square cover (image slot) with a partial black vinyl
  disc peeking from behind the sleeve; on hover the sleeve slides left to reveal
  more of the disc. Below the cover, a button (title + year·role + play icon).
- **Modal (record player):** clicking an album opens a full-screen overlay
  (`mg-pop` spring in). Left: a turntable — the disc **spins** (`mg-spin`, 1.8s
  linear infinite) with a tonearm; center label uses the project's color. Right:
  the **album cover flips** in 3D (`rotateY(180deg)`, 0.8s) ~650ms after open to
  reveal the "back" — title, blurb, a "tracklist" (really the tech stack), and
  Live/Code links; a button flips it back. Bottom, spanning full width: a
  **sleeve gallery** — a 3-image carousel (image slots) with prev/next arrows, an
  "N / 3" label, and clickable dots, sliding via `translateX(-N*100%)`.
- **Every page including this one ends with the shared footer.**

### 5. Photography (`Photography.dc.html`) — "35mm"
- **Purpose:** Photos as a horizontal film strip with a lightbox.
- **Layout:** Header with prev/next scroll buttons + a "DRAG →" hint. A horizontal
  scroll container (`#filmstrip`, x-scroll-snap, dark bg) whose frames each have
  top/bottom sprocket-hole strips, a large photo (grain overlay, ember date-stamp,
  "FRAME NN"), and a caption row. Frame width `min(62vw,560px)`, photo height
  `min(52vh,440px)`. A trailing image slot lets the user add their own frame. Then
  the shared footer.
- **Lightbox:** clicking a frame opens a full-screen overlay with the photo in a
  thick film border, prev/next arrows, caption, and keyboard support
  (Esc = close, ←/→ = navigate, wrapping).

### 6. Writings (`Writings.dc.html`) — "The Notebook"
- **Purpose:** Journal entries read like a paper book.
- **Layout:** Header, then a "book" panel: paper gradient bg, grain overlay, and a
  faux center-gutter shadow. Two columns `300px | 1fr`: left is a **Contents**
  (TOC) list sorted by date (roman-numeral label, title, date; the active row is
  tinted and indented); right is the reading page — chapter label + ember date,
  entry title, first paragraph with a serif drop-cap, remaining paragraphs, and a
  footer with Previous / "Entry N of M" / Next. Then the shared footer.
- **Interaction:** clicking a TOC entry or prev/next swaps the chapter and plays a
  `mg-pageturn` slide-in on the reading pane. Prev/Next disable at the ends.

### Shared: SiteFooter (`SiteFooter.dc.html`)
- Rendered at the bottom of **every** page. Two parts:
  1. **Explore cards** — a grid of the 5 section cards
     (`repeat(auto-fit, minmax(300px,1fr))`, gap 24px → **3 per row** at 1088px),
     each a link card (kicker, number, title, description, "cta →"). The card for
     the current page shows "• You're here" instead of the CTA.
  2. **Footer** — three columns: brand (monogram + name + blurb + SocialLinks),
     "Sections" nav (all 6 links, current one in primary color), and "Elsewhere"
     external links. A bottom bar: "© 2026 Mike Guerrero" / "Shot on 35mm · Made
     in San Diego".
- Props: `active` (which page — one of home/about/experience/projects/photography/
  writings) and `heading` (cards heading, e.g. "Explore" or "Keep exploring").

---

## Interactions & Behavior
- **Theme toggle:** light/dark segmented control in the nav on every page. Writes
  `localStorage['mg-theme']` and sets `document.documentElement[data-theme]`. Each
  page reads it on load (inline script before paint to avoid a flash) so the theme
  persists across navigation. Recreate as a theme provider/context in your app.
- **Nav:** the current section is highlighted (primary color) in both the top nav
  and the footer nav.
- **Experience reveal:** IntersectionObserver, threshold ~0.25; on enter set
  opacity 1 / transform none and flash `mg-flicker`; unobserve after first reveal.
  Poll for newly-rendered frames a few times on mount (they stream in).
- **Projects modal:** open → set selected index, reset flip + gallery; after 650ms
  set flipped=true (auto-flip to the back). Close resets everything. Gallery is
  its own 0–2 index. Record spin is a pure CSS animation.
- **Photography lightbox:** open by index; ←/→ wrap through photos; Esc closes;
  filmstrip prev/next scrolls the container by ~80% width, smooth.
- **Writings:** chapter index 0…N-1; TOC click / prev-next set it; play page-turn
  animation on change; disable prev/next at bounds.
- **Motion:** all gentle, ease-out, 140–800ms. Keyframes used: `mg-rise`
  (fade-up), `mg-blink` (cursor), `mg-flicker` (projector), `mg-spin` (vinyl),
  `mg-pop` (modal in), `mg-fade`, `mg-pageturn`, `mg-bounce`/`mg-nudge` (scroll
  hints). Respect `prefers-reduced-motion` in production.

## State Management
Per-page local state is enough — no global store needed beyond theme:
- **Theme** (global): `'light' | 'dark'`, persisted to localStorage; provide via
  context/provider so every page/nav reads the same value.
- **Projects:** `selected: number|null`, `flipped: boolean`, `gal: 0|1|2`.
- **Photography:** `lb: number|null` (open lightbox index).
- **Writings:** `ch: number` (current chapter).
- **Experience:** no React state — DOM/observer driven; in React use a ref +
  `IntersectionObserver` in `useEffect`, or a library like framer-motion's
  `whileInView`.
- Content (projects, photos, entries, experience roles) is currently hardcoded
  arrays in each file's script block — lift these into data files / CMS as needed.

## Design Tokens
Ported from the bound design system. Define as CSS variables (light default,
`[data-theme="dark"]` override) or map into your Tailwind theme.

### Colors — light (default)
- `--bg #F6DCAC` (cream paper) · `--surface #FBF3DE` · `--surface-raised #FEFAEF`
  · `--surface-sunk #ECD09B`
- `--text #01204E` (navy) · `--text-strong #011533` · `--text-muted #5B5340` ·
  `--text-faint #8A7E63` · `--text-inverse #FBF3DE`
- `--border #D8C295` · `--border-strong #B79A63`
- `--primary #BF5A3C` (terracotta) · `--primary-hover #9C4529` ·
  `--primary-text #FBF3DE`
- `--accent #2BAF90` (spearmint) · `--accent-hover #0E5C4A` ·
  `--accent-text #062C22`
- `--link #028391` (teal) · `--link-hover #BF5A3C` · `--stamp #FF5A1F` (ember)

### Colors — dark (`[data-theme="dark"]`)
- `--bg #14110B` · `--surface #1C1810` · `--surface-raised #241F16` ·
  `--surface-sunk #100D08`
- `--text #F6DCAC` · `--text-strong #FBF3DE` · `--text-muted #B7A886` ·
  `--text-faint #7C7259`
- `--border #3A3323` · `--border-strong #55492F`
- `--primary #D97350` · `--primary-hover #E68C6C` · `--primary-text #180D07`
- `--accent #35D6AE` · `--link #17B3C4` · `--link-hover #FF7A3D` · `--stamp #FF5A1F`

### Signature raw hues (for the record-player labels etc.)
terracotta `#BF5A3C`, clay `#F85525`, peach `#FAA968`, spearmint `#2BAF90`,
teal `#028391`, pine `#0E5C4A`, ember `#FF5A1F`, ember-glow `#FF7A3D`,
navy `#01204E`, warm-black `#14110B`.

### Typography
- Display: **DM Serif Display** (headlines, monogram) — fallback Playfair
  Display, Georgia, serif.
- Sans/UI/body: **Space Grotesk** — fallback ui-sans-serif, Helvetica Neue, Arial.
- Mono (labels, date-stamps, numerals): **Space Mono** — fallback ui-monospace,
  SF Mono, Menlo.
- Scale (px): 11, 12, 14, 16, 18, 22, 28, 36, 48, 64, 88. Weights 300–700.
- Line-heights: tight 1.05, snug 1.2, normal 1.5, relaxed 1.7.
- Tracking: tight -0.02em; mono eyebrows 0.12em; caps micro-labels/stamps 0.24em,
  UPPERCASE.
- Load DM Serif Display, Space Grotesk, Space Mono from Google Fonts.

### Radius / shadow / effects
- Radius: cards/tiles 18px (`--radius-lg`), small 8–14px, pills 999px for
  buttons/tags.
- Shadows: warm-tinted (brown, not black), soft/low — `--shadow-sm` on cards,
  `--shadow-md` on hover-lift.
- **Film grain:** `var(--grain)` overlay with `mix-blend-mode:overlay` at
  ~0.25–0.5 opacity over photos/panels. (Defined in the design-system
  `tokens/effects.css` — a tiling noise data-URI; copy that value.)
- Sticky headers: translucent bg + `backdrop-filter:blur(8px)`.

## Assets
All in `assets/` in this bundle (from the design system's photography + brand
marks):
- `mike.jpg` — portrait (hero, About, one photo frame).
- `sf_sunset.jpg` — home hero background + a photo frame.
- `fruitvale_bart.jpg`, `flight_clouds.jpg` — photo frames.
- `github.svg`, `linkedin.svg`, `file.svg` (résumé), `globe.svg` — social/util
  marks.
- `mike_resume.pdf` — résumé link target.
- **Project covers & sleeve-gallery shots and any extra photos are user-supplied
  image slots** in the prototype (empty drop targets) — wire these to real
  images/uploads in your build.

## Components (design-system primitives to rebuild or map)
From `MikeGuerreroDesignSystem_88d503`, used across pages:
- **Button** (primary/secondary variants), **Avatar** (round portrait + accent
  ring), **Monogram** ("M" set in DM Serif Display on a terracotta disc — it's
  type, not an image), **ThemeToggle** (sun/moon segmented), **SocialLink** (icon
  + label external link), **Tag** (mono uppercase pill), **MonoStamp** (glowing
  ember date-stamp label). Rebuild these in your framework or map to your own
  library; keep the type/color/radius specs above.

## Files
Design references included in this bundle:
- `Home.dc.html`, `About.dc.html`, `Experience.dc.html`, `Projects.dc.html`,
  `Photography.dc.html`, `Writings.dc.html` — the six pages.
- `SiteFooter.dc.html` — the shared Explore-cards + footer, rendered on every page.
- `assets/` — images, brand SVGs, résumé PDF.

Read each page's bottom `<script data-dc-script>` block for the exact content
arrays and interaction logic. The design-system token CSS this was built against
lives (in the source project) under `tokens/` — the values you need are all
transcribed in **Design Tokens** above, so this README is self-sufficient.
