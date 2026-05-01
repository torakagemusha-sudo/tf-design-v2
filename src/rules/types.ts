/**
 * @fileoverview Core type definitions for the Torafirma Design Rule Enforcers.
 *
 * These types provide the foundation for all validation functions across the
 * design system. Every validator returns `RuleResult[]` and operates at a
 * specific `EnforcementLevel`.
 *
 * @example
 * ```ts
 * const result: RuleResult = {
 *   passed: false,
 *   rule: 'component-name-capitalization',
 *   message: 'Component name must start with a capital letter',
 *   severity: 'error',
 *   suggestion: 'Rename to "TerraButton"',
 * };
 * ```
 */

// ------------------------------------------------------------------------------
// Severity & Enforcement
// ------------------------------------------------------------------------------

/**
 * Enforcement level for a rule violation.
 *
 * - `'error'`   — Blocks the build. Must be fixed before merge.
 * - `'warning'` — Should be fixed, but does not block.
 * - `'info'`    — FYI only; informational guidance.
 */
export type EnforcementLevel = 'error' | 'warning' | 'info';

/**
 * Severity assigned to a single rule result.
 *
 * `'fatal'` is reserved for unrecoverable structural problems
 * (e.g., a missing tokens.css file) that prevent further validation.
 */
export type Severity = EnforcementLevel | 'fatal';

// ------------------------------------------------------------------------------
// Rule Result
// ------------------------------------------------------------------------------

/**
 * Outcome of evaluating a single design rule against a single subject.
 */
export interface RuleResult {
  /** Whether the subject passed validation. */
  passed: boolean;

  /** Stable machine-readable rule identifier (kebab-case). */
  rule: string;

  /** Human-readable description of what passed or failed. */
  message: string;

  /** Severity of the result. */
  severity: Severity;

  /** Optional fix suggestion or recommended alternative. */
  suggestion?: string;

  /** Absolute or relative file path where the issue was found. */
  filePath?: string;

  /** Approximate line number (1-based) where the issue occurs. */
  lineNumber?: number;

  /** Approximate column number (1-based) where the issue occurs. */
  columnNumber?: number;

  /** The offending snippet (up to 120 chars) for quick identification. */
  context?: string;
}

// ------------------------------------------------------------------------------
// Rule Set
// ------------------------------------------------------------------------------

/**
 * A named collection of rule IDs with a default severity.
 *
 * Used to group rules by concern (e.g., "accessibility", "naming").
 */
export interface RuleSet {
  /** Human-readable name of the rule set. */
  name: string;

  /** Description of what this rule set validates. */
  description: string;

  /** Machine-readable rule IDs included in this set. */
  rules: string[];

  /** Default severity applied when a rule in this set fails. */
  severity: EnforcementLevel;

  /** Whether the rule set is enabled by default. */
  enabledByDefault: boolean;
}

// ------------------------------------------------------------------------------
// Validator Function Shape
// ------------------------------------------------------------------------------

/**
 * Generic signature shared by all validator functions.
 *
 * @typeParam TInput  - The type of the subject being validated.
 * @typeParam TContext - Optional extra context (e.g., file path, component name).
 */
export type ValidatorFunction<TInput, TContext = unknown> = (
  input: TInput,
  context?: TContext,
) => RuleResult[];

// ------------------------------------------------------------------------------
// Registry Configuration
// ------------------------------------------------------------------------------

/**
 * Per-rule configuration stored in the central registry.
 */
export interface RuleConfig {
  /** Unique rule identifier. */
  id: string;

  /** Human-readable name. */
  name: string;

  /** Description of what the rule validates. */
  description: string;

  /** Current severity level. */
  severity: EnforcementLevel;

  /** Whether the rule is currently enabled. */
  enabled: boolean;

  /** Which rule set this rule belongs to. */
  ruleSet: string;

  /** The validation function (attached at runtime). */
  validate?: ValidatorFunction<unknown, unknown>;
}

/**
 * The central registry shape.
 */
export interface RuleRegistry {
  /** Map of rule ID → configuration. */
  rules: Map<string, RuleConfig>;

  /** Map of rule set name → rule IDs. */
  ruleSets: Map<string, RuleSet>;
}

// ------------------------------------------------------------------------------
// Enforcer Runner
// ------------------------------------------------------------------------------

/**
 * Input to the main enforcer runner.
 */
export interface EnforcerInput {
  /** Virtual file path. */
  path: string;

  /** Raw file content. */
  content: string;
}

/**
 * Aggregated report produced by the enforcer runner.
 */
export interface EnforcerReport {
  /** Timestamp when the report was generated (ISO-8601). */
  timestamp: string;

  /** Total number of files scanned. */
  totalFiles: number;

  /** Total number of rules evaluated. */
  totalRules: number;

  /** All individual results. */
  results: RuleResult[];

  /** Counts grouped by severity. */
  summary: Record<Severity, number>;

  /** Counts grouped by rule set. */
  byRuleSet: Record<string, { passed: number; failed: number }>;

  /** Whether the report contains any error or fatal result. */
  hasErrors: boolean;
}

// ------------------------------------------------------------------------------
// Torafirma-Specific Shared Types
// ------------------------------------------------------------------------------

/** The nine canonical semantic variants in the Torafirma system. */
export type CanonicalVariant =
  | 'neutral'
  | 'inspect'
  | 'run'
  | 'warning'
  | 'instability'
  | 'danger'
  | 'stream'
  | 'model'
  | 'authority';

/** Valid authority levels (AUTH_0 is lowest, AUTH_6 is highest). */
export type AuthorityLevel =
  | 'AUTH_0'
  | 'AUTH_1'
  | 'AUTH_2'
  | 'AUTH_3'
  | 'AUTH_4'
  | 'AUTH_5'
  | 'AUTH_6';

/** Density presets defined by the design system. */
export type Density = 'compact' | 'standard' | 'field';

/** Theme identifiers supported across all components. */
export type ThemeName = 'default' | 'dark' | 'high-contrast' | 'ocean' | 'print';

/** Trace event record for audit-log validation. */
export interface TraceEvent {
  traceId: string;
  eventType: 'command' | 'authority-escalation' | 'destructive-action' | 'state-transition';
  authorityLevel?: AuthorityLevel;
  timestamp: string;
  componentId?: string;
  details?: string;
}

/** Minimal state-machine shape for transition validation. */
export interface StateMachine {
  initial: string;
  states: Record<string, {
    on?: Record<string, string>;
    terminal?: boolean;
  }>;
}

/** CSS token usage record extracted from component styles. */
export interface CSSTokenUsage {
  property: string;
  value: string;
  isToken: boolean;
  line: number;
}

/** Component prop shape used for validation. */
export interface ComponentProp {
  name: string;
  type: string;
  optional: boolean;
  defaultValue?: string;
}

/** Component interface used for prop validation. */
export interface ComponentInterface {
  componentName: string;
  props: ComponentProp[];
  hasAuthorityGating: boolean;
  isCommandComponent: boolean;
  isFormField: boolean;
  parentComponent?: string;
  drillDepth: number;
}
