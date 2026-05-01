# 03 — Design Tokens Reference

> Design tokens are the canonical interface constants for Torafirma products. They prevent drift between products, eliminate arbitrary styling, and make the visual system governable.

---

## Table of Contents

1. [Color Palette](#1-color-palette)
2. [Typography Scale](#2-typography-scale)
3. [Spacing Scale](#3-spacing-scale)
4. [Border & Radius Tokens](#4-border--radius-tokens)
5. [Shadow & Glow Tokens](#5-shadow--glow-tokens)
6. [Motion Tokens](#6-motion-tokens)
7. [Z-Index Tokens](#7-z-index-tokens)
8. [Complete CSS Variable Set](#8-complete-css-variable-set)
9. [Tailwind Configuration](#9-tailwind-configuration)

---

## 1. Color Palette

### 1.1 Token Philosophy

Color is semantic. Do not use color only for decoration. Each color answers one of these questions:
1. Is this action allowed?
2. Is this state safe?
3. Is this state active?
4. Is this state dangerous?
5. Is this element informational?
6. Does this require operator intervention?

### 1.2 Base Neutrals (11 tokens)

| Token | Hex | Use |
|-------|-----|-----|
| `tf-black` | `#050608` | Root app background |
| `tf-void` | `#080B0F` | Deep panels, command shell backgrounds |
| `tf-charcoal` | `#0E1318` | Primary surfaces |
| `tf-graphite` | `#141A20` | Raised panels and cards |
| `tf-panel` | `#10161C` | Panel surfaces |
| `tf-panel-raised` | `#171F27` | Elevated panels |
| `tf-panel-inset` | `#090D11` | Inset/depressed sections |

### 1.3 Steel Scale (11 tokens)

| Token | Hex | Use |
|-------|-----|-----|
| `tf-steel-950` | `#0A0E12` | Deep backgrounds |
| `tf-steel-900` | `#1A222A` | Secondary panels |
| `tf-steel-800` | `#222C35` | Borders, inactive controls |
| `tf-steel-700` | `#2D3A45` | Input outlines, separators |
| `tf-steel-600` | `#40505C` | Disabled text, subtle borders |
| `tf-steel-500` | `#5F6E7A` | Muted text, disabled icons |
| `tf-steel-400` | `#7C8A95` | Secondary text |
| `tf-steel-300` | `#9BAAB5` | Secondary text, labels |
| `tf-steel-200` | `#BCC8D0` | Primary text (dim) |
| `tf-steel-100` | `#D6E0E6` | Primary text |
| `tf-white` | `#F4F7F8` | High-emphasis text only |

### 1.4 Green (Proceed/Run) — 6 tokens

| Token | Hex | Use |
|-------|-----|-----|
| `tf-green` | `#36D47B` | Run buttons, active healthy systems, approved state |
| `tf-green-dim` | `#1F7F4D` | Ready badges, passive success states |
| `tf-green-dark` | `#0B1A12` | Green-themed panel backgrounds |
| `tf-green-glow` | `rgba(54,212,123,0.24)` | Green glow effect |
| `tf-radar-green` | `#76FF9F` | High-visibility active signal |
| `tf-phosphor` | `#B8FFCC` | Terminal glow accents |

### 1.5 Red (Stop/Fault/Destructive) — 6 tokens

| Token | Hex | Use |
|-------|-----|-----|
| `tf-red` | `#F24B4B` | Stop, reject, fault, destructive, hostile |
| `tf-red-dim` | `#8F2C2C` | Latched fault, historical failure |
| `tf-red-dark` | `#1C0B0B` | Red-themed panel backgrounds |
| `tf-red-critical` | `#B00020` | Irreversible destruction |
| `tf-red-glow` | `rgba(242,75,75,0.24)` | Red glow effect |
| `tf-blood-red` | `#B00020` | Critical alarm, purge |

### 1.6 Amber (Caution/Pending) — 4 tokens

| Token | Hex | Use |
|-------|-----|-----|
| `tf-amber` | `#F2B84B` | Caution, pending, review, staged actions |
| `tf-amber-dim` | `#9E6F24` | Amber backgrounds, subtle warnings |
| `tf-amber-dark` | `#1D1608` | Amber-themed panel backgrounds |
| `tf-amber-glow` | `rgba(242,184,75,0.22)` | Amber glow effect |

### 1.7 Orange (Instability/Heat) — 4 tokens

| Token | Hex | Use |
|-------|-----|-----|
| `tf-orange` | `#F07A2A` | Heat, risk, instability, drift |
| `tf-orange-dim` | `#984B1A` | Orange backgrounds |
| `tf-orange-dark` | `#1B0D05` | Orange-themed panel backgrounds |
| `tf-orange-glow` | `rgba(240,122,42,0.22)` | Orange glow effect |

### 1.8 Blue (Information/Inspect) — 4 tokens

| Token | Hex | Use |
|-------|-----|-----|
| `tf-blue` | `#4BA3F2` | Information, inspect, observe, query |
| `tf-blue-dim` | `#2D6394` | Blue backgrounds |
| `tf-blue-dark` | `#07111F` | Intelligence/analysis surfaces |
| `tf-blue-glow` | `rgba(75,163,242,0.22)` | Blue glow effect |

### 1.9 Cyan (Stream/Live) — 4 tokens

| Token | Hex | Use |
|-------|-----|-----|
| `tf-cyan` | `#35D0E3` | Live data, stream, sensor, active trace |
| `tf-cyan-dim` | `#1B7783` | Cyan backgrounds |
| `tf-cyan-dark` | `#041417` | Cyan-themed panel backgrounds |
| `tf-cyan-glow` | `rgba(53,208,227,0.22)` | Cyan glow effect |

### 1.10 Purple (Model/AI) — 4 tokens

| Token | Hex | Use |
|-------|-----|-----|
| `tf-purple` | `#A678F2` | Model, inference, intelligence, latent structure |
| `tf-purple-dim` | `#5F4A8B` | Background model state |
| `tf-purple-dark` | `#110B1F` | Purple-themed panel backgrounds |
| `tf-purple-glow` | `rgba(166,120,242,0.22)` | Purple glow effect |

### 1.11 Gold (Authority/Signature) — 4 tokens

| Token | Hex | Use |
|-------|-----|-----|
| `tf-gold` | `#D6A84F` | Authority, command privilege, signed operation |
| `tf-gold-dim` | `#8A6A30` | Gold backgrounds |
| `tf-gold-dark` | `#1A1407` | Gold-themed panel backgrounds |
| `tf-gold-glow` | `rgba(214,168,79,0.24)` | Gold glow effect |

### 1.12 Slate (Neutral/Inactive) — 3 tokens

| Token | Hex | Use |
|-------|-----|-----|
| `tf-slate` | `#6E7F8D` | Neutral, inactive, mechanical |
| `tf-slate-dim` | `#46535D` | Slate backgrounds |
| `tf-slate-dark` | `#10161B` | Slate-themed panel backgrounds |

### 1.13 Specialty Colors — 4 tokens

| Token | Hex | Use |
|-------|-----|-----|
| `tf-black-green` | `#07120C` | Military-green dark surface |
| `tf-deep-blue` | `#07111F` | Intelligence/analysis surface |
| `tf-gridline` | `#1C2A33` | Grid overlays |
| `tf-white` | `#F4F7F8` | High-emphasis text |

### 1.14 Semantic Color Aliases

| Alias | Maps To | Use |
|-------|---------|-----|
| `tf-bg` | `tf-black` | Root background |
| `tf-bg-elevated` | `tf-void` | Elevated backgrounds |
| `tf-surface` | `tf-charcoal` | Primary surfaces |
| `tf-surface-raised` | `tf-graphite` | Raised surfaces |
| `tf-surface-inset` | `tf-panel-inset` | Inset surfaces |
| `tf-text-primary` | `tf-steel-100` | Primary text |
| `tf-text-secondary` | `tf-steel-300` | Secondary text |
| `tf-text-muted` | `tf-steel-500` | Muted/disabled text |
| `tf-text-disabled` | `tf-steel-600` | Fully disabled text |
| `tf-text-inverse` | `tf-black` | Text on light surfaces |

### 1.15 Action Color Aliases

| Alias | Maps To | Use |
|-------|---------|-----|
| `tf-action-run` | `tf-green` | Execute, proceed, run |
| `tf-action-stop` | `tf-red` | Stop, abort, fault |
| `tf-action-review` | `tf-amber` | Stage, review, caution |
| `tf-action-inspect` | `tf-blue` | Inspect, query, view |
| `tf-action-stream` | `tf-cyan` | Stream, monitor, live |
| `tf-action-model` | `tf-purple` | Model, AI, infer |
| `tf-action-authority` | `tf-gold` | Authorize, seal, sign |
| `tf-action-neutral` | `tf-slate` | Secondary, mechanical |

---

## 2. Typography Scale

### 2.1 Font Families (4 families)

| Token | Stack | Use |
|-------|-------|-----|
| `tf-font-ui` | Inter, "IBM Plex Sans", system-ui, sans-serif | General interface text |
| `tf-font-condensed` | "Roboto Condensed", "DIN 2014", Inter, system-ui, sans-serif | Dense nav, tactical headers |
| `tf-font-mono` | "JetBrains Mono", "IBM Plex Mono", "Roboto Mono", ui-monospace, monospace | Logs, metrics, IDs, traces |
| `tf-font-display` | Rajdhani, Oxanium, Inter, system-ui, sans-serif | Product headers, launch screens |

### 2.2 Type Scale (8 sizes)

| Token | Size | Line Height | Use |
|-------|------|-------------|-----|
| `tf-text-2xs` | 10px | 1.25 | Extremely compact labels |
| `tf-text-xs` | 11px | 1.35 | Badges, micro labels, table metadata |
| `tf-text-sm` | 12px | 1.4 | Buttons, nav labels, dense controls |
| `tf-text-base` | 13px | 1.45 | Standard dense UI |
| `tf-text-md` | 14px | 1.5 | Readable copy, inspector body |
| `tf-text-lg` | 18px | 1.3 | Section headers |
| `tf-text-xl` | 22px | 1.25 | Page titles |
| `tf-text-2xl` | 28px | 1.2 | Product/module title |
| `tf-text-display` | 40px | 1.1 | Hero or command screen |

### 2.3 Font Weights (5 weights)

| Token | Weight | Use |
|-------|--------|-----|
| `tf-weight-regular` | 400 | Body, normal labels |
| `tf-weight-medium` | 500 | Controls, table headers |
| `tf-weight-semibold` | 600 | Section labels, selected states |
| `tf-weight-bold` | 700 | Critical headings, command labels |
| `tf-weight-black` | 800 | Rare brand moments |

### 2.4 Line Heights (4 values)

| Token | Value | Use |
|-------|-------|-----|
| `tf-line-tight` | 1.1 | Headlines, badges, tight labels |
| `tf-line-compact` | 1.25 | Dense UI, nav, controls |
| `tf-line-normal` | 1.45 | Standard body text |
| `tf-line-readable` | 1.65 | Long-form reading, documentation |

### 2.5 Letter Spacing (5 values)

| Token | Value | Use |
|-------|-------|-----|
| `tf-tracking-tight` | -0.01em | Large headlines |
| `tf-tracking-normal` | 0 | Body text |
| `tf-tracking-label` | 0.04em | Labels, badges, controls |
| `tf-tracking-command` | 0.06em | Command labels, nav items |
| `tf-tracking-micro` | 0.08em | Micro labels, status indicators |

### 2.6 Typography Usage Rules

```css
/* Panel header */
.panel-header {
  font-family: var(--tf-font-ui);
  font-size: var(--tf-text-xs);
  font-weight: var(--tf-weight-bold);
  letter-spacing: var(--tf-tracking-command);
  text-transform: uppercase;
}

/* Telemetry readout */
.telemetry {
  font-family: var(--tf-font-mono);
  font-size: var(--tf-text-sm);
  font-weight: var(--tf-weight-medium);
  letter-spacing: var(--tf-tracking-label);
}

/* Command button */
.command-button {
  font-family: var(--tf-font-ui);
  font-size: var(--tf-text-sm);
  font-weight: var(--tf-weight-semibold);
  letter-spacing: var(--tf-tracking-label);
  text-transform: uppercase;
}
```

---

## 3. Spacing Scale

### 3.1 Base Spacing (11 tokens)

| Token | Value | Use |
|-------|-------|-----|
| `tf-space-0` | 0px | Hard joins |
| `tf-space-1` | 2px | Micro gaps, compact rows |
| `tf-space-2` | 4px | Icon-label gaps, table cell padding |
| `tf-space-3` | 6px | Dense buttons |
| `tf-space-4` | 8px | Normal compact padding |
| `tf-space-5` | 12px | Panel padding |
| `tf-space-6` | 16px | Major section spacing |
| `tf-space-7` | 24px | Page-level spacing |
| `tf-space-8` | 32px | Rare spacious separation |
| `tf-space-9` | 48px | Large section breaks |
| `tf-space-10` | 64px | Maximum spacing |

### 3.2 Control Heights (5 tokens)

| Token | Value | Use |
|-------|-------|-----|
| `tf-control-height-xs` | 22px | Micro controls, inline inputs |
| `tf-control-height-sm` | 26px | Compact controls |
| `tf-control-height-md` | 30px | Standard controls, buttons |
| `tf-control-height-lg` | 36px | Prominent controls |
| `tf-control-height-xl` | 44px | Field/touch controls |

### 3.3 Panel Padding (3 tokens)

| Token | Value | Use |
|-------|-------|-----|
| `tf-panel-padding-compact` | 8px | Dense panels, tables |
| `tf-panel-padding` | 12px | Standard panels |
| `tf-panel-padding-loose` | 16px | Spacious panels |

### 3.4 Table Cell Padding

| Token | Value | Use |
|-------|-------|-----|
| `tf-cell-padding-x` | 8px | Horizontal table cell padding |
| `tf-cell-padding-y` | 5px | Vertical table cell padding |

### 3.5 Button Padding

| Token | Value | Use |
|-------|-------|-----|
| `tf-button-padding-x` | 10px | Horizontal button padding |
| `tf-button-padding-y` | 6px | Vertical button padding |

### 3.6 Density Rules

| Context | Density | Panel Padding | Control Height |
|---------|---------|---------------|----------------|
| Cockpit | Very dense | 8px | 26px |
| IDE/Studio | Dense | 12px | 30px |
| Analysis documents | Moderate | 16px | 30px |
| Field/emergency | Lower | 16px | 36px |
| Mobile | Low | 16px | 44px |

---

## 4. Border & Radius Tokens

### 4.1 Border Colors (18 tokens)

| Token | Value | Use |
|-------|-------|-----|
| `tf-border-subtle` | `#1C2630` | Subtle panel seams |
| `tf-border-normal` | `#26323C` | Standard borders |
| `tf-border-strong` | `#51616D` | Strong borders, emphasis |
| `tf-border-run` | `#1F7F4D` | Run/proceed border (dim) |
| `tf-border-run-strong` | `#36D47B` | Run/proceed border (bright) |
| `tf-border-danger` | `#8F2C2C` | Danger border (dim) |
| `tf-border-danger-strong` | `#F24B4B` | Danger border (bright) |
| `tf-border-warning` | `#9E6F24` | Warning border (dim) |
| `tf-border-warning-strong` | `#F2B84B` | Warning border (bright) |
| `tf-border-instability` | `#984B1A` | Instability border (dim) |
| `tf-border-instability-strong` | `#F07A2A` | Instability border (bright) |
| `tf-border-info` | `#2D6394` | Info border (dim) |
| `tf-border-info-strong` | `#4BA3F2` | Info border (bright) |
| `tf-border-stream` | `#1B7783` | Stream border (dim) |
| `tf-border-stream-strong` | `#35D0E3` | Stream border (bright) |
| `tf-border-model` | `#5F4A8B` | Model border (dim) |
| `tf-border-model-strong` | `#A678F2` | Model border (bright) |
| `tf-border-authority` | `#8A6A30` | Authority border (dim) |
| `tf-border-authority-strong` | `#D6A84F` | Authority border (bright) |

### 4.2 Radius Tokens (6 tokens)

| Token | Value | Use |
|-------|-------|-----|
| `tf-radius-none` | 0px | Terminals, tables, hard panels |
| `tf-radius-xs` | 1px | Minimal rounding |
| `tf-radius-sm` | 2px | Buttons, tags, inputs, badges |
| `tf-radius-md` | 4px | Cards, panels |
| `tf-radius-lg` | 6px | Modal shells, major containers |
| `tf-radius-xl` | 8px | Rare, high-level shell only |

### 4.3 Border Rules

Borders are not decoration; they are seams and state indicators.

Use borders to show:
- Panel separation
- Current focus
- Authority boundaries
- Active selection
- Warning/fault state
- Staged state
- Locked state
- Editable versus read-only areas

---

## 5. Shadow & Glow Tokens

### 5.1 Shadow Tokens (4 tokens)

| Token | Value | Use |
|-------|-------|-----|
| `tf-shadow-none` | none | No shadow |
| `tf-shadow-sm` | `0 1px 2px rgba(0,0,0,0.35)` | Subtle elevation |
| `tf-shadow-md` | `0 4px 12px rgba(0,0,0,0.45)` | Standard elevation |
| `tf-shadow-lg` | `0 12px 32px rgba(0,0,0,0.55)` | High elevation |

### 5.2 Glow Tokens (7 tokens)

| Token | Value | Use |
|-------|-------|-----|
| `tf-glow-run` | `0 0 0 1px #36D47B, 0 0 18px rgba(54,212,123,0.24)` | Active execution |
| `tf-glow-danger` | `0 0 0 1px #F24B4B, 0 0 18px rgba(242,75,75,0.24)` | Fault/destructive |
| `tf-glow-warning` | `0 0 0 1px #F2B84B, 0 0 18px rgba(242,184,75,0.22)` | Warning/staged |
| `tf-glow-info` | `0 0 0 1px #4BA3F2, 0 0 18px rgba(75,163,242,0.22)` | Info/inspect |
| `tf-glow-stream` | `0 0 0 1px #35D0E3, 0 0 18px rgba(53,208,227,0.22)` | Live stream |
| `tf-glow-model` | `0 0 0 1px #A678F2, 0 0 18px rgba(166,120,242,0.22)` | Model/AI |
| `tf-glow-authority` | `0 0 0 1px #D6A84F, 0 0 18px rgba(214,168,79,0.24)` | Authority |

### 5.3 Glow Rules

Use glow only when the state deserves visual energy.

**Valid glow cases:**
- Selected graph node
- Active command line
- Running process
- Live stream
- Fault escalation
- Authority confirmation
- Focused high-risk modal

**Invalid glow cases:**
- Every card
- Normal navigation
- Passive buttons
- Decorative backgrounds

---

## 6. Motion Tokens

### 6.1 Duration Tokens (5 tokens)

| Token | Value | Use |
|-------|-------|-----|
| `tf-duration-instant` | 60ms | Button press, micro-interactions |
| `tf-duration-fast` | 100ms | Hover, tooltip, toggle |
| `tf-duration-normal` | 160ms | Standard transitions |
| `tf-duration-panel` | 220ms | Panel open/close |
| `tf-duration-slow` | 360ms | Large transitions |

### 6.2 Easing Tokens (4 tokens)

| Token | Value | Use |
|-------|-------|-----|
| `tf-ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` | Standard motion |
| `tf-ease-sharp` | `cubic-bezier(0.4, 0, 0.2, 1)` | Sharp transitions |
| `tf-ease-enter` | `cubic-bezier(0, 0, 0.2, 1)` | Entering elements |
| `tf-ease-exit` | `cubic-bezier(0.4, 0, 1, 1)` | Exiting elements |

### 6.3 Pulse Timing

| Type | Duration | Use |
|------|----------|-----|
| Data pulse | 500-1200ms loop | Live data indicators |
| Warning pulse | 800-1600ms loop | Warning/fault escalation |
| Cursor blink | 1000ms steps(1) | Terminal cursor |

### 6.4 Motion Rules

```css
/* Button hover */
.btn { transition: all var(--tf-duration-fast) var(--tf-ease-standard); }

/* Panel open */
.panel { transition: all var(--tf-duration-panel) var(--tf-ease-enter); }

/* Modal enter */
.modal { transition: all var(--tf-duration-normal) var(--tf-ease-enter); }

/* Modal exit */
.modal.exit { transition: all var(--tf-duration-fast) var(--tf-ease-exit); }
```

**Avoid:** Springy, playful, or elastic motion.

---

## 7. Z-Index Tokens

### 7.1 Z-Index Scale (9 layers)

| Token | Value | Layer |
|-------|-------|-------|
| `tf-z-base` | 0 | Primary workspace |
| `tf-z-panel` | 10 | Docked panels |
| `tf-z-sticky` | 20 | Sticky command/status bars |
| `tf-z-dropdown` | 40 | Dropdowns, popovers |
| `tf-z-command-palette` | 60 | Command palette |
| `tf-z-modal-backdrop` | 80 | Modal backdrop |
| `tf-z-modal` | 90 | Modal requiring response |
| `tf-z-critical-alert` | 100 | Critical alert |
| `tf-z-breaker` | 110 | Breaker/abort control (highest) |

### 7.2 Z-Index Rules

Critical safety and abort controls must never be visually buried under decorative interface layers.

Priority order (highest to lowest):
1. Breaker / abort control (`--tf-z-breaker`)
2. Critical alert (`--tf-z-critical-alert`)
3. Modal requiring response (`--tf-z-modal`)
4. Command palette (`--tf-z-command-palette`)
5. Dropdowns (`--tf-z-dropdown`)
6. Sticky bars (`--tf-z-sticky`)
7. Docked panels (`--tf-z-panel`)
8. Primary workspace (`--tf-z-base`)

---

## 8. Complete CSS Variable Set

```css
:root {
  /* === ROOT SURFACES === */
  --tf-black: #050608;
  --tf-void: #080B0F;
  --tf-charcoal: #0E1318;
  --tf-graphite: #141A20;
  --tf-panel: #10161C;
  --tf-panel-raised: #171F27;
  --tf-panel-inset: #090D11;

  /* === STEEL SCALE === */
  --tf-steel-950: #0A0E12;
  --tf-steel-900: #1A222A;
  --tf-steel-800: #222C35;
  --tf-steel-700: #2D3A45;
  --tf-steel-600: #40505C;
  --tf-steel-500: #5F6E7A;
  --tf-steel-400: #7C8A95;
  --tf-steel-300: #9BAAB5;
  --tf-steel-200: #BCC8D0;
  --tf-steel-100: #D6E0E6;
  --tf-white: #F4F7F8;

  /* === GREEN (PROCEED) === */
  --tf-green: #36D47B;
  --tf-green-dim: #1F7F4D;
  --tf-green-dark: #0B1A12;
  --tf-green-glow: rgba(54, 212, 123, 0.24);
  --tf-radar-green: #76FF9F;
  --tf-phosphor: #B8FFCC;

  /* === RED (STOP/DESTRUCTIVE) === */
  --tf-red: #F24B4B;
  --tf-red-dim: #8F2C2C;
  --tf-red-dark: #1C0B0B;
  --tf-red-critical: #B00020;
  --tf-red-glow: rgba(242, 75, 75, 0.24);
  --tf-blood-red: #B00020;

  /* === AMBER (CAUTION) === */
  --tf-amber: #F2B84B;
  --tf-amber-dim: #9E6F24;
  --tf-amber-dark: #1D1608;
  --tf-amber-glow: rgba(242, 184, 75, 0.22);

  /* === ORANGE (INSTABILITY) === */
  --tf-orange: #F07A2A;
  --tf-orange-dim: #984B1A;
  --tf-orange-dark: #1B0D05;
  --tf-orange-glow: rgba(240, 122, 42, 0.22);

  /* === BLUE (INFORMATION) === */
  --tf-blue: #4BA3F2;
  --tf-blue-dim: #2D6394;
  --tf-blue-dark: #07111F;
  --tf-blue-glow: rgba(75, 163, 242, 0.22);

  /* === CYAN (STREAM/LIVE) === */
  --tf-cyan: #35D0E3;
  --tf-cyan-dim: #1B7783;
  --tf-cyan-dark: #041417;
  --tf-cyan-glow: rgba(53, 208, 227, 0.22);

  /* === PURPLE (MODEL/AI) === */
  --tf-purple: #A678F2;
  --tf-purple-dim: #5F4A8B;
  --tf-purple-dark: #110B1F;
  --tf-purple-glow: rgba(166, 120, 242, 0.22);

  /* === GOLD (AUTHORITY) === */
  --tf-gold: #D6A84F;
  --tf-gold-dim: #8A6A30;
  --tf-gold-dark: #1A1407;
  --tf-gold-glow: rgba(214, 168, 79, 0.24);

  /* === SLATE (NEUTRAL) === */
  --tf-slate: #6E7F8D;
  --tf-slate-dim: #46535D;
  --tf-slate-dark: #10161B;

  /* === SPECIALTY === */
  --tf-black-green: #07120C;
  --tf-deep-blue: #07111F;
  --tf-gridline: #1C2A33;

  /* === SEMANTIC ALIASES === */
  --tf-bg: var(--tf-black);
  --tf-bg-elevated: var(--tf-void);
  --tf-surface: var(--tf-charcoal);
  --tf-surface-raised: var(--tf-graphite);
  --tf-surface-inset: var(--tf-panel-inset);
  --tf-text-primary: var(--tf-steel-100);
  --tf-text-secondary: var(--tf-steel-300);
  --tf-text-muted: var(--tf-steel-500);
  --tf-text-disabled: var(--tf-steel-600);
  --tf-text-inverse: var(--tf-black);

  /* === ACTION ALIASES === */
  --tf-action-run: var(--tf-green);
  --tf-action-stop: var(--tf-red);
  --tf-action-review: var(--tf-amber);
  --tf-action-inspect: var(--tf-blue);
  --tf-action-stream: var(--tf-cyan);
  --tf-action-model: var(--tf-purple);
  --tf-action-authority: var(--tf-gold);
  --tf-action-neutral: var(--tf-slate);

  /* === TYPOGRAPHY === */
  --tf-font-ui: Inter, "IBM Plex Sans", system-ui, sans-serif;
  --tf-font-condensed: "Roboto Condensed", "DIN 2014", Inter, system-ui, sans-serif;
  --tf-font-mono: "JetBrains Mono", "IBM Plex Mono", "Roboto Mono", ui-monospace, monospace;
  --tf-font-display: Rajdhani, Oxanium, Inter, system-ui, sans-serif;

  --tf-text-2xs: 10px;
  --tf-text-xs: 11px;
  --tf-text-sm: 12px;
  --tf-text-base: 13px;
  --tf-text-md: 14px;
  --tf-text-lg: 18px;
  --tf-text-xl: 22px;
  --tf-text-2xl: 28px;
  --tf-text-display: 40px;

  --tf-line-tight: 1.1;
  --tf-line-compact: 1.25;
  --tf-line-normal: 1.45;
  --tf-line-readable: 1.65;

  --tf-weight-regular: 400;
  --tf-weight-medium: 500;
  --tf-weight-semibold: 600;
  --tf-weight-bold: 700;
  --tf-weight-black: 800;

  --tf-tracking-tight: -0.01em;
  --tf-tracking-normal: 0;
  --tf-tracking-label: 0.04em;
  --tf-tracking-command: 0.06em;
  --tf-tracking-micro: 0.08em;

  /* === SPACING === */
  --tf-space-0: 0px;
  --tf-space-1: 2px;
  --tf-space-2: 4px;
  --tf-space-3: 6px;
  --tf-space-4: 8px;
  --tf-space-5: 12px;
  --tf-space-6: 16px;
  --tf-space-7: 24px;
  --tf-space-8: 32px;
  --tf-space-9: 48px;
  --tf-space-10: 64px;

  --tf-control-height-xs: 22px;
  --tf-control-height-sm: 26px;
  --tf-control-height-md: 30px;
  --tf-control-height-lg: 36px;
  --tf-control-height-xl: 44px;

  --tf-panel-padding-compact: 8px;
  --tf-panel-padding: 12px;
  --tf-panel-padding-loose: 16px;

  --tf-cell-padding-x: 8px;
  --tf-cell-padding-y: 5px;

  --tf-button-padding-x: 10px;
  --tf-button-padding-y: 6px;

  /* === RADIUS === */
  --tf-radius-none: 0px;
  --tf-radius-xs: 1px;
  --tf-radius-sm: 2px;
  --tf-radius-md: 4px;
  --tf-radius-lg: 6px;
  --tf-radius-xl: 8px;

  /* === BORDERS === */
  --tf-border-subtle: #1C2630;
  --tf-border-normal: #26323C;
  --tf-border-strong: #51616D;

  /* === SHADOWS === */
  --tf-shadow-none: none;
  --tf-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.35);
  --tf-shadow-md: 0 4px 12px rgba(0, 0, 0, 0.45);
  --tf-shadow-lg: 0 12px 32px rgba(0, 0, 0, 0.55);

  /* === GLOWS === */
  --tf-glow-run: 0 0 0 1px var(--tf-green), 0 0 18px var(--tf-green-glow);
  --tf-glow-danger: 0 0 0 1px var(--tf-red), 0 0 18px var(--tf-red-glow);
  --tf-glow-warning: 0 0 0 1px var(--tf-amber), 0 0 18px var(--tf-amber-glow);
  --tf-glow-info: 0 0 0 1px var(--tf-blue), 0 0 18px var(--tf-blue-glow);
  --tf-glow-stream: 0 0 0 1px var(--tf-cyan), 0 0 18px var(--tf-cyan-glow);
  --tf-glow-model: 0 0 0 1px var(--tf-purple), 0 0 18px var(--tf-purple-glow);
  --tf-glow-authority: 0 0 0 1px var(--tf-gold), 0 0 18px var(--tf-gold-glow);

  /* === MOTION === */
  --tf-duration-instant: 60ms;
  --tf-duration-fast: 100ms;
  --tf-duration-normal: 160ms;
  --tf-duration-panel: 220ms;
  --tf-duration-slow: 360ms;

  --tf-ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --tf-ease-sharp: cubic-bezier(0.4, 0, 0.2, 1);
  --tf-ease-enter: cubic-bezier(0, 0, 0.2, 1);
  --tf-ease-exit: cubic-bezier(0.4, 0, 1, 1);

  /* === Z-INDEX === */
  --tf-z-base: 0;
  --tf-z-panel: 10;
  --tf-z-sticky: 20;
  --tf-z-dropdown: 40;
  --tf-z-command-palette: 60;
  --tf-z-modal-backdrop: 80;
  --tf-z-modal: 90;
  --tf-z-critical-alert: 100;
  --tf-z-breaker: 110;
}
```

---

## 9. Tailwind Configuration

```js
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        tf: {
          black: '#050608',
          void: '#080B0F',
          charcoal: '#0E1318',
          graphite: '#141A20',
          panel: {
            DEFAULT: '#10161C',
            raised: '#171F27',
            inset: '#090D11'
          },
          steel: {
            950: '#0A0E12',
            900: '#1A222A',
            800: '#222C35',
            700: '#2D3A45',
            600: '#40505C',
            500: '#5F6E7A',
            400: '#7C8A95',
            300: '#9BAAB5',
            200: '#BCC8D0',
            100: '#D6E0E6'
          },
          green: {
            DEFAULT: '#36D47B',
            dim: '#1F7F4D',
            dark: '#0B1A12',
            glow: 'rgba(54, 212, 123, 0.24)',
            radar: '#76FF9F',
            phosphor: '#B8FFCC'
          },
          red: {
            DEFAULT: '#F24B4B',
            dim: '#8F2C2C',
            dark: '#1C0B0B',
            critical: '#B00020',
            glow: 'rgba(242, 75, 75, 0.24)',
            blood: '#B00020'
          },
          amber: {
            DEFAULT: '#F2B84B',
            dim: '#9E6F24',
            dark: '#1D1608',
            glow: 'rgba(242, 184, 75, 0.22)'
          },
          orange: {
            DEFAULT: '#F07A2A',
            dim: '#984B1A',
            dark: '#1B0D05',
            glow: 'rgba(240, 122, 42, 0.22)'
          },
          blue: {
            DEFAULT: '#4BA3F2',
            dim: '#2D6394',
            dark: '#07111F',
            glow: 'rgba(75, 163, 242, 0.22)'
          },
          cyan: {
            DEFAULT: '#35D0E3',
            dim: '#1B7783',
            dark: '#041417',
            glow: 'rgba(53, 208, 227, 0.22)'
          },
          purple: {
            DEFAULT: '#A678F2',
            dim: '#5F4A8B',
            dark: '#110B1F',
            glow: 'rgba(166, 120, 242, 0.22)'
          },
          gold: {
            DEFAULT: '#D6A84F',
            dim: '#8A6A30',
            dark: '#1A1407',
            glow: 'rgba(214, 168, 79, 0.24)'
          },
          slate: {
            DEFAULT: '#6E7F8D',
            dim: '#46535D',
            dark: '#10161B'
          }
        }
      },
      fontFamily: {
        tf: ['Inter', 'IBM Plex Sans', 'system-ui', 'sans-serif'],
        'tf-condensed': ['Roboto Condensed', 'DIN 2014', 'Inter', 'system-ui', 'sans-serif'],
        'tf-mono': ['JetBrains Mono', 'IBM Plex Mono', 'Roboto Mono', 'ui-monospace', 'monospace'],
        'tf-display': ['Rajdhani', 'Oxanium', 'Inter', 'system-ui', 'sans-serif']
      },
      fontSize: {
        'tf-2xs': '10px',
        'tf-xs': '11px',
        'tf-sm': '12px',
        'tf-base': '13px',
        'tf-md': '14px',
        'tf-lg': '18px',
        'tf-xl': '22px',
        'tf-2xl': '28px',
        'tf-display': '40px'
      },
      spacing: {
        'tf-0': '0px',
        'tf-1': '2px',
        'tf-2': '4px',
        'tf-3': '6px',
        'tf-4': '8px',
        'tf-5': '12px',
        'tf-6': '16px',
        'tf-7': '24px',
        'tf-8': '32px',
        'tf-9': '48px',
        'tf-10': '64px'
      },
      borderRadius: {
        'tf-none': '0px',
        'tf-xs': '1px',
        'tf-sm': '2px',
        'tf-md': '4px',
        'tf-lg': '6px',
        'tf-xl': '8px'
      },
      boxShadow: {
        'tf-sm': '0 1px 2px rgba(0, 0, 0, 0.35)',
        'tf-md': '0 4px 12px rgba(0, 0, 0, 0.45)',
        'tf-lg': '0 12px 32px rgba(0, 0, 0, 0.55)',
        'tf-run': '0 0 0 1px #36D47B, 0 0 18px rgba(54, 212, 123, 0.24)',
        'tf-danger': '0 0 0 1px #F24B4B, 0 0 18px rgba(242, 75, 75, 0.24)',
        'tf-warning': '0 0 0 1px #F2B84B, 0 0 18px rgba(242, 184, 75, 0.22)',
        'tf-info': '0 0 0 1px #4BA3F2, 0 0 18px rgba(75, 163, 242, 0.22)',
        'tf-stream': '0 0 0 1px #35D0E3, 0 0 18px rgba(53, 208, 227, 0.22)',
        'tf-authority': '0 0 0 1px #D6A84F, 0 0 18px rgba(214, 168, 79, 0.24)'
      },
      transitionTimingFunction: {
        'tf-standard': 'cubic-bezier(0.2, 0, 0, 1)',
        'tf-sharp': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'tf-enter': 'cubic-bezier(0, 0, 0.2, 1)',
        'tf-exit': 'cubic-bezier(0.4, 0, 1, 1)'
      },
      transitionDuration: {
        'tf-instant': '60ms',
        'tf-fast': '100ms',
        'tf-normal': '160ms',
        'tf-panel': '220ms',
        'tf-slow': '360ms'
      },
      zIndex: {
        'tf-base': '0',
        'tf-panel': '10',
        'tf-sticky': '20',
        'tf-dropdown': '40',
        'tf-command-palette': '60',
        'tf-modal-backdrop': '80',
        'tf-modal': '90',
        'tf-critical-alert': '100',
        'tf-breaker': '110'
      }
    }
  }
};
```

---

## Token Count Summary

| Category | Count |
|----------|-------|
| Color tokens (base) | 61 |
| Color tokens (semantic aliases) | 18 |
| Typography tokens | 28 |
| Spacing tokens | 23 |
| Radius tokens | 6 |
| Border tokens | 18 |
| Shadow tokens | 4 |
| Glow tokens | 7 |
| Motion tokens | 9 |
| Z-Index tokens | 9 |
| **Total** | **183+** |
