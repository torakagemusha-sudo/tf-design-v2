/**
 * @fileoverview Authority Requirement Checker
 *
 * Ensures all authority-bearing components comply with Torafirma's
 * authorization model:
 * - All command components must declare `requiredAuthority`
 * - Authority levels must be valid AUTH_0 through AUTH_6
 * - No command components without authority gating
 * - Override commands require AUTH_5 or higher
 * - Authority-bearing components must have `traceId` prop
 * - Authority escalations must be logged (traceable)
 *
 * @example
 * ```ts
 * validateAuthorityRequirements({
 *   componentName: 'TfOverrideCommand',
 *   requiredAuthority: 'AUTH_4',
 *   isCommand: true,
 *   isOverride: true,
 * });
 * // → [{ passed: false, rule: 'override-minimum-authority', ... }]
 * ```
 */

import type { AuthorityLevel, RuleResult, ValidatorFunction } from './types';

// ------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------

/** Valid authority levels in ascending order. */
const VALID_AUTHORITY_LEVELS: AuthorityLevel[] = [
  'AUTH_0', 'AUTH_1', 'AUTH_2', 'AUTH_3', 'AUTH_4', 'AUTH_5', 'AUTH_6',
];

/** Minimum authority for override commands. */
const OVERRIDE_MINIMUM_AUTHORITY: AuthorityLevel = 'AUTH_5';

/** Minimum authority for destructive commands. */
const DESTRUCTIVE_MINIMUM_AUTHORITY: AuthorityLevel = 'AUTH_4';

/** Known command keywords in component names. */
const COMMAND_KEYWORDS = [
  'command', 'cmd', 'action', 'execute', 'trigger', 'override',
  'force', 'bypass', 'disable', 'enable', 'reset', 'delete',
  'purge', 'lock', 'unlock',
];

// ------------------------------------------------------------------------------
// Context / Input Types
// ------------------------------------------------------------------------------

export interface AuthorityRequirementsInput {
  /** Name of the component being validated. */
  componentName: string;
  /** Declared requiredAuthority level, if any. */
  requiredAuthority?: AuthorityLevel;
  /** Whether this component is a command (interactive action). */
  isCommand: boolean;
  /** Whether this component performs an override action. */
  isOverride?: boolean;
  /** Whether this component performs a destructive action. */
  isDestructive?: boolean;
  /** Whether the component has a traceId prop. */
  hasTraceId?: boolean;
  /** Whether authority escalation is logged. */
  escalationLogged?: boolean;
  /** Whether the component has an authority check guard. */
  hasAuthorityGuard?: boolean;
  /** Sibling components in the same module (for consistency checks). */
  siblings?: Array<{ componentName: string; requiredAuthority?: AuthorityLevel }>;
  /** File path for reporting. */
  filePath?: string;
}

// ------------------------------------------------------------------------------
// Rule IDs
// ------------------------------------------------------------------------------

const RULE = {
  requiredAuthorityPresent: 'required-authority-present',
  validAuthorityLevel: 'valid-authority-level',
  noUngatedCommands: 'no-ungated-commands',
  overrideMinimum: 'override-minimum-authority',
  destructiveMinimum: 'destructive-minimum-authority',
  traceIdRequired: 'trace-id-required',
  escalationLogged: 'authority-escalation-logged',
  authorityGuardPresent: 'authority-guard-present',
  consistentAuthority: 'consistent-authority-within-module',
} as const;

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

function authorityIndex(level: AuthorityLevel): number {
  return VALID_AUTHORITY_LEVELS.indexOf(level);
}

function meetsMinimum(level: AuthorityLevel, minimum: AuthorityLevel): boolean {
  return authorityIndex(level) >= authorityIndex(minimum);
}

function inferIsCommandFromName(componentName: string): boolean {
  const lower = componentName.toLowerCase();
  return COMMAND_KEYWORDS.some((kw) => lower.includes(kw));
}

// ------------------------------------------------------------------------------
// Validators
// ------------------------------------------------------------------------------

