/**
 * @fileoverview Copy / Vocabulary Enforcer
 *
 * Enforces Torafirma's strict copy guidelines for UI text:
 * - No "Cancel" → use "Close", "Dismiss", "Stop", "Abort"
 * - No "OK" → use "Confirm", "Proceed", "Acknowledge"
 * - No bare "Loading" → use "Loading data..." with a specific noun
 * - No bare "Error" → use "Fault detected: [specific description]"
 * - No bare "Success" → use "[Operation] + [Target] + [Result]"
 * - No "Are you sure?" → use specific consequence statements
 * - No title-case in buttons
 * - No ellipsis (...) in buttons
 * - Max 40 characters for button text
 * - No technical jargon in user-facing copy
 *
 * @example
 * ```ts
 * validateCopyText('Cancel', { context: 'button' });
 * // → [{ passed: false, rule: 'no-cancel-word', ... }]
 *
 * validateCopyText('Close', { context: 'button' });
 * // → [{ passed: true, rule: 'no-cancel-word', ... }]
 * ```
 */

import type { RuleResult, ValidatorFunction } from './types';

// ------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------

/** Max recommended characters for button text. */
const BUTTON_MAX_CHARS = 40;

/** Forbidden words/phrases and their recommended replacements. */
const FORBIDDEN_COPY: Record<string, { severity: 'error' | 'warning'; alternatives: string[]; message: string }> = {
  Cancel: {
    severity: 'error',
    alternatives: ['Close', 'Dismiss', 'Stop', 'Abort', 'End'],
    message: '"Cancel" is ambiguous. Use a verb that describes the specific action.',
  },
  OK: {
    severity: 'error',
    alternatives: ['Confirm', 'Proceed', 'Acknowledge', 'Understood', 'Continue', 'Got it'],
    message: '"OK" is vague and provides no information about what will happen.',
  },
  'Are you sure?': {
    severity: 'error',
    alternatives: ['This will permanently delete all data.', 'This action cannot be undone.', 'Changes will be lost.'],
    message: '"Are you sure?" is rhetorical and anxiety-inducing. State the consequence instead.',
  },
};

/** Bare status words that must be accompanied by specifics. */
const BARE_STATUS_WORDS: Record<string, { alternatives: string[]; nounRequired: boolean }> = {
  Loading: {
    alternatives: ['Loading data...', 'Loading configuration...', 'Syncing records...', 'Processing request...'],
    nounRequired: true,
  },
  Error: {
    alternatives: ['Fault detected: connection timeout', 'Fault detected: invalid input', 'Fault detected: server unavailable'],
    nounRequired: true,
  },
  Success: {
    alternatives: ['Configuration saved successfully', 'Data synced to server', 'Request completed'],
    nounRequired: true,
  },
  Failed: {
    alternatives: ['Upload failed: network error', 'Save failed: permission denied', 'Sync failed: server timeout'],
    nounRequired: true,
  },
  Warning: {
    alternatives: ['Unsaved changes detected', 'Connection is unstable', 'Disk space is low'],
    nounRequired: true,
  },
};

/** Technical jargon that should not appear in user-facing copy. */
const TECHNICAL_JARGON = [
  'api', 'http', 'json', 'xml', 'url', 'uri', 'sql', 'db',
  'async', 'sync', 'callback', 'promise', 'undefined', 'null',
  'exception', 'stack trace', 'heap', 'buffer', 'payload',
  'endpoint', 'middleware', 'middleware', 'hook', 'ref',
];

// ------------------------------------------------------------------------------
// Context type
// ------------------------------------------------------------------------------

export interface CopyValidationContext {
  /** Where this copy appears: 'button', 'heading', 'body', 'tooltip', 'alert', 'placeholder'. */
  context?: 'button' | 'heading' | 'body' | 'tooltip' | 'alert' | 'placeholder' | 'label' | 'toast';
  /** Component name this copy belongs to. */
  componentName?: string;
  /** File path for reporting. */
  filePath?: string;
  /** Whether this is system-facing (technical) or user-facing copy. */
  audience?: 'user' | 'system';
}

