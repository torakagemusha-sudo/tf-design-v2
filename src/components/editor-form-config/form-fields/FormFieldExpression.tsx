import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";
import { FormField } from "./FormField";

/**
 * FormFieldExpression — expression builder with visual operators and variables.
 *
 * @example
 * <FormFieldExpression name="filter" label="Filter" value="age > 18 AND active" variables={["age","active"]} onChange={handleChange} />
 */
export interface FormFieldExpressionProps extends BaseComponentProps {
  name: string;
  label?: string;
  value?: string;
  onChange: (name: string, value: string) => void;
  /** Available variables */
  variables?: string[];
  /** Available operators */
  operators?: string[];
  error?: string;
  disabled?: boolean;
  readonly?: boolean;
}

const DEFAULT_OPS = ["AND", "OR", "NOT", "==", "!=", ">", "<", ">=", "<=", "+", "-", "*", "/"];

export const FormFieldExpression: React.FC<FormFieldExpressionProps> = ({
  name,
  label,
  value = "",
  onChange,
  variables = [],
  operators = DEFAULT_OPS,
  error,
  disabled = false,
  readonly = false,
  className = "",
  style,
  ...rest
}) => {
  const insert = useCallback((text: string) => {
    onChange(name, value ? `${value} ${text} ` : text);
  }, [value, name, onChange]);

  return (
    <div className={`tf-form-field-expression ${error ? "tf-form-field--error" : ""} ${className}`} style={style} data-testid={`form-field-expression-${name}`} {...rest}>
      {label && <label className="tf-form-field__label">{label}</label>}
      <div className="tf-form-field-expression__builder">
        {variables.length > 0 && (
          <div className="tf-form-field-expression__vars">
            {variables.map(v => (
              <button key={v} type="button" className="tf-form-field-expression__token" onClick={() => insert(v)} disabled={readonly}>
                {v}
              </button>
            ))}
          </div>
        )}
        <div className="tf-form-field-expression__operators">
          {operators.map(op => (
            <button key={op} type="button" className="tf-form-field-expression__op" onClick={() => insert(op)} disabled={readonly}>
              {op}
            </button>
          ))}
        </div>
        <textarea
          className="tf-form-field-expression__input"
          name={name}
          value={value}
          onChange={e => onChange(name, e.target.value)}
          placeholder="Build expression..."
          disabled={disabled}
          readOnly={readonly}
          rows={2}
        />
      </div>
      {error && <span className="tf-form-field__error">{error}</span>}
    </div>
  );
};

FormFieldExpression.displayName = "FormFieldExpression";
export default FormFieldExpression;
