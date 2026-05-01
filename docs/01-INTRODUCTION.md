# 01 — Introduction to the Torafirma Design System

> **Dark. Dense. Governed. Instrumented. Consequence-aware.**

---

## What is Torafirma

Torafirma is a comprehensive design system for building **governed operational interfaces** — the kind of software used to observe, construct, modify, execute, and audit computational systems. It is not a consumer UI toolkit. It is a command surface for serious systems.

A Torafirma product is not merely an application. It is a governed operational surface that provides:

1. **A visible system model** — The user can understand what objects, processes, graphs, policies, or runtimes exist.
2. **A state model** — The user can see whether the system is idle, dirty, staged, running, blocked, degraded, faulted, or complete.
3. **An action model** — The user can understand what actions are available and what each action will do.
4. **An authority model** — Consequential actions are gated by role, policy, state, or explicit approval.
5. **A trace model** — Important actions produce inspectable logs, events, diffs, or lineage records.
6. **A failure model** — Invalid, uncertain, blocked, or dangerous states fail closed and explain why.

> **The default Torafirma product archetype: A command surface over governed computational machinery.**

---

## Philosophy: Controlled Force, Operational Clarity, Governed Execution

### Prime Directive

Every interface must answer four questions immediately:

1. **What system am I observing?**
2. **What state is it in?**
3. **What actions are available?**
4. **What consequences will those actions have?**

The interface must never hide operational state behind decorative softness. A Torafirma product is not primarily an app; it is a **control surface**.

### Five Design Axioms

#### Axiom 1 — State Before Ornament

Visual design must expose system state before it beautifies the page.

| Good | Bad |
|------|-----|
| Active/inactive states are obvious | Decorative gradients without semantic meaning |
| Dangerous actions are visually distinct | Ambiguous color usage |
| Execution state is always visible | Hidden state |
| Warnings have precise meaning | Generic pastel SaaS styling |
| Command surfaces show what will happen | Button labels that obscure consequence |

#### Axiom 2 — Density Is Acceptable When Structure Is Strong

Torafirma products may be visually dense. Density is not the enemy. Unstructured density is the enemy.

Dense interfaces use:
- Clear panel boundaries
- Strong grid alignment
- Compact but readable typography
- Semantic color coding
- Collapsible sections
- State badges
- Grouped control bands
- Clear hierarchy between command, telemetry, and content

#### Axiom 3 — Every Action Has Authority Level

No action is merely a button. Every action belongs to an authority class.

| Class | Examples |
|-------|----------|
| Observe | Inspect, view, query |
| Draft | Create, edit, generate |
| Simulate | Preview, dry-run |
| Stage | Prepare, validate, freeze |
| Execute | Run, dispatch, start |
| Commit | Save, persist, write |
| Override | Bypass, force, escalate |
| Abort | Stop, trip, kill |

The visual design should encode authority. A destructive command should never look like a passive filter chip.

#### Axiom 4 — Fail Closed Visually

When the system is uncertain, disconnected, degraded, or waiting for confirmation, the interface should visually contract authority.

- Disable execution buttons
- Shift controls to amber or slate
- Show interlock status
- Expose reason codes
- Require explicit confirmation for escalation

**No ambiguous green lights.**

#### Axiom 5 — Sharp Lines, Hard Edges, Precise Seams

The Torafirma visual language prefers engineered geometry over organic softness.

**Use:**
- Hard panel seams
- Clipped corners
- Thin borders
- Angular dividers
- Monospaced telemetry
- Schematic overlays
- Grid structures
- Terminal-like bands

**Avoid:**
- Pill-heavy consumer UI
- Excessive rounded corners
- Playful bubbly controls
- Glassmorphism as decoration
- Pastel gradients
- Vague floating blobs

---

## Brand Personality

### Brand Essence

Torafirma products should feel like:
- An engineering command deck
- A governed computation cockpit
- A tactical operations terminal
- A research-grade instrument panel
- A formal system under operator authority

The interface should **not** feel like:
- A lifestyle app
- A social network
- A generic SaaS dashboard
- A consumer chatbot shell
- A playful design toy

### Personality Attributes

