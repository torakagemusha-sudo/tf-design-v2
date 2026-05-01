# Torafirma Design System v2

> Controlled force. Operational clarity. Governed execution.

A design system for dark, dense, engineer-level interfaces with a militarized technical aesthetic. Torafirma interfaces communicate that the user is issuing commands into governed computational machinery — not clicking buttons in a consumer app.

**v2** expands the foundation with 12 component families, state machines, layout systems, rules engine, React hooks, and utility functions.

## Installation

```bash
npm install @torafirma/design-system-v2
```

## Peer Dependencies

```bash
npm install react react-dom tailwindcss
```

## Quick Start

### 1. Import the CSS tokens

```tsx
import '@torafirma/design-system-v2/styles/tokens.css';
import '@torafirma/design-system-v2/styles/themes.css';
import '@torafirma/design-system-v2/styles/components.css';
import '@torafirma/design-system-v2/styles/utilities.css';
```

### 2. Configure Tailwind

```js
// tailwind.config.js
import tfConfig from '@torafirma/design-system-v2/tailwind';

export default {
  presets: [tfConfig],
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
};
```

### 3. Use a theme

```tsx
<div className="theme-command-dark">
  <YourApp />
</div>
```

### 4. Use components

```tsx
import { CommandButton } from '@torafirma/design-system-v2';

<CommandButton
  command={{
    id: 'run-workflow',
    label: 'Run workflow',
    commandClass: 'execute',
    state: 'available',
    requiredAuthority: 'AUTH_3_EXECUTE',
  }}
  variant="run"
  onCommand={(cmd) => dispatch(cmd)}
/>
```

### 5. Use hooks (v2)

```tsx
import { useAuthority, useComponentState, useTheme, useCommand } from '@torafirma/design-system-v2';

function MyComponent() {
  const { authority, hasRequiredAuthority } = useAuthority('AUTH_3_EXECUTE');
  const { state, transition, canTransition } = useComponentState();
  const { theme, setTheme } = useTheme();
  const { execute, isExecuting } = useCommand(dispatch);
  // ...
}
```

### 6. Use utilities (v2)

```tsx
import { generateTraceId, getStateColor, classNames, deepMerge } from '@torafirma/design-system-v2';

const traceId = generateTraceId('cmd');
const color = getStateColor('running');
const classes = classNames('tf-button', { 'tf-button--run': isRunMode });
const config = deepMerge(defaultConfig, userOverrides);
```

## Package Structure

```
@torafirma/design-system-v2/
├── styles/
│   ├── tokens.css              # 350+ CSS custom properties
│   ├── tailwind.config.js      # Complete Tailwind theme extension
│   ├── themes.css              # 5 canonical themes
│   ├── components.css          # Base component styles
│   └── utilities.css           # Visual effects & utilities
├── types/
│   └── index.ts                # 80+ TypeScript types
├── components/
│   ├── CommandButton.tsx
│   ├── CommandButtonGroup.tsx
│   ├── ActionBar.tsx
│   ├── CommandPalette.tsx
│   ├── ContextMenu.tsx
│   ├── KebabActionMenu.tsx
│   ├── ConfirmActionModal.tsx
│   ├── DestructiveActionModal.tsx
│   ├── AuthorityActionModal.tsx
│   ├── CircuitBreaker.tsx
│   ├── CommandQueue.tsx
│   ├── StagedActionPanel.tsx
│   ├── ActionTooltip.tsx
│   ├── CommandResultToast.tsx
│   ├── InlineCommandPrompt.tsx
│   └── InspectorActionList.tsx
├── hooks/
│   └── index.ts                # 10 React hooks
├── utils/
│   └── index.ts                # 10 utility functions
└── index.ts                    # Barrel export
```

## v2 Exports Map

| Export Path | Description |
|-------------|-------------|
| `@torafirma/design-system-v2` | Main barrel (types, components, hooks, utils) |
| `@torafirma/design-system-v2/styles` | CSS tokens |
| `@torafirma/design-system-v2/tokens` | CSS tokens (alias) |
| `@torafirma/design-system-v2/tailwind` | Tailwind config |
| `@torafirma/design-system-v2/types` | TypeScript definitions |
| `@torafirma/design-system-v2/components` | React components |
| `@torafirma/design-system-v2/hooks` | React hooks |
| `@torafirma/design-system-v2/utils` | Utility functions |
| `@torafirma/design-system-v2/state-machines` | State machine types & configs |
| `@torafirma/design-system-v2/layouts` | Layout types & configs |
| `@torafirma/design-system-v2/rules` | Rules engine types |

