import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * SchemaValidationRules — validation rule editor for schema nodes.
 *
 * @example
 * <SchemaValidationRules rules={rules} onChange={setRules} availableTypes={["required","pattern","unique"]} />
 */
export interface SchemaValidationRulesProps extends BaseComponentProps {
  /** Current validation rules */
  rules: ValidationRule[];
  /** Rule change handler */
  onChange: (rules: ValidationRule[]) => void;
  /** Available rule types */
  availableTypes?: ValidationRule["type"][];
  /** Readonly mode */
  readonly?: boolean;
}

export const SchemaValidationRules: React.FC<SchemaValidationRulesProps> = ({
  rules,
  onChange,
  availableTypes = ["required", "min", "max", "minLength", "maxLength", "pattern", "email", "url", "unique"],
  readonly = false,
  className = "",
  style,
  ...rest
}) => {
  const addRule = useCallback(() => {
    onChange([...rules, { type: "required" }]);
  }, [rules, onChange]);

  const updateRule = useCallback((index: number, patch: Partial<ValidationRule>) => {
    const next = rules.map((r, i) => i === index ? { ...r, ...patch } : r);
    onChange(next);
  }, [rules, onChange]);

  const removeRule = useCallback((index: number) => {
    onChange(rules.filter((_, i) => i !== index));
  }, [rules, onChange]);

  return (
    <div className={`tf-schema-validation-rules ${className}`} style={style} data-testid="schema-validation-rules" {...rest}>
      <div className="tf-schema-validation-rules__header">
        <span className="tf-schema-validation-rules__title">Validation Rules ({rules.length})</span>
        {!readonly && (
          <button className="tf-schema-validation-rules__add" onClick={addRule} title="Add rule">
            + Add Rule
          </button>
        )}
      </div>
      {rules.length === 0 && (
        <p className="tf-schema-validation-rules__empty">No validation rules defined.</p>
      )}
      <div className="tf-schema-validation-rules__list">
        {rules.map((rule, i) => (
          <div key={i} className="tf-schema-validation-rules__item">
            <select
              className="tf-schema-validation-rules__type"
              value={rule.type}
              onChange={e => updateRule(i, { type: e.target.value as ValidationRule["type"] })}
              disabled={readonly}
            >
              {availableTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            {rule.type !== "required" && rule.type !== "email" && rule.type !== "url" && rule.type !== "unique" && (
              <input
                className="tf-schema-validation-rules__value"
                value={String(rule.value ?? "")}
                placeholder="Value"
                onChange={e => updateRule(i, { value: e.target.value })}
                disabled={readonly}
              />
            )}
            <input
              className="tf-schema-validation-rules__message"
              value={rule.message ?? ""}
              placeholder="Error message (optional)"
              onChange={e => updateRule(i, { message: e.target.value })}
              disabled={readonly}
            />
            {!readonly && (
              <button className="tf-schema-validation-rules__remove" onClick={() => removeRule(i)} title="Remove">×</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

SchemaValidationRules.displayName = "SchemaValidationRules";
export default SchemaValidationRules;
