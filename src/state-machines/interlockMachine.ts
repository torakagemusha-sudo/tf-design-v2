/**
 * @fileoverview interlockMachine.ts — Interlock System State Machine
 *
 * Models the safety interlock system that governs access to dangerous or
 * consequential operations. Interlocks may be policy-based, authority-based,
 * or state-based. Supports bypass requests for emergency scenarios.
 *
 * **7 states**: open → checking → blocked → bypass_requested → bypassed →
 * failed_open → failed_closed
 *
 * Spec: 01 Section 12 — Failure Model, 03.0 Section 8 — Authority Semantics
 *
 * @module @torakagemusha-sudo/tf-design-v2/state-machines/interlock
 * @version 0.2.0
 */

import { type StateMachineDefinition, type GuardFunction, type ActionFunction } from './types';
import { createMachine } from './createMachine';

// ───────────────────────────────────────────────────────────────────────────────
// State & Event Unions
// ───────────────────────────────────────────────────────────────────────────────

/** The 7 interlock states. */
export type InterlockState =
  | 'open'
  | 'checking'
  | 'blocked'
  | 'bypass_requested'
  | 'bypassed'
  | 'failed_open'
  | 'failed_closed';

/** All events the interlock machine accepts. */
export type InterlockEvent =
  | 'CHECK'
  | 'PASS'
  | 'BLOCK'
  | 'REQUEST_BYPASS'
  | 'GRANT_BYPASS'
  | 'DENY_BYPASS'
  | 'REVOKE_BYPASS'
  | 'FAIL_OPEN'
  | 'FAIL_CLOSED'
  | 'RECOVER'
  | 'RESET'
  | 'REARM';

// ───────────────────────────────────────────────────────────────────────────────
// Context
// ───────────────────────────────────────────────────────────────────────────────

/** Context for the interlock machine. */
export interface InterlockContext {
  /** Interlock identifier. */
  interlockId: string;

  /** Policy or gate this interlock enforces. */
  policyName: string;

  /** Required authority to pass. */
  requiredAuthority: string;

  /** Current operator authority. */
  operatorAuthority: string;

  /** Whether the interlock is currently engaged. */
  engaged: boolean;

  /** Whether a bypass has been requested. */
  bypassRequested: boolean;

  /** Authority that granted bypass. */
  bypassGrantedBy?: string;

  /** Bypass reason code. */
  bypassReason?: string;

  /** Block reason code. */
  blockReason?: string;

  /** Whether the interlock system itself has faulted. */
  systemFaulted: boolean;

  /** Preferred failure mode: 'open' (permissive) or 'closed' (restrictive). */
  failureMode: 'open' | 'closed';
}

// ───────────────────────────────────────────────────────────────────────────────
// Guards
// ───────────────────────────────────────────────────────────────────────────────

const hasPassAuthority: GuardFunction<InterlockContext> = (ctx) => {
  const levels = ['AUTH_0_OBSERVE', 'AUTH_1_DRAFT', 'AUTH_2_STAGE', 'AUTH_3_EXECUTE', 'AUTH_4_COMMIT', 'AUTH_5_OVERRIDE', 'AUTH_6_ROOT'];
  const opIdx = levels.indexOf(ctx.operatorAuthority);
  const reqIdx = levels.indexOf(ctx.requiredAuthority);
  return opIdx >= reqIdx && opIdx >= 0;
};

const hasBypassAuthority: GuardFunction<InterlockContext> = (ctx) =>
  ctx.operatorAuthority === 'AUTH_5_OVERRIDE' ||
  ctx.operatorAuthority === 'AUTH_6_ROOT';

const isFailClosed: GuardFunction<InterlockContext> = (ctx) =>
  ctx.failureMode === 'closed';

const isFailOpen: GuardFunction<InterlockContext> = (ctx) =>
  ctx.failureMode === 'open';

// ───────────────────────────────────────────────────────────────────────────────
// Actions
// ───────────────────────────────────────────────────────────────────────────────