| Attribute | Description |
|-----------|-------------|
| **Controlled** | Calm, exact, non-hysterical, authority-aware |
| **Technical** | Uses precise language and exposes system mechanics |
| **Severe** | Not grim, but serious. Avoids frivolity |
| **Operational** | Frames the user as an operator making consequential changes |
| **Governed** | Makes permissions, rules, contracts, and failure states visible |
| **Strategic** | Encourages planned execution, not random clicking |
| **Dense** | Assumes capable users can handle high information bandwidth |
| **Instrumented** | Telemetry, logs, status, and traceability are first-class |

### Brand Voice

The voice should be concise, technical, and decisive. Use language that feels like command systems, engineering logs, military/tactical status reports, formal computation, machine governance, and high-reliability operations.

**Avoid** language that feels like consumer onboarding fluff, vague encouragement, gamified dopamine loops, childish friendliness, or over-personalized assistant chatter.

| Generic SaaS | Torafirma |
|--------------|-----------|
| "Let's get started!" | "Initialize workspace." |
| "Oops, something went wrong." | "Execution fault. Review cause." |
| "Are you sure?" | "Confirm authority escalation." |
| "Nice! Your workflow is ready." | "Workflow compiled. Ready for staging." |
| "Delete this item?" | "Purge object from active graph?" |
| "Run now" | "Execute run." |
| "Try again" | "Retry operation." |
| "Cancel" | "Abort." |
| "Save changes" | "Commit changes." |
| "Preview" | "Inspect draft." |

---

## Target Audience

This guide is written for:

### Primary Audience
- **Senior Frontend Engineers** building Torafirma products
- **Design System Engineers** implementing and extending components
- **Product Engineers** building interfaces for operational systems

### Secondary Audience
- **UX Engineers** implementing interaction patterns
- **QA Engineers** testing Torafirma interfaces
- **Technical Writers** documenting Torafirma products

### Assumed Knowledge
- React/TypeScript fundamentals
- CSS3 and modern CSS features
- Component-driven architecture
- Accessibility standards (WCAG 2.1)
- State machine concepts (XState or similar)

---

## System Requirements

### Runtime
| Requirement | Version |
|-------------|---------|
| React | >= 18.0.0 |
| TypeScript | >= 5.0 |
| Node.js | >= 18.0.0 |

### Browser Support
| Browser | Minimum Version |
|---------|-----------------|
| Chrome/Edge | >= 100 |
| Firefox | >= 100 |
| Safari | >= 16 |

### Recommended Tooling
- **Build:** Vite 5+ or Next.js 14+
- **Styling:** Tailwind CSS 3.4+ (with custom configuration)
- **State:** XState 5+ for state machines
- **Icons:** Lucide React, Tabler Icons, or Phosphor Icons
- **Fonts:** Inter, JetBrains Mono, Rajdhani (Google Fonts or self-hosted)

---

## Installation

### NPM Installation

```bash
# Core design system
npm install @torafirma/design-system

# React components
npm install @torafirma/react-components

# State machines
npm install @torafirma/state-machines

# Design tokens (CSS variables)
npm install @torafirma/tokens
```

### Tailwind Configuration

```js
// tailwind.config.js
import torafirmaPreset from '@torafirma/tokens/tailwind';

export default {
  presets: [torafirmaPreset],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      // Product-specific extensions
    }
  }
};
```

### CSS Import

```css
/* index.css */
@import '@torafirma/tokens/css/command-dark.css';
/* or: @import '@torafirma/tokens/css/field-green.css'; */
/* or: @import '@torafirma/tokens/css/deep-blue.css'; */
/* or: @import '@torafirma/tokens/css/forge.css'; */
/* or: @import '@torafirma/tokens/css/redline.css'; */
```

### Font Loading

```css
/* Google Fonts CDN */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&family=Rajdhani:wght@400;500;600;700&display=swap');
```

---

## Quick Start Example

### 1. Basic Setup (App Shell)

