# Agent Guidelines for ayush2991.github.io

This document provides instructions, constraints, and architecture guidelines for AI coding agents and human contributors working on this repository.

---

## 1. Project Overview & Architecture

This repository hosts the personal portfolio website of **Aayush Agarwal**, Senior LLM Research Engineer at Bloomberg ([ayush2991.github.io](https://ayush2991.github.io/)).

### Technology Stack
- **Pure Vanilla Web**: HTML5, CSS3, and standard modern JavaScript (ES6+).
- **Zero Build Step**: No bundler (Vite, Webpack), no package manager (npm, yarn, pnpm), no CSS preprocessor (Sass, Tailwind), and no JS framework (React, Vue).
- **Direct Deployment**: Deployed directly via GitHub Pages from the `main` branch.
- **Key Files**:
  - `index.html`: Core markup and document structure.
  - `style.css`: All CSS styling, custom properties (design tokens), layout grids, and animations.
  - `script.js`: Vanilla JavaScript managing theme toggling, accordion interaction, mobile menu, and pillar card scroll cues.
  - `DESIGN_SYSTEM.md`: Complete design specification and design token dictionary.

---

## 2. Design System Requirement

> [!IMPORTANT]
> **All UI, styling, and layout changes MUST strictly conform to [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md).**
> Do not introduce ad-hoc styles, untokenized colors, arbitrary font sizes, or foreign UI patterns.

### Core Token Adherence
- **Colors**: Always use CSS variables (`var(--color-bg)`, `var(--color-text)`, `var(--color-accent)`, `var(--color-divider)`, `var(--color-muted)`, `var(--color-muted-body)`, `var(--color-surface-card)`). Never hardcode hex/RGB values in style rules.
- **Dual Themes**: Every new element must look intentional in both **Light** and **Dark** themes. Test color contrast in both modes.
- **Spacing**: Use the 9-step spacing scale tokens (`--sp-1` through `--sp-9`). Do not invent arbitrary margins or paddings (except documented component constants like `--row-pad` or the 28px nav gap).
- **Typography**:
  - Headings & Names: `--font-heading` (*Cormorant Garamond*).
  - Eyebrows, Labels, Tags, Cues: `--font-body` (*Lora*).
  - Body, Navigation, Highlights, Technical Copy: `--font-sans` (*system-ui*).
  - Scale: Font sizes must map strictly to `--fs-display`, `--fs-heading`, `--fs-body`, `--fs-sub`, `--fs-small`, `--fs-meta`, or `--fs-micro`.
- **Accents**: Maintain the single warm amber/sepia accent aesthetic (`#7d5411` light / `#e1ad66` dark). Do not introduce saturated brand colors or multi-colored tags.

---

## 3. Responsive Layout Guidelines

The layout relies on a clean CSS Grid architecture with three critical responsive tiers:

1. **Desktop (> 860px)**:
   - Two-column grid (`320px 1fr`).
   - Sticky sidebar on the left with a right-hand hairline divider.
   - Top right navigation row (`.nav`) with 120px right padding to clear the fixed theme toggle button.
   - Dual-pillar grid (`.dual-pillar-grid`) renders side-by-side (2 columns).
2. **Tablet / Stacked Layout (≤ 860px)**:
   - Desktop `.nav` is hidden; `.mobile-header` and collapsible `#mobile-menu` take over.
   - Layout stacks vertically into a single column: `intro` section appears at the top, followed by `sidebar`, followed by `main`.
   - Sidebar becomes a 2-column grid (`1fr 1fr`) where education and certifications sit side-by-side (`.sidebar-block--half`).
   - Dual-pillar grid stacks into 1 column.
3. **Mobile Phone (≤ 560px)**:
   - Margins and gutters tighten to `--sp-4` (20px).
   - Type scale steps down: `--fs-display: 28px`, `--fs-heading: 16px`, `--fs-sub: 13px`.
   - Row vertical padding drops from 20px to 18px (`--row-pad: 18px`).

---

## 4. Component Patterns & Conventions

When modifying or introducing components:

- **Accordion Roles (`.role`)**:
  - Must remain accessible: `<button class="role-head" aria-expanded="false">`.
  - Expanding content must be animated via `grid-template-rows: 0fr -> 1fr` on `.role-body` to preserve dynamic height calculation.
  - Motion must respect `@media (prefers-reduced-motion: reduce)`.
- **Pillar Cards (`.pillar-card`)**:
  - Maintain the distinction between `.featured-writer` (warm gradient surface, serif accent, dot kicker) and `.card-engineering` (studio card surface, monospace kicker and pills).
  - Scrollable item lists must be wrapped in `.pillar-list-container` with custom scrollbars and floating `.pillar-scroll-cue`.
- **Touch-Friendly Hover States**:
  - Always wrap interactive hover backgrounds in `@media (hover: hover)` so hover tints do not stick when tapped on mobile screens.
- **Semantic HTML & Accessibility**:
  - Use semantic elements (`<header>`, `<nav>`, `<aside>`, `<main>`, `<section>`, `<button>`, `<a>`).
  - Maintain correct ARIA attributes (`aria-expanded`, `aria-label`, `aria-controls`, `aria-hidden`).

---

## 5. JavaScript Standards

- **Vanilla IIFEs**: Keep JavaScript modular and organized into self-contained Immediately Invoked Function Expressions (IIFEs) or lightweight closures.
- **Data Attributes for State**: Coordinate state between JavaScript and CSS via data attributes (e.g. `data-theme`, `data-open`, `data-at-bottom`).
- **No Global Leakage**: Do not expose variables to the global window scope unless necessary.
- **Passive Listeners**: Use `{ passive: true }` for scroll and resize listeners where appropriate.

---

## 6. Development & Verification Checklist

Before finalizing any changes, verify:
- [ ] **Design Tokens**: All newly introduced CSS values reference appropriate tokens in [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md).
- [ ] **Theme Switching**: Tested in both light mode and dark mode; all text is legible and has sufficient contrast.
- [ ] **Responsiveness**: Checked desktop (>860px), tablet (560px–860px), and mobile (≤560px) viewports.
- [ ] **Interactive Elements**: Accordions expand and collapse properly; mobile menu opens, closes, and closes upon navigation link click; scroll cues show/hide accurately.
- [ ] **Accessibility**: ARIA labels and states are updated accurately on interactive buttons.
- [ ] **Code Hygiene**: Zero external library imports or build dependencies added.
