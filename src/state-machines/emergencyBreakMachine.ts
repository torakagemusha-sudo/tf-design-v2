/**
 * @fileoverview emergencyBreakMachine.ts — Emergency Break State Machine
 *
 * Models the emergency stop / circuit break system for Torafirma products.
 * Used for safety-critical operations where immediate halting is required.
 * Includes bypass capability for recovery scenarios.
 *
 * **7 states**: armed → triggered → acknowledged → resolving → resolved →
 * bypassed → faulted
 *
 * Spec: 01 Section 12 — Failure Model, 03.12 Field Components
 *
 * @module @torakagemusha-sudo/tf-design-v2/state-machines/emergencyBreak
 * @version 0.2.0
 */

import { type StateMachineDefinition, type GuardFunction, type ActionFunction } from './types';
import { createMachine } from './createMachine';

// ───────────────────────────────────────────────────────────────────────────────
// State & Event Unions
// ───────────────────────────────────────────────────────────────────────────────

/** The 7 emergency break states. */
export type EmergencyBreakState =
  | 'armed'
  | 'triggered'
  | 'acknowledged'
  | 'resolving'
  | 'resolved'
  | 'bypassed'
  | 'faulted';

/** All events the emergency break machine accepts. */
export type EmergencyBreakEvent =
  | 'ARM'
  | 'TRIGGER'
  | 'ACKNOWLEDGE'
  | 'BEGIN_RESOLVE'
  | 'RESOLVE'
  | 'REQUEST_BYPASS'
  | 'BYPASS'
  | 'CANCEL_BYPASS'
  | 'DISARM'
  | 'FAULT'
  | 'RESET'
  | 'REARM';

// ───────────────────────────────────────────────────────────────────────────────
// Context
// ───────────────────────────────────────────────────────────────────────────────

/** Context for the emergency break machine. */
export interface EmergencyBreakContext {
  /** Break identifier. */
  breakId: string;

  /** Operator who triggered the break. */
  triggeredBy: string;

  /** Authority of the triggering operator. */
  triggerAuthority: string;

  /** Reason code for the emergency. */
  triggerReason: string;

  /** Timestamp when triggered (ISO 8601). */
  triggeredAt?: string;

  /** Operator who acknowledged. */
  acknowledgedBy?: string;

  /** Whether bypass requires AUTH_5 or higher. */
  bypassRequiresOverride: boolean;

  /** Bypass reason code. */
  bypassReason?: string;

  /** Resolution notes. */
  resolutionNotes?: string;

  /** Whether the emergency system itself is faulted. */
  systemFaulted: boolean;
}

// ───────────────────────────────────────────────────────────────────────────────
// Guards
// ───────────────────────────────────────────────────────────────────────────────

const hasBypassAuthority: GuardFunction<EmergencyBreakContext> = (ctx) =>
  !ctx.bypassRequiresOverride ||
  ctx.triggerAuthority === 'AUTH_5_OVERRIDE' ||
  ctx.triggerAuthority === 'AUTH_6_ROOT';

const hasAcknowledgeAuthority: GuardFunction<EmergencyBreakContext> = (ctx) =>
  ctx.triggerAuthority !== 'AUTH_0_OBSERVE';

// ───────────────────────────────────────────────────────────────────────────────
// Actions
// ───────────────────────────────────────────────────────────────────────────────

const recordTrigger: ActionFunction<EmergencyBreakContext> = (ctx) => {
  ctx.triggeredAt = new Date().toISOString();
};

const recordAcknowledge: ActionFunction<EmergencyBreakContext> = (ctx, payload) => {
  ctx.acknowledgedBy = typeof payload === 'string' ? payload : ctx.triggeredBy;
};

const recordBypass: ActionFunction<EmergencyBreakContext> = (ctx, payload) => {
  ctx.bypassReason = typeof payload === 'string' ? payload : 'EMERGENCY_BYPASS';
};

const recordResolution: ActionFunction<EmergencyBreakContext> = (ctx, payload) => {
  ctx.resolutionNotes = typeof payload === 'string' ? payload : 'RESOLVED';
};

const recordFault: ActionFunction<EmergencyBreakContext> = (ctx, payload) => {
  ctx.systemFaulted = true;
};

const clearFault: ActionFunction<EmergencyBreakContext> = (ctx) => {
  ctx.systemFaulted = false;
};

// ───────────────────────────────────────────────────────────────────────────────
// Machine Definition
// ───────────────────────────────────────────────────────────────────────────────

/**
 * Emergency break state machine — 7 states, 25+ transitions.
 *
 * Flow:
 * ```
 * armed → triggered → acknowledged → resolving → resolved
 *              ↓
 *           bypassed (with AUTH_5+)
 *              ↓
 *           faulted (system error)
 * ```
 */
export const emergencyBreakMachineDefinition: StateMachineDefinition<
  EmergencyBreakState,
  EmergencyBreakEvent,
  EmergencyBreakContext