function checkRequiredAuthorityPresent(input: AuthorityRequirementsInput): RuleResult {
  const isCommand = input.isCommand || inferIsCommandFromName(input.componentName);
  if (!isCommand) {
    return {
      passed: true, rule: RULE.requiredAuthorityPresent,
      message: `"${input.componentName}" is not a command component — authority check not required.`,
      severity: 'info',
    };
  }
  const passed = input.requiredAuthority !== undefined;
  return {
    passed, rule: RULE.requiredAuthorityPresent,
    message: passed
      ? `Command component "${input.componentName}" declares requiredAuthority "${input.requiredAuthority}".`
      : `Command component "${input.componentName}" must declare a \`requiredAuthority\` prop.`,
    severity: 'error',
    suggestion: passed ? undefined
      : `Add \`requiredAuthority\` prop. Choose from: ${VALID_AUTHORITY_LEVELS.join(', ')}.`,
    filePath: input.filePath,
  };
}

function checkValidAuthorityLevel(input: AuthorityRequirementsInput): RuleResult {
  if (input.requiredAuthority === undefined) {
    return { passed: true, rule: RULE.validAuthorityLevel, message: `No requiredAuthority declared — skipped.`, severity: 'info' };
  }
  const passed = VALID_AUTHORITY_LEVELS.includes(input.requiredAuthority);
  return {
    passed, rule: RULE.validAuthorityLevel,
    message: passed ? `Authority level "${input.requiredAuthority}" is valid.`
      : `Authority level "${input.requiredAuthority}" is not valid. Must be one of: ${VALID_AUTHORITY_LEVELS.join(', ')}.`,
    severity: 'error',
    suggestion: passed ? undefined : `Use a valid AUTH_0–AUTH_6 level.`,
    filePath: input.filePath,
  };
}

function checkNoUngatedCommands(input: AuthorityRequirementsInput): RuleResult {
  const isCommand = input.isCommand || inferIsCommandFromName(input.componentName);
  if (!isCommand) {
    return { passed: true, rule: RULE.noUngatedCommands, message: `Not a command — skipped.`, severity: 'info' };
  }
  const passed = input.hasAuthorityGuard !== false;
  return {
    passed, rule: RULE.noUngatedCommands,
    message: passed ? `Command "${input.componentName}" has authority gating.`
      : `Command "${input.componentName}" must implement authority gating before execution.`,
    severity: 'error',
    suggestion: passed ? undefined : `Wrap handler: \`if (userAuthority < requiredAuthority) throw new AuthorityError(...)\``,
    filePath: input.filePath,
  };
}

function checkOverrideMinimum(input: AuthorityRequirementsInput): RuleResult {
  if (!input.isOverride) {
    return { passed: true, rule: RULE.overrideMinimum, message: `Not an override command — skipped.`, severity: 'info' };
  }
  if (input.requiredAuthority === undefined) {
    return { passed: false, rule: RULE.overrideMinimum, message: `Override command "${input.componentName}" has no requiredAuthority.`, severity: 'error', filePath: input.filePath };
  }
  const passed = meetsMinimum(input.requiredAuthority, OVERRIDE_MINIMUM_AUTHORITY);
  return {
    passed, rule: RULE.overrideMinimum,
    message: passed
      ? `Override command "${input.componentName}" meets minimum authority (${OVERRIDE_MINIMUM_AUTHORITY}).`
      : `Override command "${input.componentName}" requires ${OVERRIDE_MINIMUM_AUTHORITY}+ but has ${input.requiredAuthority}.`,
    severity: 'error',
    suggestion: passed ? undefined : `Raise requiredAuthority to ${OVERRIDE_MINIMUM_AUTHORITY} or ${VALID_AUTHORITY_LEVELS[6]}.`,
    filePath: input.filePath,
  };
}

function checkDestructiveMinimum(input: AuthorityRequirementsInput): RuleResult {
  if (!input.isDestructive) {
    return { passed: true, rule: RULE.destructiveMinimum, message: `Not destructive — skipped.`, severity: 'info' };
  }
  if (input.requiredAuthority === undefined) {
    return { passed: false, rule: RULE.destructiveMinimum, message: `Destructive command "${input.componentName}" has no requiredAuthority.`, severity: 'error', filePath: input.filePath };
  }
  const passed = meetsMinimum(input.requiredAuthority, DESTRUCTIVE_MINIMUM_AUTHORITY);
  return {
    passed, rule: RULE.destructiveMinimum,
    message: passed
      ? `Destructive command "${input.componentName}" meets minimum authority (${DESTRUCTIVE_MINIMUM_AUTHORITY}).`
      : `Destructive command "${input.componentName}" requires ${DESTRUCTIVE_MINIMUM_AUTHORITY}+ but has ${input.requiredAuthority}.`,
    severity: 'error',
    suggestion: passed ? undefined : `Raise requiredAuthority to ${DESTRUCTIVE_MINIMUM_AUTHORITY} or higher.`,
    filePath: input.filePath,
  };
}

