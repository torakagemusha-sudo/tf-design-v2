# 06 — Layout Template Guide

> Torafirma provides 20 canonical layout templates for different product archetypes. Every product should use one of these layouts as a starting point.

---

## Table of Contents

1. [Layout Philosophy](#1-layout-philosophy)
2. [Canonical Product Shell](#2-canonical-product-shell)
3. [Layout Templates](#3-layout-templates)
4. [Responsive Behavior](#4-responsive-behavior)
5. [Layout Customization](#5-layout-customization)

---

## 1. Layout Philosophy

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

### Layout Principles

1. **State visibility** — System state must be visible at all times
2. **Command proximity** — Actions must be near the objects they affect
3. **Trace accessibility** — Trace console should be one click away
4. **Authority visibility** — Current authority level must always be visible
5. **Information density** — Dense layouts are acceptable when structure is strong
6. **Failure visibility** — Faults and warnings must not be hidden

---

## 2. Canonical Product Shell

All Torafirma products share a common shell structure:

```
+----------------------------------------------------------+
| Top Command Bar (product, workspace, state, authority)    |
+------------+----------------------------+----------------+
|            |                            |                |
| Left Nav   |  Primary Workspace         | Right Inspector|
| Rail       |                            |                |
|            |                            |                |
|            |                            |                |
+------------+----------------------------+----------------+
| Bottom Trace / Console                                    |
+----------------------------------------------------------+
| Status Footer (runtime, state, auth, trace)               |
+----------------------------------------------------------+
```

### Shell Zones

| Zone | Description | Component |
|------|-------------|-----------|
| **Top Command Bar** | Product identity, workspace, state | `TopCommandBar` |
| **Left Nav Rail** | Module navigation | `LeftNavRail` |
| **Primary Workspace** | Main content area | `PrimaryWorkspace` |
| **Right Inspector** | Properties, context, details | `RightInspector` |
| **Bottom Console** | Trace events, logs | `BottomTraceConsole` |
| **Status Footer** | System status bar | `StatusFooter` |

---

## 3. Layout Templates

### Template 1 — Command Cockpit

**Use Case:** Live state control, runtime supervision, command decks

```
+----------------------------------------------------------+
| Top Command Bar — product, workspace, state               |
+------------+----------------------------+----------------+
| Left Nav   | Center Canvas              | Right Telemetry|
| (modules)  | (runtime diagram /        | (metrics,     |
|            |  topology map)             |  health,      |
|            |                            |  status)      |
+------------+----------------------------+----------------+
| Bottom Trace Console                                     |
+----------------------------------------------------------+
| Status Footer                                             |
+----------------------------------------------------------+
```

**Theme:** Command Dark or Deep Blue
**Density:** Very dense
**Authority:** Visible at all times

**Composition Example:**

```tsx
<AppShell theme="command-dark" density="compact">
  <TopCommandBar productName="Runtime Cockpit" workspace="prod.cluster.1" state="HEALTHY" authority="AUTH_3_EXECUTE" />
  <SplitPane left={<LeftNavRail modules={modules} activeModule="Runtime" />}>
    <RuntimeTopologyCanvas />
    <TelemetryDashboard />
  </SplitPane>
  <BottomTraceConsole />
  <StatusFooter />
</AppShell>
```

---

### Template 2 — Studio Builder

**Use Case:** Build workflows, compose graphs, edit functions

```
+----------------------------------------------------------+
| Top Command Bar — product, workspace, state               |
+------------+----------------------------+----------------+
| Left Nav   | Center Canvas              | Right Inspector|
| (modules)  | (graph canvas /            | (properties,  |
|            |  workflow editor)          |  node config) |
| Left Node  |                            |               |
| Palette    |                            |               |
+------------+----------------------------+----------------+
| Bottom: Trace Console + Validation Results               |
+----------------------------------------------------------+
| Status Footer                                             |
+----------------------------------------------------------+
```

**Theme:** Command Dark or Forge Graphite
**Density:** Dense
**Features:** Graph canvas, node palette, property inspector

**Composition Example:**

```tsx
<AppShell theme="command-dark" density="standard">
  <TopCommandBar productName="Studio" workspace="workflow.qc.main" state="READY" authority="AUTH_2_STAGE" />
  <ThreePaneLayout
    left={<NodePalette nodeTypes={availableNodes} />}
    center={<GraphCanvas nodes={nodes} edges={edges} />}
    right={<PropertyInspector object={selectedNode} schema={nodeSchema} />}
  />
  <BottomTraceConsole />
  <StatusFooter />
</AppShell>
```

---

### Template 3 — Runtime Trace

**Use Case:** Inspect execution, debug, audit state transitions

```
+----------------------------------------------------------+
| Top Command Bar                                           |
+------------+----------------------------+----------------+
| Left Nav   | Center: Execution Timeline | Right: Step    |
|            | (visual timeline /         | Inspector      |
|            |  gantt chart)              | (per-step      |
|            |                            |  details)      |
+------------+----------------------------+----------------+
| Bottom: Trace Event Stream (full-width)                  |
+----------------------------------------------------------+
| Status Footer                                             |
+----------------------------------------------------------+
```

**Theme:** Command Dark
**Density:** Very dense
**Features:** Execution timeline, event stream, step inspector

---

### Template 4 — Policy Surface

**Use Case:** Define rules, inspect contracts, audit decisions

```
+----------------------------------------------------------+
| Top Command Bar                                           |
+------------+----------------------------+----------------+
| Left Nav   | Center: Policy Editor      | Right: Policy  |
| (modules)  | (rule builder /            | Inspector      |
|            |  contract viewer)          | (details,     |
|            |                            |  effects)      |
+------------+----------------------------+----------------+
| Bottom: Audit Log Viewer                                  |
+----------------------------------------------------------+
```

**Theme:** Command Dark or Deep Blue
**Density:** Standard
**Features:** Policy editor, rule builder, audit log

---

### Template 5 — Scientific/QC Workbench

**Use Case:** Inspect datasets, validate, flag anomalies

```
+----------------------------------------------------------+
| Top Command Bar                                           |
+------------+----------------------------+----------------+
| Left Nav   | Center: Data Table         | Right: Detail  |
| (datasets) | (sortable, filterable,     | Panel          |
|            |  selectable)               | (anomaly       |
|            |                            |  details)      |
+------------+----------------------------+----------------+
| Bottom: Validation Summary + Anomaly List                |
+----------------------------------------------------------+
```

**Theme:** Command Dark or Deep Blue
**Density:** Very dense (table), standard (detail)
**Features:** Data table, anomaly detection, validation summary

---

### Template 6 — IDE Workspace

**Use Case:** Code editing, building, compiling

```
+----------------------------------------------------------+
| Top Command Bar                                           |
+------------+----------------------------+----------------+
| Left: File | Center: Code Editor        | Right:         |
| Tree       | (tabbed, multi-file)       | Build Output / |
|            |                            | Diagnostics    |
+------------+----------------------------+----------------+
| Bottom: Terminal / Console                                |
+----------------------------------------------------------+
```

**Theme:** Forge Graphite
**Density:** Dense
**Features:** File tree, tabbed editor, terminal, diagnostics

**Composition Example:**

```tsx
<AppShell theme="forge-graphite" density="dense">
  <TopCommandBar productName="Forge IDE" workspace="project.main" state="READY" authority="AUTH_3_EXECUTE" />
  <ThreePaneLayout
    left={<FileTree files={projectFiles} />}
    center={<CodeEditor tabs={openTabs} activeTab={activeTab} />}
    right={<DiagnosticsPanel errors={errors} warnings={warnings} />}
  />
  <Terminal history={terminalHistory} />
  <StatusFooter />
</AppShell>
```

---

### Template 7 — AI Studio

**Use Case:** Prompt engineering, model evaluation

```
+----------------------------------------------------------+
| Top Command Bar                                           |
+------------+----------------------------+----------------+
| Left:      | Center: Workspace          | Right:         |
| Model      | (prompt editor /           | Model Config / |
| Selector   |  evaluation results)       | Parameters    |
+------------+----------------------------+----------------+
| Bottom: Intent Input + AI Response Panel                 |
+----------------------------------------------------------+
```

**Theme:** Command Dark (with purple accents)
**Density:** Standard
**Features:** Prompt editor, model selector, evaluation results, intent input

---

### Template 8 — Data Explorer

**Use Case:** Dataset exploration, filtering, analysis

```
+----------------------------------------------------------+
| Top Command Bar + Filter Bar                              |
+------------+----------------------------+----------------+
| Left:      | Center: Data Grid /        | Right:         |
| Schema     | Chart View (toggleable)    | Column Stats   |
| Browser    |                            | / Histograms   |
+------------+----------------------------+----------------+
| Bottom: Query Console                                     |
+----------------------------------------------------------+
```

**Theme:** Command Dark
**Density:** Dense
**Features:** Data grid, chart toggle, schema browser, query console

---

### Template 9 — Field Command

**Use Case:** Mobile/tactical operations

```
+--------------------------+
| Status Band (full-width) |
+--------------------------+
|                          |
|   Main Status Display    |
|   (large, readable)      |
|                          |
+--------------------------+
| Quick Action Grid (2x3)  |
+--------------------------+
| Telemetry Row            |
+--------------------------+
```

**Theme:** Field Green
**Density:** Low (large touch targets)
**Features:** Large status display, quick action grid, offline support

---

### Template 10 — Emergency Response

**Use Case:** Incident handling, escalation

```
+--------------------------+
| CRITICAL ALERT BANNER    |
+--------------------------+
|                          |
|   Emergency Breaker      |
|   (large, prominent)     |
|                          |
+--------------------------+
| Incident Details         |
| (fault, scope, impact)   |
+--------------------------+
| Escalation Actions       |
+--------------------------+
```

**Theme:** Redline
**Density:** Low
**Features:** Emergency breaker, critical alert, incident details, escalation

---

### Template 11 — Graph Composer

**Use Case:** Visual graph construction

```
+----------------------------------------------------------+
| Top Command Bar + Graph Toolbar                           |
+------------+----------------------------+----------------+
| Left: Node | Center: Graph Canvas       | Right: Node    |
| Palette    | (zoom, pan, select)        | Inspector      |
| + Search   |                            |                |
+------------+----------------------------+----------------+
| Bottom: Validation Panel + MiniMap                       |
+----------------------------------------------------------+
```

**Theme:** Command Dark or Forge Graphite
**Density:** Standard
**Features:** Node palette, graph canvas, search, minimap, validation

---

### Template 12 — Table Dashboard

**Use Case:** Dense data monitoring

```
+----------------------------------------------------------+
| Top Command Bar + Filter Bar + Bulk Actions               |
+----------------------------------------------------------+
| Full-width Data Table                                     |
| (compact, sortable, filterable, selectable)               |
+----------------------------------------------------------+
| Bottom: Pagination + Status Footer                        |
+----------------------------------------------------------+
```

**Theme:** Command Dark
**Density:** Very dense
**Features:** Full-width table, bulk actions, pagination

---

### Template 13 — Split Inspector

**Use Case:** Side-by-side comparison

```
+----------------------------------------------------------+
| Top Command Bar                                           |
+------------+----------------------+----------------------+
| Left Nav   | Left Panel           | Right Panel          |
|            | (before / ref)       | (after / compare)    |
+------------+----------------------+----------------------+
| Bottom: Diff Summary + Actions                            |
+----------------------------------------------------------+
```

**Theme:** Command Dark
**Density:** Standard
**Features:** Split comparison, diff highlighting, sync scrolling

---

### Template 14 — Terminal Shell

**Use Case:** CLI-focused operations

```
+----------------------------------------------------------+
| Top Command Bar                                           |
+----------------------------------------------------------+
| Full-screen Terminal                                      |
| (command history, output, prompt)                         |
+----------------------------------------------------------+
| Status Footer                                             |
+----------------------------------------------------------+
```

**Theme:** Command Dark (full dark)
**Density:** Terminal density
**Features:** Full-screen terminal, command history, syntax highlighting

---

### Template 15 — Map Overlay

**Use Case:** Geospatial operations

```
+----------------------------------------------------------+
| Top Command Bar                                           |
+------------+----------------------------+----------------+
| Left: Layer| Center: Map Canvas         | Right:         |
| Control    | (markers, polygons,        | Object Detail  |
|            |  heatmap)                  |                |
+------------+----------------------------+----------------+
| Bottom: Coordinate Display + Telemetry                    |
+----------------------------------------------------------+
```

**Theme:** Field Green or Command Dark
**Density:** Standard
**Features:** Map canvas, layer control, coordinate display

---

### Template 16 — Three-Pane Editor

**Use Case:** Content editing with preview

```
+----------------------------------------------------------+
| Top Command Bar                                           |
+------------+------------+----------------+----------------+
| Left: Nav  | Center:    | Right: Preview | Far Right:     |
| Outline    | Editor     | / Rendered     | Properties     |
+------------+------------+----------------+----------------+
| Bottom: Status + Actions                                  |
+----------------------------------------------------------+
```

**Theme:** Command Dark or Forge Graphite
**Density:** Standard
**Features:** Navigation outline, editor, live preview, properties

---

### Template 17 — Presentation Mode

**Use Case:** Read-only status display, wall monitors

```
+----------------------------------------------------------+
| Full-screen Status Display                                |
| (large metrics, state indicators,                         |
|  color-coded health tiles)                                |
+----------------------------------------------------------+
```

**Theme:** Any (typically Command Dark)
**Density:** Low (for visibility at distance)
**Features:** Large metric cards, signal lights, health tiles, auto-refresh

---

### Template 18 — Mobile Scaffold

**Use Case:** Touch-optimized layouts for mobile devices

```
+--------------------------+
| Top Bar (product + menu) |
+--------------------------+
|                          |
|     Content Area         |
|     (scrollable)         |
|                          |
+--------------------------+
| Bottom Nav (icons)       |
+--------------------------+
```

**Theme:** Any (optimized for touch)
**Density:** Low (large touch targets)
**Features:** Bottom navigation, swipe gestures, touch-optimized controls

---

### Template 19 — Minimized HUD

**Use Case:** Heads-up display for active operations

```
+--------------------------+
| Compact Status Bar       |
+--------------------------+
| Mini Metric Grid (2x2)   |
+--------------------------+
| Quick Actions (3 buttons)|
+--------------------------+
```

**Theme:** Any
**Density:** Very dense
**Features:** Compact status, mini metrics, quick actions

---

### Template 20 — Fullscreen Canvas

**Use Case:** Immersive graph/canvas work

```
+----------------------------------------------------------+
| Floating Toolbar (auto-hide)                              |
+----------------------------------------------------------+
|                                                          |
|                                                          |
|              Full-screen Canvas                          |
|              (graph, diagram, map)                       |
|                                                          |
|                                                          |
+----------------------------------------------------------+
| Floating Minimap (bottom-right)                           |
+----------------------------------------------------------+
```

**Theme:** Command Dark or Forge Graphite
**Density:** Full canvas
**Features:** Floating toolbar, auto-hide, minimap, zoom controls

---

## 4. Responsive Behavior

### Breakpoints

| Breakpoint | Width | Layout Behavior |
|------------|-------|-----------------|
| `xs` | < 640px | Mobile scaffold, bottom nav, stacked panels |
| `sm` | 640px | Compact sidebar, collapsed inspector |
| `md` | 768px | Full sidebar, collapsible inspector |
| `lg` | 1024px | Full three-pane layout |
| `xl` | 1280px | Full layout with all zones visible |
| `2xl` | 1536px | Maximum layout, spacious panels |

### Responsive Rules

- **Left Nav Rail:** Collapses to icon-only at `md`, hidden at `sm`
- **Right Inspector:** Collapses at `lg`, becomes a drawer at `md`
- **Bottom Console:** Collapses to a single line at `sm`, expandable
- **Top Command Bar:** Simplified at `sm`, workspace name truncated
- **Three-Pane Layout:** Becomes two-pane at `lg`, single pane at `md`

---

## 5. Layout Customization

### Customization Props

All layout templates accept the following customization props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `theme` | `string` | `'command-dark'` | Theme name |
| `density` | `ComponentDensity` | `'standard'` | Global density level |
| `authority` | `AuthorityLevel` | `'AUTH_0_OBSERVE'` | Global authority |
| `showNavRail` | `boolean` | `true` | Show left navigation |
| `showInspector` | `boolean` | `true` | Show right inspector |
| `showTraceConsole` | `boolean` | `true` | Show bottom trace console |
| `showStatusFooter` | `boolean` | `true` | Show status footer |
| `navRailWidth` | `number` | `56` | Nav rail width (px) |
| `inspectorWidth` | `number` | `320` | Inspector width (px) |
| `consoleHeight` | `number` | `200` | Console height (px) |
| `inspectorResizable` | `boolean` | `true` | Allow inspector resize |
| `consoleResizable` | `boolean` | `true` | Allow console resize |

### Example: Customized Layout

```tsx
<AppShell
  theme="field-green"
  density="compact"
  authority="AUTH_3_EXECUTE"
  showNavRail={true}
  showInspector={false}
  showTraceConsole={true}
  navRailWidth={64}
  consoleHeight={240}
>
  <TopCommandBar productName="Field Ops" workspace="mission.42" />
  <PrimaryWorkspace>
    <FieldMap />
  </PrimaryWorkspace>
  <BottomTraceConsole />
  <StatusFooter />
</AppShell>
```
