/**
 * @fileoverview State Transition Validator
 *
 * Validates state-machine definitions against Torafirma design-system rules:
 * - All state transitions must be explicitly defined in the machine
 * - No unreachable states (every state must be reachable from initial)
 * - Terminal states must not have outgoing transitions
 * - Initial state must be defined and valid
 * - No transition to undefined states
 * - No duplicate transitions from the same state/event pair
 *
 * @example
 * ```ts
 * validateStateTransitions({
 *   initial: 'idle',
 *   states: {
 *     idle: { on: { START: 'running' } },
 *     running: { on: { STOP: 'idle', ERROR: 'failed' } },
 *     failed: { terminal: true },
 *   },
 * });
 * ```
 */

import type { RuleResult, StateMachine, ValidatorFunction } from './types';

// ------------------------------------------------------------------------------
// Context type
// ------------------------------------------------------------------------------

export interface StateTransitionContext {
  /** Name of the component or machine being validated. */
  machineName?: string;
  /** File path for reporting. */
  filePath?: string;
}

// ------------------------------------------------------------------------------
// Rule IDs
// ------------------------------------------------------------------------------

const RULE = {
  initialStateDefined: 'initial-state-defined',
  initialStateValid: 'initial-state-valid',
  noUnreachableStates: 'no-unreachable-states',
  terminalNoOutgoing: 'terminal-state-no-outgoing',
  allTransitionsDefined: 'all-transitions-defined',
  noTransitionsToUndefined: 'no-transitions-to-undefined',
  noDuplicateTransitions: 'no-duplicate-transitions',
  machineHasStates: 'machine-has-states',
} as const;

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

/**
 * Find all states reachable from the initial state via BFS.
 */
function findReachableStates(machine: StateMachine): Set<string> {
  const reachable = new Set<string>();
  const queue: string[] = [machine.initial];

  while (queue.length > 0) {
    const current = queue.shift()!;
    if (reachable.has(current)) continue;
    reachable.add(current);

    const stateDef = machine.states[current];
    if (!stateDef || !stateDef.on) continue;

    for (const target of Object.values(stateDef.on)) {
      if (!reachable.has(target)) {
        queue.push(target);
      }
    }
  }

  return reachable;
}

/**
 * Find all states targeted by transitions.
 */
function findTargetedStates(machine: StateMachine): Set<string> {
  const targets = new Set<string>();
  for (const stateDef of Object.values(machine.states)) {
    if (!stateDef.on) continue;
    for (const target of Object.values(stateDef.on)) {
      targets.add(target);
    }
  }
  return targets;
}

/**
 * Find terminal states (marked terminal OR have no outgoing transitions).
 */
function findTerminalStates(machine: StateMachine): string[] {
  const terminals: string[] = [];
  for (const [name, def] of Object.entries(machine.states)) {
    if (def.terminal === true || !def.on || Object.keys(def.on).length === 0) {
      terminals.push(name);
    }
  }
  return terminals;
}

/**
 * Check for duplicate (state + event) transition definitions.
 */
function findDuplicateTransitions(machine: StateMachine): Array<{ state: string; event: string; targets: string[] }> {
  const duplicates: Array<{ state: string; event: string; targets: string[] }> = [];

  for (const [stateName, stateDef] of Object.entries(machine.states)) {
    if (!stateDef.on) continue;
    // In a Record, duplicate keys would overwrite — but we check for arrays just in case
    const eventTargets: Record<string, string[]> = {};
    for (const [event, target] of Object.entries(stateDef.on)) {
      if (!eventTargets[event]) eventTargets[event] = [];
      eventTargets[event].push(target);
    }
    for (const [event, targets] of Object.entries(eventTargets)) {
      if (targets.length > 1) {
        duplicates.push({ state: stateName, event, targets });
      }
    }
  }

  return duplicates;
}

// ------------------------------------------------------------------------------
// Validators
// ------------------------------------------------------------------------------

function checkMachineHasStates(machine: StateMachine): RuleResult {
  const stateCount = Object.keys(machine.states).length;
  const passed = stateCount > 0;
  return {
    passed,
    rule: RULE.machineHasStates,
    message: passed
      ? `Machine has ${stateCount} state(s).`
      : `State machine must define at least one state.`,
    severity: 'fatal',
  };
}

function checkInitialStateDefined(machine: StateMachine): RuleResult {
  const hasInitial = machine.initial !== undefined && machine.initial !== '';
  return {
    passed: hasInitial,
    rule: RULE.initialStateDefined,
    message: hasInitial
      ? `Initial state is defined as "${machine.initial}".`
      : `State machine must define an \`initial\` state.`,
    severity: 'error',
    suggestion: hasInitial ? undefined : `Add \`initial: '<state-name>'\` to the machine definition.`,
  };
}

function checkInitialStateValid(machine: StateMachine): RuleResult {
  const definedStates = Object.keys(machine.states);
  const passed = definedStates.includes(machine.initial);

  return {
    passed,
    rule: RULE.initialStateValid,
    message: passed
      ? `Initial state "${machine.initial}" is a valid defined state.`
      : `Initial state "${machine.initial}" is not defined in the machine states. ` +
        `Available states: ${definedStates.join(', ') || '(none)'}.`,
    severity: 'error',
    suggestion: passed ? undefined : `Add "${machine.initial}" to \`states\` or change \`initial\` to an existing state.`,
  };
}

