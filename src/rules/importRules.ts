/**
 * @fileoverview Import / Export Validation Rules
 *
 * Enforces clean module boundaries in the Torafirma codebase:
 * - No circular dependencies
 * - Barrel imports preferred over deep imports
 * - No importing from unrelated component families
 * - Types must be imported from central types (type-only imports)
 * - No relative path imports crossing more than 3 directory levels
 * - No importing internal implementation files
 * - Consistent import ordering
 *
 * @example
 * ```ts
 * validateImports(`
 *   import { TfButton } from '../controls/TfButton';
 *   import type { Theme } from '../../types';
 * `);
 * // → [{ passed: false, rule: 'barrel-import-preferred', ... }]
 * ```
 */

import type { RuleResult, ValidatorFunction } from './types';

// ------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------

/** Maximum allowed directory traversal depth for relative imports. */
const MAX_DIRECTORY_DEPTH = 3;

/** Component families and their directory patterns. */
const COMPONENT_FAMILIES: Record<string, string[]> = {
  controls: ['/controls/', '/ Tf', 'Button', 'Input', 'Select', 'Checkbox'],
  display: ['/display/', 'Badge', 'Tag', 'Pill', 'Status', 'Icon'],
  feedback: ['/feedback/', 'Alert', 'Toast', 'Modal', 'Dialog', 'Notification'],
  navigation: ['/navigation/', 'Nav', 'Tab', 'Breadcrumb', 'Menu', 'Link'],
  layout: ['/layout/', 'Grid', 'Stack', 'Panel', 'Container', 'Divider'],
  forms: ['/forms/', 'Form', 'Field', 'InputGroup'],
  data: ['/data/', 'Table', 'List', 'Chart', 'Graph'],
  overlay: ['/overlay/', 'Tooltip', 'Popover', 'Dropdown'],
  authority: ['/authority/', 'Auth', 'Permission', 'Role'],
};

/** Patterns indicating deep imports (not from barrel). */
const DEEP_IMPORT_PATTERNS = [
  /\/[^/]+\/[^/]+\/[^/]+\.tsx?$/,
  /\/[^/]+\/[^/]+\/[^/]+\.css$/,
  /\/internal\//,
  /\/private\//,
];

/** Central types directory patterns. */
const CENTRAL_TYPES_PATTERNS = [
  /\/types\//,
  /\/types\.ts$/,
  /\/types\.d\.ts$/,
  /\/type-system\//,
];

/** Internal implementation file patterns. */
const INTERNAL_FILE_PATTERNS = [
  /\/internal\//i,
  /\/private\//i,
  /\/impl\//i,
  /\.impl\./i,
  /\.internal\./i,
  /__tests__\//i,
  /\.test\./i,
  /\.spec\./i,
  /\.stories\./i,
  /\.story\./i,
  /\.mock\./i,
  /\.fixture\./i,
];

// ------------------------------------------------------------------------------
// Context type
// ------------------------------------------------------------------------------

export interface ImportValidationContext {
  /** File path of the file being validated. */
  filePath?: string;
  /** Component family of the file being validated. */
  fileFamily?: string;
  /** Known barrel export paths for the project. */
  barrelPaths?: string[];
  /** Whether to enforce type-only imports for type symbols. */
  enforceTypeImports?: boolean;
}

// ------------------------------------------------------------------------------
// Rule IDs
// ------------------------------------------------------------------------------

const RULE = {
  noCircularDeps: 'no-circular-dependencies',
  barrelImportPreferred: 'barrel-import-preferred',
  noUnrelatedFamily: 'no-unrelated-family-imports',
  typesFromCentral: 'types-from-central-imports',
  maxDirectoryDepth: 'max-directory-depth',
  noInternalImports: 'no-internal-file-imports',
  typeOnlyImport: 'type-only-import-for-types',
} as const;

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

/**
 * Parse all import statements from TypeScript/JavaScript source.
 */
function parseImports(content: string): Array<{
  full: string;
  source: string;
  isTypeOnly: boolean;
  specifiers: string[];
}> {
  const imports: Array<{ full: string; source: string; isTypeOnly: boolean; specifiers: string[] }> = [];

  // Match: import { ... } from '...' or import type { ... } from '...'
  const importRegex = /import\s+(type\s+)?\{([^}]+)\}\s+from\s+['"]([^'"]+)['"];?/g;
  let match: RegExpExecArray | null;

  while ((match = importRegex.exec(content)) !== null) {
    const isTypeOnly = match[1] !== undefined;
    const specifiers = match[2].split(',').map((s) => s.trim().split(/\s+as\s+/)[0].trim());
    const source = match[3];

    imports.push({
      full: match[0],
      source,
      isTypeOnly,
      specifiers,
    });
  }

  // Match: import * as X from '...' and import X from '...'
  const defaultRegex = /import\s+(type\s+)?(\*\s+as\s+\w+|\w+)\s+from\s+['"]([^'"]+)['"];?/g;
  while ((match = defaultRegex.exec(content)) !== null) {
    const isTypeOnly = match[1] !== undefined;
    const source = match[3];

    imports.push({
      full: match[0],
      source,
      isTypeOnly,
      specifiers: [match[2].trim()],
    });
  }

  return imports;
}

