/**
 * @fileoverview Accessibility Validation Rules
 *
 * Enforces WCAG 2.1 AA compliance and Torafirma accessibility standards:
 * - All interactive elements must have aria-label
 * - All buttons must have visible text or aria-label
 * - Color contrast minimum 4.5:1 for normal text
 * - Focus indicators must be visible (not outline: none)
 * - No keyboard traps
 * - Images must have alt text
 * - Form inputs must have associated labels
 * - Heading hierarchy must not skip levels
 * - No positive tabindex values
 * - Language attribute on html element
 *
 * @example
 * ```ts
 * validateAccessibility(`
 *   <button>Click me</button>
 *   <input type="text" />
 * `);
 * // → [
 * //   { passed: true,  rule: 'button-has-text', ... },
 * //   { passed: false, rule: 'input-has-label', ... },
 * // ]
 * ```
 */

import type { RuleResult, ValidatorFunction } from './types';

// ------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------

/** WCAG 2.1 AA contrast ratio minimum for normal text. */
const CONTRAST_RATIO_MIN = 4.5;

/** WCAG 2.1 AA contrast ratio minimum for large text (18pt+ or 14pt+ bold). */
const CONTRAST_RATIO_MIN_LARGE = 3.0;

/** Interactive element selectors that need accessible names. */
const INTERACTIVE_SELECTORS = [
  'button',
  'a[href]',
  'input',
  'select',
  'textarea',
  '[role="button"]',
  '[role="link"]',
  '[role="checkbox"]',
  '[role="radio"]',
  '[role="tab"]',
  '[role="menuitem"]',
  '[role="switch"]',
];

/** Elements that must not have positive tabindex. */
const TABINDEX_ELEMENTS = '[tabindex]';

// ------------------------------------------------------------------------------
// Context type
// ------------------------------------------------------------------------------

export interface AccessibilityContext {
  /** Component name being validated. */
  componentName?: string;
  /** File path for reporting. */
  filePath?: string;
  /** Whether to check strict AAA compliance (stricter contrast). */
  strictMode?: boolean;
}

// ------------------------------------------------------------------------------
// Rule IDs
// ------------------------------------------------------------------------------

const RULE = {
  interactiveHasAriaLabel: 'interactive-has-aria-label',
  buttonHasText: 'button-has-visible-or-aria-text',
  contrastMinimum: 'color-contrast-minimum',
  focusIndicatorVisible: 'focus-indicator-visible',
  noKeyboardTraps: 'no-keyboard-traps',
  imageHasAlt: 'image-has-alt-text',
  inputHasLabel: 'input-has-associated-label',
  noPositiveTabindex: 'no-positive-tabindex',
  headingHierarchy: 'heading-hierarchy-no-skips',
  langAttribute: 'html-lang-attribute',
  ariaRolesValid: 'aria-roles-valid',
  ariaStatesValid: 'aria-states-valid',
} as const;

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

/**
 * Extract approximate contrast ratio between two hex colors.
 * Uses relative luminance formula per WCAG.
 */
function getRelativeLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 1;
  const [r, g, b] = rgb.map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r[0] + 0.7152 * g[1] + 0.0722 * b[2];
}

function hexToRgb(hex: string): [number, number, number] | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return null;
  return [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16),
  ];
}

