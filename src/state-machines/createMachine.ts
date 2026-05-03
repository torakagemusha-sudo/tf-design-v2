/**
 * @fileoverview createMachine.ts — State Machine Factory
 *
 * Creates fully-typed, deterministic finite state machine (DFSM) instances
 * from `StateMachineDefinition` objects. Every Torafirma state machine
 * (component, command, authority, validation, AI proposal, runtime,
 * trace, theme, deployment, approval, emergency, sync, graph, session,
 * interlock, bulk, modal) is instantiated through this factory.
 *
 * Features:
 * - Guard evaluation with payload passing
 * - Entry/exit action invocation
 * - Full transition history with configurable limits
 * - Subscription-based observation
 * - Forced transitions for recovery
 * - Snapshot serialization
 *
 * @module @torakagemusha-sudo/tf-design-v2/state-machines/createMachine
 * @version 0.2.0
 */

import {
  type State,
  type Event,
  type MachineContext,
  type StateMachineDefinition,
  type StateMachineInstance,
  type TransitionResult,
  type CreateMachineOptions,
  type MachineSnapshot,
  type GuardFunction,
  type ActionFunction,
  type ActionSequence,
} from './types';

// ───────────────────────────────────────────────────────────────────────────────
// Internal: Timestamp helper (ISO 8601)
// ───────────────────────────────────────────────────────────────────────────────

const now = (): string => new Date().toISOString();

// ───────────────────────────────────────────────────────────────────────────────
// Internal: Context merge
// ───────────────────────────────────────────────────────────────────────────────

function mergeContext<C extends MachineContext>(
  base: C | (() => C),
  override: Partial<C> | undefined,
): C {
  const resolved = typeof base === 'function' ? (base as () => C)() : { ...base };
  return override ? { ...resolved, ...override } as C : resolved;
}

function runActionSequence<C extends MachineContext, P = unknown>(
  action: ActionSequence<C, P> | undefined,
  context: C,
  payload?: P,
): void {
  if (!action) {
    return;
  }
  const steps = Array.isArray(action) ? action : [action];
  for (const step of steps) {
    step(context, payload);
  }
}

// ───────────────────────────────────────────────────────────────────────────────
// Internal: Default context factory
// ───────────────────────────────────────────────────────────────────────────────

function defaultContext(): MachineContext {
  return {};
}

// ───────────────────────────────────────────────────────────────────────────────
// createMachine
// ───────────────────────────────────────────────────────────────────────────────

/**
 * Create a runnable state machine instance from a definition.
 *
 * @template S — The state union type.
 * @template E — The event union type.
 * @template C — The machine context shape.
 *
 * @param definition — The declarative machine definition.
 * @param options — Optional overrides (initial state, context, listeners).
 * @returns A live `StateMachineInstance`.
 *
 * @example
 * ```ts
 * const machine = createMachine(componentStateMachineDefinition, {
 *   context: { authority: 'AUTH_3_EXECUTE', ready: true },
 *   onTransition: (r) => console.log(r.newState),
 * });
 *
 * machine.send('EDIT');      // idle → dirty
 * machine.send('VALIDATE');  // dirty → validating
 * ```
 */
export function createMachine<
  S extends State = State,
  E extends Event = Event,
  C extends MachineContext = MachineContext,