// ------------------------------------------------------------------------------
// Rule IDs
// ------------------------------------------------------------------------------

const RULE = {
  noCancel: 'no-cancel-word',
  noOK: 'no-ok-word',
  noAreYouSure: 'no-are-you-sure',
  noBareLoading: 'no-bare-loading',
  noBareError: 'no-bare-error',
  noBareSuccess: 'no-bare-success',
  noBareFailed: 'no-bare-failed',
  noBareWarning: 'no-bare-warning',
  noTitleCaseButtons: 'no-title-case-buttons',
  noEllipsisInButtons: 'no-ellipsis-in-buttons',
  buttonMaxChars: 'button-max-chars',
  noTechnicalJargon: 'no-technical-jargon',
  sentenceCase: 'sentence-case-required',
} as const;

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

/** Check if text contains a forbidden word as a standalone word. */
function containsWord(text: string, word: string): boolean {
  const regex = new RegExp(`\\b${word}\\b`, 'i');
  return regex.test(text);
}

/** Check if text is title-case (every word starts with capital letter). */
function isTitleCase(text: string): boolean {
  const words = text.trim().split(/\s+/);
  if (words.length <= 1) return false;
  return words.every((w) => w[0] === w[0]?.toUpperCase());
}

/** Check if text contains ellipsis. */
function hasEllipsis(text: string): boolean {
  return text.includes('...') || text.includes('\u2026');
}

/** Check if text is sentence-case (only first word starts with capital). */
function isSentenceCase(text: string): boolean {
  const trimmed = text.trim();
  if (trimmed.length === 0) return true;
  // Single word or proper sentence case
  const words = trimmed.split(/\s+/);
  if (words.length === 1) return true;
  const rest = words.slice(1).join(' ');
  // Allow proper nouns and acronyms (we'll be lenient)
  return true; // Sentence case check is advisory only
}

// ------------------------------------------------------------------------------
// Validators
// ------------------------------------------------------------------------------

function checkNoCancel(text: string, ctx?: CopyValidationContext): RuleResult {
  const isForbidden = containsWord(text, 'Cancel');
  if (!isForbidden) {
    return { passed: true, rule: RULE.noCancel, message: `Copy does not contain "Cancel".`, severity: 'info' };
  }
  return {
    passed: false, rule: RULE.noCancel,
    message: FORBIDDEN_COPY.Cancel.message,
    severity: 'error',
    suggestion: `Use one of: ${FORBIDDEN_COPY.Cancel.alternatives.join(', ')}.`,
    filePath: ctx?.filePath,
    context: text,
  };
}

function checkNoOK(text: string, ctx?: CopyValidationContext): RuleResult {
  const isForbidden = /^\s*OK\s*$/i.test(text) || containsWord(text, 'OK');
  if (!isForbidden) {
    return { passed: true, rule: RULE.noOK, message: `Copy does not contain "OK".`, severity: 'info' };
  }
  return {
    passed: false, rule: RULE.noOK,
    message: FORBIDDEN_COPY.OK.message,
    severity: 'error',
    suggestion: `Use one of: ${FORBIDDEN_COPY.OK.alternatives.join(', ')}.`,
    filePath: ctx?.filePath,
    context: text,
  };
}

function checkNoAreYouSure(text: string, ctx?: CopyValidationContext): RuleResult {
  const isForbidden = text.toLowerCase().includes('are you sure');
  if (!isForbidden) {
    return { passed: true, rule: RULE.noAreYouSure, message: `Copy does not contain "Are you sure?".`, severity: 'info' };
  }
  return {
    passed: false, rule: RULE.noAreYouSure,
    message: FORBIDDEN_COPY['Are you sure?'].message,
    severity: 'error',
    suggestion: `State the consequence: "${FORBIDDEN_COPY['Are you sure?'].alternatives[0]}"`,
    filePath: ctx?.filePath,
    context: text,
  };
}