```tsx
// App.tsx
import { AppShell, TopCommandBar, LeftNavRail, PrimaryWorkspace, RightInspector, BottomTraceConsole, StatusFooter } from '@torafirma/react-components';

function App() {
  return (
    <AppShell>
      <TopCommandBar
        productName="Torafirma Studio"
        workspace="workflow.qc.main"
        state="READY"
        authority="AUTH_3_EXECUTE"
      />
      <div className="flex flex-1">
        <LeftNavRail
          modules={['Studio', 'Graph', 'Runtime', 'Trace', 'Policies']}
          activeModule="Studio"
        />
        <PrimaryWorkspace>
          <WorkflowCanvas />
        </PrimaryWorkspace>
        <RightInspector>
          <NodeInspector />
        </RightInspector>
      </div>
      <BottomTraceConsole />
      <StatusFooter
        runtime="LOCAL"
        state="READY"
        auth="EXECUTE"
        trace="18F2-A91C"
      />
    </AppShell>
  );
}
```

### 2. Command Button with Authority

```tsx
// RunWorkflowButton.tsx
import { CommandButton } from '@torafirma/react-components';

function RunWorkflowButton({ workflow, state }) {
  return (
    <CommandButton
      command={{
        id: 'run-workflow',
        label: 'Run workflow',
        operation: 'workflow.execute',
        commandClass: 'execute',
        target: workflow.id,
        state: state === 'STAGED' ? 'available' : 'blocked',
        requiredAuthority: 'AUTH_3_EXECUTE',
        requiresTrace: true,
        blockedReason: state !== 'STAGED' ? {
          reasonCode: 'WORKFLOW_NOT_STAGED',
          message: 'Workflow must be staged before execution.',
          requiredAction: 'Stage workflow first.'
        } : undefined
      }}
      variant="run"
      onCommand={(cmd) => dispatchWorkflowExecution(cmd)}
    />
  );
}
```

### 3. State Badge

```tsx
// StatusDisplay.tsx
import { StateBadge } from '@torafirma/react-components';

function StatusDisplay({ state }) {
  return (
    <div className="flex gap-2">
      <StateBadge state="READY" />
      <StateBadge state="RUNNING" pulse />
      <StateBadge state="STAGED" />
      <StateBadge state="FAULTED" />
    </div>
  );
}
```

### 4. Design Tokens in CSS

```css
/* CustomPanel.css */
.my-panel {
  background: var(--tf-charcoal);
  border: 1px solid var(--tf-border-normal);
  border-radius: var(--tf-radius-md);
  padding: var(--tf-panel-padding);
  color: var(--tf-text-primary);
  font-family: var(--tf-font-ui);
  font-size: var(--tf-text-base);
}

.my-panel-header {
  font-size: var(--tf-text-xs);
  font-weight: var(--tf-weight-bold);
  letter-spacing: var(--tf-tracking-command);
  text-transform: uppercase;
  border-bottom: 1px solid var(--tf-border-normal);
  padding-bottom: var(--tf-space-3);
  margin-bottom: var(--tf-space-4);
}
```

### 5. State Machine Integration

```tsx
// WorkflowMachine.tsx
import { useMachine } from '@torafirma/state-machines';
import { workflowExecutionMachine } from './workflow.machine';

function WorkflowRunner({ workflow }) {
  const [state, send] = useMachine(workflowExecutionMachine, {
    input: { workflowId: workflow.id }
  });

  return (
    <div>
      <StateBadge state={state.value} />
      {state.matches('staged') && (
        <CommandButton
          command={{
            id: 'execute',
            label: 'Execute run',
            commandClass: 'execute',
            requiredAuthority: 'AUTH_3_EXECUTE'
          }}
          variant="run"
          onCommand={() => send({ type: 'EXECUTE' })}
        />
      )}
      {state.matches('running') && (
        <CircuitBreaker
          active
          variant="abort"
          target={workflow.id}
          onTrip={() => send({ type: 'ABORT' })}
        />
      )}
    </div>
  );
}
```

---

## Next Steps

- **[02-ARCHITECTURE.md](02-ARCHITECTURE.md)** — Understand the system layers and architecture
- **[03-DESIGN-TOKENS.md](03-DESIGN-TOKENS.md)** — Learn the design token system
- **[04-COMPONENT-CATALOG.md](04-COMPONENT-CATALOG.md)** — Explore the component families
- **[10-PATTERNS.md](10-PATTERNS.md)** — See common implementation patterns
