/**
 * @fileoverview commandLifecycleMachine.ts — Command Lifecycle State Machine
 *
 * Models the full lifecycle of a user-facing command in the Torafirma system.
 * Commands progress through authority checks, confirmation gates, queuing,
 * staging, execution, and terminal states.
 *
 * **10 states**: available → disabled → blocked → requires_confirmation →
 * requires_authority → queued → staged → running → complete → failed
 *
 * Spec: 01 Sections 5, 6, 7 — Action Lifecycle & Authority Model
 *
 * @module @torakagemusha-sudo/tf-design-v2/state-machines/commandLifecycle
 * @version 0.2.0
 */

import { type StateMachineDefinition, type GuardFunction, type ActionFunction } from './types';
import { createMachine } from './createMachine';

// ───────────────────────────────────────────────────────────────────────────────
// State & Event Unions
// ───────────────────────────────────────────────────────────────────────────────

/** The 10 command lifecycle states. */
export type CommandState =
  | 'available'
  | 'disabled'
  | 'blocked'
  | 'requires_confirmation'
  | 'requires_authority'
  | 'queued'
  | 'staged'
  | 'running'
  | 'complete'
  | 'failed';

/** All events the command lifecycle machine accepts. */
export type CommandEvent =
  | 'ENABLE'
  | 'DISABLE'
  | 'BLOCK'
  | 'UNBLOCK'
  | 'REQUEST_CONFIRM'
  | 'CONFIRM'
  | 'CANCEL_CONFIRM'
  | 'REQUEST_AUTHORITY'
  | 'PROVIDE_AUTHORITY'
  | 'DENY_AUTHORITY'
  | 'QUEUE'
  | 'DEQUEUE'
  | 'STAGE'
  | 'UNSTAGE'
  | 'EXECUTE'
  | 'COMPLETE'
  | 'FAIL'
  | 'RETRY'
  | 'RESET';

// ───────────────────────────────────────────────────────────────────────────────
// Context
// ───────────────────────────────────────────────────────────────────────────────

/** Context for the command lifecycle machine. */
export interface CommandContext {
  /** Operator authority level. */
  authority: string;

  /** Authority required by this command. */
  requiredAuthority: string;

  /** Whether the command requires explicit confirmation. */
  requiresConfirmation: boolean;

  /** Whether the operator has confirmed. */
  confirmed: boolean;

  /** Whether the command is blocked by a policy interlock. */
  policyBlocked: boolean;

  /** Block reason code. */
  blockReason?: string;

  /** Failure reason code. */
  failReason?: string;

  /** Command identifier. */
  commandId: string;

  /** Command display label. */
  label: string;

  /** Whether the command is destructive. */
  isDestructive: boolean;
}

// ───────────────────────────────────────────────────────────────────────────────
// Guards
// ───────────────────────────────────────────────────────────────────────────────

const hasRequiredAuthority: GuardFunction<CommandContext> = (ctx) => {
  const levels = ['AUTH_0_OBSERVE', 'AUTH_1_DRAFT', 'AUTH_2_STAGE', 'AUTH_3_EXECUTE', 'AUTH_4_COMMIT', 'AUTH_5_OVERRIDE', 'AUTH_6_ROOT'];
  const currentIdx = levels.indexOf(ctx.authority);
  const requiredIdx = levels.indexOf(ctx.requiredAuthority);
  return currentIdx >= requiredIdx && currentIdx >= 0;
};

const needsConfirmation: GuardFunction<CommandContext> = (ctx) =>
  ctx.requiresConfirmation && !ctx.confirmed;

const isPolicyBlocked: GuardFunction<CommandContext> = (ctx) =>
  ctx.policyBlocked;

const isConfirmed: GuardFunction<CommandContext> = (ctx) =>
  ctx.confirmed;

const isDestructive: GuardFunction<CommandContext> = (ctx) =>
  ctx.isDestructive;

// ───────────────────────────────────────────────────────────────────────────────
// Actions
// ───────────────────────────────────────────────────────────────────────────────

const markConfirmed: ActionFunction<CommandContext> = (ctx) => { ctx.confirmed = true; };
const clearConfirmed: ActionFunction<CommandContext> = (ctx) => { ctx.confirmed = false; };
const markBlocked: ActionFunction<CommandContext> = (ctx, payload) => {
  ctx.policyBlocked = true;
  ctx.blockReason = typeof payload === 'string' ? payload : 'POLICY_BLOCK';
};
const markFailed: ActionFunction<CommandContext> = (ctx, payload) => {
  ctx.failReason = typeof payload === 'string' ? payload : 'EXECUTION_FAILED';
};
const clearBlock: ActionFunction<CommandContext> = (ctx) => {
  ctx.policyBlocked = false;
  ctx.blockReason = undefined;
};

// ───────────────────────────────────────────────────────────────────────────────
// Machine Definition
// ───────────────────────────────────────────────────────────────────────────────

/**
 * Command lifecycle state machine — 10 states, 35+ transitions.
 *
 * Lifecycle flow:
 * ```
 * available → disabled (toggle)
 * available → blocked (policy)
 * available → requires_confirmation (destructive)
 * available → requires_authority (insufficient)
 * available → queued (async)
 * queued → staged → running → complete/failed
 * ```
 */
export const commandLifecycleMachineDefinition: StateMachineDefinition<
  CommandState,
  CommandEvent,
  CommandContext