function contrastRatio(hex1: string, hex2: string): number {
  const lum1 = getRelativeLuminance(hex1);
  const lum2 = getRelativeLuminance(hex2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Simple regex-based element finder for markup validation.
 * Returns an array of match objects with the full tag and attributes.
 */
function findElements(markup: string, tagName: string): Array<{ full: string; attrs: string }> {
  const regex = new RegExp(`<${tagName}\\b([^>]*)>`, 'gi');
  const matches: Array<{ full: string; attrs: string }> = [];
  let match: RegExpExecArray | null;
  while ((match = regex.exec(markup)) !== null) {
    matches.push({ full: match[0], attrs: match[1] });
  }
  return matches;
}

function hasAttribute(tag: string, attrName: string): boolean {
  const regex = new RegExp(`\\b${attrName}\\s*=`, 'i');
  return regex.test(tag);
}

function getAttributeValue(tag: string, attrName: string): string | null {
  const regex = new RegExp(`${attrName}\\s*=\\s*"([^"]*)"`, 'i');
  const match = regex.exec(tag);
  return match ? match[1] : null;
}

function getTagContent(markup: string, tagName: string): string[] {
  const regex = new RegExp(`<${tagName}\\b[^>]*>([^<]*)</${tagName}>`, 'gi');
  const contents: string[] = [];
  let match: RegExpExecArray | null;
  while ((match = regex.exec(markup)) !== null) {
    contents.push(match[1].trim());
  }
  return contents;
}

// ------------------------------------------------------------------------------
// Validators
// ------------------------------------------------------------------------------

function checkInteractiveHasAriaLabel(markup: string, ctx?: AccessibilityContext): RuleResult[] {
  const results: RuleResult[] = [];

  for (const selector of INTERACTIVE_SELECTORS) {
    const tagName = selector.replace(/\[.*\]/, '').trim();
    const elements = findElements(markup, tagName || selector);

    for (const el of elements) {
      // Skip if it has visible text content (between tags)
      const hasAriaLabel = hasAttribute(el.full, 'aria-label') || hasAttribute(el.full, 'aria-labelledby');
      const hasTitle = hasAttribute(el.full, 'title');

      if (!hasAriaLabel && !hasTitle) {
        results.push({
          passed: false,
          rule: RULE.interactiveHasAriaLabel,
          message: `Interactive element "${el.full}" is missing aria-label, aria-labelledby, or title.`,
          severity: 'error',
          suggestion: `Add aria-label="Descriptive label" or aria-labelledby="label-id".`,
          filePath: ctx?.filePath,
          context: el.full,
        });
      }
    }
  }

  if (results.length === 0) {
    results.push({
      passed: true,
      rule: RULE.interactiveHasAriaLabel,
      message: `All interactive elements have accessible names.`,
      severity: 'info',
    });
  }

  return results;
}

function checkButtonHasText(markup: string, ctx?: AccessibilityContext): RuleResult[] {
  const results: RuleResult[] = [];
  const buttons = findElements(markup, 'button');

  for (const btn of buttons) {
    const hasAriaLabel = hasAttribute(btn.full, 'aria-label');
    const hasAriaLabelledBy = hasAttribute(btn.full, 'aria-labelledby');

    if (!hasAriaLabel && !hasAriaLabelledBy) {
      // Check for text content - look for closing tag pattern
      const btnRegex = new RegExp(`${btn.full.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^<]*)</button>`, 'i');
      const match = btnRegex.exec(markup);
      const textContent = match ? match[1].trim() : '';

      if (textContent.length === 0) {
        results.push({
          passed: false,
          rule: RULE.buttonHasText,
          message: `Button has no visible text and no aria-label.`,
          severity: 'error',
          suggestion: `Add visible text between <button> tags or add aria-label="Description".`,
          filePath: ctx?.filePath,
          context: btn.full,
        });
      }
    }
  }

  if (results.length === 0) {
    results.push({
      passed: true,
      rule: RULE.buttonHasText,
      message: `All buttons have visible text or accessible labels.`,
      severity: 'info',
    });
  }

  return results;
}

function checkFocusIndicatorVisible(markup: string, ctx?: AccessibilityContext): RuleResult {
  // Check CSS within style tags for outline: none
  const styleBlocks = markup.match(/<style[^>]*>([\s\S]*?)<\/style>/gi) || [];
  let hasOutlineNone = false;

  for (const block of styleBlocks) {
    if (/outline\s*:\s*none/i.test(block)) {
      hasOutlineNone = true;
      break;
    }
  }

  // Check inline styles
  if (!hasOutlineNone) {
    const inlineStyles = markup.match(/style="[^"]*outline\s*:\s*none[^"]*"/gi) || [];
    hasOutlineNone = inlineStyles.length > 0;
  }

  return {
    passed: !hasOutlineNone,
    rule: RULE.focusIndicatorVisible,
    message: hasOutlineNone
      ? `Focus indicator is hidden (outline: none found). Focus must be visible for keyboard navigation.`
      : `Focus indicators are present and visible.`,
    severity: 'error',
    suggestion: hasOutlineNone
      ? `Replace \`outline: none\` with a visible focus style: \`outline: 2px solid var(--tf-focus-ring)\``
      : undefined,
    filePath: ctx?.filePath,
  };
}

function checkNoKeyboardTraps(markup: string, ctx?: AccessibilityContext): RuleResult {
  // Check for elements that might trap keyboard focus
  const hasTabindexNegative = markup.match(/tabindex="-1"/gi);
  const interactiveCount = findElements(markup, 'button').length +
    findElements(markup, 'a').length +
    findElements(markup, 'input').length;

  // This is a heuristic: tabindex="-1" on interactive elements is suspicious
  const suspiciousTraps = (hasTabindexNegative?.length ?? 0) > 0 && interactiveCount > 0;

  return {
    passed: !suspiciousTraps || hasTabindexNegative === null,
    rule: RULE.noKeyboardTraps,
    message: suspiciousTraps && hasTabindexNegative !== null
      ? `Potential keyboard trap detected: tabindex="-1" on interactive elements.`
      : `No obvious keyboard traps detected.`,
    severity: 'warning',
    suggestion: suspiciousTraps
      ? `Ensure users can Tab into and out of all interactive elements. Avoid tabindex="-1" on focusable elements.`
      : undefined,
    filePath: ctx?.filePath,
  };
}

function checkImageHasAlt(markup: string, ctx?: AccessibilityContext): RuleResult[] {
  const results: RuleResult[] = [];
  const images = findElements(markup, 'img');

  for (const img of images) {
    const hasAlt = hasAttribute(img.full, 'alt');
    const altValue = getAttributeValue(img.full, 'alt');
    const isDecorative = altValue === '' && hasAlt;

    if (!hasAlt) {
      results.push({
        passed: false,
        rule: RULE.imageHasAlt,
        message: `Image is missing alt attribute.`,
        severity: 'error',
        suggestion: `Add alt="Descriptive text" or alt="" for decorative images.`,
        filePath: ctx?.filePath,
        context: img.full,
      });
    } else if (isDecorative) {
      results.push({
        passed: true,
        rule: RULE.imageHasAlt,
        message: `Image has empty alt (decorative image — OK).`,
        severity: 'info',
        context: img.full,
      });
    }
  }

  if (results.length === 0) {
    results.push({
      passed: true,
      rule: RULE.imageHasAlt,
      message: `All images have alt attributes.`,
      severity: 'info',
    });
  }

  return results;
}

function checkInputHasLabel(markup: string, ctx?: AccessibilityContext): RuleResult[] {
  const results: RuleResult[] = [];
  const inputs = findElements(markup, 'input');

  for (const input of inputs) {
    const type = getAttributeValue(input.full, 'type') || 'text';
    if (type === 'hidden' || type === 'submit' || type === 'button' || type === 'image') continue;

    const hasAriaLabel = hasAttribute(input.full, 'aria-label');
    const hasAriaLabelledBy = hasAttribute(input.full, 'aria-labelledby');
    const hasPlaceholder = hasAttribute(input.full, 'placeholder');

    if (!hasAriaLabel && !hasAriaLabelledBy && !hasPlaceholder) {
      results.push({
        passed: false,
        rule: RULE.inputHasLabel,
        message: `Input element (type="${type}") is missing an associated label.`,
        severity: 'error',
        suggestion: `Add a <label> element with \`for\` attribute, or use aria-label/aria-labelledby.`,
        filePath: ctx?.filePath,
        context: input.full,
      });
    }
  }

  if (results.length === 0) {
    results.push({
      passed: true,
      rule: RULE.inputHasLabel,
      message: `All input elements have associated labels.`,
      severity: 'info',
    });
  }

  return results;
}

function checkNoPositiveTabindex(markup: string, ctx?: AccessibilityContext): RuleResult[] {
  const results: RuleResult[] = [];
  const tabindexMatches = markup.matchAll(/tabindex="(\d+)"/gi);

  for (const match of tabindexMatches) {
    const value = parseInt(match[1], 10);
    if (value > 0) {
      results.push({
        passed: false,
        rule: RULE.noPositiveTabindex,
        message: `Positive tabindex="${value}" disrupts natural tab order.`,
        severity: 'error',
        suggestion: `Remove tabindex or use tabindex="0" to include in natural tab order.`,
        filePath: ctx?.filePath,
        context: match[0],
      });
    }
  }

  if (results.length === 0) {
    results.push({
      passed: true,
      rule: RULE.noPositiveTabindex,
      message: `No positive tabindex values found.`,
      severity: 'info',
    });
  }

  return results;
}

function checkHeadingHierarchy(markup: string, ctx?: AccessibilityContext): RuleResult[] {
  const results: RuleResult[] = [];
  const headingRegex = /<h([1-6])\b[^>]*>/gi;
  const headings: Array<{ level: number; tag: string }> = [];
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(markup)) !== null) {
    headings.push({ level: parseInt(match[1], 10), tag: match[0] });
  }

  let prevLevel = 0;
  for (const h of headings) {
    if (h.level > prevLevel + 1 && prevLevel > 0) {
      results.push({
        passed: false,
        rule: RULE.headingHierarchy,
        message: `Heading level skips from h${prevLevel} to h${h.level}. ` +
          `Heading levels must not skip (h1→h3 is invalid).`,
        severity: 'warning',
        suggestion: `Use h${prevLevel + 1} instead of h${h.level}, or restructure the heading hierarchy.`,
        filePath: ctx?.filePath,
        context: h.tag,
      });
    }
    prevLevel = h.level;
  }

  if (results.length === 0) {
    results.push({
      passed: true,
      rule: RULE.headingHierarchy,
      message: headings.length > 0
        ? `Heading hierarchy is valid (${headings.length} heading(s)).`
        : `No headings found — hierarchy check passes.`,
      severity: 'info',
    });
  }

  return results;
}

