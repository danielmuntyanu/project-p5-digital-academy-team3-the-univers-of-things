---
name: Nexus Collectibles
colors:
  surface: '#111317'
  surface-dim: '#111317'
  surface-bright: '#37393e'
  surface-container-lowest: '#0c0e12'
  surface-container-low: '#1a1c20'
  surface-container: '#1e2024'
  surface-container-high: '#282a2e'
  surface-container-highest: '#333539'
  on-surface: '#e2e2e8'
  on-surface-variant: '#b9cacb'
  inverse-surface: '#e2e2e8'
  inverse-on-surface: '#2f3035'
  outline: '#849495'
  outline-variant: '#3b494b'
  surface-tint: '#00dbe9'
  primary: '#dbfcff'
  on-primary: '#00363a'
  primary-container: '#00f0ff'
  on-primary-container: '#006970'
  inverse-primary: '#006970'
  secondary: '#ffb59a'
  on-secondary: '#5a1b00'
  secondary-container: '#ff5e07'
  on-secondary-container: '#531900'
  tertiary: '#faf3ff'
  on-tertiary: '#3c0090'
  tertiary-container: '#e1d2ff'
  on-tertiary-container: '#7213ff'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#7df4ff'
  primary-fixed-dim: '#00dbe9'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f54'
  secondary-fixed: '#ffdbce'
  secondary-fixed-dim: '#ffb59a'
  on-secondary-fixed: '#370e00'
  on-secondary-fixed-variant: '#802a00'
  tertiary-fixed: '#e9ddff'
  tertiary-fixed-dim: '#d1bcff'
  on-tertiary-fixed: '#23005b'
  on-tertiary-fixed-variant: '#5700c9'
  background: '#111317'
  on-background: '#e2e2e8'
  surface-variant: '#333539'
typography:
  display-lg:
    fontFamily: Sora
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Sora
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Sora
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.0'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style
The design system is engineered for a high-energy collectibles marketplace focusing on Anime, Gaming, and Hero culture. The brand personality is **dynamic, premium, and immersive**, bridging the gap between a high-end auction house and a vibrant community hub.

The aesthetic follows a **Modern/Glassmorphic** approach. It utilizes deep layering to create a sense of "unboxing" and discovery. The UI should evoke an emotional response of excitement and exclusivity, using high-performance visuals and slick transitions to mirror the premium nature of rare collectibles.

## Colors
The palette is centered around **Electric Blue** (#00F0FF) as the primary action color, providing a futuristic, high-tech glow against a "Deep Space" neutral background (#0F1115). 

**Energetic Orange** (#FF5C00) is reserved for "Hot" items, limited editions, and urgent call-to-actions, creating a high-contrast tension with the primary blue. 

For the dark mode, surfaces use a tiered grayscale (Rich Black to Gunmetal) to maintain depth. In light mode, these are replaced with crisp whites and soft cool-grays, keeping the vibrant accents identical to maintain brand recognition.

## Typography
This design system employs **Sora** for headings to provide a geometric, tech-forward feel that resonates with gaming and sci-fi aesthetics. Its wide apertures ensure readability even at heavy weights.

**Hanken Grotesk** serves as the primary interface typeface, chosen for its sharp, contemporary professional look that handles dense data (like price lists and specs) with ease. 

**JetBrains Mono** is used sparingly for technical metadata, serial numbers, and "Power Levels" to reinforce the "collector's database" feel.

## Layout & Spacing
The system uses a **12-column fluid grid** for desktop and a **4-column grid** for mobile. A strict 4px baseline grid ensures vertical rhythm.

Layouts are card-centric. On desktop, the "Collection Grid" utilizes a masonry-style or strictly aligned 4-column layout that reflows to 2 columns on tablet and 1 column on mobile. Spacing between cards (gutters) is kept wide (24px) to allow the high-quality photography of the collectibles to breathe. Container widths are capped at 1440px to prevent excessive line lengths in the marketplace descriptions.

## Elevation & Depth
Depth is communicated through **Tonal Layering** and **Glassmorphism**. 

1.  **Base Layer:** The darkest neutral color, representing the background.
2.  **Surface Layer:** A slightly lighter neutral (#1A1D23) used for the main card bodies.
3.  **Overlay Layer:** Used for modals and hover states, utilizing a `backdrop-filter: blur(12px)` and 10% white border-opacity to create a frosted glass effect.

Shadows are "Ambient Glows" rather than traditional black shadows. For example, a card on hover might cast a subtle `0px 10px 30px` shadow tinted with the primary Electric Blue at 15% opacity, making the item appear as if it's sitting on a light table.

## Shapes
The design system adopts a **generous roundedness** to soften the technical edge. The `rounded-2xl` (1.5rem / 24px) is the standard for product cards and main containers, creating a friendly, "collectible toy box" feel. 

Smaller elements like buttons and input fields use the `rounded-lg` (1rem / 16px) standard. Actionable icons and avatar frames are strictly circular to contrast against the rectangular grid.

## Components
-   **Feature Cards:** The core of the SPA. They feature a 1:1 aspect ratio image area, a subtle inner glow border, and a bottom-aligned "Holographic" tag for rarity.
-   **Filter Chips:** Pill-shaped with a 1px stroke. When active, they fill with a gradient of Primary to Tertiary and use white text.
-   **Pagination:** Minimalist arrows with a "page x of y" counter in JetBrains Mono. Hover states on arrows trigger a scale(1.1) transform.
-   **Authenticated Header:** A fixed glassmorphic bar. The user's "Collection Value" and "Wallet" are displayed in a glowing status box next to the circular profile avatar.
-   **Input Fields:** Deep-set (inset shadow) with a 2px Electric Blue border appearing only on focus.
-   **Interactive States:** All buttons should use a subtle "shimmer" CSS animation on hover to mimic the foil effect found on rare trading cards.