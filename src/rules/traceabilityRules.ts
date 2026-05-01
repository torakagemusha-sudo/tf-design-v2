/**
 * @fileoverview Traceability / Audit Requirement Checker
 *
 * Ensures all sensitive operations in Torafirma leave an audit trail:
 * - All command executions must have a traceId
 * - All authority escalations must be logged
 * - All destructive actions must have an audit trail
 * - All state transitions must be traceable
 * - Trace events must have timestamps
 * - Trace events must have valid authority levels
 * - No duplicate traceIds
 * - Trace events must be ordered chronologically
 *
 * @example
 * ```ts
 * validateTraceability([
 *   { traceId: 'abc-123', eventType: 'command', authorityLevel: 'AUTH_2', timestamp: '2024-01-01T00:00:00Z' },
 *   { traceId: 'abc-123', eventType: 'authority-escalation', authorityLevel: 'AUTH_5', timestamp: '2024-01-01T00:00:01Z' },
 * ]);
 * ```
 */

import type { AuthorityLevel, RuleResult, TraceEvent, ValidatorFunction } from './types';

// ------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------

const VALID_EVENT_TYPES: TraceEvent['eventType'][] = [
  'command',
  'authority-escalation',
  'destructive-action',
  'state-transition',
];

const VALID_AUTHORITY_LEVELS: AuthorityLevel[] = [
  'AUTH_0', 'AUTH_1', 'AUTH_2', 'AUTH_3', 'AUTH_4', 'AUTH_5', 'AUTH_6',
];

// ------------------------------------------------------------------------------
// Context type
// ------------------------------------------------------------------------------

export interface TraceabilityContext {
  /** Component or module name being validated. */
  componentName?: string;
  /** File path for reporting. */
  filePath?: string;
  /** Whether to require authority level for all events. */
  strictAuthority?: boolean;
}

// ------------------------------------------------------------------------------
// Rule IDs
// ------------------------------------------------------------------------------

const RULE = {
  commandHasTraceId: 'command-has-trace-id',
  escalationLogged: 'authority-escalation-logged',
  destructiveHasAuditTrail: 'destructive-action-audit-trail',
  transitionTraceable: 'state-transition-traceable',
  eventHasTimestamp: 'event-has-timestamp',
  eventHasValidAuthority: 'event-has-valid-authority',
  noDuplicateTraceIds: 'no-duplicate-trace-ids',
  chronologicalOrder: 'events-chronologically-ordered',
  eventTypeValid: 'event-type-valid',
  traceIdFormat: 'trace-id-format-valid',
} as const;

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

/** Validate UUID-like or structured traceId format. */
function isValidTraceId(traceId: string): boolean {
  // Accepts UUID v4 format or structured format like "cmd-{timestamp}-{random}"
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const structuredRegex = /^[a-z]+-\d{13,}-[a-z0-9]+$/i;
  const shortRegex = /^[a-z0-9_-]{8,64}$/i;
  return uuidRegex.test(traceId) || structuredRegex.test(traceId) || shortRegex.test(traceId);
}

/** Check if timestamp is a valid ISO-8601 date. */
function isValidTimestamp(ts: string): boolean {
  const d = new Date(ts);
  return !isNaN(d.getTime());
}

/** Check if events are in chronological order. */
function areChronological(events: TraceEvent[]): boolean {
  for (let i = 1; i < events.length; i++) {
    const prev = new Date(events[i - 1].timestamp).getTime();
    const curr = new Date(events[i].timestamp).getTime();
    if (curr < prev) return false;
  }
  return true;
}

// ------------------------------------------------------------------------------
// Validators
// ------------------------------------------------------------------------------

function checkEventTypesValid(events: TraceEvent[], ctx?: TraceabilityContext): RuleResult[] {
  const results: RuleResult[] = [];

  for (const event of events) {
    const passed = VALID_EVENT_TYPES.includes(event.eventType);
    if (!passed) {
      results.push({
        passed: false,
        rule: RULE.eventTypeValid,
        message: `Trace event has invalid eventType "${event.eventType}".`,
        severity: 'error',
        suggestion: `Use one of: ${VALID_EVENT_TYPES.join(', ')}.`,
        filePath: ctx?.filePath,
        context: `traceId: ${event.traceId}`,
      });
    }
  }

  if (results.length === 0) {
    results.push({
      passed: true,
      rule: RULE.eventTypeValid,
      message: `All ${events.length} trace event(s) have valid event types.`,
      severity: 'info',
    });
  }

  return results;
}

