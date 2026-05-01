/**
 * @fileoverview runtimeConnectionMachine.ts — Runtime Connection State Machine
 *
 * Models the connection lifecycle between Torafirma products and their
 * target runtimes (local daemon, cloud worker, container, GPU server, etc.).
 * Includes circuit breaker semantics for fault tolerance.
 *
 * **9 states**: disconnected → connecting → connected → degraded →
 * reconnecting → failed → circuit_open → circuit_half_open → offline
 *
 * Spec: 01 Section 9 — Runtime Boundary Rules
 *
 * @module torafirma/state-machines/runtimeConnection
 * @version 2.0.0
 */

import { type StateMachineDefinition, type GuardFunction, type ActionFunction } from './types';

// ───────────────────────────────────────────────────────────────────────────────
// State & Event Unions
// ───────────────────────────────────────────────────────────────────────────────

/** The 9 runtime connection states. */
export type RuntimeConnectionState =
  | 'disconnected'
  | 'connecting'
  | 'connected'
  | 'degraded'
  | 'reconnecting'
  | 'failed'
  | 'circuit_open'
  | 'circuit_half_open'
  | 'offline';

/** All events the runtime connection machine accepts. */
export type RuntimeConnectionEvent =
  | 'CONNECT'
  | 'CONNECTION_SUCCESS'
  | 'CONNECTION_FAIL'
  | 'DISCONNECT'
  | 'DEGRADE'
  | 'RECOVER'
  | 'RECONNECT'
  | 'RECONNECT_SUCCESS'
  | 'RECONNECT_FAIL'
  | 'FAULT'
  | 'CIRCUIT_OPEN'
  | 'CIRCUIT_HALF_OPEN'
  | 'CIRCUIT_CLOSE'
  | 'GO_OFFLINE'
  | 'COME_ONLINE'
  | 'TIMEOUT'
  | 'HEALTH_CHECK_PASS'
  | 'HEALTH_CHECK_FAIL';

// ───────────────────────────────────────────────────────────────────────────────
// Context
// ───────────────────────────────────────────────────────────────────────────────

/** Context for the runtime connection machine. */
export interface RuntimeConnectionContext {
  /** Runtime target identifier. */
  runtimeId: string;

  /** Runtime display name. */
  runtimeName: string;

  /** Connection URL or endpoint. */
  endpoint: string;

  /** Number of consecutive connection failures. */
  failCount: number;

  /** Maximum failures before circuit opens. */
  maxFailures: number;

  /** Number of reconnection attempts. */
  reconnectAttempts: number;

  /** Maximum reconnection attempts. */
  maxReconnectAttempts: number;

  /** Last successful connection timestamp (ISO 8601). */
  lastConnected?: string;

  /** Latency in milliseconds (when connected). */
  latencyMs: number;

  /** Latency threshold for degraded state (ms). */
  degradedThresholdMs: number;
}

// ───────────────────────────────────────────────────────────────────────────────
// Guards
// ───────────────────────────────────────────────────────────────────────────────

const belowFailureThreshold: GuardFunction<RuntimeConnectionContext> = (ctx) =>
  ctx.failCount < ctx.maxFailures;

const atFailureThreshold: GuardFunction<RuntimeConnectionContext> = (ctx) =>
  ctx.failCount >= ctx.maxFailures;

const belowReconnectLimit: GuardFunction<RuntimeConnectionContext> = (ctx) =>
  ctx.reconnectAttempts < ctx.maxReconnectAttempts;

const atReconnectLimit: GuardFunction<RuntimeConnectionContext> = (ctx) =>
  ctx.reconnectAttempts >= ctx.maxReconnectAttempts;

const isDegradedLatency: GuardFunction<RuntimeConnectionContext> = (ctx) =>
  ctx.latencyMs > ctx.degradedThresholdMs;

// ───────────────────────────────────────────────────────────────────────────────
// Actions
// ───────────────────────────────────────────────────────────────────────────────

const recordConnect: ActionFunction<RuntimeConnectionContext> = (ctx) => {
  ctx.failCount = 0;
  ctx.reconnectAttempts = 0;
};

const recordFail: ActionFunction<RuntimeConnectionContext> = (ctx) => {
  ctx.failCount += 1;
};

