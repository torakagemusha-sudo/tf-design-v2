/**
 * @fileoverview CSS Token Validation Rules
 *
 * Enforces that all styles use Torafirma's design-token system:
 * - All colors must reference CSS custom properties (`--tf-*`)
 * - No hardcoded hex values (except in `tokens.css`)
 * - All spacing must use `tf-space-*` tokens
 * - All typography must use `tf-font-*` tokens
 * - All border-radius must use `tf-radius-*` tokens
 * - All shadows must use `tf-shadow-*` tokens
 *
 * @example
 * ```ts
 * validateCSSTokens('.btn { color: #ff0000; padding: 8px; }');
 * // → [
 * //   { passed: false, rule: 'no-hardcoded-colors', message: '...' },
 * //   { passed: false, rule: 'spacing-token-usage', message: '...' }
 * // ]
 * ```
 */

import type { RuleResult, ValidatorFunction, CSSTokenUsage } from './types';

// ------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------

/** CSS custom property patterns recognized as valid tokens. */
const TOKEN_PATTERNS = {
  color: /^var\(--tf-(color|semantic|theme)-[a-z0-9-]+\)$/,
  spacing: /^var\(--tf-space-[a-z0-9-]+\)$/,
  typography: /^var\(--tf-font-[a-z0-9-]+\)$/,
  radius: /^var\(--tf-radius-[a-z0-9-]+\)$/,
  shadow: /^var\(--tf-shadow-[a-z0-9-]+\)$/,
  border: /^var\(--tf-border-[a-z0-9-]+\)$/,
};

/** File paths exempt from the hardcoded-color rule. */
const COLOR_EXEMPT_PATHS = [
  /tokens\.css$/i,
  /_tokens\.css$/i,
  /design-tokens\.css$/i,
  /variables\.css$/i,
];

/** Properties that must use color tokens. */
const COLOR_PROPERTIES = [
  'color',
  'background-color',
  'background',
  'border-color',
  'border-top-color',
  'border-right-color',
  'border-bottom-color',
  'border-left-color',
  'outline-color',
  'fill',
  'stroke',
  'caret-color',
  'column-rule-color',
  'text-decoration-color',
];

/** Properties that must use spacing tokens. */
const SPACING_PROPERTIES = [
  'padding',
  'padding-top',
  'padding-right',
  'padding-bottom',
  'padding-left',
  'margin',
  'margin-top',
  'margin-right',
  'margin-bottom',
  'margin-left',
  'gap',
  'row-gap',
  'column-gap',
  'inset',
  'top',
  'right',
  'bottom',
  'left',
];

/** Properties that must use typography tokens. */
const TYPOGRAPHY_PROPERTIES = [
  'font-family',
  'font-size',
  'font-weight',
  'line-height',
  'letter-spacing',
  'text-transform',
];

/** Properties that must use border-radius tokens. */
const RADIUS_PROPERTIES = [
  'border-radius',
  'border-top-left-radius',
  'border-top-right-radius',
  'border-bottom-right-radius',
  'border-bottom-left-radius',
];

// ------------------------------------------------------------------------------
// Context type
// ------------------------------------------------------------------------------

export interface CSSTokenContext {
  /** File path of the CSS being validated (used for exemption checks). */
  filePath?: string;
  /** Whether to allow hardcoded values in `@media` queries. */
  allowMediaQueries?: boolean;
}

// ------------------------------------------------------------------------------
// Rule IDs
// ------------------------------------------------------------------------------

const RULE = {
  noHardcodedColors: 'no-hardcoded-colors',
  noHardcodedHex: 'no-hardcoded-hex-values',
  spacingTokenUsage: 'spacing-token-usage',
  typographyTokenUsage: 'typography-token-usage',
  radiusTokenUsage: 'radius-token-usage',
  shadowTokenUsage: 'shadow-token-usage',
  tokenFallback: 'css-variable-fallback-required',
  noCalcWithoutToken: 'no-calc-without-token-base',
} as const;

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

/**
 * Extract all CSS property/value pairs from raw CSS content.
 *
 * This is a lightweight parser sufficient for token validation.
 * It strips comments, @rules, and extracts declarations.
 */
