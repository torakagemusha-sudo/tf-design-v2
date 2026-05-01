/**
 * @fileoverview Rule Registry
 *
 * Central registry for all Torafirma design-rule enforcers.
 * Provides registration, enable/disable, severity configuration,
 * and lookup capabilities for individual rules and rule sets.
 *
 * @example
 * ```ts
 * // Register a custom rule
 * registerRule({
 *   id: 'my-custom-rule',
 *   name: 'My Custom Rule',
 *   description: 'Checks something specific',
 *   severity: 'warning',
 *   enabled: true,
 *   ruleSet: 'custom',
 * });
 *
 * // Disable a rule that doesn't apply to your project
 * disableRule('no-ellipsis-in-buttons');
 *
 * // Change severity of a rule
 * configureRuleSeverity('density-usage-appropriate', 'error');
 * ```
 */

import type {
  EnforcementLevel,
  RuleConfig,
  RuleRegistry,
  RuleSet,
  ValidatorFunction,
} from './types';

// ------------------------------------------------------------------------------
// Default Registry Instance
// ------------------------------------------------------------------------------

/**
 * The global rule registry. All rule operations mutate this instance.
 */
export const registry: RuleRegistry = {
  rules: new Map<string, RuleConfig>(),
  ruleSets: new Map<string, RuleSet>(),
};

// ------------------------------------------------------------------------------
// Rule Registration
// ------------------------------------------------------------------------------

/**
 * Register a new rule in the central registry.
 *
 * @param config    - The rule configuration to register.
 * @param validate  - Optional validation function to attach.
 *
 * @example
 * ```ts
 * registerRule({
 *   id: 'custom-animation-easing',
 *   name: 'Animation Easing Check',
 *   description: 'Ensures all animations use Torafirma easing tokens',
 *   severity: 'warning',
 *   enabled: true,
 *   ruleSet: 'animations',
 * });
 * ```
 */
export function registerRule(
  config: Omit<RuleConfig, 'validate'> & { validate?: ValidatorFunction<unknown, unknown> },
): void {
  if (registry.rules.has(config.id)) {
    throw new Error(
      `Rule "${config.id}" is already registered. Use updateRule() to modify an existing rule.`,
    );
  }

  const ruleConfig: RuleConfig = {
    ...config,
    validate: config.validate,
  };

  registry.rules.set(config.id, ruleConfig);

  // Auto-create or update the rule set
  ensureRuleSet(config.ruleSet, config.severity);

  const ruleSet = registry.ruleSets.get(config.ruleSet);
  if (ruleSet && !ruleSet.rules.includes(config.id)) {
    ruleSet.rules.push(config.id);
  }
}

/**
 * Register multiple rules at once.
 *
 * @param configs - Array of rule configurations.
 */
export function registerRules(
  configs: Array<Omit<RuleConfig, 'validate'> & { validate?: ValidatorFunction<unknown, unknown> }>,
): void {
  for (const config of configs) {
    registerRule(config);
  }
}

// ------------------------------------------------------------------------------
// Rule Enable / Disable
// ------------------------------------------------------------------------------

/**
 * Enable a previously disabled rule.
 *
 * @param ruleId - The unique rule identifier to enable.
 *
 * @example
 * ```ts
 * enableRule('no-title-case-buttons');
 * ```
 */
export function enableRule(ruleId: string): void {
  const rule = registry.rules.get(ruleId);
  if (!rule) {
    throw new Error(`Rule "${ruleId}" is not registered. Cannot enable.`);
  }
  rule.enabled = true;
}

/**
 * Disable a rule. Disabled rules are skipped during enforcement.
 *
 * @param ruleId - The unique rule identifier to disable.
 *
 * @example
 * ```ts
 * disableRule('button-max-chars'); // We have longer button labels
 * ```
 */
export function disableRule(ruleId: string): void {
  const rule = registry.rules.get(ruleId);
  if (!rule) {
    throw new Error(`Rule "${ruleId}" is not registered. Cannot disable.`);
  }
  rule.enabled = false;
}

/**
 * Toggle a rule's enabled state.
 *
 * @param ruleId - The unique rule identifier to toggle.
 * @returns      - The new enabled state.
 */
export function toggleRule(ruleId: string): boolean {
  const rule = registry.rules.get(ruleId);
  if (!rule) {
    throw new Error(`Rule "${ruleId}" is not registered. Cannot toggle.`);
  }
  rule.enabled = !rule.enabled;
  return rule.enabled;
}

// ------------------------------------------------------------------------------
// Severity Configuration
// ------------------------------------------------------------------------------

/**
 * Change the severity level of a registered rule.
 *
 * @param ruleId   - The rule to configure.
 * @param severity - The new severity level.
 *
 * @example
 * ```ts
 * configureRuleSeverity('density-usage-appropriate', 'error');
 * ```
 */
