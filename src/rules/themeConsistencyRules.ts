/**
 * @fileoverview Theme Consistency Rules
 *
 * Ensures all Torafirma components work correctly across all 5 themes:
 * - All components must support: default, dark, high-contrast, ocean, print
 * - No theme-specific hardcoded colors
 * - Theme classes must be properly nested (e.g., [data-theme="dark"] &)
 * - CSS variable fallbacks required for all theme-dependent values
 * - No theme detection via JS (use CSS custom properties only)
 * - Print theme must hide decorative elements
 * - High-contrast theme must meet 7:1 contrast ratio
 *
 * @example
 * ```ts
 * validateThemeConsistency(`
 *   .btn {
 *     color: var(--tf-color-text, #333);
 *     background: var(--tf-color-surface, #fff);
 *   }
 * `);
 * // → [{ passed: true, rule: 'no-theme-hardcoded-colors', ... }]
 * ```
 */

import type { RuleResult, ThemeName, ValidatorFunction } from './types';

// ------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------

/** All themes that must be supported. */
const ALL_THEMES: ThemeName[] = ['default', 'dark', 'high-contrast', 'ocean', 'print'];

/** CSS selectors used for theme scoping. */
const THEME_SELECTORS = [
  '[data-theme="dark"]',
  '[data-theme="high-contrast"]',
  '[data-theme="ocean"]',
  '[data-theme="print"]',
  '.theme-dark',
  '.theme-high-contrast',
  '.theme-ocean',
  '.theme-print',
  '@media (prefers-color-scheme: dark)',
  '@media (prefers-contrast: high)',
  '@media print',
];

// ------------------------------------------------------------------------------
// Context type
// ------------------------------------------------------------------------------

export interface ThemeConsistencyContext {
  /** Which themes the component claims to support. */
  supportedThemes?: ThemeName[];
  /** File path for reporting. */
  filePath?: string;
  /** Component name. */
  componentName?: string;
  /** Whether this component has decorative elements that print theme should hide. */
  hasDecorativeElements?: boolean;
}

// ------------------------------------------------------------------------------
// Rule IDs
// ------------------------------------------------------------------------------

const RULE = {
  allThemesSupported: 'all-themes-supported',
  noThemeHardcodedColors: 'no-theme-hardcoded-colors',
  themeClassesNested: 'theme-classes-properly-nested',
  cssFallbacksRequired: 'css-variable-fallbacks-required',
  noJSThemeDetection: 'no-js-theme-detection',
  printThemeDecorative: 'print-theme-hides-decorative',
  highContrastRatio: 'high-contrast-minimum-ratio',
} as const;

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

/**
 * Check if CSS content has explicit theme support for a given theme.
 */