> = {
  id: 'torafirma.emergency.break',
  name: 'Emergency Break State Machine',
  description: 'Emergency stop / circuit break with bypass and fault handling.',
  version: '0.2.0',

  initialState: 'armed',

  states: ['armed', 'triggered', 'acknowledged', 'resolving', 'resolved', 'bypassed', 'faulted'],

  events: [
    'ARM', 'TRIGGER', 'ACKNOWLEDGE', 'BEGIN_RESOLVE', 'RESOLVE',
    'REQUEST_BYPASS', 'BYPASS', 'CANCEL_BYPASS', 'DISARM', 'FAULT',
    'RESET', 'REARM',
  ],

  createContext: (): EmergencyBreakContext => ({
    breakId: '',
    triggeredBy: '',
    triggerAuthority: 'AUTH_0_OBSERVE',
    triggerReason: '',
    bypassRequiresOverride: true,
    systemFaulted: false,
  }),

  stateActions: {
    triggered: {
      entry: recordTrigger,
    },
    resolved: {
      entry: (ctx) => { /* emit audit: emergency.resolved */ },
    },
    bypassed: {
      entry: (ctx) => { /* emit audit: emergency.bypassed */ },
    },
  },

  transitions: [
    // ── ARMED ──
    { from: 'armed', event: 'TRIGGER', to: 'triggered', action: recordTrigger, description: 'Trigger emergency break' },
    { from: 'armed', event: 'DISARM', to: 'resolved', description: 'Disarm (no emergency)' },
    { from: 'armed', event: 'FAULT', to: 'faulted', action: recordFault, description: 'Emergency system faulted' },

    // ── TRIGGERED ──
    { from: 'triggered', event: 'ACKNOWLEDGE', to: 'acknowledged', guard: hasAcknowledgeAuthority, action: recordAcknowledge, description: 'Acknowledge emergency' },
    { from: 'triggered', event: 'REQUEST_BYPASS', to: 'bypassed', guard: hasBypassAuthority, action: recordBypass, description: 'Request bypass' },
    { from: 'triggered', event: 'FAULT', to: 'faulted', action: recordFault, description: 'System fault while triggered' },

    // ── ACKNOWLEDGED ──
    { from: 'acknowledged', event: 'BEGIN_RESOLVE', to: 'resolving', description: 'Begin resolution' },
    { from: 'acknowledged', event: 'REQUEST_BYPASS', to: 'bypassed', guard: hasBypassAuthority, action: recordBypass, description: 'Bypass after acknowledge' },
    { from: 'acknowledged', event: 'FAULT', to: 'faulted', action: recordFault, description: 'System fault while acknowledged' },

    // ── RESOLVING ──
    { from: 'resolving', event: 'RESOLVE', to: 'resolved', action: recordResolution, description: 'Resolution complete' },
    { from: 'resolving', event: 'FAULT', to: 'faulted', action: recordFault, description: 'Resolution fault' },
    { from: 'resolving', event: 'REQUEST_BYPASS', to: 'bypassed', guard: hasBypassAuthority, action: recordBypass, description: 'Bypass during resolution' },

    // ── RESOLVED ──
    { from: 'resolved', event: 'REARM', to: 'armed', action: clearFault, description: 'Rearm emergency system' },
    { from: 'resolved', event: 'RESET', to: 'armed', action: clearFault, description: 'Reset to armed' },

    // ── BYPASSED ──
    { from: 'bypassed', event: 'CANCEL_BYPASS', to: 'triggered', description: 'Cancel bypass, return to triggered' },
    { from: 'bypassed', event: 'RESOLVE', to: 'resolved', action: recordResolution, description: 'Resolve while bypassed' },
    { from: 'bypassed', event: 'RESET', to: 'armed', description: 'Reset from bypassed' },

    // ── FAULTED ──
    { from: 'faulted', event: 'RESET', to: 'armed', action: clearFault, description: 'Reset faulted system' },
    { from: 'faulted', event: 'FAULT', to: 'faulted', description: 'Persistent fault' },
  ],
};

// ───────────────────────────────────────────────────────────────────────────────
// Factory
// ───────────────────────────────────────────────────────────────────────────────

/**
 * Create an emergency break machine instance.
 *
 * @param breakId — Unique emergency break identifier.
 * @param triggeredBy — Operator identifier.
 * @param triggerReason — Reason for the emergency.
 * @param overrides — Optional context overrides.
 */
export function createEmergencyBreakMachine(
  breakId: string,
  triggeredBy: string,
  triggerReason: string,
  overrides?: Partial<EmergencyBreakContext>,
) {
  return createMachine(emergencyBreakMachineDefinition, {
    context: {
      breakId,
      triggeredBy,
      triggerAuthority: 'AUTH_0_OBSERVE',
      triggerReason,
      bypassRequiresOverride: true,
      systemFaulted: false,
      ...overrides,
    },
  });
}
