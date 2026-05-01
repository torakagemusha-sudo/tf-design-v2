# 11 — Migration Guide

> This guide covers migration from Torafirma v1 to v2, adoption from other design systems, and gradual migration strategies.

---

## Table of Contents

1. [Migration Overview](#1-migration-overview)
2. [From v1 to v2](#2-from-v1-to-v2)
3. [From Other Design Systems](#3-from-other-design-systems)
4. [Gradual Adoption Strategy](#4-gradual-adoption-strategy)
5. [Breaking Changes](#5-breaking-changes)
6. [Deprecation Timeline](#6-deprecation-timeline)

---

## 1. Migration Overview

### Migration Paths

| From | To | Effort | Guide |
|------|----|--------|-------|
| Torafirma v1 | Torafirma v2 | Medium | Section 2 |
| Material UI | Torafirma v2 | High | Section 3 |
| Ant Design | Torafirma v2 | High | Section 3 |
| Custom UI | Torafirma v2 | High | Section 3 |
| Tailwind UI | Torafirma v2 | Medium | Section 3 |
| Blueprint | Torafirma v2 | Medium | Section 3 |

### Migration Principles

1. **Migrate incrementally** — Component by component, page by page
2. **Maintain functionality** — Behavior should not change during migration
3. **Preserve state** — User sessions and data must remain intact
4. **Test at each step** — Validate after each component migration
5. **Run enforcers** — Use design rule enforcers to validate migration

---

## 2. From v1 to v2

### What's New in v2

| Feature | v1 | v2 |
|---------|-----|-----|
| Component families | 8 | 12 |
| State machines | 8 | 18 |
| Layout templates | 10 | 20 |
| Themes | 3 | 5 |
| Design tokens | ~100 | ~183 |
| Enforcer categories | 8 | 15 |
| Accessibility | Basic | Full WCAG 2.1 AA |
| AI components | None | Full family |
| Graph components | Basic | Comprehensive |
| Trace pipeline | Basic | Full pipeline |

### Breaking Changes

#### Component Renames

| v1 Name | v2 Name | Notes |
|---------|---------|-------|
| `TButton` | `CommandButton` | Now requires command descriptor |
| `TStatusBadge` | `StateBadge` | New props: pulse, compact |
| `TTopBar` | `TopCommandBar` | New props: traceId |
| `TSidePanel` | `RightInspector` | Renamed for clarity |
| `TConsole` | `BottomTraceConsole` | Renamed for clarity |
| `TGraph` | `GraphCanvas` | Major API changes |
| `TNode` | `GraphNode` | New port system |

#### Removed Components

| Component | Replacement | Reason |
|-----------|-------------|--------|
| `TToast` | `Toast` + `ToastContainer` | Split for flexibility |
| `TModalOld` | `Modal` (new API) | New focus management |
| `TColorPicker` | None | Not aligned with semantic colors |
| `TSliderOld` | `Slider` | New API with validation |

#### Prop Changes

| Component | v1 Props | v2 Props |
|-----------|----------|----------|
| `CommandButton` | `label, onClick, variant` | `command, onCommand, variant, state` |
| `StateBadge` | `status, size` | `state, size, pulse, showLabel, showIcon, compact` |
| `DataTable` | `data, columns, sortable` | `data, columns, sortable, filterable, selectable, density` |
| `GraphCanvas` | `nodes, edges` | `nodes, edges, onNodeSelect, onNodeMove, onEdgeCreate` |

#### Token Changes

| v1 Token | v2 Token | Notes |
|----------|----------|-------|
| `--t-bg-dark` | `--tf-bg` | New naming convention |
| `--t-green-primary` | `--tf-green` | Simplified |
| `--t-border-light` | `--tf-border-subtle` | Renamed |
| `--t-shadow-sm` | `--tf-shadow-sm` | Same value, new prefix |

### Migration Steps

#### Step 1: Update Dependencies

```bash
# Remove v1
npm uninstall @torafirma/v1

# Install v2
npm install @torafirma/design-system @torafirma/react-components @torafirma/state-machines @torafirma/tokens
```

#### Step 2: Update Theme Import

```diff
- import '@torafirma/v1/themes/dark.css';
+ import '@torafirma/tokens/css/command-dark.css';
```

#### Step 3: Update Tailwind Config

```diff
- import torafirmaV1 from '@torafirma/v1/tailwind';
+ import torafirmaPreset from '@torafirma/tokens/tailwind';

export default {
-  presets: [torafirmaV1],
+  presets: [torafirmaPreset],
```

#### Step 4: Run Codemod

```bash
# Run the v1-to-v2 codemod
npx @torafirma/codemod v1-to-v2 src/

# Review changes
git diff

# Run tests
npm test
```

#### Step 5: Manual Component Updates

```tsx
// v1
<TButton
  label="Run workflow"
  variant="primary"
  onClick={handleRun}
/>

// v2
<CommandButton
  command={{
    id: 'run-workflow',
    label: 'Run workflow',
    operation: 'workflow.execute',
    commandClass: 'execute',
    target: workflow.id,
    state: 'available',
    requiredAuthority: 'AUTH_3_EXECUTE'
  }}
  variant="run"
  onCommand={handleRun}
/>
```

#### Step 6: Update State Management

```tsx
// v1: useState
const [state, setState] = useState('idle');

// v2: useMachine
const [state, send] = useMachine(workflowExecutionMachine);
```

#### Step 7: Run Enforcers

```bash
npx torafirma-enforce --fix
```

#### Step 8: Test

```bash
npm test
npm run build
```

### Migration Checklist

- [ ] Update package.json dependencies
- [ ] Update theme CSS import
- [ ] Update Tailwind config
- [ ] Run codemod
- [ ] Fix broken component imports
- [ ] Update button components to CommandButton
- [ ] Update badge components to StateBadge
- [ ] Update state management to useMachine
- [ ] Update design token references
- [ ] Run enforcers and fix issues
- [ ] Run tests
- [ ] Build and verify
- [ ] Accessibility audit
- [ ] Performance test

---

## 3. From Other Design Systems

### From Material UI

| Material UI | Torafirma v2 |
|-------------|--------------|
| `<Button>` | `<CommandButton>` |
| `<TextField>` | `<TextInput>` + `<FormField>` |
| `<Dialog>` | `<Modal>` |
| `<Snackbar>` | `<Toast>` |
| `<AppBar>` | `<TopCommandBar>` |
| `<Drawer>` | `<Drawer>` |
| `<DataGrid>` | `<DataTable>` |
| `<Chip>` | `<StateBadge>` or `<ActionChip>` |
| `<Tabs>` | `<TabPanel>` |
| `<Table>` | `<DataTable>` |

### From Ant Design

| Ant Design | Torafirma v2 |
|------------|--------------|
| `<Button>` | `<CommandButton>` |
| `<Input>` | `<TextInput>` |
| `<Modal>` | `<Modal>` |
| `<Table>` | `<DataTable>` |
| `<Tag>` | `<StateBadge>` |
| `<Badge>` | `<StateBadge>` |
| `<Menu>` | `<LeftNavRail>` or `<ContextMenu>` |
| `<Form>` | Form components with validation |
| `<Select>` | `<SelectField>` |
| `<DatePicker>` | `<DatePicker>` |

### From Tailwind UI

| Tailwind UI | Torafirma v2 |
|-------------|--------------|
| Dashboard layouts | Layout templates (20 options) |
| Form layouts | `<FormField>` + validation |
| Table layouts | `<DataTable>` |
| Modal layouts | `<Modal>` |
| Navigation | `<LeftNavRail>` |

### General Migration Strategy

1. **Inventory components** — List all components from the old system
2. **Map to Torafirma** — Find equivalent Torafirma components
3. **Install Torafirma** — Add packages and configure
4. **Replace incrementally** — One component at a time
5. **Run enforcers** — Validate compliance
6. **Test** — Ensure behavior is preserved

---

## 4. Gradual Adoption Strategy

### Phase 1: Foundation (Week 1-2)

- Install Torafirma packages
- Configure Tailwind with Torafirma preset
- Set up design token CSS variables
- Add fonts

### Phase 2: Shell (Week 2-3)

- Replace app shell with Torafirma AppShell
- Replace top bar with TopCommandBar
- Replace navigation with LeftNavRail
- Add StatusFooter

### Phase 3: Core Components (Week 3-5)

- Replace buttons with CommandButton
- Replace badges with StateBadge
- Replace tables with DataTable
- Replace modals with Modal

### Phase 4: Advanced Components (Week 5-7)

- Replace graphs with GraphCanvas
- Add state machines for key workflows
- Replace forms with Torafirma form components
- Add trace console

### Phase 5: Polish (Week 7-8)

- Run all enforcers
- Accessibility audit
- Performance optimization
- Documentation update

### Parallel Running

During migration, Torafirma can run alongside existing UI:

```tsx
// Wrapper that allows gradual migration
function MigrationWrapper({ children, useTorafirma }) {
  if (useTorafirma) {
    return <TorafirmaShell>{children}</TorafirmaShell>;
  }
  return <LegacyShell>{children}</LegacyShell>;
}
```

---

## 5. Breaking Changes

### v2.0.0 Breaking Changes

| Change | Impact | Mitigation |
|--------|--------|------------|
| Component API restructured | All components have new props | Codemod provided |
| Token naming changed | All CSS variables renamed | Search/replace + codemod |
| State management changed | useState → useMachine | Migration guide + examples |
| Theme system changed | New theme format | Theme migration tool |
| Icon system changed | New icon imports | Icon mapping provided |

### Deprecation Warnings (v2.0.0)

| Feature | Replacement | Removal |
|---------|-------------|---------|
| `TButton` | `CommandButton` | v2.1.0 |
| `TStatusBadge` | `StateBadge` | v2.1.0 |
| `TTopBar` | `TopCommandBar` | v2.1.0 |
| `TGraph` (old API) | `GraphCanvas` | v2.2.0 |
| `--t-*` tokens | `--tf-*` tokens | v2.1.0 |

---

## 6. Deprecation Timeline

### v2.0.0 (Current)

- New component APIs
- New token system
- New theme system
- v1 APIs deprecated with warnings

### v2.1.0 (Q2 2025)

- Remove deprecated v1 component aliases
- Remove `--t-*` token aliases
- Enforce v2 API usage

### v2.2.0 (Q3 2025)

- Remove old Graph API
- Remove legacy state management helpers
- All migrations must be complete

### v3.0.0 (2026)

- No v1 compatibility
- Full v2 feature set
- Potential new breaking changes

### Support Timeline

| Version | Status | Support End |
|---------|--------|-------------|
| v1.x | Deprecated | End of 2025 |
| v2.0.x | Current | Active |
| v2.1.x | Planned | Active |
| v2.2.x | Planned | Active |
| v3.0.x | Future | — |
