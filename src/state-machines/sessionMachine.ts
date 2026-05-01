/**
 * @fileoverview sessionMachine.ts — User Session State Machine
 *
 * Models the full user session lifecycle from anonymous browsing through
 * identification, active use, idle detection, warning, extension, and
 * termination.
 *
 * **8 states**: anonymous → identifying → active → idle → warning →
 * extended → terminated → logged_out
 *
 * @module torafirma/state-machines/session
 * @version 2.0.0
 */

import { type StateMachineDefinition, type GuardFunction, type ActionFunction } from './types';

// ───────────────────────────────────────────────────────────────────────────────
// State & Event Unions
// ───────────────────────────────────────────────────────────────────────────────

/** The 8 session states. */
export type SessionState =
  | 'anonymous'
  | 'identifying'
  | 'active'
  | 'idle'
  | 'warning'
  | 'extended'
  | 'terminated'
  | 'logged_out';

/** All events the session machine accepts. */
export type SessionEvent =
  | 'BEGIN_IDENTIFY'
  | 'IDENTIFY_SUCCESS'
  | 'IDENTIFY_FAIL'
  | 'ACTIVATE'
  | 'GO_IDLE'
  | 'WAKE'
  | 'WARN_TIMEOUT'
  | 'ACKNOWLEDGE_WARNING'
  | 'EXTEND'
  | 'EXTENSION_EXPIRE'
  | 'TERMINATE'
  | 'LOGOUT'
  | 'REAUTHENTICATE'
  | 'SESSION_EXPIRE'
  | 'FORCE_LOGOUT';

// ───────────────────────────────────────────────────────────────────────────────
// Context
// ───────────────────────────────────────────────────────────────────────────────

/** Context for the session machine. */
export interface SessionContext {
  /** Session identifier. */
  sessionId: string;

  /** User identifier. */
  userId: string;

  /** User display name. */
  userName: string;

  /** Current authority level. */
  authority: string;

  /** Idle timeout in milliseconds. */
  idleTimeoutMs: number;

  /** Warning timeout in milliseconds. */
  warningTimeoutMs: number;

  /** Extension count (how many times extended). */
  extensionCount: number;

  /** Maximum allowed extensions. */
  maxExtensions: number;

  /** Session start timestamp (ISO 8601). */
  sessionStart?: string;

  /** Last activity timestamp (ISO 8601). */
  lastActivity?: string;

  /** Termination reason code. */
  terminationReason?: string;
}

// ───────────────────────────────────────────────────────────────────────────────
// Guards
// ───────────────────────────────────────────────────────────────────────────────

const canExtend: GuardFunction<SessionContext> = (ctx) =>
  ctx.extensionCount < ctx.maxExtensions;

const hasActivity: GuardFunction<SessionContext> = (ctx) =>
  !!ctx.lastActivity;

// ───────────────────────────────────────────────────────────────────────────────
// Actions
// ───────────────────────────────────────────────────────────────────────────────

const recordSessionStart: ActionFunction<SessionContext> = (ctx) => {
  ctx.sessionStart = new Date().toISOString();
  ctx.lastActivity = ctx.sessionStart;
};

const recordActivity: ActionFunction<SessionContext> = (ctx) => {
  ctx.lastActivity = new Date().toISOString();
};

const incrementExtension: ActionFunction<SessionContext> = (ctx) => {
  ctx.extensionCount += 1;
};

const recordTermination: ActionFunction<SessionContext> = (ctx, payload) => {
  ctx.terminationReason = typeof payload === 'string' ? payload : 'SESSION_TERMINATED';
};

const clearSession: ActionFunction<SessionContext> = (ctx) => {
  ctx.sessionId = '';
  ctx.userId = '';
  ctx.userName = '';
  ctx.authority = 'AUTH_0_OBSERVE';
  ctx.extensionCount = 0;
};

// ───────────────────────────────────────────────────────────────────────────────
// Machine Definition
// ───────────────────────────────────────────────────────────────────────────────

/**
 * User session state machine — 8 states, 25+ transitions.
 *
 * Flow:
 * ```
 * anonymous → identifying → active → idle → warning → extended → active
 *                                                    ↓
 *                                              terminated → logged_out
 * ```
 */
export const sessionMachineDefinition: StateMachineDefinition<
  SessionState,
  SessionEvent,
  SessionContext
