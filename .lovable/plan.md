# Minimal Color System Redesign (Dark-First, Tesla-Inspired)

## Current color mistakes (to remove)

- Orange→red gradients on CTAs (`from-orange-500 to-red-600`) — decorative, two hues doing one job.
- Warm orange primary + separate `--primary-glow` gradient — extra hue with no functional role.
- Hardcoded utilities in components (`bg-orange-50`, `text-orange-700`, `border-orange-200`, `bg-white`, `text-neutral-900/700/500/400`) — bypass tokens, break dark mode.
- Multiple grey ramps (`neutral-*`, `muted-foreground`, `border/60`, `bg-muted/30`) used interchangeably — inconsistent hierarchy.
- 5 chart colors + full sidebar palette shipped but unused — dead tokens.
- Light-mode-first tokens; dark mode is an afterthought.

## 1. Core palette (3 colors, dark-first)

| Token | HEX | Role |
|---|---|---|
| Background | `#0E0E10` | App background (deep grey, not pure black) |
| Surface | `#1A1A1D` | Cards, inputs, header, footer |
| Border | `#2A2A2E` | Dividers, input borders |
| Text primary | `#F5F5F7` | Headings, body |
| Text muted | `#8A8A90` | Secondary text, labels, captions |
| **Primary (CTA)** | `#E31937` | Tesla red — every primary action, focus ring, active link |
| Success | `#22C55E` | Confirmations only |
| Warning | `#F59E0B` | Warnings only |
| Error | `#EF4444` | Destructive/error only |

Light mode (secondary, mirrored):
- Background `#FFFFFF`, Surface `#F5F5F7`, Border `#E5E5EA`, Text `#0E0E10`, Muted `#6B6B70`, Primary unchanged `#E31937`.

No gradients. No accent color. No chart/sidebar palette.

## 2. Functional usage rules

- **CTA buttons** → solid Primary `#E31937` on Background, white text. One style only. No gradient.
- **Secondary buttons** → transparent, Border outline, Text primary.
- **Text hierarchy** → Text primary for headings/body, Text muted for meta/labels only. No third grey.
- **States** → Success/Warning/Error used *only* on their semantic events (toasts, form errors, badges). Never decorative.
- **Focus ring** → Primary at 60% opacity.
- **Same color = same meaning** everywhere.

## 3. Implementation

### `src/styles.css`
- Swap `:root` and `.dark` token values to the palette above using `oklch()`.
- Delete: `--primary-glow`, `--gradient-primary`, `--gradient-hero`, `--shadow-elegant`, all `--chart-*`, all `--sidebar-*`.
- Delete `@utility bg-gradient-hero`, `bg-gradient-primary`, `shadow-elegant`.
- Set dark mode as default: add `class="dark"` on `<html>` in `src/routes/__root.tsx` `RootShell`.

### Component sweep (replace hardcoded colors with tokens)
- `src/components/site-header.tsx` — remove `bg-gradient-to-r from-orange-500 to-red-600`; use `bg-primary text-primary-foreground`.
- `src/components/contact-form.tsx` — replace all `bg-orange-*`, `text-orange-*`, `border-orange-*`, `bg-white`, `text-neutral-*` with `bg-primary`, `bg-card`, `text-foreground`, `text-muted-foreground`, `border-border`.
- `src/components/site-footer.tsx` — already token-based, verify.
- `src/components/calc-layout.tsx` and `src/routes/index.tsx` — audit and replace any gradient/orange/neutral hardcodes with tokens.
- `src/routes/__root.tsx` error/404 components — already token-based, verify after dark default.

### Out of scope
- No layout, typography, spacing, or content changes.
- No new components.
- Calculator math and MCP untouched.

## Verification
- Build passes.
- Grep confirms zero `from-orange`, `to-red`, `bg-white`, `text-neutral-`, `bg-orange`, `text-orange`, `border-orange` in `src/`.
- Preview loads in dark mode by default with red CTAs on deep-grey surfaces.