function checkNoUnreachableStates(machine: StateMachine): RuleResult[] {
  const results: RuleResult[] = [];
  const reachable = findReachableStates(machine);
  const allStates = new Set(Object.keys(machine.states));

  for (const state of allStates) {
    const isReachable = reachable.has(state);
    const isInitial = state === machine.initial;

    if (!isReachable && !isInitial) {
      results.push({
        passed: false,
        rule: RULE.noUnreachableStates,
        message: `State "${state}" is unreachable from the initial state "${machine.initial}". ` +
          `Every state must have a path from the initial state.`,
        severity: 'error',
        suggestion: `Add an incoming transition to "${state}" from a reachable state, ` +
          `or remove it if it is no longer needed.`,
      });
    }
  }

  if (results.length === 0) {
    results.push({
      passed: true,
      rule: RULE.noUnreachableStates,
      message: `All ${allStates.size} state(s) are reachable from the initial state.`,
      severity: 'info',
    });
  }

  return results;
}

function checkTerminalNoOutgoing(machine: StateMachine): RuleResult[] {
  const results: RuleResult[] = [];

  for (const [stateName, stateDef] of Object.entries(machine.states)) {
    const isTerminal = stateDef.terminal === true;
    const hasOutgoing = stateDef.on && Object.keys(stateDef.on).length > 0;

    if (isTerminal && hasOutgoing) {
      const outgoingEvents = Object.keys(stateDef.on).join(', ');
      results.push({
        passed: false,
        rule: RULE.terminalNoOutgoing,
        message: `Terminal state "${stateName}" has outgoing transitions on events: ${outgoingEvents}. ` +
          `Terminal states must not have outgoing transitions.`,
        severity: 'error',
        suggestion: `Remove transitions from "${stateName}" or mark it as non-terminal ` +
          `(remove \`terminal: true\`).`,
      });
    }
  }

  if (results.length === 0) {
    const terminalStates = findTerminalStates(machine);
    results.push({
      passed: true,
      rule: RULE.terminalNoOutgoing,
      message: terminalStates.length > 0
        ? `All terminal states (${terminalStates.join(', ')}) have no outgoing transitions.`
        : `No terminal states defined — rule passes vacuously.`,
      severity: 'info',
    });
  }

  return results;
}

function checkNoTransitionsToUndefined(machine: StateMachine): RuleResult[] {
  const results: RuleResult[] = [];
  const definedStates = new Set(Object.keys(machine.states));

  for (const [stateName, stateDef] of Object.entries(machine.states)) {
    if (!stateDef.on) continue;
    for (const [event, target] of Object.entries(stateDef.on)) {
      if (!definedStates.has(target)) {
        results.push({
          passed: false,
          rule: RULE.noTransitionsToUndefined,
          message: `State "${stateName}" transitions on "${event}" to undefined state "${target}".`,
          severity: 'error',
          suggestion: `Define state "${target}" or change the transition target to an existing state ` +
            `(${Array.from(definedStates).join(', ')}).`,
        });
      }
    }
  }

  if (results.length === 0) {
    results.push({
      passed: true,
      rule: RULE.noTransitionsToUndefined,
      message: `All transition targets are defined states.`,
      severity: 'info',
    });
  }

  return results;
}

function checkNoDuplicateTransitions(machine: StateMachine): RuleResult[] {
  const results: RuleResult[] = [];
  const duplicates = findDuplicateTransitions(machine);

  for (const dup of duplicates) {
    results.push({
      passed: false,
      rule: RULE.noDuplicateTransitions,
      message: `Duplicate transition from state "${dup.state}" on event "${dup.event}" ` +
        `targets multiple states: ${dup.targets.join(', ')}.`,
      severity: 'error',
      suggestion: `Consolidate the transition so "${dup.state}" + "${dup.event}" maps to a single target.`,
    });
  }

  if (results.length === 0) {
    results.push({
      passed: true,
      rule: RULE.noDuplicateTransitions,
      message: `No duplicate (state, event) transition pairs found.`,
      severity: 'info',
    });
  }

  return results;
}

// ------------------------------------------------------------------------------
// Public API
// ------------------------------------------------------------------------------

/**
 * Validates a state-machine definition against Torafirma transition rules.
 *
 * @param machine - The state machine to validate.
 * @param context - Optional context (machine name, file path).
 * @returns       - Array of `RuleResult` for each transition rule.
 *
 * @example
 * ```ts
 * const machine = {
 *   initial: 'idle',
 *   states: {
 *     idle: { on: { START: 'running' } },
 *     running: { on: { STOP: 'idle', ERROR: 'failed' } },
 *     failed: { terminal: true },
 *   },
 * };
 * const results = validateStateTransitions(machine, { machineName: 'CommandExecutor' });
 * console.log(results.filter(r => !r.passed));
 * ```
 */
export function validateStateTransitions(
  machine: StateMachine,
  context?: StateTransitionContext,
): RuleResult[] {
  const results: RuleResult[] = [];

  // Fatal-level checks first
  results.push(checkMachineHasStates(machine));

  // If machine has no states, skip remaining checks
  if (Object.keys(machine.states).length === 0) {
    return results;
  }

  results.push(checkInitialStateDefined(machine));

  // If no initial defined, skip dependent checks
  if (machine.initial === undefined || machine.initial === '') {
    return results;
  }

  results.push(checkInitialStateValid(machine));
  results.push(...checkNoUnreachableStates(machine));
  results.push(...checkTerminalNoOutgoing(machine));
  results.push(...checkNoTransitionsToUndefined(machine));
  results.push(...checkNoDuplicateTransitions(machine));

  return results;
}

/** Alias for use in generic validator pipelines. */
export const validateStateMachine: ValidatorFunction<StateMachine, StateTransitionContext> =
  validateStateTransitions;