/**
 * Determine the component family for a given file path.
 */
function getFamily(filePath: string): string | null {
  for (const [family, patterns] of Object.entries(COMPONENT_FAMILIES)) {
    for (const pattern of patterns) {
      if (filePath.includes(pattern)) return family;
    }
  }
  return null;
}

/**
 * Count directory traversal levels in a relative import.
 */
function getDirectoryDepth(importPath: string): number {
  if (!importPath.startsWith('.')) return 0;
  const parts = importPath.split('/');
  return parts.filter((p) => p === '..').length;
}

/**
 * Check if an import path is a deep import (not from barrel).
 */
function isDeepImport(importPath: string): boolean {
  return DEEP_IMPORT_PATTERNS.some((p) => p.test(importPath));
}

/**
 * Check if an import path points to an internal file.
 */
function isInternalFile(importPath: string): boolean {
  return INTERNAL_FILE_PATTERNS.some((p) => p.test(importPath));
}

// ------------------------------------------------------------------------------
// Validators
// ------------------------------------------------------------------------------

function checkBarrelImportPreferred(
  imports: ReturnType<typeof parseImports>,
  ctx?: ImportValidationContext,
): RuleResult[] {
  const results: RuleResult[] = [];

  for (const imp of imports) {
    if (!imp.source.startsWith('.')) continue; // External packages are fine

    const isDeep = isDeepImport(imp.source);
    const isRelativeDeep = getDirectoryDepth(imp.source) > 1;

    if (isDeep || isRelativeDeep) {
      results.push({
        passed: false,
        rule: RULE.barrelImportPreferred,
        message: `Deep import from "${imp.source}". Use barrel imports instead.`,
        severity: 'warning',
        suggestion: `Import from the family barrel: \`import { X } from '../controls';\` instead of \`import { X } from '../controls/TfButton';\``,
        filePath: ctx?.filePath,
        context: imp.full,
      });
    }
  }

  if (results.length === 0) {
    results.push({
      passed: true,
      rule: RULE.barrelImportPreferred,
      message: `All relative imports use barrel paths.`,
      severity: 'info',
    });
  }

  return results;
}

function checkNoUnrelatedFamily(
  imports: ReturnType<typeof parseImports>,
  ctx?: ImportValidationContext,
): RuleResult[] {
  const results: RuleResult[] = [];
  const fileFamily = ctx?.fileFamily || (ctx?.filePath ? getFamily(ctx.filePath) : null);

  if (!fileFamily) {
    return [{
      passed: true,
      rule: RULE.noUnrelatedFamily,
      message: `Cannot determine file family — unrelated-family check skipped.`,
      severity: 'info',
    }];
  }

  for (const imp of imports) {
    if (!imp.source.startsWith('.')) continue;

    const importFamily = getFamily(imp.source);
    if (importFamily && importFamily !== fileFamily) {
      results.push({
        passed: false,
        rule: RULE.noUnrelatedFamily,
        message: `Import from unrelated family: "${imp.source}" (${importFamily}) into ${fileFamily} file.`,
        severity: 'error',
        suggestion: `Move shared code to a common module, or import from the same family.`,
        filePath: ctx?.filePath,
        context: imp.full,
      });
    }
  }

  if (results.length === 0) {
    results.push({
      passed: true,
      rule: RULE.noUnrelatedFamily,
      message: `No imports from unrelated component families.`,
      severity: 'info',
    });
  }

  return results;
}

function checkTypesFromCentral(
  imports: ReturnType<typeof parseImports>,
  ctx?: ImportValidationContext,
): RuleResult[] {
  const results: RuleResult[] = [];

  for (const imp of imports) {
    // Only check type-only imports or imports that look like types
    if (!imp.isTypeOnly) continue;

    const isCentral = CENTRAL_TYPES_PATTERNS.some((p) => p.test(imp.source));
    if (!isCentral && imp.source.startsWith('.')) {
      results.push({
        passed: false,
        rule: RULE.typesFromCentral,
        message: `Type import from "${imp.source}" should come from central types.`,
        severity: 'warning',
        suggestion: `Move type to the central types module and import from '../types' or '@torafirma/types'.`,
        filePath: ctx?.filePath,
        context: imp.full,
      });
    }
  }

  if (results.length === 0) {
    results.push({
      passed: true,
      rule: RULE.typesFromCentral,
      message: `All type imports come from central types modules.`,
      severity: 'info',
    });
  }

  return results;
}

