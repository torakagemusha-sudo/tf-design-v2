/**
 * @fileoverview authorityLifecycleMachine.ts — Authority Lifecycle State Machine
 *
 * Models the full authority and authentication lifecycle for operators in
 * the Torafirma system. Progresses through 7 authority levels (AUTH_0 through
 * AUTH_6), plus states for expiration, revocation, and escalation.
 *
 * **12 states**: unauthenticated → authenticating → AUTH_0 → AUTH_1 → AUTH_2 →
 * AUTH_3 → AUTH_4 → AUTH_5 → AUTH_6 → expired → revoked → escalated
 *
 * Spec: 01 Section 6 — Authority Model
 *
 * @module torafirma/state-machines/authorityLifecycle
 * @version 2.0.0
 */

import { type StateMachineDefinition, type GuardFunction, type ActionFunction } from './types';

// ───────────────────────────────────────────────────────────────────────────────
// State & Event Unions
// ───────────────────────────────────────────────────────────────────────────────

/** The 12 authority lifecycle states. */
export type AuthorityState =
  | 'unauthenticated'
  | 'authenticating'
  | 'AUTH_0'
  | 'AUTH_1'
  | 'AUTH_2'
  | 'AUTH_3'
  | 'AUTH_4'
  | 'AUTH_5'
  | 'AUTH_6'
  | 'expired'
  | 'revoked'
  | 'escalated';

/** All events the authority lifecycle machine accepts. */
export type AuthorityEvent =
  | 'LOGIN'
  | 'AUTHENTICATE'
  | 'AUTH_FAIL'
  | 'AUTH_RETRY'
  | 'ELEVATE_TO_1'
  | 'ELEVATE_TO_2'
  | 'ELEVATE_TO_3'
  | 'ELEVATE_TO_4'
  | 'ELEVATE_TO_5'
  | 'ELEVATE_TO_6'
  | 'ELEVATE_DENIED'
  | 'DEESCALATE'
  | 'EXPIRE'
  | 'RENEW'
  | 'REVOKE'
  | 'REQUEST_ESCALATION'
  | 'GRANT_ESCALATION'
  | 'DENY_ESCALATION'
  | 'LOGOUT'
  | 'FORCE_REVOKE';

// ───────────────────────────────────────────────────────────────────────────────
// Context
// ───────────────────────────────────────────────────────────────────────────────

/** Context for the authority lifecycle machine. */
export interface AuthorityContext {
  /** Currently held authority level. */
  currentLevel: number;

  /** Maximum authority this operator can achieve. */
  maxLevel: number;

  /** Operator identifier. */
  operatorId: string;

  /** Operator display name. */
  operatorName: string;

  /** Session expiry timestamp (ISO 8601). */
  sessionExpiry?: string;

  /** Whether MFA is required for this operator. */
  mfaRequired: boolean;

  /** Whether MFA has been completed. */
  mfaCompleted: boolean;

  /** Escalation reason code. */
  escalationReason?: string;

  /** Revocation reason code. */
  revocationReason?: string;

  /** Authentication failure count. */
  authFailCount: number;

  /** Maximum allowed auth failures before lockout. */
  maxAuthFails: number;
}

// ───────────────────────────────────────────────────────────────────────────────
// Guards
// ───────────────────────────────────────────────────────────────────────────────

const canElevateTo = (targetLevel: number): GuardFunction<AuthorityContext> => (ctx) =>
  ctx.currentLevel >= targetLevel - 1 && ctx.maxLevel >= targetLevel;

const mfaComplete: GuardFunction<AuthorityContext> = (ctx) =>
  !ctx.mfaRequired || ctx.mfaCompleted;

const withinAuthLimit: GuardFunction<AuthorityContext> = (ctx) =>
  ctx.authFailCount < ctx.maxAuthFails;

const hasEscalationAuthority: GuardFunction<AuthorityContext> = (ctx) =>
  ctx.maxLevel >= 5;

// ───────────────────────────────────────────────────────────────────────────────
// Actions
// ───────────────────────────────────────────────────────────────────────────────

