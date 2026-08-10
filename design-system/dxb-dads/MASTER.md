# DXB Dads — Design System

This is the source of truth for future site changes. Page-specific files in
`pages/` may override it when a route needs a deliberate exception.

**Product:** Podcast discovery and publishing hub  
**Direction:** 1990s pulp editorial — compact, cinematic, cut-paper, image-led
**Design dials:** Variance 7/10 · Motion 3/10 · Density 3/10

## Experience principles

1. Make the newest full episode the clearest action on every visit.
2. Use the RSS feed as the content source; never hard-code a released episode.
3. Keep the homepage editorial and focused, not like a generic marketing site.
4. Preserve Anton as the high-impact condensed display face, Manrope as the
   neutral body face, and real host photography throughout.
5. Make YouTube, Spotify and Apple Podcast choices obvious without repeating
   them in every section.
6. Design mobile-first: 44px minimum targets, 8px target spacing, no horizontal
   scrolling and no interaction that depends on hover.

## Tokens

### Color

| Role | Token | Value |
|---|---|---|
| Cinematic background | `--ink` | `#0d0b09` |
| Deep navigation blue | `--navy` | `#071d2a` |
| Warm dark surface | `--ink-soft` | `#17120f` |
| Brick depth | `--brick` | `#321810` |
| Warm ivory surface | `--paper` | `#f1ece3` |
| Muted ivory surface | `--paper-dark` | `#ddd4c7` |
| Burnt gold accent | `--gold` | `#c58b46` |
| Highlight gold | `--gold-bright` | `#e2ad67` |
| Dark gold copy | `--gold-deep` | `#7a4a19` |

Use navy, brick, ivory and gold as the heritage palette. Glass treatments may
soften navigation, utility controls and grouped cards, but body copy must always
sit on a sufficiently opaque surface with WCAG AA contrast.

### Typography

- Display: Anton, uppercase, 4–7rem on desktop, `-0.03em` tracking and
  `1.0–1.06` line-height. Never overlap adjacent display lines.
- Body/UI: Manrope, minimum 16px for paragraph copy and 1.5+ line-height.
- Labels: Manrope 700/800, uppercase, letter-spaced; never below 12px when the
  text carries meaning.
- Long episode titles must wrap naturally and never force a fixed-height card.

### Spacing

| Token | Value | Use |
|---|---:|---|
| XS | 4px | Micro alignment |
| SM | 8px | Adjacent controls |
| MD | 24px | Card padding |
| LG | 32px | Component groups |
| XL | 48px | Section groups |
| 2XL | 64px | Major separation |
| 3XL | 112–180px | Desktop section rhythm |

## Components

### Navigation

- Logo left, four or fewer navigation choices, one high-priority latest-episode
  action on the right.
- Keep the navigation visually clean and unboxed. Do not apply glass-panel,
  paper-cutout, floating-card, or rounded-container treatments to the navbar.
- On the homepage hero, navigation stays transparent over the cinematic
  gradient with one quiet hairline and a restrained outlined latest-episode CTA.
- Mobile may collapse the anchor links, but the latest-episode action must stay
  visible.
- Every link has a visible keyboard focus state and at least a 44px touch area.

### Hero

- Keep the full homepage hero within the first viewport. Copy sits on the left;
  a compact abstract host collage sits on the right on desktop and above the
  copy on mobile.
- Use real isolated upper-body silhouettes of Pranav, Mustapha and Pavle with
  thick aged-cream and mustard offset outlines. Layer them over halftone dots,
  torn red print strips and small starbursts; never put the hosts back inside
  rectangular, glass or low-opacity panels.
- Keep all three host silhouettes at comparable face and torso scale. The
  centre portrait may overlap shoulders, but it must not hide either side
  host's face, body, or paper name label. Keep the full halftone circle inside
  the artwork at every breakpoint.
- Lead with the genre proposition, then one latest-episode action and one
  archive action. Platform links remain visible but secondary.
- The current episode label is data-driven and may truncate to one line only in
  the compact now-playing control.

### Episode cards

- Reserve media space with an aspect ratio to prevent layout shift.
- The newest full episode gets the only large feature treatment.
- Older releases flow into a three-column desktop grid and a single-column
  mobile list automatically.
- Cards link to durable episode pages; external watch/listen links are secondary.
- When a platform thumbnail is unavailable, use a different real podcast frame
  rather than repeating the hero or host imagery.

### Host portraits

- Treat only the three host cards as tactile white-paper cutouts: a warm-white
  border around each photograph, a subtly irregular edge, restrained rotation,
  and a soft paper shadow.
- Keep navigation, episode cards, platform panels and long-form content outside
  this cutout treatment.

### Platform links

- Group YouTube, Spotify and Apple Podcasts in one clear section.
- Pair every platform name with its recognizable icon; retain the written name
  so the interface never depends on logo recognition or color alone. Apply the
  same icon-and-label treatment to Instagram, RSS and contact links.

## Motion

- Keep hover/focus transitions between 150–300ms.
- Use one short, punchy poster-slam entrance for the host silhouettes and print
  accents. The slow ticker is the only persistent motion; hero elements must
  settle completely after the first second.
- Avoid scroll-jacking, parallax, carousels and decorative animation that delays
  episode discovery.
- Respect `prefers-reduced-motion` globally.

## Texture and photography

- Keep the fixed page grain at 2–4% opacity with `mix-blend-mode: overlay`.
- Grade all podcast photography consistently: slightly desaturated, gently
  warmed in the shadows, and never blue or clinically neutral.
- Use 1px warm-white hairlines at 8% opacity. If a border is immediately
  noticeable before its content, it is too strong.

## Accessibility and ergonomic checklist

- [ ] Body text contrast meets WCAG AA (4.5:1).
- [ ] Meaningful images have alt text; decorative images use empty alt text.
- [ ] All actions are keyboard reachable with visible focus rings.
- [ ] Touch targets are at least 44×44px with at least 8px between them.
- [ ] The page works at 375px, 768px, 1024px and 1440px without overflow.
- [ ] Hover is enhancement only; it never reveals required content.
- [ ] Dynamic images reserve their aspect ratio to avoid layout shifts.
- [ ] New RSS releases become the lead episode within the revalidation window.
- [ ] Reduced-motion visitors do not receive ticker or entrance animation.

## Anti-patterns

- No cluttered grids of equal-priority cards.
- No generic blue/purple streaming-service palette.
- No low-opacity glass behind long-form body copy.
- No emoji used as interface controls.
- No tiny icon-only controls.
- No manually maintained “latest episode” copy.
- No hard-coded heights for episode titles or descriptions.
- No translucent grid squares, orbit animations or endlessly floating hero
  portraits.
