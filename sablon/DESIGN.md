---
name: Cyber-Minimalist Professional
colors:
  surface: '#0e1322'
  surface-dim: '#0e1322'
  surface-bright: '#343949'
  surface-container-lowest: '#090e1c'
  surface-container-low: '#161b2b'
  surface-container: '#1a1f2f'
  surface-container-high: '#25293a'
  surface-container-highest: '#2f3445'
  on-surface: '#dee1f7'
  on-surface-variant: '#c7c4d8'
  inverse-surface: '#dee1f7'
  inverse-on-surface: '#2b3040'
  outline: '#918fa1'
  outline-variant: '#464555'
  surface-tint: '#c4c0ff'
  primary: '#c4c0ff'
  on-primary: '#2000a4'
  primary-container: '#8781ff'
  on-primary-container: '#1b0091'
  inverse-primary: '#4f44e2'
  secondary: '#a2e7ff'
  on-secondary: '#003642'
  secondary-container: '#00d2fd'
  on-secondary-container: '#005669'
  tertiary: '#ffb785'
  on-tertiary: '#502500'
  tertiary-container: '#db761f'
  on-tertiary-container: '#461f00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e3dfff'
  primary-fixed-dim: '#c4c0ff'
  on-primary-fixed: '#100069'
  on-primary-fixed-variant: '#3622ca'
  secondary-fixed: '#b4ebff'
  secondary-fixed-dim: '#3cd7ff'
  on-secondary-fixed: '#001f27'
  on-secondary-fixed-variant: '#004e5f'
  tertiary-fixed: '#ffdcc6'
  tertiary-fixed-dim: '#ffb785'
  on-tertiary-fixed: '#301400'
  on-tertiary-fixed-variant: '#713700'
  background: '#0e1322'
  on-background: '#dee1f7'
  surface-variant: '#2f3445'
typography:
  display-lg:
    fontFamily: Outfit
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Outfit
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '300'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '300'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1200px
  gutter: 24px
  section-padding-desktop: 120px
  section-padding-mobile: 64px
---

## Brand & Style

The design system is engineered for a high-end software professional’s portfolio, blending **Modern Minimalism** with **Glassmorphism** and **Futuristic** accents. The aesthetic is "dark mode by default," designed to evoke a sense of deep space, precision engineering, and premium digital craftsmanship.

The brand personality is authoritative yet innovative. It utilizes expansive whitespace (negative space) to allow technical projects to breathe, while employing subtle neon glows and translucent layers to signal a forward-thinking, tech-native identity. The visual language focuses on clarity, speed, and sophistication.

## Colors

The palette centers on a "Deep Space" foundation. The background (#0A0F1E) is a saturated dark navy that provides more depth than pure black. 

- **Primary (Electric Purple):** Used for primary calls to action, active states, and brand-heavy elements.
- **Secondary (Cyan):** Used for syntax highlighting, success indicators, and secondary interactive accents.
- **Glass Surfaces:** Elements use a highly transparent white overlay with a heavy backdrop blur (20px+) to create the glass effect.
- **Gradients:** Use a linear transition from Primary to Secondary at a 135-degree angle for hero headers and high-impact borders.

## Typography

This design system utilizes a dual-font strategy. **Outfit** is used for headings to provide a geometric, modern, and slightly "tech" feel. **Inter** is used for body copy to ensure maximum legibility at light weights.

Headlines should be bold and impactful, often using gradient fills. Body text is intentionally set to a "Light" weight (300) to maintain the minimalist, airy aesthetic against the dark background. Use `label-caps` for small metadata, category tags, or "Overlines" above main headings.

## Layout & Spacing

The layout follows a **Fixed Grid** model on desktop, centered with a maximum width of 1200px. It utilizes a 12-column structure for project grids and a single-column focused flow for long-form case studies.

Generous vertical padding (120px+) between sections is essential to maintain the "premium" feel and avoid visual clutter. On mobile, the system transitions to a single-column fluid layout with 24px side margins. Horizontal scrolling "carousels" should be used for tech stacks or skill chips on smaller screens to conserve vertical space.

## Elevation & Depth

Depth is achieved through **Glassmorphism** rather than traditional shadows. 

1.  **Level 1 (Base):** The dark navy background.
2.  **Level 2 (Cards/Floating Elements):** A background of `rgba(255, 255, 255, 0.03)` with a `backdrop-filter: blur(20px)`. Apply a 1px solid border at `rgba(255, 255, 255, 0.1)` to define the edges.
3.  **Level 3 (Modals/Popovers):** Higher opacity background (`rgba(255, 255, 255, 0.08)`) with a subtle outer glow using the Primary color at 10% opacity.

Avoid heavy black shadows; instead, use "Neon Glows"—box shadows with large blur radii (40px-80px) and very low opacity (10-15%) using the primary or secondary brand colors.

## Shapes

The design system uses **Rounded (0.5rem)** corners as the standard. This strikes a balance between the precision of sharp corners and the friendliness of fully rounded shapes. 

- **Standard Elements (Buttons, Cards):** 8px (0.5rem).
- **Large Containers (Sections, Hero Cards):** 24px (1.5rem).
- **Interactive Tags/Chips:** Full pill-shape for maximum distinction from buttons.

## Components

### Navigation
- **Sticky Glass Header:** A fixed top bar with `backdrop-filter: blur(12px)`. Use a 1px bottom border in a semi-transparent primary color. Links should use `label-caps` and transition to the primary color on hover.

### Buttons
- **Primary:** Solid Electric Purple with a subtle Cyan outer glow on hover.
- **Ghost/Glass:** Transparent background with a 1px border of the Primary color. On hover, the background fills with a 10% opacity version of the color.

### Project Cards
- **Floating Effect:** Use the Glassmorphism style (Level 2). Images inside cards should have a subtle scale-up effect (1.05x) on hover.
- **Neon Border:** High-priority cards can feature a 1px gradient border (Electric Purple to Cyan).

### Input Fields
- Dark backgrounds (#050812) with a 1px border that glows Cyan when focused. 
- Placeholder text should use `text_secondary` at 50% opacity.

### Chips & Tags
- Small, pill-shaped elements for "Skills" or "Tech Stack." Use a dark fill with a subtle Primary color border. Text should be `label-caps`.

### Typography Accents
- **Gradient Text:** Use for hero headlines and section titles. A linear gradient from Primary to Secondary, clipped to text.