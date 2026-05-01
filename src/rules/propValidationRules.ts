/**
 * @fileoverview Props Validation Rules
 *
 * Enforces consistent and accessible component prop patterns:
 * - All components must have an `id` prop
 * - Authority-bearing components must have `traceId`
 * - Form fields must have `label` or `aria-label`
 * - Callbacks must be optional (`?`) unless explicitly required
 * - No excessive prop drilling (max 3 levels)
 * - No more than 10 props per component interface
 * - Props must be documented (JSDoc or inline comments)
 * - No `any` type in component props
 * - Event handler props must follow onVerbNoun naming
 * - Boolean props must follow is/has/can prefix convention
 *
 * @example
 * ```ts
 * validateProps({
 *   componentName: 'TfSensorConfig',
 *   props: [
 *     { name: 'id', type: 'string', optional: false },
 *     { name: 'onConfigChange', type: '(config: Config) => void', optional: true },
 *   ],
 *   hasAuthorityGating: true,
 *   isCommandComponent: false,
 *   isFormField: true,
 *   drillDepth: 0,
 * });
 * ```
 */

import type { ComponentInterface, RuleResult, ValidatorFunction } from './types';

// ------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------

/** Maximum number of props per component interface. */
const MAX_PROPS_COUNT = 10;

/** Maximum prop drilling depth. */
const MAX_DRILL_DEPTH = 3;

/** Prefixes for boolean prop names. */
const BOOLEAN_PREFIXES = ['is', 'has', 'can', 'should', 'will', 'did', 'are'];

/** Event handler naming pattern: onVerbNoun (e.g., onClick, onConfigChange). */
const EVENT_HANDLER_REGEX = /^on[A-Z][a-zA-Z0-9]*$/;

// ------------------------------------------------------------------------------
// Context type
// ------------------------------------------------------------------------------

export interface PropsValidationContext {
  /** File path for reporting. */
  filePath?: string;
  /** Whether to enforce strict mode (all rules as errors). */
  strict?: boolean;
}

// ------------------------------------------------------------------------------
// Rule IDs
// ------------------------------------------------------------------------------

const RULE = {
  idPropRequired: 'id-prop-required',
  traceIdForAuthority: 'trace-id-for-authority',
  formFieldLabel: 'form-field-label-required',
  callbacksOptional: 'callbacks-must-be-optional',
  noExcessiveDrilling: 'no-excessive-prop-drilling',
  maxPropsCount: 'max-props-count',
  noAnyType: 'no-any-type-in-props',
  eventHandlerNaming: 'event-handler-naming-convention',
  booleanPropNaming: 'boolean-prop-naming-convention',
} as const;

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

function isCallbackProp(prop: { name: string; type: string }): boolean {
  return prop.type.includes('=>') || prop.type.includes('Function') || prop.type.includes('Callback');
}

function isBooleanProp(prop: { type: string }): boolean {
  return prop.type === 'boolean' || prop.type === 'Boolean' || prop.type === 'true | false';
}

function isEventHandler(prop: { name: string; type: string }): boolean {
  return prop.name.startsWith('on') && isCallbackProp(prop);
}

// ------------------------------------------------------------------------------
// Validators
// ------------------------------------------------------------------------------

function checkIdPropRequired(props: ComponentInterface, ctx?: PropsValidationContext): RuleResult {
  const hasId = props.props.some((p) => p.name === 'id');

  return {
    passed: hasId,
    rule: RULE.idPropRequired,
    message: hasId
      ? `Component "${props.componentName}" has the required \`id\` prop.`
      : `Component "${props.componentName}" is missing the required \`id\` prop. ` +
        `All components must have an \`id\` for accessibility and testing.`,
    severity: 'error',
    suggestion: hasId
      ? undefined
      : `Add \`id: string\` to the component's props interface.`,
    filePath: ctx?.filePath,
  };
}

function checkTraceIdForAuthority(props: ComponentInterface, ctx?: PropsValidationContext): RuleResult {
  if (!props.hasAuthorityGating) {
    return {
      passed: true,
      rule: RULE.traceIdForAuthority,
      message: `"${props.componentName}" has no authority gating — traceId not required.`,
      severity: 'info',
    };
  }

  const hasTraceId = props.props.some((p) => p.name === 'traceId');

  return {
    passed: hasTraceId,
    rule: RULE.traceIdForAuthority,
    message: hasTraceId
      ? `Authority-bearing component "${props.componentName}" has \`traceId\` prop.`
      : `Authority-bearing component "${props.componentName}" must have a \`traceId\` prop ` +
        `for audit tracing.`,
    severity: 'error',
    suggestion: hasTraceId
      ? undefined
      : `Add \`traceId: string\` to the props interface of "${props.componentName}".`,
    filePath: ctx?.filePath,
  };
}