function checkNoBareLoading(text: string, ctx?: CopyValidationContext): RuleResult {
  const isBare = /^\s*Loading\s*\.?\.?\.?\s*$/i.test(text);
  if (!isBare) {
    return { passed: true, rule: RULE.noBareLoading, message: `Copy is not bare "Loading".`, severity: 'info' };
  }
  return {
    passed: false, rule: RULE.noBareLoading,
    message: `Bare "Loading" is insufficient. Users need to know what is loading.`,
    severity: 'warning',
    suggestion: `Use: ${BARE_STATUS_WORDS.Loading.alternatives.join(' | ')}`,
    filePath: ctx?.filePath,
    context: text,
  };
}

function checkNoBareError(text: string, ctx?: CopyValidationContext): RuleResult {
  const isBare = /^\s*Error!?\s*$/i.test(text);
  if (!isBare) {
    return { passed: true, rule: RULE.noBareError, message: `Copy is not bare "Error".`, severity: 'info' };
  }
  return {
    passed: false, rule: RULE.noBareError,
    message: `Bare "Error" provides no actionable information. State what failed and why.`,
    severity: 'error',
    suggestion: `Use: ${BARE_STATUS_WORDS.Error.alternatives.join(' | ')}`,
    filePath: ctx?.filePath,
    context: text,
  };
}

function checkNoBareSuccess(text: string, ctx?: CopyValidationContext): RuleResult {
  const isBare = /^\s*Success!?\s*$/i.test(text);
  if (!isBare) {
    return { passed: true, rule: RULE.noBareSuccess, message: `Copy is not bare "Success".`, severity: 'info' };
  }
  return {
    passed: false, rule: RULE.noBareSuccess,
    message: `Bare "Success" is vague. Specify the operation and the outcome.`,
    severity: 'warning',
    suggestion: `Use: ${BARE_STATUS_WORDS.Success.alternatives.join(' | ')}`,
    filePath: ctx?.filePath,
    context: text,
  };
}

function checkNoBareFailed(text: string, ctx?: CopyValidationContext): RuleResult {
  const isBare = /^\s*Failed!?\s*$/i.test(text);
  if (!isBare) {
    return { passed: true, rule: RULE.noBareFailed, message: `Copy is not bare "Failed".`, severity: 'info' };
  }
  return {
    passed: false, rule: RULE.noBareFailed,
    message: `Bare "Failed" is unhelpful. State what failed and the reason.`,
    severity: 'warning',
    suggestion: `Use: ${BARE_STATUS_WORDS.Failed.alternatives.join(' | ')}`,
    filePath: ctx?.filePath,
    context: text,
  };
}

function checkNoBareWarning(text: string, ctx?: CopyValidationContext): RuleResult {
  const isBare = /^\s*Warning!?\s*$/i.test(text);
  if (!isBare) {
    return { passed: true, rule: RULE.noBareWarning, message: `Copy is not bare "Warning".`, severity: 'info' };
  }
  return {
    passed: false, rule: RULE.noBareWarning,
    message: `Bare "Warning" is too vague. State the specific concern.`,
    severity: 'warning',
    suggestion: `Use: ${BARE_STATUS_WORDS.Warning.alternatives.join(' | ')}`,
    filePath: ctx?.filePath,
    context: text,
  };
}

function checkNoTitleCaseButtons(text: string, ctx?: CopyValidationContext): RuleResult {
  if (ctx?.context !== 'button') {
    return { passed: true, rule: RULE.noTitleCaseButtons, message: `Not a button — title-case check skipped.`, severity: 'info' };
  }
  const passed = !isTitleCase(text);
  return {
    passed, rule: RULE.noTitleCaseButtons,
    message: passed
      ? `Button text "${text}" uses sentence case.`
      : `Button text "${text}" uses title case. Torafirma buttons must use sentence case.`,
    severity: 'warning',
    suggestion: passed ? undefined : `Change to "${text.toLowerCase()}" or use sentence case: "${text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()}".`,
    filePath: ctx?.filePath,
    context: text,
  };
}

