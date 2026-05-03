import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";
import { FormField } from "./FormField";

/**
 * FormFieldDateTime — datetime-local picker input.
 *
 * @example
 * <FormFieldDateTime name="start" label="Start Time" value="2024-01-01T09:00" onChange={handleChange} />
 */
export interface FormFieldDateTimeProps extends BaseComponentProps {
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
}

export const FormFieldDateTime: React.FC<FormFieldDateTimeProps> = ({
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
  className = "",
  style,
  ...rest
}) => (
  <div className={`tf-form-field-datetime ${error ? "tf-form-field--error" : ""} ${className}`} style={style} data-testid={`form-field-datetime-${name}`} {...rest}>
    {label && <label className="tf-form-field__label">{label}{required && <span className="tf-form-field__required">*</span>}</label>}
    <input
      className="tf-form-field-datetime__input"
      type="datetime-local"
      name={name}
      value={value}
      onChange={e => onChange(name, e.target.value)}
      min={min}
      max={max}
      disabled={disabled}
      readOnly={readonly}
    />
    {error && <span className="tf-form-field__error">{error}</span>}
  </div>
);

FormFieldDateTime.displayName = "FormFieldDateTime";
export default FormFieldDateTime;
