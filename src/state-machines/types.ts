/**
 * @fileoverview types.ts — Core State Machine Types
 *
 * The foundational type system for all Torafirma state machines.
 * Provides a fully-typed, deterministic finite state machine (DFSM) contract
 * used across component lifecycle, authority, validation, AI proposals,
 * runtime connection, trace/audit, and operational governance.
 *
 * @module @torakagemusha-sudo/tf-design-v2/state-machines/types
 * @version 0.2.0
 * @license MIT
 */

// ───────────────────────────────────────────────────────────────────────────────
// State & Event Primitives
// ───────────────────────────────────────────────────────────────────────────────

/** A state identifier — must be a string-keyed literal union per machine. */
export type State = string;

/** An event identifier — must be a string-keyed literal union per machine. */
export type Event = string;

/** Generic context object carried through state transitions. */
export type MachineContext = object;

// ───────────────────────────────────────────────────────────────────────────────
// Guard & Action Function Types
// ───────────────────────────────────────────────────────────────────────────────

/**
 * A guard function evaluates whether a transition is permitted.
 * Receives the current context and payload; returns a boolean.
 *
 * @template C — The machine context shape.
 * @template P — The event payload shape (optional).
 *
 * @example
 * ```ts
 * const hasAuthority: GuardFunction<{ authority: number }> = (ctx) => ctx.authority >= 3;
 * ```
 */
export type GuardFunction<C extends MachineContext = MachineContext, P = unknown> = (
  context: C,
  payload?: P,
) => boolean;

/**
 * An action function executes side effects on entry, exit, or transition.
 * Receives the current context and an optional event payload.
 *
 * @template C — The machine context shape.
 * @template P — The event payload shape (optional).
 *
 * @example
 * ```ts
 * const logTransition: ActionFunction<{ traceId: string }> = (ctx) => {
 *   console.log(`Trace ${ctx.traceId}: state changed`);
 * };
 * ```
 */
export type ActionFunction<C extends MachineContext = MachineContext, P = unknown> = (
  context: C,
  payload?: P,
) => void;

// ───────────────────────────────────────────────────────────────────────────────
// State Action (Entry / Exit)
// ───────────────────────────────────────────────────────────────────────────────

/**
 * Actions executed when entering or exiting a state.
 *
 * @template S — The state union type.
 * @template C — The machine context shape.
 */
/** Side-effect function or a sequence of functions run in order. */
export type ActionSequence<C extends MachineContext = MachineContext, P = unknown> =
  | ActionFunction<C, P>
  | readonly ActionFunction<C, P>[];

export interface StateAction<S extends State = State, C extends MachineContext = MachineContext> {
  /** Optional action invoked when the machine enters this state. */
  entry?: ActionSequence<C>;

  /** Optional action invoked when the machine exits this state. */
  exit?: ActionSequence<C>;

  /** The state to which these actions are bound. */
  state: S;
}

// ───────────────────────────────────────────────────────────────────────────────
// Transition Definition
// ───────────────────────────────────────────────────────────────────────────────

/**
 * A single transition within the state machine.
 *
 * Defines:
 * - The originating state (`from`)
 * - The triggering event (`event`)
 * - The destination state (`to`)
 * - An optional guard (`guard`) — if it returns false, the transition is blocked
 * - An optional action (`action`) — executed when the transition succeeds
 *
 * @template S — The state union type.
 * @template E — The event union type.
 * @template C — The machine context shape.
 *
 * @example
 * ```ts
 * const t: Transition<'idle', 'START', MyContext> = {
 *   from: 'idle',
 *   event: 'START',
 *   to: 'running',
 *   guard: (ctx) => ctx.ready === true,
 *   action: (ctx) => ctx.startTime = Date.now(),
 * };
 * ```
 */
export interface Transition<
  S extends State = State,
  E extends Event = Event,
  C extends MachineContext = MachineContext,
> {
  /** The source state for this transition. */
  from: S;

  /** The event that triggers this transition. */
  event: E;

  /** The destination state after this transition. */
  to: S;

  /** Optional guard — if present, must return true for transition to fire. */
  guard?: GuardFunction<C>;

  /** Optional action — executed when the transition successfully fires. */
  action?: ActionSequence<C>;

  /** Human-readable description of this transition's purpose. */
  description?: string;
}