function checkCommandsHaveTraceId(events: TraceEvent[], ctx?: TraceabilityContext): RuleResult[] {
  const results: RuleResult[] = [];
  const commands = events.filter((e) => e.eventType === 'command');

  for (const cmd of commands) {
    const hasTraceId = cmd.traceId !== undefined && cmd.traceId !== '';
    if (!hasTraceId) {
      results.push({
        passed: false,
        rule: RULE.commandHasTraceId,
        message: `Command event is missing a traceId.`,
        severity: 'error',
        suggestion: `Assign a unique traceId before executing the command.`,
        filePath: ctx?.filePath,
        context: `eventType: command`,
      });
    }
  }

  if (results.length === 0) {
    results.push({
      passed: true,
      rule: RULE.commandHasTraceId,
      message: commands.length > 0
        ? `All ${commands.length} command(s) have traceIds.`
        : `No command events to validate.`,
      severity: 'info',
    });
  }

  return results;
}

function checkEscalationsLogged(events: TraceEvent[], ctx?: TraceabilityContext): RuleResult[] {
  const results: RuleResult[] = [];
  const escalations = events.filter((e) => e.eventType === 'authority-escalation');

  for (const esc of escalations) {
    const hasTraceId = esc.traceId !== undefined && esc.traceId !== '';
    const hasTimestamp = esc.timestamp !== undefined && esc.timestamp !== '';
    const hasAuthority = esc.authorityLevel !== undefined;
    const passed = hasTraceId && hasTimestamp && hasAuthority;

    if (!passed) {
      results.push({
        passed: false,
        rule: RULE.escalationLogged,
        message: `Authority escalation event is incomplete ` +
          `(traceId: ${hasTraceId}, timestamp: ${hasTimestamp}, authority: ${hasAuthority}).`,
        severity: 'error',
        suggestion: `All authority escalations must include traceId, timestamp, and authorityLevel.`,
        filePath: ctx?.filePath,
        context: `traceId: ${esc.traceId || 'missing'}`,
      });
    }
  }

  if (results.length === 0) {
    results.push({
      passed: true,
      rule: RULE.escalationLogged,
      message: escalations.length > 0
        ? `All ${escalations.length} authority escalation(s) are properly logged.`
        : `No authority escalation events to validate.`,
      severity: 'info',
    });
  }

  return results;
}

function checkDestructiveHasAuditTrail(events: TraceEvent[], ctx?: TraceabilityContext): RuleResult[] {
  const results: RuleResult[] = [];
  const destructive = events.filter((e) => e.eventType === 'destructive-action');

  for (const action of destructive) {
    const hasTraceId = action.traceId !== undefined && action.traceId !== '';
    const hasTimestamp = action.timestamp !== undefined && action.timestamp !== '';
    const hasDetails = action.details !== undefined && action.details !== '';
    const passed = hasTraceId && hasTimestamp && hasDetails;

    if (!passed) {
      results.push({
        passed: false,
        rule: RULE.destructiveHasAuditTrail,
        message: `Destructive action event is incomplete ` +
          `(traceId: ${hasTraceId}, timestamp: ${hasTimestamp}, details: ${hasDetails}).`,
        severity: 'error',
        suggestion: `Destructive actions require full audit trail: traceId + timestamp + details describing the impact.`,
        filePath: ctx?.filePath,
        context: `traceId: ${action.traceId || 'missing'}`,
      });
    }
  }

  if (results.length === 0) {
    results.push({
      passed: true,
      rule: RULE.destructiveHasAuditTrail,
      message: destructive.length > 0
        ? `All ${destructive.length} destructive action(s) have audit trails.`
        : `No destructive action events to validate.`,
      severity: 'info',
    });
  }

  return results;
}