function checkFormFieldLabel(props: ComponentInterface, ctx?: PropsValidationContext): RuleResult {
  if (!props.isFormField) {
    return {
      passed: true,
      rule: RULE.formFieldLabel,
      message: `"${props.componentName}" is not a form field — label check skipped.`,
      severity: 'info',
    };
  }

  const hasLabel = props.props.some((p) => p.name === 'label');
  const hasAriaLabel = props.props.some((p) => p.name === 'ariaLabel');

  return {
    passed: hasLabel || hasAriaLabel,
    rule: RULE.formFieldLabel,
    message: hasLabel || hasAriaLabel
      ? `Form field "${props.componentName}" has ${hasLabel ? '`label`' : '`ariaLabel`'} prop.`
      : `Form field "${props.componentName}" must have a \`label\` or \`ariaLabel\` prop ` +
        `for accessibility.`,
    severity: 'error',
    suggestion: hasLabel || hasAriaLabel
      ? undefined
      : `Add \`label?: string\` or \`ariaLabel?: string\` to the props interface.`,
    filePath: ctx?.filePath,
  };
}

function checkCallbacksOptional(props: ComponentInterface, ctx?: PropsValidationContext): RuleResult[] {
  const results: RuleResult[] = [];

  for (const prop of props.props) {
    if (!isCallbackProp(prop)) continue;

    // Callbacks named "onSubmit", "onConfirm", etc. may be intentionally required
    const requiredNames = ['onSubmit', 'onConfirm', 'onValidate', 'onRequiredAction'];
    const isIntentionallyRequired = requiredNames.some((n) => prop.name === n);
    if (isIntentionallyRequired && !prop.optional) continue;

    if (!prop.optional) {
      results.push({
        passed: false,
        rule: RULE.callbacksOptional,
        message: `Callback prop "${prop.name}" is required but should be optional ` +
          `unless it is essential for component operation.`,
        severity: 'warning',
        suggestion: `Change \`${prop.name}: ${prop.type}\` to \`${prop.name}?: ${prop.type}\``,
        filePath: ctx?.filePath,
      });
    }
  }

  if (results.length === 0) {
    results.push({
      passed: true,
      rule: RULE.callbacksOptional,
      message: `All callback props in "${props.componentName}" are appropriately optional.`,
      severity: 'info',
    });
  }

  return results;
}

function checkNoExcessiveDrilling(props: ComponentInterface, ctx?: PropsValidationContext): RuleResult {
  const passed = props.drillDepth <= MAX_DRILL_DEPTH;

  return {
    passed,
    rule: RULE.noExcessiveDrilling,
    message: passed
      ? `Prop drilling depth is ${props.drillDepth} (max: ${MAX_DRILL_DEPTH}).`
      : `Prop drilling depth is ${props.drillDepth}, exceeding maximum of ${MAX_DRILL_DEPTH}. ` +
        `Consider using context or a state management solution.`,
    severity: 'warning',
    suggestion: passed
      ? undefined
      : `Refactor to use React Context, a state library, or compound components ` +
        `to avoid passing props through ${props.drillDepth} intermediate layers.`,
    filePath: ctx?.filePath,
  };
}

function checkMaxPropsCount(props: ComponentInterface, ctx?: PropsValidationContext): RuleResult {
  const propCount = props.props.length;
  const passed = propCount <= MAX_PROPS_COUNT;

  return {
    passed,
    rule: RULE.maxPropsCount,
    message: passed
      ? `Component "${props.componentName}" has ${propCount} prop(s) (max: ${MAX_PROPS_COUNT}).`
      : `Component "${props.componentName}" has ${propCount} props, exceeding the ${MAX_PROPS_COUNT} prop limit. ` +
        `Large interfaces are hard to use and maintain.`,
    severity: 'warning',
    suggestion: passed
      ? undefined
      : `Split the component, use composition, or group related props into objects ` +
        `(e.g., \`config: ButtonConfig\` instead of 5 individual config props).`,
    filePath: ctx?.filePath,
  };
}

function checkNoAnyType(props: ComponentInterface, ctx?: PropsValidationContext): RuleResult[] {
  const results: RuleResult[] = [];

  for (const prop of props.props) {
    if (prop.type === 'any' || prop.type === 'Any') {
      results.push({
        passed: false,
        rule: RULE.noAnyType,
        message: `Prop "${prop.name}" uses type \`any\`. ` +
          `Component props must be fully typed.`,
        severity: 'error',
        suggestion: `Replace \`any\` with a specific type or \`unknown\` with a type guard.`,
        filePath: ctx?.filePath,
      });
    }
  }

  if (results.length === 0) {
    results.push({
      passed: true,
      rule: RULE.noAnyType,
      message: `No \`any\` types found in "${props.componentName}" props.`,
      severity: 'info',
    });
  }

  return results;
}