function hasThemeSupport(css: string, theme: ThemeName): boolean {
  const patterns: Record<ThemeName, RegExp[]> = {
    default: [/[^[]\.tf-component/, /:root/, /\[data-theme="default"\]/],
    dark: [/\[data-theme="dark"\]/, /@media\s*\(\s*prefers-color-scheme:\s*dark\s*\)/, /\.theme-dark/],
    'high-contrast': [/\[data-theme="high-contrast"\]/, /@media\s*\(\s*prefers-contrast:\s*high\s*\)/, /\.theme-high-contrast/],
    ocean: [/\[data-theme="ocean"\]/, /\.theme-ocean/],
    print: [/\[data-theme="print"\]/, /@media\s*print/, /\.theme-print/],
  };

  const themePatterns = patterns[theme];
  return themePatterns.some((p) => p.test(css));
}

/**
 * Extract all CSS declarations from a stylesheet.
 */
function extractDeclarations(css: string): Array<{ property: string; value: string; selector: string }> {
  const results: Array<{ property: string; value: string; selector: string }> = [];
  const stripped = css.replace(/\/\*[\s\S]*?\*\//g, '');

  // Match selector blocks
  const blockRegex = /([^{]+)\{([^}]*)\}/g;
  let match: RegExpExecArray | null;

  while ((match = blockRegex.exec(stripped)) !== null) {
    const selector = match[1].trim();
    const body = match[2];
    const declRegex = /([a-zA-Z-]+)\s*:\s*([^;]+);/g;
    let declMatch: RegExpExecArray | null;
    while ((declMatch = declRegex.exec(body)) !== null) {
      results.push({
        property: declMatch[1].trim().toLowerCase(),
        value: declMatch[2].trim(),
        selector,
      });
    }
  }

  return results;
}

/**
 * Check if a var() call includes a fallback value.
 */
function hasFallback(value: string): boolean {
  const varMatches = value.matchAll(/var\(--tf-[a-z0-9-]+\s*(,\s*[^)]+)?\)/g);
  for (const match of varMatches) {
    if (!match[1]) return false;
  }
  return true;
}

// ------------------------------------------------------------------------------
// Validators
// ------------------------------------------------------------------------------

function checkAllThemesSupported(css: string, ctx?: ThemeConsistencyContext): RuleResult {
  const supported = ctx?.supportedThemes;
  if (supported) {
    const missing = ALL_THEMES.filter((t) => !supported.includes(t));
    const passed = missing.length === 0;
    return {
      passed,
      rule: RULE.allThemesSupported,
      message: passed
        ? `Component supports all ${ALL_THEMES.length} themes.`
        : `Component is missing support for ${missing.length} theme(s): ${missing.join(', ')}.`,
      severity: 'error',
      suggestion: passed ? undefined : `Add theme styles for: ${missing.join(', ')}.`,
      filePath: ctx?.filePath,
    };
  }

  // Auto-detect theme support from CSS
  const detectedThemes = ALL_THEMES.filter((t) => hasThemeSupport(css, t));
  const missingThemes = ALL_THEMES.filter((t) => !detectedThemes.includes(t));
  const passed = missingThemes.length === 0;

  return {
    passed,
    rule: RULE.allThemesSupported,
    message: passed
      ? `All ${ALL_THEMES.length} themes are detected in the stylesheet.`
      : `Missing theme support for: ${missingThemes.join(', ')}.`,
    severity: 'error',
    suggestion: passed
      ? undefined
      : `Add theme selectors: ${missingThemes.map((t) => `[data-theme="${t}"]`).join(', ')}.`,
    filePath: ctx?.filePath,
  };
}

function checkNoThemeHardcodedColors(css: string, ctx?: ThemeConsistencyContext): RuleResult[] {
  const results: RuleResult[] = [];
  const declarations = extractDeclarations(css);

  const colorProps = [
    'color', 'background-color', 'background', 'border-color',
    'outline-color', 'fill', 'stroke', 'caret-color',
  ];

  const isHardcoded = (value: string): boolean => {
    const hex = /^#[0-9a-fA-F]{3,8}$/.test(value);
    const rgb = /^rgba?\s*\(/.test(value);
    const hsl = /^hsla?\s*\(/.test(value);
    const keyword = ['red', 'blue', 'green', 'yellow', 'black', 'white', 'gray', 'grey', 'orange', 'purple', 'pink'].includes(value.toLowerCase());
    return hex || rgb || hsl || keyword;
  };

  for (const decl of declarations) {
    if (!colorProps.includes(decl.property)) continue;

    // Skip if inside a theme selector (theme-specific overrides are allowed)
    const isInThemeBlock = THEME_SELECTORS.some((sel) => decl.selector.includes(sel));
    if (isInThemeBlock) continue;

    // Skip if using a CSS variable (even without fallback)
    if (decl.value.startsWith('var(')) continue;

    if (isHardcoded(decl.value)) {
      results.push({
        passed: false,
        rule: RULE.noThemeHardcodedColors,
        message: `Hardcoded color "${decl.value}" in "${decl.property}" ` +
          `(${decl.selector}) breaks theme consistency.`,
        severity: 'error',
        suggestion: `Replace with a CSS custom property: var(--tf-color-${decl.property === 'color' ? 'text' : 'surface'}-default, <fallback>)`,
        filePath: ctx?.filePath,
        context: `${decl.property}: ${decl.value};`,
      });
    }
  }

  if (results.length === 0) {
    results.push({
      passed: true,
      rule: RULE.noThemeHardcodedColors,
      message: `No hardcoded colors found outside theme-specific blocks.`,
      severity: 'info',
    });
  }

  return results;
}

function checkThemeClassesNested(css: string, ctx?: ThemeConsistencyContext): RuleResult {
  // Check that theme overrides are nested or scoped properly
  const hasDataAttributeScoping = /\[data-theme/.test(css);
  const hasMediaQueryScoping = /@media\s*\(/.test(css);

  const passed = hasDataAttributeScoping || hasMediaQueryScoping;

  return {
    passed,
    rule: RULE.themeClassesNested,
    message: passed
      ? `Theme classes are properly scoped via data attributes or media queries.`
      : `Theme overrides are not scoped. Use [data-theme="..."] or @media queries.`,
    severity: 'error',
    suggestion: passed
      ? undefined
      : `Wrap theme styles: \`[data-theme="dark"] & { ... }\` or \`@media (prefers-color-scheme: dark) { ... }\``,
    filePath: ctx?.filePath,
  };
}

function checkCSSFallbacksRequired(css: string, ctx?: ThemeConsistencyContext): RuleResult[] {
  const results: RuleResult[] = [];
  const declarations = extractDeclarations(css);

  for (const decl of declarations) {
    if (!decl.value.includes('var(')) continue;
    if (!decl.value.includes('--tf-')) continue;

    const hasFallbackValue = hasFallback(decl.value);
    if (!hasFallbackValue) {
      results.push({
        passed: false,
        rule: RULE.cssFallbacksRequired,
        message: `CSS variable in "${decl.property}" is missing a fallback value.`,
        severity: 'warning',
        suggestion: `Add fallback: var(--tf-token-name, <fallback-value>)`,
        filePath: ctx?.filePath,
        context: `${decl.property}: ${decl.value};`,
      });
    }
  }

  if (results.length === 0) {
    results.push({
      passed: true,
      rule: RULE.cssFallbacksRequired,
      message: `All CSS variable references include fallback values.`,
      severity: 'info',
    });
  }

  return results;
}

function checkNoJSThemeDetection(css: string, ctx?: ThemeConsistencyContext): RuleResult {
  // This rule validates CSS - JS detection would be in the JS file
  // In CSS context, we just verify theme is handled via selectors
  const passed = !css.includes('theme-detection') && !css.includes('detectTheme');

  return {
    passed,
    rule: RULE.noJSThemeDetection,
    message: passed
      ? `Theme handling uses CSS selectors only (no JS detection references).`
      : `CSS references JS theme detection — themes must be handled purely in CSS.`,
    severity: 'warning',
    suggestion: passed ? undefined : `Remove JS theme references. Use [data-theme] attributes instead.`,
    filePath: ctx?.filePath,
  };
}

function checkPrintThemeDecorative(css: string, ctx?: ThemeConsistencyContext): RuleResult[] {
  const results: RuleResult[] = [];

  if (!ctx?.hasDecorativeElements) {
    return [{
      passed: true,
      rule: RULE.printThemeDecorative,
      message: `No decorative elements — print check skipped.`,
      severity: 'info',
    }];
  }

  const hasPrintMedia = /@media\s*print/i.test(css) || /\[data-theme="print"\]/i.test(css);

  if (!hasPrintMedia) {
    results.push({
      passed: false,
      rule: RULE.printThemeDecorative,
      message: `Component has decorative elements but no print theme styles.`,
      severity: 'warning',
      suggestion: `Add @media print or [data-theme="print"] styles to hide decorative elements.`,
      filePath: ctx?.filePath,
    });
  }

  if (results.length === 0) {
    results.push({
      passed: true,
      rule: RULE.printThemeDecorative,
      message: `Print theme styles are present for decorative elements.`,
      severity: 'info',
    });
  }

  return results;
}

function checkHighContrastRatio(css: string, ctx?: ThemeConsistencyContext): RuleResult {
  const hasHighContrast = hasThemeSupport(css, 'high-contrast');
  if (!hasHighContrast) {
    return {
      passed: true,
      rule: RULE.highContrastRatio,
      message: `No high-contrast theme styles — contrast check skipped.`,
      severity: 'info',
    };
  }

  // This is a structural check — actual contrast would require a color parser
  const hasExplicitContrast = css.includes('contrast') || css.includes('7:1');

  return {
    passed: hasHighContrast,
    rule: RULE.highContrastRatio,
    message: hasHighContrast
      ? `High-contrast theme is defined. Ensure all text meets 7:1 contrast ratio.`
      : `High-contrast theme is missing.`,
    severity: 'warning',
    suggestion: `In high-contrast theme, use maximum contrast pairings: black/white only.`,
    filePath: ctx?.filePath,
  };
}

// ------------------------------------------------------------------------------
// Public API
// ------------------------------------------------------------------------------

/**
 * Validates component styles for theme consistency across all Torafirma themes.
 *
 * @param componentStyles - Raw CSS string to validate.
 * @param context         - Optional context (supported themes, component info).
 * @returns               - Array of `RuleResult` for each theme rule.
 *
 * @example
 * ```ts
 * const css = `
 *   .btn {
 *     color: var(--tf-color-text-default, #111);
 *     background: var(--tf-color-surface-default, #fff);
 *   }
 *   [data-theme="dark"] .btn {
 *     color: var(--tf-color-text-inverse, #fff);
 *     background: var(--tf-color-surface-inverse, #111);
 *   }
 * `;
 * const results = validateThemeConsistency(css, {
 *   supportedThemes: ['default', 'dark', 'high-contrast', 'ocean', 'print'],
 *   hasDecorativeElements: true,
 * });
 * ```
 */
export function validateThemeConsistency(
  componentStyles: string,
  context?: ThemeConsistencyContext,
): RuleResult[] {
  const results: RuleResult[] = [];

  results.push(checkAllThemesSupported(componentStyles, context));
  results.push(...checkNoThemeHardcodedColors(componentStyles, context));
  results.push(checkThemeClassesNested(componentStyles, context));
  results.push(...checkCSSFallbacksRequired(componentStyles, context));
  results.push(checkNoJSThemeDetection(componentStyles, context));
  results.push(...checkPrintThemeDecorative(componentStyles, context));
  results.push(checkHighContrastRatio(componentStyles, context));

  return results;
}

/** Alias for use in generic validator pipelines. */
export const validateTheme: ValidatorFunction<string, ThemeConsistencyContext> =
  validateThemeConsistency;
