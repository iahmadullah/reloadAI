# Reloadux Design System

> Extracted from Figma: **MCP → Reloadux - Home Page ✨ Final ✅**
> Last Updated: 2026-02-22

---

## 1. Brand Identity

### Logo
- **Name:** `reloadux`
- **Format:** Wordmark in SVG
- **Light context:** Dark version on light backgrounds
- **Dark context:** White version on dark backgrounds (#FFFFFF)
- **Logo safe zone:** 80px from edges on 1440px canvas

---

## 2. Color System

### 2.1 Base Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `Base colors/Night` | `#090909` | Primary dark background |
| `Monochrome/Black` | `#000000` | Text on light surfaces |
| `Monochrome/White` | `#FFFFFF` | Text on dark surfaces, primary buttons |
| `Base colors/Smoke` | `#D9D9D9` | Dividers, disabled elements |

### 2.2 Gray Scale
| Token | Hex | Usage |
|-------|-----|-------|
| `Gray/25` | `#FCFCFD` | Lightest backgrounds |
| `Gray/100` | `#F2F4F7` | Light section backgrounds, tag backgrounds |
| `Gray/200` | `#EAECF0` | Borders, dividers |
| `Gray/300` | `#D0D5DD` | Inactive borders, button outlines |
| `Gray/400` | `#98A2B3` | Placeholder text |
| `Gray/500` | `#667085` | Secondary text, muted labels |
| `Gray/600` | `#475467` | Body text on light bg |
| `Gray/700` | `#344054` | Tag text, strong secondary text |
| `Gray/900` | `#101828` | Primary text on light bg |

### 2.3 Brand Custom Grays
| Token | Hex | Usage |
|-------|-----|-------|
| `Base colors/Grey/200` | `#D1D1D1` | Soft dividers |
| `Base colors/Grey/300` | `#C3C3C3` | Decorative borders |
| `Base colors/Grey/400` | `#A5A9AC` | Muted icons |
| `Base colors/Grey/600` | `#565656` | Dark muted text |
| `Base colors/Grey/700` | `#333333` | Dense dark text |

### 2.4 Brand Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `Primary/Oxford/900` | `#1D2939` | Dark branded surfaces |
| `Secondary/Moonstone/900` | `#00A7B7` | Accent teal |
| `Secondary/Moonstone/100` | `#F2FBFB` | Teal light bg |
| `Secondary/Moonstone/200` | `#E2FBFB` | Teal subtle bg |
| `Secondary/Sunset/700` | `#F99806` | Warm accent / warning |
| `Secondary/Sunset/800` | `#A46404` | Dark warm accent |
| `Secondary/Sunset/100` | `#FFF9F0` | Warm tint bg |
| `Secondary/Periwinkle/100` | `#ECF2FF` | Cool tint bg |
| `Secondary/SandStone/900` | `#F8F1E4` | Warm neutral bg |

### 2.5 Semantic Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `Success/500` | `#17B26A` | Success states |
| `Success/600` | `#079455` | Active success |
| `Success/700` | `#027A48` | Strong success |
| `Red/400` | `#F97066` | Error emphasis |
| `Red/600` | `#D92D20` | Error / destructive |
| `Blue/700` | `#175CD3` | Info / links |
| `Blue/500` | `#2E90FA` | Interactive blue |
| `Pink/400` | `#F670C7` | Decorative accent |

### 2.6 Component-Specific Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `Button Primary BG` | `#7F56D9` | Primary action / CTA (send buttons) |
| `Purple CTA Gradient Start` | `#3B1C8C` | CTA section gradient |
| `Purple CTA Gradient End` | `#4A1D96` | CTA section gradient |

---

## 3. Typography

### 3.1 Font Families
| Family | Weights | Usage |
|--------|---------|-------|
| **Manrope** | 400 (Regular), 500 (Medium), 600 (SemiBold) | Primary sans-serif — headings, body text, buttons, labels |
| **Libre Baskerville** | 400 (Regular), 400 Italic | Serif accent — italic emphasis words in hero headings ("intelligent", "experiences", "complexity", "clarity") |

### 3.2 Type Scale (from Figma Variables)

#### Headings
| Token | Family | Weight | Size | Line Height | Usage |
|-------|--------|--------|------|-------------|-------|
| `Heading/H1` | Manrope | Medium (500) | 70px | 88px | Hero main headline |
| `Heading/H2` | Libre Baskerville | Regular (400) | 40-48px | 53px | Section headlines, About Us description |
| `Heading/H3` | Manrope | Medium (500) | 48px | 100% | Stat numbers (10M+, 80%, etc.) |
| `Heading/lg/Medium` | Manrope | Medium (500) | 48px | 100% | Large emphasis headings |

#### Paragraphs
| Token | Family | Weight | Size | Line Height | Usage |
|-------|--------|--------|------|-------------|-------|
| `Paragraph/xl/Medium` | Manrope | Medium (500) | 30px | 48px | Section subtitles, large descriptions |
| `Paragraph/xl/Semi-bold` | Manrope | SemiBold (600) | 30px | 48px | Bold section subtitles |
| `Paragraph/lg/Regular` | Manrope | Regular (400) | 28px | 48px | Section descriptions, testimonial text |
| `Paragraph/md/Regular` | Manrope | Regular (400) | 22px | 40px | Body paragraphs, card descriptions |
| `Paragraph/sm/Medium` | Manrope | Medium (500) | 18px | 100% | Hero sub-tagline, nav labels |
| `Paragraph/sm/Regular` | Manrope | Regular (400) | 18px | 100% | Supporting body text |
| `Paragraph/xs/Regular` | Manrope | Regular (400) | 16px | 26px | Small body text, metadata |

#### UI / Tags / Buttons
| Token | Family | Weight | Size | Line Height | Usage |
|-------|--------|--------|------|-------------|-------|
| `Button/xl/Medium` | Manrope | Medium (500) | 20px | 28px | Large CTA buttons |
| `Button/lg/Medium` | Manrope | Medium (500) | 16px | 100% | Standard buttons |
| `Button/lg/Regular` | Manrope | Regular (400) | 16px | 100% | Button text variants |
| `Tag/T1` | Libre Baskerville | Regular (400) | 18px | 60px | Section labels `[ OUR SERVICES ]` (letter-spacing: 2px) |
| `Tag/T2` | Manrope | Regular (400) | 14px | 22px | Tag pills, chip text |

---

## 4. Spacing System

### 4.1 Base Spacing Tokens
| Token | Value |
|-------|-------|
| `spacing-none` | 0px |
| `spacing-xs` | 4px |
| `spacing-sm` | 6px |
| `spacing-md` | 8px |
| `spacing-lg` | 12px |
| `spacing-xl` | 16px |
| `spacing-3xl` | 24px |

### 4.2 Layout Spacing (derived from Figma frame positions)
| Usage | Value |
|-------|-------|
| **Page max-width** | 1440px |
| **Content max-width** | 1280px (with 80px padding each side) |
| **Section horizontal padding** | 80px |
| **Section vertical padding** | 120px (banner sections), 80px (compact sections) |
| **Two-column gap** | 120px (services grid), 64px (tight) |
| **Card gap** | 40px (large), 24px (standard) |
| **Inner card padding** | 32-40px |
| **Content gap (text blocks)** | 20-24px |

---

## 5. Border & Radius

| Token | Value | Usage |
|-------|-------|-------|
| `radius-sm` | 6px | Small elements, chips |
| `radius-md` | 8px | Cards, input fields |
| `radius-lg` | 12px | Large cards, modals |
| `radius-xl` | 20px | Feature cards |
| `radius-pill` | 50px / 30px | Buttons, pills, tags |
| `radius-circle` | 50% | Avatars, dots, icon buttons |

---

## 6. Shadows & Effects

| Name | Value | Usage |
|------|-------|-------|
| **Button glow** | `0px 0px 12px rgba(255,255,255,0.5)` | White CTA button on dark |
| **Card hover** | `0 12px 40px rgba(0,0,0,0.08)` | Industry cards on hover |
| **Dashboard card** | `0 25px 80px rgba(0,0,0,0.3)` | Hero dashboard / mockup |
| **Subtle elevation** | `0 4px 20px rgba(0,0,0,0.06)` | Testimonial cards |

---

## 7. Layout Patterns

### 7.1 Page Grid
- **Canvas width:** 1440px
- **Content area:** 1280px centered (80px margin each side)
- **12-column grid implicit** with flexible columns

### 7.2 Section Header Pattern
Used in: Services, About Us, Capabilities, Diversity, Our Work, Testimonials
```
┌─────────────────────────────────────────────────┐
│  [ SECTION LABEL ]          Section headline     │
│  (left-aligned)             that spans the       │
│  Tag/T1 style               right column area    │
│  ~180px wide                 Libre Baskerville    │
│                              or Manrope, 40-48px  │
└─────────────────────────────────────────────────┘
```
- Left column: Section label in `Tag/T1` — bracketed uppercase `[ SECTION LABEL ]`
- Right column (offset ~550px from left): Large heading in serif or sans

### 7.3 Two-Column Content Layout
Used in: GenAI Banners, Capabilities, About Us
- Left: Text content (heading + description + CTA button)
- Right: Visual/image/mockup

### 7.4 Card Grid Layouts
- **3-column:** Industry diversity cards (400px each, gap 40px)
- **2-column:** Services grid (580px each, gap 120px)
- **Full-width stack:** Project showcases

---

## 8. Component Specifications

### 8.1 Primary Button (White on Dark)
```css
background: #FFFFFF;
color: #000000;
padding: 16px 28px;
border-radius: 30px;
font: Manrope Medium 16px;
box-shadow: 0px 0px 12px rgba(255,255,255,0.5);
/* Includes right arrow icon (20x20) */
```

### 8.2 Outline Button (Dark bg)
```css
background: transparent;
color: #FFFFFF;
padding: 20px 40px;
border: 1.5px solid rgba(255,255,255,0.35);
border-radius: 30px;
font: Manrope Medium 20px/28px;
/* Includes right arrow icon (26x26) */
```

### 8.3 Section Label Tag
```css
font: Libre Baskerville Regular 18px/60px;
letter-spacing: 2px;
text-transform: uppercase;
color: rgba(255,255,255,0.6); /* dark bg */
color: #667085;              /* light bg */
format: "[ LABEL TEXT ]"
```

### 8.4 Service Card
```
┌──────────────────────────────────────┐
│ ─── top border line ───              │
│                                      │
│  [ FOR CATEGORY ]    (Tag/T1 style)  │
│  Service Title       (Manrope 48px)  │
│                                      │
│                     ┌──┐             │
│                     │↗│ Icon button  │
│                     └──┘ 64x64       │
│ ─── bottom border line ───           │
└──────────────────────────────────────┘
```
- Width: 580px
- Height: auto (152–192px)
- Top/bottom lines: `1px solid rgba(255,255,255,0.1)`
- Arrow button: 64x64 circle, dark with arrow icon

### 8.5 Industry/Diversity Card
```
┌──────────────────────┐
│ Title (Manrope 48px  │
│   weight 500)        │
│                      │
│  ┌─────┐ ┌─────┐    │
│  │ Tag │ │ Tag │    │
│  └─────┘ └─────┘    │
│  ┌─────┐ ┌─────┐    │
│  │ Tag │ │ Tag │    │
│  └─────┘ └─────┘    │
│                      │
│  →  (arrow link)     │
│         ┌──────────┐ │
│         │ Abstract │ │
│         │   image  │ │
│         └──────────┘ │
└──────────────────────┘
```
- Width: 400px, Height: 304px
- Background: White `#FFFFFF`
- Inner padding: 32px top, 40px sides
- Tags: `Manrope 14px/22px`, padding `8px 20px`, border `1px solid #D0D5DD`, border-radius pill
- Bottom-left: Arrow icon `→` 32x32

### 8.6 Project Showcase Card
```
┌──────────────────────────────────────────────┐
│                                              │
│          [Full-width image/mockup]           │
│           width: 1280px                      │
│           height: 513px                      │
│           border-radius: 12px                │
│                                              │
├──────────────────────────────────────────────┤
│  [ PROJECT NAME ]      Description text      │
│  Tag/T1 style          Paragraph/lg/Regular  │
│  left (~0px)           right (~550px offset)  │
└──────────────────────────────────────────────┘
```

### 8.7 Stats Counter
```css
.stat-number {
  font: Manrope Medium 70-80px/100px;  /* "10M+", "80%", "95%", "35+" */
  color: #000000;
}
.stat-description {
  font: Manrope Regular 16px/24px;
  color: #667085;
}
/* 4-column grid, equal spacing, 270px per stat */
```

### 8.8 Capabilities Accordion
```
─── divider line ───
│ Research      ✕ (close/expand icon, 33x33)
│   • UX Research
│   • UX Audit
│   • Discovery Workshops
│   • Usability Testing
─── divider line ───
│ Design        + (expand icon)
─── divider line ───
│ Deliver       + (expand icon)
─── divider line ───
```
- Title font: Libre Baskerville 40px/53px
- Sub-items: Manrope Regular 18px, color `rgba(255,255,255,0.55)`
- Expand icon: 33x33 circle, `+` or `✕`

### 8.9 Footer
- Background: `#090909` (Night)
- 4-column grid for link sections
- Logo + Contact info + Location in top row
- Resources | Case Study | Services | Socials in main grid
- Capabilities section below with 4 columns
- Industries row at bottom
- Copyright: centered, `Manrope Regular 14px`, color `rgba(255,255,255,0.3)`

---

## 9. Section Backgrounds

| Section | Background |
|---------|-----------|
| Header | Transparent → `rgba(0,0,0,0.92)` on scroll + blur(16px) |
| Hero | `#090909` (Night) — solid dark |
| Trust Bar / Logo strip | `#090909` with gradient fade masks on sides |
| GenAI Banners (×3) | Dark `#090909` with subtle gradient vector bg |
| Services | `#090909` with abstract flow art left side |
| About Us | Light `#F9FAFB` with holographic glass orb left |
| Capabilities | `#090909` with abstract glass flow art left |
| Diversity | `#F9FAFB` light (same as About Us palette) |
| Our Work | `#090909` dark, alternating light project images |
| Testimonials | `#F9FAFB` light with glass orb decoration |
| Blog | `#090909` dark |
| CTA | Purple gradient: `linear-gradient(135deg, #3B1C8C, #1E1145, #2A1366, #4A1D96)` with radial overlays |
| Footer | `#090909` dark |

---

## 10. Animation & Interaction Tokens

| Element | Animation |
|---------|-----------|
| **Logo marquee** | Infinite horizontal scroll, with fade gradients on edges |
| **Accordion expand** | `max-height` transition, 0.4s ease |
| **Button hover** | Arrow slides right 3px; border/bg color transition |
| **Card hover** | `translateY(-4px)` + shadow increase |
| **Header scroll** | Background fades in with backdrop-filter blur |
| **Diversity carousel** | Horizontal scroll with dot indicators |
| **Flow art** | Organic blob animation, 12s alternate infinite |
| **Testimonials** | Vertical scroll/auto-rotate cards |
| **Industry cards** | Hover lift + shadow |

---

## 11. Icon System

| Icon | Size | Usage |
|------|------|-------|
| Right arrow `→` | 20px, 26px | Buttons (CTA) |
| Northeast arrow `↗` | 64px container | Service card action |
| Plus `+` | 33px | Accordion expand |
| Close `✕` | 33px | Accordion collapse |
| Social: LinkedIn | 38x38 container | Footer |
| Social: Facebook | 38x38 container | Footer |
| Social: Instagram | 38x38 container | Footer |
| Dot indicators | 11px circles | Carousel pagination |

---

## 12. Responsive Breakpoints (Recommended)

| Breakpoint | Max-width | Behavior |
|------------|-----------|----------|
| **Desktop XL** | 1440px+ | Full design as in Figma |
| **Desktop** | 1200px | Content area scales |
| **Tablet** | 768px | 2→1 columns, reduce font sizes |
| **Mobile** | 480px | Single column, hamburger nav, stacked cards |

---

## 13. Google Fonts Import

```html
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600&family=Libre+Baskerville:ital,wght@0,400;1,400&display=swap" rel="stylesheet">
```

---

*This design system is the single source of truth for the Reloadux website implementation.*
