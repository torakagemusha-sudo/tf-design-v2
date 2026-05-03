/**
 * @fileoverview traceAuditMachine.ts — Trace/Audit Pipeline State Machine
 *
 * Models the lifecycle of trace events from capture through archival or purge.
 * Every consequential action in Torafirma produces trace that flows through
 * this pipeline.
 *
 * **8 states**: capturing → buffering → filtering → enriching → indexing →
 * stored → archived → purged
 *
 * Spec: 01 Section 11 — Trace and Audit
 *
 * @module @torakagemusha-sudo/tf-design-v2/state-machines/traceAudit
 * @version 0.2.0
 */

import { type StateMachineDefinition, type GuardFunction, type ActionFunction } from './types';
import { createMachine } from './createMachine';

// ───────────────────────────────────────────────────────────────────────────────
// State & Event Unions
// ───────────────────────────────────────────────────────────────────────────────

/** The 8 trace/audit pipeline states. */
export type TraceAuditState =
  | 'capturing'
  | 'buffering'
  | 'filtering'
  | 'enriching'
  | 'indexing'
  | 'stored'
  | 'archived'
  | 'purged';

/** All events the trace/audit machine accepts. */
export type TraceAuditEvent =
  | 'CAPTURE'
  | 'BUFFER_FULL'
  | 'FLUSH'
  | 'FILTER'
  | 'FILTER_PASS'
  | 'FILTER_DROP'
  | 'ENRICH'
  | 'ENRICH_COMPLETE'
  | 'INDEX'
  | 'INDEX_COMPLETE'
  | 'STORE'
  | 'STORE_COMPLETE'
  | 'ARCHIVE'
  | 'ARCHIVE_COMPLETE'
  | 'PURGE'
  | 'PURGE_COMPLETE'
  | 'RECOVER'
  | 'FAIL';

// ───────────────────────────────────────────────────────────────────────────────
// Context
// ───────────────────────────────────────────────────────────────────────────────

/** Context for the trace/audit pipeline machine. */
export interface TraceAuditContext {
  /** Trace event identifier. */
  traceId: string;

  /** Event type / category. */
  eventType: string;

  /** Actor who triggered the event. */
  actor: string;

  /** Authority level of the actor. */
  authority: string;

  /** Whether the event is audit-level (immutable). */
  isAuditLevel: boolean;

  /** Buffer size before flush. */
  bufferSize: number;

  /** Maximum buffer size. */
  maxBufferSize: number;

  /** Number of events dropped by filtering. */
  droppedCount: number;

  /** Whether enrichment is required. */
  enrichmentRequired: boolean;

  /** Retention days before archival. */
  retentionDays: number;

  /** Whether the trace has been tamper-sealed. */
  sealed: boolean;
}

// ───────────────────────────────────────────────────────────────────────────────
// Guards
// ───────────────────────────────────────────────────────────────────────────────

const bufferFull: GuardFunction<TraceAuditContext> = (ctx) =>
  ctx.bufferSize >= ctx.maxBufferSize;

const isAuditEvent: GuardFunction<TraceAuditContext> = (ctx) =>
  ctx.isAuditLevel;

const needsEnrichment: GuardFunction<TraceAuditContext> = (ctx) =>
  ctx.enrichmentRequired;

const isSealed: GuardFunction<TraceAuditContext> = (ctx) =>
  ctx.sealed;

// ───────────────────────────────────────────────────────────────────────────────
// Actions
// ───────────────────────────────────────────────────────────────────────────────

const incrementBuffer: ActionFunction<TraceAuditContext> = (ctx) => {
  ctx.bufferSize += 1;
};

const clearBuffer: ActionFunction<TraceAuditContext> = (ctx) => {
  ctx.bufferSize = 0;
};

const markDropped: ActionFunction<TraceAuditContext> = (ctx) => {
  ctx.droppedCount += 1;
};

const markSealed: ActionFunction<TraceAuditContext> = (ctx) => {
  ctx.sealed = true;
};

// ───────────────────────────────────────────────────────────────────────────────
// Machine Definition
// ───────────────────────────────────────────────────────────────────────────────

/**
 * Trace/audit pipeline state machine — 8 states, 30+ transitions.
 *
 * Pipeline flow:
 * ```
 * capturing → buffering → filtering → enriching → indexing → stored → archived → purged
 *                                       ↓ (skip enrichment)
 *                              filtering → indexing (no enrichment needed)
 * ```
 */
export const traceAuditMachineDefinition: StateMachineDefinition<
  TraceAuditState,
  TraceAuditEvent,
  TraceAuditContext