// ───────────────────────────────────────────────────────────────────────────────
// State Machine Definition
// ───────────────────────────────────────────────────────────────────────────────

/**
 * The complete declarative definition of a deterministic finite state machine.
 *
 * All state machines in the Torafirma design system are built from this shape.
 *
 * @template S — The state union type.
 * @template E — The event union type.
 * @template C — The machine context shape.
 *
 * @example
 * ```ts
 * const myMachine: StateMachineDefinition<'idle' | 'running', 'START' | 'STOP'> = {
 *   initialState: 'idle',
 *   states: ['idle', 'running'],
 *   events: ['START', 'STOP'],
 *   transitions: [
 *     { from: 'idle', event: 'START', to: 'running' },
 *     { from: 'running', event: 'STOP', to: 'idle' },
 *   ],
 * };
 * ```
 */
export interface StateMachineDefinition<
  S extends State = State,
  E extends Event = Event,
  C extends MachineContext = MachineContext,
> {
  /** Unique identifier for this machine definition. */
  id: string;

  /** Human-readable name. */
  name: string;

  /** The state the machine begins in. Must be in `states`. */
  initialState: S;

  /** All possible states in this machine. */
  states: readonly S[];

  /** All possible events in this machine. */
  events: readonly E[];

  /** All valid state transitions. */
  transitions: readonly Transition<S, E, C>[];

  /** Optional entry/exit actions keyed by state. */
  stateActions?: Readonly<Partial<Record<S, Pick<StateAction<S, C>, 'entry' | 'exit'>>>>;

  /** Optional global context factory — called on machine creation. */
  createContext?: () => C;

  /** Optional description of this machine's purpose. */
  description?: string;

  /** Semantic version of this machine definition. */
  version?: string;
}

// ───────────────────────────────────────────────────────────────────────────────
// Transition Result
// ───────────────────────────────────────────────────────────────────────────────

/**
 * The result of attempting a state transition.
 */
export interface TransitionResult<S extends State = State> {
  /** Whether the transition succeeded. */
  success: boolean;

  /** The state after the transition attempt (unchanged on failure). */
  newState: S;

  /** The previous state before the transition attempt. */
  previousState: S;

  /** The event that triggered the transition attempt. */
  event: string;

  /** Human-readable reason if the transition failed or was blocked. */
  reason?: string;

  /** Reason code for programmatic handling of failures. */
  reasonCode?: string;

  /** Timestamp of the transition attempt. */
  timestamp: string;
}

// ───────────────────────────────────────────────────────────────────────────────
// State Machine Instance
// ───────────────────────────────────────────────────────────────────────────────

/**
 * A live, runnable instance of a state machine.
 *
 * Created by `createMachine()` from a `StateMachineDefinition`.
 *
 * @template S — The state union type.
 * @template E — The event union type.
 * @template C — The machine context shape.
 */
export interface StateMachineInstance<
  S extends State = State,
  E extends Event = Event,
  C extends MachineContext = MachineContext,
