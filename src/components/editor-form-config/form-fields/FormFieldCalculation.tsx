import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * FormFieldCalculation — calculated/derived field showing computed values.
 *
 * @example
 * <FormFieldCalculation name="total" label="Total" formula="price * qty" variables={{price:10,qty:3}} />
 */
export interface FormFieldCalculationProps extends BaseComponentProps {
  name: string;
  label?: string;
  formula?: string;
  variables: Record<string, number>;
  onChange?: (name: string, value: number) => void;
  error?: string;
  precision?: number;
  prefix?: string;
  suffix?: string;
}

export const FormFieldCalculation: React.FC<FormFieldCalculationProps> = ({
  name,
  label,
  formula = "",
  variables,
  onChange,
  error,
  precision = 2,
  prefix = "",
  suffix = "",
  className = "",
  style,
  ...rest
}) => {
  const computed = useMemo(() => {
    try {
      // Simple safe evaluator for basic arithmetic
      let expr = formula;
      Object.entries(variables).forEach(([k, v]) => {
        expr = expr.replace(new RegExp(`\\b${k}\\b`, "g"), String(v));
      });
      // Only allow safe characters
      if (!/^[0-9+\-*/().\s]+$/.test(expr)) return NaN;
      return Number(eval(expr).toFixed(precision));
    } catch {
      return NaN;
    }
  }, [formula, variables, precision]);

  useEffect(() => {
    if (!isNaN(computed)) onChange?.(name, computed);
  }, [computed, name, onChange]);

  return (
    <div className={`tf-form-field-calculation ${error ? "tf-form-field--error" : ""} ${className}`} style={style} data-testid={`form-field-calculation-${name}`} {...rest}>
      {label && <label className="tf-form-field__label">{label}</label>}
      <div className="tf-form-field-calculation__display">
        <span className="tf-form-field-calculation__prefix">{prefix}</span>
        <span className={`tf-form-field-calculation__value ${isNaN(computed) ? "tf-form-field-calculation__value--error" : ""}`}>
          {isNaN(computed) ? "—" : computed.toFixed(precision)}
        </span>
        <span className="tf-form-field-calculation__suffix">{suffix}</span>
      </div>
      {formula && <span className="tf-form-field-calculation__formula">= {formula}</span>}
      {error && <span className="tf-form-field__error">{error}</span>}
    </div>
  );
};

FormFieldCalculation.displayName = "FormFieldCalculation";
export default FormFieldCalculation;
