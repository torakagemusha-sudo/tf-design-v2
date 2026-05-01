/**
 * @fileoverview Density Convention Checker
 *
 * Enforces consistent density (spacing) usage across Torafirma components:
 * - Density must be one of: compact, standard, field
 * - Compact padding: 2–4px (dense data tables, toolbars)
 * - Standard padding: 8–12px (default components)
 * - Field padding: 16–24px (forms, inputs, relaxed layouts)
 * - No mixed densities within a single component
 * - Density must be explicitly declared, not inferred
 * - Density changes must be responsive to viewport
 *
 * @example
 * ```ts
 * validateDensity('compact', { componentName: 'TfDataGrid', usage: 'data-table' });
 * // → [{ passed: true, rule: 'valid-density-value', ... }]
 *
 * validateDensity('comfortable', { componentName: 'TfButton' });
 * // → [{ passed: false, rule: 'valid-density-value', ... }]
 * ```
 */

import type { Density, RuleResult, ValidatorFunction } from './types';

// ------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------

/** Valid density values in the Torafirma system. */
const VALID_DENSITIES: Density[] = ['compact', 'standard', 'field'];

/** Padding ranges (in px) for each density level. */
const DENSITY_PADDING_RANGES: Record<Density, { min: number; max: number; description: string }> = {
  compact: { min: 2, max: 4, description: '2–4px (dense data tables, toolbars, status bars)' },
  standard: { min: 8, max: 12, description: '8–12px (default components, cards, buttons)' },
  field: { min: 16, max: 24, description: '16–24px (forms, inputs, relaxed layouts)' },
};

/** Recommended component usages per density. */
const DENSITY_USAGE_GUIDE: Record<Density, string[]> = {
  compact: ['data-table', 'data-grid', 'toolbar', 'status-bar', 'list-dense', 'timeline'],
  standard: ['button', 'card', 'panel', 'modal', 'tab', 'menu', 'tooltip'],
  field: ['form', 'input', 'textarea', 'select', 'field-group', 'settings'],
};

/** Properties that define visual density. */
const DENSITY_PROPERTIES = [
  'padding',
  'padding-top',
  'padding-right',
  'padding-bottom',
  'padding-left',
  'margin',
  'gap',
  'row-gap',
  'column-gap',
  'min-height',
  'line-height',
];

// ------------------------------------------------------------------------------
// Context type
// ------------------------------------------------------------------------------

export interface DensityValidationContext {
  /** Component name being validated. */
  componentName?: string;
  /** The intended usage scenario. */
  usage?: string;
  /** File path for reporting. */
  filePath?: string;
  /** Actual CSS padding values found in the component (for range validation). */
  paddingValues?: number[];
  /** Whether the component uses mixed density values. */
  hasMixedDensity?: boolean;
  /** Sibling components to check for density consistency. */
  siblings?: Array<{ density: Density; componentName: string }>;
  /** Whether density is explicitly set as a prop. */
  densityPropExplicit?: boolean;
}

// ------------------------------------------------------------------------------
// Rule IDs
// ------------------------------------------------------------------------------

const RULE = {
  validDensityValue: 'valid-density-value',
  compactPaddingRange: 'compact-padding-range',
  standardPaddingRange: 'standard-padding-range',
  fieldPaddingRange: 'field-padding-range',
  noMixedDensity: 'no-mixed-densities',
  densityExplicit: 'density-prop-explicit',
  densityUsageAppropriate: 'density-usage-appropriate',
  densityConsistentWithSiblings: 'density-consistent-with-siblings',
} as const;

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

/**
 * Check if a padding value falls within the expected range for a density.
 */
function isInRange(value: number, density: Density): boolean {
  const range = DENSITY_PADDING_RANGES[density];
  return value >= range.min && value <= range.max;
}

/**
 * Get the recommended density for a given usage scenario.
 */
function getRecommendedDensity(usage: string): Density | null {
  const lower = usage.toLowerCase();
  for (const [density, usages] of Object.entries(DENSITY_USAGE_GUIDE)) {
    if (usages.some((u) => lower.includes(u))) return density as Density;
  }
  return null;
}