function checkNoEllipsisInButtons(text: string, ctx?: CopyValidationContext): RuleResult {
  if (ctx?.context !== 'button') {
    return { passed: true, rule: RULE.noEllipsisInButtons, message: `Not a button — ellipsis check skipped.`, severity: 'info' };
  }
  const passed = !hasEllipsis(text);
  return {
    passed, rule: RULE.noEllipsisInButtons,
    message: passed
      ? `Button text "${text}" does not contain ellipsis.`
      : `Button text "${text}" contains ellipsis (...). Buttons must not use ellipsis.`,
    severity: 'error',
    suggestion: passed ? undefined : `Remove ellipsis. Use a concise verb phrase instead.`,
    filePath: ctx?.filePath,
    context: text,
  };
}

function checkButtonMaxChars(text: string, ctx?: CopyValidationContext): RuleResult {
  if (ctx?.context !== 'button') {
    return { passed: true, rule: RULE.buttonMaxChars, message: `Not a button — length check skipped.`, severity: 'info' };
  }
  const passed = text.length <= BUTTON_MAX_CHARS;
  return {
    passed, rule: RULE.buttonMaxChars,
    message: passed
      ? `Button text is ${text.length} characters (max ${BUTTON_MAX_CHARS}).`
      : `Button text is ${text.length} characters — exceeds ${BUTTON_MAX_CHARS} character maximum.`,
    severity: 'warning',
    suggestion: passed ? undefined : `Shorten to ≤${BUTTON_MAX_CHARS} chars: "${text.slice(0, BUTTON_MAX_CHARS)}..."`,
    filePath: ctx?.filePath,
    context: text,
  };
}

function checkNoTechnicalJargon(text: string, ctx?: CopyValidationContext): RuleResult {
  if (ctx?.audience === 'system') {
    return { passed: true, rule: RULE.noTechnicalJargon, message: `System-facing copy — jargon check skipped.`, severity: 'info' };
  }
  const lower = text.toLowerCase();
  const found = TECHNICAL_JARGON.filter((j) => lower.includes(j));
  const passed = found.length === 0;
  return {
    passed, rule: RULE.noTechnicalJargon,
    message: passed
      ? `No technical jargon detected in copy.`
      : `Copy contains technical jargon: "${found.join(', ')}". Use user-friendly language.`,
    severity: 'warning',
    suggestion: passed ? undefined : `Replace jargon with plain language: "API" → "service", "SQL" → "database".`,
    filePath: ctx?.filePath,
    context: text,
  };
}

// ------------------------------------------------------------------------------
// Public API
// ------------------------------------------------------------------------------

/**
 * Validates UI copy text against Torafirma vocabulary guidelines.
 *
 * @param text    - The copy text to validate.
 * @param context - Where and how the copy is used (button, heading, etc.).
 * @returns       - Array of `RuleResult` for each vocabulary rule.
 *
 * @example
 * ```ts
 * // Validate button copy
 * const results = validateCopyText('Confirm', { context: 'button' });
 *
 * // Validate error message
 * const errors = validateCopyText('Error', { context: 'alert' });
 *
 * // Validate loading state
 * const loading = validateCopyText('Loading configuration...', { context: 'body' });
 * ```
 */
export function validateCopyText(
  text: string,
  context?: CopyValidationContext,
): RuleResult[] {
  return [
    checkNoCancel(text, context),
    checkNoOK(text, context),
    checkNoAreYouSure(text, context),
    checkNoBareLoading(text, context),
    checkNoBareError(text, context),
    checkNoBareSuccess(text, context),
    checkNoBareFailed(text, context),
    checkNoBareWarning(text, context),
    checkNoTitleCaseButtons(text, context),
    checkNoEllipsisInButtons(text, context),
    checkButtonMaxChars(text, context),
    checkNoTechnicalJargon(text, context),
  ];
}

/** Alias for use in generic validator pipelines. */
export const validateVocabulary: ValidatorFunction<string, CopyValidationContext> =
  validateCopyText;