function checkTransitionsTraceable(events: TraceEvent[], ctx?: TraceabilityContext): RuleResult[] {
  const results: RuleResult[] = [];
  const transitions = events.filter((e) => e.eventType === 'state-transition');

  for (const tx of transitions) {
    const hasTraceId = tx.traceId !== undefined && tx.traceId !== '';
    const hasTimestamp = tx.timestamp !== undefined && tx.timestamp !== '';
    const passed = hasTraceId && hasTimestamp;

    if (!passed) {
      results.push({
        passed: false,
        rule: RULE.transitionTraceable,
        message: `State transition event is missing required fields ` +
          `(traceId: ${hasTraceId}, timestamp: ${hasTimestamp}).`,
        severity: 'error',
        suggestion: `All state transitions must have traceId and timestamp for traceability.`,
        filePath: ctx?.filePath,
        context: `traceId: ${tx.traceId || 'missing'}`,
      });
    }
  }

  if (results.length === 0) {
    results.push({
      passed: true,
      rule: RULE.transitionTraceable,
      message: transitions.length > 0
        ? `All ${transitions.length} state transition(s) are traceable.`
        : `No state transition events to validate.`,
      severity: 'info',
    });
  }

  return results;
}

function checkEventsHaveTimestamp(events: TraceEvent[], ctx?: TraceabilityContext): RuleResult[] {
  const results: RuleResult[] = [];

  for (const event of events) {
    const hasTs = event.timestamp !== undefined && event.timestamp !== '';
    const isValid = hasTs && isValidTimestamp(event.timestamp);

    if (!hasTs) {
      results.push({
        passed: false,
        rule: RULE.eventHasTimestamp,
        message: `Trace event (type: ${event.eventType}, traceId: ${event.traceId}) is missing a timestamp.`,
        severity: 'error',
        suggestion: `Add an ISO-8601 timestamp (e.g., new Date().toISOString()).`,
        filePath: ctx?.filePath,
        context: `traceId: ${event.traceId}`,
      });
    } else if (!isValid) {
      results.push({
        passed: false,
        rule: RULE.eventHasTimestamp,
        message: `Trace event has invalid timestamp "${event.timestamp}".`,
        severity: 'error',
        suggestion: `Use a valid ISO-8601 timestamp format: "2024-01-01T00:00:00.000Z".`,
        filePath: ctx?.filePath,
        context: `timestamp: ${event.timestamp}`,
      });
    }
  }

  if (results.length === 0) {
    results.push({
      passed: true,
      rule: RULE.eventHasTimestamp,
      message: `All ${events.length} trace event(s) have valid timestamps.`,
      severity: 'info',
    });
  }

  return results;
}

function checkEventsHaveValidAuthority(events: TraceEvent[], ctx?: TraceabilityContext): RuleResult[] {
  const results: RuleResult[] = [];

  for (const event of events) {
    if (event.authorityLevel === undefined) continue;

    const passed = VALID_AUTHORITY_LEVELS.includes(event.authorityLevel);
    if (!passed) {
      results.push({
        passed: false,
        rule: RULE.eventHasValidAuthority,
        message: `Trace event has invalid authorityLevel "${event.authorityLevel}".`,
        severity: 'error',
        suggestion: `Use one of: ${VALID_AUTHORITY_LEVELS.join(', ')}.`,
        filePath: ctx?.filePath,
        context: `traceId: ${event.traceId}`,
      });
    }
  }

  if (results.length === 0) {
    results.push({
      passed: true,
      rule: RULE.eventHasValidAuthority,
      message: `All trace events with authority levels have valid values.`,
      severity: 'info',
    });
  }

  return results;
}

function checkNoDuplicateTraceIds(events: TraceEvent[], ctx?: TraceabilityContext): RuleResult[] {
  const results: RuleResult[] = [];
  const seen = new Map<string, number>();

  for (const event of events) {
    const count = seen.get(event.traceId) || 0;
    seen.set(event.traceId, count + 1);
  }

  for (const [traceId, count] of seen.entries()) {
    if (count > 1) {
      results.push({
        passed: false,
        rule: RULE.noDuplicateTraceIds,
        message: `traceId "${traceId}" appears ${count} times. TraceIds should be unique per event.`,
        severity: 'warning',
        suggestion: `Use unique traceIds for each event, or append a sequence number.`,
        filePath: ctx?.filePath,
      });
    }
  }

  if (results.length === 0) {
    results.push({
      passed: true,
      rule: RULE.noDuplicateTraceIds,
      message: `All ${events.length} traceId(s) are unique.`,
      severity: 'info',
    });
  }

  return results;
}