const setLevel = (level: number): ActionFunction<AuthorityContext> => (ctx) => {
  ctx.currentLevel = level;
};

const incrementFail: ActionFunction<AuthorityContext> = (ctx) => {
  ctx.authFailCount += 1;
};

const resetFails: ActionFunction<AuthorityContext> = (ctx) => {
  ctx.authFailCount = 0;
};

const markExpired: ActionFunction<AuthorityContext> = (ctx) => {
  ctx.sessionExpiry = new Date().toISOString();
};

const markRevoked: ActionFunction<AuthorityContext> = (ctx, payload) => {
  ctx.revocationReason = typeof payload === 'string' ? payload : 'ADMIN_REVOKE';
};

const setEscalationReason: ActionFunction<AuthorityContext> = (ctx, payload) => {
  ctx.escalationReason = typeof payload === 'string' ? payload : 'OPERATOR_REQUEST';
};

// ───────────────────────────────────────────────────────────────────────────────
// Machine Definition
// ───────────────────────────────────────────────────────────────────────────────

/**
 * Authority lifecycle state machine — 12 states, 40+ transitions.
 *
 * Authority ladder:
 * ```
 * AUTH_0 (Observe) → AUTH_1 (Draft) → AUTH_2 (Stage) → AUTH_3 (Execute)
 *   → AUTH_4 (Commit) → AUTH_5 (Override) → AUTH_6 (Root)
 * ```
 */
export const authorityLifecycleMachineDefinition: StateMachineDefinition<
  AuthorityState,
  AuthorityEvent,
  AuthorityContext