const recordReconnectAttempt: ActionFunction<RuntimeConnectionContext> = (ctx) => {
  ctx.reconnectAttempts += 1;
};

const recordConnected: ActionFunction<RuntimeConnectionContext> = (ctx) => {
  ctx.lastConnected = new Date().toISOString();
  ctx.failCount = 0;
  ctx.reconnectAttempts = 0;
};

const openCircuit: ActionFunction<RuntimeConnectionContext> = (ctx) => {
  /* emit trace: circuit.open */
};

// ───────────────────────────────────────────────────────────────────────────────
// Machine Definition
// ───────────────────────────────────────────────────────────────────────────────

/**
 * Runtime connection state machine — 9 states, 35+ transitions.
 *
 * Connection flow:
 * ```
 * disconnected → connecting → connected
 * connected → degraded (high latency)
 * connected → disconnected (clean)
 * connected → failed (fault)
 * failed → reconnecting
 * reconnecting → connected (success)
 * reconnecting → circuit_open (max failures)
 * circuit_open → circuit_half_open (probe)
 * circuit_half_open → connected (probe success)
 * circuit_half_open → circuit_open (probe fail)
 * ```
 */
export const runtimeConnectionMachineDefinition: StateMachineDefinition<
  RuntimeConnectionState,
  RuntimeConnectionEvent,
  RuntimeConnectionContext
