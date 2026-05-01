# 04 — Component Catalog

> Complete reference for all 12 component families in the Torafirma Design System. Over 1,070 components across 12 operational families.

---

## Table of Contents

1. [Command & Action](#1-command--action) — 50+ components
2. [State, Status & Telemetry](#2-state-status--telemetry) — 90+ components
3. [Layout & Shell](#3-layout--shell) — 115+ components
4. [Data & Table](#4-data--table) — 125+ components
5. [Graph & Workflow](#5-graph--workflow) — 150+ components
6. [Editor, Form & Configuration](#6-editor-form--configuration) — 120+ components
7. [Governance & Authority](#7-governance--authority) — 70+ components
8. [AI-Assisted Studio](#8-ai-assisted-studio) — 90+ components
9. [Runtime, Trace & Console](#9-runtime-trace--console) — 100+ components
10. [Visualization & Instrumentation](#10-visualization--instrumentation) — 110+ components
11. [Modal, Drawer & Overlay](#11-modal-drawer--overlay) — 90+ components
12. [Mobile, Field & Emergency](#12-mobile-field--emergency) — 80+ components

---

## Universal Component Props

All Torafirma components inherit from:

```typescript
interface TorafirmaComponentBaseProps {
  id?: string;
  label?: string;
  description?: string;
  state?: 'idle' | 'ready' | 'dirty' | 'validating' | 'valid'
        | 'warning' | 'blocked' | 'staged' | 'running' | 'complete'
        | 'degraded' | 'faulted' | 'locked' | 'simulated'
        | 'committed' | 'deployed' | 'disconnected';
  authority?: 'AUTH_0_OBSERVE' | 'AUTH_1_DRAFT' | 'AUTH_2_STAGE'
             | 'AUTH_3_EXECUTE' | 'AUTH_4_COMMIT' | 'AUTH_5_OVERRIDE'
             | 'AUTH_6_ROOT';
  requiredAuthority?: string;
  density?: 'compact' | 'standard' | 'field';
  criticality?: 'passive' | 'informational' | 'operational'
               | 'warning' | 'critical' | 'audit';
  disabled?: boolean;
  disabledReason?: string;
  traceId?: string;
  testId?: string;
}
```

### Semantic Variants (9 variants)

Every substantive component accepts a semantic variant that maps to visual treatment:

| Variant | Color | Intent |
|---------|-------|--------|
| `run` | Green | Execute, proceed, run |
| `stop` | Red | Stop, abort, fault |
| `review` | Amber | Stage, review, caution |
| `inspect` | Blue | Inspect, query, view |
| `stream` | Cyan | Stream, monitor, live |
| `model` | Purple | Model, AI, infer |
| `authority` | Gold | Authorize, seal, sign |
| `neutral` | Slate | Secondary, mechanical |
| `destructive` | Red (high-intensity) | Destroy, purge |

---

## 1. Command & Action

> **50+ components** — Components that initiate actions, trigger commands, and dispatch operations.

### Design Intent

All action components must display:
1. **What action will be performed** (verb-object command label)
2. **The current state** (active, pending, blocked, faulted)
3. **Authority requirements** (if the action is consequential)
4. **Blocking conditions** (why an action is unavailable)

### Component Listing

#### CommandButton

**Purpose:** Primary action initiator. Every button is a command with a state model.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `command` | `CommandDescriptor` | Yes | — | The command this button represents |
| `variant` | `SemanticVariant` | No | `'neutral'` | Visual variant |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | No | `'md'` | Button size |
| `density` | `ComponentDensity` | No | `'standard'` | Density level |
| `disabled` | `boolean` | No | `false` | Is the button disabled |
| `disabledReason` | `string` | No | — | Why the button is disabled |
| `state` | `TorafirmaComponentState` | No | `'ready'` | Current state |
| `loading` | `boolean` | No | `false` | Show loading spinner |
| `traceId` | `string` | No | — | Trace event ID |
| `onCommand` | `(cmd: CommandDescriptor) => void` | Yes | — | Command handler |

**Usage Example:**

```tsx
<CommandButton
  command={{
    id: 'run-workflow',
    label: 'Run workflow',
    operation: 'workflow.execute',
    commandClass: 'execute',
    target: 'workflow.qc.repeat_detection',
    state: 'available',
    requiredAuthority: 'AUTH_3_EXECUTE',
    requiresTrace: true,
    blockedReason: null
  }}
  variant="run"
  onCommand={(cmd) => dispatch(cmd)}
/>
```

#### CommandButtonGroup

**Purpose:** Grouped command buttons with shared alignment and spacing.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `commands` | `CommandDescriptor[]` | Yes | — | Array of commands |
| `variant` | `SemanticVariant` | No | `'neutral'` | Default variant |
| `orientation` | `'horizontal' \| 'vertical'` | No | `'horizontal'` | Layout direction |
| `size` | `'sm' \| 'md' \| 'lg'` | No | `'md'` | Button size |
| `onCommand` | `(cmd: CommandDescriptor) => void` | Yes | — | Command handler |

**Usage Example:**

```tsx
<CommandButtonGroup
  commands={[
    { id: 'stage', label: 'Stage changes', commandClass: 'stage' },
    { id: 'validate', label: 'Validate graph', commandClass: 'validate' },
    { id: 'deploy', label: 'Deploy workflow', commandClass: 'deploy' }
  ]}
  onCommand={(cmd) => handleCommand(cmd)}
/>
```

#### ActionBar

**Purpose:** Horizontal command surface at the top of a workspace.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `title` | `string` | No | — | Action bar title |
| `commands` | `CommandDescriptor[]` | No | `[]` | Commands to display |
| `state` | `TorafirmaComponentState` | No | `'ready'` | Current state |
| `authority` | `AuthorityLevel` | No | — | Current authority |
| `onCommand` | `(cmd: CommandDescriptor) => void` | Yes | — | Command handler |

#### CommandPalette

**Purpose:** Keyboard-driven command search and execution.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `open` | `boolean` | Yes | — | Is the palette open |
| `commands` | `CommandDescriptor[]` | Yes | — | Available commands |
| `placeholder` | `string` | No | `'Type a command...'` | Search placeholder |
| `shortcut` | `string` | No | `'Cmd+K'` | Keyboard shortcut |
| `onCommand` | `(cmd: CommandDescriptor) => void` | Yes | — | Command handler |
| `onClose` | `() => void` | Yes | — | Close handler |

**Usage Example:**

```tsx
<CommandPalette
  open={paletteOpen}
  commands={allCommands}
  onCommand={(cmd) => execute(cmd)}
  onClose={() => setPaletteOpen(false)}
/>
```

#### ContextMenu

**Purpose:** Right-click context menu with command items.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `items` | `MenuItem[]` | Yes | — | Menu items |
| `onAction` | `(id: string) => void` | Yes | — | Action handler |
| `children` | `ReactNode` | Yes | — | Trigger element |

#### SplitButton

**Purpose:** Primary action with a dropdown of secondary options.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `primaryCommand` | `CommandDescriptor` | Yes | — | Primary action |
| `commands` | `CommandDescriptor[]` | Yes | — | Dropdown options |
| `variant` | `SemanticVariant` | No | `'neutral'` | Visual variant |
| `onCommand` | `(cmd: CommandDescriptor) => void` | Yes | — | Command handler |

#### CircuitBreakerButton

**Purpose:** Emergency stop control for running operations.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `active` | `boolean` | No | `false` | Is the breaker active |
| `variant` | `'abort' \| 'kill' \| 'purge'` | No | `'abort'` | Breaker type |
| `target` | `string` | Yes | — | Target object |
| `requireConfirmation` | `boolean` | No | `true` | Require confirmation |
| `onTrip` | `() => void` | Yes | — | Trip handler |

**Usage Example:**

```tsx
<CircuitBreakerButton
  active={executionState === 'running'}
  variant="abort"
  target="workflow.qc.repeat_detection"
  onTrip={() => send({ type: 'ABORT' })}
/>
```

#### More Components in This Family

| Component | Description |
|-----------|-------------|
| `ConfirmButton` | Button that requires confirmation before executing |
| `IconCommandButton` | Icon-only command button with tooltip |
| `ToggleCommandButton` | Toggleable command button (on/off) |
| `Toolbar` | Horizontal toolbar of command buttons |
| `ToolbarGroup` | Grouped toolbar section with separator |
| `CommandBar` | Full-width top command bar |
| `CommandInput` | Input with command-palette-like behavior |
| `QuickActionMenu` | Speed dial for quick actions |
| `BulkActionBar` | Toolbar for bulk operations on selected items |
| `ActionDropdown` | Dropdown menu of action items |
| `ActionChip` | Chip-style action trigger |
| `RunButton` | Convenience wrapper for run commands |
| `StopButton` | Convenience wrapper for stop commands |
| `StageButton` | Convenience wrapper for stage commands |
| `DeployButton` | Convenience wrapper for deploy commands |
| `ValidateButton` | Convenience wrapper for validate commands |

---

## 2. State, Status & Telemetry

> **90+ components** — Components that display system state, process status, and real-time telemetry.

### Design Intent

State must be visible before the user takes action. Every action component should have a state indicator nearby.

### Component Listing

#### StateBadge

**Purpose:** Small status indicator showing the current state of an object or system.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `state` | `TorafirmaComponentState` | Yes | — | State to display |
| `size` | `'sm' \| 'md' \| 'lg'` | No | `'md'` | Badge size |
| `pulse` | `boolean` | No | `false` | Enable pulsing animation |
| `showLabel` | `boolean` | No | `true` | Show state label |
| `showIcon` | `boolean` | No | `true` | Show state icon |
| `compact` | `boolean` | No | `false` | Compact dot-only mode |

**Usage Example:**

```tsx
<StateBadge state="RUNNING" pulse />
<StateBadge state="STAGED" />
<StateBadge state="FAULTED" size="lg" />
<StateBadge state="READY" compact />
```

#### StatusBanner

**Purpose:** Top-of-page banner showing global system status.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `status` | `'ok' \| 'degraded' \| 'faulted' \| 'disconnected'` | Yes | — | System status |
| `message` | `string` | No | — | Status message |
| `actions` | `CommandDescriptor[]` | No | — | Available actions |
| `dismissible` | `boolean` | No | `false` | Allow dismissal |

#### ProgressTracker

**Purpose:** Multi-step progress indicator with state per step.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `steps` | `ProgressStep[]` | Yes | — | Steps in the process |
| `currentStep` | `number` | Yes | — | Current step index |
| `orientation` | `'horizontal' \| 'vertical'` | No | `'horizontal'` | Layout direction |
| `onStepClick` | `(index: number) => void` | No | — | Step click handler |

#### HealthIndicator

**Purpose:** System/component health display.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `health` | `'healthy' \| 'degraded' \| 'critical' \| 'unknown'` | Yes | — | Health status |
| `label` | `string` | No | — | Component label |
| `showMetric` | `boolean` | No | `false` | Show numeric metric |
| `metric` | `number` | No | — | Health metric (0-100) |
| `size` | `'sm' \| 'md' \| 'lg'` | No | `'md'` | Indicator size |

#### TerminalSignalLight

**Purpose:** Mimics physical signal light. Two-color format.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `mode` | `'gr' \| 'rg' \| 'ga' \| 'ag' \| 'ra' \| 'ar'` | Yes | — | Mode: Green-Red, etc. |
| `active` | `'top' \| 'bottom'` | Yes | — | Which color is active |
| `pulse` | `boolean` | No | `false` | Pulse active color |
| `label` | `string` | No | — | Signal label |

**Usage Example:**

```tsx
<TerminalSignalLight mode="gr" active="top" pulse />
<TerminalSignalLight mode="ga" active="bottom" label="Stage gate" />
```

#### More Components in This Family

| Component | Description |
|-----------|-------------|
| `TelemetryStrip` | Row of live telemetry values |
| `TelemetryValue` | Single telemetry value with unit and trend |
| `TelemetryRow` | Row of telemetry values for a subsystem |
| `StatusFooter` | Bottom status bar with runtime, state, auth, trace |
| `StatusLine` | Inline status text with optional icon |
| `LivenessIndicator` | Pulsing indicator showing system is alive |
| `HeartbeatIndicator` | Heartbeat-style status pulse |
| `ProgressBar` | Linear progress indicator |
| `ProgressCircle` | Circular progress indicator |
| `ProgressRing` | Animated ring progress for cyclic processes |
| `SpinningIndicator` | Indeterminate spinning indicator |
| `LoadingSkeleton` | Skeleton placeholder for loading content |
| `LoadingState` | Full loading state with message |
| `EmptyState` | Displayed when no data exists |
| `ErrorState` | Displayed on error with retry action |
| `OfflineState` | Displayed when disconnected |
| `StateTransitionLog` | Visual log of state transitions |
| `ExecutionStatus` | Composite execution status with progress |
| `ValidationSummary` | Summary of validation results |
| `RegimeIndicator` | Shows current operational regime |
| `ConditionTrendBadge` | Badge showing value trend |

---

## 3. Layout & Shell

> **115+ components** — Components that structure the application surface.

### Design Intent

Layouts should resemble operational instruments, not marketing pages.

### Component Listing

#### AppShell

**Purpose:** Root application shell containing all zones.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `children` | `ReactNode` | Yes | — | Content |
| `theme` | `string` | No | `'command-dark'` | Theme name |
| `density` | `ComponentDensity` | No | `'standard'` | Global density |
| `authority` | `AuthorityLevel` | No | `'AUTH_0_OBSERVE'` | Global authority |
| `traceEnabled` | `boolean` | No | `true` | Enable trace console |

#### TopCommandBar

**Purpose:** Top bar showing product name, workspace, state, authority.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `productName` | `string` | Yes | — | Product name |
| `workspace` | `string` | Yes | — | Current workspace |
| `state` | `TorafirmaComponentState` | Yes | — | Current state |
| `authority` | `AuthorityLevel` | Yes | — | Current authority |
| `commands` | `CommandDescriptor[]` | No | — | Quick commands |
| `traceId` | `string` | No | — | Active trace ID |

**Usage Example:**

```tsx
<TopCommandBar
  productName="Torafirma Studio"
  workspace="workflow.qc.main"
  state="READY"
  authority="AUTH_3_EXECUTE"
  traceId="18F2-A91C"
/>
```

#### LeftNavRail

**Purpose:** Icon-based left navigation rail.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `modules` | `NavModule[]` | Yes | — | Navigation modules |
| `activeModule` | `string` | Yes | — | Active module |
| `authority` | `AuthorityLevel` | No | — | Current authority |
| `onModuleChange` | `(module: string) => void` | Yes | — | Module change handler |

#### PrimaryWorkspace

**Purpose:** Main content workspace area.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `children` | `ReactNode` | Yes | — | Content |
| `title` | `string` | No | — | Workspace title |
| `actions` | `CommandDescriptor[]` | No | — | Workspace actions |
| `state` | `TorafirmaComponentState` | No | `'idle'` | Workspace state |

#### RightInspector

**Purpose:** Right-side property inspector panel.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `children` | `ReactNode` | Yes | — | Inspector content |
| `title` | `string` | No | — | Inspector title |
| `width` | `number` | No | `320` | Default width (px) |
| `resizable` | `boolean` | No | `true` | Allow resizing |
| `collapsible` | `boolean` | No | `true` | Allow collapse |

#### BottomTraceConsole

**Purpose:** Bottom panel showing trace events.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `events` | `TraceEvent[]` | No | `[]` | Trace events |
| `height` | `number` | No | `200` | Default height (px) |
| `resizable` | `boolean` | No | `true` | Allow resize |
| `filter` | `string` | No | — | Event filter |

#### Panel

**Purpose:** Primary content container with border and background.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `children` | `ReactNode` | Yes | — | Content |
| `title` | `string` | No | — | Panel title |
| `variant` | `'raised' \| 'inset' \| 'flat'` | No | `'raised'` | Panel variant |
| `density` | `ComponentDensity` | No | `'standard'` | Density level |
| `collapsible` | `boolean` | No | `false` | Allow collapse |
| `badge` | `string` | No | — | Panel badge text |

#### More Components in This Family

| Component | Description |
|-----------|-------------|
| `SplitPane` | Resizable split pane container |
| `TabPanel` | Tabbed panel container |
| `AccordionPanel` | Collapsible accordion sections |
| `DockPanel` | Dockable panel container |
| `FloatingPanel` | Floating panel with drag handle |
| `Sidebar` | Wide sidebar with navigation |
| `MiniSidebar` | Collapsed icon-only sidebar |
| `BreadcrumbBar` | Breadcrumb navigation |
| `PageHeader` | Page header with title and actions |
| `SectionHeader` | Section divider with title |
| `ContentArea` | Scrollable content container |
| `ScrollPanel` | Panel with custom scrollbar |
| `ResizablePanel` | Panel with resize handles |
| `GridLayout` | CSS Grid layout wrapper |
| `FlexLayout` | Flex layout wrapper |
| `StatusBand` | Top/bottom status band |
| `CommandBand` | Horizontal command strip |
| `ZoneLayout` | Multi-zone layout container |
| `ThreePaneLayout` | Left-center-right layout |
| `SplitView` | Split view with sash |

---

## 4. Data & Table

> **125+ components** — Components for displaying, filtering, sorting, and manipulating structured data.

### Design Intent

Tables are the primary data interface. They must be dense, performant, and state-aware.

### Component Listing

#### DataTable

**Purpose:** Primary data table with sorting, filtering, and selection.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `data` | `T[]` | Yes | — | Row data |
| `columns` | `ColumnDef<T>[]` | Yes | — | Column definitions |
| `sortable` | `boolean` | No | `true` | Enable sorting |
| `filterable` | `boolean` | No | `true` | Enable filtering |
| `selectable` | `'none' \| 'single' \| 'multi'` | No | `'none'` | Selection mode |
| `pageSize` | `number` | No | `50` | Rows per page |
| `density` | `ComponentDensity` | No | `'compact'` | Table density |
| `state` | `TorafirmaComponentState` | No | `'ready'` | Table state |
| `onRowClick` | `(row: T) => void` | No | — | Row click handler |
| `onSelectionChange` | `(rows: T[]) => void` | No | — | Selection change handler |

**Usage Example:**

```tsx
<DataTable
  data={workflows}
  columns={[
    { key: 'name', header: 'Workflow', sortable: true },
    { key: 'state', header: 'State', sortable: true, cell: (r) => <StateBadge state={r.state} /> },
    { key: 'lastRun', header: 'Last Run', sortable: true },
    { key: 'runtime', header: 'Runtime', sortable: true }
  ]}
  density="compact"
  selectable="multi"
  onSelectionChange={(sel) => setSelected(sel)}
/>
```

#### FilterBar

**Purpose:** Row of filter controls for data views.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `filters` | `FilterDef[]` | Yes | — | Filter definitions |
| `values` | `Record<string, unknown>` | Yes | — | Current filter values |
| `onChange` | `(values: Record<string, unknown>) => void` | Yes | — | Filter change handler |

#### SortIndicator

**Purpose:** Column sort indicator with direction.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `direction` | `'asc' \| 'desc' \| null` | Yes | — | Sort direction |
| `active` | `boolean` | No | `false` | Is this column sorted |

#### More Components in This Family

| Component | Description |
|-----------|-------------|
| `Pagination` | Table pagination controls |
| `TableCell` | Individual table cell with state |
| `TableHeader` | Table header row |
| `TableRow` | Table row with selection and state |
| `ColumnSelector` | Column visibility toggle |
| `DataGrid` | Grid-based data display |
| `TreeTable` | Hierarchical table with expand/collapse |
| `VirtualTable` | Virtualized table for large datasets |
| `InlineEditCell` | Table cell with inline editing |
| `CellValidation` | Cell with validation indicator |
| `ColumnFilter` | Per-column filter control |
| `QuickFilter` | Quick filter chips |
| `ExportButton` | Data export action |
| `ImportButton` | Data import action |
| `BatchActionBar` | Bulk action toolbar for selected rows |
| `DataViewToggle` | Toggle between table/grid/card views |
| `SortDropdown` | Sort order selector dropdown |
| `ColumnResizeHandle` | Column resize drag handle |
| `RowExpansion` | Expandable row detail panel |
| `EmptyTableState` | Empty state for tables |
| `TableSkeleton` | Loading skeleton for tables |
| `DataValidationPanel` | Validation results panel |
| `ColumnReorderHandle` | Drag handle for column reordering |

---

## 5. Graph & Workflow

> **150+ components** — Components for graph-native computation, visual node editors, and workflow canvases.

### Design Intent

Torafirma is graph-native at its core. Graph components must feel like engineering tools.

### Component Listing

#### GraphCanvas

**Purpose:** Main graph editor canvas with zoom, pan, and node placement.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `nodes` | `GraphNode[]` | Yes | — | Graph nodes |
| `edges` | `GraphEdge[]` | Yes | — | Graph edges |
| `selectedNodeId` | `string` | No | — | Selected node ID |
| `onNodeSelect` | `(id: string) => void` | No | — | Node select handler |
| `onNodeMove` | `(id: string, pos: Position) => void` | No | — | Node move handler |
| `onEdgeCreate` | `(from: PortRef, to: PortRef) => void` | No | — | Edge creation handler |
| `readOnly` | `boolean` | No | `false` | Read-only mode |
| `gridSize` | `number` | No | `20` | Grid snap size |
| `minimap` | `boolean` | No | `true` | Show minimap |

**Usage Example:**

```tsx
<GraphCanvas
  nodes={nodes}
  edges={edges}
  selectedNodeId={selectedNode?.id}
  onNodeSelect={(id) => setSelectedNode(id)}
  onNodeMove={(id, pos) => updateNodePosition(id, pos)}
  onEdgeCreate={(from, to) => createEdge(from, to)}
  gridSize={20}
  minimap
/>
```

#### GraphNode

**Purpose:** Visual node element on the graph canvas.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `id` | `string` | Yes | — | Node ID |
| `label` | `string` | Yes | — | Node label |
| `type` | `NodeType` | Yes | — | Node type |
| `state` | `TorafirmaComponentState` | No | `'idle'` | Node state |
| `position` | `Position` | Yes | — | Node position |
| `ports` | `PortDef[]` | No | `[]` | Input/output ports |
| `selected` | `boolean` | No | `false` | Is selected |
| `draggable` | `boolean` | No | `true` | Allow dragging |
| `onClick` | `() => void` | No | — | Click handler |

#### NodePort

**Purpose:** Connection port on a graph node.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `id` | `string` | Yes | — | Port ID |
| `type` | `'input' \| 'output' \| 'param'` | Yes | — | Port type |
| `dataType` | `string` | No | `'any'` | Data type |
| `connected` | `boolean` | No | `false` | Is connected |
| `required` | `boolean` | No | `false` | Is required |
| `onConnect` | `(target: PortRef) => void` | No | — | Connection handler |

#### GraphEdge

**Purpose:** Connection line between two node ports.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `id` | `string` | Yes | — | Edge ID |
| `from` | `PortRef` | Yes | — | Source port |
| `to` | `PortRef` | Yes | — | Target port |
| `type` | `'data' \| 'control' \| 'error'` | No | `'data'` | Edge type |
| `animated` | `boolean` | No | `false` | Animate the edge |
| `selected` | `boolean` | No | `false` | Is selected |

#### More Components in This Family

| Component | Description |
|-----------|-------------|
| `WorkflowCanvas` | Canvas for workflow diagram editing |
| `NodePalette` | Draggable palette of available node types |
| `NodeInspector` | Property inspector for selected node |
| `EdgeInspector` | Property inspector for selected edge |
| `PortTooltip` | Tooltip shown when hovering over a port |
| `ConnectionLine` | Visual line while dragging a connection |
| `MiniMap` | Miniature overview of the graph |
| `GraphToolbar` | Toolbar for graph editing operations |
| `GraphSearch` | Search nodes within the graph |
| `GraphLayoutEngine` | Auto-layout algorithm for graphs |
| `SubgraphNode` | Node that represents a nested subgraph |
| `SubgraphExpandButton` | Button to expand/collapse subgraphs |
| `GraphContextMenu` | Right-click menu for graph elements |
| `GraphValidator` | Validates graph structure |
| `NodeExecutionBadge` | Badge showing node execution status |
| `EdgePath` | Customizable edge path rendering |
| `GraphGrid` | Background grid overlay |
| `GraphBackground` | Configurable canvas background |
| `NodeSelectionBox` | Selection box for multi-select |
| `GraphZoomControls` | Zoom in/out/fit controls |
| `GraphHistoryControls` | Undo/redo controls for graph edits |
| `NodeTypeIcon` | Icon for each node type |
| `NodeStatusIndicator` | Status indicator embedded in node |
| `GraphDiffViewer` | Visual diff between graph versions |
| `WorkflowStepCard` | Card representing a workflow step |
| `WorkflowPath` | Visual path through workflow steps |
| `ParallelBranch` | Parallel branch indicator in workflow |

---

## 6. Editor, Form & Configuration

> **120+ components** — Components for editing object properties, schema configuration, and form input.

### Design Intent

Property editors must distinguish draft from committed state. Changes must be validated before staging.

### Component Listing

#### PropertyInspector

**Purpose:** Side panel for editing properties of a selected object.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `object` | `unknown` | Yes | — | Object to inspect |
| `schema` | `PropertySchema[]` | Yes | — | Property schema |
| `state` | `TorafirmaComponentState` | No | `'idle'` | Inspector state |
| `readOnly` | `boolean` | No | `false` | Read-only mode |
| `onPropertyChange` | `(key: string, value: unknown) => void` | Yes | — | Property change handler |
| `onValidate` | `() => void` | No | — | Validate handler |
| `onStage` | `() => void` | No | — | Stage handler |

**Usage Example:**

```tsx
<PropertyInspector
  object={selectedNode}
  schema={nodeSchema}
  state={inspectorState}
  onPropertyChange={(key, value) => updateProperty(key, value)}
  onValidate={() => validateChanges()}
  onStage={() => stageChanges()}
/>
```

#### DraftStagingBand

**Purpose:** Shows draft changes and staging controls.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `draftCount` | `number` | Yes | — | Number of draft changes |
| `state` | `TorafirmaComponentState` | No | `'dirty'` | Band state |
| `onStage` | `() => void` | Yes | — | Stage handler |
| `onDiscard` | `() => void` | Yes | — | Discard handler |
| `onInspect` | `() => void` | No | — | Inspect handler |

#### CodePane

**Purpose:** Syntax-highlighted code editor panel.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `value` | `string` | Yes | — | Code content |
| `language` | `string` | Yes | — | Language identifier |
| `readOnly` | `boolean` | No | `false` | Read-only mode |
| `onChange` | `(value: string) => void` | No | — | Change handler |

#### More Components in This Family

| Component | Description |
|-----------|-------------|
| `FormField` | Form field wrapper with label, hint, and validation |
| `TextInput` | Text input with validation |
| `NumberInput` | Numeric input with bounds |
| `SelectField` | Dropdown select field |
| `MultiSelect` | Multi-select dropdown |
| `ToggleSwitch` | Toggle switch control |
| `CheckboxGroup` | Group of checkboxes |
| `RadioGroup` | Group of radio buttons |
| `Slider` | Numeric range slider |
| `DatePicker` | Date/time picker |
| `SchemaEditor` | Schema definition editor |
| `ConfigEditor` | Configuration editor |
| `PropertyRow` | Single property row |
| `PropertyGroup` | Grouped property section |
| `ValidationBadge` | Validation status badge |
| `ErrorMessage` | Form error message |
| `HintText` | Field hint text |
| `RequiredIndicator` | Required field indicator |
| `FormSection` | Form section divider |
| `FormActions` | Form action buttons |
| `AutoSaveIndicator` | Auto-save status indicator |
| `DiffEditor` | Side-by-side diff editor |
| `JSONEditor` | JSON editor with validation |
| `YamlEditor` | YAML editor |
| `QueryBuilder` | Visual query builder |
| `FilterBuilder` | Visual filter builder |
| `ExpressionEditor` | Expression editor with validation |

---

## 7. Governance & Authority

> **70+ components** — Components for policy enforcement, authority gating, and audit.

### Design Intent

Consequential actions must be gated. Authority must be visible. All governance actions must be traceable.

### Component Listing

#### AuthorityGate

**Purpose:** Wrapper that conditionally renders content based on authority level.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `requiredAuthority` | `AuthorityLevel` | Yes | — | Required authority |
| `currentAuthority` | `AuthorityLevel` | Yes | — | Current authority |
| `children` | `ReactNode` | Yes | — | Protected content |
| `fallback` | `ReactNode` | No | — | Content shown when insufficient authority |
| `onEscalate` | `() => void` | No | — | Escalation handler |

**Usage Example:**

```tsx
<AuthorityGate
  requiredAuthority="AUTH_4_COMMIT"
  currentAuthority={currentAuth}
  fallback={<AuthorityRequiredMessage required="AUTH_4_COMMIT" />}
  onEscalate={() => requestEscalation('AUTH_4_COMMIT')}
>
  <DeployButton />
</AuthorityGate>
```

#### OverridePanel

**Purpose:** Panel for requesting authority override.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `requestedAuthority` | `AuthorityLevel` | Yes | — | Authority being requested |
| `currentAuthority` | `AuthorityLevel` | Yes | — | Current authority |
| `reason` | `string` | Yes | — | Override reason |
| `onConfirm` | `(reason: string) => void` | Yes | — | Confirm override |
| `onCancel` | `() => void` | Yes | — | Cancel override |

#### More Components in This Family

| Component | Description |
|-----------|-------------|
| `AuthorityBadge` | Badge showing current authority level |
| `AuthorityRequiredMessage` | Message shown when authority is insufficient |
| `AuthorityEscalationDialog` | Dialog for authority escalation |
| `AuthorityTrail` | History of authority changes |
| `PolicyGate` | Wrapper that checks policy conditions |
| `PolicyEditor` | Visual policy rule editor |
| `PolicyViewer` | Read-only policy display |
| `AuditLogViewer` | Audit log display |
| `AuditEntry` | Single audit log entry |
| `InterlockPanel` | Safety interlock status panel |
| `InterlockIndicator` | Single interlock indicator |
| `ApprovalChain` | Multi-party approval workflow |
| `ApprovalRequest` | Approval request card |
| `GovernanceBanner` | Top banner for governance alerts |
| `ComplianceBadge` | Compliance status badge |
| `RoleIndicator` | Current role display |

---

## 8. AI-Assisted Studio

> **90+ components** — Components for AI-assisted editing, intent input, and proposal management.

### Design Intent

AI is a co-worker, not a replacement. AI-assisted editing must go through the same lifecycle as manual edits.

### Component Listing

#### IntentInput

**Purpose:** Input field for natural language operational commands.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `placeholder` | `string` | No | `'Describe what you want to change...'` | Placeholder |
| `intent` | `string` | No | — | Current intent text |
| `state` | `TorafirmaComponentState` | No | `'idle'` | Input state |
| `suggestions` | `string[]` | No | — | Intent suggestions |
| `onSubmit` | `(intent: string) => void` | Yes | — | Intent submit handler |
| `onIntentChange` | `(intent: string) => void` | No | — | Intent change handler |

**Usage Example:**

```tsx
<IntentInput
  placeholder="Describe what you want to change..."
  state={aiState}
  onSubmit={(intent) => submitIntent(intent)}
/>
```

#### AISuggestionCard

**Purpose:** Card displaying an AI-generated proposal.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `proposal` | `AIProposal` | Yes | — | The proposal |
| `state` | `TorafirmaComponentState` | No | `'idle'` | Card state |
| `onApply` | `() => void` | Yes | — | Apply handler |
| `onInspect` | `() => void` | Yes | — | Inspect handler |
| `onReject` | `() => void` | Yes | — | Reject handler |

#### AIDiffViewer

**Purpose:** Side-by-side diff of AI-proposed changes.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `before` | `unknown` | Yes | — | Before state |
| `after` | `unknown` | Yes | — | After state |
| `changes` | `DiffChange[]` | Yes | — | Change list |
| `onAccept` | `() => void` | Yes | — | Accept changes |
| `onReject` | `() => void` | Yes | — | Reject changes |

#### More Components in This Family

| Component | Description |
|-----------|-------------|
| `AIThinkingIndicator` | Animated indicator while AI is processing |
| `AIConfidenceBadge` | Confidence level badge for AI suggestions |
| `AIProposalPanel` | Panel for managing AI proposals |
| `AIFeedbackForm` | Feedback form for AI suggestions |
| `IntentHistory` | History of submitted intents |
| `IntentSuggestions` | Intent suggestion chips |
| `ModelSelector` | AI model selection dropdown |
| `TemperatureSlider` | AI creativity/temperature control |
| `AIErrorMessage` | Error message for AI failures |
| `AIStatusIndicator` | AI service status indicator |
| `PromptTemplatePicker` | Pre-built prompt template selector |
| `AIChatPanel` | Chat-style AI interaction panel |
| `StreamingResponse` | Streaming AI response display |

---

## 9. Runtime, Trace & Console

> **100+ components** — Components for runtime supervision, trace inspection, and console interaction.

### Design Intent

Trace and runtime views are not secondary. They are primary operational tools.

### Component Listing

#### TraceConsole

**Purpose:** Real-time trace event console.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `events` | `TraceEvent[]` | No | `[]` | Trace events |
| `filter` | `TraceFilter` | No | — | Event filter |
| `maxEvents` | `number` | No | `1000` | Maximum events to display |
| `autoScroll` | `boolean` | No | `true` | Auto-scroll to latest |
| `onEventClick` | `(event: TraceEvent) => void` | No | — | Event click handler |
| `onExport` | `() => void` | No | — | Export handler |

**Usage Example:**

```tsx
<TraceConsole
  events={traceEvents}
  filter={{ authority: 'AUTH_3_EXECUTE', result: 'accepted' }}
  autoScroll
  onEventClick={(event) => inspectEvent(event)}
/>
```

#### EventStream

**Purpose:** Live event stream display.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `events` | `StreamEvent[]` | Yes | — | Stream events |
| `streamName` | `string` | Yes | — | Stream name |
| `live` | `boolean` | No | `true` | Is the stream live |
| `onEventSelect` | `(event: StreamEvent) => void` | No | — | Event select handler |

#### Terminal

**Purpose:** Terminal/console interface for CLI interaction.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `history` | `TerminalLine[]` | No | `[]` | Command history |
| `prompt` | `string` | No | `'$'` | Prompt character |
| `readOnly` | `boolean` | No | `false` | Read-only mode |
| `onCommand` | `(cmd: string) => void` | No | — | Command handler |

#### More Components in This Family

| Component | Description |
|-----------|-------------|
| `TraceEventRow` | Single trace event row |
| `TraceFilterBar` | Trace event filter controls |
| `TraceDetailPanel` | Detailed trace event view |
| `TraceTimeline` | Timeline visualization of traces |
| `RuntimeSelector` | Runtime environment selector |
| `RuntimeStatusPanel` | Runtime connection status |
| `RuntimeHealthMonitor` | Runtime health dashboard |
| `LogViewer` | Scrollable log file viewer |
| `LogLine` | Single log line with highlighting |
| `LogSearch` | Log search with regex support |
| `LogLevelFilter` | Filter logs by level |
| `ExecutionTimeline` | Visual execution timeline |
| `ExecutionStep` | Single execution step display |
| `ConsoleOutput` | Read-only console output |
| `ConsoleInput` | Console input with history |
| `ProcessList` | List of running processes |
| `ProcessRow` | Single process row with status |
| `ThreadView` | Thread dump viewer |
| `MemoryGauge` | Memory usage gauge |
| `CPUGauge` | CPU usage gauge |
| `NetworkGauge` | Network usage gauge |
| `ResourceMonitor` | Composite resource monitor |

---

## 10. Visualization & Instrumentation

> **110+ components** — Components for data visualization, charts, and telemetry dashboards.

### Design Intent

Charts serve operations. They must be precise, annotated, and color-semantic.

### Component Listing

#### LineChart

**Purpose:** Time-series line chart for telemetry data.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `data` | `TimeSeriesPoint[]` | Yes | — | Chart data |
| `series` | `SeriesConfig[]` | Yes | — | Series configuration |
| `xAxisLabel` | `string` | No | — | X-axis label |
| `yAxisLabel` | `string` | No | — | Y-axis label |
| `annotations` | `Annotation[]` | No | — | Chart annotations |
| `thresholds` | `ThresholdLine[]` | No | — | Threshold lines |
| `zoomable` | `boolean` | No | `true` | Enable zoom |
| `height` | `number` | No | `200` | Chart height (px) |

**Usage Example:**

```tsx
<LineChart
  data={telemetryData}
  series={[
    { key: 'throughput', label: 'Throughput', color: 'var(--tf-green)' },
    { key: 'latency', label: 'Latency', color: 'var(--tf-blue)' }
  ]}
  thresholds={[
    { value: 1000, label: 'SLA', color: 'var(--tf-red)' }
  ]}
  zoomable
/>
```

#### MetricCard

**Purpose:** Single metric display card with trend.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `label` | `string` | Yes | — | Metric label |
| `value` | `number \| string` | Yes | — | Metric value |
| `unit` | `string` | No | — | Unit suffix |
| `trend` | `'up' \| 'down' \| 'stable'` | No | — | Trend direction |
| `trendValue` | `number` | No | — | Trend percentage |
| `state` | `TorafirmaComponentState` | No | `'ready'` | Metric state |

#### GaugeChart

**Purpose:** Radial gauge for percentage metrics.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `value` | `number` | Yes | — | Current value |
| `min` | `number` | No | `0` | Minimum value |
| `max` | `number` | No | `100` | Maximum value |
| `label` | `string` | No | — | Gauge label |
| `thresholds` | `GaugeThreshold[]` | No | — | Color thresholds |

#### More Components in This Family

| Component | Description |
|-----------|-------------|
| `BarChart` | Categorical bar chart |
| `StackedBarChart` | Stacked bar chart |
| `AreaChart` | Filled area chart |
| `ScatterPlot` | X-Y scatter plot |
| `Histogram` | Histogram chart |
| `Heatmap` | Heatmap grid |
| `PieChart` | Pie/donut chart |
| `RadarChart` | Radar/spider chart |
| `BoxPlot` | Statistical box plot |
| `CandlestickChart` | Candlestick chart |
| `SankeyDiagram` | Flow diagram |
| `TreeMap` | Treemap visualization |
| `SunburstChart` | Sunburst/hierarchical chart |
| `Sparkline` | Inline sparkline chart |
| `DashboardGrid` | Dashboard grid layout |
| `DashboardWidget` | Dashboard widget container |
| `WidgetHeader` | Widget title bar |
| `WidgetActions` | Widget action buttons |
| `AlertWidget` | Alert summary widget |
| `StatusWidget` | Status overview widget |
| `TrendWidget` | Trend display widget |
| `MetricSparkline` | Sparkline embedded in metric card |
| `ThresholdAlert` | Alert when threshold is crossed |
| `ChartLegend` | Custom chart legend |
| `ChartTooltip` | Custom chart tooltip |
| `Crosshair` | Chart crosshair cursor |
| `BrushSelector` | Range brush selector |
| `DataZoom` | Data zoom controls |

---

## 11. Modal, Drawer & Overlay

> **90+ components** — Components that appear above the primary surface.

### Design Intent

Overlays must be justified. They should be used sparingly and always serve an operational purpose.

### Component Listing

#### ConfirmModal

**Purpose:** Modal requiring explicit confirmation for consequential actions.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `open` | `boolean` | Yes | — | Is the modal open |
| `title` | `string` | Yes | — | Modal title |
| `description` | `string` | Yes | — | Action description |
| `confirmLabel` | `string` | No | `'Confirm'` | Confirm button label |
| `cancelLabel` | `string` | No | `'Cancel'` | Cancel button label |
| `variant` | `'warning' \| 'danger' \| 'authority' \| 'neutral'` | No | `'neutral'` | Modal variant |
| `requireText` | `string` | No | — | Text user must type to confirm |
| `onConfirm` | `() => void` | Yes | — | Confirm handler |
| `onCancel` | `() => void` | Yes | — | Cancel handler |

**Usage Example:**

```tsx
<ConfirmModal
  open={showConfirm}
  title="Purge workflow?"
  description="This will permanently delete workflow.qc.repeat_detection and all associated execution history."
  confirmLabel="Purge"
  cancelLabel="Abort"
  variant="danger"
  requireText="PURGE"
  onConfirm={() => purgeWorkflow()}
  onCancel={() => setShowConfirm(false)}
/>
```

#### Drawer

**Purpose:** Side panel that slides in from the edge.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `open` | `boolean` | Yes | — | Is the drawer open |
| `side` | `'left' \| 'right'` | No | `'right'` | Drawer side |
| `width` | `number` | No | `400` | Drawer width (px) |
| `title` | `string` | No | — | Drawer title |
| `children` | `ReactNode` | Yes | — | Drawer content |
| `onClose` | `() => void` | Yes | — | Close handler |

#### More Components in This Family

| Component | Description |
|-----------|-------------|
| `Modal` | Generic modal dialog |
| `ModalHeader` | Modal title bar |
| `ModalBody` | Modal content area |
| `ModalFooter` | Modal action buttons area |
| `ModalBackdrop` | Modal backdrop overlay |
| `SlideOver` | Full-height slide-over panel |
| `BottomSheet` | Bottom sheet for mobile |
| `Toast` | Notification toast |
| `ToastContainer` | Container for toasts |
| `NotificationPanel` | Panel showing notifications |
| `AlertDialog` | Accessible alert dialog |
| `FormDialog` | Dialog with form content |
| `InfoDialog` | Information display dialog |
| `ErrorDialog` | Error display dialog |
| `ProgressDialog` | Dialog with progress indicator |
| `Overlay` | Generic overlay container |
| `Tooltip` | Hover tooltip |
| `Popover` | Click-triggered popover |
| `DropdownMenu` | Dropdown menu overlay |
| `ContextMenu` | Right-click context menu |
| `HoverCard` | Card shown on hover |
| `Sheet` | Bottom sheet (mobile) |
| `SidePanel` | Fixed side panel |
| `FloatingToolbar` | Floating toolbar overlay |
| `CommandPaletteOverlay` | Full-screen command palette |

---

## 12. Mobile, Field & Emergency

> **80+ components** — Components optimized for mobile, field operations, and emergency scenarios.

### Design Intent

Mobile interfaces must be touch-friendly and operable in field conditions. Emergency interfaces must be unambiguous.

### Component Listing

#### EmergencyBreaker

**Purpose:** Large, always-accessible emergency stop control.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `active` | `boolean` | No | `false` | Is the breaker active |
| `variant` | `'abort' \| 'kill' \| 'purge'` | No | `'abort'` | Breaker type |
| `target` | `string` | Yes | — | Target system |
| `size` | `'lg' \| 'xl'` | No | `'xl'` | Button size |
| `requireConfirmation` | `boolean` | No | `true` | Require confirmation |
| `onTrip` | `() => void` | Yes | — | Trip handler |

**Usage Example:**

```tsx
<EmergencyBreaker
  active={executionState === 'running'}
  variant="abort"
  target="workflow.qc.repeat_detection"
  onTrip={() => send({ type: 'ABORT' })}
/>
```

#### LargeCommandButton

**Purpose:** Oversized command button for touch operation.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `command` | `CommandDescriptor` | Yes | — | Command |
| `variant` | `SemanticVariant` | No | `'neutral'` | Visual variant |
| `size` | `'lg' \| 'xl'` | No | `'xl'` | Button size |
| `onCommand` | `(cmd: CommandDescriptor) => void` | Yes | — | Command handler |

#### MobilePanel

**Purpose:** Full-screen panel optimized for mobile.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `children` | `ReactNode` | Yes | — | Panel content |
| `title` | `string` | No | — | Panel title |
| `open` | `boolean` | Yes | — | Is the panel open |
| `onClose` | `() => void` | Yes | — | Close handler |

#### More Components in This Family

| Component | Description |
|-----------|-------------|
| `TouchToolbar` | Large touch-optimized toolbar |
| `SwipeAction` | Swipe-to-reveal action |
| `PullToRefresh` | Pull-to-refresh container |
| `OfflineIndicator` | Offline status indicator |
| `OfflineQueueBadge` | Badge showing queued offline actions |
| `SyncButton` | Manual sync trigger |
| `FieldForm` | Large-input form for field conditions |
| `CameraCapture` | Camera capture for field data |
| `LocationPicker` | Map-based location picker |
| `SignaturePad` | Digital signature capture |
| `BarcodeScanner` | Barcode/QR scanner |
| `VoiceNote` | Voice note recorder |
| `StatusCard` | Large status card for field view |
| `QuickStatus` | One-glance status for operators |
| `EmergencyContact` | Emergency contact display |
| `IncidentReportForm` | Incident report form |
| `FieldChecklist` | Field checklist component |
| `CompassIndicator` | Direction/orientation indicator |
| `WeatherWidget` | Weather conditions display |
| `BatteryIndicator` | Device battery level indicator |
| `SignalIndicator` | Network signal indicator |

---

## Component Count Summary

| Family | Components |
|--------|------------|
| Command & Action | 50+ |
| State, Status & Telemetry | 90+ |
| Layout & Shell | 115+ |
| Data & Table | 125+ |
| Graph & Workflow | 150+ |
| Editor, Form & Configuration | 120+ |
| Governance & Authority | 70+ |
| AI-Assisted Studio | 90+ |
| Runtime, Trace & Console | 100+ |
| Visualization & Instrumentation | 110+ |
| Modal, Drawer & Overlay | 90+ |
| Mobile, Field & Emergency | 80+ |
| **Total** | **1,190+** |
