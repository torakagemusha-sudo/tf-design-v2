# 05 — State Machine Reference

> Torafirma products use explicit state machines to govern component behavior, action availability, and lifecycle transitions. State machines prevent impossible states, enforce transition discipline, and make system behavior auditable.

---

## Table of Contents

1. [State Machine Philosophy](#1-state-machine-philosophy)
2. [Canonical States](#2-canonical-states)
3. [Preferred Transition Path](#3-preferred-transition-path)
4. [Invalid Shortcuts](#4-invalid-shortcuts)
5. [The 18 State Machines](#5-the-18-state-machines)
6. [useMachine Hook](#6-usemachine-hook)

---

## 1. State Machine Philosophy

State machines in Torafirma serve four critical functions:

1. **Prevent impossible states** — A component cannot be simultaneously `RUNNING` and `IDLE`
2. **Enforce transition discipline** — Actions must follow the proper lifecycle
3. **Make behavior auditable** — State transitions produce trace events
4. **Drive UI state** — Component appearance is derived from machine state

Every Torafirma state machine follows these rules:
- All states are explicitly defined
- All transitions are guarded
- No state can be reached without a defined transition
- All transitions produce a trace event (if configured)
- Guards prevent invalid transitions with clear error reasons

---

## 2. Canonical States

All Torafirma state machines use the following state language:

| State | Meaning | Visual Treatment |
|-------|---------|-----------------|
| `IDLE` | No active operation | No indicator |
| `READY` | Valid and available for action | Green border, active controls |
| `DIRTY` | Local changes exist but not staged | Amber dot, diff indicator |
| `VALIDATING` | Validation is running | Blue spinner |
| `VALID` | Validation passed | Green checkmark |
| `WARNING` | Admissible but requires attention | Amber badge |
| `BLOCKED` | Action prevented by policy/validation/authority | Red border, disabled controls |
| `STAGED` | Validated change prepared for action | Amber border, stage badge |
| `RUNNING` | Runtime operation active | Cyan pulse, progress indicator |
| `COMPLETE` | Operation completed | Green checkmark |
| `DEGRADED` | Operating below nominal capability | Amber warning, telemetry |
| `FAULTED` | Operation or subsystem failed | Red border, error details |
| `LOCKED` | Protected by authority/ownership/policy | Gold border, lock indicator |
| `SIMULATED` | Non-production execution or preview | Purple badge |
| `COMMITTED` | Durable change persisted | Green badge, commit ID |
| `DEPLOYED` | Change active in target runtime | Green badge, runtime indicator |
| `DISCONNECTED` | Runtime or service unavailable | Red border, disconnect message |

---

## 3. Preferred Transition Path

The canonical state transition path for all operations:

```
IDLE
  → DIRTY        (operator makes changes)
  → VALIDATING   (validation initiated)
  → VALID        (validation passed)
  → WARNING      (optional: admissible but flagged)
  → STAGED       (change prepared)
  → RUNNING      (execution initiated)
  → COMPLETE     (execution completed)
  → COMMITTED    (change persisted)
  → DEPLOYED     (change active in runtime)
```

### Alternative Paths

```
VALID → BLOCKED   (validation failed, policy violation)
RUNNING → FAULTED (execution error)
FAULTED → IDLE    (error acknowledged, reset)
BLOCKED → DIRTY   (correct and re-validate)
COMPLETE → STAGED (partial success, retry)
```

---

## 4. Invalid Shortcuts

The following state transitions are **prohibited** and will be rejected by guards:

```
DIRTY → RUNNING         (must validate and stage first)
PROPOSAL → DEPLOYED     (must validate, stage, execute)
AI SUGGESTION → COMMITTED  (must go through full lifecycle)
WARNING → EXECUTED WITHOUT ACKNOWLEDGEMENT
BLOCKED → OVERRIDDEN WITHOUT AUDIT
```

---

## 5. The 18 State Machines

### 5.1 workflowExecutionMachine

**Purpose:** Governs workflow lifecycle from draft through execution to completion.

**States:**

```text
                    +------------------+
                    |      IDLE        |
                    +--------+---------+
                             | edit
                    +--------v---------+
                    |      DIRTY       |
                    +--------+---------+
                             | validate
                    +--------v---------+     +-----------+
                    |   VALIDATING     |---->|  BLOCKED  |
                    +--------+---------+     +-----+-----+
                             |                   |
                    +--------v---------+         | correct
                    |      VALID       |<--------+
                    +--------+---------+
                             | stage
                    +--------v---------+
                    |      STAGED      |
                    +--------+---------+
                             | execute (AUTH_3)
                    +--------v---------+
                    |     RUNNING      |
                    +--------+---------+
                    | abort |
            +-------v------+   +-------v--------+
            |   COMPLETE   |   |    FAULTED     |
            +------+-------+   +-------+--------+
                   | commit |          | reset
           +-------v-------+   +-------v--------+
           |    COMMITTED  |   |      IDLE      |
           +-------+-------+   +----------------+
                   | deploy
           +-------v-------+
           |    DEPLOYED   |
           +---------------+
```

**Transitions:**

| From | To | Trigger | Guard |
|------|----|---------|-------|
| `IDLE` | `DIRTY` | `EDIT` | — |
| `DIRTY` | `VALIDATING` | `VALIDATE` | — |
| `VALIDATING` | `VALID` | `VALIDATION_PASSED` | — |
| `VALIDATING` | `BLOCKED` | `VALIDATION_FAILED` | — |
| `VALID` | `STAGED` | `STAGE` | Authority >= AUTH_2 |
| `BLOCKED` | `DIRTY` | `CORRECT` | — |
| `STAGED` | `RUNNING` | `EXECUTE` | Authority >= AUTH_3 |
| `RUNNING` | `COMPLETE` | `EXECUTION_COMPLETE` | — |
| `RUNNING` | `FAULTED` | `EXECUTION_ERROR` | — |
| `COMPLETE` | `COMMITTED` | `COMMIT` | Authority >= AUTH_4 |
| `COMMITTED` | `DEPLOYED` | `DEPLOY` | — |
| `RUNNING` | `IDLE` | `ABORT` | — |
| `FAULTED` | `IDLE` | `RESET` | — |

**Entry Actions:**

| State | Action |
|-------|--------|
| `RUNNING` | Start timer, emit trace event |
| `COMPLETE` | Calculate duration, emit trace event |
| `FAULTED` | Capture error, emit fault trace event |
| `COMMITTED` | Generate commit ID, emit commit trace event |

**Usage Example:**

```tsx
import { useMachine } from '@torafirma/state-machines';
import { workflowExecutionMachine } from './workflow.machine';

function WorkflowRunner({ workflow }) {
  const [state, send] = useMachine(workflowExecutionMachine, {
    input: { workflowId: workflow.id }
  });

  return (
    <div>
      <StateBadge state={state.value} />
      {state.matches('idle') && (
        <CommandButton
          command={{ id: 'edit', label: 'Edit workflow', commandClass: 'edit' }}
          onCommand={() => send({ type: 'EDIT' })}
        />
      )}
      {state.matches('dirty') && (
        <CommandButton
          command={{ id: 'validate', label: 'Validate', commandClass: 'validate' }}
          onCommand={() => send({ type: 'VALIDATE' })}
        />
      )}
      {state.matches('staged') && (
        <CommandButton
          command={{ id: 'execute', label: 'Execute run', commandClass: 'execute' }}
          variant="run"
          onCommand={() => send({ type: 'EXECUTE' })}
        />
      )}
      {state.matches('running') && (
        <CircuitBreakerButton
          active
          variant="abort"
          onTrip={() => send({ type: 'ABORT' })}
        />
      )}
    </div>
  );
}
```

---

### 5.2 graphEditMachine

**Purpose:** Manages graph editing operations.

**States:** `IDLE`, `DIRTY`, `VALIDATING`, `VALID`, `BLOCKED`, `STAGED`, `COMMITTED`, `DISCONNECTED`

**Transitions:**

| From | To | Trigger | Guard |
|------|----|---------|-------|
| `IDLE` | `DIRTY` | `NODE_ADDED` | — |
| `DIRTY` | `VALIDATING` | `VALIDATE` | — |
| `VALIDATING` | `VALID` | `VALIDATION_PASSED` | Graph has no cycles |
| `VALIDATING` | `BLOCKED` | `VALIDATION_FAILED` | — |
| `VALID` | `STAGED` | `STAGE` | Authority >= AUTH_2 |
| `BLOCKED` | `DIRTY` | `CORRECT` | — |
| `STAGED` | `COMMITTED` | `COMMIT` | Authority >= AUTH_4 |
| Any | `DISCONNECTED` | `DISCONNECT` | — |

---

### 5.3 deploymentMachine

**Purpose:** Controls deployment lifecycle.

**States:** `IDLE`, `PREPARING`, `STAGED`, `DEPLOYING`, `DEPLOYED`, `ROLLING_BACK`, `FAULTED`

**Transitions:**

| From | To | Trigger | Guard |
|------|----|---------|-------|
| `IDLE` | `PREPARING` | `PREPARE` | — |
| `PREPARING` | `STAGED` | `STAGE_READY` | All artifacts built |
| `STAGED` | `DEPLOYING` | `DEPLOY` | Authority >= AUTH_4 |
| `DEPLOYING` | `DEPLOYED` | `DEPLOYMENT_COMPLETE` | Health check passes |
| `DEPLOYING` | `FAULTED` | `DEPLOYMENT_FAILED` | — |
| `FAULTED` | `ROLLING_BACK` | `ROLLBACK` | — |
| `ROLLING_BACK` | `IDLE` | `ROLLBACK_COMPLETE` | — |

---

### 5.4 authorityEscalationMachine

**Purpose:** Manages authority level transitions.

**States:** `IDLE`, `REQUESTED`, `PENDING_APPROVAL`, `APPROVED`, `DENIED`, `EXPIRED`

**Transitions:**

| From | To | Trigger | Guard |
|------|----|---------|-------|
| `IDLE` | `REQUESTED` | `REQUEST` | Target authority > current |
| `REQUESTED` | `PENDING_APPROVAL` | `SUBMIT` | Reason provided |
| `PENDING_APPROVAL` | `APPROVED` | `APPROVE` | Approver has higher authority |
| `PENDING_APPROVAL` | `DENIED` | `DENY` | — |
| `APPROVED` | `EXPIRED` | `EXPIRE` | Time limit reached |
| `DENIED` | `IDLE` | `DISMISS` | — |

---

### 5.5 validationMachine

**Purpose:** Governs validation operations.

**States:** `IDLE`, `VALIDATING`, `VALID`, `WARNING`, `BLOCKED`

**Transitions:**

| From | To | Trigger | Guard |
|------|----|---------|-------|
| `IDLE` | `VALIDATING` | `START` | — |
| `VALIDATING` | `VALID` | `ALL_PASSED` | All checks passed |
| `VALIDATING` | `WARNING` | `WARNINGS_FOUND` | Warnings but no errors |
| `VALIDATING` | `BLOCKED` | `ERRORS_FOUND` | Errors found |
| `BLOCKED` | `IDLE` | `RESET` | — |
| `WARNING` | `IDLE` | `ACKNOWLEDGE` | — |

---

### 5.6 stagingMachine

**Purpose:** Controls the staging process.

**States:** `IDLE`, `DIRTY`, `STAGING`, `STAGED`, `COMMITTING`, `COMMITTED`, `CONFLICTED`

**Transitions:**

| From | To | Trigger | Guard |
|------|----|---------|-------|
| `IDLE` | `DIRTY` | `MODIFY` | — |
| `DIRTY` | `STAGING` | `STAGE` | Validation passed |
| `STAGING` | `STAGED` | `STAGE_COMPLETE` | No conflicts |
| `STAGING` | `CONFLICTED` | `CONFLICT_DETECTED` | Merge conflict |
| `CONFLICTED` | `STAGING` | `RESOLVE` | All conflicts resolved |
| `STAGED` | `COMMITTING` | `COMMIT` | Authority >= AUTH_4 |
| `COMMITTING` | `COMMITTED` | `COMMIT_COMPLETE` | — |

---

### 5.7 runtimeLifecycleMachine

**Purpose:** Manages runtime connection state.

**States:** `DISCONNECTED`, `CONNECTING`, `CONNECTED`, `HEALTH_CHECKING`, `HEALTHY`, `DEGRADED`, `FAULTED`

**Transitions:**

| From | To | Trigger | Guard |
|------|----|---------|-------|
| `DISCONNECTED` | `CONNECTING` | `CONNECT` | — |
| `CONNECTING` | `CONNECTED` | `CONNECTION_ESTABLISHED` | — |
| `CONNECTED` | `HEALTH_CHECKING` | `CHECK_HEALTH` | — |
| `HEALTH_CHECKING` | `HEALTHY` | `HEALTHY` | All checks pass |
| `HEALTH_CHECKING` | `DEGRADED` | `DEGRADED` | Some checks fail |
| `HEALTHY` | `DEGRADED` | `METRIC_DEGRADED` | SLA breach |
| `DEGRADED` | `HEALTHY` | `METRIC_RECOVERED` | SLA restored |
| `DEGRADED` | `FAULTED` | `CRITICAL_FAILURE` | — |
| `FAULTED` | `DISCONNECTED` | `DISCONNECT` | — |

---

### 5.8 traceSessionMachine

**Purpose:** Governs trace session lifecycle.

**States:** `CLOSED`, `OPENING`, `OPEN`, `PAUSED`, `FILTERING`, `EXPORTING`, `CLOSING`

**Transitions:**

| From | To | Trigger | Guard |
|------|----|---------|-------|
| `CLOSED` | `OPENING` | `OPEN` | — |
| `OPENING` | `OPEN` | `SESSION_ESTABLISHED` | — |
| `OPEN` | `PAUSED` | `PAUSE` | — |
| `PAUSED` | `OPEN` | `RESUME` | — |
| `OPEN` | `FILTERING` | `APPLY_FILTER` | — |
| `FILTERING` | `OPEN` | `CLEAR_FILTER` | — |
| `OPEN` | `EXPORTING` | `EXPORT` | — |
| `EXPORTING` | `OPEN` | `EXPORT_COMPLETE` | — |
| `OPEN` | `CLOSING` | `CLOSE` | — |
| `CLOSING` | `CLOSED` | `SESSION_CLOSED` | — |

---

### 5.9 commandDispatchMachine

**Purpose:** Controls command dispatch and execution.

**States:** `IDLE`, `VALIDATING`, `QUEUED`, `EXECUTING`, `COMPLETED`, `FAILED`, `REJECTED`

**Transitions:**

| From | To | Trigger | Guard |
|------|----|---------|-------|
| `IDLE` | `VALIDATING` | `DISPATCH` | — |
| `VALIDATING` | `QUEUED` | `VALID` | Queue not full |
| `VALIDATING` | `REJECTED` | `INVALID` | Validation failed |
| `QUEUED` | `EXECUTING` | `DEQUEUE` | Resource available |
| `EXECUTING` | `COMPLETED` | `SUCCESS` | — |
| `EXECUTING` | `FAILED` | `ERROR` | — |
| `FAILED` | `IDLE` | `RETRY` | Retry count < max |
| `REJECTED` | `IDLE` | `DISMISS` | — |

---

### 5.10 aiAssistedEditMachine

**Purpose:** Manages AI-assisted editing lifecycle.

**States:** `IDLE`, `INTENT_INPUT`, `GENERATING`, `PROPOSAL_READY`, `REVIEWING`, `APPLYING`, `APPLIED`, `REJECTED`, `FAULTED`

**Transitions:**

| From | To | Trigger | Guard |
|------|----|---------|-------|
| `IDLE` | `INTENT_INPUT` | `START_INTENT` | — |
| `INTENT_INPUT` | `GENERATING` | `SUBMIT_INTENT` | Intent is valid |
| `GENERATING` | `PROPOSAL_READY` | `PROPOSAL_GENERATED` | — |
| `GENERATING` | `FAULTED` | `GENERATION_FAILED` | — |
| `PROPOSAL_READY` | `REVIEWING` | `INSPECT` | — |
| `REVIEWING` | `APPLYING` | `ACCEPT` | Authority check passed |
| `REVIEWING` | `REJECTED` | `REJECT` | — |
| `APPLYING` | `APPLIED` | `APPLY_COMPLETE` | — |
| `FAULTED` | `IDLE` | `RESET` | — |
| `REJECTED` | `IDLE` | `DISMISS` | — |

**Note:** AI suggestions cannot bypass the full lifecycle. `APPLIED` state transitions to `DIRTY` in the parent machine, requiring validation and staging before commitment.

---

### 5.11 policyEnforcementMachine

**Purpose:** Governs policy gate resolution.

**States:** `IDLE`, `EVALUATING`, `COMPLIANT`, `VIOLATION`, `OVERRIDDEN`, `ESCALATING`

**Transitions:**

| From | To | Trigger | Guard |
|------|----|---------|-------|
| `IDLE` | `EVALUATING` | `EVALUATE` | — |
| `EVALUATING` | `COMPLIANT` | `ALL_PASS` | All rules pass |
| `EVALUATING` | `VIOLATION` | `RULE_VIOLATED` | Rule violation |
| `VIOLATION` | `OVERRIDDEN` | `OVERRIDE` | Authority >= AUTH_5 |
| `VIOLATION` | `ESCALATING` | `ESCALATE` | — |
| `ESCALATING` | `OVERRIDDEN` | `ESCALATION_APPROVED` | — |
| `ESCALATING` | `VIOLATION` | `ESCALATION_DENIED` | — |
| `OVERRIDDEN` | `IDLE` | `EXPIRE` | Override expired |

---

### 5.12 bulkOperationMachine

**Purpose:** Controls bulk operation lifecycle.

**States:** `IDLE`, `SELECTING`, `SELECTED`, `VALIDATING`, `STAGING`, `EXECUTING`, `COMPLETED`, `PARTIAL_FAILURE`, `FAULTED`

**Transitions:**

| From | To | Trigger | Guard |
|------|----|---------|-------|
| `IDLE` | `SELECTING` | `START_SELECTION` | — |
| `SELECTING` | `SELECTED` | `CONFIRM_SELECTION` | At least 1 item selected |
| `SELECTED` | `VALIDATING` | `VALIDATE` | — |
| `VALIDATING` | `STAGING` | `ALL_VALID` | — |
| `VALIDATING` | `SELECTED` | `SOME_INVALID` | — |
| `STAGING` | `EXECUTING` | `EXECUTE` | Authority >= AUTH_3 |
| `EXECUTING` | `COMPLETED` | `ALL_SUCCESS` | — |
| `EXECUTING` | `PARTIAL_FAILURE` | `SOME_FAILED` | — |
| `EXECUTING` | `FAULTED` | `ALL_FAILED` | — |
| `PARTIAL_FAILURE` | `IDLE` | `ACKNOWLEDGE` | — |

---

### 5.13 circuitBreakerMachine

**Purpose:** Manages circuit breaker state.

**States:** `CLOSED`, `HALF_OPEN`, `OPEN`, `TRIPPED`, `RESETTING`

**Transitions:**

| From | To | Trigger | Guard |
|------|----|---------|-------|
| `CLOSED` | `TRIPPED` | `TRIP` | Failure threshold exceeded |
| `TRIPPED` | `OPEN` | `CONFIRM_TRIP` | — |
| `OPEN` | `RESETTING` | `RESET_ATTEMPT` | Timeout elapsed |
| `RESETTING` | `HALF_OPEN` | `TEST_REQUEST` | — |
| `HALF_OPEN` | `CLOSED` | `TEST_PASSED` | — |
| `HALF_OPEN` | `OPEN` | `TEST_FAILED` | — |

---

### 5.14 dataCorrectionMachine

**Purpose:** Governs data correction workflow.

**States:** `IDLE`, `IDENTIFYING`, `IDENTIFIED`, `PROPOSING`, `PROPOSED`, `REVIEWING`, `APPLYING`, `APPLIED`, `REJECTED`, `FAULTED`

**Transitions:**

| From | To | Trigger | Guard |
|------|----|---------|-------|
| `IDLE` | `IDENTIFYING` | `SCAN` | — |
| `IDENTIFYING` | `IDENTIFIED` | `SCAN_COMPLETE` | Issues found |
| `IDENTIFIED` | `PROPOSING` | `GENERATE_FIXES` | — |
| `PROPOSING` | `PROPOSED` | `FIXES_GENERATED` | — |
| `PROPOSED` | `REVIEWING` | `REVIEW` | — |
| `REVIEWING` | `APPLYING` | `ACCEPT` | Authority >= AUTH_4 |
| `REVIEWING` | `REJECTED` | `REJECT` | — |
| `APPLYING` | `APPLIED` | `APPLY_COMPLETE` | — |
| `APPLYING` | `FAULTED` | `APPLY_FAILED` | — |
| `FAULTED` | `IDLE` | `RESET` | — |

---

### 5.15 sessionGovernanceMachine

**Purpose:** Manages user session authority.

**States:** `UNAUTHENTICATED`, `AUTHENTICATING`, `AUTHENTICATED`, `AUTHORIZED`, `EXPIRING`, `EXPIRED`, `LOCKED`

**Transitions:**

| From | To | Trigger | Guard |
|------|----|---------|-------|
| `UNAUTHENTICATED` | `AUTHENTICATING` | `LOGIN` | — |
| `AUTHENTICATING` | `AUTHENTICATED` | `LOGIN_SUCCESS` | — |
| `AUTHENTICATED` | `AUTHORIZED` | `AUTHORITY_ASSIGNED` | — |
| `AUTHORIZED` | `EXPIRING` | `WARNING` | Expiry approaching |
| `EXPIRING` | `EXPIRED` | `EXPIRE` | — |
| `EXPIRING` | `AUTHORIZED` | `EXTEND` | Re-authenticated |
| `AUTHORIZED` | `LOCKED` | `IDLE_TIMEOUT` | — |
| `LOCKED` | `AUTHORIZED` | `UNLOCK` | Re-authenticated |
| `EXPIRED` | `UNAUTHENTICATED` | `LOGOUT` | — |

---

### 5.16 emergencyBreakMachine

**Purpose:** Controls emergency stop procedures.

**States:** `ARMED`, `TRIGGERED`, `CONFIRMING`, `EXECUTING`, `COMPLETED`, `FAILED`

**Transitions:**

| From | To | Trigger | Guard |
|------|----|---------|-------|
| `ARMED` | `TRIGGERED` | `TRIP` | — |
| `TRIGGERED` | `CONFIRMING` | `REQUEST_CONFIRM` | — |
| `CONFIRMING` | `EXECUTING` | `CONFIRM` | Authority >= AUTH_3 |
| `CONFIRMING` | `ARMED` | `CANCEL` | — |
| `EXECUTING` | `COMPLETED` | `BREAK_COMPLETE` | — |
| `EXECUTING` | `FAILED` | `BREAK_FAILED` | — |
| `COMPLETED` | `ARMED` | `RESET` | Authority >= AUTH_5 |

---

### 5.17 auditTrailMachine

**Purpose:** Governs audit trail lifecycle.

**States:** `IDLE`, `COLLECTING`, `INDEXING`, `INDEXED`, `QUERYING`, `EXPORTING`, `PURGING`, `PURGED`

**Transitions:**

| From | To | Trigger | Guard |
|------|----|---------|-------|
| `IDLE` | `COLLECTING` | `START_COLLECTION` | — |
| `COLLECTING` | `INDEXING` | `COLLECTION_COMPLETE` | — |
| `INDEXING` | `INDEXED` | `INDEX_COMPLETE` | — |
| `INDEXED` | `QUERYING` | `QUERY` | — |
| `QUERYING` | `INDEXED` | `QUERY_COMPLETE` | — |
| `INDEXED` | `EXPORTING` | `EXPORT` | Authority >= AUTH_4 |
| `EXPORTING` | `INDEXED` | `EXPORT_COMPLETE` | — |
| `INDEXED` | `PURGING` | `PURGE` | Authority >= AUTH_6 |
| `PURGING` | `PURGED` | `PURGE_COMPLETE` | — |

---

### 5.18 componentLifecycleMachine

**Purpose:** Manages component mount/unmount states and error boundaries.

**States:** `UNMOUNTED`, `MOUNTING`, `MOUNTED`, `LOADING`, `READY`, `ERROR`, `UNMOUNTING`

**Transitions:**

| From | To | Trigger | Guard |
|------|----|---------|-------|
| `UNMOUNTED` | `MOUNTING` | `MOUNT` | — |
| `MOUNTING` | `MOUNTED` | `MOUNT_SUCCESS` | — |
| `MOUNTING` | `ERROR` | `MOUNT_ERROR` | — |
| `MOUNTED` | `LOADING` | `LOAD` | — |
| `LOADING` | `READY` | `LOAD_SUCCESS` | — |
| `LOADING` | `ERROR` | `LOAD_ERROR` | — |
| `READY` | `LOADING` | `REFRESH` | — |
| `ERROR` | `MOUNTED` | `RETRY` | — |
| `READY` | `UNMOUNTING` | `UNMOUNT` | — |
| `UNMOUNTING` | `UNMOUNTED` | `UNMOUNT_COMPLETE` | — |

---

## 6. useMachine Hook

### 6.1 Usage

```tsx
import { useMachine } from '@torafirma/state-machines';

function MyComponent() {
  const [state, send, actorRef] = useMachine(myMachine, {
    input: { initialValue: 'hello' }
  });

  // Check current state
  const isRunning = state.matches('running');
  const isComplete = state.matches('complete');

  // Access context
  const { count } = state.context;

  // Check if a transition is available
  const canExecute = state.can({ type: 'EXECUTE' });

  // Send events
  const handleClick = () => send({ type: 'EXECUTE' });

  // Access state value
  const currentState = state.value; // 'running', 'complete', etc.

  return (
    <div>
      <StateBadge state={state.value} />
      {isRunning && <CircuitBreaker onTrip={() => send({ type: 'ABORT' })} />}
      {canExecute && (
        <CommandButton
          command={{ id: 'execute', label: 'Execute', commandClass: 'execute' }}
          onCommand={handleClick}
        />
      )}
    </div>
  );
}
```

### 6.2 Hook API

| Return | Type | Description |
|--------|------|-------------|
| `state` | `State` | Current machine state |
| `send` | `SendFunction` | Function to send events |
| `actorRef` | `ActorRef` | Reference to the actor instance |

### 6.3 State Object

| Property | Type | Description |
|----------|------|-------------|
| `value` | `string` | Current state name |
| `context` | `TContext` | Machine context (typed) |
| `matches` | `(state: string) => boolean` | Check if in state |
| `can` | `(event: Event) => boolean` | Check if transition available |
| `hasTag` | `(tag: string) => boolean` | Check if state has tag |

---

## State Machine Summary

| # | Machine | States | Key Guards |
|---|---------|--------|------------|
| 1 | workflowExecutionMachine | 10 | Authority >= AUTH_3 to execute |
| 2 | graphEditMachine | 8 | No cycles in graph |
| 3 | deploymentMachine | 7 | Health check passes |
| 4 | authorityEscalationMachine | 6 | Approver has higher authority |
| 5 | validationMachine | 5 | All checks passed |
| 6 | stagingMachine | 7 | No merge conflicts |
| 7 | runtimeLifecycleMachine | 7 | SLA thresholds |
| 8 | traceSessionMachine | 7 | Session established |
| 9 | commandDispatchMachine | 7 | Queue capacity |
| 10 | aiAssistedEditMachine | 9 | Authority check on accept |
| 11 | policyEnforcementMachine | 6 | Authority >= AUTH_5 for override |
| 12 | bulkOperationMachine | 9 | At least 1 item selected |
| 13 | circuitBreakerMachine | 5 | Failure threshold |
| 14 | dataCorrectionMachine | 10 | Authority >= AUTH_4 to apply |
| 15 | sessionGovernanceMachine | 7 | Re-authentication |
| 16 | emergencyBreakMachine | 6 | Authority >= AUTH_3 |
| 17 | auditTrailMachine | 8 | Authority >= AUTH_6 to purge |
| 18 | componentLifecycleMachine | 7 | — |