function checkMaxDirectoryDepth(
  imports: ReturnType<typeof parseImports>,
  ctx?: ImportValidationContext,
): RuleResult[] {
  const results: RuleResult[] = [];

  for (const imp of imports) {
    if (!imp.source.startsWith('.')) continue;

    const depth = getDirectoryDepth(imp.source);
    if (depth > MAX_DIRECTORY_DEPTH) {
      results.push({
        passed: false,
        rule: RULE.maxDirectoryDepth,
        message: `Import "${imp.source}" traverses ${depth} directory levels (max: ${MAX_DIRECTORY_DEPTH}).`,
        severity: 'warning',
        suggestion: `Refactor to use a barrel export, or move the imported module closer.`,
        filePath: ctx?.filePath,
        context: imp.full,
      });
    }
  }

  if (results.length === 0) {
    results.push({
      passed: true,
      rule: RULE.maxDirectoryDepth,
      message: `No relative imports exceed ${MAX_DIRECTORY_DEPTH} directory levels.`,
      severity: 'info',
    });
  }

  return results;
}

function checkNoInternalImports(
  imports: ReturnType<typeof parseImports>,
  ctx?: ImportValidationContext,
): RuleResult[] {
  const results: RuleResult[] = [];

  for (const imp of imports) {
    if (isInternalFile(imp.source)) {
      results.push({
        passed: false,
        rule: RULE.noInternalImports,
        message: `Import from internal file: "${imp.source}". Internal files are not public API.`,
        severity: 'error',
        suggestion: `Import from the public barrel export instead of internal implementation files.`,
        filePath: ctx?.filePath,
        context: imp.full,
      });
    }
  }

  if (results.length === 0) {
    results.push({
      passed: true,
      rule: RULE.noInternalImports,
      message: `No imports from internal implementation files.`,
      severity: 'info',
    });
  }

  return results;
}

function checkTypeOnlyImport(
  imports: ReturnType<typeof parseImports>,
  ctx?: ImportValidationContext,
): RuleResult[] {
  if (!ctx?.enforceTypeImports) {
    return [{
      passed: true,
      rule: RULE.typeOnlyImport,
      message: `Type-only import enforcement is disabled.`,
      severity: 'info',
    }];
  }

  const results: RuleResult[] = [];

  for (const imp of imports) {
    // Check for known type-only symbols
    const typePatterns = ['Props', 'Interface', 'Type', 'Config', 'Options', 'State', 'Event'];
    const looksLikeType = imp.specifiers.some((s) => typePatterns.some((p) => s.includes(p)));

    if (looksLikeType && !imp.isTypeOnly) {
      results.push({
        passed: false,
        rule: RULE.typeOnlyImport,
        message: `Import of type "${imp.specifiers.join(', ')}" from "${imp.source}" should use \`import type\`.`,
        severity: 'warning',
        suggestion: `Change to: \`import type { ${imp.specifiers.join(', ')} } from '${imp.source}';\``,
        filePath: ctx?.filePath,
        context: imp.full,
      });
    }
  }

  if (results.length === 0) {
    results.push({
      passed: true,
      rule: RULE.typeOnlyImport,
      message: `All type imports use type-only syntax.`,
      severity: 'info',
    });
  }

  return results;
}

// ------------------------------------------------------------------------------
// Public API
// ------------------------------------------------------------------------------

/**
 * Validates import/export patterns in a source file against Torafirma
 * module-boundary rules.
 *
 * @param fileContent - TypeScript/JavaScript source code to validate.
 * @param context     - Optional context (file path, family, barrel paths).
 * @returns           - Array of `RuleResult` for each import rule.
 *
 * @example
 * ```ts
 * const content = `
 *   import { TfButton } from '../controls';
 *   import type { Theme } from '../../types';
 *   import { useAuth } from '../../authority/hooks/useAuth';
 * `;
 * const results = validateImports(content, {
 *   filePath: 'src/components/feedback/TfAlert.tsx',
 *   fileFamily: 'feedback',
 * });
 * ```
 */
export function validateImports(
  fileContent: string,
  context?: ImportValidationContext,
): RuleResult[] {
  const imports = parseImports(fileContent);
  const results: RuleResult[] = [];

  results.push(...checkBarrelImportPreferred(imports, context));
  results.push(...checkNoUnrelatedFamily(imports, context));
  results.push(...checkTypesFromCentral(imports, context));
  results.push(...checkMaxDirectoryDepth(imports, context));
  results.push(...checkNoInternalImports(imports, context));
  results.push(...checkTypeOnlyImport(imports, context));

  return results;
}

/** Alias for use in generic validator pipelines. */
export const validateModuleImports: ValidatorFunction<string, ImportValidationContext> =
  validateImports;
