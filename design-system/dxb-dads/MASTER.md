# DXB Dads — Design System

This is the source of truth for future site changes. Page-specific files in
`pages/` may override it when a route needs a deliberate exception.

**Product:** Podcast discovery and publishing hub  
**Direction:** Editorial cinema — warm, tactile, direct, spacious  
**Design dials:** Variance 6/10 · Motion 4/10 · Density 3/10

## Experience principles

1. Make the newest full episode the clearest action on every visit.
2. Use the RSS feed as the content source; never hard-code a released episode.
3. Keep the homepage editorial and focused, not like a generic marketing site.
4. Preserve the established DXB Dads studio palette, Anton display type and
   real host photography.
5. Make YouTube, Spotify and Apple Podcast choices obvious without repeating
   them in every section.
6. Design mobile-first: 44px minimum targets, 8px target spacing, no horizontal
   scrolling and no interaction that depends on hover.

## Tokens

### Color

| Role | Token | Value |
|---|---|---|
| Cinematic background | `--ink` | `#0d0b09` |
| Warm dark surface | `--ink-soft` | `#17120f` |
| Brand brick | `--brick` | `#321810` |
| Body text / navy | `--navy` | `#071d2a` |
| Brand gold | `--gold` | `#c58b46` |
| Gold on dark | `--gold-bright` | `#e2ad67` |
| Accessible gold text on light | `--gold-deep` | `#7a4a19` |
| Paper background | `--paper` | `#f1ece3` |
| Secondary paper | `--paper-dark` | `#ddd4c7` |
| High contrast light | `--white` | `#fffdf8` |

Use gold as a signal, not a fill everywhere. Small gold text on paper must use
`--gold-deep`; `--gold` and `--gold-bright` are for dark surfaces, large type,
borders and decorative fields.

### Typography

- Display: Anton, uppercase, tight line-height (0.83–0.96).
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
| 3XL | 96px | Desktop section rhythm |

## Components

### Navigation

- Logo left, four or fewer navigation choices, one high-priority latest-episode
  action on the right.
- Mobile may collapse the anchor links, but the latest-episode action must stay
  visible.
- Every link has a visible keyboard focus state and at least a 44px touch area.

### Hero

- Use a full-height split screen: a tactile show-poster image on the left and a
  calm paper editorial panel on the right.
- The poster uses an editorial grid of real Episode 1 frame grabs: one
  three-person wide plus individual Pranav, Mustapha and Pavle close-ups. Use
  the illustrated logo only in the site identity, not as a substitute for the
  hosts throughout the page.
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

### Platform links

- Group YouTube, Spotify and Apple Podcasts in one clear section.
- Use platform names in text; do not depend on logo recognition or color alone.

## Motion

- Keep hover/focus transitions between 150–300ms.
- Use one short entrance sequence for the hero and a slow ticker as the only
  persistent motion.
- Avoid scroll-jacking, parallax, carousels and decorative animation that delays
  episode discovery.
- Respect `prefers-reduced-motion` globally.

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
- No glassmorphism over body copy.
- No emoji used as interface controls.
- No tiny icon-only controls.
- No manually maintained “latest episode” copy.
- No hard-coded heights for episode titles or descriptions.