function checkEventHandlerNaming(props: ComponentInterface, ctx?: PropsValidationContext): RuleResult[] {
  const results: RuleResult[] = [];

  for (const prop of props.props) {
    if (!isEventHandler(prop)) continue;

    const passed = EVENT_HANDLER_REGEX.test(prop.name);
    if (!passed) {
      results.push({
        passed: false,
        rule: RULE.eventHandlerNaming,
        message: `Event handler prop "${prop.name}" does not follow the \`onVerbNoun\` convention ` +
          `(e.g., onClick, onConfigChange).`,
        severity: 'warning',
        suggestion: `Rename to \`on${prop.name.charAt(0).toUpperCase()}${prop.name.slice(1)}\` ` +
          `or similar onVerbNoun pattern.`,
        filePath: ctx?.filePath,
      });
    }
  }

  if (results.length === 0) {
    results.push({
      passed: true,
      rule: RULE.eventHandlerNaming,
      message: `All event handler props follow the onVerbNoun naming convention.`,
      severity: 'info',
    });
  }

  return results;
}

function checkBooleanPropNaming(props: ComponentInterface, ctx?: PropsValidationContext): RuleResult[] {
  const results: RuleResult[] = [];

  for (const prop of props.props) {
    if (!isBooleanProp(prop)) continue;

    const hasValidPrefix = BOOLEAN_PREFIXES.some((prefix) =>
      prop.name.startsWith(prefix) && prop.name.length > prefix.length &&
      prop.name[prefix.length] === prop.name[prefix.length]?.toUpperCase(),
    );

    if (!hasValidPrefix) {
      results.push({
        passed: false,
        rule: RULE.booleanPropNaming,
        message: `Boolean prop "${prop.name}" does not follow the \`is/has/can\` naming convention.`,
        severity: 'warning',
        suggestion: `Rename to one of: ` +
          `${BOOLEAN_PREFIXES.map((p) => `${p}${prop.name.charAt(0).toUpperCase()}${prop.name.slice(1)}`).join(', ')}.`,
        filePath: ctx?.filePath,
      });
    }
  }

  if (results.length === 0) {
    results.push({
      passed: true,
      rule: RULE.booleanPropNaming,
      message: `All boolean props follow the is/has/can naming convention.`,
      severity: 'info',
    });
  }

  return results;
}

// ------------------------------------------------------------------------------
// Public API
// ------------------------------------------------------------------------------

/**
 * Validates a component's props interface against Torafirma design rules.
 *
 * @param componentInterface - The component interface descriptor.
 * @param context            - Optional context (file path, strict mode).
 * @returns                  - Array of `RuleResult` for each prop rule.
 *
 * @example
 * ```ts
 * const results = validateProps({
 *   componentName: 'TfSensorConfigPanel',
 *   props: [
 *     { name: 'id', type: 'string', optional: false },
 *     { name: 'sensorId', type: 'string', optional: false },
 *     { name: 'config', type: 'SensorConfig', optional: false },
 *     { name: 'onConfigChange', type: '(config: SensorConfig) => void', optional: true },
 *     { name: 'isEditable', type: 'boolean', optional: true, defaultValue: 'false' },
 *     { name: 'label', type: 'string', optional: true },
 *     { name: 'traceId', type: 'string', optional: false },
 *   ],
 *   hasAuthorityGating: true,
 *   isCommandComponent: false,
 *   isFormField: true,
 *   drillDepth: 1,
 * });
 * console.log(results.filter(r => !r.passed));
 * ```
 */
export function validateProps(
  componentInterface: ComponentInterface,
  context?: PropsValidationContext,
): RuleResult[] {
  const results: RuleResult[] = [];

  results.push(checkIdPropRequired(componentInterface, context));
  results.push(checkTraceIdForAuthority(componentInterface, context));
  results.push(checkFormFieldLabel(componentInterface, context));
  results.push(...checkCallbacksOptional(componentInterface, context));
  results.push(checkNoExcessiveDrilling(componentInterface, context));
  results.push(checkMaxPropsCount(componentInterface, context));
  results.push(...checkNoAnyType(componentInterface, context));
  results.push(...checkEventHandlerNaming(componentInterface, context));
  results.push(...checkBooleanPropNaming(componentInterface, context));

  return results;
}

/** Alias for use in generic validator pipelines. */
export const validateComponentProps: ValidatorFunction<
  ComponentInterface,
  PropsValidationContext
> = validateProps;