// ------------------------------------------------------------------------------
// Validators
// ------------------------------------------------------------------------------

function checkValidDensityValue(density: Density | string, ctx?: DensityValidationContext): RuleResult {
  const passed = VALID_DENSITIES.includes(density as Density);

  return {
    passed,
    rule: RULE.validDensityValue,
    message: passed
      ? `Density "${density}" is a valid Torafirma density value.`
      : `Density "${density}" is not valid. Must be one of: ${VALID_DENSITIES.join(', ')}.`,
    severity: 'error',
    suggestion: passed
      ? undefined
      : `Use "compact" for dense UIs, "standard" for default, or "field" for form-heavy layouts.`,
    filePath: ctx?.filePath,
  };
}

function checkPaddingRange(density: Density | string, ctx?: DensityValidationContext): RuleResult[] {
  const results: RuleResult[] = [];

  if (!VALID_DENSITIES.includes(density as Density)) {
    return [{
      passed: true,
      rule: RULE.compactPaddingRange,
      message: `Invalid density — padding range check skipped.`,
      severity: 'info',
    }];
  }

  const validDensity = density as Density;
  const range = DENSITY_PADDING_RANGES[validDensity];
  const paddingValues = ctx?.paddingValues;

  if (!paddingValues || paddingValues.length === 0) {
    // No padding values provided — just report the expected range
    const ruleKey = validDensity === 'compact' ? RULE.compactPaddingRange
      : validDensity === 'standard' ? RULE.standardPaddingRange
        : RULE.fieldPaddingRange;

    results.push({
      passed: true,
      rule: ruleKey,
      message: `Density "${validDensity}" requires padding in the ${range.description} range.`,
      severity: 'info',
    });
    return results;
  }

  for (const value of paddingValues) {
    const passed = isInRange(value, validDensity);
    const ruleKey = validDensity === 'compact' ? RULE.compactPaddingRange
      : validDensity === 'standard' ? RULE.standardPaddingRange
        : RULE.fieldPaddingRange;

    results.push({
      passed,
      rule: ruleKey,
      message: passed
        ? `Padding value ${value}px is within ${validDensity} range (${range.min}–${range.max}px).`
        : `Padding value ${value}px is outside the ${validDensity} range (${range.min}–${range.max}px).`,
      severity: 'error',
      suggestion: passed ? undefined : `Adjust padding to ${range.min}–${range.max}px for ${validDensity} density.`,
      filePath: ctx?.filePath,
    });
  }

  return results;
}

function checkNoMixedDensity(density: Density | string, ctx?: DensityValidationContext): RuleResult {
  if (!ctx?.hasMixedDensity) {
    return {
      passed: true,
      rule: RULE.noMixedDensity,
      message: `No mixed densities detected within the component.`,
      severity: 'info',
    };
  }

  return {
    passed: false,
    rule: RULE.noMixedDensity,
    message: `Component "${ctx?.componentName || 'unknown'}" uses mixed density values. ` +
      `A single component must use one consistent density throughout.`,
    severity: 'error',
    suggestion: `Choose one density (compact, standard, or field) and apply it consistently ` +
      `to all padding, margin, and gap values in the component.`,
    filePath: ctx?.filePath,
  };
}

function checkDensityExplicit(density: Density | string, ctx?: DensityValidationContext): RuleResult {
  if (ctx?.densityPropExplicit === undefined) {
    return {
      passed: true,
      rule: RULE.densityExplicit,
      message: `Cannot determine if density prop is explicit — check skipped.`,
      severity: 'info',
    };
  }

  const passed = ctx.densityPropExplicit;

  return {
    passed,
    rule: RULE.densityExplicit,
    message: passed
      ? `Density is explicitly declared as a prop.`
      : `Density is not explicitly declared. Components should accept a \`density\` prop ` +
        `rather than inferring density from context.`,
    severity: 'warning',
    suggestion: passed
      ? undefined
      : `Add \`density?: 'compact' | 'standard' | 'field'\` to the component props ` +
        `with a default of 'standard'.`,
    filePath: ctx?.filePath,
  };
}