function extractDeclarations(css: string): CSSTokenUsage[] {
  const results: CSSTokenUsage[] = [];

  // Strip CSS comments
  const stripped = css.replace(/\/\*[\s\S]*?\*\//g, '');

  // Match declaration blocks
  const blockRegex = /\{([^}]*)\}/g;
  let blockMatch: RegExpExecArray | null;

  // Track approximate line numbers
  const lines = stripped.split('\n');

  while ((blockMatch = blockRegex.exec(stripped)) !== null) {
    const blockContent = blockMatch[1];
    const blockStartIdx = blockMatch.index;

    // Approximate line number of this block
    const lineNumber = stripped.substring(0, blockStartIdx).split('\n').length;

    // Extract individual declarations
    const declRegex = /([a-zA-Z-]+)\s*:\s*([^;]+);/g;
    let declMatch: RegExpExecArray | null;

    while ((declMatch = declRegex.exec(blockContent)) !== null) {
      const property = declMatch[1].trim().toLowerCase();
      const value = declMatch[2].trim();

      results.push({
        property,
        value,
        isToken: value.startsWith('var(') && value.includes('--tf-'),
        line: lineNumber,
      });
    }
  }

  return results;
}

/** Check if a file path is exempt from the no-hardcoded-colors rule. */
function isExemptFromColorRules(filePath?: string): boolean {
  if (!filePath) return false;
  return COLOR_EXEMPT_PATHS.some((pattern) => pattern.test(filePath));
}

/** Check if a value is a hardcoded hex color. */
function isHardcodedHex(value: string): boolean {
  return /^#[0-9a-fA-F]{3,8}$/.test(value);
}

