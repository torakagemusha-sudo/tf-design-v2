/**
 * @fileoverview useMachine.ts — React Hook for Torafirma State Machines
 *
 * Bridges any `StateMachineDefinition` into a React component via the
 * `useMachine` hook. Integrates with React's state system to trigger
 * re-renders on machine transitions while preserving full type safety.
 *
 * @module torafirma/state-machines/useMachine
 * @version 2.0.0
 * @requires react >=18.0.0
 */

import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import {
  type State,
  type Event,
  type MachineContext,
  type StateMachineDefinition,
  type TransitionResult,
  type UseMachineReturn,
  type CreateMachineOptions,
} from './types';
import { createMachine } from './createMachine';

// ───────────────────────────────────────────────────────────────────────────────
// useMachine
// ───────────────────────────────────────────────────────────────────────────────

/**
 * React hook that instantiates and manages a Torafirma state machine.
 *
 * The hook returns reactive state (`state`, `context`) plus imperative
 * controls (`send`, `can`, `reset`, etc.). Every successful transition
 * triggers a React re-render.
 *
 * @template S — The state union type.
 * @template E — The event union type.
 * @template C — The machine context shape.
 *
 * @param definition — The state machine definition (static — must not change between renders).
 * @param options — Optional overrides for initial state, context, and listeners.
 * @returns A `UseMachineReturn` object with reactive state and controls.
 *
 * @example
 * ```tsx
 * const ComponentStatusBadge = () => {
 *   const { state, send, can } = useMachine(componentStateMachineDefinition, {
 *     context: { authority: 'AUTH_3_EXECUTE' },
 *   });
 *
 *   return (
 *     <div>
 *       <StatusBadge state={state} />
 *       {can('EDIT') && <button onClick={() => send('EDIT')}>Edit</button>}
 *       {can('STAGE') && <button onClick={() => send('STAGE')}>Stage</button>}
 *     </div>
 *   );
 * };
 * ```
 */
export function useMachine<
  S extends State = State,
  E extends Event = Event,
  C extends MachineContext = MachineContext,
>(
  definition: StateMachineDefinition<S, E, C>,
  options: CreateMachineOptions<S, E, C> = {},
): UseMachineReturn<S, E, C> {
  // Stable machine instance — created once, survives re-renders
  const machineRef = useRef(
    createMachine(definition, options),
  );

  const machine = machineRef.current;

  // ── React state mirrors for reactive UI ────────────────────────────────
  const [state, setState] = useState<S>(machine.currentState);
  const [context, setContext] = useState<C>(machine.context);
  const [history, setHistory] = useState<TransitionResult<S>[]>(machine.history);
  const [transitionCount, setTransitionCount] = useState<number>(machine.transitionCount);

  // ── Subscribe to machine transitions ───────────────────────────────────
  useEffect(() => {
    const unsubscribe = machine.subscribe((result) => {
      setState(result.newState);
      setContext({ ...machine.context });
      setHistory([...machine.history]);
      setTransitionCount(machine.transitionCount);
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [machine]);

  // ── Wrap imperative methods with React state sync ──────────────────────

  const send = useCallback(
    (event: E, payload?: unknown): TransitionResult<S> => {
      const result = machine.send(event, payload);
      // Force sync in case subscriber batching lags
      setState(machine.currentState);
      setContext({ ...machine.context });
      setHistory([...machine.history]);
      setTransitionCount(machine.transitionCount);
      return result;
    },
    [machine],
  );

  const can = useCallback(
    (event: E, payload?: unknown): boolean => {
      return machine.can(event, payload);
    },
    [machine],
  );

  const availableEvents = useMemo((): E[] => {
    return machine.availableEvents();
  }, [machine, state]);

  const isIn = useCallback(
    (s: S): boolean => machine.isIn(s),
    [machine],
  );

  const forceTransition = useCallback(
    (targetState: S, reason?: string): TransitionResult<S> => {
      const result = machine.forceTransition(targetState, reason);
      setState(machine.currentState);
      setContext({ ...machine.context });
      setHistory([...machine.history]);
      setTransitionCount(machine.transitionCount);
      return result;
    },
    [machine],
  );

  const reset = useCallback((): void => {
    machine.reset();
    setState(machine.currentState);
    setContext({ ...machine.context });
    setHistory([...machine.history]);
    setTransitionCount(machine.transitionCount);
  }, [machine]);

  // ── Return reactive interface ──────────────────────────────────────────

  return {
    state,
    context,
    send,
    can,
    availableEvents,
    isIn,
    forceTransition,
    reset,
    history,
    transitionCount,
  };
}

// ───────────────────────────────────────────────────────────────────────────────
// useMachineSelector — Subscribe to a derived value
// ───────────────────────────────────────────────────────────────────────────────

/**
 * Subscribe to a derived slice of machine state for optimized re-renders.
 *
 * Only triggers re-render when the selected value changes (shallow equality).
 *
 * @template S — The state union type.
 * @template E — The event union type.
 * @template C — The machine context shape.
 * @template T — The derived value type.
 *
 * @param definition — The state machine definition.
 * @param selector — Function that derives a value from the machine.
 * @param options — Optional machine creation overrides.
 * @returns The selected value.
 *
 * @example
 * ```tsx
 * const authority = useMachineSelector(
 *   componentStateMachineDefinition,
 *   (m) => m.context.authority,
 *   { context: { authority: 'AUTH_1_DRAFT' } },
 * );
 * ```
 */
export function useMachineSelector<
  S extends State = State,
  E extends Event = Event,
  C extends MachineContext = MachineContext,
  T = unknown,
>(
  definition: StateMachineDefinition<S, E, C>,
  selector: (machine: ReturnType<typeof useMachine<S, E, C>>) => T,
  options: CreateMachineOptions<S, E, C> = {},
): T {
  const machine = useMachine(definition, options);
  // Simple re-render on every transition; selector is applied on render
  return selector(machine);
}

// ───────────────────────────────────────────────────────────────────────────────
// useMachineSend — Only get the send function (zero re-renders from state)
// ───────────────────────────────────────────────────────────────────────────────

/**
 * Use only the `send` function from a machine without subscribing to state.
 * Useful for parent components that trigger events but don't need to render
 * based on machine state.
 *
 * @template S — The state union type.
 * @template E — The event union type.
 * @template C — The machine context shape.
 *
 * @param definition — The state machine definition.
 * @param options — Optional machine creation overrides.
 * @returns The `send` function only.
 */
export function useMachineSend<
  S extends State = State,
  E extends Event = Event,
  C extends MachineContext = MachineContext,
>(
  definition: StateMachineDefinition<S, E, C>,
  options: CreateMachineOptions<S, E, C> = {},
): (event: E, payload?: unknown) => TransitionResult<S> {
  const machineRef = useRef(createMachine(definition, options));
  return machineRef.current.send;
}
