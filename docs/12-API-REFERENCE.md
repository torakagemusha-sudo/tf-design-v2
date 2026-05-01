# 12 — Full API Reference

> Complete TypeScript types, hooks, utilities, and constants exported by the Torafirma Design System.

---

## Table of Contents

1. [TypeScript Types](#1-typescript-types)
2. [Hooks](#2-hooks)
3. [Utility Functions](#3-utility-functions)
4. [Constants and Enums](#4-constants-and-enums)

---

## 1. TypeScript Types

### Core Types

```typescript
// ===== AUTHORITY MODEL =====

type AuthorityLevel =
  | 'AUTH_0_OBSERVE'
  | 'AUTH_1_DRAFT'
  | 'AUTH_2_STAGE'
  | 'AUTH_3_EXECUTE'
  | 'AUTH_4_COMMIT'
  | 'AUTH_5_OVERRIDE'
  | 'AUTH_6_ROOT';

// Numeric rank for comparison
const AUTHORITY_RANK: Record<AuthorityLevel, number> = {
  'AUTH_0_OBSERVE': 0,
  'AUTH_1_DRAFT': 1,
  'AUTH_2_STAGE': 2,
  'AUTH_3_EXECUTE': 3,
  'AUTH_4_COMMIT': 4,
  'AUTH_5_OVERRIDE': 5,
  'AUTH_6_ROOT': 6
};

// ===== COMPONENT STATE =====

type TorafirmaComponentState =
  | 'idle'
  | 'ready'
  | 'dirty'
  | 'validating'
  | 'valid'
  | 'warning'
  | 'blocked'
  | 'staged'
  | 'running'
  | 'complete'
  | 'degraded'
  | 'faulted'
  | 'locked'
  | 'simulated'
  | 'committed'
  | 'deployed'
  | 'disconnected';

// ===== SEMANTIC VARIANTS =====

type SemanticVariant =
  | 'run'
  | 'stop'
  | 'review'
  | 'inspect'
  | 'stream'
  | 'model'
  | 'authority'
  | 'neutral'
  | 'destructive';

// ===== COMPONENT DENSITY =====

type ComponentDensity = 'compact' | 'standard' | 'field';

// ===== COMPONENT CRITICALITY =====

type ComponentCriticality =
  | 'passive'
  | 'informational'
  | 'operational'
  | 'warning'
  | 'critical'
  | 'audit';

// ===== COMMAND MODEL =====

interface CommandDescriptor {
  id: string;
  label: string;
  operation: string;
  commandClass: CommandClass;
  target?: string;
  targetType?: string;
  state: 'available' | 'blocked' | 'hidden';
  requiredAuthority?: AuthorityLevel;
  requiresConfirmation?: boolean;
  requiresTrace?: boolean;
  blockedReason?: BlockedReason;
  shortcut?: string;
  icon?: string;
}

type CommandClass =
  | 'observe'
  | 'edit'
  | 'create'
  | 'generate'
  | 'validate'
  | 'simulate'
  | 'preview'
  | 'stage'
  | 'execute'
  | 'run'
  | 'commit'
  | 'deploy'
  | 'override'
  | 'abort'
  | 'stop'
  | 'kill'
  | 'purge'
  | 'retry'
  | 'cancel'
  | 'export'
  | 'import';

interface BlockedReason {
  reasonCode: string;
  message: string;
  requiredAction?: string;
}

// ===== TRACE MODEL =====

interface TraceEvent {
  event_id: string;
  timestamp: string;
  actor: string;
  authority: string;
  operation: string;
  target: string;
  target_type?: string;
  state_before: string;
  state_after: string;
  result: string;
  reason_code?: string;
  runtime?: string;
  trace_id: string;
  session_id: string;
  parent_trace?: string;
}

interface TraceFilter {
  actor?: string;
  authority?: string;
  operation?: string;
  target?: string;
  result?: string;
  dateFrom?: string;
  dateTo?: string;
}

// ===== GRAPH MODEL =====

interface GraphNode {
  id: string;
  label: string;
  type: NodeType;
  state?: TorafirmaComponentState;
  position: Position;
  ports: PortDef[];
  selected?: boolean;
  draggable?: boolean;
  metadata?: Record<string, unknown>;
}

type NodeType =
  | 'function'
  | 'condition'
  | 'loop'
  | 'input'
  | 'output'
  | 'subgraph'
  | 'error_handler'
  | 'transform'
  | 'aggregator'
  | 'custom';

interface PortDef {
  id: string;
  type: 'input' | 'output' | 'param';
  dataType?: string;
  connected?: boolean;
  required?: boolean;
  label?: string;
}

interface PortRef {
  nodeId: string;
  portId: string;
}

interface GraphEdge {
  id: string;
  from: PortRef;
  to: PortRef;
  type?: 'data' | 'control' | 'error';
  animated?: boolean;
  selected?: boolean;
}

interface Position {
  x: number;
  y: number;
}

// ===== DATA TABLE MODEL =====

interface ColumnDef<T> {
  key: string;
  header: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: number;
  cell?: (row: T) => React.ReactNode;
  sortFn?: (a: T, b: T) => number;
}

interface FilterDef {
  key: string;
  label: string;
  type: 'text' | 'select' | 'number' | 'date' | 'boolean';
  options?: { label: string; value: string }[];
}

// ===== THEME MODEL =====

type ThemeName =
  | 'command-dark'
  | 'field-green'
  | 'deep-blue'
  | 'forge-graphite'
  | 'redline';

interface ThemeConfig {
  name: ThemeName;
  overrides?: Record<string, string>;
}

// ===== COMPONENT BASE PROPS =====

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

// ===== AI MODEL =====

interface AIProposal {
  id: string;
  intent: string;
  changes: DiffChange[];
  confidence: number;
  estimatedImpact: string;
  generatedAt: string;
}

interface DiffChange {
  type: 'add' | 'remove' | 'modify';
  path: string;
  before?: unknown;
  after?: unknown;
}

// ===== NAVIGATION MODEL =====

interface NavModule {
  id: string;
  label: string;
  icon: string;
  authority?: AuthorityLevel;
  badge?: string;
}

// ===== VALIDATION MODEL =====

interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

interface ValidationError {
  field: string;
  message: string;
  code: string;
}

interface ValidationWarning {
  field: string;
  message: string;
  code: string;
}
```

---

## 2. Hooks

### useMachine

Manages state machine lifecycle.

```typescript
function useMachine<
  TContext = unknown,
  TEvent extends EventObject = EventObject
>(
  machine: StateMachine<TContext, TEvent>,
  options?: {
    input?: Record<string, unknown>;
    context?: Partial<TContext>;
  }
): [State<TContext, TEvent>, SendFunction<TEvent>, ActorRef];

// Usage
const [state, send, actorRef] = useMachine(workflowExecutionMachine, {
  input: { workflowId: 'wf-123' }
});
```

**Returns:**

| Property | Type | Description |
|----------|------|-------------|
| `state` | `State<TContext, TEvent>` | Current machine state |
| `send` | `SendFunction<TEvent>` | Function to send events |
| `actorRef` | `ActorRef` | Actor reference |

**State Properties:**

| Property | Type | Description |
|----------|------|-------------|
| `value` | `string` | Current state name |
| `context` | `TContext` | Machine context |
| `matches` | `(state: string) => boolean` | Check if in state |
| `can` | `(event: TEvent) => boolean` | Check if transition available |
| `hasTag` | `(tag: string) => boolean` | Check if state has tag |
| `done` | `boolean` | Is machine in final state |

### useTheme

Manages theme state and switching.

```typescript
function useTheme(): {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  availableThemes: ThemeName[];
  isSystemTheme: boolean;
};

// Usage
const { theme, setTheme, availableThemes } = useTheme();
```

### useAuthority

Manages current authority level and escalation.

```typescript
function useAuthority(): {
  authority: AuthorityLevel;
  can: (required: AuthorityLevel) => boolean;
  requestEscalation: (target: AuthorityLevel, reason: string) => Promise<boolean>;
};

// Usage
const { authority, can, requestEscalation } = useAuthority();
const canDeploy = can('AUTH_4_COMMIT');
```

### useTrace

Manages trace event subscription and querying.

```typescript
function useTrace(options?: {
  filter?: TraceFilter;
  limit?: number;
  realtime?: boolean;
}): {
  events: TraceEvent[];
  loading: boolean;
  error: Error | null;
  refresh: () => void;
  export: () => void;
};

// Usage
const { events, loading, refresh } = useTrace({
  filter: { operation: 'workflow.execute' },
  realtime: true
});
```

### useCommandPalette

Manages command palette state and filtering.

```typescript
function useCommandPalette(
  commands: CommandDescriptor[]
): {
  open: boolean;
  setOpen: (open: boolean) => void;
  filteredCommands: CommandDescriptor[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedIndex: number;
  selectNext: () => void;
  selectPrevious: () => void;
};

// Usage
const { open, setOpen, filteredCommands } = useCommandPalette(allCommands);
```

### useLayout

Manages layout state (panel sizes, collapsed states).

```typescript
function useLayout(config?: LayoutConfig): {
  navRailOpen: boolean;
  setNavRailOpen: (open: boolean) => void;
  inspectorOpen: boolean;
  setInspectorOpen: (open: boolean) => void;
  inspectorWidth: number;
  setInspectorWidth: (width: number) => void;
  consoleOpen: boolean;
  setConsoleOpen: (open: boolean) => void;
  consoleHeight: number;
  setConsoleHeight: (height: number) => void;
};

// Usage
const { inspectorWidth, setInspectorWidth } = useLayout();
```

### useTelemetry

Manages real-time telemetry subscription.

```typescript
function useTelemetry(
  metricId: string,
  options?: { interval?: number; aggregate?: 'avg' | 'max' | 'min' }
): {
  value: number;
  history: number[];
  trend: 'up' | 'down' | 'stable';
  loading: boolean;
};

// Usage
const { value, trend } = useTelemetry('cpu.usage', { interval: 5000 });
```

### useEnforcer

Runs design rule enforcers programmatically.

```typescript
function useEnforcer(
  rules?: string[],
  glob?: string
): {
  results: EnforcerResult[];
  summary: { errors: number; warnings: number; info: number };
  run: () => void;
  running: boolean;
};

// Usage
const { results, summary, run } = useEnforcer(['semantic-color', 'typography']);
```

---

## 3. Utility Functions

### Authority Utilities

```typescript
// Compare authority levels
function authorityRank(level: AuthorityLevel): number;
// Returns: 0-6

function canPerform(
  current: AuthorityLevel,
  required: AuthorityLevel
): boolean;
// Returns: true if current >= required

function isConsequential(commandClass: CommandClass): boolean;
// Returns: true for execute, commit, override, abort, purge

function requiresConfirmation(commandClass: CommandClass): boolean;
// Returns: true for destructive operations
```

### State Utilities

```typescript
// Map machine state to component state
function mapToComponentState(state: string): TorafirmaComponentState;

// Get state color token
function stateColor(state: TorafirmaComponentState): string;
// Returns: CSS variable name for state color

// Get state label
function stateLabel(state: TorafirmaComponentState): string;

// Check if state is terminal
function isTerminalState(state: TorafirmaComponentState): boolean;
// Returns: true for complete, faulted, committed, deployed

// Check if state is active
function isActiveState(state: TorafirmaComponentState): boolean;
// Returns: true for running, validating, executing
```

### Token Utilities

```typescript
// Get CSS variable value
function getTokenValue(token: string): string;

// Set CSS variable
function setTokenValue(token: string, value: string): void;

// Check if token exists
function tokenExists(token: string): boolean;

// Get all tokens for a category
function getTokens(category: TokenCategory): Record<string, string>;
```

### Trace Utilities

```typescript
// Generate trace event ID
function generateTraceId(): string;

// Format trace event for display
function formatTraceEvent(event: TraceEvent): string;

// Filter trace events
function filterTraceEvents(
  events: TraceEvent[],
  filter: TraceFilter
): TraceEvent[];

// Export trace events
function exportTraceEvents(
  events: TraceEvent[],
  format: 'json' | 'csv'
): string;
```

### Format Utilities

```typescript
// Format authority for display
function formatAuthority(level: AuthorityLevel): string;
// Returns: "AUTH 3 . EXECUTE"

// Format timestamp
function formatTimestamp(timestamp: string): string;
// Returns: "14:42:00 UTC"

// Format duration
function formatDuration(ms: number): string;
// Returns: "1h 23m 45s"

// Format bytes
function formatBytes(bytes: number): string;
// Returns: "1.5 MB"

// Format number with separators
function formatNumber(num: number): string;
// Returns: "1,234,567"
```

### Validation Utilities

```typescript
// Validate command descriptor
function validateCommand(cmd: CommandDescriptor): ValidationResult;

// Validate graph structure
function validateGraph(
  nodes: GraphNode[],
  edges: GraphEdge[]
): ValidationResult;

// Check for graph cycles
function hasGraphCycle(
  nodes: GraphNode[],
  edges: GraphEdge[]
): boolean;
```

---

## 4. Constants and Enums

### Authority Levels

```typescript
const AUTHORITY_LEVELS: AuthorityLevel[] = [
  'AUTH_0_OBSERVE',
  'AUTH_1_DRAFT',
  'AUTH_2_STAGE',
  'AUTH_3_EXECUTE',
  'AUTH_4_COMMIT',
  'AUTH_5_OVERRIDE',
  'AUTH_6_ROOT'
];

const AUTHORITY_LABELS: Record<AuthorityLevel, string> = {
  'AUTH_0_OBSERVE': 'Observe',
  'AUTH_1_DRAFT': 'Draft',
  'AUTH_2_STAGE': 'Stage',
  'AUTH_3_EXECUTE': 'Execute',
  'AUTH_4_COMMIT': 'Commit',
  'AUTH_5_OVERRIDE': 'Override',
  'AUTH_6_ROOT': 'Root'
};
```

### Component States

```typescript
const COMPONENT_STATES: TorafirmaComponentState[] = [
  'idle', 'ready', 'dirty', 'validating', 'valid',
  'warning', 'blocked', 'staged', 'running', 'complete',
  'degraded', 'faulted', 'locked', 'simulated',
  'committed', 'deployed', 'disconnected'
];

const TERMINAL_STATES: TorafirmaComponentState[] = [
  'complete', 'faulted', 'committed', 'deployed'
];

const ACTIVE_STATES: TorafirmaComponentState[] = [
  'running', 'validating', 'staged'
];
```

### Semantic Variants

```typescript
const SEMANTIC_VARIANTS: SemanticVariant[] = [
  'run', 'stop', 'review', 'inspect',
  'stream', 'model', 'authority', 'neutral', 'destructive'
];

const VARIANT_COLORS: Record<SemanticVariant, string> = {
  'run': '--tf-green',
  'stop': '--tf-red',
  'review': '--tf-amber',
  'inspect': '--tf-blue',
  'stream': '--tf-cyan',
  'model': '--tf-purple',
  'authority': '--tf-gold',
  'neutral': '--tf-slate',
  'destructive': '--tf-red'
};
```

### Command Classes

```typescript
const COMMAND_CLASSES: CommandClass[] = [
  'observe', 'edit', 'create', 'generate',
  'validate', 'simulate', 'preview', 'stage',
  'execute', 'run', 'commit', 'deploy',
  'override', 'abort', 'stop', 'kill',
  'purge', 'retry', 'cancel', 'export', 'import'
];

const CONSEQUENTIAL_COMMANDS: CommandClass[] = [
  'execute', 'run', 'commit', 'deploy',
  'override', 'abort', 'stop', 'kill', 'purge'
];
```

### Themes

```typescript
const THEMES: ThemeName[] = [
  'command-dark',
  'field-green',
  'deep-blue',
  'forge-graphite',
  'redline'
];

const DEFAULT_THEME: ThemeName = 'command-dark';
```

### Layout Templates

```typescript
const LAYOUT_TEMPLATES = [
  'command-cockpit',
  'studio-builder',
  'runtime-trace',
  'policy-surface',
  'scientific-qc',
  'ide-workspace',
  'ai-studio',
  'data-explorer',
  'field-command',
  'emergency-response',
  'graph-composer',
  'table-dashboard',
  'split-inspector',
  'terminal-shell',
  'map-overlay',
  'three-pane-editor',
  'presentation-mode',
  'mobile-scaffold',
  'minimized-hud',
  'fullscreen-canvas'
] as const;
```

### Z-Index Scale

```typescript
const Z_INDEX = {
  BASE: 0,
  PANEL: 10,
  STICKY: 20,
  DROPDOWN: 40,
  COMMAND_PALETTE: 60,
  MODAL_BACKDROP: 80,
  MODAL: 90,
  CRITICAL_ALERT: 100,
  BREAKER: 110
} as const;
```

### Duration Scale

```typescript
const DURATION = {
  INSTANT: 60,
  FAST: 100,
  NORMAL: 160,
  PANEL: 220,
  SLOW: 360
} as const;
```

---

## Export Summary

| Category | Count |
|----------|-------|
| TypeScript types | 40+ |
| React hooks | 8 |
| Utility functions | 25+ |
| Constants/Enums | 10+ |