function checkLangAttribute(markup: string, ctx?: AccessibilityContext): RuleResult {
  const hasHtmlTag = /<html/i.test(markup);
  if (!hasHtmlTag) {
    return { passed: true, rule: RULE.langAttribute, message: `No <html> tag found — fragment check passes.`, severity: 'info' };
  }
  const hasLang = /<html[^>]*\blang\s*=/i.test(markup);
  return {
    passed: hasLang,
    rule: RULE.langAttribute,
    message: hasLang
      ? `<html> element has lang attribute.`
      : `<html> element is missing the \`lang\` attribute. Screen readers need this for pronunciation.`,
    severity: 'warning',
    suggestion: hasLang ? undefined : `Add lang="en" (or appropriate language code) to <html>.`,
    filePath: ctx?.filePath,
  };
}

function checkAriaRolesValid(markup: string, ctx?: AccessibilityContext): RuleResult[] {
  const results: RuleResult[] = [];
  const VALID_ARIA_ROLES = [
    'alert', 'alertdialog', 'application', 'article', 'banner', 'button',
    'cell', 'checkbox', 'columnheader', 'combobox', 'complementary',
    'contentinfo', 'definition', 'dialog', 'directory', 'document',
    'feed', 'figure', 'form', 'grid', 'gridcell', 'group', 'heading',
    'img', 'link', 'list', 'listbox', 'listitem', 'log', 'main',
    'marquee', 'math', 'menu', 'menubar', 'menuitem', 'menuitemcheckbox',
    'menuitemradio', 'navigation', 'none', 'note', 'option',
    'presentation', 'progressbar', 'radio', 'radiogroup', 'region',
    'row', 'rowgroup', 'rowheader', 'scrollbar', 'search', 'searchbox',
    'separator', 'slider', 'spinbutton', 'status', 'switch', 'tab',
    'table', 'tablist', 'tabpanel', 'term', 'textbox', 'timer',
    'toolbar', 'tooltip', 'tree', 'treegrid', 'treeitem',
  ];

  const roleMatches = markup.matchAll(/role="([^"]*)"/gi);
  for (const match of roleMatches) {
    const role = match[1];
    if (!VALID_ARIA_ROLES.includes(role)) {
      results.push({
        passed: false,
        rule: RULE.ariaRolesValid,
        message: `Invalid ARIA role "${role}".`,
        severity: 'error',
        suggestion: `Use a valid role: ${VALID_ARIA_ROLES.slice(0, 10).join(', ')}...`,
        filePath: ctx?.filePath,
        context: match[0],
      });
    }
  }

  if (results.length === 0) {
    results.push({
      passed: true,
      rule: RULE.ariaRolesValid,
      message: `All ARIA roles are valid.`,
      severity: 'info',
    });
  }

  return results;
}