> {
  /** The machine definition this instance was created from. */
  definition: StateMachineDefinition<S, E, C>;

  /** The current active state. */
  currentState: S;

  /** Mutable context carried across transitions. */
  context: C;

  /** Ordered history of all transitions (for trace/audit). */
  history: TransitionResult<S>[];

  /**
   * Attempt to fire an event.
   *
   * @param event — The event to fire.
   * @param payload — Optional payload passed to guards and actions.
   * @returns The transition result.
   */
  send: (event: E, payload?: unknown) => TransitionResult<S>;

  /**
   * Check whether an event can be fired from the current state (without executing).
   * Evaluates guards but does not transition or execute actions.
   *
   * @param event — The event to check.
   * @param payload — Optional payload for guard evaluation.
   * @returns True if the event would succeed.
   */
  can: (event: E, payload?: unknown) => boolean;

  /**
   * Get the list of events that are valid from the current state.
   *
   * @returns Array of valid event names.
   */
  availableEvents: () => E[];

  /**
   * Get the list of destination states reachable from the current state.
   *
   * @returns Array of reachable state names.
   */
  reachableStates: () => S[];

  /**
   * Check whether the machine is in a given state (supports compound checks).
   *
   * @param state — The state to match.
   * @returns True if current state matches.
   */
  isIn: (state: S) => boolean;

  /**
   * Force-transition to a specific state (for recovery / reset).
   *
   * @param state — The target state.
   * @param reason — Optional reason for the forced transition.
   * @returns The transition result.
   */
  forceTransition: (state: S, reason?: string) => TransitionResult<S>;

  /**
   * Reset the machine to its initial state and clear history.
   */
  reset: () => void;

  /**
   * Subscribe to state changes.
   *
   * @param callback — Called on every successful transition.
   * @returns Unsubscribe function.
   */
  subscribe: (callback: (result: TransitionResult<S>) => void) => () => void;

  /** Timestamp when this machine instance was created. */
  createdAt: string;

  /** Count of transitions performed. */
  transitionCount: number;
}

// ───────────────────────────────────────────────────────────────────────────────
// Machine Factory Options
// ───────────────────────────────────────────────────────────────────────────────

/**
 * Options passed to `createMachine()` factory.
 *
 * @template S — The state union type.
 * @template E — The event union type.
 * @template C — The machine context shape.
 */
export interface CreateMachineOptions<
  S extends State = State,
  E extends Event = Event,
  C extends MachineContext = MachineContext,
> {
  /** Override the initial state. Must be in the machine's state list. */
  initialState?: S;

  /** Pre-populated context (merged with defaults). */
  context?: Partial<C>;

  /** Maximum history length before truncation (default: 1000). */
  maxHistory?: number;

  /** Optional listener called on every successful transition. */
  onTransition?: (result: TransitionResult<S>) => void;
}

// ───────────────────────────────────────────────────────────────────────────────
// React Hook Types
// ───────────────────────────────────────────────────────────────────────────────

/**
 * Return type of the `useMachine()` React hook.
 *
 * @template S — The state union type.
 * @template E — The event union type.
 * @template C — The machine context shape.
 */
export interface UseMachineReturn<
  S extends State = State,
  E extends Event = Event,
  C extends MachineContext = MachineContext,
> {
  /** The current active state. */
  state: S;

  /** Mutable context. */
  context: C;

  /** Send an event to the machine. */
  send: (event: E, payload?: unknown) => TransitionResult<S>;

  /** Check if an event can be sent. */
  can: (event: E, payload?: unknown) => boolean;

  /** Get available events from current state. */
  availableEvents: E[];

  /** True if currently in the given state. */
  isIn: (state: S) => boolean;

  /** Force-transition to a state. */
  forceTransition: (state: S, reason?: string) => TransitionResult<S>;

  /** Reset the machine. */
  reset: () => void;

  /** Transition history. */
  history: TransitionResult<S>[];

  /** Number of transitions performed. */
  transitionCount: number;
}

// ───────────────────────────────────────────────────────────────────────────────
// Utility Types
// ───────────────────────────────────────────────────────────────────────────────

/**
 * Extract a transition table type for a given machine definition.
 * Maps `(fromState, event)` → `toState`.
 */
export type TransitionTable<
  S extends State = State,
  E extends Event = Event,
> = Readonly<Partial<Record<S, Partial<Record<E, S>>>>>;

/**
 * Derive valid events for a specific state.
 */
export type ValidEventsForState<
  S extends State,
  E extends Event,
  T extends readonly Transition<S, E>[],
> = T extends readonly (infer Tr)[]
  ? Tr extends { from: S; event: infer Ev }
    ? Ev
    : never
  : never;

/**
 * A serializable snapshot of a machine instance — useful for persistence,
 * hydration, and time-travel debugging.
 */
export interface MachineSnapshot<S extends State = State, C extends MachineContext = MachineContext> {
  machineId: string;
  machineVersion: string;
  currentState: S;
  context: C;
  history: TransitionResult<S>[];
  createdAt: string;
  lastUpdatedAt: string;
  transitionCount: number;
}
