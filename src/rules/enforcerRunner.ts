/**
 * @fileoverview Main Enforcer Runner
 *
 * Orchestrates all design-rule enforcers against a codebase:
 * - Runs all enabled rules from a rule set against input files
 * - Aggregates results by severity (error, warning, info, fatal)
 * - Generates a structured `EnforcerReport`
 * - Supports filtering by rule set and severity
 * - Provides summary counts and per-file breakdowns
 *
 * @example
 * ```ts
 * const report = runEnforcers(
 *   [{ path: 'src/Button.tsx', content: buttonSource }],
 *   'accessibility',
 * );
 * console.log(report.summary);
 * // → { error: 2, warning: 1, info: 5, fatal: 0 }
 * ```
 */

import type {
  EnforcerInput,
  EnforcerReport,
  RuleRegistry,
  RuleResult,
  RuleSet,
  Severity,
} from './types';

// ------------------------------------------------------------------------------
// Default Imports (all validators)
// ------------------------------------------------------------------------------

import { validateComponentName } from './componentNamingRules';
import { validateCSSTokens } from './cssTokenRules';
import { validateAuthorityRequirements } from './authorityRequirementRules';
import { validateSemanticVariant } from './semanticVariantRules';
import { validateStateTransitions } from './stateTransitionRules';
import { validateCopyText } from './copyVocabularyRules';
import { validateAccessibility } from './accessibilityRules';
import { validateTraceability } from './traceabilityRules';
import { validateThemeConsistency } from './themeConsistencyRules';
import { validateImports } from './importRules';
import { validateProps } from './propValidationRules';
import { validateDensity } from './densityRules';

// ------------------------------------------------------------------------------
// Built-in Rule Sets
// ------------------------------------------------------------------------------

const BUILT_IN_RULE_SETS: RuleSet[] = [
  {
    name: 'naming',
    description: 'Component naming convention rules',
    rules: [
      'component-name-capitalization',
      'css-class-prefix',
      'no-decorative-color-names',
      'family-naming-consistency',
      'no-generic-component-names',
      'component-name-suffix-pattern',
    ],
    severity: 'error',
    enabledByDefault: true,
  },
  {
    name: 'css-tokens',
    description: 'CSS design token usage rules',
    rules: [
      'no-hardcoded-colors',
      'no-hardcoded-hex-values',
      'spacing-token-usage',
      'typography-token-usage',
      'radius-token-usage',
      'shadow-token-usage',
      'css-variable-fallback-required',
    ],
    severity: 'error',
    enabledByDefault: true,
  },
  {
    name: 'authority',
    description: 'Authority requirement and gating rules',
    rules: [
      'required-authority-present',
      'valid-authority-level',
      'no-ungated-commands',
      'override-minimum-authority',
      'destructive-minimum-authority',
      'trace-id-required',
      'authority-escalation-logged',
      'authority-guard-present',
      'consistent-authority-within-module',
    ],
    severity: 'error',
    enabledByDefault: true,
  },
  {
    name: 'semantic-variants',
    description: 'Semantic variant validation rules',
    rules: [
      'canonical-variant-only',
      'no-decorative-variants',
      'variant-color-mapping',
      'danger-not-dc2626',
      'run-color-mapping',
    ],
    severity: 'error',
    enabledByDefault: true,
  },
  {
    name: 'state-transitions',
    description: 'State machine transition rules',
    rules: [
      'initial-state-defined',
      'initial-state-valid',
      'no-unreachable-states',
      'terminal-state-no-outgoing',
      'all-transitions-defined',
      'no-transitions-to-undefined',
      'no-duplicate-transitions',
      'machine-has-states',
    ],
    severity: 'error',
    enabledByDefault: true,
  },
  {
    name: 'copy-vocabulary',
    description: 'Copy and vocabulary enforcer rules',
    rules: [
      'no-cancel-word',
      'no-ok-word',
      'no-are-you-sure',
      'no-bare-loading',
      'no-bare-error',
      'no-bare-success',
      'no-bare-failed',
      'no-bare-warning',
      'no-title-case-buttons',
      'no-ellipsis-in-buttons',
      'button-max-chars',
      'no-technical-jargon',
      'sentence-case-required',
    ],
    severity: 'warning',
    enabledByDefault: true,
  },
  {
    name: 'accessibility',
    description: 'WCAG and accessibility validation rules',
    rules: [
      'interactive-has-aria-label',
      'button-has-visible-or-aria-text',
      'color-contrast-minimum',
      'focus-indicator-visible',
      'no-keyboard-traps',
      'image-has-alt-text',
      'input-has-associated-label',
      'no-positive-tabindex',
      'heading-hierarchy-no-skips',
      'html-lang-attribute',
      'aria-roles-valid',
    ],
    severity: 'error',
    enabledByDefault: true,
  },
  {
    name: 'traceability',
    description: 'Trace and audit requirement rules',
    rules: [
      'command-has-trace-id',
      'authority-escalation-logged',
      'destructive-action-audit-trail',
      'state-transition-traceable',
      'event-has-timestamp',
      'event-has-valid-authority',
      'no-duplicate-trace-ids',
      'events-chronologically-ordered',
      'event-type-valid',
      'trace-id-format-valid',
    ],
    severity: 'error',
    enabledByDefault: true,
  },
  {
    name: 'theme-consistency',
    description: 'Theme consistency validation rules',
    rules: [
      'all-themes-supported',
      'no-theme-hardcoded-colors',
      'theme-classes-properly-nested',
      'css-variable-fallbacks-required',
      'no-js-theme-detection',
      'print-theme-hides-decorative',
      'high-contrast-minimum-ratio',
    ],
    severity: 'warning',
    enabledByDefault: true,
  },
  {
    name: 'imports',
    description: 'Import/export validation rules',
    rules: [
      'barrel-import-preferred',
      'no-unrelated-family-imports',
      'types-from-central-imports',
      'max-directory-depth',
      'no-internal-file-imports',
      'type-only-import-for-types',
    ],
    severity: 'warning',
    enabledByDefault: true,
  },
  {
    name: 'props',
    description: 'Component props validation rules',
    rules: [
      'id-prop-required',
      'trace-id-for-authority',
      'form-field-label-required',
      'callbacks-must-be-optional',
      'no-excessive-prop-drilling',
      'max-props-count',
      'no-any-type-in-props',
      'event-handler-naming-convention',
      'boolean-prop-naming-convention',
    ],
    severity: 'error',
    enabledByDefault: true,
  },
  {
    name: 'density',
    description: 'Density convention checking rules',
    rules: [
      'valid-density-value',
      'compact-padding-range',
      'standard-padding-range',
      'field-padding-range',
      'no-mixed-densities',
      'density-prop-explicit',
      'density-usage-appropriate',
      'density-consistent-with-siblings',
    ],
    severity: 'warning',
    enabledByDefault: true,
  },
];