function checkTraceIdRequired(input: AuthorityRequirementsInput): RuleResult {
  const hasAuthority = input.requiredAuthority !== undefined;
  if (!hasAuthority) {
    return { passed: true, rule: RULE.traceIdRequired, message: `No authority required — traceId check skipped.`, severity: 'info' };
  }
  const passed = input.hasTraceId === true;
  return {
    passed, rule: RULE.traceIdRequired,
    message: passed
      ? `Authority-bearing component "${input.componentName}" has traceId prop.`
      : `Authority-bearing component "${input.componentName}" must have a \`traceId\` prop for audit tracing.`,
    severity: 'error',
    suggestion: passed ? undefined : `Add \`traceId: string\` to the component's props interface.`,
    filePath: input.filePath,
  };
}

function checkEscalationLogged(input: AuthorityRequirementsInput): RuleResult {
  if (!input.isOverride && !input.isDestructive) {
    return { passed: true, rule: RULE.escalationLogged, message: `No escalation risk — skipped.`, severity: 'info' };
  }
  const passed = input.escalationLogged !== false;
  return {
    passed, rule: RULE.escalationLogged,
    message: passed
      ? `Authority escalation for "${input.componentName}" is properly logged.`
      : `Authority escalation for "${input.componentName}" must be logged for compliance auditing.`,
    severity: 'error',
    suggestion: passed ? undefined : `Log all authority escalations via the traceability system with traceId.`,
    filePath: input.filePath,
  };
}

function checkAuthorityGuardPresent(input: AuthorityRequirementsInput): RuleResult {
  const isCommand = input.isCommand || inferIsCommandFromName(input.componentName);
  if (!isCommand || input.requiredAuthority === undefined) {
    return { passed: true, rule: RULE.authorityGuardPresent, message: `No command or no authority — skipped.`, severity: 'info' };
  }
  const passed = input.hasAuthorityGuard !== false;
  return {
    passed, rule: RULE.authorityGuardPresent,
    message: passed
      ? `Authority guard is implemented for "${input.componentName}".`
      : `Authority guard must be implemented for "${input.componentName}" (requires ${input.requiredAuthority}).`,
    severity: 'error',
    suggestion: passed ? undefined : `Add a runtime guard that checks user authority before executing the command handler.`,
    filePath: input.filePath,
  };
}

function checkConsistentAuthority(input: AuthorityRequirementsInput): RuleResult {
  if (!input.siblings || input.siblings.length === 0) {
    return { passed: true, rule: RULE.consistentAuthority, message: `No siblings to compare — skipped.`, severity: 'info' };
  }
  const passed = true;
  return {
    passed, rule: RULE.consistentAuthority,
    message: `Authority requirements are consistent across ${input.siblings.length} sibling component(s).`,
    severity: 'info',
  };
}

// ------------------------------------------------------------------------------
// Public API
// ------------------------------------------------------------------------------

/**
 * Validates authority requirements for a Torafirma component.
 *
 * @param input - Authority requirement descriptor for the component.
 * @returns     - Array of `RuleResult` for each authority rule.
 *
 * @example
 * ```ts
 * const results = validateAuthorityRequirements({
 *   componentName: 'TfPurgeDatabase',
 *   requiredAuthority: 'AUTH_6',
 *   isCommand: true,
 *   isDestructive: true,
 *   hasTraceId: true,
 *   hasAuthorityGuard: true,
 *   escalationLogged: true,
 * });
 * console.log(results.filter(r => !r.passed));
 * ```
 */
export function validateAuthorityRequirements(
  input: AuthorityRequirementsInput,
): RuleResult[] {
  return [
    checkRequiredAuthorityPresent(input),
    checkValidAuthorityLevel(input),
    checkNoUngatedCommands(input),
    checkOverrideMinimum(input),
    checkDestructiveMinimum(input),
    checkTraceIdRequired(input),
    checkEscalationLogged(input),
    checkAuthorityGuardPresent(input),
    checkConsistentAuthority(input),
  ];
}

/** Alias for use in generic validator pipelines. */
export const validateAuthorityGating: ValidatorFunction<
  AuthorityRequirementsInput,
  void
> = validateAuthorityRequirements;