>(
  definition: StateMachineDefinition<S, E, C>,
  options: CreateMachineOptions<S, E, C> = {},
): StateMachineInstance<S, E, C> {
  // ── Resolve initial state ──────────────────────────────────────────────
  const resolvedInitial: S = options.initialState ?? definition.initialState;

  // Validate initial state is in the state list
  if (!definition.states.includes(resolvedInitial)) {
    throw new Error(
      `[createMachine] "${resolvedInitial}" is not a valid state in machine "${definition.id}". ` +
        `Valid states: [${definition.states.join(', ')}]`,
    );
  }

  // ── Resolve context ────────────────────────────────────────────────────
  const contextFactory = definition.createContext ?? defaultContext;
  let ctx: C = mergeContext(contextFactory as (() => C) | C, options.context);

  // ── Runtime state ──────────────────────────────────────────────────────
  let currentState: S = resolvedInitial;
  let history: TransitionResult<S>[] = [];
  let subscribers: Array<(result: TransitionResult<S>) => void> = [];
  let transitionCount = 0;
  const maxHistory = options.maxHistory ?? 1000;
  const createdAt = now();

  // ── Build transition lookup table for O(1) access ──────────────────────
  const transitionMap = new Map<string, (typeof definition.transitions)[number]>();
  for (const t of definition.transitions) {
    transitionMap.set(`${t.from}::${t.event}`, t);
  }

  // ── Internal: run entry action for a state ─────────────────────────────
  const runEntryAction = (state: S): void => {
    const actions = definition.stateActions?.[state];
    if (actions?.entry) {
      try {
        runActionSequence(actions.entry, ctx);
      } catch (err) {
        // Entry action errors are non-fatal but logged
        console.error(`[state-machine:${definition.id}] Entry action failed for state "${state}":`, err);
      }
    }
  };

  // ── Internal: run exit action for a state ──────────────────────────────
  const runExitAction = (state: S): void => {
    const actions = definition.stateActions?.[state];
    if (actions?.exit) {
      try {
        runActionSequence(actions.exit, ctx);
      } catch (err) {
        console.error(`[state-machine:${definition.id}] Exit action failed for state "${state}":`, err);
      }
    }
  };

  // ── Internal: build a transition result ────────────────────────────────
  const buildResult = (
    success: boolean,
    newState: S,
    previousState: S,
    event: E,
    reason?: string,
    reasonCode?: string,
  ): TransitionResult<S> => ({
    success,
    newState,
    previousState,
    event,
    reason,
    reasonCode,
    timestamp: now(),
  });

  // ── Internal: notify subscribers ───────────────────────────────────────
  const notify = (result: TransitionResult<S>): void => {
    for (const sub of subscribers) {
      try {
        sub(result);
      } catch {
        // Subscriber errors must not break the machine
      }
    }
    options.onTransition?.(result);
  };

  // ── Internal: record history ───────────────────────────────────────────
  const recordHistory = (result: TransitionResult<S>): void => {
    history.push(result);
    if (history.length > maxHistory) {
      history = history.slice(history.length - maxHistory);
    }
  };

  // ── Run entry action for initial state ─────────────────────────────────
  runEntryAction(currentState);

  // ═══════════════════════════════════════════════════════════════════════
  // Public Instance
  // ═══════════════════════════════════════════════════════════════════════

  const instance: StateMachineInstance<S, E, C> = {
    definition,
    get currentState() { return currentState; },
    get context() { return ctx; },
    set context(newCtx: C) { ctx = newCtx; },
    get history() { return [...history]; },
    get transitionCount() { return transitionCount; },
    createdAt,

    /**
     * Attempt to fire an event.
     *
     * Logic:
     * 1. Look up the transition for `(currentState, event)`.
     * 2. If no transition exists → fail with reason.
     * 3. If a guard exists and returns false → fail with reason.
     * 4. Run exit action for the current state.
     * 5. Execute transition action if present.
     * 6. Update current state.
     * 7. Run entry action for the new state.
     * 8. Record history and notify subscribers.
     */
    send(event: E, payload?: unknown): TransitionResult<S> {
      // Look up transition
      const transition = transitionMap.get(`${currentState}::${event}`);

      if (!transition) {
        const available = instance.availableEvents();
        const result = buildResult(
          false,
          currentState,
          currentState,
          event,
          `No transition defined for event "${event}" from state "${currentState}". ` +
            `Available events: [${available.join(', ') || 'none'}]`,
          'TRANSITION_NOT_DEFINED',
        );
        recordHistory(result);
        notify(result);
        return result;
      }

      // Evaluate guard
      if (transition.guard) {
        const guardResult = transition.guard(ctx, payload);
        if (!guardResult) {
          const result = buildResult(
            false,
            currentState,
            currentState,
            event,
            `Guard blocked transition from "${currentState}" to "${transition.to}" on event "${event}".`,
            'GUARD_BLOCKED',
          );
          recordHistory(result);
          notify(result);
          return result;
        }
      }

      // Execute transition
      const previousState = currentState;
      const targetState = transition.to;

      // Run exit action
      runExitAction(previousState);

      // Run transition action
      if (transition.action) {
        try {
          runActionSequence(transition.action, ctx, payload);
        } catch (err) {
          const result = buildResult(
            false,
            currentState,
            previousState,
            event,
            `Transition action failed: ${err instanceof Error ? err.message : String(err)}`,
            'ACTION_ERROR',
          );
          recordHistory(result);
          notify(result);
          return result;
        }
      }

      // Update state
      currentState = targetState;
      transitionCount++;

      // Run entry action
      runEntryAction(targetState);

      // Build success result
      const result = buildResult(true, targetState, previousState, event);
      recordHistory(result);
      notify(result);
      return result;
    },

    /**
     * Check whether an event can be fired from the current state.
     * Evaluates guards but does not execute actions or change state.
     */
    can(event: E, payload?: unknown): boolean {
      const transition = transitionMap.get(`${currentState}::${event}`);
      if (!transition) return false;
      if (transition.guard) {
        return transition.guard(ctx, payload);
      }
      return true;
    },

    /**
     * Get all events that have defined transitions from the current state.
     */
    availableEvents(): E[] {
      const events: E[] = [];
      for (const t of definition.transitions) {
        if (t.from === currentState && !events.includes(t.event)) {
          events.push(t.event);
        }
      }
      return events;
    },

    /**
     * Get all destination states reachable from the current state.
     */
    reachableStates(): S[] {
      const states: S[] = [];
      for (const t of definition.transitions) {
        if (t.from === currentState && !states.includes(t.to)) {
          states.push(t.to);
        }
      }
      return states;
    },

    /**
     * Check whether the machine is currently in the given state.
     */
    isIn(state: S): boolean {
      return currentState === state;
    },

    /**
     * Force-transition to a specific state (for recovery / reset scenarios).
     * Runs exit/entry actions but does not evaluate guards.
     */
    forceTransition(state: S, reason?: string): TransitionResult<S> {
      if (!definition.states.includes(state)) {
        const result = buildResult(
          false,
          currentState,
          currentState,
          'FORCE_TRANSITION' as E,
          `"${state}" is not a valid state in machine "${definition.id}".`,
          'INVALID_STATE',
        );
        recordHistory(result);
        return result;
      }

      const previousState = currentState;
      runExitAction(previousState);
      currentState = state;
      transitionCount++;
      runEntryAction(state);

      const result = buildResult(
        true,
        state,
        previousState,
        'FORCE_TRANSITION' as E,
        reason ?? `Forced transition to "${state}"`,
      );
      recordHistory(result);
      notify(result);
      return result;
    },

    /**
     * Reset the machine to its initial state and clear history.
     */
    reset(): void {
      runExitAction(currentState);
      const previousState = currentState;
      currentState = resolvedInitial;
      ctx = mergeContext(contextFactory as (() => C) | C, options.context);
      history = [];
      transitionCount = 0;
      runEntryAction(resolvedInitial);

      const result = buildResult(
        true,
        resolvedInitial,
        previousState,
        'RESET' as E,
        'Machine reset to initial state',
      );
      notify(result);
    },

    /**
     * Subscribe to all state transitions.
     * @returns An unsubscribe function.
     */
    subscribe(callback: (result: TransitionResult<S>) => void): () => void {
      subscribers.push(callback);
      return () => {
        subscribers = subscribers.filter((s) => s !== callback);
      };
    },
  };

  return instance;
}

