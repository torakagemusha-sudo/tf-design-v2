# 09 — Accessibility Guide

> Torafirma is committed to building accessible operational interfaces. All components meet or exceed WCAG 2.1 Level AA standards. This guide documents accessibility requirements, patterns, and testing procedures.

---

## Table of Contents

1. [Accessibility Philosophy](#1-accessibility-philosophy)
2. [Color Contrast Requirements](#2-color-contrast-requirements)
3. [Keyboard Navigation](#3-keyboard-navigation)
4. [Screen Reader Support](#4-screen-reader-support)
5. [ARIA Patterns](#5-aria-patterns)
6. [Focus Management](#6-focus-management)
7. [Testing Checklists](#7-testing-checklists)

---

## 1. Accessibility Philosophy

Torafirma accessibility principles:

1. **Operational interfaces must be accessible to all operators** — Accessibility is not optional
2. **Color is never the sole means of conveying information** — Always pair with icon, text, or pattern
3. **All interactive elements are keyboard accessible** — No mouse-only interactions
4. **Screen reader users can operate the full interface** — Complete ARIA coverage
5. **Motion respects user preferences** — Honor prefers-reduced-motion
6. **High contrast mode is supported** — Honor prefers-contrast

---

## 2. Color Contrast Requirements

### Minimum Contrast Ratios

| Element | Minimum Ratio | WCAG Level |
|---------|---------------|------------|
| Primary text on background | 7:1 | AAA |
| Secondary text on background | 4.5:1 | AA |
| Text on elevated surface | 7:1 | AAA |
| Text on accent color | 4.5:1 | AA |
| Border on background | 3:1 | AA (non-text) |
| Icon on background | 3:1 | AA (non-text) |
| Disabled text | No minimum | — |

### Theme Contrast Matrix

| Theme | Primary Text | Secondary Text | Border | Status |
|-------|-------------|----------------|--------|--------|
| Command Dark | 14.2:1 | 7.8:1 | 3.2:1 | Pass |
| Field Green | 13.8:1 | 7.5:1 | 3.1:1 | Pass |
| Deep Blue | 14.0:1 | 7.6:1 | 3.2:1 | Pass |
| Forge Graphite | 14.2:1 | 7.8:1 | 3.2:1 | Pass |
| Redline | 13.9:1 | 7.4:1 | 3.0:1 | Pass |

### Testing Contrast

```bash
# Run contrast checks
npx torafirma-enforce --rule accessibility

# Test specific component
npx torafirma-enforce --rule accessibility --glob "src/components/Button.tsx"
```

### Color-Blind Safe Patterns

```tsx
// BAD: Color only
<StateBadge color="green" /> Running

// GOOD: Color + icon + text
<StateBadge state="RUNNING" pulse showIcon showLabel />

// GOOD: Color + pattern
<Chart series={data} patternFills />
```

---

## 3. Keyboard Navigation

### Global Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd/Ctrl + K` | Open command palette |
| `Cmd/Ctrl + /` | Focus search |
| `Escape` | Close modal/drawer/dropdown |
| `Tab` | Next focusable element |
| `Shift + Tab` | Previous focusable element |
| `Enter/Space` | Activate focused element |
| `Arrow Up/Down` | Navigate lists/menus |
| `Arrow Left/Right` | Navigate tabs/rails |
| `Home` | First item in list |
| `End` | Last item in list |

### Component-Specific Shortcuts

| Component | Shortcuts |
|-----------|-----------|
| CommandPalette | `Escape` close, `Arrow` navigate, `Enter` select |
| DataTable | `Arrow` navigate, `Space` select, `Enter` activate |
| GraphCanvas | `+/-` zoom, `0` fit, `Delete` remove selection |
| Modal | `Escape` close (if dismissible) |
| Tabs | `Arrow Left/Right` navigate tabs |
| SplitPane | `Shift + Arrow` resize |

### Focus Trap

Modals and drawers trap focus within their boundaries:

```tsx
<Modal trapFocus>
  {/* Tab cycles within modal only */}
</Modal>
```

### Skip Links

All layouts include skip links for keyboard users:

```tsx
<SkipLink target="main-workspace">Skip to workspace</SkipLink>
<SkipLink target="navigation">Skip to navigation</SkipLink>
<SkipLink target="trace-console">Skip to trace console</SkipLink>
```

---

## 4. Screen Reader Support

### ARIA Live Regions

```tsx
// Status announcements
<LiveRegion aria-live="polite">
  {statusMessage}
</LiveRegion>

// Important alerts
<LiveRegion aria-live="assertive">
  {criticalAlert}
</LiveRegion>
```

### Component Announcements

| Component | Screen Reader Behavior |
|-----------|----------------------|
| StateBadge | Announces state change with polite live region |
| CommandButton | Announces "Button: [label], [state]" |
| DataTable | Announces row count, selection count |
| GraphNode | Announces "Node: [label], [type], [state]" |
| Modal | Announces dialog title on open |
| TraceConsole | Announces new events with polite live region |

### Accessible Labels

```tsx
// Icon-only buttons must have aria-label
<IconCommandButton
  icon={<StopIcon />}
  aria-label="Abort current execution"
  onCommand={handleAbort}
/>

// Decorative icons are hidden
<StateBadge state="RUNNING">
  <RunningIcon aria-hidden="true" />
  <span>Running</span>
</StateBadge>
```

### Descriptions for Complex Elements

```tsx
<CommandButton
  command={{
    id: 'deploy',
    label: 'Deploy workflow',
    commandClass: 'deploy'
  }}
  aria-describedby="deploy-desc"
/>
<span id="deploy-desc" className="sr-only">
  This will deploy the workflow to production runtime.
  Required authority: Commit.
</span>
```

---

## 5. ARIA Patterns

### Modal Dialog

```tsx
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-desc"
>
  <h2 id="modal-title">Confirm Deployment</h2>
  <p id="modal-desc">This will deploy to production.</p>
  {/* ... */}
</div>
```

### Command Palette (Combobox)

```tsx
<div role="combobox" aria-expanded={open} aria-haspopup="listbox">
  <input
    aria-autocomplete="list"
    aria-controls="command-list"
    aria-activedescendant={activeItem}
  />
  <ul role="listbox" id="command-list">
    {commands.map(cmd => (
      <li role="option" aria-selected={cmd.selected}>
        {cmd.label}
      </li>
    ))}
  </ul>
</div>
```

### Data Table (Grid)

```tsx
<table role="grid" aria-label="Workflow executions">
  <thead>
    <tr>
      <th scope="col">Workflow</th>
      <th scope="col">State</th>
    </tr>
  </thead>
  <tbody>
    <tr aria-selected={selected}>
      <td>{workflow.name}</td>
      <td><StateBadge state={workflow.state} /></td>
    </tr>
  </tbody>
</table>
```

### Tabs (Tablist)

```tsx
<div role="tablist" aria-label="Workspace tabs">
  {tabs.map(tab => (
    <button
      role="tab"
      aria-selected={tab.active}
      aria-controls={tab.panelId}
      id={tab.id}
    >
      {tab.label}
    </button>
  ))}
</div>
<div role="tabpanel" aria-labelledby={activeTab.id}>
  {activeTab.content}
</div>
```

### Tree View

```tsx
<ul role="tree" aria-label="File explorer">
  <li role="treeitem" aria-expanded={expanded}>
    <span>{folder.name}</span>
    <ul role="group">
      {folder.children.map(child => (
        <li role="treeitem">{child.name}</li>
      ))}
    </ul>
  </li>
</ul>
```

### Alert

```tsx
<div role="alert" aria-live="assertive">
  <AlertIcon />
  <span>Workflow execution failed. Fault code: WF-ERROR-001</span>
</div>
```

### Progress Bar

```tsx
<div
  role="progressbar"
  aria-valuenow={progress}
  aria-valuemin={0}
  aria-valuemax={100}
  aria-label="Workflow execution progress"
>
  <div style={{ width: `${progress}%` }} />
</div>
```

---

## 6. Focus Management

### Focus Indicators

```css
/* Standard focus */
:focus-visible {
  outline: 2px solid var(--tf-accent);
  outline-offset: 2px;
}

/* High contrast focus */
@media (prefers-contrast: high) {
  :focus-visible {
    outline: 3px solid var(--tf-accent);
    outline-offset: 3px;
  }
}
```

### Focus Traps

Focus is trapped in modals and drawers:

```tsx
<Modal trapFocus autoFocus returnFocus>
  {/* Focus cycles within modal */}
  {/* First focusable element is auto-focused */}
  {/* Focus returns to trigger on close */}
</Modal>
```

### Focus Restoration

When a modal or drawer closes, focus returns to the element that triggered it:

```tsx
const triggerRef = useRef<HTMLButtonElement>(null);

// On modal close:
triggerRef.current?.focus();
```

### Programmatic Focus

```tsx
// Focus a specific element
const inputRef = useRef<HTMLInputElement>(null);
inputRef.current?.focus();

// In React
<input ref={inputRef} />
```

### Focus Order

Focus order follows the visual layout:

1. Top command bar
2. Left navigation rail
3. Primary workspace (left to right, top to bottom)
4. Right inspector
5. Bottom trace console
6. Status footer

---

## 7. Testing Checklists

### Automated Accessibility Tests

```bash
# Run all accessibility checks
npx torafirma-enforce --rule accessibility

# Run axe-core tests
npx jest --testPathPattern="a11y"

# Run with specific browser
npx playwright test --project=chromium a11y.spec.ts
```

### Manual Testing Checklist

#### Keyboard Navigation

- [ ] All interactive elements are reachable via Tab
- [ ] Tab order follows visual layout
- [ ] Focus indicators are visible on all themes
- [ ] Escape closes modals and dropdowns
- [ ] Arrow keys navigate lists, tables, and tabs
- [ ] Enter/Space activate buttons and links
- [ ] No keyboard traps (except intentional focus traps in modals)

#### Screen Reader

- [ ] All images have descriptive alt text
- [ ] All buttons have descriptive labels
- [ ] Form inputs have associated labels
- [ ] State changes are announced (live regions)
- [ ] Table headers are properly scoped
- [ ] Complex components use appropriate ARIA roles
- [ ] Error messages are announced

#### Color and Contrast

- [ ] All text meets minimum contrast ratios
- [ ] Information is not conveyed by color alone
- [ ] Charts have pattern fills in addition to color
- [ ] State indicators have both color and icon
- [ ] Focus indicators are visible

#### Motion

- [ ] `prefers-reduced-motion` is respected
- [ ] No essential information is conveyed by animation alone
- [ ] Pulse animations can be disabled

#### Zoom and Reflow

- [ ] Interface is usable at 200% zoom
- [ ] Interface is usable at 400% zoom (mobile breakpoint)
- [ ] No horizontal scroll at 1280px width and 400% zoom
- [ ] Content does not overlap at high zoom

### Screen Reader Testing Matrix

| Screen Reader | Browser | Platform |
|---------------|---------|----------|
| NVDA | Firefox | Windows |
| JAWS | Chrome | Windows |
| VoiceOver | Safari | macOS |
| VoiceOver | Safari | iOS |
| TalkBack | Chrome | Android |

### Accessibility Audit Template

```markdown
## Accessibility Audit: [Feature Name]

### Date: [Date]
### Auditor: [Name]
### Version: [Version]

### Automated Tests
- axe-core: [Pass/Fail]
- torafirma-enforce: [Pass/Fail]
- lighthouse: [Score]

### Manual Tests
- Keyboard: [Pass/Fail]
- Screen reader: [Pass/Fail]
- Color contrast: [Pass/Fail]
- Zoom: [Pass/Fail]

### Issues Found
1. [Issue description]
   - Severity: [Critical/High/Medium/Low]
   - WCAG: [Criterion]
   - Fix: [Description]

### Sign-off
- [ ] All critical issues resolved
- [ ] All high issues resolved or accepted
- [ ] Product owner approval
