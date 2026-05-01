/**
 * @fileoverview Semantic Variant Validator
 *
 * Enforces the Torafirma canonical variant system:
 * - Only 9 canonical variants are allowed: neutral, inspect, run, warning,
 *   instability, danger, stream, model, authority
 * - Decorative variants (primary, secondary, success, info) are forbidden
 * - Each canonical variant maps to a specific design-token color
 * - `danger` must map to `#c93f32`, never `#dc2626`
 * - `run` must map to `#46b680`
 *
 * @example
 * ```ts
 * validateSemanticVariant('primary');
 * // → [{ passed: false, rule: 'canonical-variant-only', ... }]
 *
 * validateSemanticVariant('danger');
 * // → [{ passed: true, rule: 'canonical-variant-only', ... },
 * //    { passed: true, rule: 'variant-color-mapping', ... }]
 * ```
 */

import type { CanonicalVariant, RuleResult, ValidatorFunction } from './types';

// ------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------

/** The nine canonical semantic variants in the Torafirma system. */
const CANONICAL_VARIANTS: readonly CanonicalVariant[] = [
  'neutral',
  'inspect',
  'run',
  'warning',
  'instability',
  'danger',
  'stream',
  'model',
  'authority',
];

/** Forbidden decorative variant names. */
const DECORATIVE_VARIANTS: readonly string[] = [
  'primary',
  'secondary',
  'success',
  'info',
  'error',
  'light',
  'dark',
  'ghost',
  'outline',
  'link',
  'text',
  'default',
  'emphasis',
  'highlight',
  'subtle',
];

/** Required color-token mapping for each canonical variant. */
const VARIANT_COLOR_MAP: Record<CanonicalVariant, string> = {
  neutral: '--tf-color-neutral-50',
  inspect: '--tf-color-blue-50',
  run: '--tf-color-green-50',
  warning: '--tf-color-yellow-50',
  instability: '--tf-color-orange-50',
  danger: '--tf-color-red-50',
  stream: '--tf-color-cyan-50',
  model: '--tf-color-purple-50',
  authority: '--tf-color-amber-50',
};

/** Exact hex values that each variant must resolve to (for verification). */
const VARIANT_HEX_MAP: Record<CanonicalVariant, string> = {
  neutral: '#6b7280',
  inspect: '#3b82f6',
  run: '#46b680',
  warning: '#eab308',
  instability: '#f59e0b',
  danger: '#c93f32',
  stream: '#06b6d4',
  model: '#8b5cf6',
  authority: '#d97706',
};

// ------------------------------------------------------------------------------
// Context type
// ------------------------------------------------------------------------------

export interface SemanticVariantContext {
  /** The resolved hex color for the variant (if known). */
  resolvedHex?: string;
  /** Whether the variant is being used in a button context (stricter checks). */
  isButton?: boolean;
  /** Component name using the variant. */
  componentName?: string;
  /** File path for reporting. */
  filePath?: string;
}

// ------------------------------------------------------------------------------
// Rule IDs
// ------------------------------------------------------------------------------

const RULE = {
  canonicalOnly: 'canonical-variant-only',
  noDecorativeVariants: 'no-decorative-variants',
  variantColorMapping: 'variant-color-mapping',
  dangerNotDc2626: 'danger-not-dc2626',
  runColorCheck: 'run-color-mapping',
} as const;

// ------------------------------------------------------------------------------
// Validators
// ------------------------------------------------------------------------------

/**
 * Check that the variant is one of the 9 canonical variants.
 */
function checkCanonicalOnly(variant: string, _ctx?: SemanticVariantContext): RuleResult {
  const passed = CANONICAL_VARIANTS.includes(variant as CanonicalVariant);

  return {
    passed,
    rule: RULE.canonicalOnly,
    message: passed
      ? `Variant "${variant}" is a canonical Torafirma variant.`
      : `Variant "${variant}" is not a canonical variant. ` +
        `Allowed: ${CANONICAL_VARIANTS.join(', ')}.`,
    severity: 'error',
    suggestion: passed
      ? undefined
      : findClosestCanonical(variant),
  };
}

/**
 * Check that the variant is not a known decorative variant name.
 */
function checkNoDecorativeVariants(variant: string, _ctx?: SemanticVariantContext): RuleResult {
  const isDecorative = DECORATIVE_VARIANTS.includes(variant.toLowerCase());

  if (!isDecorative) {
    return {
      passed: true,
      rule: RULE.noDecorativeVariants,
      message: `Variant "${variant}" is not a known decorative variant name.`,
      severity: 'info',
    };
  }

  return {
    passed: false,
    rule: RULE.noDecorativeVariants,
    message: `Variant "${variant}" is a forbidden decorative variant. ` +
      `Torafirma uses semantic variants, not Bootstrap-style decorative ones.`,
    severity: 'error',
    suggestion: mapDecorativeToCanonical(variant),
  };
}

/**
 * Check that the variant maps to the correct design-token color.
 */