// ───────────────────────────────────────────────────────────────────────────────
// Snapshot Utilities
// ───────────────────────────────────────────────────────────────────────────────

/**
 * Serialize a machine instance to a snapshot.
 *
 * @param instance — The machine instance to snapshot.
 * @returns A serializable `MachineSnapshot`.
 */
export function serializeSnapshot<S extends State, E extends Event, C extends MachineContext>(
  instance: StateMachineInstance<S, E, C>,
): MachineSnapshot<S, C> {
  const history = instance.history;
  const last = history.length > 0 ? history[history.length - 1] : undefined;
  return {
    machineId: instance.definition.id,
    machineVersion: instance.definition.version ?? 'unknown',
    currentState: instance.currentState,
    context: instance.context,
    history: instance.history,
    createdAt: instance.createdAt,
    lastUpdatedAt: last?.timestamp ?? instance.createdAt,
    transitionCount: instance.transitionCount,
  };
}

/**
 * Hydrate a machine from a snapshot.
 *
 * @param definition — The machine definition.
 * @param snapshot — The snapshot to restore from.
 * @returns A restored `StateMachineInstance`.
 */
export function hydrateMachine<S extends State, E extends Event, C extends MachineContext>(
  definition: StateMachineDefinition<S, E, C>,
  snapshot: MachineSnapshot<S, C>,
): StateMachineInstance<S, E, C> {
  const instance = createMachine(definition, {
    initialState: snapshot.currentState,
    context: snapshot.context,
  });

  // Restore history (directly mutate private history for restoration)
  (instance as unknown as { history: TransitionResult<S>[] }).history = [...snapshot.history];
  (instance as unknown as { transitionCount: number }).transitionCount = snapshot.transitionCount;

  return instance;
}

// ───────────────────────────────────────────────────────────────────────────────
// Utility: Validate a machine definition
// ───────────────────────────────────────────────────────────────────────────────

/**
 * Validate a machine definition for common errors:
 * - States referenced in transitions but not in the state list
 * - Events referenced in transitions but not in the event list
 * - Initial state not in state list
 * - Duplicate transitions (same from + event)
 *
 * @param definition — The machine definition to validate.
 * @returns Array of validation error messages (empty = valid).
 */
export function validateDefinition<S extends State, E extends Event, C extends MachineContext>(
  definition: StateMachineDefinition<S, E, C>,
): string[] {
  const errors: string[] = [];
  const stateSet = new Set(definition.states);
  const eventSet = new Set(definition.events);
  const seenTransitions = new Set<string>();

  // Check initial state
  if (!stateSet.has(definition.initialState)) {
    errors.push(`Initial state "${definition.initialState}" is not in the states list.`);
  }

  // Check transitions
  for (const t of definition.transitions) {
    if (!stateSet.has(t.from)) {
      errors.push(`Transition references unknown "from" state: "${t.from}".`);
    }
    if (!stateSet.has(t.to)) {
      errors.push(`Transition references unknown "to" state: "${t.to}".`);
    }
    if (!eventSet.has(t.event)) {
      errors.push(`Transition references unknown event: "${t.event}".`);
    }

    const key = `${t.from}::${t.event}`;
    if (seenTransitions.has(key)) {
      errors.push(`Duplicate transition: "${t.from}" + "${t.event}".`);
    }
    seenTransitions.add(key);
  }

  // Check state actions reference valid states
  if (definition.stateActions) {
    for (const state of Object.keys(definition.stateActions)) {
      if (!stateSet.has(state as S)) {
        errors.push(`State action references unknown state: "${state}".`);
      }
    }
  }

  return errors;
}