// ------------------------------------------------------------------------------
// Runner Options
// ------------------------------------------------------------------------------

export interface EnforcerRunnerOptions {
  /** Which rule set(s) to run. If empty, runs all enabled sets. */
  ruleSets?: string[];
  /** Minimum severity to include in results. */
  minSeverity?: 'info' | 'warning' | 'error' | 'fatal';
  /** Fail fast: stop on first fatal error. */
  failFast?: boolean;
  /** Maximum results per file (0 = unlimited). */
  maxResultsPerFile?: number;
  /** Include passed checks in the report. */
  includePassed?: boolean;
}

// ------------------------------------------------------------------------------
// Severity Ranking
// ------------------------------------------------------------------------------

const SEVERITY_RANK: Record<Severity, number> = {
  info: 0,
  warning: 1,
  error: 2,
  fatal: 3,
};

function meetsMinSeverity(resultSeverity: Severity, minSeverity: 'info' | 'warning' | 'error' | 'fatal'): boolean {
  return SEVERITY_RANK[resultSeverity] >= SEVERITY_RANK[minSeverity];
}

// ------------------------------------------------------------------------------
// File Analysis (heuristic dispatch)
// ------------------------------------------------------------------------------

/**
 * Analyze a single file and run appropriate validators based on file type.
 */
function analyzeFile(file: EnforcerInput, options: EnforcerRunnerOptions): RuleResult[] {
  const results: RuleResult[] = [];
  const content = file.content;
  const path = file.path;

  // Determine file type from extension
  const isCSS = path.endsWith('.css') || path.endsWith('.scss') || path.endsWith('.less');
  const isTSX = path.endsWith('.tsx') || path.endsWith('.ts') || path.endsWith('.jsx') || path.endsWith('.js');
  const isMarkup = path.endsWith('.html') || path.endsWith('.htm');

  // CSS token validation for stylesheet files
  if (isCSS) {
    results.push(
      ...validateCSSTokens(content, { filePath: path }),
    );
  }

  // Import validation for TS/JS files
  if (isTSX) {
    results.push(
      ...validateImports(content, { filePath: path }),
    );
  }

  // Component naming checks for TSX files
  if (isTSX) {
    const classMatches = content.match(/(?:class|className)\s*[=:]\s*["']([^"']+)["']/g);
    if (classMatches) {
      for (const match of classMatches) {
        const className = match.replace(/.*["']([^"']+)["'].*/, '$1');
        const classes = className.split(/\s+/);
        for (const cls of classes) {
          if (cls.startsWith('tf-')) {
            results.push(
              ...validateComponentName(cls, { isCSSClass: true, filePath: path }),
            );
          }
        }
      }
    }
  }

  // Accessibility for markup
  if (isMarkup) {
    results.push(
      ...validateAccessibility(content, { filePath: path }),
    );
  }

  // Theme consistency for CSS
  if (isCSS) {
    results.push(
      ...validateThemeConsistency(content, { filePath: path }),
    );
  }

  // Filter by severity
  const minSev = options.minSeverity || 'info';
  return results.filter((r) => meetsMinSeverity(r.severity, minSev));
}