export function configureRuleSeverity(
  ruleId: string,
  severity: EnforcementLevel,
): void {
  const rule = registry.rules.get(ruleId);
  if (!rule) {
    throw new Error(`Rule "${ruleId}" is not registered. Cannot configure severity.`);
  }
  rule.severity = severity;
}

/**
 * Configure severity for multiple rules at once.
 *
 * @param overrides - Map of ruleId → severity.
 */
export function configureSeverities(
  overrides: Record<string, EnforcementLevel>,
): void {
  for (const [ruleId, severity] of Object.entries(overrides)) {
    configureRuleSeverity(ruleId, severity);
  }
}

// ------------------------------------------------------------------------------
// Rule Set Management
// ------------------------------------------------------------------------------

/**
 * Ensure a rule set exists in the registry, creating it if needed.
 */
function ensureRuleSet(name: string, defaultSeverity: EnforcementLevel): void {
  if (!registry.ruleSets.has(name)) {
    registry.ruleSets.set(name, {
      name,
      description: `Rule set "${name}"`,
      rules: [],
      severity: defaultSeverity,
      enabledByDefault: true,
    });
  }
}

/**
 * Register a rule set.
 *
 * @param ruleSet - The rule set definition.
 */
export function registerRuleSet(ruleSet: RuleSet): void {
  registry.ruleSets.set(ruleSet.name, ruleSet);
}

/**
 * Enable a rule set (marks all its rules as enabled).
 *
 * @param ruleSetName - The rule set to enable.
 */
export function enableRuleSet(ruleSetName: string): void {
  const ruleSet = registry.ruleSets.get(ruleSetName);
  if (!ruleSet) {
    throw new Error(`Rule set "${ruleSetName}" is not registered.`);
  }
  ruleSet.enabledByDefault = true;
  for (const ruleId of ruleSet.rules) {
    const rule = registry.rules.get(ruleId);
    if (rule) rule.enabled = true;
  }
}

/**
 * Disable a rule set (marks all its rules as disabled).
 *
 * @param ruleSetName - The rule set to disable.
 */
export function disableRuleSet(ruleSetName: string): void {
  const ruleSet = registry.ruleSets.get(ruleSetName);
  if (!ruleSet) {
    throw new Error(`Rule set "${ruleSetName}" is not registered.`);
  }
  ruleSet.enabledByDefault = false;
  for (const ruleId of ruleSet.rules) {
    const rule = registry.rules.get(ruleId);
    if (rule) rule.enabled = false;
  }
}

// ------------------------------------------------------------------------------
// Lookups & Queries
// ------------------------------------------------------------------------------

/**
 * Get a rule configuration by ID.
 *
 * @param ruleId - The rule identifier.
 * @returns      - The rule config, or undefined if not found.
 */
export function getRule(ruleId: string): RuleConfig | undefined {
  return registry.rules.get(ruleId);
}

/**
 * Get all rules in a rule set.
 *
 * @param ruleSetName - The rule set name.
 * @returns           - Array of rule configs in the set.
 */
export function getRulesInSet(ruleSetName: string): RuleConfig[] {
  const ruleSet = registry.ruleSets.get(ruleSetName);
  if (!ruleSet) return [];
  return ruleSet.rules
    .map((id) => registry.rules.get(id)!)
    .filter(Boolean);
}

/**
 * Get all enabled rules.
 *
 * @returns - Array of enabled rule configs.
 */
export function getEnabledRules(): RuleConfig[] {
  return Array.from(registry.rules.values()).filter((r) => r.enabled);
}

/**
 * Get all rule sets.
 *
 * @returns - Array of all rule sets.
 */
export function getAllRuleSets(): RuleSet[] {
  return Array.from(registry.ruleSets.values());
}

/**
 * Check if a rule is enabled.
 *
 * @param ruleId - The rule identifier.
 * @returns      - True if the rule exists and is enabled.
 */
export function isRuleEnabled(ruleId: string): boolean {
  const rule = registry.rules.get(ruleId);
  return rule ? rule.enabled : false;
}

// ------------------------------------------------------------------------------
// Bulk Operations
// ------------------------------------------------------------------------------

/**
 * Reset the registry to its initial empty state.
 * Use with caution — this removes all registered rules.
 */
export function resetRegistry(): void {
  registry.rules.clear();
  registry.ruleSets.clear();
}

/**
 * Get a summary of the current registry state.
 *
 * @returns - Summary object with counts.
 */
export function getRegistrySummary(): {
  totalRules: number;
  enabledRules: number;
  disabledRules: number;
  totalRuleSets: number;
} {
  const allRules = Array.from(registry.rules.values());
  return {
    totalRules: allRules.length,
    enabledRules: allRules.filter((r) => r.enabled).length,
    disabledRules: allRules.filter((r) => !r.enabled).length,
    totalRuleSets: registry.ruleSets.size,
  };
}