/** Check if a value is a hardcoded RGB/RGBA color. */
function isHardcodedRgb(value: string): boolean {
  return /^rgba?\s*\(/.test(value);
}

/** Check if a value is a hardcoded HSL/HSLA color. */
function isHardcodedHsl(value: string): boolean {
  return /^hsla?\s*\(/.test(value);
}

/** Check if a value is a hardcoded color keyword. */
function isHardcodedColorKeyword(value: string): boolean {
  const keywords = [
    'red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'black',
    'white', 'gray', 'grey', 'cyan', 'magenta', 'lime', 'teal', 'indigo',
    'violet', 'brown', 'maroon', 'navy', 'olive', 'silver', 'gold',
  ];
  return keywords.includes(value.toLowerCase());
}

// ------------------------------------------------------------------------------
// Validators
// ------------------------------------------------------------------------------

/**
 * Check that no color properties use hardcoded hex/rgb/hsl values.
 */
function checkNoHardcodedColors(declarations: CSSTokenUsage[], ctx?: CSSTokenContext): RuleResult[] {
  const results: RuleResult[] = [];

  // Skip if file is exempt (e.g., tokens.css)
  if (isExemptFromColorRules(ctx?.filePath)) {
    return [
      {
        passed: true,
        rule: RULE.noHardcodedColors,
        message: `File "${ctx!.filePath}" is exempt from hardcoded-color checks.`,
        severity: 'info',
      },
    ];
  }

  for (const decl of declarations) {
    if (!COLOR_PROPERTIES.includes(decl.property)) continue;

    const isHardcoded =
      isHardcodedHex(decl.value) ||
      isHardcodedRgb(decl.value) ||
      isHardcodedHsl(decl.value) ||
      isHardcodedColorKeyword(decl.value);

    if (isHardcoded) {
      results.push({
        passed: false,
        rule: RULE.noHardcodedColors,
        message: `Hardcoded color "${decl.value}" found in property "${decl.property}" at line ${decl.line}. ` +
          `All colors must use CSS custom properties (var(--tf-*)).`,
        severity: 'error',
        suggestion: `Replace "${decl.value}" with a design token such as "var(--tf-color-neutral-50)" ` +
          `or "var(--tf-semantic-${decl.property === 'background-color' ? 'surface' : 'text'}-default)".`,
        lineNumber: decl.line,
        context: `${decl.property}: ${decl.value};`,
      });
    }
  }

  if (results.length === 0) {
    results.push({
      passed: true,
      rule: RULE.noHardcodedColors,
      message: 'No hardcoded colors detected. All color properties use CSS custom properties.',
      severity: 'info',
    });
  }

  return results;
}

/**
 * Check that spacing properties use tf-space-* tokens.
 */
function checkSpacingTokens(declarations: CSSTokenUsage[]): RuleResult[] {
  const results: RuleResult[] = [];

  for (const decl of declarations) {
    if (!SPACING_PROPERTIES.includes(decl.property)) continue;

    // Allow 'auto', '0', and calc() with tokens
    const isAutoOrZero = decl.value === 'auto' || decl.value === '0';
    const isCalcWithToken = decl.value.startsWith('calc(') && decl.value.includes('--tf-space-');
    const isValidToken = TOKEN_PATTERNS.spacing.test(decl.value) || isAutoOrZero || isCalcWithToken;

    if (!isValidToken) {
      results.push({
        passed: false,
        rule: RULE.spacingTokenUsage,
        message: `Spacing property "${decl.property}" uses non-token value "${decl.value}" at line ${decl.line}. ` +
          `All spacing must use "var(--tf-space-*)" tokens.`,
        severity: 'error',
        suggestion: `Replace "${decl.value}" with a spacing token such as "var(--tf-space-sm)" (8px) ` +
          `or "var(--tf-space-md)" (16px). Use calc() for offsets: calc(var(--tf-space-md) + 2px).`,
        lineNumber: decl.line,
        context: `${decl.property}: ${decl.value};`,
      });
    }
  }

  if (results.length === 0) {
    results.push({
      passed: true,
      rule: RULE.spacingTokenUsage,
      message: 'All spacing properties use tf-space-* tokens.',
      severity: 'info',
    });
  }

  return results;
}

/**
 * Check that typography properties use tf-font-* tokens.
 */
function checkTypographyTokens(declarations: CSSTokenUsage[]): RuleResult[] {
  const results: RuleResult[] = [];

  for (const decl of declarations) {
    if (!TYPOGRAPHY_PROPERTIES.includes(decl.property)) continue;

    // font-weight can be numeric or token
    if (decl.property === 'font-weight') {
      const isNumeric = /^\d+$/.test(decl.value);
      const isToken = TOKEN_PATTERNS.typography.test(decl.value);
      if (isNumeric || isToken) continue;
    }

    // text-transform can be keyword or token
    if (decl.property === 'text-transform') {
      const isKeyword = ['none', 'capitalize', 'uppercase', 'lowercase', 'full-width'].includes(decl.value);
      const isToken = TOKEN_PATTERNS.typography.test(decl.value);
      if (isKeyword || isToken) continue;
    }

    const isToken = TOKEN_PATTERNS.typography.test(decl.value);

    if (!isToken) {
      results.push({
        passed: false,
        rule: RULE.typographyTokenUsage,
        message: `Typography property "${decl.property}" uses non-token value "${decl.value}" at line ${decl.line}. ` +
          `All typography must use "var(--tf-font-*)" tokens.`,
        severity: 'error',
        suggestion: `Replace "${decl.value}" with a font token such as "var(--tf-font-body-sm)" ` +
          `or "var(--tf-font-heading-md)".`,
        lineNumber: decl.line,
        context: `${decl.property}: ${decl.value};`,
      });
    }
  }

  if (results.length === 0) {
    results.push({
      passed: true,
      rule: RULE.typographyTokenUsage,
      message: 'All typography properties use tf-font-* tokens.',
      severity: 'info',
    });
  }

  return results;
}

/**
 * Check that border-radius properties use tf-radius-* tokens.
 */
function checkRadiusTokens(declarations: CSSTokenUsage[]): RuleResult[] {
  const results: RuleResult[] = [];

  for (const decl of declarations) {
    if (!RADIUS_PROPERTIES.includes(decl.property)) continue;

    // Allow '0' and '50%' (for circles)
    const isSpecial = decl.value === '0' || decl.value === '50%';
    const isToken = TOKEN_PATTERNS.radius.test(decl.value);

    if (!isToken && !isSpecial) {
      results.push({
        passed: false,
        rule: RULE.radiusTokenUsage,
        message: `Border-radius property "${decl.property}" uses non-token value "${decl.value}" at line ${decl.line}. ` +
          `All border-radius must use "var(--tf-radius-*)" tokens.`,
        severity: 'error',
        suggestion: `Replace "${decl.value}" with a radius token such as "var(--tf-radius-sm)" (4px) ` +
          `or "var(--tf-radius-md)" (8px).`,
        lineNumber: decl.line,
        context: `${decl.property}: ${decl.value};`,
      });
    }
  }

  if (results.length === 0) {
    results.push({
      passed: true,
      rule: RULE.radiusTokenUsage,
      message: 'All border-radius properties use tf-radius-* tokens.',
      severity: 'info',
    });
  }

  return results;
}

/**
 * Check that box-shadow uses tf-shadow-* tokens.
 */
function checkShadowTokens(declarations: CSSTokenUsage[]): RuleResult[] {
  const results: RuleResult[] = [];

  for (const decl of declarations) {
    if (decl.property !== 'box-shadow') continue;

    // Allow 'none'
    if (decl.value === 'none') continue;

    const isToken = TOKEN_PATTERNS.shadow.test(decl.value);

    if (!isToken) {
      results.push({
        passed: false,
        rule: RULE.shadowTokenUsage,
        message: `Box-shadow uses non-token value "${decl.value}" at line ${decl.line}. ` +
          `All shadows must use "var(--tf-shadow-*)" tokens.`,
        severity: 'error',
        suggestion: `Replace with a shadow token such as "var(--tf-shadow-sm)" or "var(--tf-shadow-md)".`,
        lineNumber: decl.line,
        context: `${decl.property}: ${decl.value};`,
      });
    }
  }

  if (results.length === 0) {
    results.push({
      passed: true,
      rule: RULE.shadowTokenUsage,
      message: 'All box-shadow properties use tf-shadow-* tokens.',
      severity: 'info',
    });
  }

  return results;
}

/**
 * Check that all `var()` calls include a fallback value.
 */
function checkVariableFallbacks(declarations: CSSTokenUsage[]): RuleResult[] {
  const results: RuleResult[] = [];

  for (const decl of declarations) {
    if (!decl.value.includes('var(')) continue;

    // Check if the var() has a fallback (second comma-separated value)
    const varCalls = decl.value.matchAll(/var\(--tf-[a-z0-9-]+\s*(,\s*[^)]+)?\)/g);
    for (const match of varCalls) {
      const hasFallback = match[1] !== undefined;
      if (!hasFallback) {
        // Extract the token name
        const tokenMatch = match[0].match(/var\((--tf-[a-z0-9-]+)/);
        const tokenName = tokenMatch ? tokenMatch[1] : 'unknown';

        results.push({
          passed: false,
          rule: RULE.tokenFallback,
          message: `CSS variable "${tokenName}" at line ${decl.line} is missing a fallback value. ` +
            `All var() calls must include a fallback for resilience.`,
          severity: 'warning',
          suggestion: `Add a fallback: var(${tokenName}, <default-value>)`,
          lineNumber: decl.line,
          context: `${decl.property}: ${decl.value};`,
        });
      }
    }
  }

  if (results.length === 0) {
    results.push({
      passed: true,
      rule: RULE.tokenFallback,
      message: 'All CSS variable references include fallback values.',
      severity: 'info',
    });
  }

  return results;
}

// ------------------------------------------------------------------------------
// Public API
// ------------------------------------------------------------------------------

/**
 * Validates CSS content against the Torafirma token system.
 *
 * @param cssContent - Raw CSS string to validate.
 * @param context    - Optional context (file path for exemptions, etc.).
 * @returns          - Array of `RuleResult` for each token rule.
 *
 * @example
 * ```ts
 * const css = `
 *   .btn {
 *     color: var(--tf-semantic-text-default);
 *     padding: var(--tf-space-sm);
 *     font-size: var(--tf-font-body-sm);
 *   }
 * `;
 * const results = validateCSSTokens(css, { filePath: 'src/components/Button.css' });
 * console.log(results.filter(r => !r.passed));
 * ```
 */
export function validateCSSTokens(
  cssContent: string,
  context?: CSSTokenContext,
): RuleResult[] {
  const declarations = extractDeclarations(cssContent);
  const results: RuleResult[] = [];

  results.push(...checkNoHardcodedColors(declarations, context));
  results.push(...checkSpacingTokens(declarations));
  results.push(...checkTypographyTokens(declarations));
  results.push(...checkRadiusTokens(declarations));
  results.push(...checkShadowTokens(declarations));
  results.push(...checkVariableFallbacks(declarations));

  return results;
}

/** Alias for use in generic validator pipelines. */
export const validateCSSTokenUsage: ValidatorFunction<string, CSSTokenContext> = validateCSSTokens;
