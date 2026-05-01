# 08 — Design Rules Reference

> Torafirma provides automated design rule enforcers that validate interface compliance with the design system. These enforcers catch semantic, visual, and interaction violations before they reach production.

---

## Table of Contents

1. [Enforcer Overview](#1-enforcer-overview)
2. [15 Enforcer Categories](#2-15-enforcer-categories)
3. [Severity Levels](#3-severity-levels)
4. [Running Enforcers](#4-running-enforcers)
5. [Custom Rule Creation](#5-custom-rule-creation)
6. [CI/CD Integration](#6-cicd-integration)

---

## 1. Enforcer Overview

Design rule enforcers are automated checks that validate Torafirma interface compliance. They run against component code, styles, and copy to ensure consistency with the design system.

### Why Enforcers Matter

- **Consistency** — All products follow the same design language
- **Correctness** — Semantic color usage matches intent
- **Quality** — Accessibility and usability standards are met
- **Efficiency** — Catch issues in development, not production
- **Governance** — Enforce authority and traceability requirements

### Enforcer Architecture

```
[Source Code]
  → [Parser] → [AST]
    → [Enforcer 1] → [Report]
    → [Enforcer 2] → [Report]
    → [Enforcer N] → [Report]
      → [Aggregator] → [Final Report]
```

---

## 2. 15 Enforcer Categories

### 1. Semantic Color Enforcer

Validates that color usage matches semantic meaning.

| Rule ID | Description | Severity |
|---------|-------------|----------|
| `SEM-COL-001` | Red must indicate stop/fault/destructive | Error |
| `SEM-COL-002` | Green must indicate proceed/run/success | Error |
| `SEM-COL-003` | Amber must indicate caution/pending/review | Error |
| `SEM-COL-004` | Blue must indicate information/inspect | Error |
| `SEM-COL-005` | Decorative color must not conflict with semantic | Error |
| `SEM-COL-006` | Color-blind-unsafe patterns must include secondary indicator | Warning |

**Example Violation:**
```tsx
// BAD: Green button for a destructive action
<Button color="green" onClick={deleteAll}>Delete Everything</Button>

// GOOD: Red button for destructive action
<CommandButton variant="destructive" onCommand={deleteAll}>Delete Everything</CommandButton>
```

### 2. Typography Enforcer

Ensures type scale compliance and legibility.

| Rule ID | Description | Severity |
|---------|-------------|----------|
| `TYP-001` | Font family must be from Torafirma set | Error |
| `TYP-002` | Font size must match type scale tokens | Warning |
| `TYP-003` | Line height must be sufficient for readability | Error |
| `TYP-004` | Letter spacing must match token values | Info |
| `TYP-005` | Text must not exceed maximum line length | Warning |
| `TYP-006` | Minimum text size must be 10px | Error |

### 3. Spacing Density Enforcer

Validates spacing token usage.

| Rule ID | Description | Severity |
|---------|-------------|----------|
| `SPA-001` | Padding must use spacing tokens | Warning |
| `SPA-002` | Margin must use spacing tokens | Warning |
| `SPA-003` | Panel padding must match density level | Warning |
| `SPA-004` | Control height must match density level | Warning |
| `SPA-005` | Arbitrary pixel values should use tokens | Info |

### 4. Border Radius Enforcer

Enforces sharp/minimal radius rules.

| Rule ID | Description | Severity |
|---------|-------------|----------|
| `RAD-001` | Maximum radius is 8px (xl token) | Error |
| `RAD-002` | Cards use md (4px) maximum | Warning |
| `RAD-003` | Tables and terminals use 0px | Error |
| `RAD-004` | No pill-shaped containers (consumer anti-pattern) | Error |

### 5. Button Grammar Enforcer

Validates button labels use proper verbs.

| Rule ID | Description | Severity |
|---------|-------------|----------|
| `BTN-001` | Button label must be a verb or verb-object | Error |
| `BTN-002` | Avoid generic labels ("Submit", "OK", "Click here") | Error |
| `BTN-003` | Destructive buttons must use action verbs | Error |
| `BTN-004` | Run buttons must say "Run" not "Go" | Warning |
| `BTN-005` | Stop buttons must say "Stop" or "Abort" | Error |
| `BTN-006` | Labels must follow title case | Info |

**Example Violation:**
```tsx
// BAD: Generic label
<Button>Submit</Button>

// GOOD: Verb-object command label
<CommandButton label="Stage workflow" commandClass="stage" />
```

### 6. Authority Disclosure Enforcer

Ensures authority is visible for consequential actions.

| Rule ID | Description | Severity |
|---------|-------------|----------|
| `AUTH-001` | Execute-class buttons must show required authority | Error |
| `AUTH-002` | Override-class buttons must show escalation path | Error |
| `AUTH-003` | Commit-class buttons must show commit scope | Warning |
| `AUTH-004` | Authority gate must be present for AUTH_5+ | Error |
| `AUTH-005` | Authority badge must be visible in footer | Warning |

### 7. State Visibility Enforcer

Validates state is shown near action surfaces.

| Rule ID | Description | Severity |
|---------|-------------|----------|
| `STA-001` | Action buttons must have nearby state indicator | Warning |
| `STA-002` | State badges must use correct color for state | Error |
| `STA-003` | Running state must show pulse indicator | Warning |
| `STA-004` | Faulted state must show error details | Error |

### 8. Confirmation Enforcer

Validates destructive actions require confirmation.

| Rule ID | Description | Severity |
|---------|-------------|----------|
| `CON-001` | Purge actions require typed confirmation | Error |
| `CON-002` | Override actions require reason input | Error |
| `CON-003` | Destructive actions show consequence scope | Error |
| `CON-004` | Confirmation dialog uses danger variant | Warning |

### 9. Traceability Enforcer

Ensures consequential actions produce trace events.

| Rule ID | Description | Severity |
|---------|-------------|----------|
| `TRC-001` | Execute-class actions must log trace event | Error |
| `TRC-002` | Commit-class actions must log trace event | Error |
| `TRC-003` | Override actions must log audit event | Error |
| `TRC-004` | Authority escalation must log audit event | Error |
| `TRC-005` | Trace events must include actor and timestamp | Error |

### 10. Accessibility Enforcer

Validates contrast, focus states, ARIA usage.

| Rule ID | Description | Severity |
|---------|-------------|----------|
| `A11Y-001` | Text contrast must be >= 4.5:1 | Error |
| `A11Y-002` | Focus indicator must be visible | Error |
| `A11Y-003` | Interactive elements must have ARIA roles | Error |
| `A11Y-004` | Images must have alt text | Error |
| `A11Y-005` | Form inputs must have labels | Error |
| `A11Y-006` | Color alone must not convey meaning | Warning |
| `A11Y-007` | Keyboard navigation must be possible | Error |
| `A11Y-008` | Screen reader text must be present | Warning |

### 11. Component Naming Enforcer

Validates component names encode operational purpose.

| Rule ID | Description | Severity |
|---------|-------------|----------|
| `NAM-001` | Action components must use verb names | Warning |
| `NAM-002` | Display components must use noun names | Info |
| `NAM-003` | Components must not use generic names | Warning |

### 12. Copy Tone Enforcer

Validates language follows Torafirma voice.

| Rule ID | Description | Severity |
|---------|-------------|----------|
| `CPY-001` | No consumer onboarding language | Warning |
| `CPY-002` | No vague error messages | Error |
| `CPY-003` | No gamified language | Warning |
| `CPY-004` | Destructive actions must describe scope | Error |
| `CPY-005` | Labels must be concise and technical | Warning |

### 13. Glow/Decoration Enforcer

Limits glow to semantic state indicators.

| Rule ID | Description | Severity |
|---------|-------------|----------|
| `GLW-001` | Glow must indicate active state | Warning |
| `GLW-002` | No glow on passive containers | Error |
| `GLW-003` | No glow on decorative elements | Error |
| `GLW-004` | Glow color must match state semantic | Error |

### 14. Density Enforcer

Validates information density is appropriate for context.

| Rule ID | Description | Severity |
|---------|-------------|----------|
| `DEN-001` | Cockpit density must be very dense | Warning |
| `DEN-002` | Mobile density must be low | Warning |
| `DEN-003` | Table density must be compact | Warning |
| `DEN-004` | Field controls must be large | Error |

### 15. Anti-Pattern Enforcer

Catches prohibited patterns.

| Rule ID | Description | Severity |
|---------|-------------|----------|
| `ANT-001` | No hidden state indicators | Error |
| `ANT-002` | No generic button labels | Error |
| `ANT-003` | No pill-shaped primary actions | Warning |
| `ANT-004` | No decorative gradients | Error |
| `ANT-005` | No ambiguous green/yellow lights | Error |
| `ANT-006` | No glassmorphism on operational UI | Error |
| `ANT-007` | No floating blobs as decoration | Error |
| `ANT-008` | No consumer chat UI | Error |

---

## 3. Severity Levels

| Level | Description | Build Action | Exit Code |
|-------|-------------|--------------|-----------|
| `error` | Violation breaks core system rules | Block | 1 |
| `warning` | Deviation from recommended practice | Warning | 0 |
| `info` | Suggestion for improvement | None | 0 |

### Configuring Severity

```json
// torafirma-enforce.config.json
{
  "rules": {
    "SEM-COL-001": "error",
    "SEM-COL-006": "warning",
    "TYP-004": "info",
    "SPA-005": "info"
  }
}
```

---

## 4. Running Enforcers

### CLI Usage

```bash
# Run all enforcers
npx torafirma-enforce

# Run specific enforcer
npx torafirma-enforce --rule semantic-color
npx torafirma-enforce --rule typography
npx torafirma-enforce --rule authority-disclosure

# Run multiple enforcers
npx torafirma-enforce --rule semantic-color,typography,spacing

# Run with severity override
npx torafirma-enforce --severity error

# CI mode (exit codes)
npx torafirma-enforce --ci

# Output format
npx torafirma-enforce --format json
npx torafirma-enforce --format junit
n
# Run on specific files
npx torafirma-enforce --glob "src/components/**/*.tsx"

# Fix auto-fixable issues
npx torafirma-enforce --fix
```

### Programmatic Usage

```tsx
import { enforce } from '@torafirma/enforcers';

const results = await enforce({
  rules: ['semantic-color', 'typography'],
  glob: 'src/components/**/*.tsx',
  severity: 'error'
});

console.log(results.summary);
// { errors: 0, warnings: 3, info: 12 }
```

---

## 5. Custom Rule Creation

### Creating a Custom Enforcer

```tsx
// myCustomEnforcer.ts
import { createEnforcer } from '@torafirma/enforcers';

export const myCustomEnforcer = createEnforcer({
  id: 'custom-001',
  name: 'My Custom Rule',
  category: 'custom',
  severity: 'warning',
  check: (node, context) => {
    // Check logic
    if (node.type === 'Button' && !node.props.variant) {
      return {
        pass: false,
        message: 'Buttons must specify a semantic variant',
        location: node.location
      };
    }
    return { pass: true };
  }
});
```

### Registering Custom Enforcers

```json
// torafirma-enforce.config.json
{
  "extends": ["@torafirma/enforcers/recommended"],
  "plugins": ["./myCustomEnforcer.ts"]
}
```

---

## 6. CI/CD Integration

### GitHub Actions

```yaml
# .github/workflows/design-enforce.yml
name: Design System Enforcement

on: [push, pull_request]

jobs:
  enforce:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npx torafirma-enforce --ci --format json
```

### GitLab CI

```yaml
# .gitlab-ci.yml
design-enforce:
  script:
    - npm ci
    - npx torafirma-enforce --ci
  rules:
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"
```

### Pre-commit Hook

```json
// .husky/pre-commit
{
  "hooks": {
    "pre-commit": "npx torafirma-enforce --severity error"
  }
}
```

### PR Comment Integration

```yaml
# .github/workflows/design-enforce.yml (continued)
      - name: Comment PR
        if: github.event_name == 'pull_request'
        uses: actions/github-script@v7
        with:
          script: |
            const results = require('./enforce-results.json');
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: `### Design Enforcement Results
Errors: ${results.errors}
Warnings: ${results.warnings}`
            });
```

---

## Enforcer Summary

| # | Category | Rules | Purpose |
|---|----------|-------|---------|
| 1 | Semantic Color | 6 | Color usage matches intent |
| 2 | Typography | 6 | Type scale compliance |
| 3 | Spacing Density | 5 | Spacing token usage |
| 4 | Border Radius | 4 | Sharp edge enforcement |
| 5 | Button Grammar | 6 | Proper command labels |
| 6 | Authority Disclosure | 5 | Authority visibility |
| 7 | State Visibility | 4 | State indicator presence |
| 8 | Confirmation | 4 | Destructive confirmation |
| 9 | Traceability | 5 | Trace event logging |
| 10 | Accessibility | 8 | A11y compliance |
| 11 | Component Naming | 3 | Naming conventions |
| 12 | Copy Tone | 5 | Voice compliance |
| 13 | Glow/Decoration | 4 | Glow usage rules |
| 14 | Density | 4 | Density appropriateness |
| 15 | Anti-Pattern | 8 | Prohibited patterns |