function checkVariantColorMapping(
  variant: string,
  ctx?: SemanticVariantContext,
): RuleResult {
  if (!CANONICAL_VARIANTS.includes(variant as CanonicalVariant)) {
    return {
      passed: true,
      rule: RULE.variantColorMapping,
      message: `Non-canonical variant "${variant}" — color mapping check skipped.`,
      severity: 'info',
    };
  }

  const expectedToken = VARIANT_COLOR_MAP[variant as CanonicalVariant];

  // If resolvedHex is provided, verify it matches the expected hex
  if (ctx?.resolvedHex) {
    const expectedHex = VARIANT_HEX_MAP[variant as CanonicalVariant];
    const passed = ctx.resolvedHex.toLowerCase() === expectedHex.toLowerCase();

    return {
      passed,
      rule: RULE.variantColorMapping,
      message: passed
        ? `Variant "${variant}" resolves to the correct color ${expectedHex}.`
        : `Variant "${variant}" resolves to "${ctx.resolvedHex}" but must resolve to "${expectedHex}" ` +
          `(token: ${expectedToken}).`,
      severity: 'error',
      suggestion: passed ? undefined : `Update the token mapping so ${variant} → var(${expectedToken}) → ${expectedHex}.`,
      filePath: ctx?.filePath,
    };
  }

  // Without resolvedHex, just confirm the token mapping exists
  return {
    passed: true,
    rule: RULE.variantColorMapping,
    message: `Variant "${variant}" must map to token "${expectedToken}" (${VARIANT_HEX_MAP[variant as CanonicalVariant]}).`,
    severity: 'info',
  };
}

/**
 * Explicitly verify that `danger` does NOT map to the common `#dc2626` red.
 */
function checkDangerNotDc2626(variant: string, ctx?: SemanticVariantContext): RuleResult {
  if (variant !== 'danger') {
    return {
      passed: true,
      rule: RULE.dangerNotDc2626,
      message: `Not the "danger" variant — skipped.`,
      severity: 'info',
    };
  }

  if (ctx?.resolvedHex) {
    const isWrongRed = ctx.resolvedHex.toLowerCase() === '#dc2626';
    return {
      passed: !isWrongRed,
      rule: RULE.dangerNotDc2626,
      message: isWrongRed
        ? `Danger variant uses forbidden color #dc2626. Must use Torafirma red #c93f32.`
        : `Danger variant correctly avoids #dc2626 (uses ${ctx.resolvedHex}).`,
      severity: 'error',
      suggestion: isWrongRed ? `Map danger → var(--tf-color-red-50) → #c93f32.` : undefined,
      filePath: ctx?.filePath,
    };
  }

  return {
    passed: true,
    rule: RULE.dangerNotDc2626,
    message: `Danger variant: ensure it maps to #c93f32, not #dc2626.`,
    severity: 'info',
  };
}

/**
 * Explicitly verify that `run` maps to `#46b680`.
 */
function checkRunColor(variant: string, ctx?: SemanticVariantContext): RuleResult {
  if (variant !== 'run') {
    return {
      passed: true,
      rule: RULE.runColorCheck,
      message: `Not the "run" variant — skipped.`,
      severity: 'info',
    };
  }

  const expectedHex = VARIANT_HEX_MAP.run;

  if (ctx?.resolvedHex) {
    const passed = ctx.resolvedHex.toLowerCase() === expectedHex.toLowerCase();
    return {
      passed,
      rule: RULE.runColorCheck,
      message: passed
        ? `Run variant correctly resolves to ${expectedHex}.`
        : `Run variant resolves to "${ctx.resolvedHex}" but must be "${expectedHex}".`,
      severity: 'error',
      suggestion: passed ? undefined : `Map run → var(--tf-color-green-50) → ${expectedHex}.`,
      filePath: ctx?.filePath,
    };
  }

  return {
    passed: true,
    rule: RULE.runColorCheck,
    message: `Run variant: ensure it maps to ${expectedHex}.`,
    severity: 'info',
  };
}

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

/** Find the closest canonical variant to an invalid one. */
function findClosestCanonical(variant: string): string {
  const decorativeToCanonical: Record<string, string> = {
    primary: 'neutral',
    secondary: 'neutral',
    success: 'run',
    info: 'inspect',
    error: 'danger',
    light: 'neutral',
    dark: 'neutral',
    ghost: 'neutral',
    outline: 'neutral',
    link: 'inspect',
    text: 'neutral',
    default: 'neutral',
    emphasis: 'authority',
    highlight: 'warning',
    subtle: 'neutral',
  };

  const suggestion = decorativeToCanonical[variant.toLowerCase()];
  return suggestion
    ? `Replace "${variant}" with the semantic variant "${suggestion}".`
    : `Choose from: ${CANONICAL_VARIANTS.join(', ')}.`;
}

/** Map a forbidden decorative variant to its canonical equivalent. */
function mapDecorativeToCanonical(variant: string): string {
  return findClosestCanonical(variant);
}

// ------------------------------------------------------------------------------
// Public API
// ------------------------------------------------------------------------------

/**
 * Validates a semantic variant name against the Torafirma canonical system.
 *
 * @param variant - The variant string to validate (e.g., 'danger', 'primary').
 * @param context - Optional context with resolved hex color, component info.
 * @returns       - Array of `RuleResult` for each variant rule.
 *
 * @example
 * ```ts
 * // Validate a variant with known resolved color
 * const results = validateSemanticVariant('danger', {
 *   resolvedHex: '#c93f32',
 *   componentName: 'TfAlert',
 * });
 *
 * // Validate against a forbidden decorative variant
 * const bad = validateSemanticVariant('success');
 * // → [{ passed: false, rule: 'no-decorative-variants', ... }]
 * ```
 */
export function validateSemanticVariant(
  variant: string,
  context?: SemanticVariantContext,
): RuleResult[] {
  const results: RuleResult[] = [];

  results.push(checkNoDecorativeVariants(variant, context));
  results.push(checkCanonicalOnly(variant, context));
  results.push(checkVariantColorMapping(variant, context));
  results.push(checkDangerNotDc2626(variant, context));
  results.push(checkRunColor(variant, context));

  return results;
}

/** Alias for use in generic validator pipelines. */
export const validateVariant: ValidatorFunction<string, SemanticVariantContext> =
  validateSemanticVariant;
