# 10 — Common Patterns

> Battle-tested design patterns for building Torafirma products. Each pattern includes the problem, solution, implementation, and state machine integration.

---

## Table of Contents

1. [Command Execution Pattern](#1-command-execution-pattern)
2. [Authority Escalation Pattern](#2-authority-escalation-pattern)
3. [Staged Deployment Pattern](#3-staged-deployment-pattern)
4. [Bulk Operation Pattern](#4-bulk-operation-pattern)
5. [Real-Time Monitoring Pattern](#5-real-time-monitoring-pattern)
6. [AI-Assisted Editing Pattern](#6-ai-assisted-editing-pattern)
7. [Emergency Break Pattern](#7-emergency-break-pattern)
8. [Audit Trail Pattern](#8-audit-trail-pattern)

---

## 1. Command Execution Pattern

### Problem

Execute a command against a system while ensuring proper validation, authority checks, and trace logging.

### Solution

```tsx
// CommandExecution.tsx
import { useMachine } from '@torafirma/state-machines';
import { commandDispatchMachine } from './machines';

function CommandExecution({ command, onComplete }) {
  const [state, send] = useMachine(commandDispatchMachine, {
    input: { command }
  });

  return (
    <div>
      {/* State indicator */}
      <StateBadge state={mapToComponentState(state.value)} />

      {/* Idle state: show execute button */}
      {state.matches('idle') && (
        <CommandButton
          command={command}
          variant={command.commandClass === 'execute' ? 'run' : 'neutral'}
          onCommand={() => send({ type: 'DISPATCH', command })}
        />
      )}

      {/* Validating: show spinner */}
      {state.matches('validating') && (
        <LoadingState message="Validating command..." />
      )}

      {/* Executing: show progress */}
      {state.matches('executing') && (
        <div>
          <ProgressBar value={state.context.progress} />
          <CircuitBreakerButton
            active
            variant="abort"
            onTrip={() => send({ type: 'ABORT' })}
          />
        </div>
      )}

      {/* Completed: show success */}
      {state.matches('completed') && (
        <StateBadge state="COMPLETE" />
      )}

      {/* Failed: show error and retry */}
      {state.matches('failed') && (
        <ErrorState
          error={state.context.error}
          onRetry={() => send({ type: 'RETRY' })}
        />
      )}

      {/* Rejected: show reason */}
      {state.matches('rejected') && (
        <ErrorState
          error={state.context.rejectionReason}
          onDismiss={() => send({ type: 'DISMISS' })}
        />
      )}
    </div>
  );
}
```

### State Machine

```
IDLE → VALIDATING → QUEUED → EXECUTING → COMPLETED
                          ↓              ↓
                       REJECTED       FAILED
                                         ↑
                                      RETRY
```

### Key Points

- Always show state near the action button
- Provide abort capability during execution
- Log all transitions to trace
- Handle failure with retry option

---

## 2. Authority Escalation Pattern

### Problem

An operator needs to perform an action that requires higher authority than they currently possess.

### Solution

```tsx
// AuthorityEscalation.tsx
import { useMachine } from '@torafirma/state-machines';
import { authorityEscalationMachine } from './machines';

function AuthorityEscalation({
  requiredAuthority,
  currentAuthority,
  onEscalated,
  children
}) {
  const [state, send] = useMachine(authorityEscalationMachine, {
    input: { requiredAuthority, currentAuthority }
  });

  // Check if current authority is sufficient
  const hasAuthority = authorityRank(currentAuthority) >=
                       authorityRank(requiredAuthority);

  if (hasAuthority) {
    return <>{children}</>;
  }

  return (
    <div>
      {/* Show authority requirement */}
      <AuthorityRequiredMessage
        required={requiredAuthority}
        current={currentAuthority}
      />

      {/* Request escalation button */}
      {state.matches('idle') && (
        <CommandButton
          command={{
            id: 'escalate',
            label: 'Request authority',
            commandClass: 'override'
          }}
          variant="authority"
          onCommand={() => send({ type: 'REQUEST' })}
        />
      )}

      {/* Escalation form */}
      {state.matches('requested') && (
        <OverridePanel
          requestedAuthority={requiredAuthority}
          currentAuthority={currentAuthority}
          onConfirm={(reason) => send({ type: 'SUBMIT', reason })}
          onCancel={() => send({ type: 'CANCEL' })}
        />
      )}

      {/* Pending approval */}
      {state.matches('pending_approval') && (
        <LoadingState message="Awaiting approval..." />
      )}

      {/* Approved: show protected content */}
      {state.matches('approved') && (
        <>
          <AuthorityBadge authority={requiredAuthority} temporary />
          {children}
        </>
      )}

      {/* Denied */}
      {state.matches('denied') && (
        <ErrorState
          error="Authority escalation denied."
          onDismiss={() => send({ type: 'DISMISS' })}
        />
      )}
    </div>
  );
}
```

### State Machine

```
IDLE → REQUESTED → PENDING_APPROVAL → APPROVED
                          ↓
                       DENIED
```

### Key Points

- Always show current vs required authority
- Require reason for escalation
- Show affected objects
- Log all escalation attempts to audit trail
- Temporary escalation must expire

---

## 3. Staged Deployment Pattern

### Problem

Deploy changes to production only after validation, staging, and explicit approval.

### Solution

```tsx
// StagedDeployment.tsx
import { useMachine } from '@torafirma/state-machines';
import { deploymentMachine } from './machines';

function StagedDeployment({ artifact, targetRuntime }) {
  const [state, send] = useMachine(deploymentMachine, {
    input: { artifact, targetRuntime }
  });

  return (
    <div>
      <ProgressTracker
        steps={['Prepare', 'Stage', 'Validate', 'Deploy', 'Verify']}
        currentStep={getCurrentStep(state.value)}
      />

      {/* Idle: start preparation */}
      {state.matches('idle') && (
        <CommandButton
          command={{ id: 'prepare', label: 'Prepare deployment', commandClass: 'stage' }}
          onCommand={() => send({ type: 'PREPARE' })}
        />
      )}

      {/* Preparing: show progress */}
      {state.matches('preparing') && (
        <LoadingState message="Preparing deployment artifacts..." />
      )}

      {/* Staged: show validation results */}
      {state.matches('staged') && (
        <div>
          <ValidationSummary results={state.context.validationResults} />
          <CommandButton
            command={{ id: 'deploy', label: 'Deploy to production', commandClass: 'deploy' }}
            variant="run"
            onCommand={() => send({ type: 'DEPLOY' })}
          />
        </div>
      )}

      {/* Deploying: show progress with abort */}
      {state.matches('deploying') && (
        <div>
          <ProgressBar value={state.context.deployProgress} />
          <CircuitBreakerButton
            active
            variant="abort"
            onTrip={() => send({ type: 'ABORT' })}
          />
        </div>
      )}

      {/* Deployed: show success */}
      {state.matches('deployed') && (
        <StateBadge state="DEPLOYED" />
      )}

      {/* Faulted: show error with rollback */}
      {state.matches('faulted') && (
        <div>
          <ErrorState error={state.context.error} />
          <CommandButton
            command={{ id: 'rollback', label: 'Rollback deployment', commandClass: 'abort' }}
            variant="stop"
            onCommand={() => send({ type: 'ROLLBACK' })}
          />
        </div>
      )}
    </div>
  );
}
```

### State Machine

```
IDLE → PREPARING → STAGED → DEPLOYING → DEPLOYED
                                      ↓
                                   FAULTED → ROLLING_BACK → IDLE
```

### Key Points

- Every step must be validated
- Deployment must be abortable
- Faulted deployments must support rollback
- All steps produce trace events
- Authority >= AUTH_4 required for deploy

---

## 4. Bulk Operation Pattern

### Problem

Perform an operation on multiple items with validation, progress tracking, and partial failure handling.

### Solution

```tsx
// BulkOperation.tsx
import { useMachine } from '@torafirma/state-machines';
import { bulkOperationMachine } from './machines';

function BulkOperation({ items, operation }) {
  const [state, send] = useMachine(bulkOperationMachine, {
    input: { items, operation }
  });

  return (
    <div>
      {/* Selection phase */}
      {state.matches('selecting') && (
        <div>
          <DataTable
            data={items}
            selectable="multi"
            onSelectionChange={(sel) => send({ type: 'SELECT', items: sel })}
          />
          <CommandButton
            command={{ id: 'confirm', label: 'Confirm selection', commandClass: 'stage' }}
            disabled={state.context.selected.length === 0}
            onCommand={() => send({ type: 'CONFIRM_SELECTION' })}
          />
        </div>
      )}

      {/* Selected: show summary */}
      {state.matches('selected') && (
        <div>
          <p>{state.context.selected.length} items selected</p>
          <CommandButton
            command={{ id: 'validate', label: 'Validate selection', commandClass: 'validate' }}
            onCommand={() => send({ type: 'VALIDATE' })}
          />
        </div>
      )}

      {/* Validating */}
      {state.matches('validating') && (
        <LoadingState message={`Validating ${state.context.selected.length} items...`} />
      )}

      {/* Executing: show progress */}
      {state.matches('executing') && (
        <div>
          <ProgressBar
            value={state.context.completed}
            max={state.context.selected.length}
          />
          <p>{state.context.completed} of {state.context.selected.length} completed</p>
          <CircuitBreakerButton
            active
            variant="abort"
            onTrip={() => send({ type: 'ABORT' })}
          />
        </div>
      )}

      {/* Completed */}
      {state.matches('completed') && (
        <StateBadge state="COMPLETE" />
      )}

      {/* Partial failure: show results */}
      {state.matches('partial_failure') && (
        <div>
          <h3>Results</h3>
          <p>Success: {state.context.succeeded.length}</p>
          <p>Failed: {state.context.failed.length}</p>
          <DataTable data={state.context.failed} />
          <CommandButton
            command={{ id: 'retry', label: 'Retry failed', commandClass: 'retry' }}
            onCommand={() => send({ type: 'RETRY_FAILED' })}
          />
        </div>
      )}
    </div>
  );
}
```

### State Machine

```
IDLE → SELECTING → SELECTED → VALIDATING → STAGING → EXECUTING
                                                          ↓
                                              COMPLETED / PARTIAL_FAILURE / FAULTED
```

### Key Points

- Allow item selection with clear summary
- Validate all items before execution
- Show progress with item count
- Handle partial failure gracefully
- Provide retry for failed items
- All results produce trace events

---

## 5. Real-Time Monitoring Pattern

### Problem

Display real-time system metrics with state indicators, thresholds, and alerting.

### Solution

```tsx
// RealTimeMonitor.tsx
function RealTimeMonitor({ systemId }) {
  const [metrics, setMetrics] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [systemState, setSystemState] = useState('HEALTHY');

  useEffect(() => {
    const ws = new WebSocket(`wss://api.torafirma/metrics/${systemId}`);
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMetrics(prev => [...prev.slice(-100), data]);

      // Check thresholds
      if (data.cpu > 90 || data.memory > 90) {
        setSystemState('DEGRADED');
        setAlerts(prev => [...prev, {
          id: crypto.randomUUID(),
          severity: 'warning',
          message: `High resource usage: CPU ${data.cpu}%, Memory ${data.memory}%`,
          timestamp: data.timestamp
        }]);
      }

      if (data.cpu > 95 || data.memory > 95) {
        setSystemState('CRITICAL');
      }
    };
    return () => ws.close();
  }, [systemId]);

  return (
    <div>
      {/* System state */}
      <StatusBanner status={systemState} />

      {/* Metric cards */}
      <div className="grid grid-cols-4 gap-4">
        <MetricCard
          label="CPU"
          value={metrics[metrics.length - 1]?.cpu}
          unit="%"
          trend={getTrend(metrics, 'cpu')}
          state={metrics[metrics.length - 1]?.cpu > 90 ? 'warning' : 'ready'}
        />
        <MetricCard
          label="Memory"
          value={metrics[metrics.length - 1]?.memory}
          unit="%"
          trend={getTrend(metrics, 'memory')}
        />
        <MetricCard
          label="Throughput"
          value={metrics[metrics.length - 1]?.throughput}
          unit="ops/s"
          trend={getTrend(metrics, 'throughput')}
        />
        <MetricCard
          label="Latency"
          value={metrics[metrics.length - 1]?.latency}
          unit="ms"
          trend={getTrend(metrics, 'latency')}
        />
      </div>

      {/* Charts */}
      <LineChart
        data={metrics}
        series={[
          { key: 'cpu', label: 'CPU %', color: 'var(--tf-green)' },
          { key: 'memory', label: 'Memory %', color: 'var(--tf-blue)' }
        ]}
        thresholds={[
          { value: 90, label: 'Warning', color: 'var(--tf-amber)' },
          { value: 95, label: 'Critical', color: 'var(--tf-red)' }
        ]}
      />

      {/* Alerts */}
      {alerts.length > 0 && (
        <AlertWidget
          alerts={alerts}
          onDismiss={(id) => setAlerts(prev => prev.filter(a => a.id !== id))}
        />
      )}

      {/* Health indicator */}
      <HealthIndicator
        health={systemState === 'HEALTHY' ? 'healthy' :
                systemState === 'DEGRADED' ? 'degraded' : 'critical'}
        label={systemId}
      />
    </div>
  );
}
```

### Key Points

- Use WebSocket for real-time data
- Show state at a glance with signal lights
- Alert on threshold breaches
- Keep historical data for trend analysis
- Provide abort/breaker for critical states

---

## 6. AI-Assisted Editing Pattern

### Problem

Allow operators to use AI to suggest changes while maintaining full governance and validation.

### Solution

```tsx
// AIAssistedEdit.tsx
import { useMachine } from '@torafirma/state-machines';
import { aiAssistedEditMachine } from './machines';

function AIAssistedEdit({ object, schema }) {
  const [state, send] = useMachine(aiAssistedEditMachine);

  return (
    <div>
      {/* Intent input */}
      <IntentInput
        placeholder="Describe what you want to change..."
        state={mapToComponentState(state.value)}
        onSubmit={(intent) => send({ type: 'SUBMIT_INTENT', intent })}
      />

      {/* Thinking indicator */}
      {state.matches('generating') && (
        <AIThinkingIndicator />
      )}

      {/* Proposal ready: show diff */}
      {state.matches('proposal_ready') && (
        <div>
          <AIDiffViewer
            before={state.context.original}
            after={state.context.proposed}
            changes={state.context.changes}
          />
          <div className="flex gap-2">
            <CommandButton
              command={{ id: 'inspect', label: 'Inspect', commandClass: 'inspect' }}
              variant="inspect"
              onCommand={() => send({ type: 'INSPECT' })}
            />
            <CommandButton
              command={{ id: 'accept', label: 'Accept proposal', commandClass: 'stage' }}
              variant="run"
              onCommand={() => send({ type: 'ACCEPT' })}
            />
            <CommandButton
              command={{ id: 'reject', label: 'Reject', commandClass: 'abort' }}
              variant="stop"
              onCommand={() => send({ type: 'REJECT' })}
            />
          </div>
        </div>
      )}

      {/* Reviewing: detailed review */}
      {state.matches('reviewing') && (
        <div>
          <PropertyInspector
            object={state.context.proposed}
            schema={schema}
            state="reviewing"
          />
          <DraftStagingBand
            draftCount={state.context.changes.length}
            onStage={() => send({ type: 'STAGE' })}
            onDiscard={() => send({ type: 'REJECT' })}
          />
        </div>
      )}

      {/* Applied */}
      {state.matches('applied') && (
        <StateBadge state="STAGED" />
      )}

      {/* Faulted */}
      {state.matches('faulted') && (
        <ErrorState
          error={state.context.error}
          onRetry={() => send({ type: 'RESET' })}
        />
      )}
    </div>
  );
}
```

### State Machine

```
IDLE → INTENT_INPUT → GENERATING → PROPOSAL_READY → REVIEWING → APPLYING → APPLIED
                                                          ↓                        ↑
                                                       REJECTED → IDLE            REJECT
                                                                    ↑
                                                                 FAULTED → RESET
```

### Key Points

- AI suggestions cannot bypass full lifecycle
- Always show diff before applying
- Require explicit acceptance
- Log AI interactions to trace
- Maintain operator authority throughout

---

## 7. Emergency Break Pattern

### Problem

Provide an always-accessible emergency stop control that can halt operations immediately.

### Solution

```tsx
// EmergencyBreak.tsx
import { useMachine } from '@torafirma/state-machines';
import { emergencyBreakMachine } from './machines';

function EmergencyBreak({ targetSystem }) {
  const [state, send] = useMachine(emergencyBreakMachine, {
    input: { targetSystem }
  });

  return (
    <div className="emergency-break-container">
      {/* Armed: show ready breaker */}
      {state.matches('armed') && (
        <EmergencyBreaker
          active={false}
          target={targetSystem}
          onTrip={() => send({ type: 'TRIP' })}
        />
      )}

      {/* Triggered: flash and request confirmation */}
      {state.matches('triggered') && (
        <div className="emergency-flash">
          <StateBadge state="FAULTED" pulse />
          <p>Emergency stop triggered for {targetSystem}</p>
          <CommandButton
            command={{ id: 'confirm', label: 'Confirm emergency stop', commandClass: 'abort' }}
            variant="stop"
            onCommand={() => send({ type: 'CONFIRM' })}
          />
          <CommandButton
            command={{ id: 'cancel', label: 'Cancel', commandClass: 'cancel' }}
            variant="neutral"
            onCommand={() => send({ type: 'CANCEL' })}
          />
        </div>
      )}

      {/* Confirming: authority check */}
      {state.matches('confirming') && (
        <AuthorityGate
          requiredAuthority="AUTH_3_EXECUTE"
          onEscalate={() => send({ type: 'ESCALATE' })}
        >
          <CommandButton
            command={{ id: 'execute', label: 'Execute emergency stop', commandClass: 'abort' }}
            variant="stop"
            onCommand={() => send({ type: 'CONFIRM' })}
          />
        </AuthorityGate>
      )}

      {/* Executing */}
      {state.matches('executing') && (
        <LoadingState message="Executing emergency stop..." />
      )}

      {/* Completed */}
      {state.matches('completed') && (
        <div>
          <StateBadge state="COMPLETE" />
          <p>Emergency stop executed. {targetSystem} has been halted.</p>
          <CommandButton
            command={{ id: 'reset', label: 'Reset breaker', commandClass: 'reset' }}
            onCommand={() => send({ type: 'RESET' })}
          />
        </div>
      )}

      {/* Failed */}
      {state.matches('failed') && (
        <ErrorState
          error="Emergency stop failed to execute. Contact system administrator."
          severity="critical"
        />
      )}
    </div>
  );
}
```

### State Machine

```
ARMED → TRIGGERED → CONFIRMING → EXECUTING → COMPLETED
              ↓         ↓
           CANCEL    ESCALATING
                        ↓
                     CONFIRMING
```

### Key Points

- Breaker must be always visible, never buried
- Require explicit confirmation
- Authority check on confirmation
- Log to audit trail
- Flash and pulse when triggered
- Never auto-reset; always require manual reset

---

## 8. Audit Trail Pattern

### Problem

Provide a comprehensive, immutable audit trail of all significant actions in the system.

### Solution

```tsx
// AuditTrail.tsx
function AuditTrail({ objectId, objectType }) {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState({});

  useEffect(() => {
    fetchAuditEvents(objectId, objectType).then(setEvents);
  }, [objectId, objectType]);

  const filteredEvents = events.filter(event => {
    if (filter.actor && event.actor !== filter.actor) return false;
    if (filter.operation && event.operation !== filter.operation) return false;
    if (filter.dateFrom && event.timestamp < filter.dateFrom) return false;
    if (filter.dateTo && event.timestamp > filter.dateTo) return false;
    return true;
  });

  return (
    <div>
      {/* Filter bar */}
      <FilterBar
        filters={[
          { key: 'actor', label: 'Actor', type: 'text' },
          { key: 'operation', label: 'Operation', type: 'select', options: operations },
          { key: 'dateFrom', label: 'From', type: 'date' },
          { key: 'dateTo', label: 'To', type: 'date' }
        ]}
        values={filter}
        onChange={setFilter}
      />

      {/* Event count */}
      <p>{filteredEvents.length} events found</p>

      {/* Event table */}
      <DataTable
        data={filteredEvents}
        columns={[
          { key: 'timestamp', header: 'Timestamp', sortable: true },
          { key: 'actor', header: 'Actor', sortable: true },
          { key: 'authority', header: 'Authority', sortable: true },
          { key: 'operation', header: 'Operation', sortable: true },
          { key: 'state_before', header: 'Before' },
          { key: 'state_after', header: 'After' },
          { key: 'result', header: 'Result' },
          { key: 'trace_id', header: 'Trace ID' }
        ]}
        density="compact"
      />

      {/* Export */}
      <CommandButton
        command={{ id: 'export', label: 'Export audit log', commandClass: 'export' }}
        variant="neutral"
        onCommand={() => exportAuditLog(filteredEvents)}
      />
    </div>
  );
}
```

### Audit Event Schema

```typescript
interface AuditEvent {
  event_id: string;       // Unique event identifier
  timestamp: string;      // ISO 8601 timestamp
  actor: string;          // User/system that performed action
  authority: string;      // Authority level at time of action
  operation: string;      // Operation performed
  target: string;         // Target object/system
  target_type: string;    // Type of target
  state_before: string;   // State before action
  state_after: string;    // State after action
  result: string;         // Action result
  reason?: string;        // Optional reason/justification
  trace_id: string;       // Link to trace event
  session_id: string;     // User session ID
  ip_address: string;     // Source IP
  immutable: boolean;     // True for audit events
}
```

### Key Points

- Audit events are immutable and append-only
- All authority escalations are logged
- All destructive actions are logged
- All policy overrides are logged
- Export capability for compliance
- Filterable by actor, operation, date
- Linked to trace events

---

## Pattern Summary

| # | Pattern | State Machine | Key Components |
|---|---------|--------------|----------------|
| 1 | Command Execution | commandDispatchMachine | CommandButton, StateBadge, CircuitBreaker |
| 2 | Authority Escalation | authorityEscalationMachine | AuthorityGate, OverridePanel |
| 3 | Staged Deployment | deploymentMachine | ProgressTracker, ValidationSummary |
| 4 | Bulk Operation | bulkOperationMachine | DataTable, ProgressBar, BatchActionBar |
| 5 | Real-Time Monitoring | runtimeLifecycleMachine | MetricCard, LineChart, HealthIndicator |
| 6 | AI-Assisted Editing | aiAssistedEditMachine | IntentInput, AIDiffViewer, DraftStagingBand |
| 7 | Emergency Break | emergencyBreakMachine | EmergencyBreaker, AuthorityGate |
| 8 | Audit Trail | auditTrailMachine | DataTable, FilterBar, TraceConsole |