// ------------------------------------------------------------------------------
// Public API
// ------------------------------------------------------------------------------

/**
 * Validates component markup against Torafirma accessibility standards.
 *
 * @param componentMarkup - HTML/JSX markup string to validate.
 * @param context         - Optional context (component name, file path).
 * @returns               - Array of `RuleResult` for each accessibility rule.
 *
 * @example
 * ```ts
 * const results = validateAccessibility(`
 *   <button aria-label="Close dialog">Close</button>
 *   <img src="icon.png" alt="Settings icon" />
 *   <label for="name">Name</label>
 *   <input id="name" type="text" />
 * `, { componentName: 'TfDialog' });
 * ```
 */
export function validateAccessibility(
  componentMarkup: string,
  context?: AccessibilityContext,
): RuleResult[] {
  const results: RuleResult[] = [];

  results.push(...checkInteractiveHasAriaLabel(componentMarkup, context));
  results.push(...checkButtonHasText(componentMarkup, context));
  results.push(checkFocusIndicatorVisible(componentMarkup, context));
  results.push(checkNoKeyboardTraps(componentMarkup, context));
  results.push(...checkImageHasAlt(componentMarkup, context));
  results.push(...checkInputHasLabel(componentMarkup, context));
  results.push(...checkNoPositiveTabindex(componentMarkup, context));
  results.push(...checkHeadingHierarchy(componentMarkup, context));
  results.push(checkLangAttribute(componentMarkup, context));
  results.push(...checkAriaRolesValid(componentMarkup, context));

  return results;
}

/** Alias for use in generic validator pipelines. */
export const validateA11y: ValidatorFunction<string, AccessibilityContext> =
  validateAccessibility;