## Design Token Categories (v2)

| Category | v1 Count | v2 Count | Description |
|----------|----------|----------|-------------|
| Colors | 60+ | 90+ | Root surfaces, steel scale, operational semantics, family accents |
| Typography | 26 | 26 | Font stacks, sizes, weights, tracking |
| Spacing | 23 | 32 | Space scale, control heights, padding, mobile tokens |
| Radius | 6 | 6 | Hard-edge geometry tokens |
| Borders | 18 | 18 | Subtle/normal/strong + semantic variants |
| Shadows/Glow | 11 | 22 | Elevation + semantic glows + AI/stream variants |
| Motion | 9 | 18 | Durations + easing curves + family-specific |
| Z-Index | 9 | 14 | Stacking order for operational layers |
| Component Families | — | 12 | Family-specific color, border, glow tokens |
| Layout | — | 8 | Grid, panel, sidebar, drawer dimensions |
| State Machine | — | 12 | Visual tokens for state representations |

## Themes

| Theme | Class | Use Case |
|-------|-------|----------|
| Command Dark | `.theme-command-dark` | Default — general purpose |
| Field Green | `.theme-field-green` | Tactical / operations |
| Deep Blue | `.theme-deep-blue` | Analysis / intelligence |
| Forge | `.theme-forge` | Engineering / IDE |
| Redline | `.theme-redline` | Threat / incident response |

## 12 Component Families (v2)

| # | Family | Accent | Variant |
|---|--------|--------|---------|
| 1 | Action & Command | Green | `run` |
| 2 | Feedback & Status | Blue/Amber/Red | `inspect` / `warning` / `danger` |
| 3 | Input & Control | Steel | `neutral` |
| 4 | Navigation | Cyan | `stream` |
| 5 | Data Display | Steel | `neutral` |
| 6 | Overlay | Steel | `neutral` |
| 7 | Authority & Permission | Gold | `authority` |
| 8 | AI & Model | Purple | `model` |
| 9 | Stream & Live | Cyan | `stream` |
| 10 | Safety & Circuit | Red/Amber/Green | `danger` / `warning` / `run` |
| 11 | Trace & Audit | Cyan | `stream` |
| 12 | Workspace & Layout | Steel | `neutral` |

## Type System (v2)

**80+ TypeScript types** including all v1 types plus:

- **State Machines**: `StateMachineConfig`, `StateTransition`, `StateMachineSnapshot`, `StateGuard`, `StateMachineEventType`
- **Layouts**: `LayoutTemplate`, `LayoutPanelConfig`, `LayoutBreakpoint`, `LayoutState`, `DrawerPosition`, `ToastPosition`
- **Rules**: `Rule`, `RuleCondition`, `RuleConditionGroup`, `RuleAction`, `RulesetEvaluationResult`
- **Hooks**: `UseAuthorityReturn`, `UseComponentStateReturn`, `UseCommandReturn`, `UseValidationReturn`, `UseTelemetryReturn`, `UseModalReturn`, `UseToastReturn`, `UseDrawerReturn`, `UseThemeReturn`, `UseTraceReturn`
- **Utilities**: `ClassNamesOptions`, `DebounceOptions`, `ThrottleOptions`, `DeepMergeOptions`

## Hooks (v2)

| Hook | Purpose |
|------|---------|
| `useAuthority` | Authority levels, elevation requests |
| `useComponentState` | State machine transitions |
| `useTheme` | Theme switching with system detection |
| `useTrace` | Trace ID generation, audit logging |
| `useCommand` | Command execution with governance |
| `useValidation` | Async validation state |
| `useTelemetry` | Operational event tracking |
| `useModal` | Modal open/close state |
| `useToast` | Toast queue management |
| `useDrawer` | Drawer state with position |

## Utilities (v2)

| Utility | Purpose |
|---------|---------|
| `generateTraceId` | Unique trace ID generation |
| `formatTimestamp` | ISO 8601 / human-readable timestamps |
| `getAuthorityLabel` | Human-readable authority labels |
| `getStateColor` | Semantic color for component states |
| `classNames` | Conditional class name joining |
| `debounce` | Debounced function wrapper |
| `throttle` | Throttled function wrapper |
| `deepMerge` | Deep object merging |
| `isValidAuthority` | Authority level validation |
| `isValidState` | Component state validation |

## Contributing

This package is compiled from the Torafirma Specification Codex:

- `01` — Product Architecture Constitution
- `02` — Interaction & Command Grammar
- `03.0` — Component System Overview
- `03.1` — Command & Action Components
- General Design System Parts 1 & 2

## License

Opensource - Fair use