> = {
  id: 'torafirma.command.lifecycle',
  name: 'Command Lifecycle State Machine',
  description: 'Models the full lifecycle of a user-facing command from availability through execution.',
  version: '0.2.0',

  initialState: 'available',

  states: ['available', 'disabled', 'blocked', 'requires_confirmation', 'requires_authority', 'queued', 'staged', 'running', 'complete', 'failed'],

  events: [
    'ENABLE', 'DISABLE', 'BLOCK', 'UNBLOCK', 'REQUEST_CONFIRM', 'CONFIRM', 'CANCEL_CONFIRM',
    'REQUEST_AUTHORITY', 'PROVIDE_AUTHORITY', 'DENY_AUTHORITY', 'QUEUE', 'DEQUEUE',
    'STAGE', 'UNSTAGE', 'EXECUTE', 'COMPLETE', 'FAIL', 'RETRY', 'RESET',
  ],

  createContext: (): CommandContext => ({
    authority: 'AUTH_0_OBSERVE',
    requiredAuthority: 'AUTH_0_OBSERVE',
    requiresConfirmation: false,
    confirmed: false,
    policyBlocked: false,
    commandId: '',
    label: '',
    isDestructive: false,
  }),

  stateActions: {
    running: { entry: (ctx) => { /* emit trace: command.start */ } },
    complete: { entry: (ctx) => { /* emit trace: command.complete */ } },
    failed: { entry: (ctx) => { /* emit trace: command.failed */ } },
  },

  transitions: [
    // ── AVAILABLE ──
    { from: 'available', event: 'DISABLE', to: 'disabled', description: 'Command disabled' },
    { from: 'available', event: 'BLOCK', to: 'blocked', guard: isPolicyBlocked, action: markBlocked, description: 'Blocked by policy' },
    { from: 'available', event: 'REQUEST_CONFIRM', to: 'requires_confirmation', guard: needsConfirmation, description: 'Requires confirmation' },
    { from: 'available', event: 'REQUEST_AUTHORITY', to: 'requires_authority', guard: (ctx) => !hasRequiredAuthority(ctx), description: 'Insufficient authority' },
    { from: 'available', event: 'QUEUE', to: 'queued', description: 'Queue command' },
    { from: 'available', event: 'STAGE', to: 'staged', guard: hasRequiredAuthority, description: 'Stage directly' },
    { from: 'available', event: 'EXECUTE', to: 'running', guard: hasRequiredAuthority, description: 'Execute directly' },

    // ── DISABLED ──
    { from: 'disabled', event: 'ENABLE', to: 'available', description: 'Enable command' },

    // ── BLOCKED ──
    { from: 'blocked', event: 'UNBLOCK', to: 'available', guard: (ctx) => !ctx.policyBlocked, action: clearBlock, description: 'Unblock command' },
    { from: 'blocked', event: 'DISABLE', to: 'disabled', description: 'Disable while blocked' },

    // ── REQUIRES_CONFIRMATION ──
    { from: 'requires_confirmation', event: 'CONFIRM', to: 'available', guard: isConfirmed, action: markConfirmed, description: 'Confirmed, return to available' },
    { from: 'requires_confirmation', event: 'CONFIRM', to: 'staged', guard: isConfirmed, description: 'Confirm and stage' },
    { from: 'requires_confirmation', event: 'CANCEL_CONFIRM', to: 'available', action: clearConfirmed, description: 'Cancel confirmation' },

    // ── REQUIRES_AUTHORITY ──
    { from: 'requires_authority', event: 'PROVIDE_AUTHORITY', to: 'available', guard: hasRequiredAuthority, description: 'Authority provided' },
    { from: 'requires_authority', event: 'DENY_AUTHORITY', to: 'available', description: 'Authority denied / cancel' },

    // ── QUEUED ──
    { from: 'queued', event: 'DEQUEUE', to: 'available', description: 'Dequeue command' },
    { from: 'queued', event: 'STAGE', to: 'staged', description: 'Stage queued command' },
    { from: 'queued', event: 'DISABLE', to: 'disabled', description: 'Disable queued command' },

    // ── STAGED ──
    { from: 'staged', event: 'UNSTAGE', to: 'available', description: 'Unstage command' },
    { from: 'staged', event: 'EXECUTE', to: 'running', guard: hasRequiredAuthority, description: 'Execute staged command' },
    { from: 'staged', event: 'DISABLE', to: 'disabled', description: 'Disable staged command' },

    // ── RUNNING ──
    { from: 'running', event: 'COMPLETE', to: 'complete', description: 'Command completed' },
    { from: 'running', event: 'FAIL', to: 'failed', action: markFailed, description: 'Command failed' },

    // ── COMPLETE ──
    { from: 'complete', event: 'RESET', to: 'available', action: clearConfirmed, description: 'Reset to available' },

    // ── FAILED ──
    { from: 'failed', event: 'RETRY', to: 'queued', description: 'Retry failed command' },
    { from: 'failed', event: 'RESET', to: 'available', description: 'Reset failed command' },
    { from: 'failed', event: 'STAGE', to: 'staged', description: 'Re-stage failed command' },
  ],
};

// ───────────────────────────────────────────────────────────────────────────────
// Factory
// ───────────────────────────────────────────────────────────────────────────────

/**
 * Create a command lifecycle machine instance.
 *
 * @param commandId — Unique command identifier.
 * @param label — Human-readable command label.
 * @param requiredAuthority — Minimum authority for this command.
 * @param overrides — Optional context overrides.
 */
export function createCommandLifecycleMachine(
  commandId: string,
  label: string,
  requiredAuthority?: string,
  overrides?: Partial<CommandContext>,
) {
  return createMachine(commandLifecycleMachineDefinition, {
    context: {
      commandId,
      label,
      authority: 'AUTH_0_OBSERVE',
      requiredAuthority: requiredAuthority ?? 'AUTH_0_OBSERVE',
      requiresConfirmation: false,
      confirmed: false,
      policyBlocked: false,
      isDestructive: false,
      ...overrides,
    },
  });
}
