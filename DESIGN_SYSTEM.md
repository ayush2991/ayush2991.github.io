# Design System

A formal design specification for the personal portfolio of Aayush Agarwal ([ayush2991.github.io](https://ayush2991.github.io/)).

---

## 1. Design Philosophy & Aesthetic

The site's visual identity balances **scholarly editorial warmth** with **clean, modern engineering discipline**.

- **Editorial Foundations**: Influenced by classic academic publications and literary essays. Prominent serif typography (*Cormorant Garamond* and *Lora*) lends authority and texture to headings, identity, and section headers.
- **Engineered Restraint**: Clean sans-serif (*system-ui*) body copy, strict mathematical spacing scales, and hairline dividers create a functional, readable reading experience.
- **Warm Monochromatic Palette**: Instead of disparate, high-saturation brand colors, the site utilizes an organic, warm paper background paired with deep charcoal ink and a single warm sepia/amber accent.
- **Micro-Interaction Fidelity**: Thoughtful, subtle interactive feedback (hover washes with negative-margin bleeds, smooth CSS grid accordion reveals, floating scroll-cue indicators, and instant dark/light mode switching).

---

## 2. Design Tokens

All core tokens are defined in `:root` and overridden in `:root[data-theme="dark"]` within [`style.css`](style.css).

### 2.1 Color Palette

#### Light Mode (Default)
| Token | Value | Purpose |
| :--- | :--- | :--- |
| `--color-bg` | `#f3f2f2` | Warm off-white / light paper canvas background |
| `--color-surface-card` | `#ffffff` | Elevated card surfaces and studio containers |
| `--color-text` | `#201f1d` | High-contrast dark charcoal ink for primary text |
| `--color-muted` | `rgba(32, 31, 29, 0.68)` | Secondary labels, dates, icons, and micro-copy |
| `--color-muted-body` | `rgba(32, 31, 29, 0.85)` | Readable body text, blurbs, and item descriptions |
| `--color-accent` | `#7d5411` | Primary warm amber / sepia accent for links, tags, and highlights |
| `--color-divider` | `rgba(32, 31, 29, 0.16)` | Subtle hairline borders and structural dividers |

#### Dark Mode (`:root[data-theme="dark"]`)
| Token | Value | Purpose |
| :--- | :--- | :--- |
| `--color-bg` | `#2d2b2b` | Deep warm charcoal background |
| `--color-surface-card` | `#353333` | Elevated dark card surfaces |
| `--color-text` | `#f8f4f4` | High-contrast off-white ink for primary text |
| `--color-muted` | `#9b9797` | Muted secondary text, dates, and subtle elements |
| `--color-muted-body` | `#bab6b6` | Light gray body copy and blurbs |
| `--color-accent` | `#e1ad66` | Luminous warm gold / amber accent |
| `--color-divider` | `#444141` | Soft hairline dividers on dark backgrounds |

#### Dynamic Color Mixes (`color-mix`)
Interactive and gradient states leverage `color-mix(in srgb, ...)`:
- **Interactive Row / Button Hover**: `color-mix(in srgb, var(--color-text) 5%, transparent)`
- **Theme Toggle Hover**: `color-mix(in srgb, var(--color-text) 6%, transparent)`
- **Featured Card Gradient**:
  ```css
  background: linear-gradient(
    170deg,
    var(--color-surface-card) 0%,
    color-mix(in srgb, var(--color-surface-card) 88%, var(--color-bg)) 45%,
    color-mix(in srgb, var(--color-accent) 8.5%, var(--color-surface-card)) 100%
  );
  ```
- **Pillar Card Hover Borders**: `color-mix(in srgb, var(--color-accent) 60%, var(--color-divider))`
- **Scroll Cue Hover**: `color-mix(in srgb, var(--color-accent) 10%, var(--color-surface-card))`
- **Custom Scrollbar Thumb**: `color-mix(in srgb, var(--color-accent) 30%, transparent)`

---

### 2.2 Typography

#### Font Families
- **`--font-heading`**: `"Cormorant Garamond", Georgia, serif`
  - Used for: Main site title (`h1`), pillar titles (`.pillar-title`), mobile header name.
  - Characteristics: Elegant, high-contrast serif with humanist geometry.
- **`--font-body`**: `"Lora", Georgia, serif`
  - Used for: Section labels (`.section-label`), eyebrows (`.eyebrow`), sidebar labels (`.label`), tags/badges (`.tag`), scroll cues (`.pillar-scroll-cue`), kickers (`.pillar-kicker`).
  - Characteristics: Warm, highly readable literary serif.
- **`--font-sans`**: `system-ui, -apple-system, "Segoe UI", sans-serif`
  - Used for: Body paragraphs, descriptions, navigation links, role titles, contact lists, highlights.
  - Characteristics: Crisp, neutral, highly legible screen typeface.
- **Monospace Stack**: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`
  - Used for: Engineering card kicker prefix (`›_`), technical meta pills.

#### Typographic Scale
Every text element in the interface maps strictly to this scale:

| Token | Desktop Size | Mobile (≤560px) | Line Height | Usage |
| :--- | :--- | :--- | :--- | :--- |
| `--fs-display` | `30px` | `28px` | `1.1` – `1.15` | Sidebar name (`h1`), mobile header name |
| `--fs-heading` | `18px` | `16px` | `1.2` – `1.3` | Section labels, role titles, row titles |
| `--fs-body` | `15px` | `15px` | `1.55` – `1.65` | Main about paragraph, pillar item links |
| `--fs-sub` | `14px` | `13px` | `1.45` – `1.5` | Navigation, role descriptions, row blurbs, contact list, degree titles |
| `--fs-small` | `13px` | `13px` | `1.4` | Highlights label, education meta, row links, pillar footer links |
| `--fs-meta` | `12px` | `12px` | `1.3` | Skill tags, education universities, certification issuers |
| `--fs-micro` | `11px` | `11px` | `1.2` | Dates, years, reading time pills, kickers |

#### Typographic Guidelines
- **Leading / Line Height**: Global body line height is `1.55` to ensure optimal vertical rhythm. Body prose inside `.intro p` uses `1.65`.
- **Measure**: `--measure: 84ch` sets the maximum line length for comfortable reading on wide displays.
- **Tabular Figures**: Dates and reading times use `font-variant-numeric: tabular-nums` to preserve alignment.
- **Case & Tracking**:
  - Eyebrows & Labels: `text-transform: uppercase`, `letter-spacing: 0.04em` – `0.08em`.
  - Display Titles: `letter-spacing: -0.45px` for compact elegance.

---

### 2.3 Spacing Scale

The spacing scale is based on an 8-point / 4-point incremental progression:

| Token | Value | Common Uses |
| :--- | :--- | :--- |
| `--sp-1` | `4px` | Fine padding, tag vertical padding, small gaps |
| `--sp-2` | `8px` | Tag gaps, list item gaps, small margins |
| `--sp-3` | `12px` | Moderate inner component gaps, negative bleed margins |
| `--sp-4` | `20px` | Mobile container gutters, column gaps |
| `--sp-5` | `24px` | Sidebar block padding, pillar grid gap, nav vertical padding |
| `--sp-6` | `32px` | Sidebar vertical gap, scroll-margin-top |
| `--sp-7` | `40px` | Sidebar desktop padding, intro bottom padding |
| `--sp-8` | `56px` | Section bottom padding, pillar grid bottom margin |
| `--sp-9` | `64px` | Desktop layout column gap |

#### Exceptions & Fixed Spacing Values:
- `--row-pad`: `20px` on desktop, `18px` on mobile (≤560px).
- Navigation Item Gap: `28px` (deliberately calibrated between `--sp-5` and `--sp-6` to harmonize desktop header rhythm).
- Container Max Width: `1400px`.

---

### 2.4 Border Radii & Shadows

- **Border Radii**:
  - `3px`: Skill tags (`.tag`), meta badges (`.pillar-meta`)
  - `4px`: Mobile menu toggle (`.menu-toggle`), scrollbar thumb
  - `8px`: Row hover backdrop (`.row-item::before`), role header button (`.role-head`)
  - `10px`: Pillar cards (`.pillar-card`)
  - `12px`: Floating scroll-cue button (`.pillar-scroll-cue`)
  - `50%`: Circular theme toggle button (`.theme-toggle`)
- **Box Shadows**:
  - Standard cards: `0 1px 3px rgba(0, 0, 0, 0.02)`
  - Featured Writer card: `0 1px 4px rgba(0, 0, 0, 0.03), 0 4px 14px color-mix(in srgb, var(--color-accent) 5%, transparent)`
  - Card Hover (Elevation): `0 8px 24px color-mix(in srgb, var(--color-accent) 12%, transparent), 0 2px 6px rgba(0, 0, 0, 0.04)`
  - Scroll Cue Pill: `0 2px 8px rgba(0, 0, 0, 0.08)`

---

## 3. Layout Architecture

### 3.1 Desktop Layout (> 860px)
```
+-----------------------------------------------------------------------------------+
|                                                     [Writing] [Projects] [Career]  [*] |
+------------------------------------+----------------------------------------------+
| ASIDE (320px)                      | INTRO ("intro")                              |
|                                    | About paragraph (max 84ch)                   |
| Aayush Agarwal                     +----------------------------------------------+
| Senior LLM Research Engineer       | MAIN ("main")                                |
|                                    |                                              |
| Contact Links                      | +---------------------+ +------------------+ |
|                                    | | Intuition First     | | Software/Systems | |
| Skills (Tags)                      | | (Featured Card)     | | (Engineering)    | |
|                                    | +---------------------+ +------------------+ |
| Education                          |                                              |
|                                    | Career Trajectory (Accordion)                |
| Certifications                     | - Senior LLM Research Engineer (Bloomberg)   |
| (Sticky column with right border)  | - Machine Learning Engineer (Google)         |
|                                    | - Data Scientist (Microsoft)                 |
+------------------------------------+----------------------------------------------+
```

- **Grid Definition**:
  ```css
  .layout {
    display: grid;
    grid-template-columns: 320px 1fr;
    grid-template-areas:
      "sidebar intro"
      "sidebar main";
    column-gap: var(--sp-9);
    max-width: 1400px;
  }
  ```
- **Sticky Sidebar**: `position: sticky; top: var(--sp-5);` with right border `1px solid var(--color-divider)`.

### 3.2 Responsive Breakpoints

#### Tablet / Stacked Desktop (≤ 860px)
- **Top Bar Transformation**:
  - The desktop `.nav` row is hidden (`display: none`).
  - `.mobile-header` appears, containing name, role, and hamburger menu button (`#menu-toggle`).
  - Expandable `#mobile-menu` drops down below the header with smooth click-to-close behavior.
- **Content Hierarchy Reordering**:
  ```css
  grid-template-columns: 1fr;
  grid-template-areas:
    "intro"
    "sidebar"
    "main";
  ```
  *The intro section leads first*, followed by the sidebar info, then main project/career content.
- **Sidebar Restructuring**:
  - Identity section inside sidebar hides to prevent duplication with mobile header.
  - Border transitions from right-side divider to bottom divider (`border-bottom: 1px solid var(--color-divider)`).
  - Sidebar changes into a 2-column grid (`grid-template-columns: 1fr 1fr`).
  - Education and Certifications sit side-by-side (`.sidebar-block--half`), while contact and skills span both columns.
- **Pillar Grid**: Drops from 2 columns to a single column (`grid-template-columns: 1fr`).
- **Career Item Meta**: Date and company move above description, indented beside the title.
- **Theme Toggle**: Repositions to fixed bottom-right (`bottom: var(--sp-4); right: var(--sp-6)`).

#### Mobile Phones (≤ 560px)
- Gutters tighten to `var(--sp-4)` (20px).
- Typographic scale steps down (`--fs-display: 28px`, `--fs-heading: 16px`, `--fs-sub: 13px`).
- Row padding tightens (`--row-pad: 18px`).
- Section labels bottom margin tightens to `18px`.

---

## 4. Components & Patterns

### 4.1 Theme Toggle (`.theme-toggle`)
- **Structure**: Native `<button id="theme-toggle" class="theme-toggle" type="button" aria-label="...">`
- **Icon Convention**: Displays the icon for the *target* state (Sun icon indicates clicking will switch to light mode; Moon icon indicates dark mode).
- **Placement**: Fixed position (`z-index: 10`), top right on desktop (`top: 24px; right: 48px`), bottom right on mobile.
- **Persistence**: Synced with `localStorage.getItem('theme')` and OS `prefers-color-scheme`.

### 4.2 Sidebar Identity & Contact List
- **Name**: `.sidebar h1` styled in `--font-heading` (`32px`, `line-height: 1.15`, `-0.45px` letter spacing).
- **Eyebrow**: Uppercase serif subtitle in `--color-accent`.
- **Contact List**: Vertical flex list (`.contact-list`). Each item is an `<a>` flex-row with an SVG icon (`16px × 16px`) and text. On hover, both the icon and text transition to `--color-accent`.

### 4.3 Skill Badges (`.tags` / `.tag`)
- **Structure**:
  ```html
  <div class="tags">
    <span class="tag">Agentic Systems</span>
    <span class="tag">Python</span>
  </div>
  ```
- **Styling**: Rendered in `--font-body`, `font-size: var(--fs-meta)`, `border: 1px solid var(--color-accent)`, `color: var(--color-accent)`, border radius `3px`, padding `4px 11px`.
- **Color Rule**: All skill tags use the unified single accent color palette without distinct brand hues.

### 4.4 Dual-Pillar Cards (`.dual-pillar-grid`, `.pillar-card`)
A paired two-column showcase comparing two distinct professional pillars:
1. **Featured Publication Card (`.featured-writer`)**:
   - Background: Warm gradient wash mixing surface card, page background, and subtle accent tint.
   - Kicker: Circular bullet point (`::before`) + uppercase track.
   - Title: Editorial title featuring italicized word (`<em>First</em>`).
   - Meta Badge: Warm accent tinted reading-time pill (`font-size: 11px`, `padding: 1px 7px`, `border-radius: 3px`).
2. **Software & Systems Card (`.card-engineering`)**:
   - Background: Crisp solid `--color-surface-card` studio surface with hairline border.
   - Kicker: Monospace terminal prefix (`›_`).
   - Meta Badge: Monospace tech pill (`font-size: 10.5px`, `border: 1px solid var(--color-divider)`).

#### Scrollable List & Scroll Cue
Both pillar cards incorporate a fixed-height scrollable list (`max-height: 218px`):
- **Fade Wash**: A bottom gradient mask (`::after`) indicates additional content below the fold.
- **Scroll Cue (`.pillar-scroll-cue`)**: Floating pill button (`+1 more` with down chevron).
  - Automatically fades out when scrolled near the bottom (`data-at-bottom="true"`).
  - Clicking triggers smooth scrolling to the end of the list.

### 4.5 Career Trajectory Accordion (`.role`)
- **Markup**:
  ```html
  <div class="role" data-open="false">
    <button class="role-head" type="button" aria-expanded="false">
      <svg class="role-chevron" ...></svg>
      <div class="role-title">Title</div>
      <div class="role-meta">
        <div class="role-company">Company</div>
        <div class="role-years">2026 — Present</div>
      </div>
      <div class="role-desc">Description text...</div>
    </button>
    <div class="role-body">
      <div class="role-body-inner">
        <div class="highlights-label">Highlights</div>
        <div class="highlight">— Detail bullet...</div>
      </div>
    </div>
  </div>
  ```
- **Interaction Mechanism**:
  - Controlled by native button with `aria-expanded`.
  - Chevron rotates `90deg` via CSS transition.
  - Expansion is powered by **CSS Grid Rows** (`grid-template-rows: 0fr -> 1fr`) on `.role-body`, allowing content to calculate its own height without hardcoded limits.
  - Hover states utilize negative-margin horizontal padding bleeds for clean alignment.

### 4.6 Standard Row Items (`.row-item`)
- Used for archives and index lists.
- Uses `::before` pseudo-element with `inset: 0 calc(-1 * var(--sp-3))` and `border-radius: 8px` to provide a subtle tinted hover wash without shifting text alignment.

---

## 5. Micro-Interactions & Animation Guidelines

- **Duration & Easing**:
  - Color, background, and hover fills: `0.15s ease`
  - Theme transitions: `0.2s`
  - Pillar card elevation and hover translate: `0.2s ease` (`transform: translateY(-2px)`)
  - Accordion expand/collapse: `0.22s ease`
- **Touch-Friendly Hover Protection**:
  All row and card hover tints are placed behind `@media (hover: hover)` media queries to prevent hover highlights from sticking to tapped elements on mobile touchscreens.
- **Accessibility / Reduced Motion**:
  ```css
  @media (prefers-reduced-motion: reduce) {
    .role-body,
    .role-chevron {
      transition: none;
    }
  }
  ```

---

## 6. Engineering Conventions for Contributors & Agents

1. **Pure Vanilla Architecture**: No npm dependencies, no Sass/Less preprocessors, no client-side frameworks, and no build pipeline. All styles belong in `style.css` and all logic in `script.js`.
2. **Token Integrity**:
   - Never hardcode raw hex or rgba colors for UI elements; always reference the CSS variables (`var(--color-...)`).
   - For margins, paddings, and gaps, strictly choose from `--sp-1` through `--sp-9`.
   - For font sizes, select strictly from the `--fs-*` type scale tokens.
3. **Typography Rule**:
   - Titles & Main Identity: `--font-heading` (*Cormorant Garamond*).
   - Labels, Eyebrows, Tags, Cues: `--font-body` (*Lora*).
   - Body copy, UI controls, navigation, and role titles: `--font-sans` (*system-ui*).
4. **Accessibility First**:
   - Every interactive control must be a semantic `<button>` or `<a>`.
   - Maintain `aria-expanded`, `aria-label`, and `hidden` states for dynamic widgets.
   - Ensure color contrast ratios meet WCAG AA standards in both light and dark themes.
5. **Mobile-First Integrity**:
   - Any layout modification must be validated against desktop (>860px), tablet (560px–860px), and phone (≤560px) breakpoints.
   - When introducing new accordion items or lists, ensure mobile grid area placement remains functional.