// ------------------------------------------------------------------------------
// Report Generation
// ------------------------------------------------------------------------------

/**
 * Aggregate individual results into a structured report.
 */
function generateReport(
  files: EnforcerInput[],
  results: RuleResult[],
  ruleSets: RuleSet[],
): EnforcerReport {
  const summary: Record<Severity, number> = { info: 0, warning: 0, error: 0, fatal: 0 };
  const byRuleSet: Record<string, { passed: number; failed: number }> = {};

  // Initialize byRuleSet
  for (const rs of ruleSets) {
    byRuleSet[rs.name] = { passed: 0, failed: 0 };
  }

  for (const r of results) {
    summary[r.severity] = (summary[r.severity] || 0) + 1;

    // Categorize by rule set
    for (const rs of ruleSets) {
      if (rs.rules.includes(r.rule)) {
        if (r.passed) {
          byRuleSet[rs.name].passed++;
        } else {
          byRuleSet[rs.name].failed++;
        }
        break;
      }
    }
  }

  const hasErrors = summary.error > 0 || summary.fatal > 0;

  return {
    timestamp: new Date().toISOString(),
    totalFiles: files.length,
    totalRules: results.length,
    results,
    summary,
    byRuleSet,
    hasErrors,
  };
}

// ------------------------------------------------------------------------------
// Public API
// ------------------------------------------------------------------------------

/**
 * Runs all design-rule enforcers against a set of files.
 *
 * @param files   - Array of file inputs (path + content) to validate.
 * @param ruleSet - Name of the rule set to run, or 'all' for all sets.
 * @param options - Optional configuration for the runner.
 * @returns       - A structured `EnforcerReport` with aggregated results.
 *
 * @example
 * ```ts
 * const report = runEnforcers(
 *   [
 *     { path: 'src/components/TfButton.tsx', content: buttonSrc },
 *     { path: 'src/components/TfButton.css', content: buttonCss },
 *   ],
 *   'all',
 *   { includePassed: false, minSeverity: 'warning' },
 * );
 *
 * if (report.hasErrors) {
 *   console.error(`${report.summary.error} error(s) found`);
 *   process.exit(1);
 * }
 * ```
 */
export function runEnforcers(
  files: EnforcerInput[],
  ruleSet: string | 'all' = 'all',
  options: EnforcerRunnerOptions = {},
): EnforcerReport {
  const allResults: RuleResult[] = [];

  // Determine which rule sets to run
  let activeRuleSets: RuleSet[];
  if (ruleSet === 'all') {
    activeRuleSets = BUILT_IN_RULE_SETS.filter((rs) => rs.enabledByDefault);
  } else {
    activeRuleSets = BUILT_IN_RULE_SETS.filter(
      (rs) => rs.name === ruleSet || (options.ruleSets?.includes(rs.name)),
    );
  }

  if (activeRuleSets.length === 0) {
    return {
      timestamp: new Date().toISOString(),
      totalFiles: files.length,
      totalRules: 0,
      results: [{
        passed: false,
        rule: 'runner',
        message: `No rule set found matching "${ruleSet}".`,
        severity: 'fatal',
        suggestion: `Available rule sets: ${BUILT_IN_RULE_SETS.map((rs) => rs.name).join(', ')}`,
      }],
      summary: { info: 0, warning: 0, error: 0, fatal: 1 },
      byRuleSet: {},
      hasErrors: true,
    };
  }

  // Run analysis on each file
  for (const file of files) {
    const fileResults = analyzeFile(file, options);

    // Attach file path to results that don't have one
    for (const r of fileResults) {
      if (!r.filePath) r.filePath = file.path;
    }

    allResults.push(...fileResults);

    // Fail fast check
    if (options.failFast && fileResults.some((r) => r.severity === 'fatal' && !r.passed)) {
      break;
    }
  }

  // Filter out passed results if not including them
  const filteredResults = options.includePassed !== false
    ? allResults
    : allResults.filter((r) => !r.passed);

  return generateReport(files, filteredResults, activeRuleSets);
}

// Re-export built-in rule sets for reference
export { BUILT_IN_RULE_SETS };
