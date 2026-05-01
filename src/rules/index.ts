/**
 * @fileoverview Barrel Export — Torafirma Design Rule Enforcers
 *
 * This module exports all types, validators, and utilities from the
 * design-rule enforcement system. Import everything from this entry point:
 *
 * ```ts
 * import {
 *   validateComponentName,
 *   validateCSSTokens,
 *   validateAuthorityRequirements,
 *   runEnforcers,
 *   registerRule,
 *   registry,
 *   type RuleResult,
 *   type EnforcementLevel,
 * } from '@torafirma/rules';
 * ```
 */

// ------------------------------------------------------------------------------
// Core Types
// ------------------------------------------------------------------------------

export type {
  AuthorityLevel,
  CanonicalVariant,
  ComponentInterface,
  ComponentProp,
  CSSTokenUsage,
  Density,
  EnforcementLevel,
  EnforcerInput,
  EnforcerReport,
  RuleConfig,
  RuleRegistry,
  RuleResult,
  RuleSet,
  Severity,
  StateMachine,
  ThemeName,
  TraceEvent,
  ValidatorFunction,
} from './types';

// ------------------------------------------------------------------------------
// Component Naming Rules
// ------------------------------------------------------------------------------

export {
  validateComponentName,
  validateComponentNaming,
} from './componentNamingRules';
export type { ComponentNamingContext } from './componentNamingRules';

// ------------------------------------------------------------------------------
// CSS Token Rules
// ------------------------------------------------------------------------------

export {
  validateCSSTokens,
  validateCSSTokenUsage,
} from './cssTokenRules';
export type { CSSTokenContext } from './cssTokenRules';

// ------------------------------------------------------------------------------
// Authority Requirement Rules
// ------------------------------------------------------------------------------

export {
  validateAuthorityRequirements,
  validateAuthorityGating,
} from './authorityRequirementRules';
export type { AuthorityRequirementsInput } from './authorityRequirementRules';

// ------------------------------------------------------------------------------
// Semantic Variant Rules
// ------------------------------------------------------------------------------

export {
  validateSemanticVariant,
  validateVariant,
} from './semanticVariantRules';
export type { SemanticVariantContext } from './semanticVariantRules';

// ------------------------------------------------------------------------------
// State Transition Rules
// ------------------------------------------------------------------------------

export {
  validateStateTransitions,
  validateStateMachine,
} from './stateTransitionRules';
export type { StateTransitionContext } from './stateTransitionRules';

// ------------------------------------------------------------------------------
// Copy / Vocabulary Rules
// ------------------------------------------------------------------------------

export {
  validateCopyText,
  validateVocabulary,
} from './copyVocabularyRules';
export type { CopyValidationContext } from './copyVocabularyRules';

// ------------------------------------------------------------------------------
// Accessibility Rules
// ------------------------------------------------------------------------------

export {
  validateAccessibility,
  validateA11y,
} from './accessibilityRules';
export type { AccessibilityContext } from './accessibilityRules';

// ------------------------------------------------------------------------------
// Traceability Rules
// ------------------------------------------------------------------------------

export {
  validateTraceability,
  validateAuditTrail,
} from './traceabilityRules';
export type { TraceabilityContext } from './traceabilityRules';

// ------------------------------------------------------------------------------
// Theme Consistency Rules
// ------------------------------------------------------------------------------

export {
  validateThemeConsistency,
  validateTheme,
} from './themeConsistencyRules';
export type { ThemeConsistencyContext } from './themeConsistencyRules';

// ------------------------------------------------------------------------------
// Import / Export Rules
// ------------------------------------------------------------------------------

export {
  validateImports,
  validateModuleImports,
} from './importRules';
export type { ImportValidationContext } from './importRules';

// ------------------------------------------------------------------------------
// Props Validation Rules
// ------------------------------------------------------------------------------

export {
  validateProps,
  validateComponentProps,
} from './propValidationRules';
export type { PropsValidationContext } from './propValidationRules';

// ------------------------------------------------------------------------------
// Density Rules
// ------------------------------------------------------------------------------

export {
  validateDensity,
  validateComponentDensity,
} from './densityRules';
export type { DensityValidationContext } from './densityRules';

// ------------------------------------------------------------------------------
// Enforcer Runner
// ------------------------------------------------------------------------------

export {
  runEnforcers,
  BUILT_IN_RULE_SETS,
} from './enforcerRunner';
export type { EnforcerRunnerOptions } from './enforcerRunner';

// ------------------------------------------------------------------------------
// Rule Registry
// ------------------------------------------------------------------------------

export {
  registry,
  configureRuleSeverity,
  configureSeverities,
  disableRule,
  disableRuleSet,
  enableRule,
  enableRuleSet,
  getAllRuleSets,
  getEnabledRules,
  getRegistrySummary,
  getRule,
  getRulesInSet,
  isRuleEnabled,
  registerRule,
  registerRules,
  registerRuleSet,
  resetRegistry,
  toggleRule,
} from './ruleRegistry';
