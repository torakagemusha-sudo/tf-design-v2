import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * FormFieldPercentage — percentage input with % suffix.
 *
 * @example
 * <FormFieldPercentage name="tax" label="Tax Rate" value={8.5} onChange={handleChange} />
 */
export interface FormFieldPercentageProps extends BaseComponentProps {
  name: string;
  label?: string;
  value?: number;
  onChange: (name: string, value: number) => void;
  error?: string;
  disabled?: boolean;
  readonly?: boolean;
  min?: number;
  max?: number;
  step?: number;
}

export const FormFieldPercentage: React.FC<FormFieldPercentageProps> = ({
  name,
  label,
  value,
  onChange,
  error,
  disabled = false,
  readonly = false,
  min = 0,
  max = 100,
  step = 0.1,
  className = "",
  style,
  ...rest
}) => (
  <div className={`tf-form-field-percentage ${error ? "tf-form-field--error" : ""} ${className}`} style={style} data-testid={`form-field-percentage-${name}`} {...rest}>
    {label && <label className="tf-form-field__label">{label}</label>}
    <div className="tf-form-field-percentage__wrap">
      <input
        className="tf-form-field-percentage__input"
        type="number"
        name={name}
        value={value ?? ""}
        onChange={e => onChange(name, Number(e.target.value))}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        readOnly={readonly}
      />
      <span className="tf-form-field-percentage__suffix">%</span>
    </div>
    {error && <span className="tf-form-field__error">{error}</span>}
  </div>
);

FormFieldPercentage.displayName = "FormFieldPercentage";
export default FormFieldPercentage;
