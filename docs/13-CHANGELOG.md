# 13 — Changelog

> All notable changes to the Torafirma Design System.

---

## Version History

### v2.0.0 — Major Release (Current)

**Release Date:** 2025-01-15

#### Added
- **12 Component Families** — Complete component system with 1,190+ components
  - Command & Action (50+ components)
  - State, Status & Telemetry (90+ components)
  - Layout & Shell (115+ components)
  - Data & Table (125+ components)
  - Graph & Workflow (150+ components)
  - Editor, Form & Configuration (120+ components)
  - Governance & Authority (70+ components)
  - AI-Assisted Studio (90+ components)
  - Runtime, Trace & Console (100+ components)
  - Visualization & Instrumentation (110+ components)
  - Modal, Drawer & Overlay (90+ components)
  - Mobile, Field & Emergency (80+ components)
- **18 State Machines** — Complete state machine library
  - workflowExecutionMachine, graphEditMachine, deploymentMachine
  - authorityEscalationMachine, validationMachine, stagingMachine
  - runtimeLifecycleMachine, traceSessionMachine, commandDispatchMachine
  - aiAssistedEditMachine, policyEnforcementMachine, bulkOperationMachine
  - circuitBreakerMachine, dataCorrectionMachine, sessionGovernanceMachine
  - emergencyBreakMachine, auditTrailMachine, componentLifecycleMachine
- **20 Layout Templates** — Canonical product layouts
  - Command Cockpit, Studio Builder, Runtime Trace, Policy Surface
  - Scientific/QC Workbench, IDE Workspace, AI Studio, Data Explorer
  - Field Command, Emergency Response, Graph Composer, Table Dashboard
  - Split Inspector, Terminal Shell, Map Overlay, Three-Pane Editor
  - Presentation Mode, Mobile Scaffold, Minimized HUD, Fullscreen Canvas
- **5 Canonical Themes** — Complete theme system
  - Command Dark, Field Green, Deep Blue, Forge Graphite, Redline
- **15 Enforcer Categories** — Design rule enforcement
  - Semantic Color, Typography, Spacing Density, Border Radius
  - Button Grammar, Authority Disclosure, State Visibility, Confirmation
  - Traceability, Accessibility, Component Naming, Copy Tone
  - Glow/Decoration, Density, Anti-Pattern
- **183+ Design Tokens** — Comprehensive token system
  - 61 color tokens, 18 semantic aliases
  - 28 typography tokens, 23 spacing tokens
  - 6 radius tokens, 18 border tokens
  - 4 shadow tokens, 7 glow tokens
  - 9 motion tokens, 9 z-index tokens
- **Full Accessibility** — WCAG 2.1 Level AA compliance
  - Color contrast validation
  - Keyboard navigation
  - Screen reader support
  - ARIA patterns
  - Focus management
- **Trace/Audit Pipeline** — Complete event tracking
  - Trace event schema and logging
  - Audit trail (immutable)
  - Real-time event streaming
- **AI-Assisted Studio** — Full AI component family
  - IntentInput, AISuggestionCard, AIDiffViewer
  - AIThinkingIndicator, AIConfidenceBadge
- **Command Grammar** — Formal command system
  - 21 command classes
  - Authority requirements per command
  - Blocking reason system

#### Changed
- **Component API** — All components now use `command` descriptor pattern
- **State Management** — `useState` replaced with `useMachine` throughout
- **Token Naming** — All tokens prefixed with `--tf-`
- **Theme System** — New CSS custom property based themes
- **Layout System** — New template-based layout system

#### Removed
- v1 component aliases (deprecated, will be removed in v2.1.0)
- v1 token aliases (deprecated, will be removed in v2.1.0)
- Legacy state management helpers
- TColorPicker component

---

### v1.5.0

**Release Date:** 2024-09-01

#### Added
- Graph canvas improvements
- Additional telemetry components
- Mobile-responsive shell

#### Fixed
- Z-index stacking issues in modals
- Performance issues in large data tables
- Accessibility contrast in amber theme

---

### v1.4.0

**Release Date:** 2024-06-15

#### Added
- State machine integration (8 machines)
- Trace console component
- Authority gate component

#### Changed
- Improved dark theme contrast
- Updated typography scale

---

### v1.3.0

**Release Date:** 2024-03-01

#### Added
- Data table with virtualization
- Graph node editor
- Property inspector

#### Fixed
- Memory leaks in WebSocket connections
- Focus management in modals

---

### v1.2.0

**Release Date:** 2023-12-01

#### Added
- Layout shell components
- Navigation rail
- Status footer

#### Changed
- Refined color palette
- Improved button variants

---

### v1.1.0

**Release Date:** 2023-09-01

#### Added
- Core component library (buttons, badges, inputs)
- Design token system (initial)
- Dark theme

#### Fixed
- Initial accessibility issues
- Token color values

---

### v1.0.0

**Release Date:** 2023-06-01

#### Added
- Initial design system release
- Core button and input components
- Basic dark theme
- Typography scale
- Spacing scale

---

## Upcoming Releases

### v2.1.0 (Planned: Q2 2025)

- Remove deprecated v1 component aliases
- Performance optimizations
- Additional graph layout algorithms
- Enhanced mobile components

### v2.2.0 (Planned: Q3 2025)

- Remove old Graph API
- Server-side rendering support
- Additional visualization components
- Enhanced AI studio components

### v3.0.0 (Planned: 2026)

- No v1 compatibility layer
- Potential React 19 support
- New animation system
- Enhanced theming capabilities