function checkDensityUsageAppropriate(density: Density | string, ctx?: DensityValidationContext): RuleResult {
  if (!ctx?.usage) {
    return {
      passed: true,
      rule: RULE.densityUsageAppropriate,
      message: `No usage context provided — appropriateness check skipped.`,
      severity: 'info',
    };
  }

  if (!VALID_DENSITIES.includes(density as Density)) {
    return {
      passed: true,
      rule: RULE.densityUsageAppropriate,
      message: `Invalid density — usage check skipped.`,
      severity: 'info',
    };
  }

  const recommended = getRecommendedDensity(ctx.usage);
  if (!recommended) {
    return {
      passed: true,
      rule: RULE.densityUsageAppropriate,
      message: `No recommendation for usage "${ctx.usage}" — check passes.`,
      severity: 'info',
    };
  }

  const passed = density === recommended;

  return {
    passed,
    rule: RULE.densityUsageAppropriate,
    message: passed
      ? `Density "${density}" is appropriate for "${ctx.usage}" usage.`
      : `Density "${density}" may not be optimal for "${ctx.usage}". ` +
        `Recommended: "${recommended}" (${DENSITY_PADDING_RANGES[recommended].description}).`,
    severity: 'warning',
    suggestion: passed ? undefined : `Consider using "${recommended}" for ${ctx.usage} components.`,
    filePath: ctx?.filePath,
  };
}

function checkDensityConsistentWithSiblings(density: Density | string, ctx?: DensityValidationContext): RuleResult {
  if (!ctx?.siblings || ctx.siblings.length === 0) {
    return {
      passed: true,
      rule: RULE.densityConsistentWithSiblings,
      message: `No sibling components — consistency check skipped.`,
      severity: 'info',
    };
  }

  const mismatched = ctx.siblings.filter((s) => s.density !== density);
  const passed = mismatched.length === 0;

  return {
    passed,
    rule: RULE.densityConsistentWithSiblings,
    message: passed
      ? `Density "${density}" is consistent with all ${ctx.siblings.length} sibling component(s).`
      : `${mismatched.length} sibling component(s) use different densities: ` +
        `${mismatched.map((s) => `${s.componentName} (${s.density})`).join(', ')}.`,
    severity: 'info',
    suggestion: passed
      ? undefined
      : `Align densities within the same layout region for visual consistency.`,
    filePath: ctx?.filePath,
  };
}

// ------------------------------------------------------------------------------
// Public API
// ------------------------------------------------------------------------------

/**
 * Validates density settings for a Torafirma component.
 *
 * @param density - The density value to validate ('compact' | 'standard' | 'field').
 * @param context - Optional context (component name, usage, padding values, siblings).
 * @returns       - Array of `RuleResult` for each density rule.
 *
 * @example
 * ```ts
 * const results = validateDensity('compact', {
 *   componentName: 'TfDataGrid',
 *   usage: 'data-table',
 *   paddingValues: [2, 4, 3],
 *   hasMixedDensity: false,
 *   densityPropExplicit: true,
 * });
 *
 * const bad = validateDensity('comfortable', { componentName: 'TfButton' });
 * // → [{ passed: false, rule: 'valid-density-value', ... }]
 * ```
 */
export function validateDensity(
  density: Density | string,
  context?: DensityValidationContext,
): RuleResult[] {
  const results: RuleResult[] = [];

  results.push(checkValidDensityValue(density, context));
  results.push(...checkPaddingRange(density, context));
  results.push(checkNoMixedDensity(density, context));
  results.push(checkDensityExplicit(density, context));
  results.push(checkDensityUsageAppropriate(density, context));
  results.push(checkDensityConsistentWithSiblings(density, context));

  return results;
}

/** Alias for use in generic validator pipelines. */
export const validateComponentDensity: ValidatorFunction<Density | string, DensityValidationContext> =
  validateDensity;