> = {
  id: 'torafirma.trace.audit',
  name: 'Trace/Audit Pipeline State Machine',
  description: 'Trace event lifecycle from capture through archival and purge.',
  version: '0.2.0',

  initialState: 'capturing',

  states: ['capturing', 'buffering', 'filtering', 'enriching', 'indexing', 'stored', 'archived', 'purged'],

  events: [
    'CAPTURE', 'BUFFER_FULL', 'FLUSH', 'FILTER', 'FILTER_PASS', 'FILTER_DROP',
    'ENRICH', 'ENRICH_COMPLETE', 'INDEX', 'INDEX_COMPLETE', 'STORE',
    'STORE_COMPLETE', 'ARCHIVE', 'ARCHIVE_COMPLETE', 'PURGE', 'PURGE_COMPLETE',
    'RECOVER', 'FAIL',
  ],

  createContext: (): TraceAuditContext => ({
    traceId: '',
    eventType: '',
    actor: '',
    authority: 'AUTH_0_OBSERVE',
    isAuditLevel: false,
    bufferSize: 0,
    maxBufferSize: 100,
    droppedCount: 0,
    enrichmentRequired: true,
    retentionDays: 90,
    sealed: false,
  }),

  stateActions: {
    stored: {
      entry: markSealed,
    },
    archived: {
      entry: (ctx) => { /* emit trace: archive.sealed */ },
    },
  },

  transitions: [
    // ── CAPTURING ──
    { from: 'capturing', event: 'CAPTURE', to: 'buffering', action: incrementBuffer, description: 'Capture event to buffer' },
    { from: 'capturing', event: 'BUFFER_FULL', to: 'filtering', guard: bufferFull, description: 'Buffer full, flush' },

    // ── BUFFERING ──
    { from: 'buffering', event: 'CAPTURE', to: 'buffering', action: incrementBuffer, description: 'Continue buffering' },
    { from: 'buffering', event: 'FLUSH', to: 'filtering', description: 'Flush buffer to filter' },
    { from: 'buffering', event: 'BUFFER_FULL', to: 'filtering', guard: bufferFull, action: clearBuffer, description: 'Buffer full, flush' },
    { from: 'buffering', event: 'FAIL', to: 'capturing', description: 'Buffer failure, retry capture' },

    // ── FILTERING ──
    { from: 'filtering', event: 'FILTER_PASS', to: 'enriching', guard: needsEnrichment, description: 'Pass filter, enrich' },
    { from: 'filtering', event: 'FILTER_PASS', to: 'indexing', guard: (ctx) => !ctx.enrichmentRequired, description: 'Pass filter, skip enrich' },
    { from: 'filtering', event: 'FILTER_DROP', to: 'capturing', action: markDropped, description: 'Drop event, return to capture' },

    // ── ENRICHING ──
    { from: 'enriching', event: 'ENRICH_COMPLETE', to: 'indexing', description: 'Enrichment done, index' },
    { from: 'enriching', event: 'FAIL', to: 'filtering', description: 'Enrichment failed, retry' },

    // ── INDEXING ──
    { from: 'indexing', event: 'INDEX_COMPLETE', to: 'stored', description: 'Indexed, store' },
    { from: 'indexing', event: 'FAIL', to: 'enriching', description: 'Index failed, retry' },

    // ── STORED ──
    { from: 'stored', event: 'ARCHIVE', to: 'archived', description: 'Archive stored trace' },
    { from: 'stored', event: 'PURGE', to: 'purged', guard: (ctx) => !ctx.isAuditLevel, description: 'Purge non-audit trace' },
    { from: 'stored', event: 'RECOVER', to: 'capturing', description: 'Recover and capture more' },

    // ── ARCHIVED ──
    { from: 'archived', event: 'PURGE', to: 'purged', guard: (ctx) => !isAuditEvent(ctx), description: 'Purge archived trace' },
    { from: 'archived', event: 'RECOVER', to: 'stored', description: 'Recover from archive' },

    // ── PURGED ──
    { from: 'purged', event: 'RECOVER', to: 'capturing', description: 'Recover after purge' },
  ],
};

// ───────────────────────────────────────────────────────────────────────────────
// Factory
// ───────────────────────────────────────────────────────────────────────────────

/**
 * Create a trace/audit pipeline machine instance.
 *
 * @param traceId — Unique trace event identifier.
 * @param eventType — Type/category of the trace event.
 * @param actor — Actor who triggered the event.
 * @param overrides — Optional context overrides.
 */
export function createTraceAuditMachine(
  traceId: string,
  eventType: string,
  actor: string,
  overrides?: Partial<TraceAuditContext>,
) {
  return createMachine(traceAuditMachineDefinition, {
    context: {
      traceId,
      eventType,
      actor,
      authority: 'AUTH_0_OBSERVE',
      isAuditLevel: false,
      bufferSize: 0,
      maxBufferSize: 100,
      droppedCount: 0,
      enrichmentRequired: true,
      retentionDays: 90,
      sealed: false,
      ...overrides,
    },
  });
}
