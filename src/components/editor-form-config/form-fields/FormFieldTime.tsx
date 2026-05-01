import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";

/**
 * FormFieldTime — time picker input.
 *
 * @example
 * <FormFieldTime name="alarm" label="Alarm" value="07:30" onChange={handleChange} />
 */
export interface FormFieldTimeProps extends BaseComponentProps {
  name: string;
  label?: string;
  value?: string;
  onChange: (name: string, value: string) => void;
  error?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  min?: string;
  max?: string;
  step?: number;
}

export const FormFieldTime: React.FC<FormFieldTimeProps> = ({
  name,
  label,
  value = "",
  onChange,
  error,
  disabled = false,
  readonly = false,
  required = false,
  min,
  max,
  step,
  className = "",
  style,
  ...rest
}) => (
  <div className={`tf-form-field-time ${error ? "tf-form-field--error" : ""} ${className}`} style={style} data-testid={`form-field-time-${name}`} {...rest}>
    {label && <label className="tf-form-field__label">{label}{required && <span className="tf-form-field__required">*</span>}</label>}
    <input
      className="tf-form-field-time__input"
      type="time"
      name={name}
      value={value}
      onChange={e => onChange(name, e.target.value)}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      readOnly={readonly}
    />
    {error && <span className="tf-form-field__error">{error}</span>}
  </div>
);

FormFieldTime.displayName = "FormFieldTime";
export default FormFieldTime;