function checkChronologicalOrder(events: TraceEvent[], ctx?: TraceabilityContext): RuleResult[] {
  if (events.length < 2) {
    return [{
      passed: true,
      rule: RULE.chronologicalOrder,
      message: `Only ${events.length} event(s) — chronological check passes.`,
      severity: 'info',
    }];
  }

  const passed = areChronological(events);

  return [{
    passed,
    rule: RULE.chronologicalOrder,
    message: passed
      ? `All ${events.length} events are in chronological order.`
      : `Trace events are not in chronological order. Timestamps should increase monotonically.`,
    severity: 'warning',
    suggestion: passed ? undefined : `Sort events by timestamp before processing or logging.`,
    filePath: ctx?.filePath,
  }];
}

function checkTraceIdFormat(events: TraceEvent[], ctx?: TraceabilityContext): RuleResult[] {
  const results: RuleResult[] = [];

  for (const event of events) {
    const passed = isValidTraceId(event.traceId);
    if (!passed) {
      results.push({
        passed: false,
        rule: RULE.traceIdFormat,
        message: `traceId "${event.traceId}" does not match expected format (UUID or structured id).`,
        severity: 'warning',
        suggestion: `Use UUID format "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx" or structured "cmd-{timestamp}-{rand}".`,
        filePath: ctx?.filePath,
        context: `traceId: ${event.traceId}`,
      });
    }
  }

  if (results.length === 0) {
    results.push({
      passed: true,
      rule: RULE.traceIdFormat,
      message: `All ${events.length} traceId(s) have valid format.`,
      severity: 'info',
    });
  }

  return results;
}

// ------------------------------------------------------------------------------
// Public API
// ------------------------------------------------------------------------------

/**
 * Validates trace event records against Torafirma audit requirements.
 *
 * @param traceEvents - Array of trace events to validate.
 * @param context     - Optional context (component name, file path).
 * @returns           - Array of `RuleResult` for each traceability rule.
 *
 * @example
 * ```ts
 * const events: TraceEvent[] = [
 *   { traceId: 'cmd-1704067200-abc', eventType: 'command', authorityLevel: 'AUTH_2', timestamp: '2024-01-01T00:00:00Z' },
 *   { traceId: 'esc-1704067201-def', eventType: 'authority-escalation', authorityLevel: 'AUTH_5', timestamp: '2024-01-01T00:00:01Z' },
 * ];
 * const results = validateTraceability(events);
 * console.log(results.filter(r => !r.passed));
 * ```
 */
export function validateTraceability(
  traceEvents: TraceEvent[],
  context?: TraceabilityContext,
): RuleResult[] {
  const results: RuleResult[] = [];

  if (traceEvents.length === 0) {
    results.push({
      passed: true,
      rule: RULE.commandHasTraceId,
      message: `No trace events to validate.`,
      severity: 'info',
    });
    return results;
  }

  results.push(...checkEventTypesValid(traceEvents, context));
  results.push(...checkCommandsHaveTraceId(traceEvents, context));
  results.push(...checkEscalationsLogged(traceEvents, context));
  results.push(...checkDestructiveHasAuditTrail(traceEvents, context));
  results.push(...checkTransitionsTraceable(traceEvents, context));
  results.push(...checkEventsHaveTimestamp(traceEvents, context));
  results.push(...checkEventsHaveValidAuthority(traceEvents, context));
  results.push(...checkNoDuplicateTraceIds(traceEvents, context));
  results.push(...checkChronologicalOrder(traceEvents, context));
  results.push(...checkTraceIdFormat(traceEvents, context));

  return results;
}

/** Alias for use in generic validator pipelines. */
export const validateAuditTrail: ValidatorFunction<TraceEvent[], TraceabilityContext> =
  validateTraceability;
