# 02 — Architecture Overview

> The Torafirma system is organized as a layered hierarchy: **Tokens -> Styles -> Components -> Layouts**, with a state machine layer, authority model, and trace pipeline governing all interactions.

---

## Table of Contents

1. [Design System Layers](#1-design-system-layers)
2. [Component Family Organization](#2-component-family-organization)
3. [State Machine Layer](#3-state-machine-layer)
4. [Layout Template System](#4-layout-template-system)
5. [Design Rule Enforcers](#5-design-rule-enforcers)
6. [Theme System](#6-theme-system)
7. [Authority Model](#7-authority-model)
8. [Trace/Audit Pipeline](#8-traceaudit-pipeline)

---

## 1. Design System Layers

Every Torafirma interface is built as a layered system:

```
Layer 4: LAYOUT TEMPLATES
         Full-screen arrangements (Command Cockpit, Studio Builder,
         Runtime Trace, Policy Surface, etc.)

Layer 3: COMPONENTS
         Reusable UI primitives organized into 12 operational families

Layer 2: STYLES
         Semantic styling system mapping tokens to component surfaces

Layer 1: DESIGN TOKENS
         Canonical constants: colors, typography, spacing, motion,
         borders, elevation, z-index

Layer 0: PRIMITIVES
         Browser/platform defaults, CSS resets, font loading
```

### Layer 0: Primitives

Foundational web standards that Torafirma builds upon:

- CSS Grid and Flexbox layouts
- CSS Custom Properties (variables)
- Semantic HTML5 elements
- ARIA attributes and patterns
- Web Animations API
- ResizeObserver / IntersectionObserver

### Layer 1: Design Tokens

Tokens are the canonical interface constants. They prevent drift between products, eliminate arbitrary styling, and make the visual system governable.

Token categories (see [03-DESIGN-TOKENS.md](03-DESIGN-TOKENS.md) for full reference):
- **Color** — semantic state, surface, border, typography values (60+ tokens)
- **Typography** — font families, sizes, weights, line heights, tracking (28+ tokens)
- **Spacing** — padding, margin, gaps, layout density, grid units (23+ tokens)
- **Radius** — hard-edged geometry and limited rounding (6 tokens)
- **Borders** — panel seams, authority lines, warning/fault boundaries (18+ tokens)
- **Elevation** — restrained shadow and glow behavior (11+ tokens)
- **Motion** — duration, easing, pulse, transition behavior (9+ tokens)
- **Z-Index** — stacking order for operational layers (9 tokens)
- **State** — active, disabled, dirty, staged, running, faulted, locked

### Layer 2: Styles

The style layer maps tokens to semantic component surfaces:

```
Tokens → Style Rules → Component Surfaces

Example mapping:
  --tf-green → .tf-button-run { color: var(--tf-green); }
  --tf-charcoal → .tf-panel { background: var(--tf-charcoal); }
  --tf-border-normal → .tf-panel { border-color: var(--tf-border-normal); }
```

### Layer 3: Components

Components are the reusable interface units. Torafirma components are organized into **12 operational families**, each addressing a specific domain of the interface.

See [04-COMPONENT-CATALOG.md](04-COMPONENT-CATALOG.md) for the complete component catalog.

### Layer 4: Layout Templates

Layout templates define full-screen arrangements for different product archetypes. There are 20 canonical layout templates covering all major Torafirma product types.

See [06-LAYOUT-TEMPLATES.md](06-LAYOUT-TEMPLATES.md) for the complete layout reference.

---

## 2. Component Family Organization

Torafirma components are grouped by operational function into 12 families:

### Family Overview

| # | Family | Count | Design Intent |
|---|--------|-------|---------------|
| 1 | **Command & Action** | 50+ | Components that initiate actions: buttons, palettes, menus, breakers |
| 2 | **State, Status & Telemetry** | 90+ | Components that display state: badges, indicators, progress, health |
| 3 | **Layout & Shell** | 115+ | Components that structure the application: shells, rails, panes, docks |
| 4 | **Data & Table** | 125+ | Components for data display: tables, grids, filters, validation |
| 5 | **Graph & Workflow** | 150+ | Components for graph-native computation: nodes, edges, ports, canvases |
| 6 | **Editor, Form & Configuration** | 120+ | Components for editing: property panels, schema editors, code panes |
| 7 | **Governance & Authority** | 70+ | Components for policy: gates, interlocks, override panels, audit |
| 8 | **AI-Assisted Studio** | 90+ | Components for AI assistance: intent input, proposals, diff viewers |
| 9 | **Runtime, Trace & Console** | 100+ | Components for execution: trace consoles, event streams, terminals |
| 10 | **Visualization & Instrumentation** | 110+ | Components for metrics: charts, telemetry strips, regime indicators |
| 11 | **Modal, Drawer & Overlay** | 90+ | Components that appear above surfaces: modals, drawers, toasts |
| 12 | **Mobile, Field & Emergency** | 80+ | Components for field/mobile: large targets, offline, emergency breakers |

### Component Inheritance

```
03.0 Component System Overview (universal rules)
  ├── 03.1 Command & Action Components
  ├── 03.2 State, Status & Telemetry Components
  ├── 03.3 Layout & Shell Components
  ├── 03.4 Data & Table Components
  ├── 03.5 Graph & Workflow Components
  ├── 03.6 Editor, Form & Configuration Components
  ├── 03.7 Governance & Authority Components
  ├── 03.8 AI-Assisted Studio Components
  ├── 03.9 Runtime, Trace & Console Components
  ├── 03.10 Visualization & Instrumentation Components
  ├── 03.11 Modal, Drawer & Overlay Components
  └── 03.12 Mobile, Field & Emergency Variants
```

### Component Anatomy

Every substantial component follows this anatomy:

```text
Component
  Root
  Header / Label Region
  Status / Badge Region
  Body / Content Region
  Control Region
  Feedback Region
  Trace / Metadata Region
  Failure / Empty / Disabled State
```

### Universal Props Model

All components inherit from the base Torafirma interface:

```typescript
type TorafirmaComponentState =
  | 'idle' | 'ready' | 'dirty' | 'validating' | 'valid' | 'warning'
  | 'blocked' | 'staged' | 'running' | 'complete' | 'degraded'
  | 'faulted' | 'locked' | 'simulated' | 'committed' | 'deployed'
  | 'disconnected';

type AuthorityLevel =
  | 'AUTH_0_OBSERVE' | 'AUTH_1_DRAFT' | 'AUTH_2_STAGE'
  | 'AUTH_3_EXECUTE' | 'AUTH_4_COMMIT' | 'AUTH_5_OVERRIDE'
  | 'AUTH_6_ROOT';

type ComponentDensity = 'compact' | 'standard' | 'field';

type ComponentCriticality =
  | 'passive' | 'informational' | 'operational' | 'warning'
  | 'critical' | 'audit';

interface TorafirmaComponentBaseProps {
  id?: string;
  label?: string;
  description?: string;
  state?: TorafirmaComponentState;
  authority?: AuthorityLevel;
  requiredAuthority?: AuthorityLevel;
  density?: ComponentDensity;
  criticality?: ComponentCriticality;
  disabled?: boolean;
  disabledReason?: string;
  traceId?: string;
  testId?: string;
}
```

---

## 3. State Machine Layer

### 3.1 State Machine Philosophy

Torafirma products use explicit state machines to govern component behavior, action availability, and lifecycle transitions. State machines prevent impossible states, enforce transition discipline, and make system behavior auditable.

### 3.2 Canonical States

All products use the following state language:

| State | Meaning |
|-------|---------|
| `IDLE` | No active operation |
| `READY` | Valid and available for action |
| `DIRTY` | Local changes exist but are not staged |
| `VALIDATING` | Validation is running |
| `VALID` | Validation passed |
| `WARNING` | Admissible but requires attention |
| `BLOCKED` | Action prevented by policy, validation, authority, or dependency |
| `STAGED` | Validated change prepared for action |
| `RUNNING` | Runtime operation active |
| `COMPLETE` | Operation completed |
| `DEGRADED` | Operating below nominal capability |
| `FAULTED` | Operation or subsystem failed |
| `LOCKED` | Protected by authority, ownership, or policy |
| `SIMULATED` | Non-production execution or preview |
| `COMMITTED` | Durable change persisted |
| `DEPLOYED` | Change active in target runtime |
| `DISCONNECTED` | Runtime or service unavailable |

### 3.3 Preferred Transition Path

```
IDLE
  → DIRTY
  → VALIDATING
  → VALID / WARNING / BLOCKED
  → STAGED
  → RUNNING
  → COMPLETE / FAULTED
  → COMMITTED / DEPLOYED
```

### 3.4 Invalid Shortcuts (Prohibited)

```
DIRTY → RUNNING         (must validate and stage first)
PROPOSAL → DEPLOYED     (must validate, stage, execute)
AI SUGGESTION → COMMITTED (must go through full lifecycle)
WARNING → EXECUTED WITHOUT ACKNOWLEDGEMENT
BLOCKED → OVERRIDDEN WITHOUT AUDIT
```

### 3.5 The 18 State Machines

See [05-STATE-MACHINES.md](05-STATE-MACHINES.md) for complete state machine specifications.

| # | State Machine | Purpose |
|---|--------------|---------|
| 1 | `workflowExecutionMachine` | Governs workflow lifecycle |
| 2 | `graphEditMachine` | Manages graph editing operations |
| 3 | `deploymentMachine` | Controls deployment lifecycle |
| 4 | `authorityEscalationMachine` | Manages authority level transitions |
| 5 | `validationMachine` | Governs validation operations |
| 6 | `stagingMachine` | Controls the staging process |
| 7 | `runtimeLifecycleMachine` | Manages runtime connection state |
| 8 | `traceSessionMachine` | Governs trace session lifecycle |
| 9 | `commandDispatchMachine` | Controls command dispatch and execution |
| 10 | `aiAssistedEditMachine` | Manages AI-assisted editing lifecycle |
| 11 | `policyEnforcementMachine` | Governs policy gate resolution |
| 12 | `bulkOperationMachine` | Controls bulk operation lifecycle |
| 13 | `circuitBreakerMachine` | Manages circuit breaker state |
| 14 | `dataCorrectionMachine` | Governs data correction workflow |
| 15 | `sessionGovernanceMachine` | Manages user session authority |
| 16 | `emergencyBreakMachine` | Controls emergency stop procedures |
| 17 | `auditTrailMachine` | Governs audit trail lifecycle |
| 18 | `componentLifecycleMachine` | Manages component mount/unmount states |

---

## 4. Layout Template System

### 4.1 Layout Philosophy

Torafirma layouts should resemble operational instruments, not marketing pages. Preferred layout primitives:

- Fixed command bars
- Left navigation rails
- Center workspaces
- Right inspectors
- Bottom consoles
- Top status bands
- Grid-based panels
- Split panes
- Resizable sections
- Stacked telemetry rows

### 4.2 Canonical Product Shell

```
+----------------------------------------------------------+
| Top Command Bar                                           |
+------------+----------------------------+----------------+
| Left Nav   | Primary Workspace          | Right Inspector|
| Rail       |                            |                |
|            |                            |                |
+------------+----------------------------+----------------+
| Bottom Trace / Console                                    |
+----------------------------------------------------------+
| Status Footer                                             |
+----------------------------------------------------------+
```

### 4.3 The 20 Layout Templates

See [06-LAYOUT-TEMPLATES.md](06-LAYOUT-TEMPLATES.md) for complete layout specifications.

| # | Template | Use Case |
|---|----------|----------|
| 1 | **Command Cockpit** | Live state control, runtime supervision |
| 2 | **Studio Builder** | Build workflows, compose graphs, edit functions |
| 3 | **Runtime Trace** | Inspect execution, debug, audit state transitions |
| 4 | **Policy Surface** | Define rules, inspect contracts, audit decisions |
| 5 | **Scientific/QC Workbench** | Inspect datasets, validate, flag anomalies |
| 6 | **IDE Workspace** | Code editing, building, compiling |
| 7 | **AI Studio** | Prompt engineering, model evaluation |
| 8 | **Data Explorer** | Dataset exploration, filtering, analysis |
| 9 | **Field Command** | Mobile/tactical operations |
| 10 | **Emergency Response** | Incident handling, escalation |
| 11 | **Graph Composer** | Visual graph construction |
| 12 | **Table Dashboard** | Dense data monitoring |
| 13 | **Split Inspector** | Side-by-side comparison |
| 14 | **Terminal Shell** | CLI-focused operations |
| 15 | **Map Overlay** | Geospatial operations |
| 16 | **Three-Pane Editor** | Content editing with preview |
| 17 | **Presentation Mode** | Read-only status display |
| 18 | **Mobile Scaffold** | Touch-optimized layouts |
| 19 | **Minimized HUD** | Heads-up display for active operations |
| 20 | **Fullscreen Canvas** | Immersive graph/canvas work |

---

## 5. Design Rule Enforcers

### 5.1 Enforcer Categories (15)

Torafirma provides automated enforcers that validate interface compliance:

| # | Category | Rules |
|---|----------|-------|
| 1 | **Semantic Color Enforcer** | Validates color usage matches semantic meaning |
| 2 | **Typography Enforcer** | Ensures type scale compliance and legibility |
| 3 | **Spacing Density Enforcer** | Validates spacing token usage |
| 4 | **Border Radius Enforcer** | Enforces sharp/minimal radius rules |
| 5 | **Button Grammar Enforcer** | Validates button labels use proper verbs |
| 6 | **Authority Disclosure Enforcer** | Ensures authority is visible for consequential actions |
| 7 | **State Visibility Enforcer** | Validates state is shown near action surfaces |
| 8 | **Confirmation Enforcer** | Validates destructive actions require confirmation |
| 9 | **Traceability Enforcer** | Ensures consequential actions produce trace events |
| 10 | **Accessibility Enforcer** | Validates contrast, focus states, ARIA usage |
| 11 | **Component Naming Enforcer** | Validates component names encode operational purpose |
| 12 | **Copy Tone Enforcer** | Validates language follows Torafirma voice |
| 13 | **Glow/Decoration Enforcer** | Limits glow to semantic state indicators |
| 14 | **Density Enforcer** | Validates information density is appropriate for context |
| 15 | **Anti-Pattern Enforcer** | Catches prohibited patterns (hidden state, generic labels) |

### 5.2 Severity Levels

| Level | Description | Action |
|-------|-------------|--------|
| `error` | Violation breaks core system rules | Block build |
| `warning` | Deviation from recommended practice | Build warning |
| `info` | Suggestion for improvement | Log only |

### 5.3 Running Enforcers

```bash
# Run all enforcers
npx torafirma-enforce

# Run specific enforcer
npx torafirma-enforce --rule semantic-color

# Run with severity override
npx torafirma-enforce --severity error

# CI mode (exit codes)
npx torafirma-enforce --ci
```

See [08-DESIGN-RULES.md](08-DESIGN-RULES.md) for the complete design rules reference.

---

## 6. Theme System

### 6.1 5 Canonical Themes

| Theme | Purpose | Key Colors |
|-------|---------|------------|
| **Command Dark** | Default operational interface | Black/charcoal bg, green accent |
| **Field Green** | Tactical/mission operations | Dark green bg, green accent |
| **Deep Blue** | Analysis and intelligence | Deep blue bg, blue accent |
| **Forge Graphite** | Engineering/IDE/build tools | Graphite bg, amber accent |
| **Redline** | Threat response, incident handling | Dark red bg, red accent |

### 6.2 Theme Architecture

Themes are implemented as CSS custom property sets that override the base token values:

```css
:root {
  /* Base tokens (Command Dark default) */
  --tf-bg: #050608;
  --tf-surface: #0E1318;
  /* ... */
}

[data-theme="field-green"] {
  --tf-bg: #030705;
  --tf-surface: #07120C;
  --tf-accent: #36D47B;
  /* ... */
}
```

See [07-THEMES.md](07-THEMES.md) for complete theme specifications.

---

## 7. Authority Model

### 7.1 Authority Levels

| Level | Name | Meaning | Capability |
|------:|------|---------|------------|
| 0 | **Observe** | Read-only access | View, inspect, query |
| 1 | **Draft** | Create uncommitted artifacts | Create, edit, generate drafts |
| 2 | **Stage** | Prepare validated changes | Stage, validate, prepare |
| 3 | **Execute** | Run approved operations | Run, dispatch, start |
| 4 | **Commit** | Persist durable changes | Save, persist, deploy |
| 5 | **Override** | Bypass gates with reason/audit | Override policy, force execution |
| 6 | **Root** | Full authority | Alter authority model, purge audit data |

### 7.2 Display Format

```
AUTH 0 . OBSERVE
AUTH 1 . DRAFT
AUTH 2 . STAGE
AUTH 3 . EXECUTE
AUTH 4 . COMMIT
AUTH 5 . OVERRIDE
AUTH 6 . ROOT
```

### 7.3 Authority Rules

- Any operation that changes durable state, runtime state, external systems, policy state, or destructive object state must declare its required authority level.
- Escalation must be explicit and show: requested action, current authority, required authority, affected objects, reason, audit behavior, and expiry if temporary.
- Avoid casual escalation language ("Continue anyway", "Force it", "Ignore warning").
- Use formal escalation language ("Authorize override", "Request authority", "Seal command").

### 7.4 Authority Escalation Flow

```
Operator requests action
  → System checks current authority
  → If sufficient: proceed
  → If insufficient: show escalation dialog
    → Display required authority
    → Request reason
    → Show affected objects
    → Show audit behavior
    → Operator confirms escalation
      → Write audit event
      → Grant temporary authority
      → Proceed with action
```

---

## 8. Trace/Audit Pipeline

### 8.1 Trace Principle

If the system does something consequential, the operator must be able to inspect what happened.

### 8.2 Traceable Events

```
create, edit, validate, stage, execute, commit, deploy, abort,
reject, override, fault, recover, authority_escalation, policy_change
```

### 8.3 Trace Event Shape

```typescript
interface TraceEvent {
  event_id: string;       // "trace.local.18f2a91c.0004"
  timestamp: string;      // ISO 8601
  actor: string;          // "operator"
  authority: string;      // "AUTH 3 . EXECUTE"
  operation: string;      // "workflow.execute"
  target: string;         // "workflow.qc.repeat_detection"
  state_before: string;   // "STAGED"
  state_after: string;    // "RUNNING"
  result: string;         // "accepted"
  reason_code?: string;   // null or error code
  runtime?: string;       // "runtime.local.dev"
  parent_trace?: string;  // hierarchical trace linking
}
```

### 8.4 Audit Events

Audit-level events (immutable/append-only):

- Authority escalation
- Override
- Policy modification
- Destructive action
- Runtime deployment
- External system mutation
- Governance bypass
- Protected object change

### 8.5 Trace Pipeline Architecture

```
[Component Action]
  → [Command Dispatch]
    → [Authority Check]
      → [Execution]
        → [Result]
          → [Trace Writer] → Trace Store (append-only)
          → [Audit Writer] → Audit Store (immutable)
          → [UI Feedback]  → StateBadge, Toast, Console
```

### 8.6 Trace Layer in Product Shell

Every Torafirma product should include a trace console in the bottom panel:

```
+----------------------------------------------------------+
| TRACE CONSOLE                                             |
| 14:42:00  workflow.execute   RUNNING  AUTH 3  18F2-A91C |
| 14:41:55  workflow.stage     STAGED   AUTH 2  18F2-A91B |
| 14:41:42  graph.validate     VALID    AUTH 1  18F2-A91A |
+----------------------------------------------------------+
```

---

## Architecture Summary

```
TORAFIRMA DESIGN SYSTEM v2

Governance Layer        Authority Model (AUTH_0..AUTH_6)
                        Design Rule Enforcers (15 categories)
                        Trace/Audit Pipeline

Application Layer       Layout Templates (20 templates)
                        Product Shell (6 zones)

Component Layer         12 Component Families (1070+ components)
                        Universal Props Model
                        Semantic Variants (9 variants)

State Layer             18 State Machines
                        Canonical State Model (17 states)

Style Layer             5 Canonical Themes
                        Semantic Color System

Token Layer             60+ Colors
                        28+ Typography tokens
                        23+ Spacing tokens
                        18+ Border tokens
                        11+ Elevation tokens
                        9 Motion tokens
                        9 Z-Index tokens
```
