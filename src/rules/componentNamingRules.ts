/**
 * @fileoverview Component Naming Convention Enforcer
 *
 * Ensures all Torafirma components follow strict naming conventions:
 * - PascalCase component names (must start with capital letter)
 * - CSS class names must use the `tf-` prefix
 * - No decorative color names in component names
 * - Consistent naming within component families
 *
 * @example
 * ```ts
 * validateComponentName('TerraButton', { family: 'controls' });
 * // → [{ passed: true, rule: 'component-name-capitalization', ... }]
 *
 * validateComponentName('blueButton', { family: 'controls' });
 * // → [{ passed: false, rule: 'component-name-capitalization', ... },
 * //    { passed: false, rule: 'no-decorative-color-names', ... }]
 * ```
 */

import type { RuleResult, ValidatorFunction } from './types';

// ------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------

/** Decorative color names that must never appear in component names. */
const DECORATIVE_COLOR_NAMES = [
  'blue',
  'red',
  'green',
  'yellow',
  'orange',
  'purple',
  'pink',
  'brown',
  'gray',
  'grey',
  'black',
  'white',
  'cyan',
  'magenta',
  'lime',
  'teal',
  'indigo',
  'violet',
];

/** Known component families for consistency checking. */
const KNOWN_FAMILIES = [
  'controls',
  'display',
  'feedback',
  'navigation',
  'layout',
  'forms',
  'data',
  'overlay',
  'authority',
];

/** Expected family prefixes for cross-family consistency. */
const FAMILY_PREFIXES: Record<string, string> = {
  controls: 'Tf',
  display: 'Tf',
  feedback: 'Tf',
  navigation: 'Tf',
  layout: 'TfLayout',
  forms: 'TfForm',
  data: 'TfData',
  overlay: 'Tf',
  authority: 'TfAuth',
};

// ------------------------------------------------------------------------------
// Context type
// ------------------------------------------------------------------------------

export interface ComponentNamingContext {
  /** Which component family this belongs to. */
  family?: string;
  /** Sibling component names in the same family (for consistency). */
  siblings?: string[];
  /** File path where the component is defined. */
  filePath?: string;
  /** Whether the name being validated is a CSS class rather than a component. */
  isCSSClass?: boolean;
}

// ------------------------------------------------------------------------------
// Rule IDs
// ------------------------------------------------------------------------------

const RULE = {
  capitalization: 'component-name-capitalization',
  cssPrefix: 'css-class-prefix',
  noDecorativeColors: 'no-decorative-color-names',
  familyConsistency: 'family-naming-consistency',
  noGenericNames: 'no-generic-component-names',
  suffixPattern: 'component-name-suffix-pattern',
} as const;

// ------------------------------------------------------------------------------
// Validators
// ------------------------------------------------------------------------------

/**
 * Validate that a component name starts with a capital letter (PascalCase).
 */
function checkCapitalization(name: string, _ctx?: ComponentNamingContext): RuleResult {
  const firstChar = name.charAt(0);
  const passed = firstChar === firstChar.toUpperCase() && firstChar !== firstChar.toLowerCase();

  return {
    passed,
    rule: RULE.capitalization,
    message: passed
      ? `Component name "${name}" starts with a capital letter.`
      : `Component name "${name}" must start with a capital letter (PascalCase).`,
    severity: 'error',
    suggestion: passed
      ? undefined
      : `Rename to "${name.charAt(0).toUpperCase()}${name.slice(1)}"`,
  };
}

/**
 * Validate that CSS class names use the `tf-` prefix.
 */
function checkCSSPrefix(name: string, ctx?: ComponentNamingContext): RuleResult {
  // Only applies to CSS class names
  if (!ctx?.isCSSClass) {
    return {
      passed: true,
      rule: RULE.cssPrefix,
      message: `Rule skipped — "${name}" is not a CSS class name.`,
      severity: 'info',
    };
  }

  const passed = name.startsWith('tf-');

  return {
    passed,
    rule: RULE.cssPrefix,
    message: passed
      ? `CSS class "${name}" uses the required "tf-" prefix.`
      : `CSS class "${name}" must use the "tf-" prefix (e.g., "tf-${name}").`,
    severity: 'error',
    suggestion: passed ? undefined : `Rename to "tf-${name}"`,
  };
}

/**
 * Validate that the name does not contain decorative color names.
 */