> = {
  id: 'torafirma.session',
  name: 'User Session State Machine',
  description: 'Full user session lifecycle with idle detection, warning, extension, and termination.',
  version: '2.0.0',

  initialState: 'anonymous',

  states: ['anonymous', 'identifying', 'active', 'idle', 'warning', 'extended', 'terminated', 'logged_out'],

  events: [
    'BEGIN_IDENTIFY', 'IDENTIFY_SUCCESS', 'IDENTIFY_FAIL', 'ACTIVATE', 'GO_IDLE',
    'WAKE', 'WARN_TIMEOUT', 'ACKNOWLEDGE_WARNING', 'EXTEND', 'EXTENSION_EXPIRE',
    'TERMINATE', 'LOGOUT', 'REAUTHENTICATE', 'SESSION_EXPIRE', 'FORCE_LOGOUT',
  ],

  createContext: (): SessionContext => ({
    sessionId: '',
    userId: '',
    userName: '',
    authority: 'AUTH_0_OBSERVE',
    idleTimeoutMs: 300000,
    warningTimeoutMs: 60000,
    extensionCount: 0,
    maxExtensions: 3,
  }),

  stateActions: {
    active: {
      entry: recordActivity,
    },
    extended: {
      entry: [incrementExtension, recordActivity],
    },
    terminated: {
      entry: recordTermination,
    },
  },

  transitions: [
    // ── ANONYMOUS ──
    { from: 'anonymous', event: 'BEGIN_IDENTIFY', to: 'identifying', description: 'Begin identification' },

    // ── IDENTIFYING ──
    { from: 'identifying', event: 'IDENTIFY_SUCCESS', to: 'active', action: recordSessionStart, description: 'Identification successful' },
    { from: 'identifying', event: 'IDENTIFY_FAIL', to: 'anonymous', description: 'Identification failed' },

    // ── ACTIVE ──
    { from: 'active', event: 'GO_IDLE', to: 'idle', description: 'User went idle' },
    { from: 'active', event: 'LOGOUT', to: 'logged_out', action: clearSession, description: 'User logout' },
    { from: 'active', event: 'SESSION_EXPIRE', to: 'terminated', action: recordTermination, description: 'Session expired' },
    { from: 'active', event: 'FORCE_LOGOUT', to: 'terminated', action: recordTermination, description: 'Force logout' },
    { from: 'active', event: 'ACTIVATE', to: 'active', action: recordActivity, description: 'Activity heartbeat' },

    // ── IDLE ──
    { from: 'idle', event: 'WAKE', to: 'active', action: recordActivity, description: 'User activity detected' },
    { from: 'idle', event: 'WARN_TIMEOUT', to: 'warning', description: 'Warning before timeout' },
    { from: 'idle', event: 'TERMINATE', to: 'terminated', action: recordTermination, description: 'Idle timeout' },
    { from: 'idle', event: 'LOGOUT', to: 'logged_out', action: clearSession, description: 'Logout while idle' },

    // ── WARNING ──
    { from: 'warning', event: 'ACKNOWLEDGE_WARNING', to: 'extended', guard: canExtend, description: 'Acknowledge, extend session' },
    { from: 'warning', event: 'ACKNOWLEDGE_WARNING', to: 'terminated', guard: (ctx) => ctx.extensionCount >= ctx.maxExtensions, action: recordTermination, description: 'Max extensions reached' },
    { from: 'warning', event: 'WAKE', to: 'active', action: recordActivity, description: 'Activity during warning' },
    { from: 'warning', event: 'TERMINATE', to: 'terminated', action: recordTermination, description: 'Warning timeout' },
    { from: 'warning', event: 'LOGOUT', to: 'logged_out', action: clearSession, description: 'Logout during warning' },

    // ── EXTENDED ──
    { from: 'extended', event: 'WAKE', to: 'active', action: recordActivity, description: 'Activity after extension' },
    { from: 'extended', event: 'GO_IDLE', to: 'idle', description: 'Go idle after extension' },
    { from: 'extended', event: 'EXTENSION_EXPIRE', to: 'warning', description: 'Extension expiring' },
    { from: 'extended', event: 'LOGOUT', to: 'logged_out', action: clearSession, description: 'Logout while extended' },

    // ── TERMINATED ──
    { from: 'terminated', event: 'REAUTHENTICATE', to: 'identifying', description: 'Re-authenticate' },
    { from: 'terminated', event: 'LOGOUT', to: 'logged_out', action: clearSession, description: 'Logout from terminated' },

    // ── LOGGED_OUT ──
    { from: 'logged_out', event: 'BEGIN_IDENTIFY', to: 'identifying', description: 'Begin new session' },
  ],
};

// ───────────────────────────────────────────────────────────────────────────────
// Factory
// ───────────────────────────────────────────────────────────────────────────────

/**
 * Create a user session machine instance.
 *
 * @param sessionId — Session identifier.
 * @param idleTimeoutMs — Idle timeout in milliseconds (default: 5 min).
 * @param overrides — Optional context overrides.
 */
export function createSessionMachine(
  sessionId?: string,
  idleTimeoutMs?: number,
  overrides?: Partial<SessionContext>,
) {
  const { createMachine } = require('./createMachine') as typeof import('./createMachine');
  return createMachine(sessionMachineDefinition, {
    context: {
      sessionId: sessionId ?? '',
      userId: '',
      userName: '',
      authority: 'AUTH_0_OBSERVE',
      idleTimeoutMs: idleTimeoutMs ?? 300000,
      warningTimeoutMs: 60000,
      extensionCount: 0,
      maxExtensions: 3,
      ...overrides,
    },
  });
}
