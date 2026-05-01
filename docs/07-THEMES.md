# 07 — Theme Customization

> Torafirma provides 5 canonical themes for different operational contexts. Themes are implemented as CSS custom property sets that override base token values.

---

## Table of Contents

1. [Theme Philosophy](#1-theme-philosophy)
2. [5 Canonical Themes](#2-5-canonical-themes)
3. [CSS Variable Mappings](#3-css-variable-mappings)
4. [Creating Custom Themes](#4-creating-custom-themes)
5. [Theme Switching](#5-theme-switching)
6. [Theme-Specific Overrides](#6-theme-specific-overrides)
7. [Accessibility in Themes](#7-accessibility-in-themes)

---

## 1. Theme Philosophy

Themes in Torafirma are not cosmetic. They signal operational context.

- A theme change means the operator is working in a different operational context
- Themes must maintain accessibility standards
- Color semantic meaning must be preserved across themes
- Critical state indicators (green=go, red=stop) must remain consistent

### Theme Selection Guide

| Operational Context | Recommended Theme |
|--------------------:|-------------------|
| Default operational interface | Command Dark |
| Tactical/mission operations | Field Green |
| Analysis and intelligence | Deep Blue |
| Engineering/IDE/build tools | Forge Graphite |
| Threat response/incident handling | Redline |

---

## 2. 5 Canonical Themes

### 2.1 Command Dark (Default)

The default operational interface. Black background with green accent.

| Element | Color |
|---------|-------|
| Background | `#050608` (near-black) |
| Surface | `#0E1318` (charcoal) |
| Accent | `#36D47B` (green) |
| Text primary | `#D6E0E6` |
| Border | `#26323C` |
| Glow | Green glow for active states |

**Use for:** Workflow editors, runtime management, general operations

```css
[data-theme="command-dark"] {
  --tf-bg: #050608;
  --tf-surface: #0E1318;
  --tf-surface-raised: #141A20;
  --tf-accent: #36D47B;
  --tf-text-primary: #D6E0E6;
  --tf-text-secondary: #9BAAB5;
  --tf-border-normal: #26323C;
}
```

### 2.2 Field Green

For tactical/mission operations. Dark green background with green accent.

| Element | Color |
|---------|-------|
| Background | `#030705` (very dark green) |
| Surface | `#07120C` (black-green) |
| Accent | `#36D47B` (green) |
| Text primary | `#D6E0E6` |
| Border | `#1C2A20` |
| Glow | Green glow for active states |

**Use for:** Field operations, tactical command, mobile operations

```css
[data-theme="field-green"] {
  --tf-bg: #030705;
  --tf-surface: #07120C;
  --tf-surface-raised: #0B1A12;
  --tf-accent: #36D47B;
  --tf-text-primary: #D6E0E6;
  --tf-text-secondary: #9BAAB5;
  --tf-border-normal: #1C2A20;
}
```

### 2.3 Deep Blue

For analysis and intelligence operations. Deep blue background with blue accent.

| Element | Color |
|---------|-------|
| Background | `#03060A` (very dark blue) |
| Surface | `#07111F` (deep blue) |
| Accent | `#4BA3F2` (blue) |
| Text primary | `#D6E0E6` |
| Border | `#1C2A3A` |
| Glow | Blue glow for active states |

**Use for:** Data analysis, intelligence work, investigation

```css
[data-theme="deep-blue"] {
  --tf-bg: #03060A;
  --tf-surface: #07111F;
  --tf-surface-raised: #0B1828;
  --tf-accent: #4BA3F2;
  --tf-text-primary: #D6E0E6;
  --tf-text-secondary: #9BAAB5;
  --tf-border-normal: #1C2A3A;
}
```

### 2.4 Forge Graphite

For engineering and IDE-like tools. Graphite background with amber accent.

| Element | Color |
|---------|-------|
| Background | `#080A0C` (graphite) |
| Surface | `#0E1318` (charcoal) |
| Accent | `#F2B84B` (amber) |
| Text primary | `#D6E0E6` |
| Border | `#26323C` |
| Glow | Amber glow for active states |

**Use for:** IDEs, build tools, development environments

```css
[data-theme="forge-graphite"] {
  --tf-bg: #080A0C;
  --tf-surface: #0E1318;
  --tf-surface-raised: #141A20;
  --tf-accent: #F2B84B;
  --tf-text-primary: #D6E0E6;
  --tf-text-secondary: #9BAAB5;
  --tf-border-normal: #26323C;
}
```

### 2.5 Redline

For threat response and incident handling. Dark red background with red accent.

| Element | Color |
|---------|-------|
| Background | `#0A0303` (very dark red) |
| Surface | `#1C0B0B` (dark red) |
| Accent | `#F24B4B` (red) |
| Text primary | `#D6E0E6` |
| Border | `#3A1C1C` |
| Glow | Red glow for active states |

**Use for:** Incident response, emergency handling, threat analysis

```css
[data-theme="redline"] {
  --tf-bg: #0A0303;
  --tf-surface: #1C0B0B;
  --tf-surface-raised: #241212;
  --tf-accent: #F24B4B;
  --tf-text-primary: #D6E0E6;
  --tf-text-secondary: #9BAAB5;
  --tf-border-normal: #3A1C1C;
}
```

---

## 3. CSS Variable Mappings

### Complete Theme Variable Set

Each theme overrides these CSS variables:

```css
/* === ROOT SURFACE VARIABLES === */
--tf-bg
--tf-bg-elevated
--tf-surface
--tf-surface-raised
--tf-surface-inset

/* === TEXT VARIABLES === */
--tf-text-primary
--tf-text-secondary
--tf-text-muted
--tf-text-disabled
--tf-text-inverse

/* === ACCENT VARIABLES === */
--tf-accent
--tf-accent-dim
--tf-accent-glow

/* === BORDER VARIABLES === */
--tf-border-subtle
--tf-border-normal
--tf-border-strong

/* === GLOW VARIABLES === */
--tf-glow-accent

/* === SHADOW VARIABLES === */
--tf-shadow-sm
--tf-shadow-md
--tf-shadow-lg
```

### Semantic Color Preservation

Across all themes, semantic color meanings are preserved:

| Semantic Meaning | Always Maps To |
|-----------------|----------------|
| Success / Go | Green family |
| Danger / Stop | Red family |
| Warning / Caution | Amber family |
| Information | Blue family |
| Live / Stream | Cyan family |
| AI / Model | Purple family |
| Authority | Gold family |

---

## 4. Creating Custom Themes

### Step 1: Define Theme Variables

Create a new CSS file with your theme variables:

```css
/* my-custom-theme.css */
[data-theme="my-theme"] {
  --tf-bg: #0a0a0f;
  --tf-bg-elevated: #0f0f15;
  --tf-surface: #151520;
  --tf-surface-raised: #1a1a28;
  --tf-surface-inset: #08080c;

  --tf-text-primary: #e0e0f0;
  --tf-text-secondary: #a0a0c0;
  --tf-text-muted: #606080;
  --tf-text-disabled: #404060;

  --tf-accent: #7B68EE; /* MediumSlateBlue */
  --tf-accent-dim: #4A3F8C;
  --tf-accent-glow: rgba(123, 104, 238, 0.24);

  --tf-border-subtle: #1c1c30;
  --tf-border-normal: #282840;
  --tf-border-strong: #505070;

  --tf-glow-accent: 0 0 0 1px var(--tf-accent), 0 0 18px var(--tf-accent-glow);
}
```

### Step 2: Register Theme

```tsx
// App.tsx
import './my-custom-theme.css';

function App() {
  return (
    <AppShell theme="my-theme">
      {/* ... */}
    </AppShell>
  );
}
```

### Step 3: Theme Requirements Checklist

Before deploying a custom theme, verify:

- [ ] All required CSS variables are defined
- [ ] Semantic color meanings are preserved
- [ ] Contrast ratios meet WCAG AA standards
- [ ] Glow effects use the accent color
- [ ] Border colors are visible against backgrounds
- [ ] Text is readable on all surfaces
- [ ] Active states are visually distinct
- [ ] Disabled states are clearly distinguishable

---

## 5. Theme Switching

### Programmatic Theme Switch

```tsx
import { useTheme } from '@torafirma/react-components';

function ThemeSwitcher() {
  const { theme, setTheme, availableThemes } = useTheme();

  return (
    <SelectField
      label="Theme"
      value={theme}
      options={availableThemes.map(t => ({ value: t, label: t }))}
      onChange={(value) => setTheme(value)}
    />
  );
}
```

### Theme Switch via Data Attribute

```tsx
// Set theme on document root
document.documentElement.setAttribute('data-theme', 'field-green');

// Or use the hook
const { setTheme } = useTheme();
setTheme('deep-blue');
```

### Theme Persistence

```tsx
// Theme is persisted to localStorage automatically
const { theme } = useTheme(); // Reads from localStorage on mount

// Manual persistence
useEffect(() => {
  localStorage.setItem('torafirma-theme', theme);
}, [theme]);
```

### System Theme Detection

```tsx
// Detect system dark/light preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Set appropriate theme
setTheme(prefersDark ? 'command-dark' : 'command-light');
```

---

## 6. Theme-Specific Overrides

### Component-Level Overrides

Individual components can be themed per-instance:

```tsx
// Override theme for a specific panel
<Panel themeOverride="deep-blue">
  <AnalysisContent />
</Panel>
```

### Conditional Theming

```tsx
// Different themes for different states
<AppShell theme={alertLevel === 'critical' ? 'redline' : 'command-dark'}>
  {/* ... */}
</AppShell>
```

### Product-Specific Theme Config

```tsx
// product-theme.config.ts
export const productTheme = {
  base: 'command-dark',
  overrides: {
    '--tf-accent': '#7B68EE',
    '--tf-border-normal': '#2a2a40',
  }
};

// Apply in App.tsx
<AppShell theme={productTheme.base} overrides={productTheme.overrides}>
```

---

## 7. Accessibility in Themes

### Contrast Requirements

All themes must meet these minimum contrast ratios:

| Element | Minimum Ratio | Standard |
|---------|---------------|----------|
| Primary text on background | 7:1 | WCAG AAA |
| Secondary text on background | 4.5:1 | WCAG AA |
| Text on elevated surface | 7:1 | WCAG AAA |
| Text on accent color | 4.5:1 | WCAG AA |
| Border on background | 3:1 | WCAG AA (non-text) |
| Disabled text | No minimum (non-interactive) | — |

### Testing Theme Contrast

```bash
# Run contrast checks for all themes
npx torafirma-enforce --rule accessibility

# Run for specific theme
npx torafirma-enforce --rule accessibility --theme command-dark
```

### Focus Indicators

All themes must provide visible focus indicators:

```css
/* Focus ring */
:focus-visible {
  outline: 2px solid var(--tf-accent);
  outline-offset: 2px;
}

/* High contrast mode */
@media (prefers-contrast: high) {
  :focus-visible {
    outline: 3px solid var(--tf-accent);
    outline-offset: 3px;
  }
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Color Blindness Considerations

- Never rely on color alone to convey meaning
- Always pair color with icon, text, or pattern
- Use the `ConditionTrendBadge` trend line arrows in addition to color
- Provide pattern fills in addition to color fills for charts

---

## Theme Reference Summary

| Theme | Background | Accent | Best For |
|-------|-----------|--------|----------|
| Command Dark | `#050608` | Green | Default operations |
| Field Green | `#030705` | Green | Tactical/field ops |
| Deep Blue | `#03060A` | Blue | Analysis/intelligence |
| Forge Graphite | `#080A0C` | Amber | Engineering/IDE |
| Redline | `#0A0303` | Red | Emergency/threat |