function checkNoDecorativeColors(name: string, _ctx?: ComponentNamingContext): RuleResult {
  const lowerName = name.toLowerCase();
  const foundColor = DECORATIVE_COLOR_NAMES.find((color) => lowerName.includes(color));
  const passed = foundColor === undefined;

  return {
    passed,
    rule: RULE.noDecorativeColors,
    message: passed
      ? `Component name "${name}" contains no decorative color names.`
      : `Component name "${name}" contains decorative color name "${foundColor}". ` +
        `Use semantic variants (neutral, inspect, run, warning, danger, etc.) instead.`,
    severity: 'error',
    suggestion: passed
      ? undefined
      : `Remove "${foundColor}" and rely on the \`variant\` prop for color semantics.`,
  };
}

/**
 * Validate naming consistency within a component family.
 */
function checkFamilyConsistency(name: string, ctx?: ComponentNamingContext): RuleResult {
  const family = ctx?.family;
  if (!family) {
    return {
      passed: true,
      rule: RULE.familyConsistency,
      message: `Rule skipped — no family specified for "${name}".`,
      severity: 'info',
    };
  }

  const expectedPrefix = FAMILY_PREFIXES[family];
  if (!expectedPrefix) {
    return {
      passed: true,
      rule: RULE.familyConsistency,
      message: `Unknown family "${family}" — no prefix check applied.`,
      severity: 'info',
    };
  }

  const passed = name.startsWith(expectedPrefix);

  return {
    passed,
    rule: RULE.familyConsistency,
    message: passed
      ? `Component "${name}" follows the "${family}" family naming convention.`
      : `Component "${name}" should start with "${expectedPrefix}" for the "${family}" family.`,
    severity: 'warning',
    suggestion: passed ? undefined : `Rename to "${expectedPrefix}${name}"`,
  };
}

/**
 * Validate that component names are not overly generic.
 */
function checkNoGenericNames(name: string, _ctx?: ComponentNamingContext): RuleResult {
  const GENERIC_NAMES = ['item', 'element', 'component', 'widget', 'thing', 'object', 'box'];
  const lowerName = name.toLowerCase();
  const foundGeneric = GENERIC_NAMES.find((generic) => lowerName === generic || lowerName.endsWith(generic));
  const passed = foundGeneric === undefined;

  return {
    passed,
    rule: RULE.noGenericNames,
    message: passed
      ? `Component name "${name}" is sufficiently descriptive.`
      : `Component name "${name}" is too generic (contains "${foundGeneric}"). ` +
        `Use a domain-specific name that describes its purpose.`,
    severity: 'warning',
    suggestion: passed ? undefined : `Rename to something more descriptive, e.g., "TfSensorReadout" instead of "TfDataBox".`,
  };
}

/**
 * Validate that component names follow the TfXxx suffix pattern (e.g., TfButton, TfPanel).
 */
function checkSuffixPattern(name: string, _ctx?: ComponentNamingContext): RuleResult {
  // Only applies to component names, not CSS classes
  const passed = /^Tf[A-Z][A-Za-z0-9]*$/.test(name);

  return {
    passed,
    rule: RULE.suffixPattern,
    message: passed
      ? `Component name "${name}" follows the TfXxx naming pattern.`
      : `Component name "${name}" should follow the "TfXxx" pattern (e.g., TfButton, TfPanel).`,
    severity: 'error',
    suggestion: passed ? undefined : `Rename to match "Tf[A-Z]..." — e.g., "Tf${name.replace(/^[a-z]/i, (c) => c.toUpperCase())}"`,
  };
}

// ------------------------------------------------------------------------------
// Public API
// ------------------------------------------------------------------------------

/**
 * Validates a component name against all Torafirma naming conventions.
 *
 * @param name    - The component or CSS class name to validate.
 * @param context - Optional context for family/consistency checks.
 * @returns       - Array of `RuleResult`, one per naming rule.
 *
 * @example
 * ```ts
 * const results = validateComponentName('TfButton', {
 *   family: 'controls',
 *   filePath: 'src/components/TfButton.tsx',
 * });
 * console.log(results.filter((r) => !r.passed));
 * ```
 */
export function validateComponentName(
  name: string,
  context?: ComponentNamingContext,
): RuleResult[] {
  const results: RuleResult[] = [];

  results.push(checkCapitalization(name, context));
  results.push(checkCSSPrefix(name, context));
  results.push(checkNoDecorativeColors(name, context));
  results.push(checkFamilyConsistency(name, context));
  results.push(checkNoGenericNames(name, context));

  // Only apply TfXxx pattern check to actual component names, not CSS classes
  if (!context?.isCSSClass) {
    results.push(checkSuffixPattern(name, context));
  }

  return results;
}

/** Alias for use in generic validator pipelines. */
export const validateComponentNaming: ValidatorFunction<
  string,
  ComponentNamingContext
> = validateComponentName;
