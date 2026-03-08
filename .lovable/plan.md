

# Redesign: "Human-Centric AI" Palette & Typography

## What Changes

A full visual overhaul of CareProof — swapping the current cool sage/teal/slate palette for warm, human-centric tones, and replacing Inter with friendlier typefaces.

## Color System

| Role | Current | New |
|------|---------|-----|
| Background (light) | `#f5f8f6` cool sage-white | `#FCF9F6` warm cream |
| Background (dark) | `#020617` deep slate | `#1A1614` warm dark brown |
| Primary accent | `#7FB8A4` sage green | `#E67E76` terracotta/muted rose |
| Success/verified | sage green | `#7FB069` sage green (kept) |
| Heading text | `hsl(210 25% 15%)` cool | `#2D2926` warm charcoal |
| Body text | cool gray | `#5C5552` warm taupe |
| Gold accent | `#E6C97A` | kept as warm gold, complements terracotta |

## Typography

- Import **Outfit** (headings) and **Plus Jakarta Sans** (body/UI) via Google Fonts in `index.css`
- Update `tailwind.config.ts` font families: `font-heading: Outfit`, `font-sans: Plus Jakarta Sans`
- Apply `font-heading` to all heading elements across components

## Files to Edit

### 1. `index.css`
- Replace Inter import with Outfit + Plus Jakarta Sans
- Rewrite all CSS custom properties for both `:root` (light) and `.dark` with new palette
- Update `.glass-card` to use diffused warm shadows instead of borders
- Update `.glow-sage` → `.glow-primary` with terracotta tones
- Update `.text-gradient-sage` and `.text-gradient-gold` with new gradients
- Update `.bg-gradient-hero` to cream-to-pale-peach gradient

### 2. `tailwind.config.ts`
- Add `font-heading: ['Outfit', 'sans-serif']` and update `font-sans` to Plus Jakarta Sans
- Update custom color tokens: `sage` → terracotta, add `verified` green
- Increase default `--radius` to `1rem` (2xl feel)

### 3. `src/components/HeroSection.tsx`
- Replace `text-gradient-sage` / `text-gradient-gold` with updated gradient classes
- Update floating shapes to use new warm palette colors
- Add `HeartHandshake` or `Sparkles` icon next to headline
- Apply `font-heading` to heading

### 4. `src/components/HowItWorks.tsx`
- Update icon background colors to terracotta tint
- Apply `font-heading` to heading
- Update `glass-card` hover states to terracotta

### 5. `src/components/SkillsMapping.tsx`
- Update gradient references and text color classes
- Apply `font-heading` to heading

### 6. `src/components/Navbar.tsx`
- Update active link color to terracotta
- Update sign-in button border/text to terracotta
- Apply brand gradient to "CareProof" text

### 7. `src/components/Footer.tsx`
- Minor color class updates

### 8. `src/pages/Upload.tsx`
- Update dropzone border to warm clay color
- Update glow effects to terracotta
- Add sage-green pulse animation on file hover
- Apply `font-heading` to heading

### 9. `src/components/CareScoreGauge.tsx`
- Update stroke color from sage to terracotta
- Update gradient text classes
- Apply `font-heading`

### 10. `src/components/EconomicValue.tsx`
- Update gold glow and gradient references

### 11. `src/components/CareTimeline.tsx`
- Update check icon background to verified sage green
- Update skill tag colors

### 12. `src/components/PortfolioSection.tsx`
- Update button and tag colors to new palette

### 13. `src/components/ThemeToggle.tsx`
- Minor: ensure toggle background matches new muted tones (should inherit automatically)

## Design Details

- **Border radius**: Increase `--radius` from `0.75rem` to `1rem` for softer, rounder feel
- **Shadows**: Replace sharp borders with `shadow-xl shadow-stone-200/50` style diffused shadows in light mode
- **Glass cards**: Warm tinted glass (`bg-white/60` light, `bg-stone-900/60` dark) with diffused shadow instead of harsh border
- **Dropzone**: Dashed border in clay/terracotta tint; sage-green pulse glow on drag-over state

