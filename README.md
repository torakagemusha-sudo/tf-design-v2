# Torafirma Design System v2

> Controlled force. Operational clarity. Governed execution.

A design system for dark, dense, engineer-level interfaces with a militarized technical aesthetic. Torafirma interfaces communicate that the user is issuing commands into governed computational machinery — not clicking buttons in a consumer app.

**v2** expands the foundation with 12 component families, state machines, layout systems, rules engine, React hooks, and utility functions.

## Installation

```bash
npm install @torakagemusha-sudo/tf-design-v2
```

## Published Package

- npm: https://www.npmjs.com/package/@torakagemusha-sudo/tf-design-v2

## Peer Dependencies

```bash
npm install react react-dom tailwindcss
```

## Package status

This package ships **compiled ESM** from `dist/` (`.js` + `.d.ts`) for all TypeScript entry points. CSS and the Tailwind preset continue to ship from `src/styles/` as static assets. Run `npm run build` before `npm pack` or publish; `prepack` runs the build automatically.

## Quick Start

### 1. Import the CSS tokens

```tsx
import '@torakagemusha-sudo/tf-design-v2/styles/tokens.css';
import '@torakagemusha-sudo/tf-design-v2/styles/themes.css';
import '@torakagemusha-sudo/tf-design-v2/styles/components.css';
import '@torakagemusha-sudo/tf-design-v2/styles/utilities.css';
```

### 2. Configure Tailwind

```js
// tailwind.config.js
import tfConfig from '@torakagemusha-sudo/tf-design-v2/tailwind';

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
import { CommandButton } from '@torakagemusha-sudo/tf-design-v2';

<CommandButton
  command={{
    id: 'run-workflow',
    label: 'Run workflow',
    operation: 'workflow.run',
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
import { useAuthority, useComponentState, useTheme, useCommand } from '@torakagemusha-sudo/tf-design-v2';

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
import { generateTraceId, getStateColor, classNames, deepMerge } from '@torakagemusha-sudo/tf-design-v2';

const traceId = generateTraceId('cmd');
const color = getStateColor('running');
const classes = classNames('tf-button', { 'tf-button--run': isRunMode });
const config = deepMerge(defaultConfig, userOverrides);
```

## Package structure

Published tarball layout (conceptual):

```
@torakagemusha-sudo/tf-design-v2/
├── dist/                       # Compiled ESM + declarations (main, subpath exports)
├── src/styles/                 # Packaged CSS + Tailwind preset (not compiled by tsc)
│   ├── tokens.css              # Many CSS custom properties (implementation detail)
│   ├── tailwind.config.js
│   ├── themes.css
│   ├── components.css
│   └── utilities.css
├── types/                      # Source: barrel at src/types (types-only export → dist/types)
├── components/                 # Source: src/components (family folders + barrel)
├── hooks/                      # Source: src/hooks
├── utils/                      # Source: src/utils
├── state-machines/             # Source: src/state-machines
├── layouts/                    # Source: src/layouts
├── rules/                      # Source: src/rules
└── index.ts                    # Root barrel (compiled to dist/index.*)
```

**Catalog vs exports:** The Torafirma specification codex describes **1,193 component definitions** across twelve families; this repository implements that catalog as **TypeScript/React exports** (import from `@torakagemusha-sudo/tf-design-v2` or `@torakagemusha-sudo/tf-design-v2/components`). The headline number refers to **specification coverage**, not a hand-count of every discrete default export in the tree.

**Design tokens vs CSS variables:** Semantic token categories in the design system number on the order of **256+** (grouped dimensions such as color, spacing, motion). **`tokens.css` additionally defines a large set of CSS custom properties** (including aliases, component-family tokens, and theme wiring); treat “350+ CSS custom properties” and “256+ design tokens” as **different layers** of the same token system, not two estimates of the same set.

## v2 Exports Map

| Export Path | Description |
|-------------|-------------|
| `@torakagemusha-sudo/tf-design-v2` | Main barrel from `dist/` (types, components, hooks, utils, …) |
| `@torakagemusha-sudo/tf-design-v2/styles` | CSS tokens (`src/styles/tokens.css`) |
| `@torakagemusha-sudo/tf-design-v2/styles/tokens.css` | CSS tokens file |
| `@torakagemusha-sudo/tf-design-v2/styles/themes.css` | Theme classes |
| `@torakagemusha-sudo/tf-design-v2/styles/components.css` | Base component styles |
| `@torakagemusha-sudo/tf-design-v2/styles/utilities.css` | Utility classes/effects |
| `@torakagemusha-sudo/tf-design-v2/tokens` | CSS tokens (alias) |
| `@torakagemusha-sudo/tf-design-v2/tailwind` | Tailwind config |
| `@torakagemusha-sudo/tf-design-v2/types` | Type-only barrel (`dist/types/*.d.ts`) |
| `@torakagemusha-sudo/tf-design-v2/components` | React components (`dist/components/*`) |
| `@torakagemusha-sudo/tf-design-v2/hooks` | React hooks |
| `@torakagemusha-sudo/tf-design-v2/utils` | Utility functions |
| `@torakagemusha-sudo/tf-design-v2/state-machines` | State machine types & configs |
| `@torakagemusha-sudo/tf-design-v2/layouts` | Layout types & configs |
| `@torakagemusha-sudo/tf-design-v2/rules` | Rules engine types |

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

The `utils` entry exports **18 named functions** (see `src/utils/index.ts`):

| Utility | Purpose |
|---------|---------|
| `generateTraceId` | Unique trace ID generation |
| `formatTimestamp` | ISO 8601 / human-readable timestamps |
| `getAuthorityLabel` | Human-readable authority labels |
| `getAuthorityDescription` | Longer description for an authority level |
| `getAuthorityRank` | Numeric rank for an authority level |
| `getStateColor` | Semantic foreground color for component states |
| `getStateBgColor` | Background color for component states |
| `getStateColorPair` | Foreground + background pair for a state |
| `classNames` | Conditional class name joining |
| `debounce` | Debounced function wrapper |
| `throttle` | Throttled function wrapper |
| `deepMerge` | Deep object merging |
| `isValidAuthority` | Authority level validation |
| `isValidState` | Component state validation |
| `getStateLabel` | Human-readable label for a state |
| `isActiveState` | Whether a state is “active” |
| `isTerminalState` | Whether a state is terminal |
| `isErrorState` | Whether a state represents an error |

## Contributing

This package is compiled from the Torafirma Specification Codex:

- `01` — Product Architecture Constitution
- `02` — Interaction & Command Grammar
- `03.0` — Component System Overview
- `03.1` — Command & Action Components
- General Design System Parts 1 & 2

## Acknowledgements

This package uses and depends on the following open-source packages:

- `react`
- `react-dom`
- `tailwindcss`
- `typescript`
- `@types/react`
- `@types/react-dom`

## License

MIT
