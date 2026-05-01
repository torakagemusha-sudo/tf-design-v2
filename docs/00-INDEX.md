# Torafirma Design System v2 — Developer Guide

## Complete Navigation Index

> **Dark. Dense. Governed. Instrumented. Consequence-aware.**

This is the unified developer guide for the Torafirma Design System — a comprehensive design system for building governed operational interfaces that control computational machinery.

---

## Guide Structure (15 Volumes)

| # | File | Title | Description |
|---|------|-------|-------------|
| 00 | [`00-INDEX.md`](./00-INDEX.md) | **Master Navigation Index** | You are here. Links to all sections |
| 01 | [`01-INTRODUCTION.md`](./01-INTRODUCTION.md) | **Introduction** | What is Torafirma, philosophy, audience, installation, quick start |
| 02 | [`02-ARCHITECTURE.md`](./02-ARCHITECTURE.md) | **Architecture Overview** | System layers, component families, state machines, layout templates, themes, authority model |
| 03 | [`03-DESIGN-TOKENS.md`](./03-DESIGN-TOKENS.md) | **Design Tokens Reference** | Complete color palette, typography, spacing, borders, shadows, motion, z-index |
| 04 | [`04-COMPONENT-CATALOG.md`](./04-COMPONENT-CATALOG.md) | **Component Catalog** | All 12 component families with full API specs, props, usage examples |
| 05 | [`05-STATE-MACHINES.md`](./05-STATE-MACHINES.md) | **State Machine Reference** | All 18 state machines with diagrams, transitions, guards, actions |
| 06 | [`06-LAYOUT-TEMPLATES.md`](./06-LAYOUT-TEMPLATES.md) | **Layout Template Guide** | 20 layout templates with diagrams, theme variants, responsive behavior |
| 07 | [`07-THEMES.md`](./07-THEMES.md) | **Theme Customization** | 5 canonical themes, custom theme creation, switching, accessibility |
| 08 | [`08-DESIGN-RULES.md`](./08-DESIGN-RULES.md) | **Design Rules Reference** | 15 enforcer categories, severity levels, CI/CD integration |
| 09 | [`09-ACCESSIBILITY.md`](./09-ACCESSIBILITY.md) | **Accessibility Guide** | Contrast, keyboard navigation, screen readers, ARIA, focus management |
| 10 | [`10-PATTERNS.md`](./10-PATTERNS.md) | **Common Patterns** | 8 battle-tested design patterns for Torafirma products |
| 11 | [`11-MIGRATION.md`](./11-MIGRATION.md) | **Migration Guide** | v1→v2 migration, adoption strategy, breaking changes |
| 12 | [`12-API-REFERENCE.md`](./12-API-REFERENCE.md) | **Full API Reference** | TypeScript types, hooks, utilities, constants |
| 13 | [`13-CHANGELOG.md`](./13-CHANGELOG.md) | **Changelog** | Version history and release notes |
| 14 | [`14-GLOSSARY.md`](./14-GLOSSARY.md) | **Glossary** | Torafirma terminology reference |

---

## Quick Reference Cards

### Core Philosophy
> **Controlled force. Operational clarity. Governed execution.**

Every interface must answer four questions immediately:
1. What system am I observing?
2. What state is it in?
3. What actions are available?
4. What consequences will those actions have?

### Design Axioms (5)
1. **State Before Ornament** — System state before beautification
2. **Density Is Acceptable When Structure Is Strong** — Dense but structured
3. **Every Action Has Authority Level** — No action is merely a button
4. **Fail Closed Visually** — Uncertainty blocks dangerous action
5. **Sharp Lines, Hard Edges, Precise Seams** — Engineered geometry

### Authority Model (7 Levels)
| Level | Name | Capability |
|------:|------|------------|
| 0 | **Observe** | Read-only access |
| 1 | **Draft** | Create uncommitted artifacts |
| 2 | **Stage** | Prepare validated changes |
| 3 | **Execute** | Run approved operations |
| 4 | **Commit** | Persist durable changes |
| 5 | **Override** | Bypass gates with reason/audit |
| 6 | **Root** | Full authority; heavily audited |

### 12 Component Families
```
03.1  Command & Action              (50+ components)
03.2  State, Status & Telemetry     (90+ components)
03.3  Layout & Shell                (115+ components)
03.4  Data & Table                  (125+ components)
03.5  Graph & Workflow              (150+ components)
03.6  Editor, Form & Configuration  (120+ components)
03.7  Governance & Authority        (70+ components)
03.8  AI-Assisted Studio            (90+ components)
03.9  Runtime, Trace & Console      (100+ components)
03.10 Visualization & Instrumentation (110+ components)
03.11 Modal, Drawer & Overlay       (90+ components)
03.12 Mobile, Field & Emergency     (80+ components)
```

### 5 Canonical Themes
1. **Command Dark** — Default operational interface
2. **Field Green** — Tactical/mission operations
3. **Deep Blue** — Analysis and intelligence
4. **Forge Graphite** — Engineering/IDE/build tools
5. **Redline** — Threat response and incident handling

---

## Document Dependencies

```text
01-INTRODUCTION → 02-ARCHITECTURE → 03-DESIGN-TOKENS
     ↓                 ↓                    ↓
04-COMPONENT-CATALOG ←┘                    ↓
     ↓                 07-THEMES ← 06-LAYOUT-TEMPLATES
05-STATE-MACHINES                           ↑
     ↓                    08-DESIGN-RULES ←─┘
10-PATTERNS ← 09-ACCESSIBILITY ←┘
     ↓
11-MIGRATION ← 12-API-REFERENCE ← 13-CHANGELOG ← 14-GLOSSARY
```

---

## How to Use This Guide

- **New to Torafirma?** Start with [01-INTRODUCTION.md](01-INTRODUCTION.md), then [02-ARCHITECTURE.md](02-ARCHITECTURE.md)
- **Implementing components?** Reference [03-DESIGN-TOKENS.md](03-DESIGN-TOKENS.md) and [04-COMPONENT-CATALOG.md](04-COMPONENT-CATALOG.md)
- **Building layouts?** See [06-LAYOUT-TEMPLATES.md](06-LAYOUT-TEMPLATES.md) and [07-THEMES.md](07-THEMES.md)
- **Need design patterns?** [10-PATTERNS.md](10-PATTERNS.md) has battle-tested solutions
- **Migrating from v1?** [11-MIGRATION.md](11-MIGRATION.md) has the full migration path
- **Need API details?** [12-API-REFERENCE.md](12-API-REFERENCE.md) has all TypeScript types

---

*Torafirma Design System v2 — Generated from Product Architecture Constitution, Interaction Command Grammar, General Design System (Parts 1 & 2), and Component System Specifications.*