> = {
  id: 'torafirma.runtime.connection',
  name: 'Runtime Connection State Machine',
  description: 'Connection lifecycle with circuit breaker for runtime targets.',
  version: '2.0.0',

  initialState: 'disconnected',

  states: [
    'disconnected', 'connecting', 'connected', 'degraded',
    'reconnecting', 'failed', 'circuit_open', 'circuit_half_open', 'offline',
  ],

  events: [
    'CONNECT', 'CONNECTION_SUCCESS', 'CONNECTION_FAIL', 'DISCONNECT', 'DEGRADE',
    'RECOVER', 'RECONNECT', 'RECONNECT_SUCCESS', 'RECONNECT_FAIL', 'FAULT',
    'CIRCUIT_OPEN', 'CIRCUIT_HALF_OPEN', 'CIRCUIT_CLOSE', 'GO_OFFLINE',
    'COME_ONLINE', 'TIMEOUT', 'HEALTH_CHECK_PASS', 'HEALTH_CHECK_FAIL',
  ],

  createContext: (): RuntimeConnectionContext => ({
    runtimeId: '',
    runtimeName: '',
    endpoint: '',
    failCount: 0,
    maxFailures: 5,
    reconnectAttempts: 0,
    maxReconnectAttempts: 3,
    latencyMs: 0,
    degradedThresholdMs: 500,
  }),

  stateActions: {
    connected: {
      entry: recordConnected,
    },
    circuit_open: {
      entry: openCircuit,
    },
  },

  transitions: [
    // ── DISCONNECTED ──
    { from: 'disconnected', event: 'CONNECT', to: 'connecting', description: 'Initiate connection' },
    { from: 'disconnected', event: 'GO_OFFLINE', to: 'offline', description: 'Go offline mode' },

    // ── CONNECTING ──
    { from: 'connecting', event: 'CONNECTION_SUCCESS', to: 'connected', action: recordConnect, description: 'Connection established' },
    { from: 'connecting', event: 'CONNECTION_FAIL', to: 'failed', action: recordFail, description: 'Connection failed' },
    { from: 'connecting', event: 'TIMEOUT', to: 'failed', action: recordFail, description: 'Connection timeout' },

    // ── CONNECTED ──
    { from: 'connected', event: 'DISCONNECT', to: 'disconnected', description: 'Clean disconnect' },
    { from: 'connected', event: 'DEGRADE', to: 'degraded', guard: isDegradedLatency, description: 'Latency degradation' },
    { from: 'connected', event: 'FAULT', to: 'failed', description: 'Runtime fault' },
    { from: 'connected', event: 'HEALTH_CHECK_FAIL', to: 'degraded', description: 'Health check failed' },
    { from: 'connected', event: 'GO_OFFLINE', to: 'offline', description: 'Enter offline mode' },

    // ── DEGRADED ──
    { from: 'degraded', event: 'RECOVER', to: 'connected', description: 'Recover from degradation' },
    { from: 'degraded', event: 'HEALTH_CHECK_PASS', to: 'connected', description: 'Health check recovered' },
    { from: 'degraded', event: 'FAULT', to: 'failed', description: 'Degradation escalated' },
    { from: 'degraded', event: 'DISCONNECT', to: 'disconnected', description: 'Disconnect from degraded' },
    { from: 'degraded', event: 'DEGRADE', to: 'failed', description: 'Severe degradation' },

    // ── RECONNECTING ──
    { from: 'reconnecting', event: 'RECONNECT_SUCCESS', to: 'connected', action: recordConnected, description: 'Reconnection succeeded' },
    { from: 'reconnecting', event: 'RECONNECT_FAIL', to: 'failed', guard: belowReconnectLimit, action: recordReconnectAttempt, description: 'Reconnection failed, retry' },
    { from: 'reconnecting', event: 'RECONNECT_FAIL', to: 'circuit_open', guard: atReconnectLimit, action: recordReconnectAttempt, description: 'Max reconnect attempts reached' },
    { from: 'reconnecting', event: 'TIMEOUT', to: 'failed', action: recordReconnectAttempt, description: 'Reconnection timeout' },

    // ── FAILED ──
    { from: 'failed', event: 'RECONNECT', to: 'reconnecting', description: 'Attempt reconnection' },
    { from: 'failed', event: 'CONNECT', to: 'connecting', description: 'Retry connection' },
    { from: 'failed', event: 'DISCONNECT', to: 'disconnected', description: 'Disconnect from failed' },
    { from: 'failed', event: 'CIRCUIT_OPEN', to: 'circuit_open', description: 'Open circuit breaker' },
    { from: 'failed', event: 'GO_OFFLINE', to: 'offline', description: 'Go offline from failed' },

    // ── CIRCUIT_OPEN ──
    { from: 'circuit_open', event: 'CIRCUIT_HALF_OPEN', to: 'circuit_half_open', description: 'Probe circuit' },
    { from: 'circuit_open', event: 'DISCONNECT', to: 'disconnected', description: 'Reset from circuit open' },
    { from: 'circuit_open', event: 'GO_OFFLINE', to: 'offline', description: 'Go offline' },

    // ── CIRCUIT_HALF_OPEN ──
    { from: 'circuit_half_open', event: 'CONNECT', to: 'connecting', description: 'Probe: attempt connect' },
    { from: 'circuit_half_open', event: 'CONNECTION_SUCCESS', to: 'connected', action: recordConnected, description: 'Probe succeeded' },
    { from: 'circuit_half_open', event: 'CONNECTION_FAIL', to: 'circuit_open', description: 'Probe failed' },
    { from: 'circuit_half_open', event: 'HEALTH_CHECK_PASS', to: 'connected', description: 'Health probe passed' },
    { from: 'circuit_half_open', event: 'HEALTH_CHECK_FAIL', to: 'circuit_open', description: 'Health probe failed' },

    // ── OFFLINE ──
    { from: 'offline', event: 'COME_ONLINE', to: 'disconnected', description: 'Return to online mode' },
    { from: 'offline', event: 'CONNECT', to: 'connecting', description: 'Connect from offline' },
  ],
};

// ───────────────────────────────────────────────────────────────────────────────
// Factory
// ───────────────────────────────────────────────────────────────────────────────

/**
 * Create a runtime connection machine instance.
 *
 * @param runtimeId — Runtime target identifier.
 * @param runtimeName — Human-readable runtime name.
 * @param endpoint — Connection endpoint URL.
 * @param overrides — Optional context overrides.
 */
export function createRuntimeConnectionMachine(
  runtimeId: string,
  runtimeName: string,
  endpoint: string,
  overrides?: Partial<RuntimeConnectionContext>,
) {
  const { createMachine } = require('./createMachine') as typeof import('./createMachine');
  return createMachine(runtimeConnectionMachineDefinition, {
    context: {
      runtimeId,
      runtimeName,
      endpoint,
      failCount: 0,
      maxFailures: 5,
      reconnectAttempts: 0,
      maxReconnectAttempts: 3,
      latencyMs: 0,
      degradedThresholdMs: 500,
      ...overrides,
    },
  });
}