const engageInterlock: ActionFunction<InterlockContext> = (ctx) => {
  ctx.engaged = true;
};

const disengageInterlock: ActionFunction<InterlockContext> = (ctx) => {
  ctx.engaged = false;
};

const recordBlock: ActionFunction<InterlockContext> = (ctx, payload) => {
  ctx.blockReason = typeof payload === 'string' ? payload : 'INTERLOCK_BLOCKED';
  ctx.engaged = true;
};

const recordBypassRequest: ActionFunction<InterlockContext> = (ctx) => {
  ctx.bypassRequested = true;
};

const grantBypass: ActionFunction<InterlockContext> = (ctx, payload) => {
  ctx.bypassGrantedBy = ctx.operatorAuthority;
  ctx.bypassReason = typeof payload === 'string' ? payload : 'EMERGENCY_BYPASS';
  ctx.bypassRequested = false;
  ctx.engaged = false;
};

const revokeBypass: ActionFunction<InterlockContext> = (ctx) => {
  ctx.bypassGrantedBy = undefined;
  ctx.bypassReason = undefined;
  ctx.bypassRequested = false;
  ctx.engaged = true;
};

const markSystemFault: ActionFunction<InterlockContext> = (ctx) => {
  ctx.systemFaulted = true;
};

const clearFault: ActionFunction<InterlockContext> = (ctx) => {
  ctx.systemFaulted = false;
};

// ───────────────────────────────────────────────────────────────────────────────
// Machine Definition
// ───────────────────────────────────────────────────────────────────────────────

/**
 * Interlock system state machine — 7 states, 25+ transitions.
 *
 * Flow:
 * ```
 * open → checking → blocked (authority insufficient)
 *             ↓
 *          open (authority sufficient)
 * blocked → bypass_requested → bypassed (AUTH_5+)
 *              ↓
 *         failed_open (fault, permissive)
 *         failed_closed (fault, restrictive)
 * ```
 */
export const interlockMachineDefinition: StateMachineDefinition<
  InterlockState,
  InterlockEvent,
  InterlockContext