> = {
  id: 'torafirma.authority.lifecycle',
  name: 'Authority Lifecycle State Machine',
  description: 'Models authentication, authority levels, escalation, expiration, and revocation.',
  version: '2.0.0',

  initialState: 'unauthenticated',

  states: [
    'unauthenticated', 'authenticating',
    'AUTH_0', 'AUTH_1', 'AUTH_2', 'AUTH_3', 'AUTH_4', 'AUTH_5', 'AUTH_6',
    'expired', 'revoked', 'escalated',
  ],

  events: [
    'LOGIN', 'AUTHENTICATE', 'AUTH_FAIL', 'AUTH_RETRY',
    'ELEVATE_TO_1', 'ELEVATE_TO_2', 'ELEVATE_TO_3', 'ELEVATE_TO_4',
    'ELEVATE_TO_5', 'ELEVATE_TO_6', 'ELEVATE_DENIED',
    'DEESCALATE', 'EXPIRE', 'RENEW', 'REVOKE',
    'REQUEST_ESCALATION', 'GRANT_ESCALATION', 'DENY_ESCALATION',
    'LOGOUT', 'FORCE_REVOKE',
  ],

  createContext: (): AuthorityContext => ({
    currentLevel: -1,
    maxLevel: 0,
    operatorId: '',
    operatorName: '',
    mfaRequired: false,
    mfaCompleted: false,
    authFailCount: 0,
    maxAuthFails: 5,
  }),

  stateActions: {
    AUTH_6: {
      entry: (ctx) => { /* emit audit: root.access */ },
    },
    revoked: {
      entry: (ctx) => { /* emit audit: authority.revoked */ },
    },
    escalated: {
      entry: (ctx) => { /* emit audit: authority.escalated */ },
    },
  },

  transitions: [
    // ── UNAUTHENTICATED ──
    { from: 'unauthenticated', event: 'LOGIN', to: 'authenticating', description: 'Begin authentication' },

    // ── AUTHENTICATING ──
    { from: 'authenticating', event: 'AUTHENTICATE', to: 'AUTH_0', guard: mfaComplete, action: [resetFails, setLevel(0)], description: 'Authenticated at base level' },
    { from: 'authenticating', event: 'AUTH_FAIL', to: 'authenticating', guard: withinAuthLimit, action: incrementFail, description: 'Auth failed, retry allowed' },
    { from: 'authenticating', event: 'AUTH_FAIL', to: 'revoked', guard: (ctx) => ctx.authFailCount >= ctx.maxAuthFails, action: markRevoked, description: 'Too many failures, revoked' },
    { from: 'authenticating', event: 'AUTH_RETRY', to: 'authenticating', description: 'Retry authentication' },
    { from: 'authenticating', event: 'LOGOUT', to: 'unauthenticated', description: 'Cancel authentication' },

    // ── AUTH_0 (Observe) ──
    { from: 'AUTH_0', event: 'ELEVATE_TO_1', to: 'AUTH_1', guard: canElevateTo(1), action: setLevel(1), description: 'Elevate to Draft' },
    { from: 'AUTH_0', event: 'EXPIRE', to: 'expired', action: markExpired, description: 'Session expired' },
    { from: 'AUTH_0', event: 'REVOKE', to: 'revoked', action: markRevoked, description: 'Authority revoked' },
    { from: 'AUTH_0', event: 'LOGOUT', to: 'unauthenticated', action: setLevel(-1), description: 'Logout' },
    { from: 'AUTH_0', event: 'REQUEST_ESCALATION', to: 'escalated', description: 'Request escalation' },

    // ── AUTH_1 (Draft) ──
    { from: 'AUTH_1', event: 'ELEVATE_TO_2', to: 'AUTH_2', guard: canElevateTo(2), action: setLevel(2), description: 'Elevate to Stage' },
    { from: 'AUTH_1', event: 'DEESCALATE', to: 'AUTH_0', action: setLevel(0), description: 'Deescalate to Observe' },
    { from: 'AUTH_1', event: 'EXPIRE', to: 'expired', action: markExpired, description: 'Session expired' },
    { from: 'AUTH_1', event: 'REVOKE', to: 'revoked', action: markRevoked, description: 'Authority revoked' },
    { from: 'AUTH_1', event: 'LOGOUT', to: 'unauthenticated', action: setLevel(-1), description: 'Logout' },
    { from: 'AUTH_1', event: 'REQUEST_ESCALATION', to: 'escalated', description: 'Request escalation' },

    // ── AUTH_2 (Stage) ──
    { from: 'AUTH_2', event: 'ELEVATE_TO_3', to: 'AUTH_3', guard: canElevateTo(3), action: setLevel(3), description: 'Elevate to Execute' },
    { from: 'AUTH_2', event: 'DEESCALATE', to: 'AUTH_1', action: setLevel(1), description: 'Deescalate to Draft' },
    { from: 'AUTH_2', event: 'EXPIRE', to: 'expired', action: markExpired, description: 'Session expired' },
    { from: 'AUTH_2', event: 'REVOKE', to: 'revoked', action: markRevoked, description: 'Authority revoked' },
    { from: 'AUTH_2', event: 'LOGOUT', to: 'unauthenticated', action: setLevel(-1), description: 'Logout' },
    { from: 'AUTH_2', event: 'REQUEST_ESCALATION', to: 'escalated', description: 'Request escalation' },

    // ── AUTH_3 (Execute) ──
    { from: 'AUTH_3', event: 'ELEVATE_TO_4', to: 'AUTH_4', guard: canElevateTo(4), action: setLevel(4), description: 'Elevate to Commit' },
    { from: 'AUTH_3', event: 'DEESCALATE', to: 'AUTH_2', action: setLevel(2), description: 'Deescalate to Stage' },
    { from: 'AUTH_3', event: 'EXPIRE', to: 'expired', action: markExpired, description: 'Session expired' },
    { from: 'AUTH_3', event: 'REVOKE', to: 'revoked', action: markRevoked, description: 'Authority revoked' },
    { from: 'AUTH_3', event: 'LOGOUT', to: 'unauthenticated', action: setLevel(-1), description: 'Logout' },
    { from: 'AUTH_3', event: 'REQUEST_ESCALATION', to: 'escalated', description: 'Request escalation' },

    // ── AUTH_4 (Commit) ──
    { from: 'AUTH_4', event: 'ELEVATE_TO_5', to: 'AUTH_5', guard: canElevateTo(5), action: setLevel(5), description: 'Elevate to Override' },
    { from: 'AUTH_4', event: 'DEESCALATE', to: 'AUTH_3', action: setLevel(3), description: 'Deescalate to Execute' },
    { from: 'AUTH_4', event: 'EXPIRE', to: 'expired', action: markExpired, description: 'Session expired' },
    { from: 'AUTH_4', event: 'REVOKE', to: 'revoked', action: markRevoked, description: 'Authority revoked' },
    { from: 'AUTH_4', event: 'LOGOUT', to: 'unauthenticated', action: setLevel(-1), description: 'Logout' },
    { from: 'AUTH_4', event: 'REQUEST_ESCALATION', to: 'escalated', description: 'Request escalation' },

    // ── AUTH_5 (Override) ──
    { from: 'AUTH_5', event: 'ELEVATE_TO_6', to: 'AUTH_6', guard: canElevateTo(6), action: setLevel(6), description: 'Elevate to Root' },
    { from: 'AUTH_5', event: 'DEESCALATE', to: 'AUTH_4', action: setLevel(4), description: 'Deescalate to Commit' },
    { from: 'AUTH_5', event: 'EXPIRE', to: 'expired', action: markExpired, description: 'Session expired' },
    { from: 'AUTH_5', event: 'REVOKE', to: 'revoked', action: markRevoked, description: 'Authority revoked' },
    { from: 'AUTH_5', event: 'LOGOUT', to: 'unauthenticated', action: setLevel(-1), description: 'Logout' },

    // ── AUTH_6 (Root) ──
    { from: 'AUTH_6', event: 'DEESCALATE', to: 'AUTH_5', action: setLevel(5), description: 'Deescalate to Override' },
    { from: 'AUTH_6', event: 'EXPIRE', to: 'expired', action: markExpired, description: 'Session expired' },
    { from: 'AUTH_6', event: 'REVOKE', to: 'revoked', action: markRevoked, description: 'Authority revoked' },
    { from: 'AUTH_6', event: 'LOGOUT', to: 'unauthenticated', action: setLevel(-1), description: 'Logout' },

    // ── EXPIRED ──
    { from: 'expired', event: 'RENEW', to: 'authenticating', description: 'Renew session' },
    { from: 'expired', event: 'LOGOUT', to: 'unauthenticated', description: 'Logout from expired' },

    // ── REVOKED ──
    { from: 'revoked', event: 'LOGIN', to: 'authenticating', description: 'Re-authenticate after revocation' },

    // ── ESCALATED ──
    { from: 'escalated', event: 'GRANT_ESCALATION', to: 'AUTH_5', guard: hasEscalationAuthority, action: setLevel(5), description: 'Escalation granted' },
    { from: 'escalated', event: 'DENY_ESCALATION', to: 'AUTH_0', action: setLevel(0), description: 'Escalation denied' },
    { from: 'escalated', event: 'ELEVATE_DENIED', to: 'AUTH_0', action: setLevel(0), description: 'Escalation denied' },
  ],
};

// ───────────────────────────────────────────────────────────────────────────────
// Factory
// ───────────────────────────────────────────────────────────────────────────────

/**
 * Create an authority lifecycle machine instance.
 *
 * @param operatorId — Unique operator identifier.
 * @param operatorName — Operator display name.
 * @param maxLevel — Maximum authority level this operator can achieve.
 * @param overrides — Optional context overrides.
 */
export function createAuthorityLifecycleMachine(
  operatorId: string,
  operatorName: string,
  maxLevel?: number,
  overrides?: Partial<AuthorityContext>,
) {
  const { createMachine } = require('./createMachine') as typeof import('./createMachine');
  return createMachine(authorityLifecycleMachineDefinition, {
    context: {
      operatorId,
      operatorName,
      currentLevel: -1,
      maxLevel: maxLevel ?? 6,
      mfaRequired: false,
      mfaCompleted: false,
      authFailCount: 0,
      maxAuthFails: 5,
      ...overrides,
    },
  });
}
