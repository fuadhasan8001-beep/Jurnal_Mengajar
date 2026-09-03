---
name: Professional Academic Nexus
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#434655'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#455f87'
  on-secondary: '#ffffff'
  secondary-container: '#b5d0fd'
  on-secondary-container: '#3e5980'
  tertiary: '#0051b1'
  on-tertiary: '#ffffff'
  tertiary-container: '#0f69dc'
  on-tertiary-container: '#edf0ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#d5e3ff'
  secondary-fixed-dim: '#adc8f5'
  on-secondary-fixed: '#001c3b'
  on-secondary-fixed-variant: '#2d486d'
  tertiary-fixed: '#d8e2ff'
  tertiary-fixed-dim: '#adc6ff'
  on-tertiary-fixed: '#001a42'
  on-tertiary-fixed-variant: '#004395'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-lg:
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-sm:
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
  headline-lg-mobile:
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  container-padding: 24px
  gutter: 16px
  sidebar-width: 280px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 24px
---

## Brand & Style

The design system is centered on the principles of **Modern Corporate SaaS**, specifically tailored for the educational administrative environment. The brand personality is authoritative yet accessible, evoking a sense of calm efficiency for educators managing complex data.

The style utilizes a **Minimalist-Professional** hybrid. It prioritizes clarity through heavy whitespace and a structured information hierarchy. The interface relies on subtle depth cues—such as soft ambient shadows and thin architectural borders—to separate functional zones without overwhelming the user. The primary emotional response should be one of "Organized Trust," where the UI feels like a reliable tool that recedes into the background to let the teaching content lead.

## Colors

The palette is a sophisticated range of blues designed to create a "Trustworthy SaaS" atmosphere. 

- **Primary & Action:** `#2563EB` is the core driver for calls to action, ensuring interactive elements are unmistakable.
- **Structural Depth:** `#1E3A5F` (Primary Dark Blue) is reserved for high-level navigational containers like the Sidebar to provide a grounding visual weight.
- **Tonal Layering:** Use `#EFF6FF` for subtle row highlights or background sections and `#DBEAFE` for soft badge backgrounds.
- **Semantic Clarity:** Success, Warning, and Danger colors are calibrated for high legibility against white surfaces, primarily used in status badges and validation states.

## Typography

The design system utilizes **Be Vietnam Pro** (as the optimal alternative for a professional, contemporary Indonesian context) to ensure high legibility and a friendly yet structured appearance.

- **Hierarchy:** Use `Display` and `Headline` levels for page titles and section headers in `#172033`.
- **Readability:** `Body-md` is the workhorse for all administrative data and forms.
- **Interaction:** `Label-md` with a weight of 500 should be used for button text and input labels to distinguish them from static body text.
- **Data Denseness:** For tables and dense list views, `Body-md` or `Label-sm` is preferred to maintain a clean layout even with high information density.

## Layout & Spacing

The layout follows a **Fixed-Fluid Hybrid** model. The sidebar remains fixed at `280px` on desktop, while the main content area utilizes a fluid 12-column grid to maximize the workspace for tables and dashboards.

- **Horizontal Rhythm:** Use a `24px` outer margin for the main content container. Gutters between cards or grid items are set to `16px`.
- **Vertical Rhythm:** Elements within a card should follow an 8px-based scale (8px, 16px, 24px) to maintain a consistent logical flow.
- **Responsive Behavior:** On mobile (`<640px`), the sidebar transitions to a hidden drawer, and container padding reduces to `16px`. Tables should implement horizontal scrolling or card-view transformations.

## Elevation & Depth

This design system uses **Tonal Layering** combined with **Ambient Shadows** to define hierarchy.

- **Level 0 (Background):** `#F8FAFC` - The base canvas.
- **Level 1 (Cards/Surfaces):** White background with a very soft, diffused shadow (`0px 2px 4px rgba(23, 32, 51, 0.04)`).
- **Level 2 (Hover/Active):** Slightly more pronounced shadow (`0px 4px 12px rgba(23, 32, 51, 0.08)`) to indicate interactivity.
- **Borders:** Use a `1px` solid border in `#E2E8F0` for all cards and input fields. This creates a "thin-frame" aesthetic that looks sharp and professional.

## Shapes

The shape language is **Rounded**, favoring a soft-yet-precise aesthetic.

- **Standard Elements:** Buttons, Input fields, and small cards use a `0.5rem` (8px) radius.
- **Large Containers:** Dashboard widgets and main content cards use `rounded-lg` (1rem/16px) to feel more modern and inviting.
- **Badges:** Use a fully rounded pill shape for status indicators to distinguish them clearly from interactive buttons.

## Components

### Sidebar
- **Background:** `#1E3A5F`.
- **Active State:** A vertical blue bar on the left edge with a subtle background tint (`#FFFFFF` at 10% opacity).
- **Typography:** Labels in White or Light Blue with 500 weight.

### Buttons
- **Primary:** Solid `#2563EB` with White text.
- **Secondary:** Outlined with `#2563EB` border and text.
- **Ghost:** No border, `#64748B` text, appearing only on hover with a `#EFF6FF` background.

### Tables (Jurnal Data)
- **Header:** Light gray background (`#F8FAFC`) with uppercase `Label-sm` text.
- **Rows:** 1px bottom border only. On-hover, the entire row should shift to `#F8FAFC`.
- **Badges:** Success (`#22C55E`), Warning (`#F59E0B`), and Danger (`#EF4444`) used with 10% opacity backgrounds and 100% opacity text.

### Input Fields
- **Default:** White background, `#E2E8F0` border.
- **Focus State:** `#2563EB` border with a subtle blue outer glow (2px).
- **Labels:** `Label-md` in `#172033` positioned above the input.

### Cards
- **Construction:** White surface, 1px border, Level 1 shadow, and 16px internal padding (p-4).