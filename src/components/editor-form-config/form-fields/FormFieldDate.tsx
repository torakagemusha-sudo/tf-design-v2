import React, { useState, useCallback, useMemo, useRef, useEffect, type ReactNode, type CSSProperties, type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent } from "react";
import type { BaseComponentProps, PropertyDefinition, ValidationRule, SchemaNodeData, SchemaEdgeData, CodeDocument, JsonViewMode, PatchHunk, PatchLine, PatchOperation, FieldOption, FormFieldConfig, FieldCondition, FormStepConfig, ConfigVersion, DependencyNode, AutocompleteSuggestion, CurrencyConfig, DurationValue, UploadedFile, ConfigTemplate, SecretEntry, SchemaPropertyEditorProps } from "../types";
import { FormField } from "./FormField";

/**
 * FormFieldDate — date picker input.
 *
 * @example
 * <FormFieldDate name="birthdate" label="Birth Date" value="2020-01-01" onChange={handleChange} />
 */
export interface FormFieldDateProps extends BaseComponentProps {
  name: string;
  label?: string;
  value?: string;
  onChange: (name: string, value: string) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  min?: string;
  max?: string;
}

export const FormFieldDate: React.FC<FormFieldDateProps> = ({
  name,
  label,
  value = "",
  onChange,
  placeholder = "YYYY-MM-DD",
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
  <div className={`tf-form-field-date ${error ? "tf-form-field--error" : ""} ${className}`} style={style} data-testid={`form-field-date-${name}`} {...rest}>
    {label && <label className="tf-form-field__label" htmlFor={`tf-ffd-${name}`}>{label}{required && <span className="tf-form-field__required">*</span>}</label>}
    <input
      id={`tf-ffd-${name}`}
      className="tf-form-field-date__input"
      type="date"
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={e => onChange(name, e.target.value)}
      min={min}
      max={max}
      disabled={disabled}
      readOnly={readonly}
    />
    {error && <span className="tf-form-field__error">{error}</span>}
  </div>
);

FormFieldDate.displayName = "FormFieldDate";
export default FormFieldDate;