> = {
  id: 'torafirma.interlock',
  name: 'Interlock System State Machine',
  description: 'Safety interlock with bypass support and configurable failure modes.',
  version: '0.2.0',

  initialState: 'open',

  states: ['open', 'checking', 'blocked', 'bypass_requested', 'bypassed', 'failed_open', 'failed_closed'],

  events: [
    'CHECK', 'PASS', 'BLOCK', 'REQUEST_BYPASS', 'GRANT_BYPASS', 'DENY_BYPASS',
    'REVOKE_BYPASS', 'FAIL_OPEN', 'FAIL_CLOSED', 'RECOVER', 'RESET', 'REARM',
  ],

  createContext: (): InterlockContext => ({
    interlockId: '',
    policyName: '',
    requiredAuthority: 'AUTH_0_OBSERVE',
    operatorAuthority: 'AUTH_0_OBSERVE',
    engaged: false,
    bypassRequested: false,
    systemFaulted: false,
    failureMode: 'closed',
  }),

  stateActions: {
    blocked: {
      entry: engageInterlock,
    },
    bypassed: {
      entry: (ctx) => { /* emit audit: interlock.bypassed */ },
    },
    failed_closed: {
      entry: [markSystemFault, engageInterlock],
    },
    failed_open: {
      entry: [markSystemFault, disengageInterlock],
    },
  },

  transitions: [
    // ── OPEN ──
    { from: 'open', event: 'CHECK', to: 'checking', description: 'Begin interlock check' },
    { from: 'open', event: 'FAIL_OPEN', to: 'failed_open', description: 'System fault (fail open)' },
    { from: 'open', event: 'FAIL_CLOSED', to: 'failed_closed', description: 'System fault (fail closed)' },

    // ── CHECKING ──
    { from: 'checking', event: 'PASS', to: 'open', guard: hasPassAuthority, action: disengageInterlock, description: 'Authority check passed' },
    { from: 'checking', event: 'BLOCK', to: 'blocked', guard: (ctx) => !hasPassAuthority(ctx), action: recordBlock, description: 'Blocked: insufficient authority' },
    { from: 'checking', event: 'FAIL_OPEN', to: 'failed_open', guard: isFailOpen, description: 'Fault during check (fail open)' },
    { from: 'checking', event: 'FAIL_CLOSED', to: 'failed_closed', guard: isFailClosed, description: 'Fault during check (fail closed)' },

    // ── BLOCKED ──
    { from: 'blocked', event: 'REQUEST_BYPASS', to: 'bypass_requested', action: recordBypassRequest, description: 'Request bypass' },
    { from: 'blocked', event: 'CHECK', to: 'checking', description: 'Re-check authority' },
    { from: 'blocked', event: 'RECOVER', to: 'open', guard: hasPassAuthority, action: disengageInterlock, description: 'Recover with authority' },
    { from: 'blocked', event: 'FAIL_OPEN', to: 'failed_open', guard: isFailOpen, description: 'Fault while blocked (fail open)' },
    { from: 'blocked', event: 'FAIL_CLOSED', to: 'failed_closed', guard: isFailClosed, description: 'Fault while blocked (fail closed)' },

    // ── BYPASS_REQUESTED ──
    { from: 'bypass_requested', event: 'GRANT_BYPASS', to: 'bypassed', guard: hasBypassAuthority, action: grantBypass, description: 'Grant bypass' },
    { from: 'bypass_requested', event: 'DENY_BYPASS', to: 'blocked', description: 'Deny bypass' },
    { from: 'bypass_requested', event: 'REVOKE_BYPASS', to: 'blocked', description: 'Revoke bypass request' },

    // ── BYPASSED ──
    { from: 'bypassed', event: 'REVOKE_BYPASS', to: 'blocked', action: revokeBypass, description: 'Revoke bypass' },
    { from: 'bypassed', event: 'CHECK', to: 'checking', description: 'Re-check after bypass' },
    { from: 'bypassed', event: 'RESET', to: 'open', description: 'Reset from bypassed' },

    // ── FAILED_OPEN ──
    { from: 'failed_open', event: 'RECOVER', to: 'open', action: clearFault, description: 'Recover from fail-open' },
    { from: 'failed_open', event: 'REARM', to: 'checking', action: clearFault, description: 'Rearm after fail-open' },
    { from: 'failed_open', event: 'FAIL_CLOSED', to: 'failed_closed', description: 'Fail-open to fail-closed' },

    // ── FAILED_CLOSED ──
    { from: 'failed_closed', event: 'RECOVER', to: 'blocked', action: clearFault, description: 'Recover from fail-closed' },
    { from: 'failed_closed', event: 'REARM', to: 'checking', action: clearFault, description: 'Rearm after fail-closed' },
    { from: 'failed_closed', event: 'REQUEST_BYPASS', to: 'bypass_requested', action: recordBypassRequest, description: 'Request bypass from fail-closed' },
  ],
};

// ───────────────────────────────────────────────────────────────────────────────
// Factory
// ───────────────────────────────────────────────────────────────────────────────

/**
 * Create an interlock system machine instance.
 *
 * @param interlockId — Unique interlock identifier.
 * @param policyName — Policy this interlock enforces.
 * @param requiredAuthority — Minimum authority to pass.
 * @param overrides — Optional context overrides.
 */
export function createInterlockMachine(
  interlockId: string,
  policyName: string,
  requiredAuthority?: string,
  overrides?: Partial<InterlockContext>,
) {
  return createMachine(interlockMachineDefinition, {
    context: {
      interlockId,
      policyName,
      requiredAuthority: requiredAuthority ?? 'AUTH_0_OBSERVE',
      operatorAuthority: 'AUTH_0_OBSERVE',
      engaged: false,
      bypassRequested: false,
      systemFaulted: false,
      failureMode: 'closed',
      ...overrides,
    },
  });
}
